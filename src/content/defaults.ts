import type { ContentValues } from "./registry";

/**
 * Valeurs par défaut des champs de contenu.
 *
 * v1 : c'est la seule source du contenu.
 * Avec le CMS : valeurs de repli quand un champ n'existe pas (encore) en base.
 *
 * TypeScript impose une valeur pour chaque clé du registre.
 */
export const contentDefaults: ContentValues = {};
