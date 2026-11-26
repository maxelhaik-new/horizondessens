import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Rail } from "@/components/ui/rail";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";
import { formatVariant } from "@/services/format";
import { getServices } from "@/services/get-services";
import { bookingAnchor, servicePath } from "@/services/pages";
import type { Service, ServiceSlug } from "@/services/types";

type FeaturedSlug = Exclude<ServiceSlug, "rituel-horizon">;

/** Soins présentés en grandes cartes ; le Rituel Horizon a sa ligne discrète. */
const FEATURED: FeaturedSlug[] = [
  "kobido",
  "calme-et-harmonie",
  "5-continents",
  "jambes-legeres",
];

/**
 * §3 Les soins : grandes cartes (Serelin « treatments ») — image à gauche,
 * titre italique, texte, durées/tarifs et CTA à droite. Fond dégradé rosé.
 */
export async function Services() {
  const [services, c] = await Promise.all([
    getServices(),
    getContents([
      "home.soins.eyebrow",
      "home.soins.title",
      "home.soins.surmesure",
      "service.kobido.subtitle",
      "service.kobido.short",
      "service.kobido.image",
      "service.calme-et-harmonie.subtitle",
      "service.calme-et-harmonie.short",
      "service.calme-et-harmonie.image",
      "service.5-continents.subtitle",
      "service.5-continents.short",
      "service.5-continents.image",
      "service.jambes-legeres.subtitle",
      "service.jambes-legeres.short",
      "service.jambes-legeres.image",
    ] as const),
  ]);

  const featured = FEATURED.map((slug) =>
    services.find((s) => s.slug === slug),
  ).filter((s): s is Service & { slug: FeaturedSlug } => Boolean(s));

  return (
    <section
      id="soins"
      className="bg-[linear-gradient(180deg,var(--color-paper),var(--color-blush)_18%,var(--color-blush))] section-y"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow={c["home.soins.eyebrow"]}
          title={c["home.soins.title"]}
          edit={{
            eyebrow: c.edit("home.soins.eyebrow"),
            title: c.edit("home.soins.title"),
          }}
        />

        {/* Mobile : rail horizontal aimanté (une carte par écran, la suivante en amorce). */}
        <Rail
          as="ol"
          label="Les soins"
          className="mt-10 md:mt-20 md:flex md:flex-col md:gap-8"
        >
          {featured.map((service) => {
            const image = c[`service.${service.slug}.image`];
            return (
              <li key={service.slug} className="flex">
                <Reveal className="flex w-full">
                  <article className="group relative grid w-full content-start gap-5 rounded-card bg-paper p-2.5 md:grid-cols-[1.25fr_1fr] md:content-stretch md:gap-12 md:p-4 lg:min-h-[35rem]">
                    <RevealImage
                      src={image.src}
                      alt={image.alt}
                      edit={c.edit(`service.${service.slug}.image`)}
                      sizes="(min-width: 768px) 55vw, 84vw"
                      className="aspect-[4/3] rounded-[1.75rem] md:aspect-auto md:h-full md:rounded-panel"
                      parallax={6}
                      imageClassName="transition-transform duration-[1400ms] ease-serelin group-hover:scale-105"
                    />
                    <div className="flex h-full flex-col justify-between gap-7 px-3 pb-4 md:gap-10 md:py-10 md:pr-10 md:pl-0">
                      <div className="flex flex-col gap-3 md:gap-5">
                        <SplitWords
                          as="h3"
                          text={service.name}
                          className="text-h3 text-balance"
                        />
                        <p
                          {...c.edit(`service.${service.slug}.subtitle`)}
                          className="text-sm font-medium tracking-[0.016em] text-accent-800"
                        >
                          {c[`service.${service.slug}.subtitle`]}
                        </p>
                        <p
                          {...c.edit(`service.${service.slug}.short`)}
                          className="max-w-md text-body text-pretty text-ink-soft md:text-lead"
                        >
                          {c[`service.${service.slug}.short`]}
                        </p>
                      </div>
                      <div className="flex flex-col gap-5 md:gap-6">
                        <ul
                          className="flex flex-wrap gap-2"
                          aria-label="Durées et tarifs"
                        >
                          {service.variants.map((v) => (
                            <li
                              key={v.durationMinutes}
                              className="rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium md:px-4 md:py-2"
                            >
                              {formatVariant(v)}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
                          <ButtonLink
                            href={bookingAnchor(service.slug)}
                            className="relative z-10"
                          >
                            Réserver
                          </ButtonLink>
                          <TextLink
                            href={servicePath(service.slug)}
                            className="after:absolute after:inset-0 after:rounded-card after:content-['']"
                          >
                            Découvrir ce soin
                          </TextLink>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </Rail>

        <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 text-center md:mt-20 md:gap-6">
          <p
            {...c.edit("home.soins.surmesure")}
            className="text-lead text-pretty"
          >
            {c["home.soins.surmesure"]}
          </p>
          <TextLink href={servicePath("rituel-horizon")}>
            Découvrir le Rituel Horizon
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
