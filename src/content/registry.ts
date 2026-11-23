import {
  defineFields,
  type FieldValue,
  type ImageField,
  type TextField,
} from "./schema";

/**
 * Registre de TOUTES les clés de contenu éditables du site.
 *
 * Convention : `<page>.<section>.<champ>` (ex. `home.hero.title`), et
 * `service.<slug>.<champ>` pour l'éditorial des soins (partagé entre pages,
 * relié à la prestation SimplyBook par son slug).
 *
 * Source : docs/contenu/accueil-v1.md. Seul le contenu principal a une clé ;
 * metas, menus, liens et libellés d'interface restent dans le code.
 */

const IMAGE_ALT = 140;

type ServiceFields<S extends string> = Record<
  `service.${S}.subtitle`,
  TextField
> &
  Record<`service.${S}.short`, TextField> &
  Record<`service.${S}.image`, ImageField>;

/** Champs éditoriaux d'un soin (clés typées `service.<slug>.*`). */
const serviceFields = <S extends string>(
  slug: S,
  label: string,
): ServiceFields<S> =>
  ({
    [`service.${slug}.subtitle`]: {
      type: "text",
      label: `${label} — sous-titre (zone · bénéfice)`,
      maxLength: 45,
    },
    [`service.${slug}.short`]: {
      type: "textarea",
      label: `${label} — description courte`,
      maxLength: 130,
    },
    [`service.${slug}.image`]: {
      type: "image",
      label: `${label} — image`,
      ratio: "4:3",
      altMaxLength: IMAGE_ALT,
    },
  }) as ServiceFields<S>;

