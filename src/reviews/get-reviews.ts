import "server-only";

export type Review = {
  author: string;
  rating: number;
  text: string;
  date?: string;
};

/**
 * Avis clients. Source prévue : Google (API Places / widget).
 * Règle projet : aucun avis saisi à la main ni inventé. Tant que la source
 * n'est pas branchée, la liste est vide et la section reste masquée.
 */
export async function getReviews(): Promise<Review[]> {
  return [];
}
