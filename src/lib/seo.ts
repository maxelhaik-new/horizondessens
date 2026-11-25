import type { Metadata, MetadataRoute } from "next";

import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";
import { localServices } from "@/services/local-services";
import { servicePages } from "@/services/pages";

/*
 * SEO : métadonnées communes, indexation, routes du sitemap et données
 * structurées partagées. Stratégie : docs/seo/strategie-seo.md.
 */

/**
 * Le site n'est indexable qu'en production ET sur le vrai domaine.
 * Avant la bascule DNS, la production est servie sur *.vercel.app : on ne
 * veut pas que Google l'indexe (contenu dupliqué avec horizondessens.fr).
 * `VERCEL_PROJECT_PRODUCTION_URL` est fourni par Vercel au build : après
 * l'ajout du domaine, il faut **redéployer** pour activer l'indexation.
 * `SITE_INDEXABLE=true|false` force la valeur si besoin.
 */
export const isIndexable = (() => {
  const forced = process.env.SITE_INDEXABLE;
  if (forced === "true") return true;
  if (forced === "false") return false;
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "";
  return (
    process.env.VERCEL_ENV === "production" &&
    ["horizondessens.fr", "www.horizondessens.fr"].includes(host)
  );
})();

/** Date de dernière mise à jour des contenus (sitemap). Le CMS la fournira. */
export const contentUpdatedAt = "2026-11-23";

/** Identifiants stables des entités JSON-LD (références croisées par `@id`). */
export const ids = {
  business: `${site.url}/#business`,
  website: `${site.url}/#website`,
  practitioner: `${site.url}/#elodie`,
} as const;

type PageMetaInput = {
  /** Titre court, complété par « | Horizon des Sens ». Viser ≤ 41 caractères. */
  title: string;
  /** 120 à 160 caractères, avec l'expression-clé et un appel à l'action. */
  description: string;
  /** Chemin canonique, ex. "/kobido". */
  path: string;
  /** Titre complet, sans le suffixe de marque (accueil). */
  absoluteTitle?: string;
  /** false pour une page à ne pas indexer (404, confirmation…). */
  index?: boolean;
};

/**
 * Métadonnées d'une page : title, description, canonical, Open Graph et
 * carte X. Open Graph est redéclaré en entier parce que Next ne fusionne
 * pas les objets imbriqués avec ceux du layout. L'image de partage vient
 * du fichier `opengraph-image.jpg` du segment : chaque page en a un
 * (sinon, Open Graph redéclaré ici masquerait celui de la racine).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  index = true,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}

/** Pages indexées, dans l'ordre d'importance (sitemap). */
export const indexedPages: {
  path: string;
  priority: number;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  images?: string[];
}[] = [
  {
    path: routes.home,
    priority: 1,
    changeFrequency: "monthly",
    images: [
      "/images/massages/header1.jpg",
      "/images/soins/kobido.jpg",
      "/images/soins/5-continents.jpg",
      "/images/soins/calme-et-harmonie.jpg",
      "/images/soins/jambes-legeres.jpg",
    ],
  },
  {
    path: routes.kobido,
    priority: 0.9,
    changeFrequency: "monthly",
    images: ["/images/kobido/hero-plein.jpg", "/images/kobido/hero.jpg"],
  },
  ...(
    [
      ["calme-et-harmonie", "/images/soins/calme-et-harmonie.jpg"],
      ["jambes-legeres", "/images/soins/jambes-legeres.jpg"],
      ["rituel-horizon", "/images/ambiance/massage-dos.jpg"],
    ] as const
  ).map(([slug, image]) => ({
    path: servicePages[slug].path,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    images: [image],
  })),
  {
    path: servicePages["5-continents"].path,
    priority: 0.8,
    changeFrequency: "monthly",
    images: ["/images/massages/dos-2.jpg", "/images/massages/dos.jpg"],
  },
  {
    path: routes.salon,
    priority: 0.7,
    changeFrequency: "yearly",
    images: [
      "/images/salon/salle-loire.jpg",
      "/images/salon/fenetre-loire.jpg",
      "/images/elodie/portrait.jpg",
    ],
  },
  {
    path: routes.carteCadeau,
    priority: 0.7,
    changeFrequency: "monthly",
    images: ["/images/carte-cadeau/main-carte-1.jpg"],
  },
  {
    path: routes.reserver,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: routes.contact, priority: 0.6, changeFrequency: "yearly" },
  { path: routes.mentionsLegales, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.cgv, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.confidentialite, priority: 0.2, changeFrequency: "yearly" },
];

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  postalCode: site.address.postalCode,
  addressLocality: site.address.city,
  addressRegion: "Centre-Val de Loire",
  addressCountry: site.address.country,
};

