import {
  BookingSection,
  bookingReassurance,
} from "@/components/booking-module/booking-section";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/**
 * Réserver un Kobido (`id="reserver"`), sur le modèle des pages de soin :
 * ce que comprend la séance, le module (durées et prix y sont choisis), puis
 * la cure et « Offrir ». Remplace les anciennes sections « Formules »,
 * « Déroulé », « Mon approche » et l'appel final (25/11/2026, distill).
 */
export async function KobidoReserve() {
  const c = await getContents([
    "kobido.reserver.text",
    "kobido.reserver.cure",
  ] as const);

  return (
    <BookingSection
      slug="kobido"
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
              {...c.edit("kobido.reserver.text")}
              className="text-lead text-pretty text-ink"
            >
              {c["kobido.reserver.text"]}
            </p>
          </Reveal>
        </header>
      )}
      footer={
        <Reveal className="flex flex-col items-start gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="max-w-2xl text-body text-pretty text-ink-soft">
            <span className="font-medium text-ink">En cure. </span>
            <span {...c.edit("kobido.reserver.cure")}>
              {c["kobido.reserver.cure"]}
            </span>
          </p>
          <TextLink href={routes.carteCadeau} className="shrink-0">
            Offrir un Kobido
          </TextLink>
        </Reveal>
      }
    />
  );
}
