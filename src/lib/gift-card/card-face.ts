import layout from "./card-layout.json";

/**
 * Recto de la carte cadeau : mise en page commune (`card-layout.json`) au
 * visuel des mockups, au PDF et à l'aperçu de la page de remerciement.
 */
export const cardLayout = layout;

/** Accroche sous « Carte Cadeau », selon la durée de la séance. */
export function cardTagline(durationMinutes: number) {
  if (durationMinutes === 60) return "une heure rien que pour vous";
  if (durationMinutes === 75) return "une heure et quart rien que pour vous";
  const h = Math.floor(durationMinutes / 60);
  const m = durationMinutes % 60;
  return `${h}h${m ? String(m).padStart(2, "0") : ""} rien que pour vous`;
}
