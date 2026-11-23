import type { Metadata } from "next";

import { BookingHero } from "@/components/booking/hero";
import { BookingInfos } from "@/components/booking/infos";
import { BookingServices } from "@/components/booking/services-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

// Metas fixes (non éditables) — mots-clés : « réserver massage Tours », « réserver Kobido Tours ».
export const metadata: Metadata = pageMetadata({
  title: "Réserver un Kobido ou un massage",
  description:
    "Réservez en ligne votre Kobido ou votre massage chez Horizon des Sens, à Saint-Cyr-sur-Loire, près de Tours. Choisissez votre soin et votre créneau.",
  path: "/reserver",
});

/** Page Réserver : soins (chacun vers son calendrier SimplyBook), infos pratiques. */
export default function BookingPage() {
  return (
    <>
      <BookingHero />
      <BookingServices />
      <BookingInfos />
      <JsonLd data={breadcrumbJsonLd([["Réserver", "/reserver"]])} />
    </>
  );
}
