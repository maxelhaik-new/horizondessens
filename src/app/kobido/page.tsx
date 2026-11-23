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
import { site } from "@/lib/site";
import { localServices } from "@/services/local-services";

// Metas fixes (non éditables) — mots-clés : « Kobido Tours », « Kobido Saint-Cyr-sur-Loire ».
export const metadata: Metadata = {
  title: "Kobido à Saint-Cyr-sur-Loire, près de Tours",
  description:
    "Massage facial japonais Kobido par Élodie Poirier, à Saint-Cyr-sur-Loire, à 5 min de Tours. Séances de 1h et 1h15, abonnement, réservation en ligne.",
  alternates: { canonical: "/kobido" },
};

const kobido = localServices.find((s) => s.slug === "kobido");

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Kobido, massage facial japonais",
    serviceType: "Massage du visage Kobido",
    areaServed: ["Saint-Cyr-sur-Loire", "Tours"],
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: site.name,
      url: site.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      },
    },
    offers: kobido?.variants
      .filter((v) => v.priceEuros !== null)
      .map((v) => ({
        "@type": "Offer",
        name: `Kobido ${v.durationMinutes} min`,
        price: v.priceEuros,
        priceCurrency: "EUR",
      })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kobido",
        item: `${site.url}/kobido`,
      },
    ],
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
