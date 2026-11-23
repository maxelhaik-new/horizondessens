import "server-only";

import { contentDefaults } from "./defaults";
import type { ContentKey, ContentValues } from "./registry";

/**
 * Point d'accès UNIQUE au contenu éditable. Les composants n'importent jamais
 * `contentDefaults` directement.
 *
 * v1 : lit les valeurs par défaut locales.
 * CMS (plus tard) : lira Supabase (contenu publié) avec repli sur les valeurs
 * par défaut, mis en cache et revalidé à la publication. Seul ce fichier
 * changera, pas les composants.
 */
export async function getContent<K extends ContentKey>(
  key: K,
): Promise<ContentValues[K]> {
  return contentDefaults[key];
}

/** Récupère plusieurs clés d'un coup (pratique pour une section). */
export async function getContents<const K extends readonly ContentKey[]>(
  keys: K,
): Promise<{ [I in K[number]]: ContentValues[I] }> {
  const entries = await Promise.all(
    keys.map(async (key) => [key, await getContent(key)] as const),
  );
  return Object.fromEntries(entries) as { [I in K[number]]: ContentValues[I] };
}
