import type { Metadata } from "next";

import { KobidoApproach } from "@/components/kobido/approach";
import { KobidoEffects } from "@/components/kobido/effects";
import { KobidoFaq } from "@/components/kobido/faq";
import { KobidoFinalCta } from "@/components/kobido/final-cta";
import { KobidoFormulas } from "@/components/kobido/formulas";
import { KobidoGestures } from "@/components/kobido/gestures";
import { KobidoHero } from "@/components/kobido/hero";
import { KobidoOrigin } from "@/components/kobido/origin";
import { KobidoSession } from "@/components/kobido/session";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, ids, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { localServices } from "@/services/local-services";

// Metas fixes (non éditables) — mots-clés : « Kobido Tours », « Kobido Saint-Cyr-sur-Loire ».
export const metadata: Metadata = pageMetadata({
  title: "Kobido à Tours et Saint-Cyr-sur-Loire",
  description:
    "Massage facial japonais Kobido par Élodie Poirier, à Saint-Cyr-sur-Loire, à 5 min de Tours. Séances de 1h et 1h15, abonnement, réservation en ligne.",
  path: "/kobido",
});

const kobido = localServices.find((s) => s.slug === "kobido");

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Kobido, massage facial japonais",
    serviceType: "Massage du visage Kobido",
    areaServed: ["Saint-Cyr-sur-Loire", "Tours"],
    provider: { "@id": ids.business },
    url: `${site.url}/kobido`,
    offers: kobido?.variants
      .filter((v) => v.priceEuros !== null)
      .map((v) => ({
        "@type": "Offer",
        name: `Kobido ${v.durationMinutes} min`,
        price: v.priceEuros,
        priceCurrency: "EUR",
      })),
  },
  breadcrumbJsonLd([["Kobido", "/kobido"]]),
];

/** Page Kobido : référence pour le public qui cherche ce soin. */
export default function KobidoPage() {
  return (
    <>
      <KobidoHero />
      <KobidoOrigin />
      <KobidoGestures />
      <KobidoEffects />
      <KobidoFormulas />
      <KobidoSession />
      <KobidoApproach />
      <KobidoFaq />
      <KobidoFinalCta />
      <JsonLd data={jsonLd} />
    </>
  );
}
