import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { formatVariant } from "@/services/format";
import { getServices } from "@/services/get-services";
import type { Service, ServiceSlug } from "@/services/types";

/** Soins présentés en cartes ; le Rituel Horizon a sa propre ligne discrète. */
const FEATURED: ServiceSlug[] = [
  "kobido",
  "calme-et-harmonie",
  "5-continents",
  "jambes-legeres",
];

/** Lien « en savoir plus » propre à certains soins. */
const DETAIL: Partial<Record<ServiceSlug, { label: string; href: string }>> = {
  kobido: { label: "Découvrir le Kobido", href: routes.kobido },
  "5-continents": { label: "En savoir plus", href: "#5-continents" },
};

/** §3 Les soins : cartes empilées au scroll (sticky), style Serelin. */
export async function Services() {
  const [services, c] = await Promise.all([
    getServices(),
    getContents([
      "home.soins.eyebrow",
      "home.soins.title",
      "home.soins.intro",
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

  const editorial = (slug: Exclude<ServiceSlug, "rituel-horizon">) => ({
    subtitle: c[`service.${slug}.subtitle`],
    short: c[`service.${slug}.short`],
    image: c[`service.${slug}.image`],
  });

  const featured = FEATURED.map((slug) =>
    services.find((s) => s.slug === slug),
  ).filter((s): s is Service => Boolean(s));

  return (
    <section id="soins" className="bg-blush section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={c["home.soins.eyebrow"]}
          title={c["home.soins.title"]}
          intro={c["home.soins.intro"]}
        />

        <ol className="mt-14 flex flex-col gap-6 md:mt-20">
          {featured.map((service, index) => {
            const e = editorial(
              service.slug as Exclude<ServiceSlug, "rituel-horizon">,
            );
            const detail = DETAIL[service.slug];
            return (
              <li
                key={service.slug}
                className="md:sticky"
                style={{ top: `calc(6rem + ${index * 1.25}rem)` }}
              >
                <article className="grid gap-6 rounded-card bg-paper p-4 shadow-[0_-12px_40px_-24px_rgb(54_31_25/0.25)] md:grid-cols-[1.05fr_1fr] md:gap-10 md:p-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-media">
                    <Image
                      src={e.image.src}
                      alt={e.image.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-8 p-2 md:py-6 md:pr-6">
                    <div className="flex flex-col gap-3">
                      <p className="text-eyebrow text-accent-700">
                        {e.subtitle}
                      </p>
                      <h3 className="text-h3">{service.name}</h3>
                      <p className="max-w-md text-body text-pretty text-ink-soft">
                        {e.short}
                      </p>
                    </div>
                    <div className="flex flex-col gap-5">
                      <ul
                        className="flex flex-wrap gap-2"
                        aria-label="Durées et tarifs"
                      >
                        {service.variants.map((v) => (
                          <li
                            key={v.durationMinutes}
                            className="rounded-full border border-line bg-paper-soft px-4 py-2 text-sm font-medium"
                          >
                            {formatVariant(v)}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <ButtonLink href={routes.reserver}>Réserver</ButtonLink>
                        {detail ? (
                          <TextLink href={detail.href}>{detail.label}</TextLink>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <Reveal className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-5 text-center md:mt-20">
          <p className="text-lead text-pretty">{c["home.soins.surmesure"]}</p>
          <TextLink href={routes.reserver}>Réserver le Rituel Horizon</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