export const contentFields = defineFields({
  // --- Accueil · Hero ---
  "home.hero.image": {
    type: "image",
    label: "Hero — image",
    ratio: "16:9",
    altMaxLength: IMAGE_ALT,
  },
  "home.hero.eyebrow": {
    type: "text",
    label: "Hero — surtitre",
    maxLength: 50,
  },
  "home.hero.title": {
    type: "text",
    label: "Hero — titre (H1)",
    maxLength: 70,
  },
  "home.hero.lead": {
    type: "textarea",
    label: "Hero — accroche",
    maxLength: 160,
  },
  "home.trust.items": {
    type: "items",
    label: "Hero — faits clés (valeur + libellé)",
    maxItems: 4,
    fields: {
      value: { label: "Valeur (grand, italique)", maxLength: 12 },
      label: { label: "Libellé", maxLength: 32 },
    },
  },

  // --- Philosophie (déclaration d'Élodie) ---
  "home.philo.eyebrow": {
    type: "text",
    label: "Philosophie — pastille",
    maxLength: 30,
  },
  "home.philo.text": {
    type: "textarea",
    label: "Philosophie — déclaration (grand titre)",
    maxLength: 150,
  },

  // --- Bandeau de mots ---
  "home.marquee.items": {
    type: "list",
    label: "Bandeau défilant — mots",
    maxItems: 8,
    itemMaxLength: 20,
  },

  // --- Soins ---
  "home.soins.eyebrow": {
    type: "text",
    label: "Soins — surtitre",
    maxLength: 30,
  },
  "home.soins.title": { type: "text", label: "Soins — titre", maxLength: 50 },
  "home.soins.intro": {
    type: "textarea",
    label: "Soins — intro",
    maxLength: 140,
  },
  "home.soins.surmesure": {
    type: "textarea",
    label: "Soins — ligne Rituel Horizon",
    maxLength: 150,
  },
  ...serviceFields("kobido", "Kobido"),
  ...serviceFields("calme-et-harmonie", "Calme et harmonie"),
  ...serviceFields("5-continents", "5 Continents"),
  ...serviceFields("jambes-legeres", "Jambes légères"),
  "service.rituel-horizon.subtitle": {
    type: "text",
    label: "Rituel Horizon — sous-titre",
    maxLength: 45,
  },

  // --- Focus Kobido ---
  "home.kobido.image": {
    type: "image",
    label: "Kobido — image",
    ratio: "4:5",
    altMaxLength: IMAGE_ALT,
  },
  "home.kobido.eyebrow": {
    type: "text",
    label: "Kobido — surtitre",
    maxLength: 40,
  },
  "home.kobido.title": { type: "text", label: "Kobido — titre", maxLength: 70 },
  "home.kobido.text": {
    type: "textarea",
    label: "Kobido — texte",
    maxLength: 280,
  },
  "home.kobido.benefits": {
    type: "list",
    label: "Kobido — bénéfices",
    maxItems: 3,
    itemMaxLength: 50,
  },

  // --- Focus 5 Continents ---
  "home.5c.image": {
    type: "image",
    label: "5 Continents — image",
    ratio: "3:4",
    altMaxLength: IMAGE_ALT,
  },
  "home.5c.eyebrow": {
    type: "text",
    label: "5 Continents — surtitre",
    maxLength: 40,
  },
  "home.5c.title": {
    type: "text",
    label: "5 Continents — titre",
    maxLength: 70,
  },
  "home.5c.text": {
    type: "textarea",
    label: "5 Continents — texte",
    maxLength: 300,
  },
  "home.5c.licence": {
    type: "text",
    label: "5 Continents — mention licence",
    maxLength: 80,
  },

  // --- Le salon ---
  "home.salon.image": {
    type: "image",
    label: "Salon — image",
    ratio: "16:9",
    altMaxLength: IMAGE_ALT,
  },
  "home.salon.eyebrow": {
    type: "text",
    label: "Salon — surtitre",
    maxLength: 30,
  },
  "home.salon.title": { type: "text", label: "Salon — titre", maxLength: 60 },
  "home.salon.text": {
    type: "textarea",
    label: "Salon — texte",
    maxLength: 180,
  },
  "home.salon.gallery": {
    type: "list",
    label: "Salon — galerie (chemins d'images)",
    help: "Remplacé par un vrai champ galerie avec le CMS.",
    maxItems: 6,
    itemMaxLength: 120,
  },

  // --- Les 3 temps d'une séance ---
  "home.steps.eyebrow": {
    type: "text",
    label: "Séance — pastille",
    maxLength: 30,
  },
  "home.steps.title": { type: "text", label: "Séance — titre", maxLength: 60 },
  "home.steps.intro": {
    type: "textarea",
    label: "Séance — intro",
    maxLength: 140,
  },
  "home.steps.items": {
    type: "items",
    label: "Séance — les 3 temps",
    maxItems: 3,
    fields: {
      title: { label: "Titre", maxLength: 25 },
      text: { label: "Texte", maxLength: 110 },
    },
  },

  // --- Élodie ---
  "home.elodie.image": {
    type: "image",
    label: "Élodie — portrait",
    ratio: "4:5",
    altMaxLength: IMAGE_ALT,
  },
  "home.elodie.title": { type: "text", label: "Élodie — titre", maxLength: 40 },
  "home.elodie.subtitle": {
    type: "text",
    label: "Élodie — sous-titre",
    maxLength: 70,
  },
  "home.elodie.text": {
    type: "textarea",
    label: "Élodie — texte",
    maxLength: 320,
  },

  // --- Avis ---
  "home.avis.title": { type: "text", label: "Avis — titre", maxLength: 50 },

  // --- Abonnement & carte cadeau ---
  "home.abo.title": {
    type: "text",
    label: "Abonnement — titre",
    maxLength: 50,
  },
  "home.abo.text": {
    type: "textarea",
    label: "Abonnement — texte",
    maxLength: 140,
  },
  "home.cadeau.image": {
    type: "image",
    label: "Carte cadeau — image",
    ratio: "4:3",
    altMaxLength: IMAGE_ALT,
  },
  "home.cadeau.title": {
    type: "text",
    label: "Carte cadeau — titre",
    maxLength: 50,
  },
  "home.cadeau.text": {
    type: "textarea",
    label: "Carte cadeau — texte",
    maxLength: 140,
  },

  // --- FAQ ---
  "home.faq.eyebrow": { type: "text", label: "FAQ — surtitre", maxLength: 30 },
  "home.faq.title": { type: "text", label: "FAQ — titre", maxLength: 50 },
  "home.faq.intro": { type: "textarea", label: "FAQ — intro", maxLength: 140 },
  "home.faq.items": {
    type: "items",
    label: "FAQ — questions",
    maxItems: 6,
    fields: {
      question: { label: "Question", maxLength: 90 },
      answer: { label: "Réponse", maxLength: 280, multiline: true },
    },
  },

  // --- Appel final ---
  "home.final.title": {
    type: "text",
    label: "Appel final — titre",
    maxLength: 60,
  },
  "home.final.text": {
    type: "textarea",
    label: "Appel final — texte",
    maxLength: 140,
  },
  "home.final.access": {
    type: "textarea",
    label: "Infos pratiques — accès et stationnement",
    maxLength: 140,
  },
});

export type ContentFields = typeof contentFields;
export type ContentKey = keyof ContentFields;

export type ContentValues = {
  [K in ContentKey]: FieldValue<ContentFields[K]>;
};
