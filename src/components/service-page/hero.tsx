import Image from "next/image";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { formatDuration, formatPrice } from "@/services/format";
import { getService } from "@/services/get-services";
import { servicePages, type ServicePageSlug } from "@/services/pages";

import { getServicePageContents } from "./content";

/**
 * Hero d'une page de soin : composition scindée sur fond sombre (texte à
 * gauche, image à droite), durées et prix dès le premier écran, badge
 * éventuel (M5C). Animations CSS : visibles sans JS (LCP, SEO).
 */
export async function ServiceHero({ slug }: { slug: ServicePageSlug }) {
  const page = servicePages[slug];
  const [c, service, badge] = await Promise.all([
    getServicePageContents(slug, [
      "hero.title",
      "hero.lead",
      "hero.image",
    ] as const),
    getService(slug),
    page.badge === "m5c" ? getContents(["home.5c.licence"] as const) : null,
  ]);
  const variants = service?.variants ?? [];

  return (
    <section className="overflow-hidden bg-night pt-28 pb-12 text-white md:pt-36 md:pb-20">
      <div className="container-site grid items-end gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <SplitWords
            as="h1"
            text={c["hero.title"]}
            edit={c.edit("hero.title")}
            className="text-display text-balance"
            immediate
            delay={150}
          />
          <p
            {...c.edit("hero.lead")}
            className="max-w-lg animate-rise text-lead text-pretty text-white/75 [animation-delay:500ms]"
          >
            {c["hero.lead"]}
          </p>
          <div
            data-hero-cta
            className="flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 pt-1 [animation-delay:650ms]"
          >
            <ButtonLink href="#reserver" variant="light">
              Réserver ce massage
            </ButtonLink>
          </div>

          <div className="mt-4 flex w-full animate-rise flex-wrap items-end gap-x-10 gap-y-6 border-t border-white/20 pt-6 [animation-delay:800ms]">
            {variants.length > 0 ? (
              <dl className="flex gap-6">
                {variants.map((v, i) => (
                  <div
                    key={v.durationMinutes}
                    className={
                      i > 0 ? "border-l border-white/15 pl-6" : undefined
                    }
                  >
                    <dt className="font-serif text-4xl leading-none tracking-[-0.02em] italic md:text-5xl">
                      {formatDuration(v.durationMinutes)}
                    </dt>
                    <dd className="mt-2 text-sm text-white/70">
                      {v.priceEuros === null
                        ? "Tarif à venir"
                        : formatPrice(v.priceEuros)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {badge ? (
              <div className="flex items-center gap-3 rounded-full bg-white/8 py-1.5 pr-5 pl-1.5">
                <Image
                  src="/images/badges/licence-m5c.png"
                  alt="Badge Praticien M5C officiel, Fédération du massage des 5 continents"
                  width={44}
                  height={44}
                  className="size-11"
                />
                <p
                  {...badge.edit("home.5c.licence")}
                  className="max-w-56 text-sm leading-snug text-white/80"
                >
                  {badge["home.5c.licence"]}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative animate-rise [animation-delay:200ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              {...c.edit("hero.image")}
              src={c["hero.image"].src}
              alt={c["hero.image"].alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="animate-hero-zoom object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
