"use client";

import Link from "next/link";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { buttonClass } from "@/components/ui/button-link";
import { CheckIcon, ChevronRightIcon } from "@/components/ui/icons";
import { bookAppointment, getAvailability } from "@/lib/booking/actions";
import type {
  AvailabilityResult,
  BookableOption,
  BookingState,
  DayAvailability,
} from "@/lib/booking/types";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

const initialState: BookingState = { status: "idle" };

const fieldClass =
  "w-full rounded-2xl border border-transparent bg-paper px-5 py-4 text-body text-ink transition-[border-color,background-color] duration-300 max-md:text-base placeholder:text-ink-subtle hover:border-line focus:border-accent-600 focus:bg-white focus:outline-none aria-invalid:border-accent-700";

// Dates « YYYY-MM-DD » formatées sans décalage de fuseau.
function asUtc(date: string) {
  return new Date(`${date}T12:00:00Z`);
}
const fmt = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", ...options });
const weekday = fmt({ weekday: "short" });
const dayNum = fmt({ day: "numeric" });
const month = fmt({ month: "short" });
const longDate = fmt({ weekday: "long", day: "numeric", month: "long" });
const monthYear = fmt({ month: "long", year: "numeric" });

function formatTime(time: string) {
  return time.replace(":", "h");
}

