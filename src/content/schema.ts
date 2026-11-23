/**
 * Schéma des champs de contenu éditables par Élodie (futur mini-CMS).
 *
 * Règle projet : seul le CONTENU PRINCIPAL reçoit une clé (titres, accroches,
 * paragraphes, listes, images de contenu). Les metas, menus, liens, libellés
 * d'interface et données de prestations (nom, durée, prix → SimplyBook)
 * restent dans le code.
 */

type FieldBase = {
  /** Libellé affiché dans l'interface d'édition. */
  label: string;
  /** Aide facultative affichée sous le champ. */
  help?: string;
};

export type TextField = FieldBase & {
  /** `text` = une ligne, `textarea` = un paragraphe (retours à la ligne autorisés). */
  type: "text" | "textarea";
  maxLength: number;
};

export type ListField = FieldBase & {
  type: "list";
  maxItems: number;
  itemMaxLength: number;
};

export type ImageRatio = `${number}:${number}`;

export type ImageField = FieldBase & {
  type: "image";
  /** Ratio imposé au recadrage. */
  ratio: ImageRatio;
  /** Longueur max du texte alternatif. */
  altMaxLength?: number;
};

export type FieldDef = TextField | ListField | ImageField;

export type ImageValue = {
  src: string;
  alt: string;
};

export type FieldValue<F extends FieldDef> = F extends ImageField
  ? ImageValue
  : F extends ListField
    ? string[]
    : string;

/** Déclare un groupe de champs en conservant les types littéraux des clés. */
export function defineFields<const T extends Record<string, FieldDef>>(
  fields: T,
): T {
  return fields;
}
