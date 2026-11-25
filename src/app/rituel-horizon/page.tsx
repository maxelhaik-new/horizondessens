import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page/service-page";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/services/pages";

// Metas fixes (non éditables) — mots-clés : « massage sur mesure Tours ».
export const metadata: Metadata = pageMetadata({
  title: "Rituel Horizon, massage sur mesure à Tours",
  description:
    "Un massage composé selon vos zones de tension, après un temps d'échange, à Saint-Cyr-sur-Loire près de Tours. 1h15, réservation en ligne.",
  path: servicePages["rituel-horizon"].path,
});

/** Page Rituel Horizon (gabarit des pages de soin en 5 sections). */
export default function RituelHorizonPage() {
  return <ServicePage slug="rituel-horizon" />;
}
