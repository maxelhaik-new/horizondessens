import type { Metadata } from "next";

import { SalonHero } from "@/components/salon/hero";
import { SalonPlace } from "@/components/salon/place";
import { SalonStory } from "@/components/salon/story";
import { SalonVisit } from "@/components/salon/visit";
import { site } from "@/lib/site";

// Metas fixes (non éditables) — mots-clés : « massage Saint-Cyr-sur-Loire », « massage Tours ».
export const metadata: Metadata = {
  title: "Le salon, au bord de la Loire à Saint-Cyr-sur-Loire",
  description:
    "Découvrez le salon d'Élodie Poirier, praticienne en massage bien-être et Kobido, sur les quais de Saint-Cyr-sur-Loire, près de Tours. Son parcours, le lieu, l'accès.",
  alternates: { canonical: "/le-salon" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Le salon",
    url: `${site.url}/le-salon`,
    about: {
      "@type": "Person",
      name: site.practitioner,
      jobTitle: "Praticienne en massage bien-être",
      worksFor: { "@type": "HealthAndBeautyBusiness", name: site.name },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Le salon",
        item: `${site.url}/le-salon`,
      },
    ],
  },
];

/** Page Le salon : le lieu au bord de la Loire et le parcours d'Élodie. */
export default function SalonPage() {
  return (
    <>
      <SalonHero />
      <SalonPlace />
      <SalonStory />
      <SalonVisit />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
