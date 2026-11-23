/**
 * Routes et navigation (fixes, non éditables).
 * Les pages secondaires seront créées après l'accueil : certains liens
 * mènent pour l'instant à une 404.
 */
export const routes = {
  home: "/",
  soins: "/#soins",
  kobido: "/kobido",
  salon: "/le-salon",
  carteCadeau: "/carte-cadeau",
  /** Paiement d'une carte cadeau (POST, Stripe Checkout à brancher). */
  carteCadeauCommander: "/carte-cadeau/commander",
  contact: "/contact",
  mentionsLegales: "/mentions-legales",
  cgv: "/cgv",
  confidentialite: "/confidentialite",
  /** Page Réserver : soins, chacun vers son calendrier SimplyBook. */
  reserver: "/reserver",
} as const;

export const mainNav = [
  { label: "Soins", href: routes.soins },
  { label: "Kobido", href: routes.kobido },
  { label: "Le salon", href: routes.salon },
  { label: "Carte cadeau", href: routes.carteCadeau },
  { label: "Contact", href: routes.contact },
] as const;

export const legalNav = [
  { label: "Mentions légales", href: routes.mentionsLegales },
  { label: "CGV", href: routes.cgv },
  { label: "Confidentialité", href: routes.confidentialite },
] as const;
