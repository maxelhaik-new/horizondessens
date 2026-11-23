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

  // ===== Page Kobido (/kobido) =====
  "kobido.hero.title": {
    type: "text",
    label: "Kobido · Hero — titre (H1)",
    maxLength: 70,
  },
  "kobido.hero.lead": {
    type: "textarea",
    label: "Kobido · Hero — accroche",
    maxLength: 180,
  },
  "kobido.hero.image": {
    type: "image",
    label: "Kobido · Hero — image",
    ratio: "4:5",
    altMaxLength: IMAGE_ALT,
  },

  "kobido.origine.eyebrow": {
    type: "text",
    label: "Kobido · Origine — pastille",
    maxLength: 30,
  },
  "kobido.origine.title": {
    type: "text",
    label: "Kobido · Origine — titre",
    maxLength: 60,
  },
  "kobido.origine.text": {
    type: "textarea",
    label: "Kobido · Origine — texte (paragraphes séparés par une ligne vide)",
    maxLength: 700,
  },
  "kobido.origine.quote": {
    type: "textarea",
    label: "Kobido · Origine — citation",
    maxLength: 120,
  },
  "kobido.origine.image": {
    type: "image",
    label: "Kobido · Origine — image",
    ratio: "3:4",
    altMaxLength: IMAGE_ALT,
  },

  "kobido.gestes.eyebrow": {
    type: "text",
    label: "Kobido · Gestes — pastille",
    maxLength: 30,
  },
  "kobido.gestes.title": {
    type: "text",
    label: "Kobido · Gestes — titre",
    maxLength: 60,
  },
  "kobido.gestes.items": {
    type: "items",
    label: "Kobido · Gestes — les gestes du soin",
    maxItems: 4,
    fields: {
      title: { label: "Nom du geste", maxLength: 30 },
      text: { label: "Description", maxLength: 180, multiline: true },
      image: { label: "Image (chemin)", maxLength: 120 },
    },
  },

  "kobido.effets.eyebrow": {
    type: "text",
    label: "Kobido · Ressentis — pastille",
    maxLength: 30,
  },
  "kobido.effets.title": {
    type: "text",
    label: "Kobido · Ressentis — titre",
    maxLength: 60,
  },
  "kobido.effets.items": {
    type: "items",
    label: "Kobido · Ressentis — 4 effets",
    maxItems: 4,
    fields: {
      title: { label: "Titre", maxLength: 40 },
      text: { label: "Texte", maxLength: 140, multiline: true },
    },
  },

  "kobido.formules.eyebrow": {
    type: "text",
    label: "Kobido · Formules — pastille",
    maxLength: 30,
  },
  "kobido.formules.title": {
    type: "text",
    label: "Kobido · Formules — titre",
    maxLength: 60,
  },
  "kobido.formules.court": {
    type: "textarea",
    label: "Kobido · Formule 1h — description",
    maxLength: 160,
  },
  "kobido.formules.long": {
    type: "textarea",
    label: "Kobido · Formule 1h15 — description",
    maxLength: 160,
  },
  "kobido.formules.cure": {
    type: "textarea",
    label: "Kobido · Cure / abonnement — texte",
    maxLength: 200,
  },

  "kobido.approche.eyebrow": {
    type: "text",
    label: "Kobido · Approche — pastille",
    maxLength: 30,
  },
  "kobido.approche.quote": {
    type: "textarea",
    label: "Kobido · Approche — citation d'Élodie",
    maxLength: 220,
  },
  "kobido.approche.text": {
    type: "textarea",
    label: "Kobido · Approche — texte",
    maxLength: 320,
  },

  "kobido.seance.eyebrow": {
    type: "text",
    label: "Kobido · Séance — pastille",
    maxLength: 30,
  },
  "kobido.seance.title": {
    type: "text",
    label: "Kobido · Séance — titre",
    maxLength: 60,
  },
  "kobido.seance.items": {
    type: "items",
    label: "Kobido · Séance — déroulé",
    maxItems: 5,
    fields: {
      time: { label: "Repère (ex. 5 min)", maxLength: 14 },
      title: { label: "Étape", maxLength: 35 },
      text: { label: "Texte", maxLength: 140, multiline: true },
    },
  },

  "kobido.faq.title": {
    type: "text",
    label: "Kobido · FAQ — titre",
    maxLength: 50,
  },
  "kobido.faq.intro": {
    type: "textarea",
    label: "Kobido · FAQ — intro",
    maxLength: 160,
  },
  "kobido.faq.items": {
    type: "items",
    label: "Kobido · FAQ — questions",
    maxItems: 6,
    fields: {
      question: { label: "Question", maxLength: 90 },
      answer: { label: "Réponse", maxLength: 280, multiline: true },
    },
  },

  "kobido.final.title": {
    type: "text",
    label: "Kobido · Appel final — titre",
    maxLength: 60,
  },
  "kobido.final.text": {
    type: "textarea",
    label: "Kobido · Appel final — texte",
    maxLength: 160,
  },
  "kobido.final.image": {
    type: "image",
    label: "Kobido · Appel final — image",
    ratio: "16:9",
    altMaxLength: IMAGE_ALT,
  },
  // --- Contact ---
  "contact.hero.eyebrow": {
    type: "text",
    label: "Contact · Hero — pastille",
    maxLength: 30,
  },
  "contact.hero.title": {
    type: "text",
    label: "Contact · Hero — titre",
    maxLength: 60,
  },
  "contact.hero.lead": {
    type: "textarea",
    label: "Contact · Hero — accroche",
    maxLength: 180,
  },
  "contact.hero.image": {
    type: "image",
    label: "Contact · Hero — image",
    ratio: "16:9",
    altMaxLength: IMAGE_ALT,
  },
  "contact.form.title": {
    type: "text",
    label: "Contact · Formulaire — titre",
    maxLength: 50,
  },
  "contact.form.intro": {
    type: "textarea",
    label: "Contact · Formulaire — intro",
    maxLength: 220,
  },
  "contact.visit.title": {
    type: "text",
    label: "Contact · Venir au salon — titre",
    maxLength: 50,
  },
  "contact.visit.text": {
    type: "textarea",
    label: "Contact · Venir au salon — texte",
    maxLength: 300,
  },
  // --- Le salon ---
  "salon.hero.title": {
    type: "text",
    label: "Salon · Hero — titre",
    maxLength: 60,
  },
  "salon.hero.lead": {
    type: "textarea",
    label: "Salon · Hero — accroche",
    maxLength: 200,
  },
  "salon.hero.image": {
    type: "image",
    label: "Salon · Hero — image",
    ratio: "16:9",
    altMaxLength: IMAGE_ALT,
  },
  "salon.lieu.title": {
    type: "text",
    label: "Salon · Le lieu — titre",
    maxLength: 60,
  },
  "salon.lieu.text": {
    type: "textarea",
    label: "Salon · Le lieu — texte",
    maxLength: 420,
  },
  "salon.lieu.gallery": {
    type: "items",
    label: "Salon · Le lieu — galerie",
    help: "Remplacé par un vrai champ galerie avec le CMS.",
    maxItems: 6,
    fields: {
      image: { label: "Image (chemin)", maxLength: 120 },
      alt: { label: "Texte alternatif", maxLength: IMAGE_ALT },
      caption: { label: "Légende", maxLength: 50 },
    },
  },
  "salon.details.items": {
    type: "items",
    label: "Salon · Ce qui vous attend",
    maxItems: 3,
    fields: {
      title: { label: "Titre", maxLength: 40 },
      text: { label: "Texte", maxLength: 160, multiline: true },
    },
  },
  "salon.elodie.eyebrow": {
    type: "text",
    label: "Salon · Élodie — pastille",
    maxLength: 30,
  },
  "salon.elodie.title": {
    type: "text",
    label: "Salon · Élodie — titre",
    maxLength: 60,
  },
  "salon.elodie.intro": {
    type: "textarea",
    label: "Salon · Élodie — introduction",
    maxLength: 320,
  },
  "salon.elodie.image": {
    type: "image",
    label: "Salon · Élodie — portrait",
    ratio: "3:4",
    altMaxLength: IMAGE_ALT,
  },
  "salon.elodie.chapters": {
    type: "items",
    label: "Salon · Élodie — parcours",
    maxItems: 8,
    fields: {
      time: { label: "Période", maxLength: 20 },
      title: { label: "Titre", maxLength: 40 },
      text: { label: "Texte", maxLength: 320, multiline: true },
    },
  },
  "salon.elodie.quote": {
    type: "textarea",
    label: "Salon · Élodie — citation",
    maxLength: 140,
  },
  "salon.final.title": {
    type: "text",
    label: "Salon · Appel final — titre",
    maxLength: 60,
  },
  "salon.final.text": {
    type: "textarea",
    label: "Salon · Appel final — texte",
    maxLength: 180,
  },

  // --- Carte cadeau ---
  "cadeau.hero.title": {
    type: "text",
    label: "Carte cadeau · Hero — titre",
    maxLength: 60,
  },
  "cadeau.hero.lead": {
    type: "textarea",
    label: "Carte cadeau · Hero — accroche",
    maxLength: 200,
  },
  "cadeau.hero.image": {
    type: "image",
    label: "Carte cadeau · Hero — visuel",
    ratio: "5:4",
    altMaxLength: IMAGE_ALT,
  },
  "cadeau.formules.title": {
    type: "text",
    label: "Carte cadeau · Formules — titre",
    maxLength: 60,
  },
  "cadeau.formules.intro": {
    type: "textarea",
    label: "Carte cadeau · Formules — intro",
    maxLength: 200,
  },
  "cadeau.formules.note": {
    type: "textarea",
    label: "Carte cadeau · Formules — note 5 Continents",
    maxLength: 200,
  },
  "cadeau.steps.title": {
    type: "text",
    label: "Carte cadeau · Étapes — titre",
    maxLength: 60,
  },
  "cadeau.steps.items": {
    type: "items",
    label: "Carte cadeau · Étapes",
    maxItems: 4,
    fields: {
      title: { label: "Titre", maxLength: 40 },
      text: { label: "Texte", maxLength: 160, multiline: true },
    },
  },
  "cadeau.steps.image": {
    type: "image",
    label: "Carte cadeau · Étapes — visuel",
    ratio: "4:5",
    altMaxLength: IMAGE_ALT,
  },
  "cadeau.conditions.title": {
    type: "text",
    label: "Carte cadeau · Conditions — titre",
    maxLength: 60,
  },
  "cadeau.conditions.items": {
    type: "list",
    label: "Carte cadeau · Conditions — points clés",
    maxItems: 5,
    itemMaxLength: 120,
  },
});

export type ContentFields = typeof contentFields;
export type ContentKey = keyof ContentFields;

export type ContentValues = {
  [K in ContentKey]: FieldValue<ContentFields[K]>;
};
