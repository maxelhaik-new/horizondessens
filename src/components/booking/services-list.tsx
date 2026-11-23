import Image from "next/image";

import { LogoSymbol } from "@/components/brand/logo";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { bookingHref } from "@/lib/simplybook";
import { formatVariant } from "@/services/format";
import { getServices } from "@/services/get-services";

/**
 * Liste des soins réservables : une ligne par soin (image, nom, sous-titre,
 * description, puis une ligne par durée : tarif et bouton « Réserver » qui
 * ouvre le calendrier SimplyBook de cette prestation (`bookingHref`).
 * Données de réservation : `getServices()` ; éditorial : `service.<slug>.*`.
 */
export async function BookingServices() {
  const [services, c] = await Promise.all([
    getServices(),
    getContents([
      "reserver.soins.title",
      "reserver.soins.intro",
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
      "service.rituel-horizon.subtitle",
      "service.rituel-horizon.short",
    ] as const),
  ]);

  const editorial = {
    kobido: {
      subtitle: c["service.kobido.subtitle"],
      short: c["service.kobido.short"],
      image: c["service.kobido.image"],
    },
    "calme-et-harmonie": {
      subtitle: c["service.calme-et-harmonie.subtitle"],
      short: c["service.calme-et-harmonie.short"],
      image: c["service.calme-et-harmonie.image"],
    },
    "5-continents": {
      subtitle: c["service.5-continents.subtitle"],
      short: c["service.5-continents.short"],
      image: c["service.5-continents.image"],
    },
    "jambes-legeres": {
      subtitle: c["service.jambes-legeres.subtitle"],
      short: c["service.jambes-legeres.short"],
      image: c["service.jambes-legeres.image"],
    },
    "rituel-horizon": {
      subtitle: c["service.rituel-horizon.subtitle"],
      short: c["service.rituel-horizon.short"],
      image: null,
    },
  } as const;

  return (
    <section id="soins" className="scroll-mt-24 pb-16 md:pb-24">
      <div className="container-site flex flex-col gap-10 md:gap-12">
        <div className="grid gap-4 border-t border-line pt-10 md:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SplitWords
            text={c["reserver.soins.title"]}
            edit={c.edit("reserver.soins.title")}
            className="text-h2 text-balance"
          />
          <p
            {...c.edit("reserver.soins.intro")}
            className="text-lead text-pretty text-ink-soft lg:pt-3"
          >
            {c["reserver.soins.intro"]}
          </p>
        </div>

        <RevealGroup as="ul" className="flex flex-col gap-3 md:gap-4">
          {services.map((service) => {
            const e = editorial[service.slug];
            const key = `service.${service.slug}` as const;
            type EditKey = Parameters<typeof c.edit>[0];
            return (
              <RevealItem
                key={service.slug}
                as="li"
                className="grid grid-cols-[4.5rem_1fr] items-start gap-x-4 gap-y-5 rounded-card bg-paper-soft p-4 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-x-6 md:p-5 lg:grid-cols-[13rem_1fr_auto] lg:gap-8"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-media lg:aspect-[4/3]">
                  {e.image ? (
                    <Image
                      {...c.edit(`${key}.image` as EditKey)}
                      src={e.image.src}
                      alt={e.image.alt}
                      fill
                      sizes="(min-width: 1024px) 13rem, (min-width: 640px) 9rem, 4.5rem"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid size-full place-items-center bg-blush">
                      <LogoSymbol className="size-10 text-accent-700 sm:size-16" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p
                    {...c.edit(`${key}.subtitle` as EditKey)}
                    className="text-eyebrow text-accent-800"
                  >
                    {e.subtitle}
                  </p>
                  <h3 className="text-h3">{service.name}</h3>
                  <p
                    {...c.edit(`${key}.short` as EditKey)}
                    className="max-w-xl text-body text-pretty text-ink-soft"
                  >
                    {e.short}
                  </p>
                  {service.slug === "kobido" && (
                    <TextLink href={routes.kobido} className="w-fit">
                      Tout savoir sur le Kobido
                    </TextLink>
                  )}
                </div>

                <ul className="col-span-2 flex flex-col gap-2 border-t border-line pt-4 lg:col-span-1 lg:border-t-0 lg:pt-0">
                  {service.variants.map((variant) => (
                    <li
                      key={variant.durationMinutes}
                      className="flex items-center justify-between gap-3 lg:justify-end"
                    >
                      <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-ink tabular-nums">
                        {formatVariant(variant)}
                      </span>
                      <ButtonLink href={bookingHref(variant)} size="sm">
                        Réserver
                        <span className="sr-only">
                          {" "}
                          {service.name}, {formatVariant(variant)}
                        </span>
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
