import Image from "next/image";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

/**
 * Hero Le salon : composition claire et éditoriale (titre à gauche, accroche
 * et adresse à droite), puis une grande image panoramique de la salle.
 * Différent de l'accueil (plein cadre sombre) et de Contact (carte en inset).
 */
export async function SalonHero() {
  const c = await getContents([
    "salon.hero.title",
    "salon.hero.lead",
    "salon.hero.image",
  ] as const);
  const { address } = site;

  return (
    <section className="pt-32 pb-4 md:pt-40">
      <div className="container-site grid items-end gap-8 pb-10 md:pb-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <SplitWords
          as="h1"
          text={c["salon.hero.title"]}
          edit={c.edit("salon.hero.title")}
          className="text-display text-balance"
          immediate
        />
        <div className="flex animate-rise flex-col items-start gap-6 [animation-delay:400ms]">
          <p
            {...c.edit("salon.hero.lead")}
            className="max-w-md text-lead text-pretty text-ink-soft"
          >
            {c["salon.hero.lead"]}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={routes.reserver}>Réserver un soin</ButtonLink>
            <p className="text-sm text-ink-subtle">
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </p>
          </div>
        </div>
      </div>

      <div className="px-2 md:px-3">
        <div className="relative aspect-[4/5] animate-rise overflow-hidden rounded-card [animation-delay:200ms] sm:aspect-[16/10] lg:aspect-[21/9]">
          <Image
            {...c.edit("salon.hero.image")}
            src={c["salon.hero.image"].src}
            alt={c["salon.hero.image"].alt}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="animate-hero-zoom object-cover object-[50%_60%]"
          />
        </div>
      </div>
    </section>
  );
}
