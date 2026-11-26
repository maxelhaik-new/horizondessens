import Image from "next/image";
import type { ReactNode } from "react";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button-link";
import type { EditAttrs } from "@/content/edit";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice } from "@/services/format";
import type { ServiceVariant } from "@/services/types";

/**
 * Hero commun à toutes les pages de soin (26/11/2026) : image plein cadre,
 * voile sombre en dégradé, titre court, accroche et un seul bouton en bas à
 * gauche ; durées, prix et réassurance éventuelle (badge M5C) à droite.
 * Utilisé par le Kobido, le 5 Continents et le gabarit des autres soins.
 * Animations CSS : visibles sans JS (LCP, SEO).
 */
export function FullHero({
  title,
  lead,
  image,
  imagePosition,
  edit,
  ctaLabel,
  variants,
  aside,
}: {
  title: string;
  lead: string;
  image: { src: string; alt: string };
  /** Cadrage de l'image (`object-position`), ex. `object-[50%_40%]`. */
  imagePosition?: string;
  edit: { title: EditAttrs; lead: EditAttrs; image: EditAttrs };
  ctaLabel: string;
  variants: ServiceVariant[];
  /** Réassurance sous les tarifs (badge M5C…). */
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night pt-36 pb-10 text-white md:pb-16">
      <Image
        {...edit.image}
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className={cn(
          "-z-20 animate-hero-zoom object-cover",
          imagePosition ?? "object-center",
        )}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(26_17_15/0.55)_0%,rgb(26_17_15/0.1)_35%,rgb(26_17_15/0.85)_100%)]"
      />

      <div className="container-site grid items-end gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <SplitWords
            as="h1"
            text={title}
            edit={edit.title}
            className="max-w-4xl text-display text-balance"
            immediate
            delay={150}
          />
          <p
            {...edit.lead}
            className="max-w-xl animate-rise text-lead text-pretty text-white/80 [animation-delay:500ms]"
          >
            {lead}
          </p>
          <div
            data-hero-cta
            className="animate-rise pt-1 [animation-delay:650ms]"
          >
            <ButtonLink href="#reserver" variant="light">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>

        {variants.length > 0 || aside ? (
          <div className="flex animate-rise flex-wrap items-end gap-x-10 gap-y-6 border-t border-white/25 pt-6 [animation-delay:800ms] lg:flex-col lg:items-start lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {variants.map((v) => (
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
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Badge M5C (5 Continents), posé sous les tarifs du hero. */
export function M5cBadge({ text, edit }: { text: string; edit: EditAttrs }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/badges/licence-m5c.png"
        alt="Badge Praticien M5C officiel, Fédération du massage des 5 continents"
        width={44}
        height={44}
        className="size-11"
      />
      <p {...edit} className="max-w-56 text-sm leading-snug text-white/80">
        {text}
      </p>
    </div>
  );
}
