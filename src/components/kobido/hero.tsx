import Image from "next/image";
import Link from "next/link";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { formatDuration, formatPrice } from "@/services/format";
import { getService } from "@/services/get-services";

/**
 * Hero Kobido : composition scindée (texte à gauche, portrait cadré à
 * droite) sur fond sombre, à l'inverse du plein cadre de l'accueil.
 * Les formules (SimplyBook) sont annoncées dès le premier écran.
 * Animations CSS : visibles sans JS (LCP, SEO).
 */
export async function KobidoHero() {
  const [c, service] = await Promise.all([
    getContents([
      "kobido.hero.eyebrow",
      "kobido.hero.title",
      "kobido.hero.lead",
      "kobido.hero.image",
    ] as const),
    getService("kobido"),
  ]);

  return (
    <section className="overflow-hidden bg-night pt-28 pb-12 text-white md:pt-36 md:pb-20">
      <div className="container-site grid items-end gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <nav
            aria-label="Fil d'Ariane"
            className="animate-rise text-sm text-white/70"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href={routes.home}
                  className="transition-colors hover:text-white"
                >
                  Accueil
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white">
                Kobido
              </li>
            </ol>
          </nav>
          <div className="animate-rise [animation-delay:100ms]">
            <Eyebrow tone="dark">{c["kobido.hero.eyebrow"]}</Eyebrow>
          </div>
          <SplitWords
            as="h1"
            text={c["kobido.hero.title"]}
            className="text-display text-balance"
            immediate
            delay={150}
          />
          <p className="max-w-lg animate-rise text-lead text-pretty text-white/75 [animation-delay:500ms]">
            {c["kobido.hero.lead"]}
          </p>
          <div className="flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 pt-1 [animation-delay:650ms]">
            <ButtonLink href={routes.reserver} variant="light">
              Réserver un Kobido
            </ButtonLink>
            <TextLink href="#formules" className="text-white">
              Voir les formules
            </TextLink>
          </div>

          {service ? (
            <dl className="mt-4 grid w-full animate-rise grid-cols-2 border-t border-white/20 pt-6 [animation-delay:800ms] sm:max-w-md">
              {service.variants.map((v, i) => (
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
        </div>

        <div className="relative animate-rise [animation-delay:200ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Image
              src={c["kobido.hero.image"].src}
              alt={c["kobido.hero.image"].alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="animate-hero-zoom object-cover"
            />
          </div>
          <p className="absolute bottom-5 left-5 rounded-full bg-white/15 px-5 py-3 text-sm backdrop-blur-md md:bottom-8 md:left-8">
            Visage · nuque · cuir chevelu
          </p>
        </div>
      </div>
    </section>
  );
}
