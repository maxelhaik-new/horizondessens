import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page/service-page";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/services/pages";

// Metas fixes (non éditables) — mots-clés : « massage relaxant Tours », « Reiki Tours ».
export const metadata: Metadata = pageMetadata({
  title: "Massage Calme et harmonie et Reiki à Tours",
  description:
    "Massage du dos, du visage et du crâne suivi de Reiki, par Élodie Poirier à Saint-Cyr-sur-Loire, à 5 min de Tours. 1h15, réservation en ligne.",
  path: servicePages["calme-et-harmonie"].path,
});

/** Page Calme et harmonie (gabarit des pages de soin en 5 sections). */
export default function CalmeHarmoniePage() {
  return <ServicePage slug="calme-et-harmonie" />;
}
