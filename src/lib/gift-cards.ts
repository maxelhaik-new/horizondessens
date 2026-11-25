import "server-only";

import { getServices } from "@/services/get-services";

/**
 * Cartes cadeaux vendues en ligne (décision de Maxime, 26/11/2026) : une
 * carte **par durée de séance**, valable pour le soin de son choix parmi
 * ceux qui existent dans cette durée (1h : Kobido ; 1h15 : toute la carte).
 *
 * Prix = tarif le plus bas des soins de cette durée, lu dans les prestations.
 * Pour un soin plus cher (Massage des 5 Continents), la différence se règle
 * au salon (CGV, « Cartes cadeaux »).
 */
export type GiftCard = {
  /** Identifiant transmis au paiement (`seance-60`, `seance-75`). */
  id: string;
  /** Libellé de la prestation offerte (« Séance »). */
  name: string;
  durationMinutes: number;
  priceEuros: number;
  /** Soins possibles avec cette carte. */
  soins: string[];
};

export async function getGiftCards(): Promise<GiftCard[]> {
  const services = await getServices();
  const byDuration = new Map<number, { price: number; soins: string[] }>();

  for (const service of services) {
    for (const v of service.variants) {
      if (v.priceEuros === null) continue;
      const entry = byDuration.get(v.durationMinutes);
      if (entry) {
        entry.price = Math.min(entry.price, v.priceEuros);
        entry.soins.push(service.name);
      } else {
        byDuration.set(v.durationMinutes, {
          price: v.priceEuros,
          soins: [service.name],
        });
      }
    }
  }

  return [...byDuration.entries()]
    .sort(([a], [b]) => a - b)
    .map(([durationMinutes, { price, soins }]) => ({
      id: `seance-${durationMinutes}`,
      name: "Séance",
      durationMinutes,
      priceEuros: price,
      soins,
    }));
}

export async function getGiftCard(id: string) {
  return (await getGiftCards()).find((card) => card.id === id);
}
