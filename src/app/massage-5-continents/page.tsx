import type { Metadata } from "next";

import { FiveContinentsHero } from "@/components/five-continents/hero";
import { FiveContinentsPrologue } from "@/components/five-continents/prologue";
import { FiveContinentsVoyage } from "@/components/five-continents/voyage";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceFaq } from "@/components/service-page/faq";
import { ServiceReserve } from "@/components/service-page/reserve";
import { breadcrumbJsonLd, ids, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getService } from "@/services/get-services";
import { servicePages } from "@/services/pages";

const page = servicePages["5-continents"];

// Metas fixes (non éditables) — mots-clés : « massage des 5 continents Tours ».
export const metadata: Metadata = pageMetadata({
  title: "Massage des 5 Continents à Tours",
  description:
    "Massage des 5 Continents par une praticienne certifiée M5C, à Saint-Cyr-sur-Loire, à 5 min de Tours. Huiles essentielles, soin énergétique, 1h15.",
  path: page.path,
});

/**
 * Page sur mesure du Massage des 5 Continents (comme le Kobido), orientée
 * récit et expérience : hero plein cadre, prologue, voyage en chapitres,
 * puis le socle commun des pages de soin (réserver, FAQ).
 */
export default async function FiveContinentsPage() {
  const service = await getService("5-continents");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service?.name ?? page.label,
      serviceType: page.label,
      areaServed: ["Saint-Cyr-sur-Loire", "Tours"],
      provider: { "@id": ids.business },
      url: `${site.url}${page.path}`,
      offers: service?.variants
        .filter((v) => v.priceEuros !== null)
        .map((v) => ({
          "@type": "Offer",
          name: `${page.label} ${v.durationMinutes} min`,
          price: v.priceEuros,
          priceCurrency: "EUR",
        })),
    },
    breadcrumbJsonLd([[page.label, page.path]]),
  ];

  return (
    <>
      <FiveContinentsHero />
      <FiveContinentsPrologue />
      <FiveContinentsVoyage />
      <ServiceReserve slug="5-continents" />
      <ServiceFaq slug="5-continents" />
      <JsonLd data={jsonLd} />
    </>
  );
}
