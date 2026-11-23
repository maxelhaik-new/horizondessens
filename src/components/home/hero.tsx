import Image from "next/image";

import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/** §1 Hero plein cadre + §2 faits de réassurance (à la place des chiffres Serelin). */
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
        className="-z-10 object-cover"
      />
      {/* Voile pour la lisibilité du texte */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(26_17_15/0.85),rgb(26_17_15/0.25)_55%,rgb(26_17_15/0.45))]"
      />

      <div className="container-site flex flex-1 flex-col justify-end pt-32 pb-10 md:pb-14">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <div className="animate-rise">
            <Eyebrow tone="glass">{c["home.hero.eyebrow"]}</Eyebrow>
          </div>
          <div className="animate-rise [animation-delay:120ms]">
            <h1 className="text-display text-balance">
              {c["home.hero.title"]}
            </h1>
          </div>
          <div className="animate-rise [animation-delay:240ms]">
            <p className="max-w-lg text-lead text-pretty text-white/80">
              {c["home.hero.lead"]}
            </p>
          </div>
          <div className="flex animate-rise flex-wrap items-center gap-x-6 gap-y-4 pt-2 [animation-delay:360ms]">
            <ButtonLink href={routes.reserver} variant="light">
              Réserver un soin
            </ButtonLink>
            <TextLink href={routes.carteCadeau} className="text-white">
              Offrir une carte cadeau
            </TextLink>
          </div>
        </div>

        <ul className="mt-14 grid animate-rise grid-cols-2 gap-y-6 border-t border-white/20 pt-6 [animation-delay:480ms] md:mt-20 md:grid-cols-4">
          {c["home.trust.items"].map((fact, i) => (
            <li
              key={fact}
              className={
                i % 2 === 1 ? "pl-4 md:pl-6" : i > 0 ? "md:pl-6" : undefined
              }
            >
              <span className="font-serif text-xl leading-tight tracking-[-0.02em] text-white/90 md:text-2xl">
                {fact}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
