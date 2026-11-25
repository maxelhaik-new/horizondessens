/**
 * Prestation réservable. Source de vérité : SimplyBook (nom, durées, prix).
 * L'éditorial (sous-titre, description, image) vit dans le registre de
 * contenu sous `service.<slug>.*`.
 */
export type ServiceVariant = {
  durationMinutes: number;
  /** `null` = tarif non communiqué. */
  priceEuros: number | null;
  /**
   * ID de la prestation SimplyBook « 2026 » correspondante (une par durée),
   * utilisée par le module de réservation intégré (API REST publique).
   * Absent : réservation en ligne indisponible pour cette durée (repli :
   * téléphone et formulaire de contact). Jamais d'ID d'une prestation legacy.
   */
  simplybookId?: number;
};

export type ServiceSlug =
  | "kobido"
  | "calme-et-harmonie"
  | "5-continents"
  | "jambes-legeres"
  | "rituel-horizon";

export type Service = {
  /** Slug stable utilisé dans le code et les clés de contenu (`service.<slug>.*`). */
  slug: ServiceSlug;
  name: string;
  variants: ServiceVariant[];
};
