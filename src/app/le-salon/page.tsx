import type { Metadata } from "next";

import { SalonHero } from "@/components/salon/hero";
import { SalonPlace } from "@/components/salon/place";
import { SalonStory } from "@/components/salon/story";
import { SalonVisit } from "@/components/salon/visit";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, ids, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Metas fixes (non éditables) — mots-clés : « massage Saint-Cyr-sur-Loire », « massage Tours ».
export const metadata: Metadata = pageMetadata({
  title: "Salon de massage à Saint-Cyr-sur-Loire",
  description:
    "Le salon d'Élodie Poirier, praticienne en Kobido et massage bien-être, sur les quais de Saint-Cyr-sur-Loire, près de Tours : le lieu, son parcours, l'accès.",
  path: "/le-salon",
});

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Le salon",
    url: `${site.url}/le-salon`,
    about: [{ "@id": ids.business }, { "@id": ids.practitioner }],
  },
  breadcrumbJsonLd([["Le salon", "/le-salon"]]),
];

/** Page Le salon : le lieu au bord de la Loire et le parcours d'Élodie. */
export default function SalonPage() {
  return (
    <>
      <SalonHero />
      <SalonPlace />
      <SalonStory />
      <SalonVisit />
      <JsonLd data={jsonLd} />
    </>
  );
}
