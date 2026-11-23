import Image from "next/image";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/**
 * §1 Hero plein cadre (Serelin) : pastille, titre italique révélé mot à mot,
 * accroche, CTA, puis 4 faits clés en italique (à la place des chiffres).
 * Animations 100 % CSS : visibles sans attendre le JS (LCP, SEO).
 */
export async function Hero() {
  const c = await getContents([
    "home.hero.image",
    "home.hero.eyebrow",
    "home.hero.title",
    "home.hero.lead",
    "home.trust.items",
  ] as const);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-white">
      <Image
        src={c["home.hero.image"].src}
        alt={c["home.hero.image"].alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-10 animate-hero-zoom object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(26_17_15/0.88),rgb(26_17_15/0.2)_55%,rgb(26_17_15/0.5))]"
      />

      <div className="container-site flex flex-1 flex-col justify-end pt-36 pb-10 md:pb-16">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <div className="animate-rise">
            <Eyebrow tone="glass">{c["home.hero.eyebrow"]}</Eyebrow>
          </div>
          <SplitWords
            as="h1"
            text={c["home.hero.title"]}
            className="text-display text-balance"
            immediate
            delay={150}
          />
          <p className="max-w-lg animate-rise text-lead text-pretty text-white/75 [animation-delay:500ms]">
            {c["home.hero.lead"]}
          </p>
          <div className="flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 pt-2 [animation-delay:650ms]">
            <ButtonLink href={routes.reserver} variant="light">
              Réserver un soin
            </ButtonLink>
            <TextLink href={routes.carteCadeau} className="text-white">
              Offrir une carte cadeau
            </TextLink>
          </div>
        </div>

        <ul className="mt-14 grid animate-rise grid-cols-2 gap-y-8 border-t border-white/20 pt-8 [animation-delay:800ms] md:mt-20 md:grid-cols-4">
          {c["home.trust.items"].map(({ value, label }, i) => (
            <li
              key={value}
              className={
                i > 0 ? "md:border-l md:border-white/15 md:pl-8" : undefined
              }
            >
              <p className="font-serif text-4xl leading-none tracking-[-0.02em] italic md:text-5xl">
                {value}
              </p>
              <p className="mt-3 text-xs tracking-[0.008em] text-white/70 md:text-sm">
                {label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
