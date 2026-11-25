import {
  BookingSection,
  bookingReassurance,
} from "@/components/booking-module/booking-section";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { TextLink } from "@/components/ui/button-link";
import type { ServicePageSlug } from "@/services/pages";

import { getServicePageContents } from "./content";
import { giftLink } from "./gift";

/**
 * Réserver (`id="reserver"`) : ce que comprend la séance, le module de
 * réservation (durée et prix y sont affichés), puis l'abonnement et « Offrir ».
 * Remplace les anciennes sections « Formule » et « Réservation ».
 */
export async function ServiceReserve({ slug }: { slug: ServicePageSlug }) {
  const c = await getServicePageContents(slug, [
    "reserver.text",
    "reserver.abonnement",
  ] as const);
  const gift = giftLink(slug);

  return (
    <BookingSection
      slug={slug}
      className="scroll-mt-24 bg-mist section-y"
      heading={(online) => (
        <header className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-5">
            <SplitWords
              as="h2"
              text="Choisissez votre moment"
              className="text-h2 text-balance"
            />
            {online ? (
              <Reveal>
                <p className="max-w-lg text-body text-pretty text-ink-soft">
                  {bookingReassurance}
                </p>
              </Reveal>
            ) : null}
          </div>
          <Reveal className="flex flex-col gap-3 lg:pb-1">
            <p className="text-eyebrow text-accent-800">
              Ce que comprend la séance
            </p>
            <p
              {...c.edit("reserver.text")}
              className="text-lead text-pretty text-ink"
            >
              {c["reserver.text"]}
            </p>
          </Reveal>
        </header>
      )}
      footer={
        <Reveal className="flex flex-col items-start gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="max-w-2xl text-body text-pretty text-ink-soft">
            <span className="font-medium text-ink">En abonnement. </span>
            <span {...c.edit("reserver.abonnement")}>
              {c["reserver.abonnement"]}
            </span>
          </p>
          <TextLink href={gift.href} className="shrink-0">
            {gift.label}
          </TextLink>
        </Reveal>
      }
    />
  );
}
