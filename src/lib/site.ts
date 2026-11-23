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
} as const;
