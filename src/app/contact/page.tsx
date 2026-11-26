import type { Metadata } from "next";

import { ContactConversation } from "@/components/contact/conversation";
import { ContactVisit } from "@/components/contact/visit";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, ids, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// Metas fixes (non éditables) — mot-clé : « massage Saint-Cyr-sur-Loire contact ».
export const metadata: Metadata = pageMetadata({
  title: "Contact et accès, Saint-Cyr-sur-Loire",
  description:
    "Contacter Élodie Poirier, Horizon des Sens : massage et Kobido à Saint-Cyr-sur-Loire, près de Tours. Téléphone, e-mail, horaires et plan d'accès.",
  path: "/contact",
});

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact",
    url: `${site.url}/contact`,
    mainEntity: { "@id": ids.business },
  },
  breadcrumbJsonLd([["Contact", "/contact"]]),
];

/** Page Contact : formulaire et coordonnées en premier, puis le plan d'accès. */
export default function ContactPage() {
  return (
    <>
      <ContactConversation />
      <ContactVisit />
      <JsonLd data={jsonLd} />
    </>
  );
}
