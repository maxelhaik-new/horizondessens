/**
 * Marquage des éléments éditables (mode édition uniquement).
 *
 * Les composants posent `{...c.edit("clé")}` sur l'élément qui AFFICHE la
 * valeur (le `<p>`, le `<h2>`, l'`<Image>`…). Pour les visiteurs, `edit()`
 * renvoie `{}` : le HTML public reste strictement identique. En mode
 * édition, il pose des attributs `data-cms*` que l'éditeur (src/cms/) lit.
 *
 * - `item` : index dans une liste, des éléments ou une galerie ;
 * - `sub`  : sous-champ d'un élément (ex. `question`) ou `caption`.
 */
export type EditAttrs = {
  "data-cms"?: string;
  "data-cms-item"?: number;
  "data-cms-sub"?: string;
};

export type EditFn<K extends string = string> = (
  key: K,
  item?: number,
  sub?: string,
) => EditAttrs;

export const noEdit: EditFn = () => ({});

export const markEditable: EditFn = (key, item, sub) => ({
  "data-cms": key,
  ...(item === undefined ? {} : { "data-cms-item": item }),
  ...(sub === undefined ? {} : { "data-cms-sub": sub }),
});
