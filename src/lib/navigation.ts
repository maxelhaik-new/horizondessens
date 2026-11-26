/**
 * Routes et navigation (fixes, non éditables).
 *
 * Système de navigation (25/11/2026) :
 * - « Soins » : sous-menu des pages de soin sur desktop (`soinsNav`,
 *   `src/services/pages.ts`), lien vers `/reserver` (tous les soins et
 *   tarifs) sur mobile et dans le pied de page ;
 * - les deux soins mis en avant, Kobido et 5 Continents, ont en plus leur
 *   propre lien dans le menu (`featuredSoins`) ;
 * - pas de bouton « Réserver » dans l'en-tête (retiré le 25/11/2026) ;
 * - barre « Réserver » mobile : `#reserver` sur une page de soin (« Réserver
 *   ce soin »), `/reserver` ailleurs ;
 * - boutons d'une page de soin : son module (`#reserver`, `#reserver-<min>`).
 */
export const routes = {
  home: "/",
  kobido: "/kobido",
  /** Page sur mesure, comme le Kobido (config dans `src/services/pages.ts`). */
  cinqContinents: "/massage-5-continents",
  salon: "/le-salon",
  carteCadeau: "/carte-cadeau",
  /** Paiement d'une carte cadeau (POST → Stripe Checkout). */
  carteCadeauCommander: "/carte-cadeau/commander",
  /** Retour après paiement (`?session_id=`), non indexé. */
  carteCadeauMerci: "/carte-cadeau/merci",
  /** Téléchargement du PDF d'une carte payée (`?session_id=`). */
  carteCadeauPdf: "/carte-cadeau/pdf",
  contact: "/contact",
  mentionsLegales: "/mentions-legales",
  cgv: "/cgv",
  confidentialite: "/confidentialite",
  /** « Soins et tarifs » : tous les soins, chaque durée vers le module de sa page. */
  reserver: "/reserver",
} as const;

export const mainNav = [
  { label: "Accueil", href: routes.home },
  { label: "Soins", href: routes.reserver },
  { label: "Découvrir le Kobido", href: routes.kobido },
  { label: "5 Continents", href: routes.cinqContinents },
  { label: "Le salon", href: routes.salon },
  { label: "Carte cadeau", href: routes.carteCadeau },
  { label: "Contact", href: routes.contact },
] as const;

/** Soins mis en avant : lien direct dans le menu, en plus du sous-menu. */
export const featuredSoins: readonly string[] = [
  routes.kobido,
  routes.cinqContinents,
];

export const legalNav = [
  { label: "Mentions légales", href: routes.mentionsLegales },
  { label: "CGV", href: routes.cgv },
  { label: "Confidentialité", href: routes.confidentialite },
] as const;
