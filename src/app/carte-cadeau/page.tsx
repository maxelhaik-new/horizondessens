import type { Metadata } from "next";

import { GiftCardCards } from "@/components/gift-card/cards";
import { GiftCardHero } from "@/components/gift-card/hero";
import { GiftCardHowItWorks } from "@/components/gift-card/how-it-works";
import { getGiftCards } from "@/lib/gift-cards";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, ids, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Metas fixes (non éditables) — mots-clés : « carte cadeau Kobido Tours », « carte cadeau massage Tours ».
export const metadata: Metadata = pageMetadata({
  title: "Carte cadeau Kobido à Tours",
  description:
    "Offrez un Kobido d'1h ou d'1h15 chez Horizon des Sens, à Saint-Cyr-sur-Loire. Carte cadeau réglée en ligne, envoyée par e-mail, valable 6 mois.",
  path: "/carte-cadeau",
});

/** Page Carte cadeau (vitrine) : formules, fonctionnement, conditions. */
export default async function GiftCardPage() {
  const cards = await getGiftCards();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Carte cadeau Kobido",
      brand: { "@type": "Brand", name: site.name },
      offers: cards.map((card) => ({
        "@type": "Offer",
        name: `Carte cadeau ${card.name} ${card.durationMinutes} min`,
        price: card.priceEuros,
        priceCurrency: "EUR",
        url: `${site.url}/carte-cadeau`,
        seller: { "@id": ids.business },
      })),
    },
    breadcrumbJsonLd([["Carte cadeau", "/carte-cadeau"]]),
  ];

  return (
    <>
      <GiftCardHero />
      <GiftCardCards />
      <GiftCardHowItWorks />
      <JsonLd data={jsonLd} />
    </>
  );
}
