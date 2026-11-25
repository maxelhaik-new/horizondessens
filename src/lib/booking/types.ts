/**
 * Types partagés (serveur et navigateur) du module de réservation intégré.
 * Une « formule » = une durée d'un soin, identifiée par `<slug>-<minutes>`
 * (ex. `kobido-75`) : le navigateur n'envoie jamais d'ID SimplyBook.
 */

export type BookableOption = {
  /** `<slug>-<minutes>` */
  key: string;
  durationMinutes: number;
  /** « 1h15 · 120 € » */
  label: string;
};

export type DayAvailability = {
  /** YYYY-MM-DD (heure de Paris) */
  date: string;
  /** HH:MM */
  times: string[];
};

export type AvailabilityResult =
  | { ok: true; from: string; days: DayAvailability[]; hasMore: boolean }
  | { ok: false };

export type BookingFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "consent" | "slot", string>
>;

export type BookingState =
  | { status: "idle" }
  | {
      status: "error";
      errors?: BookingFieldErrors;
      /** Créneau pris entre-temps : recharger les disponibilités. */
      slotTaken?: boolean;
      /** Service indisponible : proposer le téléphone. */
      unavailable?: boolean;
    }
  | {
      status: "success";
      code: string;
      /** YYYY-MM-DD HH:MM:SS (heure de Paris) */
      start: string;
      confirmed: boolean;
    };
