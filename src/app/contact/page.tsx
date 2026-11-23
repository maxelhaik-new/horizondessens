import type { Metadata } from "next";

import { ContactConversation } from "@/components/contact/conversation";
import { ContactHero } from "@/components/contact/hero";
import { ContactVisit } from "@/components/contact/visit";
import { site } from "@/lib/site";

// Metas fixes (non éditables) — mot-clé : « massage Saint-Cyr-sur-Loire contact ».
export const metadata: Metadata = {
  title: "Contact et accès au salon",
  description:
    "Contacter Élodie Poirier, Horizon des Sens : massage et Kobido à Saint-Cyr-sur-Loire, près de Tours. Téléphone, e-mail, horaires et plan d'accès.",
  alternates: { canonical: "/contact" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact",
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "HealthAndBeautyBusiness",
      name: site.name,
      url: site.url,
      email: site.email,
      telephone: site.phone.href.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      },
      openingHoursSpecification: site.hours.schema.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.schemaDays,
        ...slot,
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${site.url}/contact`,
      },
    ],
  },
];

/** Page Contact : échange (formulaire), coordonnées et accès au salon. */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactConversation />
      <ContactVisit />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
