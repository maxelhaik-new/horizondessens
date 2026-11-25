import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
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

        <ol className="mt-14 flex flex-col gap-6 md:mt-20 md:gap-8">
          {featured.map((service) => {
            const image = c[`service.${service.slug}.image`];
            return (
              <li key={service.slug}>
                <Reveal>
                  <article className="group grid gap-6 rounded-card bg-paper p-3 md:grid-cols-[1.25fr_1fr] md:gap-12 md:p-4 lg:min-h-[35rem]">
                    <RevealImage
                      src={image.src}
                      alt={image.alt}
                      edit={c.edit(`service.${service.slug}.image`)}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="aspect-[4/3] rounded-panel md:aspect-auto md:h-full"
                      parallax={6}
                      imageClassName="transition-transform duration-[1400ms] ease-serelin group-hover:scale-105"
                    />
                    <div className="flex flex-col justify-between gap-10 px-3 pb-4 md:py-10 md:pr-10 md:pl-0">
                      <div className="flex flex-col gap-5">
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
                          className="max-w-md text-lead text-pretty text-ink-soft"
                        >
                          {c[`service.${service.slug}.short`]}
                        </p>
                      </div>
                      <div className="flex flex-col gap-6">
                        <ul
                          className="flex flex-wrap gap-2"
                          aria-label="Durées et tarifs"
                        >
                          {service.variants.map((v) => (
                            <li
                              key={v.durationMinutes}
                              className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium"
                            >
                              {formatVariant(v)}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                          <ButtonLink href={bookingAnchor(service.slug)}>
                            Réserver
                          </ButtonLink>
                          <TextLink href={servicePath(service.slug)}>
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
        </ol>

        <Reveal className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-6 text-center md:mt-20">
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
