import type { Service } from "./types";

/**
 * Prestations, d'après la carte 2026. L'ordre est celui d'affichage.
 *
 * Source de vérité des noms, durées et prix : ce fichier (SimplyBook n'a pas
 * de prix, le module de paiement n'y est pas activé).
 *
 * `simplybookId` : ID de la prestation SimplyBook **« 2026 »** de chaque
 * durée (créées à part : les prestations legacy restent intactes et ne sont
 * jamais liées). Lister les IDs : `npm run simplybook:services`.
 */
export const localServices: Service[] = [
  {
    slug: "kobido",
    name: "Kobido",
    variants: [
      { durationMinutes: 60, priceEuros: 100, simplybookId: 25 },
      { durationMinutes: 75, priceEuros: 120, simplybookId: 26 },
    ],
  },
  {
    slug: "calme-et-harmonie",
    name: "Calme et harmonie",
    variants: [{ durationMinutes: 75, priceEuros: 120, simplybookId: 27 }],
  },
  {
    slug: "5-continents",
    name: "Massage des 5 Continents",
    variants: [{ durationMinutes: 75, priceEuros: 135, simplybookId: 28 }],
  },
  {
    slug: "jambes-legeres",
    name: "Jambes légères",
    variants: [{ durationMinutes: 75, priceEuros: 120, simplybookId: 29 }],
  },
  {
    slug: "rituel-horizon",
    name: "Rituel Horizon",
    variants: [{ durationMinutes: 75, priceEuros: 120, simplybookId: 30 }],
  },
];
