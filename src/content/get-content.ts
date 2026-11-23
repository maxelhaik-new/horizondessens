import "server-only";

import { markEditable, noEdit, type EditFn } from "./edit";
import type { ContentKey, ContentValues } from "./registry";
import { loadCmsState, resolveValue } from "./store";

/**
 * Point d'accès UNIQUE au contenu éditable. Les composants n'importent jamais
 * `contentDefaults` directement.
 *
 * Source : Supabase (contenu publié, mis en cache, invalidé à la publication),
 * avec repli sur les valeurs par défaut du code (`defaults.ts`). En mode
 * édition (Draft Mode, après connexion sur /admin) : brouillons compris.
 */
export async function getContent<K extends ContentKey>(
  key: K,
): Promise<ContentValues[K]> {
  const { values } = await loadCmsState();
  return resolveValue(values, key);
}

/**
 * Récupère plusieurs clés d'un coup (pratique pour une section), plus
 * `edit(clé, index?, sous-champ?)` pour marquer l'élément qui affiche chaque
 * valeur. `edit` ne renvoie rien pour les visiteurs (HTML public inchangé).
 */
export async function getContents<const K extends readonly ContentKey[]>(
  keys: K,
): Promise<
  { [I in K[number]]: ContentValues[I] } & { edit: EditFn<K[number]> }
> {
  const { values, editing } = await loadCmsState();
  const entries = keys.map((key) => [key, resolveValue(values, key)] as const);
  return {
    ...(Object.fromEntries(entries) as { [I in K[number]]: ContentValues[I] }),
    edit: editing ? markEditable : noEdit,
  };
}

/** Marqueur seul, pour un composant qui reçoit ses valeurs d'un parent. */
export async function getEdit(): Promise<EditFn<ContentKey>> {
  const { editing } = await loadCmsState();
  return editing ? markEditable : noEdit;
}
