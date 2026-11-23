import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

/**
 * Appel final du salon : grande bande sombre avec adresse et horaires en
 * colonnes, sans image (la page en compte déjà beaucoup).
 */
export async function SalonVisit() {
  const c = await getContents([
    "salon.final.title",
    "salon.final.text",
  ] as const);
  const { address, hours } = site;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  )}`;

  const term = "text-eyebrow text-white/60";
  const detail = "font-serif text-2xl leading-snug tracking-[-0.01em] italic";

  return (
    <section className="pt-4 pb-16 lg:pb-24">
      <div className="container-site">
        <Reveal className="grid gap-12 rounded-card bg-night p-8 text-white md:p-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <SplitWords
              text={c["salon.final.title"]}
              className="text-h2 text-balance"
            />
            <p className="max-w-md text-lead text-pretty text-white/75">
              {c["salon.final.text"]}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
              <ButtonLink href={routes.reserver} variant="light">
                Réserver un soin
              </ButtonLink>
              <TextLink href={routes.contact} className="text-white">
                Me contacter
              </TextLink>
            </div>
          </div>

          <dl className="grid content-end gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex flex-col gap-3">
              <dt className={term}>Adresse</dt>
              <dd className={detail}>
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </dd>
              <dd>
                <TextLink href={directionsUrl} className="text-white">
                  Itinéraire
                </TextLink>
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
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
