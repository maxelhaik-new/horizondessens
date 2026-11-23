import "server-only";

import { getService } from "@/services/get-services";

/**
 * Cartes cadeaux vendues en ligne : une par durée de Kobido (prix lus dans
 * les prestations, donc SimplyBook plus tard). Le 5 Continents est proposé
 * sur demande (décision d'Élodie, voir CONTEXTE.md §13).
 */
export type GiftCard = {
  /** Identifiant transmis au paiement (`kobido-60`, `kobido-75`). */
  id: string;
  name: string;
  durationMinutes: number;
  priceEuros: number;
};

export async function getGiftCards(): Promise<GiftCard[]> {
  const kobido = await getService("kobido");
  if (!kobido) return [];
  return kobido.variants.flatMap((v) =>
    v.priceEuros === null
      ? []
      : [
          {
            id: `kobido-${v.durationMinutes}`,
            name: kobido.name,
            durationMinutes: v.durationMinutes,
            priceEuros: v.priceEuros,
          },
        ],
  );
}

export async function getGiftCard(id: string) {
  return (await getGiftCards()).find((card) => card.id === id);
}
