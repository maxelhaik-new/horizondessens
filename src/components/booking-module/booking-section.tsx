import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { getBookableOptions } from "@/lib/booking/options";
import { cn } from "@/lib/cn";
import { getService } from "@/services/get-services";
import type { ServiceSlug } from "@/services/types";

import { BookingFallback, BookingModule } from "./booking-module";

/** Phrase de réassurance sous le titre, quand l'agenda en ligne est actif. */
export const bookingReassurance =
  "Les créneaux affichés sont ceux de mon agenda, mis à jour en temps réel. Vous recevez une confirmation par e-mail.";

/**
 * Section « Réserver » d'une page de soin (`id="reserver"`) : le module de
 * réservation intégré, ou le repli téléphone/contact si aucune formule du soin
 * n'a de prestation SimplyBook 2026. Libellés d'interface : fixés ici.
 *
 * `heading` remplace l'en-tête centré par défaut (il reçoit `online` : agenda
 * en ligne actif ou non) ; `footer` s'affiche sous le module.
 */
export async function BookingSection({
  slug,
  className,
  heading,
  footer,
}: {
  slug: ServiceSlug;
  className?: string;
  heading?: (online: boolean) => ReactNode;
  footer?: ReactNode;
}) {
  const [service, options] = await Promise.all([
    getService(slug),
    getBookableOptions(slug),
  ]);
  if (!service) return null;
  const online = options.length > 0;

  return (
    <section
      id="reserver"
      className={cn(
        "relative",
        className ?? "scroll-mt-24 bg-mist pb-16 md:pb-24",
      )}
    >
      {/* Cibles des liens `#reserver-<minutes>` (boutons par durée) : sans
          elles, le lien change l'URL sans faire défiler la page. */}
      {service.variants.map((v) => (
        <span
          key={v.durationMinutes}
          id={`reserver-${v.durationMinutes}`}
          aria-hidden
          className="absolute top-0 scroll-mt-24"
        />
      ))}
      <div className="container-site flex flex-col gap-10 md:gap-12">
        {heading ? (
          heading(online)
        ) : (
          <SectionHeading
            eyebrow="Réservation en ligne"
            title="Choisissez votre moment"
            intro={online ? bookingReassurance : undefined}
          />
        )}
        <div className={heading ? "w-full" : "mx-auto w-full max-w-5xl"}>
          {online ? (
            <BookingModule options={options} serviceName={service.name} />
          ) : (
            <BookingFallback />
          )}
        </div>
        {footer}
      </div>
    </section>
  );
}
