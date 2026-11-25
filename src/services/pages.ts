import { routes } from "@/lib/navigation";

import { localServices } from "./local-services";
import type { ServiceSlug } from "./types";

/**
 * Pages de soin (hors Kobido) : gabarit générique en 5 sections
 * (`src/components/service-page/`), et page sur mesure du 5 Continents.
 *
 * Une entrée = une page. Les textes et images sont dans le registre de contenu
 * (`soin.<slug>.*`, via `servicePageFields`) ; nom, durées et prix viennent des
 * prestations (SimplyBook). Ici, uniquement ce qui est fixé dans le code :
 * URL, libellés d'interface et options d'affichage.
 *
 * Le Kobido garde sa page sur mesure (`/kobido`).
 */
type ServicePageConfig = {
  /** URL de la page (mot-clé SEO dedans). */
  path: string;
  /** Nom court pour le fil d'Ariane et les boutons. */
  label: string;
  /** Badge affiché dans le hero (le texte vient de `home.5c.licence`). */
  badge?: "m5c";
  /** Carte cadeau : achat en ligne, ou sur demande (contact). */
  gift: "online" | "on-request";
};

const pages = {
  "calme-et-harmonie": {
    path: "/massage-calme-et-harmonie",
    label: "Calme et harmonie",
    gift: "on-request",
  },
  "5-continents": {
    path: routes.cinqContinents,
    label: "Massage des 5 Continents",
    badge: "m5c",
    gift: "on-request",
  },
  "jambes-legeres": {
    path: "/jambes-legeres-reflexologie-plantaire",
    label: "Jambes légères",
    gift: "on-request",
  },
  "rituel-horizon": {
    path: "/rituel-horizon",
    label: "Rituel Horizon",
    gift: "on-request",
  },
} as const satisfies Partial<Record<ServiceSlug, ServicePageConfig>>;

export type ServicePageSlug = keyof typeof pages;
export const servicePages: Record<ServicePageSlug, ServicePageConfig> = pages;

/**
 * Pages sur le gabarit générique en 5 sections (`service-page/service-page.tsx`).
 * Le 5 Continents a sa page sur mesure (`src/components/five-continents/`),
 * comme le Kobido, mais partage le socle commun (hero, réserver, FAQ).
 */
export type TemplateServicePageSlug = Exclude<ServicePageSlug, "5-continents">;

/** Page d'un soin (le Kobido a sa page sur mesure). */
export function servicePath(slug: ServiceSlug) {
  return slug === "kobido" ? routes.kobido : servicePages[slug].path;
}

/** Lien vers le module de réservation d'un soin, durée présélectionnée si donnée. */
export function bookingAnchor(slug: ServiceSlug, minutes?: number) {
  return `${servicePath(slug)}#reserver${minutes ? `-${minutes}` : ""}`;
}

/** Sous-menu « Soins » et liens du pied de page : une entrée par page de soin. */
export const soinsNav = localServices.map((service) => ({
  label: service.name,
  href: servicePath(service.slug),
}));
