import Image from "next/image";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";

/**
 * Hero Carte cadeau : fond clair, texte à gauche et visuel de la carte à
 * droite, légèrement incliné (objet que l'on tient, que l'on offre).
 */
export async function GiftCardHero() {
  const c = await getContents([
    "cadeau.hero.title",
    "cadeau.hero.lead",
    "cadeau.hero.image",
  ] as const);

  return (
    <section className="overflow-hidden pt-32 pb-16 md:pt-40 lg:pb-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <SplitWords
            as="h1"
            text={c["cadeau.hero.title"]}
            className="text-display text-balance"
            immediate
          />
          <p className="max-w-md animate-rise text-lead text-pretty text-ink-soft [animation-delay:400ms]">
            {c["cadeau.hero.lead"]}
          </p>
          <div className="flex animate-rise flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:550ms]">
            <ButtonLink href="#formules">Choisir une carte</ButtonLink>
            <p className="text-sm text-ink-subtle">
              Valable 6 mois · envoyée par e-mail
            </p>
          </div>
        </div>

        <div className="relative animate-rise [animation-delay:200ms]">
          <div
            aria-hidden
            className="absolute inset-x-[8%] top-[12%] -bottom-6 -z-10 rounded-card bg-blush"
          />
          <div className="relative aspect-[5/4] overflow-hidden rounded-card shadow-soft lg:rotate-[-2deg]">
            <Image
              src={c["cadeau.hero.image"].src}
              alt={c["cadeau.hero.image"].alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
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
