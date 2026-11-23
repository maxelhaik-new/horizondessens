import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { site } from "@/lib/site";

import { ConsentMap } from "./consent-map";

/**
 * Venir au salon : infos pratiques en colonnes (adresse, horaires, accès)
 * et carte Google Maps (affichée si les cookies sont acceptés).
 */
export async function ContactVisit() {
  const c = await getContents([
    "contact.visit.title",
    "contact.visit.text",
    "home.final.access",
  ] as const);
  const { address, hours } = site;
  const query = `${address.street}, ${address.postalCode} ${address.city}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

  const term = "text-eyebrow text-accent-800";
  const detail = "font-serif text-2xl leading-snug tracking-[-0.01em] italic";

  return (
    <section className="pb-16 lg:pb-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <SplitWords
              text={c["contact.visit.title"]}
              className="text-h2 text-balance"
            />
            <Reveal>
              <p className="max-w-md text-lead text-pretty text-ink-soft">
                {c["contact.visit.text"]}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <dt className={term}>Adresse</dt>
                <dd className={detail}>
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </dd>
                <dd>
                  <TextLink href={directionsUrl}>Itinéraire</TextLink>
                </dd>
              </div>
              <div className="flex flex-col gap-3">
                <dt className={term}>Horaires</dt>
                <dd className={detail}>
                  {hours.days}
                  <br />
                  {hours.slots.join(" · ")}
                </dd>
              </div>
              <div className="flex flex-col gap-3 sm:col-span-2">
                <dt className={term}>Accès</dt>
                <dd className="max-w-md text-body text-ink-soft">
                  {c["home.final.access"]}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist"
        >
          <ConsentMap
            query={query}
            title={`Plan d'accès : ${site.name}, ${address.city}`}
          />
        </Reveal>
      </div>
    </section>
  );
}
