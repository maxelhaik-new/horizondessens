/**
 * Prestation réservable. Source de vérité : SimplyBook (nom, durées, prix).
 * L'éditorial (sous-titre, description, image) vit dans le registre de
 * contenu sous `service.<slug>.*`.
 */
export type ServiceVariant = {
  durationMinutes: number;
  /** `null` = tarif non communiqué. */
  priceEuros: number | null;
  /** ID de la prestation dans SimplyBook (une prestation SimplyBook par durée si besoin). */
  simplybookId?: string;
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
