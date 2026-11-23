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
    "/images/salon/fenetre-loire.jpg",
    "/images/ambiance/lampe-pierres.jpg",
    "/images/salon/salle-lit.jpg",
    "/images/ambiance/huiles-plateau.jpg",
  ],

  // --- Les 3 temps d'une séance ---
  "home.steps.eyebrow": "La séance",
  "home.steps.title": "Un moment pensé pour vous",
  "home.steps.intro":
    "Pas de protocole à la chaîne : chaque séance suit le même fil, et s'ajuste à vous.",
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
  "home.final.access": "Accès et stationnement : informations à venir.",

  // ===== Page Kobido =====
  "kobido.hero.title": "Kobido à Saint-Cyr-sur-Loire, aux portes de Tours",
  "kobido.hero.lead":
    "Le massage facial japonais, dans un salon calme face à la Loire. Une heure pour relâcher le visage, et tout le reste avec lui.",
  "kobido.hero.image": {
    src: "/images/kobido/hero.jpg",
    alt: "Kobido : les mains de la praticienne posées sur le front, visage détendu",
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
      image: "/images/kobido/geste-lissage.jpg",
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

  "kobido.formules.eyebrow": "Les formules",
  "kobido.formules.title": "Deux durées, un même soin",
  "kobido.formules.court":
    "Le Kobido complet : visage, nuque et cuir chevelu. L'idéal pour une première découverte.",
  "kobido.formules.long":
    "Le même soin, avec plus de temps pour la nuque, les épaules et le repos final. Pour celles et ceux qui veulent prolonger.",
  "kobido.formules.cure":
    "Les effets du Kobido se prolongent avec la régularité. L'abonnement réunit 6 séances dans l'année, à 90 € la séance au lieu de 100 €.",

  "kobido.approche.eyebrow": "Mon approche",
  "kobido.approche.quote":
    "Je ne cherche pas à transformer un visage. Je cherche à ce que vous vous sentiez bien dedans.",
  "kobido.approche.text":
    "Ancienne soignante, praticienne en massage bien-être depuis 2018 et initiée au Reiki, j'ai ajouté le Kobido à ma pratique en 2025. J'y retrouve ce qui me tient à cœur : l'écoute, la précision du geste et le temps qu'on s'accorde.",

  "kobido.seance.eyebrow": "Déroulé",
  "kobido.seance.title": "Votre séance, pas à pas",
  "kobido.seance.items": [
    {
      time: "Arrivée",
      title: "Un temps d'échange",
      text: "Nous parlons de vos attentes, de votre peau et de ce dont vous avez besoin aujourd'hui.",
    },
    {
      time: "Début",
      title: "Le visage préparé",
      text: "Installation confortable, puis un nettoyage doux pour que la peau accueille le soin.",
    },
    {
      time: "Cœur du soin",
      title: "Le massage Kobido",
      text: "Lissages, pressions, percussions et modelage s'enchaînent sur le visage, la nuque et le crâne.",
    },
    {
      time: "Fin",
      title: "Un retour en douceur",
      text: "Quelques minutes de repos, un verre d'eau, et vous repartez à votre rythme.",
    },
  ],

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

  "kobido.final.title": "Offrez-vous une heure de Kobido",
  "kobido.final.text":
    "Réservez en ligne en quelques instants, ou offrez une séance avec une carte cadeau.",
  "kobido.final.image": {
    src: "/images/ambiance/flacon-ombre.jpg",
    alt: "Flacon d'huile ambrée posé dans un jeu d'ombre et de lumière",
  },

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
      image: "/images/salon/fenetre-loire.jpg",
      alt: "Fenêtre du salon ouverte sur la Loire au coucher du soleil",
      caption: "La fenêtre sur le fleuve",
    },
    {
      image: "/images/salon/loire-jardin.jpg",
      alt: "Les bords de Loire verdoyants, vus depuis le salon",
      caption: "Les bords de Loire",
    },
    {
      image: "/images/salon/salle-lit.jpg",
      alt: "La table de massage dans une salle aux tons chauds",
      caption: "La salle de soin",
    },
    {
      image: "/images/ambiance/lampe-pierres.jpg",
      alt: "Lampe en rotin, galets et brumes florales posés sur un meuble en bois",
      caption: "Les détails",
    },
    {
      image: "/images/salon/loire-couchant.jpg",
      alt: "La Loire et ses bancs de sable sous un ciel rose",
      caption: "La Loire au crépuscule",
    },
    {
      image: "/images/ambiance/huiles-plateau.jpg",
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
};
