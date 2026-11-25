import Image from "next/image";

import { SplitWords } from "@/components/motion/split-words";
import { getServicePageContents } from "@/components/service-page/content";
import { ButtonLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { formatDuration, formatPrice } from "@/services/format";
import { getService } from "@/services/get-services";

/**
 * Hero du 5 Continents : image plein cadre (immersion), texte posé en bas à
 * gauche, durée, prix et badge M5C à droite. Composition volontairement
 * différente du hero scindé du Kobido et des autres soins.
 * Animations CSS : visibles sans JS (LCP, SEO).
 */
export async function FiveContinentsHero() {
  const [c, badge, service] = await Promise.all([
    getServicePageContents("5-continents", [
      "hero.title",
      "hero.lead",
      "hero.image",
    ] as const),
    getContents(["home.5c.licence"] as const),
    getService("5-continents"),
  ]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night pt-36 pb-10 text-white md:pb-16">
      <Image
        {...c.edit("hero.image")}
        src={c["hero.image"].src}
        alt={c["hero.image"].alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-20 animate-hero-zoom object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(26_17_15/0.55)_0%,rgb(26_17_15/0.1)_35%,rgb(26_17_15/0.82)_100%)]"
      />

      <div className="container-site grid items-end gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <SplitWords
            as="h1"
            text={c["hero.title"]}
            edit={c.edit("hero.title")}
            className="max-w-4xl text-display text-balance"
            immediate
            delay={150}
          />
          <p
            {...c.edit("hero.lead")}
            className="max-w-xl animate-rise text-lead text-pretty text-white/80 [animation-delay:500ms]"
          >
            {c["hero.lead"]}
          </p>
          <div
            data-hero-cta
            className="animate-rise pt-1 [animation-delay:650ms]"
          >
            <ButtonLink href="#reserver" variant="light">
              Réserver ce massage
            </ButtonLink>
          </div>
        </div>

        <div className="flex animate-rise flex-wrap items-end gap-x-10 gap-y-6 border-t border-white/25 pt-6 [animation-delay:800ms] lg:flex-col lg:items-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {service?.variants.map((v) => (
            <p key={v.durationMinutes} className="flex items-baseline gap-4">
              <span className="font-serif text-4xl leading-none tracking-[-0.02em] italic md:text-5xl">
                {formatDuration(v.durationMinutes)}
              </span>
              <span className="text-sm text-white/75">
                {v.priceEuros === null
                  ? "Tarif à venir"
                  : formatPrice(v.priceEuros)}
              </span>
            </p>
          ))}
          <div className="flex items-center gap-3">
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
        </div>
      </div>
    </section>
  );
}
