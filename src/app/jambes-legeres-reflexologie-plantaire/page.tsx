import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page/service-page";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/services/pages";

// Metas fixes (non éditables) — mots-clés : « réflexologie plantaire Tours », « jambes lourdes massage ».
export const metadata: Metadata = pageMetadata({
  title: "Jambes légères et réflexologie plantaire à Tours",
  description:
    "Massage drainant des jambes et réflexologie plantaire à Saint-Cyr-sur-Loire, à 5 min de Tours, pour soulager les jambes lourdes. 1h15, réservation en ligne.",
  path: servicePages["jambes-legeres"].path,
});

/** Page Jambes légères (gabarit des pages de soin en 5 sections). */
export default function JambesLegeresPage() {
  return <ServicePage slug="jambes-legeres" />;
}
