"use server";

import {
  isSimplybookConfigured,
  simplybook,
  SimplybookError,
  type SbBookingResult,
  type SbService,
  type SbTimelineDay,
} from "@/lib/simplybook/api";

import { resolveOption } from "./options";
import type {
  AvailabilityResult,
  BookingFieldErrors,
  BookingState,
} from "./types";

/*
 * Server Actions du module de réservation (API REST publique SimplyBook).
 * Le navigateur n'envoie qu'une clé de formule (`kobido-75`), une date et une
 * heure : tout est revérifié ici (liste blanche, créneau encore libre).
 * Dates et heures : fuseau de l'entreprise (Europe/Paris), sans décalage.
 */

const WINDOW_DAYS = 14;
/** Au-delà, on ne propose plus de période suivante (≈ 4 mois). */
const HORIZON_DAYS = 120;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 80, email: 120, phone: 25 } as const;

function todayInParis() {
  return new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function addDays(date: string, days: number) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Créneaux libres d'une formule sur 14 jours à partir de `from`. */
export async function getAvailability(
  optionKey: string,
  from?: string,
): Promise<AvailabilityResult> {
  if (!isSimplybookConfigured()) return { ok: false };
  const option = await resolveOption(optionKey);
  if (!option) return { ok: false };

  const today = todayInParis();
  const horizon = addDays(today, HORIZON_DAYS);
  const start = from && DATE_RE.test(from) && from > today ? from : today;
  if (start > horizon)
    return { ok: true, from: start, days: [], hasMore: false };
  const end = addDays(start, WINDOW_DAYS - 1);

  try {
    const timeline = await simplybook<SbTimelineDay[]>(
      `/public/timeline/slots?service_id=${option.simplybookId}&date_from=${start}&date_to=${end}`,
    );
    const days = timeline.map((day) => ({
      date: day.date,
      times: day.slots.map((slot) => slot.time.slice(0, 5)),
    }));
    return { ok: true, from: start, days, hasMore: end < horizon };
  } catch (error) {
    console.error("[réservation] disponibilités", error);
    return { ok: false };
  }
}

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Réservation d'un créneau (formulaire du module, `useActionState`). */
export async function bookAppointment(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Pot de miel : rempli seulement par les robots. On ne réserve rien.
  if (field(formData, "website")) return { status: "error", unavailable: true };

  const values = {
    option: field(formData, "option"),
    date: field(formData, "date"),
    time: field(formData, "time"),
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone").replace(/[^\d+]/g, ""),
    consent: field(formData, "consent") === "on",
  };

  const errors: BookingFieldErrors = {};
  if (!DATE_RE.test(values.date) || !TIME_RE.test(values.time))
    errors.slot = "Choisissez un jour et une heure.";
  if (values.name.length < 2) errors.name = "Indiquez votre nom.";
  else if (values.name.length > LIMITS.name) errors.name = "Nom trop long.";
  if (!EMAIL_RE.test(values.email) || values.email.length > LIMITS.email)
    errors.email = "Indiquez une adresse e-mail valide.";
  if (
    values.phone.replace(/\D/g, "").length < 9 ||
    values.phone.length > LIMITS.phone
  )
    errors.phone = "Indiquez un numéro de téléphone valide.";
  if (!values.consent)
    errors.consent = "Merci d'accepter les conditions d'annulation.";
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  if (!isSimplybookConfigured()) return { status: "error", unavailable: true };
  const option = await resolveOption(values.option);
  if (!option) return { status: "error", unavailable: true };

  const startDatetime = `${values.date} ${values.time}:00`;
  try {
    const service = await simplybook<SbService>(
      `/public/services/item/id/${option.simplybookId}`,
    );
    const providerId = service.providers[0];
    if (!service.is_active || providerId === undefined)
      return { status: "error", unavailable: true };

    // Le créneau est-il toujours libre ? (un autre client a pu le prendre)
    // On relit les créneaux du jour. ⚠️ Ne pas utiliser
    // `/public/booking/validate-time` : testé le 25/11/2026, il renvoie
    // `{"dates":[],"error_dates":[],"error":null}` pour n'importe quelle
    // heure, même passée. SimplyBook refuse de toute façon (400) un
    // créneau invalide au moment de la réservation.
    const day = await simplybook<SbTimelineDay[]>(
      `/public/timeline/slots?service_id=${option.simplybookId}&provider_id=${providerId}&date_from=${values.date}&date_to=${values.date}`,
    );
    const free = day.some(
      (d) =>
        d.date === values.date &&
        d.slots.some((slot) => slot.time.slice(0, 5) === values.time),
    );
    if (!free) {
      console.warn("[réservation] créneau plus libre", startDatetime);
      return { status: "error", slotTaken: true };
    }

    const result = await simplybook<SbBookingResult>("/public/booking/item", {
      method: "POST",
      body: {
        service_id: option.simplybookId,
        provider_id: providerId,
        start_datetime: startDatetime,
        count: 1,
        client: {
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
        // Conditions activées dans SimplyBook (GET /public/clients/terms).
        terms: { simplybook_terms: true, cancellation_terms: true },
      },
    });
    const booking = result.bookings?.[0];
    if (!booking) throw new Error("Réponse de réservation vide.");
    return {
      status: "success",
      code: booking.code,
      start: booking.start_datetime ?? startDatetime,
      confirmed: booking.is_confirmed,
    };
  } catch (error) {
    console.error("[réservation] échec", error);
    if (error instanceof SimplybookError && error.status === 400) {
      // Détail par champ dans `data` : coordonnées refusées, ou créneau
      // refusé au dernier moment (règles d'agenda) → on recharge.
      const detail = JSON.stringify(
        (error.body as { data?: unknown } | null)?.data ?? "",
      ).toLowerCase();
      if (detail.includes("phone"))
        return {
          status: "error",
          errors: { phone: "Numéro de téléphone refusé." },
        };
      if (detail.includes("email"))
        return {
          status: "error",
          errors: { email: "Adresse e-mail refusée." },
        };
      return { status: "error", slotTaken: true };
    }
    return { status: "error", unavailable: true };
  }
}
