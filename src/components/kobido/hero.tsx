import Image from "next/image";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { formatDuration, formatPrice } from "@/services/format";
import { getService } from "@/services/get-services";

/**
 * Hero Kobido (25/11/2026) : plein écran et épuré, sur le modèle du
 * 5 Continents. Image de visage en fond, titre et accroche en bas à gauche,
 * un seul bouton, durées et prix à droite (prestations).
 * Animations CSS : visibles sans JS (LCP, SEO).
 */
export async function KobidoHero() {
  const [c, service] = await Promise.all([
    getContents([
      "kobido.hero.title",
      "kobido.hero.lead",
      "kobido.hero.image",
    ] as const),
    getService("kobido"),
  ]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night pt-36 pb-10 text-white md:pb-16">
      <Image
        {...c.edit("kobido.hero.image")}
        src={c["kobido.hero.image"].src}
        alt={c["kobido.hero.image"].alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-20 animate-hero-zoom object-cover object-[50%_40%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(26_17_15/0.55)_0%,rgb(26_17_15/0.1)_35%,rgb(26_17_15/0.85)_100%)]"
      />

      <div className="container-site grid items-end gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <SplitWords
            as="h1"
            text={c["kobido.hero.title"]}
            edit={c.edit("kobido.hero.title")}
            className="max-w-4xl text-display text-balance"
            immediate
            delay={150}
          />
          <p
            {...c.edit("kobido.hero.lead")}
            className="max-w-xl animate-rise text-lead text-pretty text-white/80 [animation-delay:500ms]"
          >
            {c["kobido.hero.lead"]}
          </p>
          <div
            data-hero-cta
            className="animate-rise pt-1 [animation-delay:650ms]"
          >
            <ButtonLink href="#reserver" variant="light">
              Réserver un Kobido
            </ButtonLink>
          </div>
        </div>

        {service ? (
          <div className="flex animate-rise flex-wrap items-end gap-x-10 gap-y-6 border-t border-white/25 pt-6 [animation-delay:800ms] lg:flex-col lg:items-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {service.variants.map((v) => (
              <p key={v.durationMinutes} className="flex items-baseline gap-4">
                <span className="font-serif text-4xl leading-none tracking-[-0.02em] italic md:text-5xl">
                  {formatDuration(v.durationMinutes)}
                </span>
                <span className="text-base text-white/85">
                  {v.priceEuros === null
                    ? "Tarif à venir"
                    : formatPrice(v.priceEuros)}
                </span>
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
