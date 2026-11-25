import "server-only";

import type { EditAttrs } from "@/content/edit";
import { getContents } from "@/content/get-content";
import type {
  ContentKey,
  ContentValues,
  ServicePageField,
} from "@/content/registry";
import type { ServicePageSlug } from "@/services/pages";

type Key<F extends ServicePageField> = `soin.${ServicePageSlug}.${F}` &
  ContentKey;

/**
 * `getContents` pour une page de soin : on demande des champs du gabarit
 * (`hero.title`…) sans répéter le préfixe `soin.<slug>.`.
 * Renvoie les valeurs par champ et `edit(champ, index?, sous-champ?)`.
 */
export async function getServicePageContents<
  const F extends readonly ServicePageField[],
>(slug: ServicePageSlug, fields: F) {
  const key = (field: F[number]) => `soin.${slug}.${field}` as Key<F[number]>;
  const c = await getContents(fields.map(key));
  const values = Object.fromEntries(
    fields.map((field) => [field, c[key(field)]]),
  ) as { [P in F[number]]: ContentValues[Key<P>] };
  const edit = (field: F[number], item?: number, sub?: string): EditAttrs =>
    c.edit(key(field), item, sub);
  return { ...values, edit };
}
