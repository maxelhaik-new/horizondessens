import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, ids } from "@/lib/seo";
import { site } from "@/lib/site";
import { getService } from "@/services/get-services";
import { servicePages, type TemplateServicePageSlug } from "@/services/pages";

import { ServiceFaq } from "./faq";
import { ServiceHero } from "./hero";
import { ServicePresentation } from "./presentation";
import { ServiceReserve } from "./reserve";

/**
 * Gabarit générique des pages de soin, en 5 temps :
 * 1. hero (titre, accroche, durée et prix, « Réserver ce massage ») ;
 * 2. le soin (chapeau + les temps du soin, une image) ;
 * 3. réserver (`#reserver` : ce que comprend la séance, module intégré,
 *    abonnement et « Offrir ») ;
 * 4. FAQ (dont « Comment se passe la séance ? ») ;
 * 5. pied de page.
 * Chaque information n'apparaît qu'une fois. Contenu : `soin.<slug>.*`
 * (`servicePageFields` dans le registre) ; nom, durées et prix : `getService`.
 */
export async function ServicePage({ slug }: { slug: TemplateServicePageSlug }) {
  const page = servicePages[slug];
  const service = await getService(slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service?.name ?? page.label,
      serviceType: page.label,
      areaServed: ["Saint-Cyr-sur-Loire", "Tours"],
      provider: { "@id": ids.business },
      url: `${site.url}${page.path}`,
      offers: service?.variants
        .filter((v) => v.priceEuros !== null)
        .map((v) => ({
          "@type": "Offer",
          name: `${page.label} ${v.durationMinutes} min`,
          price: v.priceEuros,
          priceCurrency: "EUR",
        })),
    },
    breadcrumbJsonLd([[page.label, page.path]]),
  ];

  return (
    <>
      <ServiceHero slug={slug} />
      <ServicePresentation slug={slug} />
      <ServiceReserve slug={slug} />
      <ServiceFaq slug={slug} />
      <JsonLd data={jsonLd} />
    </>
  );
}