function addDays(date: string, days: number) {
  const d = asUtc(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

type Availability =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ready";
      from: string;
      days: DayAvailability[];
      hasMore: boolean;
    };

/**
 * Module de réservation intégré (API REST publique SimplyBook, via Server
 * Actions) : formule → jour → heure → coordonnées → confirmation.
 * Préselection par l'ancre `#reserver-<minutes>` (boutons des formules).
 */
export function BookingModule({
  options,
  serviceName,
}: {
  options: BookableOption[];
  serviceName: string;
}) {
  const [optionKey, setOptionKey] = useState(options[0]?.key ?? "");
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [history, setHistory] = useState<string[]>([]);
  // Incrémenté quand un créneau a été pris entre-temps : recharge la période.
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState<{
    key: string;
    data: AvailabilityResult;
  } | null>(null);
  const [pick, setPick] = useState<{
    date: string | null;
    time: string | null;
  }>({ date: null, time: null });
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const contactRef = useRef<HTMLDivElement>(null);
  const daysRef = useRef<HTMLDivElement>(null);
  // Contrôlée : React vide les champs non contrôlés après l'envoi du formulaire.
  const [consent, setConsent] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (previous: BookingState, formData: FormData) => {
      const next = await bookAppointment(previous, formData);
      if (next.status === "error" && next.slotTaken) setReload((n) => n + 1);
      return next;
    },
    initialState,
  );

  const option = options.find((o) => o.key === optionKey) ?? options[0];
  const requestKey = `${optionKey}|${from ?? ""}|${reload}`;

  useEffect(() => {
    if (!optionKey) return;
    let cancelled = false;
    getAvailability(optionKey, from).then(
      (data) => !cancelled && setResult({ key: requestKey, data }),
      () => !cancelled && setResult({ key: requestKey, data: { ok: false } }),
    );
    return () => {
      cancelled = true;
    };
  }, [optionKey, from, requestKey]);

  const availability: Availability =
    result?.key !== requestKey
      ? { status: "loading" }
      : result.data.ok
        ? { status: "ready", ...result.data }
        : { status: "error" };

  // Jour retenu : celui choisi s'il est dans la période, sinon le premier
  // jour avec des créneaux. Heure : seulement si elle est encore libre.
  const loadedDays = availability.status === "ready" ? availability.days : [];
  const chosenDay = loadedDays.find(
    (d) => d.date === pick.date && d.times.length > 0,
  );
  const date =
    chosenDay?.date ?? loadedDays.find((d) => d.times.length > 0)?.date ?? null;
  const time =
    chosenDay && pick.time && chosenDay.times.includes(pick.time)
      ? pick.time
      : null;
  const setDate = (value: string) => setPick({ date: value, time: null });
  const setTime = (value: string) => {
    setPick({ date, time: value });
    // Mobile : les champs viennent d'apparaître sous le calendrier ; on les
    // amène à l'écran (le module est empilé sous 64rem).
    requestAnimationFrame(() => {
      if (!window.matchMedia("(max-width: 63.999rem)").matches) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      contactRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  };
  const scrollToDays = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    daysRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const chooseOption = useCallback((key: string) => {
    setOptionKey(key);
    setFrom(undefined);
    setHistory([]);
  }, []);

  // Ancre `#reserver-75` : choisit la durée correspondante. Le défilement est
  // assuré par les cibles invisibles de `BookingSection` (et Lenis). Trois
  // entrées : arrivée sur la page avec l'ancre, `hashchange`, et clic sur un
  // lien de la même page (Next change l'URL par `pushState`, sans
  // `hashchange`).
  useEffect(() => {
    const select = (hash: string) => {
      const match = hash.match(/^#reserver-(\d+)$/);
      const target = match
        ? options.find((o) => o.durationMinutes === Number(match[1]))
        : undefined;
      if (target) chooseOption(target.key);
    };
    const onHash = () => select(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      const hash = href.slice(href.indexOf("#"));
      const samePage =
        href.startsWith("#") || href.split("#")[0] === window.location.pathname;
      if (href.includes("#") && samePage) select(hash);
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);
    const frame = requestAnimationFrame(onHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, [options, chooseOption]);

  if (state.status === "success") {
    const [day, hour] = state.start.split(" ");
    return (
      <div
        role="status"
        className="flex animate-settle flex-col items-start gap-5 rounded-card bg-paper-soft p-8 md:p-12"
      >
        <span className="grid size-12 place-items-center rounded-full bg-night text-white">
          <CheckIcon className="size-5" />
        </span>
        <p className="text-h3">
          {state.confirmed
            ? "Votre rendez-vous est réservé"
            : "Votre demande de rendez-vous est envoyée"}
        </p>
        <p className="text-lead text-ink-soft">
          {serviceName}, {option?.label}
          <br />
          le {longDate.format(asUtc(day))} à{" "}
          {formatTime((hour ?? "").slice(0, 5))}
        </p>
        <p className="max-w-lg text-body text-pretty text-ink-soft">
          {state.confirmed
            ? "Vous allez recevoir un e-mail de confirmation avec le détail du rendez-vous."
            : "Je vous confirme le rendez-vous très vite, par e-mail."}{" "}
          Référence : <span className="font-medium text-ink">{state.code}</span>
          . Pour annuler ou déplacer, prévenez-moi au moins 24 h avant au{" "}
          <a href={site.phone.href} className="font-medium underline">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  if (
    !option ||
    availability.status === "error" ||
    (state.status === "error" && state.unavailable)
  ) {
    return <BookingFallback />;
  }

  const days = availability.status === "ready" ? availability.days : [];
  const selectedDay = days.find((d) => d.date === date);
  const anySlot = days.some((d) => d.times.length > 0);
  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const periodStart =
    availability.status === "ready" ? availability.from : from;

  return (
    <form
      action={formAction}
      className="grid gap-3 lg:grid-cols-[1.25fr_1fr] lg:gap-4"
    >
      <input type="hidden" name="option" value={option.key} />
      <input type="hidden" name="date" value={date ?? ""} />
      <input type="hidden" name="time" value={time ?? ""} />

      {/* 1. Formule, jour, heure */}
      <div className="flex flex-col gap-6 rounded-card bg-paper-soft p-5 sm:p-6 md:gap-8 md:p-10">
        {options.length > 1 ? (
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-eyebrow text-accent-800">Durée</legend>
            <div className="flex flex-wrap gap-2">
              {options.map((o) => (
                <label
                  key={o.key}
                  className="cursor-pointer rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-ink has-checked:bg-night has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-accent-800"
                >
                  <input
                    type="radio"
                    name="option-choice"
                    value={o.key}
                    checked={o.key === option.key}
                    onChange={() => chooseOption(o.key)}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : (
          <p className="text-eyebrow text-accent-800">
            {serviceName} · {option.label}
          </p>
        )}

        <div
          ref={daysRef}
          role="group"
          aria-label="Jour"
          className="flex scroll-mt-24 flex-col gap-4"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-h4 font-serif tracking-[-0.02em] italic first-letter:uppercase">
              {periodStart
                ? monthYear.format(asUtc(periodStart))
                : "Choisissez un jour"}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Période précédente"
                disabled={
                  history.length === 0 || availability.status !== "ready"
                }
                onClick={() => {
                  const previous = history.at(-1);
                  setHistory((h) => h.slice(0, -1));
                  setFrom(previous === "" ? undefined : previous);
                }}
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-line transition-colors hover:bg-white disabled:cursor-default disabled:opacity-30"
              >
                <ChevronRightIcon className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Période suivante"
                disabled={
                  availability.status !== "ready" || !availability.hasMore
                }
                onClick={() => {
                  if (availability.status !== "ready") return;
                  setHistory((h) => [...h, from ?? ""]);
                  setFrom(addDays(availability.from, 14));
                }}
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-line transition-colors hover:bg-white disabled:cursor-default disabled:opacity-30"
              >
                <ChevronRightIcon className="size-4" />
              </button>
            </div>
          </div>

          <div
            key={`${availability.status}-${periodStart ?? ""}`}
            aria-busy={availability.status === "loading"}
            className={cn(
              "grid grid-cols-7 gap-1.5 sm:gap-2",
              availability.status === "ready" && "animate-fade-in",
            )}
          >
            {availability.status === "loading"
              ? Array.from({ length: 14 }, (_, i) => (
                  <span
                    key={i}
                    className="h-[4.5rem] animate-pulse rounded-2xl bg-paper"
                  />
                ))
              : days.map((d) => {
                  const open = d.times.length > 0;
                  const selected = d.date === date;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      disabled={!open}
                      aria-pressed={selected}
                      onClick={() => setDate(d.date)}
                      className={cn(
                        "flex h-[4.5rem] cursor-pointer flex-col items-center justify-center rounded-2xl text-center transition-colors duration-300",
                        selected
                          ? "bg-night text-white"
                          : open
                            ? "bg-white text-ink hover:bg-accent-100"
                            : "cursor-default text-ink-subtle/50",
                      )}
                    >
                      {/* Nom accessible complet ; l'abrégé visible est décoratif. */}
                      <span className="sr-only">
                        {`${longDate.format(asUtc(d.date))}${open ? `, ${d.times.length} créneau${d.times.length > 1 ? "x" : ""}` : ", complet"}`}
                      </span>
                      <span
                        aria-hidden
                        className="text-[0.7rem] tracking-wide uppercase"
                      >
                        {weekday.format(asUtc(d.date)).replace(".", "")}
                      </span>
                      <span
                        aria-hidden
                        className="font-serif text-xl leading-tight italic"
                      >
                        {dayNum.format(asUtc(d.date))}
                      </span>
                      <span aria-hidden className="text-[0.65rem] opacity-70">
                        {month.format(asUtc(d.date)).replace(".", "")}
                      </span>
                    </button>
                  );
                })}
          </div>
          {availability.status === "ready" && !anySlot ? (
            <p className="text-body text-ink-soft">
              Aucun créneau libre sur ces deux semaines.{" "}
              {availability.hasMore
                ? "Essayez la période suivante, ou appelez-moi."
                : "Appelez-moi, je trouverai un moment avec vous."}
            </p>
          ) : null}
        </div>

        {selectedDay ? (
          <fieldset
            key={selectedDay.date}
            className="flex animate-settle flex-col gap-4"
          >
            <legend className="mb-4 text-eyebrow text-accent-800">
              {longDate.format(asUtc(selectedDay.date))}
            </legend>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {selectedDay.times.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={t === time}
                  onClick={() => setTime(t)}
                  className={cn(
                    "cursor-pointer rounded-full py-3 text-sm font-medium tabular-nums transition-colors duration-300",
                    t === time
                      ? "bg-night text-white"
                      : "bg-white text-ink hover:bg-accent-100",
                  )}
                >
                  {formatTime(t)}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}
        {state.status === "error" && state.slotTaken ? (
          <p
            role="alert"
            className="animate-settle rounded-2xl bg-accent-100 px-5 py-4 text-sm text-accent-900"
          >
            Ce créneau vient d&apos;être pris. Les disponibilités sont mises à
            jour : choisissez un autre moment.
          </p>
        ) : null}
      </div>

      {/* 2. Coordonnées */}
      <div
        ref={contactRef}
        className="flex scroll-mt-6 flex-col gap-5 rounded-card bg-paper-soft p-5 sm:p-6 md:p-10"
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-h4 font-serif tracking-[-0.02em] italic">
            Vos coordonnées
          </p>
          {date && time ? (
            <button
              type="button"
              onClick={scrollToDays}
              className="-my-3 inline-flex min-h-11 shrink-0 cursor-pointer items-center text-sm font-medium text-accent-800 underline decoration-current/30 underline-offset-4 hover:decoration-current lg:hidden"
            >
              Changer
            </button>
          ) : null}
        </div>
        <p className="text-sm text-ink-soft" aria-live="polite">
          {date && time ? (
            <>
              {serviceName}, {option.label}
              <br />
              <span className="font-medium text-ink">
                le {longDate.format(asUtc(date))} à {formatTime(time)}
              </span>
            </>
          ) : (
            "Choisissez d'abord un jour et une heure."
          )}
        </p>

        {/*
         * Mobile : les champs n'apparaissent qu'une fois le créneau choisi
         * (le formulaire vide doublait la hauteur du module). Ils restent
         * dans le DOM : la saisie n'est jamais perdue.
         */}
        <div
          className={cn(
            "flex flex-col gap-5 max-lg:animate-settle",
            !(date && time) && "max-lg:hidden",
          )}
        >
          <Field
            label="Nom et prénom"
            htmlFor="booking-name"
            error={errors.name}
          >
            <input
              id="booking-name"
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              aria-invalid={Boolean(errors.name)}
              className={fieldClass}
            />
          </Field>
          <Field label="E-mail" htmlFor="booking-email" error={errors.email}>
            <input
              id="booking-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={120}
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              aria-invalid={Boolean(errors.email)}
              className={fieldClass}
            />
          </Field>
          <Field label="Téléphone" htmlFor="booking-phone" error={errors.phone}>
            <input
              id="booking-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={25}
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
              aria-invalid={Boolean(errors.phone)}
              className={fieldClass}
            />
          </Field>

          <div aria-hidden className="hidden">
            <label>
              Ne pas remplir
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="consent"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-night"
            />
            <span>
              J&apos;accepte les{" "}
              <Link href={routes.cgv} className="underline underline-offset-4">
                conditions d&apos;annulation
              </Link>{" "}
              (prévenir au moins 24 h avant) et les{" "}
              <a
                href="https://simplybook.me/fr/terms-and-conditions"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                conditions de SimplyBook.me
              </a>
              , l&apos;outil de réservation.
            </span>
          </label>
          {errors.consent ? (
            <p className="-mt-3 text-sm text-accent-800">{errors.consent}</p>
          ) : null}
          {errors.slot ? (
            <p className="text-sm text-accent-800">{errors.slot}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending || !date || !time}
            className={cn(
              buttonClass({ variant: "primary", plain: true }),
              "mt-1",
            )}
          >
            {pending ? "Réservation en cours…" : "Confirmer le rendez-vous"}
          </button>
          <p className="text-xs leading-relaxed text-ink-subtle">
            Règlement sur place, le jour du soin. Vos coordonnées servent
            uniquement à gérer ce rendez-vous (
            <Link
              href={routes.confidentialite}
              className="underline underline-offset-4 hover:text-ink"
            >
              confidentialité
            </Link>
            ).
          </p>
        </div>
      </div>
    </form>
  );
}

/** Réservation en ligne indisponible : téléphone et formulaire de contact. */
export function BookingFallback() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-card bg-paper-soft p-8 md:p-12">
      <p className="text-h4 font-serif tracking-[-0.02em] italic">
        Réservez par téléphone ou par message
      </p>
      <p className="max-w-lg text-body text-pretty text-ink-soft">
        La réservation en ligne de ce soin n&apos;est pas disponible pour le
        moment. Appelez-moi ou écrivez-moi : je vous propose un créneau
        rapidement.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={site.phone.href}
          className={buttonClass({ variant: "primary", plain: true })}
        >
          {site.phone.display}
        </a>
        <Link
          href={`${routes.contact}#ecrire`}
          className="font-medium underline underline-offset-4"
        >
          Écrire un message
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-accent-800">{error}</p> : null}
    </div>
  );
}
