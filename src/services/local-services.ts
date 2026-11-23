import type { Service } from "./types";

/**
 * Prestations locales (v1), d'après la carte 2026 — en attendant l'API
 * SimplyBook. L'ordre est celui d'affichage.
 */
export const localServices: Service[] = [
  {
    slug: "kobido",
    name: "Kobido",
    variants: [
      { durationMinutes: 60, priceEuros: 100 },
      { durationMinutes: 75, priceEuros: 120 },
    ],
  },
  {
    slug: "calme-et-harmonie",
    name: "Calme et harmonie",
    variants: [{ durationMinutes: 75, priceEuros: 120 }],
  },
  {
    slug: "5-continents",
    name: "Massage des 5 Continents",
    variants: [{ durationMinutes: 75, priceEuros: 120 }],
  },
  {
    slug: "jambes-legeres",
    name: "Jambes légères",
    variants: [{ durationMinutes: 75, priceEuros: 120 }],
  },
  {
    slug: "rituel-horizon",
    name: "Rituel Horizon",
    // Tarif à confirmer avec Élodie.
    variants: [{ durationMinutes: 75, priceEuros: null }],
  },
];
