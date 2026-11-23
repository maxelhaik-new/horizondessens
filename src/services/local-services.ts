import type { Service } from "./types";

/**
 * Prestations locales (v1), d'après la carte 2026 — en attendant l'API
 * SimplyBook. L'ordre est celui d'affichage.
 *
 * `simplybook` : IDs de la prestation et de sa catégorie SimplyBook (relevés
 * le 23/11/2026 sur https://horizondessens.simplybook.it/v2/service/ et
 * /v2/ext/category/). Une variante sans IDs renvoie vers la réservation
 * générale. Modifier les prestations SimplyBook (sans les recréer) garde
 * ces IDs ; sinon, les mettre à jour ici.
 */
export const localServices: Service[] = [
  {
    slug: "kobido",
    name: "Kobido",
    variants: [
      {
        durationMinutes: 60,
        priceEuros: 100,
        simplybook: { service: "24", category: "16" },
      },
      { durationMinutes: 75, priceEuros: 120 },
    ],
  },
  {
    slug: "calme-et-harmonie",
    name: "Calme et harmonie",
    variants: [
      {
        durationMinutes: 75,
        priceEuros: 120,
        simplybook: { service: "15", category: "13" },
      },
    ],
  },
  {
    slug: "5-continents",
    name: "Massage des 5 Continents",
    variants: [
      {
        durationMinutes: 75,
        priceEuros: 120,
        simplybook: { service: "21", category: "6" },
      },
    ],
  },
  {
    slug: "jambes-legeres",
    name: "Jambes légères",
    variants: [{ durationMinutes: 75, priceEuros: 120 }],
  },
  {
    slug: "rituel-horizon",
    name: "Rituel Horizon",
    variants: [{ durationMinutes: 75, priceEuros: 120 }],
  },
];
