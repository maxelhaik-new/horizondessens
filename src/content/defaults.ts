import type { ContentValues } from "./registry";

/**
 * Valeurs par défaut des champs de contenu.
 *
 * v1 : c'est la seule source du contenu (textes de docs/contenu/accueil-v1.md).
 * Avec le CMS : valeurs de repli quand un champ n'existe pas (encore) en base.
 *
 * TypeScript impose une valeur pour chaque clé du registre ;
 * `npm run content:check` vérifie les longueurs.
 */
export const contentDefaults: ContentValues = {
  // --- Hero ---
  "home.hero.image": {
    src: "/images/accueil/hero-mains-visage.jpg",
    alt: "Mains posées délicatement sur un visage, dans une lumière chaude et tamisée",
  },
  "home.hero.eyebrow": "Saint-Cyr-sur-Loire · Tours",
  "home.hero.title": "Kobido et massages bien-être, au bord de la Loire",
  "home.hero.lead":
    "Un soin du visage japonais ou un massage pensé pour ce que votre corps demande, dans un salon calme à deux pas de Tours.",
  "home.trust.items": [
    "Praticienne depuis 2018",
    "Licence officielle 5 Continents",
    "Reiki Usui",
    "Réflexologie plantaire",
  ],

  // --- Bandeau ---
  "home.marquee.items": [
    "Détente",
    "Éclat",
    "Lâcher-prise",
    "Équilibre",
    "Légèreté",
    "Harmonie",
  ],

  // --- Soins ---
  "home.soins.eyebrow": "Les soins",
  "home.soins.title": "Quatre soins, une même attention",
  "home.soins.intro":
    "Chaque séance commence par un échange, pour adapter les gestes à votre état du jour.",
  "home.soins.surmesure":
    "Vous hésitez ? Le Rituel Horizon s'adapte entièrement à vos zones de tension, en 1h15.",

  "service.kobido.subtitle": "Visage · Détente profonde et éclat",
  "service.kobido.short":
    "Le massage facial japonais traditionnel : il lisse les traits, relâche les tensions et ravive l'éclat du teint.",
  "service.kobido.image": {
    src: "/images/soins/kobido.jpg",
    alt: "Soin Kobido : massage du visage tout en douceur",
  },

  "service.calme-et-harmonie.subtitle":
    "Dos, visage et crâne · Apaiser le mental",
  "service.calme-et-harmonie.short":
    "Un massage enveloppant, associé au Reiki, pour relâcher les tensions et retrouver votre équilibre.",
  "service.calme-et-harmonie.image": {
    src: "/images/soins/calme-et-harmonie.jpg",
    alt: "Personne détendue, allongée, les yeux fermés",
  },

  "service.5-continents.subtitle": "Corps · Un voyage sensoriel",
  "service.5-continents.short":
    "Huiles essentielles, gestes venus du monde entier et soin énergétique : un massage rare, pratiqué sous licence.",
  "service.5-continents.image": {
    src: "/images/soins/5-continents.jpg",
    alt: "Mains versant quelques gouttes d'huile essentielle",
  },

  "service.jambes-legeres.subtitle":
    "Jambes et pieds · Retrouver de la légèreté",
  "service.jambes-legeres.short":
    "Un massage drainant des jambes associé à la réflexologie plantaire, pour soulager les jambes lourdes.",
  "service.jambes-legeres.image": {
    src: "/images/soins/jambes-legeres.jpg",
    alt: "Flacon d'huile de massage et fleurs séchées",
  },

  "service.rituel-horizon.subtitle": "Sur mesure · Selon vos zones de tension",

  // --- Focus Kobido ---
  "home.kobido.image": {
    src: "/images/accueil/kobido-visage.jpg",
    alt: "Visage apaisé baigné de lumière, les yeux clos",
  },
  "home.kobido.eyebrow": "Soin signature",
  "home.kobido.title": "Le Kobido, l'art japonais du massage du visage",
  "home.kobido.text":
    "Né au Japon, le Kobido enchaîne des gestes rapides et précis, des pressions et des lissages. Bien plus qu'un soin de beauté, c'est une détente profonde qui gagne tout le corps.",
  "home.kobido.benefits": [
    "Des traits lissés, un teint plus lumineux",
    "Les tensions du visage et de la mâchoire relâchées",
    "Un lâcher-prise profond, dès la première séance",
  ],

  // --- Focus 5 Continents ---
  "home.5c.image": {
    src: "/images/accueil/5-continents-huile.jpg",
    alt: "Flacon d'huile ambré posé sur une pierre, lumière dorée",
  },
  "home.5c.eyebrow": "Un massage rare",
  "home.5c.title": "Le Massage des 5 Continents",
  "home.5c.text":
    "Un voyage en deux temps. D'abord des gestes appuyés, qui libèrent le corps de ce qui l'encombre. Puis le lâcher-prise, porté par des huiles essentielles préparées spécialement pour ce soin et par un soin énergétique.",
  "home.5c.licence": "Praticienne certifiée M5C · Licence professionnelle 2027",

  // --- Salon ---
  "home.salon.image": {
    src: "/images/salon/salle-loire.jpg",
    alt: "La salle de massage, sa table et sa fenêtre ouverte sur la Loire",
  },
  "home.salon.eyebrow": "Le salon",
  "home.salon.title": "Un salon calme, ouvert sur la Loire",
  "home.salon.text":
    "À Saint-Cyr-sur-Loire, à quelques minutes de Tours, une salle lumineuse face au fleuve, pensée pour que vous puissiez vraiment décrocher.",
  "home.salon.steps": [
    {
      title: "Un échange",
      text: "Quelques minutes pour comprendre vos besoins et adapter le soin.",
    },
    {
      title: "Le soin",
      text: "1h15 sur la table, à votre rythme, sans rien d'autre à penser.",
    },
    {
      title: "Un retour en douceur",
      text: "Un temps pour revenir à vous avant de repartir.",
    },
  ],

  // --- Élodie ---
  "home.elodie.image": {
    src: "/images/elodie/portrait.jpg",
    alt: "Portrait d'Élodie Poirier, praticienne en massage bien-être",
  },
  "home.elodie.title": "Élodie Poirier",
  "home.elodie.subtitle": "Praticienne en massage bien-être",
  "home.elodie.text":
    "Ancienne soignante, j'ai quitté l'hôpital pour me consacrer au massage bien-être. Formée au Reiki Usui, à la réflexologie plantaire, au Massage des 5 Continents et au Kobido, je prends toujours le temps de vous écouter avant de commencer.",

  // --- Avis ---
  "home.avis.title": "Vos mots",

  // --- Abonnement & carte cadeau ---
  "home.abo.title": "Prendre soin de vous, toute l'année",
  "home.abo.text":
    "6 séances dans l'année, 10 € de moins sur chacune. Pour faire du soin un rendez-vous, pas une exception.",
  "home.cadeau.image": {
    src: "/images/carte-cadeau/main-carte-2.jpg",
    alt: "Main tenant une carte cadeau Horizon des Sens",
  },
  "home.cadeau.title": "Offrez une parenthèse",
  "home.cadeau.text":
    "Choisissez un soin, réglez en ligne, recevez la carte par e-mail. Valable 6 mois.",

  // --- FAQ ---
  "home.faq.eyebrow": "Questions fréquentes",
  "home.faq.title": "Vos questions",
  "home.faq.items": [
    {
      question: "Je n'ai jamais essayé le Kobido. Est-ce fait pour moi ?",
      answer:
        "Le Kobido ne demande aucune préparation particulière. Avant la séance, nous prenons quelques minutes pour parler de vos attentes ; il vous suffit ensuite de vous laisser guider.",
    },
    {
      question: "Comment choisir mon soin ?",
      answer:
        "Le Kobido pour le visage et l'éclat, Calme et harmonie pour apaiser le mental, le 5 Continents pour un voyage sensoriel, Jambes légères pour retrouver de la légèreté. En cas d'hésitation, le Rituel Horizon s'adapte à vos zones de tension.",
    },
    {
      question: "Que faut-il prévoir pour ma séance ?",
      answer:
        "Rien de particulier. Arrivez quelques minutes en avance pour profiter pleinement de votre temps : le linge et les huiles sont fournis sur place.",
    },
    {
      question: "Comment offrir un soin ?",
      answer:
        "Choisissez une carte cadeau en ligne, réglez en toute sécurité et recevez-la aussitôt par e-mail, prête à offrir. Elle est valable 6 mois.",
    },
    {
      question: "Le massage bien-être est-il un soin médical ?",
      answer:
        "Non. Le massage bien-être vise la détente et ne remplace pas un avis médical. En cas de doute sur votre santé, demandez conseil à votre médecin avant la séance.",
    },
  ],

  // --- Appel final ---
  "home.final.title": "Et si vous vous accordiez une pause ?",
  "home.final.text":
    "Réservez votre soin en ligne en quelques instants, ou appelez-moi pour en parler.",
  "home.final.access": "Accès et stationnement : informations à venir.",
};
