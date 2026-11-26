import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

import { ConsentMap } from "./consent-map";

/**
 * Plan d'accès (Google Maps, affiché si les cookies sont acceptés). Adresse,
 * horaires et itinéraire sont au-dessus, l'accès est dans le pied de page :
 * cette section ne montre que la carte.
 */
export function ContactVisit() {
  const { address } = site;
  const query = `${address.street}, ${address.postalCode} ${address.city}`;

  return (
    <section aria-labelledby="plan-acces" className="pb-16 lg:pb-24">
      <h2 id="plan-acces" className="sr-only">
        Plan d&apos;accès au salon
      </h2>
      <div className="container-site">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist md:aspect-[21/9]">
          <ConsentMap
            query={query}
            title={`Plan d'accès : ${site.name}, ${address.city}`}
          />
        </Reveal>
      </div>
    </section>
  );
}
