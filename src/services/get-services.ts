import "server-only";

import { localServices } from "./local-services";
import type { Service } from "./types";

/**
 * Point d'accès UNIQUE aux prestations.
 *
 * v1 : données locales (`local-services.ts`).
 * Plus tard : API SimplyBook (`getEventList`, appelée côté serveur, clé jamais
 * exposée au navigateur, résultat mis en cache), avec repli sur les données
 * locales. Seul ce fichier changera, pas les composants.
 */
export async function getServices(): Promise<Service[]> {
  return localServices;
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((service) => service.slug === slug);
}
