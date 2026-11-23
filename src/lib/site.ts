/**
 * Données fixes du site (non éditables par Élodie) : identité, coordonnées,
 * réseaux. Les metas, menus et liens restent dans le code.
 */
export const site = {
  name: "Horizon des Sens",
  url: "https://horizondessens.fr",
  locale: "fr_FR",
  practitioner: "Élodie Poirier",
  email: "e.nguyen@horizondessens.fr",
  phone: { display: "06 76 95 90 03", href: "tel:+33676959003" },
  address: {
    street: "9 Quai des Maisons Blanches",
    postalCode: "37540",
    city: "Saint-Cyr-sur-Loire",
    country: "FR",
  },
  social: {
    instagram: "https://www.instagram.com/horizon.des.sens/",
    facebook: "https://www.facebook.com/horizondessens.fr/",
  },
  booking: {
    simplybookUrl: "https://horizondessens.simplybook.it",
  },
  /** Horaires d'ouverture (réponse d'Élodie, 23/11/2026). */
  hours: {
    days: "Du lundi au samedi",
    slots: ["9h30 – 11h", "13h30 – 17h"],
    /** Format schema.org (JSON-LD). */
    schema: [
      { opens: "09:30", closes: "11:00" },
      { opens: "13:30", closes: "17:00" },
    ],
    schemaDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  /** Informations légales (mentions légales, CGV, confidentialité). */
  legal: {
    siren: "841 843 337",
    status: "Entreprise individuelle",
    vat: "TVA non applicable, article 293 B du Code général des impôts",
    host: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
      url: "https://vercel.com",
    },
    developer: {
      name: "Maxime Elhaik",
      email: "maxime.elhaik@gmail.com",
    },
    /** Date de dernière mise à jour des pages légales. */
    updatedAt: "23 novembre 2026",
  },
} as const;
