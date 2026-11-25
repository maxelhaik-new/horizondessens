import type { Metadata } from "next";

import { BookingHero } from "@/components/booking/hero";
import { BookingInfos } from "@/components/booking/infos";
import { BookingServices } from "@/components/booking/services-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Metas fixes (non éditables) — mots-clés : « massage Tours tarifs », « réserver Kobido Tours ».
export const metadata: Metadata = pageMetadata({
  title: "Soins, tarifs et réservation à Tours",
  description:
    "Kobido et massages bien-être chez Horizon des Sens, à Saint-Cyr-sur-Loire, près de Tours : durées, tarifs et réservation en ligne de chaque soin.",
  path: "/reserver",
});

/** Page « Soins et tarifs » (/reserver) : tous les soins, chaque durée vers le module de sa page, infos pratiques. */
export default function BookingPage() {
  return (
    <>
      <BookingHero />
      <BookingServices />
      <BookingInfos />
      <JsonLd data={breadcrumbJsonLd([["Soins et tarifs", "/reserver"]])} />
    </>
  );
}
