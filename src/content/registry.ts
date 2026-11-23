import { defineFields, type FieldValue } from "./schema";

/**
 * Registre de TOUTES les clés de contenu éditables du site.
 *
 * Convention de nommage : `<page>.<section>.<champ>` (ex. `home.hero.title`),
 * et `service.<slug>.<champ>` pour l'éditorial des soins, partagé entre pages
 * et relié à la prestation SimplyBook par son slug.
 *
 * Les clés sont ajoutées page par page, à partir des contenus validés
 * (voir docs/contenu/). Aucune pour l'instant.
 */
export const contentFields = defineFields({});

export type ContentFields = typeof contentFields;
export type ContentKey = keyof ContentFields;

export type ContentValues = {
  [K in ContentKey]: FieldValue<ContentFields[K]>;
};
