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
    src: "/images/massages/header1.jpg",
    alt: "Visage apaisé, les yeux clos, une main posée sur le front dans la pénombre",
  },
  "home.hero.title": "Kobido et massages bien-être, au bord de la Loire",
  "home.hero.lead":
    "Un soin du visage japonais ou un massage sur mesure, dans un salon calme de Saint-Cyr-sur-Loire, près de Tours.",

  // --- Philosophie ---
  "home.philo.eyebrow": "Philosophie",
  "home.philo.text":
    "Si tu écoutes ton corps lorsqu'il chuchote, tu n'auras plus à l'entendre crier.",

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
  "home.soins.surmesure":
    "Vous hésitez ? Le Rituel Horizon s'adapte entièrement à vos zones de tension, en 1h15.",

  "service.kobido.subtitle": "Visage · Détente profonde et éclat",
  "service.kobido.short":
    "Le massage facial japonais traditionnel : il lisse les traits, relâche les tensions et ravive l'éclat du teint.",
  "service.kobido.image": {
    src: "/images/massages/kobido-visage-1.jpg",
    alt: "Soin Kobido : massage du visage tout en douceur",
  },

  "service.calme-et-harmonie.subtitle":
    "Dos, visage et crâne · Apaiser le mental",
  "service.calme-et-harmonie.short":
    "Un massage enveloppant, associé au Reiki, pour relâcher les tensions et retrouver votre équilibre.",
  "service.calme-et-harmonie.image": {
    src: "/images/massages/dos.jpg",
    alt: "Massage du dos, gestes enveloppants",
  },

  "service.5-continents.subtitle": "Corps · Un voyage sensoriel",
  "service.5-continents.short":
    "Huiles essentielles, gestes venus du monde entier et soin énergétique : un massage rare, pratiqué sous licence.",
  "service.5-continents.image": {
    src: "/images/massages/bras.jpg",
    alt: "Massage du bras à l'huile, geste ample et fluide",
  },

  "service.jambes-legeres.subtitle":
    "Jambes et pieds · Retrouver de la légèreté",
  "service.jambes-legeres.short":
    "Un massage drainant des jambes associé à la réflexologie plantaire, pour soulager les jambes lourdes.",
  "service.jambes-legeres.image": {
    src: "/images/massages/pieds.jpg",
    alt: "Massage des pieds, réflexologie plantaire",
  },

  "service.rituel-horizon.subtitle": "Sur mesure · Selon vos zones de tension",
  "service.rituel-horizon.short":
    "Un massage composé pour vous, après un temps d'échange, selon les tensions du moment.",

  // --- Focus Kobido ---
  "home.kobido.image": {
    src: "/images/massages/visage-5.jpg",
    alt: "Kobido : visage apaisé, les yeux clos, entre les mains de la praticienne",
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
    src: "/images/massages/dos-2.jpg",
    alt: "Massage du dos à l'huile, mains posées sur la peau dans une lumière chaude",
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
  "home.salon.gallery": [
    {
      src: "/images/salon/fenetre-loire.jpg",
      alt: "Fenêtre du salon ouverte sur la Loire",
    },
    {
      src: "/images/ambiance/lampe-pierres.jpg",
      alt: "Lampe en rotin, galets et brumes florales dans le salon",
    },
    {
      src: "/images/salon/salle-lit.jpg",
      alt: "La table de massage dans une salle aux tons chauds",
    },
    {
      src: "/images/ambiance/huiles-plateau.jpg",
      alt: "Plateau d'huiles de massage",
    },
  ],

  // --- Les 3 temps d'une séance ---
  "home.steps.eyebrow": "Votre séance",
  "home.steps.items": [
    {
      title: "Un échange",
      text: "Quelques minutes pour parler de vos besoins, de vos tensions, et adapter le soin.",
    },
    {
      title: "Le soin",
      text: "Une heure à 1h15 sur la table, à votre rythme, sans rien d'autre à penser.",
    },
    {
      title: "Un retour en douceur",
      text: "Quelques instants pour reprendre vos esprits, avant de repartir.",
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
    "L'abonnement Kobido : 6 séances dans l'année, à 90 € la séance. Pour faire du soin un rendez-vous, pas une exception.",
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
        "Le Kobido ne demande aucune préparation particulière. Avant la séance, je prends quelques minutes pour parler de vos attentes avec vous ; il vous suffit ensuite de vous laisser guider.",
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
  "home.final.access":
    "À cinq minutes de Tours, facile d'accès par tous les moyens de transport. Salle de soin avec vue sur la Loire.",

  // ===== Page Kobido =====
  "kobido.hero.title": "Kobido à Saint-Cyr-sur-Loire, aux portes de Tours",
  "kobido.hero.lead":
    "Le massage facial japonais, dans un salon calme face à la Loire. Une heure pour relâcher le visage, et tout le reste avec lui.",
  "kobido.hero.image": {
    src: "/images/kobido/hero-plein.jpg",
    alt: "Kobido : les mains de la praticienne encadrent un visage détendu, dans une lumière chaude",
  },

  "kobido.origine.eyebrow": "Origine",
  "kobido.origine.title": "Un soin né au Japon, il y a plusieurs siècles",
  "kobido.origine.text":
    "Le Kobido est un massage traditionnel japonais du visage. Son nom évoque « l'ancienne voie de la beauté ». Transmis de génération en génération, il repose sur des gestes précis, rythmés, presque chorégraphiés.\n\nIl travaille le visage, la nuque et le haut du crâne : la peau, les muscles et les points d'énergie. C'est ce qui le distingue d'un simple soin esthétique : le visage se détend, et avec lui le corps entier.",
  "kobido.origine.quote":
    "Plus qu'un soin de beauté : une détente profonde qui part du visage.",
  "kobido.origine.image": {
    src: "/images/kobido/origine-japon.jpg",
    alt: "Femme en kimono préparant le thé dans une maison traditionnelle japonaise en bois",
  },

  "kobido.gestes.eyebrow": "Les gestes",
  "kobido.gestes.title": "Une chorégraphie de mains",
  "kobido.gestes.items": [
    {
      title: "Les lissages",
      text: "Des effleurements amples et enveloppants ouvrent le soin. Ils réchauffent la peau, apaisent le souffle et invitent le visage à se relâcher.",
      image: "/images/kobido/hero.jpg",
    },
    {
      title: "Les pressions",
      text: "Des pressions sur les points d'énergie du visage, héritées de la tradition japonaise, pour libérer les tensions installées au fil des jours.",
      image: "/images/kobido/geste-pressions.jpg",
    },
    {
      title: "Les percussions",
      text: "Des gestes rapides et légers, du bout des doigts, qui stimulent la peau et réveillent l'éclat du teint.",
      image: "/images/accueil/hero-mains-visage.jpg",
    },
    {
      title: "Le modelage",
      text: "Des pétrissages et des étirements doux travaillent les muscles du visage, de la mâchoire au front, pour des traits plus reposés.",
      image: "/images/kobido/geste-modelage.jpg",
    },
  ],

  "kobido.effets.eyebrow": "Ce que l'on ressent",
  "kobido.effets.title": "Le visage se pose, le corps suit",
  "kobido.effets.items": [
    {
      title: "Un teint plus lumineux",
      text: "La peau est stimulée en douceur : le visage paraît plus frais, plus reposé, dès la fin de la séance.",
    },
    {
      title: "Des traits relâchés",
      text: "Front, mâchoire, contour des yeux : les zones où l'on serre sans y penser se détendent.",
    },
    {
      title: "Un lâcher-prise profond",
      text: "Le rythme des gestes apaise le mental. Beaucoup s'endorment presque.",
    },
    {
      title: "Un moment pour soi",
      text: "Une heure sans écran ni sollicitation, face à la Loire.",
    },
  ],

  "kobido.reserver.text":
    "Le Kobido complet : visage, nuque et cuir chevelu, après un temps d'échange. En 1h15, plus de temps pour la nuque, les épaules et le repos final.",
  "kobido.reserver.cure":
    "Les effets du Kobido se prolongent avec la régularité. L'abonnement réunit 6 séances dans l'année, à 90 € la séance au lieu de 100 €.",

  "kobido.faq.title": "Questions sur le Kobido",
  "kobido.faq.intro":
    "Une autre question ? Appelez-moi, je vous réponds avec plaisir.",
  "kobido.faq.items": [
    {
      question: "Faut-il venir démaquillé ?",
      answer:
        "Ce n'est pas nécessaire : le visage est préparé en début de séance. Pensez simplement à retirer vos lentilles si vous en portez.",
    },
    {
      question: "À quelle fréquence faire un Kobido ?",
      answer:
        "Une séance ponctuelle fait déjà beaucoup de bien. Pour des effets durables, on conseille souvent une séance toutes les 4 à 6 semaines : c'est le rythme de l'abonnement.",
    },
    {
      question: "1h ou 1h15 : que choisir ?",
      answer:
        "L'heure suffit pour découvrir le soin. La formule 1h15 laisse plus de place à la nuque, aux épaules et au repos final.",
    },
    {
      question: "Y a-t-il des contre-indications ?",
      answer:
        "Signalez-moi toute affection de la peau, une intervention récente au visage ou une grossesse. En cas de doute, demandez l'avis de votre médecin. Le Kobido est un soin de bien-être, pas un acte médical.",
    },
    {
      question: "Le Kobido remplace-t-il les injections ?",
      answer:
        "Non, et ce n'est pas son but. Le Kobido est un soin naturel qui détend et ravive le visage, sans rien promettre d'autre que du bien-être.",
    },
  ],

  // ===== Page Massage des 5 Continents (/massage-5-continents) · page sur mesure =====
  // Récit d'après la carte 2026, l'ancien site et le RDV : à valider par Élodie.
  "soin.5-continents.hero.title": "Le Massage des 5 Continents, près de Tours",
  "soin.5-continents.hero.lead":
    "Un voyage sensoriel en deux temps, porté par des huiles essentielles et un soin énergétique. Un massage rare, à Saint-Cyr-sur-Loire, face au fleuve.",
  "soin.5-continents.hero.image": {
    src: "/images/massages/dos-2.jpg",
    alt: "Massage du dos à l'huile, mains posées sur la peau dans une lumière chaude",
  },

  "soin.5-continents.prologue.title":
    "Un tour du monde du geste, sans quitter les bords de la Loire.",
  "soin.5-continents.prologue.text":
    "Le Massage des 5 Continents réunit en une seule séance des gestes inspirés des grandes traditions du massage à travers le monde. Il se pratique avec des huiles essentielles préparées pour lui seul, et s'achève sur un soin énergétique.\n\nC'est un massage encadré : seuls des praticiens formés et certifiés peuvent le proposer. Peu de salons le pratiquent autour de Tours, et c'est l'un des soins que l'on me demande le plus.",
  "soin.5-continents.prologue.image": {
    src: "/images/accueil/5-continents-huile.jpg",
    alt: "Flacon d'huile essentielle ambrée, préparée pour le Massage des 5 Continents",
  },

  "soin.5-continents.voyage.title": "Le voyage, chapitre par chapitre",
  "soin.5-continents.voyage.intro":
    "Deux temps et un soin énergétique, portés du début à la fin par les mêmes parfums.",
  "soin.5-continents.voyage.items": [
    {
      title: "Les huiles",
      text: "Tout commence par les parfums. Des huiles essentielles préparées par un laboratoire spécialisé, pour ce massage uniquement, vous accompagnent jusqu'à la fin de la séance.",
      image: "/images/ambiance/huiles-plateau.jpg",
    },
    {
      title: "Libérer",
      text: "Le premier temps est dynamique. Des mouvements appuyés et des frictions stimulent la circulation et aident le corps à se défaire de ce qui l'encombre.",
      image: "/images/massages/dos.jpg",
    },
    {
      title: "Lâcher prise",
      text: "Puis le rythme ralentit. Les gestes deviennent amples et enveloppants, et unifient le corps pour un relâchement profond.",
      image: "/images/massages/bras.jpg",
    },
    {
      title: "Le soin énergétique",
      text: "Pour finir, un temps de Reiki, par simple imposition des mains, prolonge la détente et harmonise la circulation de l'énergie. On ressort un peu ailleurs.",
      image: "/images/ambiance/lampe-pierres.jpg",
    },
  ],

  "soin.5-continents.reserver.text":
    "Le massage complet du corps en deux temps, puis le soin énergétique. L'échange avant le soin et le retour au calme sont compris.",
  "soin.5-continents.reserver.abonnement":
    "6 séances dans l'année, avec 10 € de moins sur chaque séance, pour en faire un rendez-vous régulier.",

  "soin.5-continents.faq.title": "Questions sur le 5 Continents",
  "soin.5-continents.faq.intro":
    "Une autre question ? Appelez-moi, je vous réponds avec plaisir.",
  "soin.5-continents.faq.items": [
    {
      question: "Que signifie le badge M5C ?",
      answer:
        "Il atteste que je suis formée et certifiée pour pratiquer ce massage, et garantit un soin fidèle à son protocole.",
    },
    {
      question: "Les huiles essentielles conviennent-elles à tout le monde ?",
      answer:
        "Certaines situations demandent de la prudence : grossesse, allergies, asthme ou épilepsie. Prévenez-moi en réservant : nous verrons ensemble si le soin vous convient.",
    },
    {
      question: "Faut-il prévoir quelque chose ?",
      answer:
        "Rien de particulier. Évitez simplement un repas copieux juste avant, et gardez si possible un moment calme après la séance.",
    },
    {
      question: "Est-ce un soin médical ?",
      answer:
        "Non. C'est un massage de bien-être, sans visée thérapeutique ni connotation sexuelle. Il ne remplace pas un avis médical.",
    },
  ],

  // ===== Page Calme et harmonie (/massage-calme-et-harmonie) · gabarit en 5 sections =====
  // Premier jet d'après la carte 2026 et le RDV : à valider par Élodie.
  "soin.calme-et-harmonie.hero.title":
    "Massage Calme et harmonie à Saint-Cyr-sur-Loire, près de Tours",
  "soin.calme-et-harmonie.hero.lead":
    "Le dos, le visage et le crâne, puis un temps de Reiki. Un massage enveloppant pour apaiser le mental et relâcher les tensions, au bord de la Loire.",
  "soin.calme-et-harmonie.hero.image": {
    src: "/images/soins/calme-et-harmonie.jpg",
    alt: "Massage relaxant du dos dans une lumière douce",
  },

  "soin.calme-et-harmonie.soin.title": "Quand la tête ne s'arrête plus",
  "soin.calme-et-harmonie.soin.text":
    "Calme et harmonie est né d'une demande que j'entends souvent : « j'ai besoin de décrocher ». Le soin suit les zones où le stress s'installe, le dos, le visage et le crâne, puis s'achève par un temps de Reiki.",
  "soin.calme-et-harmonie.soin.items": [
    {
      title: "Le dos",
      text: "Des gestes amples et enveloppants dénouent les épaules, la nuque et le long du dos, là où l'on porte les tensions de la journée.",
    },
    {
      title: "Le visage",
      text: "Des lissages lents détendent le front, la mâchoire et le contour des yeux. Les traits se relâchent.",
    },
    {
      title: "Le crâne",
      text: "Un massage crânien tout en douceur, qui calme le flot des pensées et prépare au repos.",
    },
    {
      title: "Le Reiki",
      text: "Les mains se posent et le rythme ralentit encore. Le Reiki prolonge la détente et aide à retrouver un équilibre intérieur.",
    },
  ],
  "soin.calme-et-harmonie.soin.image": {
    src: "/images/ambiance/mains-epaules.jpg",
    alt: "Mains posées sur les épaules pendant un massage à l'huile",
  },

  "soin.calme-et-harmonie.reserver.text":
    "Le massage du dos, du visage et du crâne, puis un temps de Reiki. L'échange avant le soin et le retour au calme sont compris.",
  "soin.calme-et-harmonie.reserver.abonnement":
    "6 séances dans l'année, avec 10 € de moins sur chaque séance, pour en faire un rendez-vous régulier.",

  "soin.calme-et-harmonie.faq.title": "Questions sur Calme et harmonie",
  "soin.calme-et-harmonie.faq.intro":
    "Une autre question ? Appelez-moi, je vous réponds avec plaisir.",
  "soin.calme-et-harmonie.faq.items": [
    {
      question: "Comment se passe la séance ?",
      answer:
        "Nous commençons par un court échange sur votre état du jour et les zones à soulager. Vient ensuite le massage, à un rythme lent, puis le Reiki. Vous prenez enfin quelques minutes pour revenir à vous avant de repartir.",
    },
    {
      question: "Qu'est-ce que le Reiki ?",
      answer:
        "Une méthode énergétique japonaise, pratiquée par imposition des mains, sans manipulation. Je la pratique depuis 2017. Elle vise à harmoniser la circulation de l'énergie et favorise une détente profonde.",
    },
    {
      question: "Faut-il croire au Reiki pour en profiter ?",
      answer:
        "Non. Le Reiki vient conclure le massage : même sans y prêter de sens particulier, c'est un moment de calme et de repos.",
    },
    {
      question: "Faut-il venir démaquillé ?",
      answer:
        "Ce n'est pas nécessaire. Prévenez-moi simplement si votre peau est sensible.",
    },
    {
      question: "Est-ce un soin médical ?",
      answer:
        "Non. C'est un massage de bien-être, sans visée thérapeutique ni connotation sexuelle. Il ne remplace pas un avis médical.",
    },
  ],

  // ===== Page Jambes légères (/jambes-legeres-reflexologie-plantaire) · gabarit en 5 sections =====
  // Réflexologie plantaire incluse (RDV) : à confirmer par Élodie.
  "soin.jambes-legeres.hero.title":
    "Jambes légères et réflexologie plantaire, près de Tours",
  "soin.jambes-legeres.hero.lead":
    "Un massage drainant des jambes, associé à la réflexologie plantaire, pour soulager les jambes lourdes et retrouver une sensation de légèreté.",
  "soin.jambes-legeres.hero.image": {
    src: "/images/soins/jambes-legeres.jpg",
    alt: "Massage des jambes à l'huile, gestes remontant vers le genou",
  },

  "soin.jambes-legeres.soin.title": "Pour les jambes qui portent la journée",
  "soin.jambes-legeres.soin.text":
    "Station debout, longues heures assis, chaleur, fatigue : les jambes sont souvent les premières à en porter le poids. Ce soin associe un massage drainant à la réflexologie plantaire, à laquelle je suis formée.",
  "soin.jambes-legeres.soin.items": [
    {
      title: "La préparation",
      text: "Une huile adaptée réchauffe la peau. Vos jambes sont installées confortablement, légèrement surélevées.",
    },
    {
      title: "Le massage des jambes",
      text: "Des chevilles jusqu'aux cuisses, des gestes remontants, toujours vers le cœur, accompagnent la circulation et dénouent les mollets.",
    },
    {
      title: "La réflexologie plantaire",
      text: "Des pressions précises sur les zones réflexes du pied, pour une détente qui gagne tout le corps.",
    },
  ],
  "soin.jambes-legeres.soin.image": {
    src: "/images/massages/pieds.jpg",
    alt: "Massage des pieds, réflexologie plantaire",
  },

  "soin.jambes-legeres.reserver.text":
    "Le massage complet des jambes, puis la réflexologie plantaire. L'échange avant le soin et le retour au calme sont compris.",
  "soin.jambes-legeres.reserver.abonnement":
    "6 séances dans l'année, avec 10 € de moins sur chaque séance, pour garder des jambes légères au fil des saisons.",

  "soin.jambes-legeres.faq.title": "Questions sur Jambes légères",
  "soin.jambes-legeres.faq.intro":
    "Une autre question ? Appelez-moi, je vous réponds avec plaisir.",
  "soin.jambes-legeres.faq.items": [
    {
      question: "Comment se passe la séance ?",
      answer:
        "Nous faisons d'abord le point sur vos jambes, votre circulation et d'éventuelles contre-indications. Viennent ensuite le massage, puis la réflexologie plantaire, au calme. Quelques minutes de repos, et vous repartez à votre rythme.",
    },
    {
      question: "Y a-t-il des contre-indications ?",
      answer:
        "Oui : phlébite ou antécédent de thrombose, varices douloureuses, plaie ou infection sur les jambes. En cas de doute, demandez l'avis de votre médecin avant de réserver.",
    },
    {
      question: "La réflexologie plantaire, qu'est-ce que c'est ?",
      answer:
        "Une technique de pressions sur des zones précises du pied, reliées selon cette approche au reste du corps. Ici, elle est pratiquée dans un but de bien-être, sans diagnostic.",
    },
    {
      question: "Et pendant la grossesse ?",
      answer:
        "Parlez-m'en avant de réserver : certaines périodes demandent d'adapter le soin, ou d'attendre.",
    },
    {
      question: "Est-ce un soin médical ?",
      answer:
        "Non. C'est un massage de bien-être, sans visée thérapeutique ni connotation sexuelle. Il ne remplace pas un avis médical.",
    },
  ],

  // ===== Page Rituel Horizon (/rituel-horizon) · gabarit en 5 sections =====
  // Massage sur mesure : à valider par Élodie.
  "soin.rituel-horizon.hero.title":
    "Rituel Horizon, un massage composé pour vous",
  "soin.rituel-horizon.hero.lead":
    "Après un temps d'échange, je compose le massage selon vos zones de tension du moment. Un soin sur mesure, à Saint-Cyr-sur-Loire, près de Tours.",
  "soin.rituel-horizon.hero.image": {
    src: "/images/ambiance/massage-dos.jpg",
    alt: "Massage sur mesure du dos, mains posées sur les épaules",
  },

  "soin.rituel-horizon.soin.title": "Chaque séance part de vous",
  "soin.rituel-horizon.soin.text":
    "Nos besoins changent selon les jours, la fatigue ou le travail. Le Rituel Horizon ne suit pas de protocole fixe : il part de ce que vous ressentez aujourd'hui, qu'il s'agisse d'un dos noué, d'une nuque raide, de jambes lourdes ou d'une envie de lâcher prise.",
  "soin.rituel-horizon.soin.items": [
    {
      title: "L'échange",
      text: "Nous faisons le point sur votre état du jour : vos tensions, votre fatigue, ce dont vous avez envie. Nous décidons ensemble des priorités.",
    },
    {
      title: "Le massage composé",
      text: "Je choisis les zones et les techniques pour vous. Le rythme et la pression s'adaptent à ce que vous ressentez.",
    },
    {
      title: "Les zones de tension",
      text: "Le temps se concentre là où le corps en a le plus besoin, pour un soulagement en profondeur.",
    },
  ],
  "soin.rituel-horizon.soin.image": {
    src: "/images/salon/salle-lit.jpg",
    alt: "La salle de soin du salon, table de massage et lumière naturelle",
  },

  "soin.rituel-horizon.reserver.text":
    "Un temps d'échange, puis un massage composé selon vos zones de tension. Le retour au calme est compris.",
  "soin.rituel-horizon.reserver.abonnement":
    "6 séances dans l'année, avec 10 € de moins sur chaque séance, pour un massage qui suit l'évolution de vos besoins.",

  "soin.rituel-horizon.faq.title": "Questions sur le Rituel Horizon",
  "soin.rituel-horizon.faq.intro":
    "Une autre question ? Appelez-moi, je vous réponds avec plaisir.",
  "soin.rituel-horizon.faq.items": [
    {
      question: "Quelle différence avec les autres massages ?",
      answer:
        "Les autres soins suivent un déroulé précis. Le Rituel Horizon n'en a pas : il se construit avec vous, en début de séance.",
    },
    {
      question: "Je ne sais pas quel soin choisir. Que faire ?",
      answer:
        "Réservez le Rituel Horizon : nous en parlerons ensemble et je vous guiderai. Vous pouvez aussi m'appeler avant.",
    },
    {
      question: "Est-ce un soin médical ?",
      answer:
        "Non. C'est un massage de bien-être, sans visée thérapeutique ni connotation sexuelle. Il ne remplace pas un avis médical.",
    },
  ],

  // --- Contact ---
  "contact.hero.eyebrow": "Contact",
  "contact.hero.title": "Parlons de votre prochain soin",
  "contact.hero.lead":
    "Une question sur un soin, une carte cadeau ou un créneau ? Écrivez-moi ou appelez-moi : je vous réponds personnellement.",
  "contact.hero.image": {
    src: "/images/salon/fenetre-loire.jpg",
    alt: "Fenêtre du salon ouverte sur la Loire au coucher du soleil",
  },
  "contact.form.title": "Écrivez-moi",
  "contact.form.intro":
    "Laissez-moi quelques mots : je lis chaque message et vous réponds au plus vite. Pour réserver directement, la prise de rendez-vous en ligne reste le plus rapide.",
  "contact.visit.title": "Venir au salon",
  "contact.visit.text":
    "Le salon se trouve à Saint-Cyr-sur-Loire, sur les quais, face à la Loire, à quelques minutes du centre de Tours. Les séances se font uniquement sur rendez-vous.",

  // --- Le salon ---
  "salon.hero.title": "Un salon au bord de la Loire",
  "salon.hero.lead":
    "À Saint-Cyr-sur-Loire, à quelques minutes de Tours, une salle chaleureuse ouverte sur le fleuve. Ici, on prend le temps d'arriver, puis de lâcher prise.",
  "salon.hero.image": {
    src: "/images/salon/salle-loire.jpg",
    alt: "La salle de massage, sa lumière douce et sa fenêtre ouverte sur la Loire",
  },
  "salon.lieu.title": "Un lieu pensé pour ralentir",
  "salon.lieu.text":
    "Le salon se trouve sur les quais de Saint-Cyr-sur-Loire. Par la fenêtre, le fleuve, les arbres et la lumière qui change au fil des saisons. À l'intérieur, une lumière tamisée, des matières douces et le silence : tout est là pour que vous puissiez vraiment décrocher.",
  "salon.lieu.gallery": [
    {
      src: "/images/salon/fenetre-loire.jpg",
      alt: "Fenêtre du salon ouverte sur la Loire au coucher du soleil",
      caption: "La fenêtre sur le fleuve",
    },
    {
      src: "/images/salon/loire-jardin.jpg",
      alt: "Les bords de Loire verdoyants, vus depuis le salon",
      caption: "Les bords de Loire",
    },
    {
      src: "/images/salon/salle-lit.jpg",
      alt: "La table de massage dans une salle aux tons chauds",
      caption: "La salle de soin",
    },
    {
      src: "/images/ambiance/lampe-pierres.jpg",
      alt: "Lampe en rotin, galets et brumes florales posés sur un meuble en bois",
      caption: "Les détails",
    },
    {
      src: "/images/salon/loire-couchant.jpg",
      alt: "La Loire et ses bancs de sable sous un ciel rose",
      caption: "La Loire au crépuscule",
    },
    {
      src: "/images/ambiance/huiles-plateau.jpg",
      alt: "Flacons d'huiles végétales sur un plateau",
      caption: "Les huiles",
    },
  ],
  "salon.details.items": [
    {
      title: "La lumière du fleuve",
      text: "Une salle ouverte sur la Loire, une lumière naturelle le jour et tamisée pendant le soin.",
    },
    {
      title: "Tout est prévu",
      text: "Le linge et les huiles sont fournis sur place : venez simplement comme vous êtes.",
    },
    {
      title: "Sur rendez-vous",
      text: "Les séances se font uniquement sur rendez-vous : ce temps vous est réservé, sans attente ni précipitation.",
    },
  ],
  "salon.elodie.eyebrow": "Mon parcours",
  "salon.elodie.title": "Du soin à l'hôpital au soin du corps",
  "salon.elodie.intro":
    "Je m'appelle Élodie Poirier. Avant d'être praticienne en massage bien-être, j'ai été soignante. De l'hôpital, j'ai gardé l'attention à l'autre ; du massage, j'ai fait mon métier. Voici comment l'un a mené à l'autre.",
  "salon.elodie.image": {
    src: "/images/elodie/portrait.jpg",
    alt: "Portrait d'Élodie Poirier, souriante",
  },
  "salon.elodie.chapters": [
    {
      time: "Avant 2017",
      title: "Soignante",
      text: "Pendant mes années à l'hôpital, j'ai appris à écouter les corps fatigués et les personnes inquiètes. J'y ai aussi mesuré combien le toucher, quand on lui laisse du temps, apaise.",
    },
    {
      time: "2017",
      title: "La rencontre avec le Reiki",
      text: "Je suis initiée aux premier et deuxième degrés du Reiki, dans la tradition Usui. Une approche douce, qui m'apprend à ressentir autant qu'à agir.",
    },
    {
      time: "Fin 2017",
      title: "Le choix",
      text: "Portée par mes enseignants et par mes proches, je prends une décision forte : je quitte le système hospitalier pour suivre un cursus professionnel en massage bien-être.",
    },
    {
      time: "2018",
      title: "Horizon des Sens",
      text: "Je commence à recevoir sous le nom d'Horizon des Sens. Au fil des années, je me forme à la réflexologie plantaire, puis au Massage des 5 Continents, dont je suis praticienne sous licence.",
    },
    {
      time: "2025",
      title: "Le Kobido",
      text: "En septembre 2025, j'ajoute le Kobido à ma pratique. Ce soin japonais du visage, à la fois relaxant et revitalisant, rejoint ce que je cherche depuis le début : l'harmonie entre le corps et l'esprit.",
    },
    {
      time: "Aujourd'hui",
      title: "Au bord de la Loire",
      text: "Je vous reçois désormais à Saint-Cyr-sur-Loire, dans un salon ouvert sur le fleuve. Mon objectif reste le même : vivre de ma passion, continuer d'affiner ma pratique et vous aider à retrouver équilibre et sérénité.",
    },
  ],
  "salon.elodie.quote":
    "Un moment pour vous reconnecter à votre corps, et à vous-même.",
  "salon.final.title": "Venez découvrir le salon",
  "salon.final.text":
    "Réservez votre séance en ligne, ou écrivez-moi pour toute question sur l'accès ou les soins.",

  // --- Carte cadeau ---
  "cadeau.hero.title": "Offrez une parenthèse de Kobido",
  "cadeau.hero.lead":
    "Une carte cadeau à offrir en quelques minutes : choisissez la durée, réglez en ligne et recevez-la aussitôt par e-mail, prête à être offerte.",
  "cadeau.hero.image": {
    src: "/images/carte-cadeau/main-carte-1.jpg",
    alt: "Main tenant une carte cadeau Horizon des Sens",
  },
  "cadeau.formules.title": "Choisissez la carte",
  "cadeau.formules.intro":
    "Deux durées, pour un premier Kobido ou pour aller plus loin dans la détente. La carte est valable 6 mois.",
  "cadeau.formules.note":
    "Vous souhaitez offrir un Massage des 5 Continents ? La carte est disponible sur demande : écrivez-moi.",
  "cadeau.steps.title": "Comment ça marche",
  "cadeau.steps.items": [
    {
      title: "Choisissez",
      text: "Kobido 1h ou 1h15, et le nom de la personne à qui vous l'offrez.",
    },
    {
      title: "Réglez en ligne",
      text: "Le paiement est sécurisé par Stripe. Je n'ai jamais accès à vos données bancaires.",
    },
    {
      title: "Recevez la carte",
      text: "Elle arrive aussitôt par e-mail, en PDF, prête à imprimer ou à transférer.",
    },
    {
      title: "Le soin",
      text: "La personne réserve sa séance quand elle le souhaite, dans les 6 mois, en indiquant le numéro de la carte.",
    },
  ],
  "cadeau.steps.image": {
    src: "/images/carte-cadeau/main-carte-3.jpg",
    alt: "Carte cadeau Horizon des Sens tenue à la main",
  },
  "cadeau.conditions.title": "Bon à savoir",
  "cadeau.conditions.items": [
    "Valable 6 mois à compter de la date d'achat.",
    "Nominative : elle est établie au nom de la personne qui la reçoit.",
    "Utilisable en une fois, pour la séance indiquée.",
    "Non remboursable, sauf droit de rétractation de 14 jours.",
  ],

  // --- Réserver ---
  "reserver.hero.title": "Soins et tarifs",
  "reserver.hero.lead":
    "Tous les soins du salon, avec leurs durées et leurs tarifs. Choisissez le vôtre, puis réservez votre créneau en ligne : la confirmation arrive par e-mail.",
  "reserver.soins.title": "Quel soin vous ferait du bien ?",
  "reserver.soins.intro":
    "Durées et tarifs sont indiqués pour chaque soin. Vous hésitez entre deux ? Je peux vous conseiller par téléphone.",
  "reserver.infos.title": "Bon à savoir",
  "reserver.infos.items": [
    {
      title: "Annuler ou déplacer",
      text: "C'est possible sans frais jusqu'à 24 h avant le rendez-vous, par téléphone ou par e-mail.",
    },
    {
      title: "Le règlement",
      text: "La séance se règle au salon, le jour du rendez-vous.",
    },
    {
      title: "Une carte cadeau ?",
      text: "Indiquez son numéro en réservant, ou appelez-moi pour fixer la séance ensemble.",
    },
    {
      title: "Le jour du soin",
      text: "Arrivez quelques minutes en avance, le temps d'échanger avant la séance. Le linge et les huiles sont fournis.",
    },
  ],
};
