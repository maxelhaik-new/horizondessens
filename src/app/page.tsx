import type { Metadata } from "next";

import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { FiveContinents } from "@/components/home/five-continents";
import { Hero } from "@/components/home/hero";
import { KobidoFocus } from "@/components/home/kobido-focus";
import { Offers } from "@/components/home/offers";
import { Philosophy } from "@/components/home/philosophy";
import { Practitioner } from "@/components/home/practitioner";
import { Reviews } from "@/components/home/reviews";
import { Salon } from "@/components/home/salon";
import { Services } from "@/components/home/services";
import { Steps } from "@/components/home/steps";
import { WordsBand } from "@/components/home/words-band";
import { pageMetadata } from "@/lib/seo";

// Metas fixes (non éditables par Élodie) — docs/contenu/accueil-v1.md « SEO ».
export const metadata: Metadata = pageMetadata({
  title: "Accueil",
  absoluteTitle: "Kobido et massage bien-être près de Tours | Horizon des Sens",
  description:
    "Kobido, Massage des 5 Continents, Calme et harmonie, Jambes légères. Élodie Poirier vous reçoit au bord de la Loire, à 5 min de Tours. Réservation en ligne.",
  path: "/",
});

/** Accueil : assemble les sections (une section = un composant). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <KobidoFocus />
      <Philosophy />
      <Steps />
      <FiveContinents />
      <Salon />
      <WordsBand />
      <Practitioner />
      <Reviews />
      <Offers />
      <Faq />
      <FinalCta />
    </>
  );
}
