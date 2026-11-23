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
import { site } from "@/lib/site";

// Metas fixes (non éditables par Élodie) — docs/contenu/accueil-v1.md « SEO ».
export const metadata: Metadata = {
  title: {
    absolute:
      "Kobido & massage bien-être à Saint-Cyr-sur-Loire, Tours | Horizon des Sens",
  },
  description:
    "Kobido, Massage des 5 Continents, Calme et harmonie, Jambes légères. Élodie Poirier vous reçoit au bord de la Loire, à 5 min de Tours. Réservation en ligne.",
  alternates: { canonical: "/" },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: site.name,
  url: site.url,
  telephone: "+33676959003",
  email: site.email,
  image: `${site.url}/images/salon/salle-loire.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  sameAs: [site.social.instagram, site.social.facebook],
};

/** Accueil : assemble les sections (une section = un composant). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WordsBand />
      <Philosophy />
      <Services />
      <KobidoFocus />
      <Steps />
      <FiveContinents />
      <Salon />
      <Practitioner />
      <Reviews />
      <Offers />
      <Faq />
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
