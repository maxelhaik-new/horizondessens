import type { ReactNode } from "react";

import { SplitWords } from "@/components/motion/split-words";
import { TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

import { ContactForm } from "./contact-form";

/**
 * Haut de la page Contact (distill, 26/11/2026) : le formulaire est l'action
 * principale, visible dès le premier écran. Desktop : titre, intro et
 * coordonnées à gauche, formulaire à droite. Mobile : titre, intro,
 * formulaire, puis coordonnées. Pas de hero photo, pas d'animation qui
 * dépende du JS (au-dessus de la ligne de flottaison).
 */
export async function ContactConversation() {
  const c = await getContents([
    "contact.form.title",
    "contact.form.intro",
  ] as const);
  const { address, hours } = site;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  )}`;

  return (
    <section id="ecrire" className="scroll-mt-8 pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-12">
        <div className="flex flex-col items-start gap-5 md:gap-6 lg:col-start-1 lg:row-start-1">
          <SplitWords
            as="h1"
            text={c["contact.form.title"]}
            edit={c.edit("contact.form.title")}
            className="text-display text-balance"
            immediate
            delay={100}
          />
          <div className="flex animate-rise flex-col items-start gap-5 [animation-delay:300ms]">
            <p
              {...c.edit("contact.form.intro")}
              className="max-w-md text-lead text-pretty text-ink-soft"
            >
              {c["contact.form.intro"]}
            </p>
            <p className="max-w-md text-body text-pretty text-ink-soft">
              Pour prendre rendez-vous, le plus rapide reste la réservation en
              ligne.{" "}
              <TextLink href={routes.reserver} className="text-ink">
                Choisir un soin
              </TextLink>
            </p>
          </div>
        </div>

        <div className="animate-rise rounded-card bg-paper-soft p-5 shadow-soft [animation-delay:200ms] sm:p-6 md:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ContactForm />
        </div>

        <dl className="grid animate-rise gap-x-10 gap-y-6 border-t border-line pt-8 [animation-delay:400ms] sm:grid-cols-2 lg:col-start-1 lg:row-start-2 lg:self-start">
          <Detail term="Téléphone">
            <a href={site.phone.href} className="hover:text-accent-800">
              {site.phone.display}
            </a>
          </Detail>
          <Detail term="E-mail">
            <a
              href={`mailto:${site.email}`}
              className="break-all hover:text-accent-800"
            >
              {site.email}
            </a>
          </Detail>
          <Detail term="Horaires">
            {hours.days}
            <br />
            {hours.slots.join(" · ")}
          </Detail>
          <Detail term="Adresse">
            {address.street}
            <br />
            {address.postalCode} {address.city}
            <br />
            <TextLink href={directionsUrl} className="mt-1">
              Itinéraire
            </TextLink>
          </Detail>
        </dl>
      </div>
    </section>
  );
}

function Detail({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-sm text-ink-subtle">{term}</dt>
      <dd className="text-body text-ink">{children}</dd>
    </div>
  );
}