/**
 * Graphe JSON-LD commun à tout le site : le site web, l'établissement et
 * la praticienne. Les pages y renvoient par `@id` au lieu de le répéter.
 */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: site.url,
      name: site.name,
      alternateName: ["Horizon des sens", "horizondessens"],
      inLanguage: "fr-FR",
      publisher: { "@id": ids.business },
    },
    {
      "@type": "HealthAndBeautyBusiness",
      "@id": ids.business,
      name: site.name,
      description:
        "Kobido, Massage des 5 Continents, Calme et harmonie (avec Reiki) et Jambes légères avec réflexologie plantaire, par Élodie Poirier, au bord de la Loire à Saint-Cyr-sur-Loire, près de Tours.",
      url: site.url,
      logo: `${site.url}/icon.png`,
      image: [
        `${site.url}/images/salon/salle-loire.jpg`,
        `${site.url}/images/salon/fenetre-loire.jpg`,
        `${site.url}/images/kobido/hero-plein.jpg`,
      ],
      telephone: site.phone.href.replace("tel:", ""),
      email: site.email,
      address: postalAddress,
      areaServed: [
        "Saint-Cyr-sur-Loire",
        "Tours",
        "La Riche",
        "Fondettes",
        "Saint-Avertin",
        "Joué-lès-Tours",
      ].map((name) => ({ "@type": "City", name })),
      openingHoursSpecification: site.hours.schema.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.schemaDays,
        ...slot,
      })),
      priceRange: "100 € – 120 €",
      currenciesAccepted: "EUR",
      founder: { "@id": ids.practitioner },
      employee: { "@id": ids.practitioner },
      knowsAbout: [
        "Kobido",
        "Massage facial japonais",
        "Massage des 5 Continents",
        "Reiki",
        "Réflexologie plantaire",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Soins",
        itemListElement: localServices.flatMap((service) =>
          service.variants
            .filter((v) => v.priceEuros !== null)
            .map((v) => ({
              "@type": "Offer",
              price: v.priceEuros,
              priceCurrency: "EUR",
              itemOffered: {
                "@type": "Service",
                name: `${service.name} (${v.durationMinutes} min)`,
              },
            })),
        ),
      },
      potentialAction: {
        "@type": "ReserveAction",
        target: `${site.url}${routes.reserver}`,
        name: "Réserver un soin",
      },
      sameAs: [site.social.instagram, site.social.facebook],
    },
    {
      "@type": "Person",
      "@id": ids.practitioner,
      name: site.practitioner,
      jobTitle: "Praticienne en massage bien-être et Kobido",
      image: `${site.url}/images/elodie/portrait.jpg`,
      worksFor: { "@id": ids.business },
      knowsAbout: [
        "Kobido",
        "Massage des 5 Continents",
        "Reiki Usui",
        "Réflexologie plantaire",
      ],
    },
  ],
};

/** Fil d'Ariane JSON-LD : [["Kobido", "/kobido"], …] après l'accueil. */
export function breadcrumbJsonLd(trail: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Accueil", "/"] as const, ...trail].map(
      ([name, path], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item: path === "/" ? site.url : `${site.url}${path}`,
      }),
    ),
  };
}
