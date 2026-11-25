import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { TextLink } from "@/components/ui/button-link";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

import { ContactForm } from "./contact-form";

/**
 * Bloc d'échange (Serelin) : à gauche une carte rosée avec le titre, le
 * téléphone et l'e-mail (adresse et horaires : section « Venir au salon »), à droite le formulaire sur carte blanche.
 */
export async function ContactConversation() {
  const c = await getContents([
    "contact.form.title",
    "contact.form.intro",
  ] as const);

  return (
    <section id="ecrire" className="scroll-mt-8 section-y">
      <div className="container-site grid gap-3 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="flex flex-col justify-between gap-12 rounded-card bg-blush p-8 md:p-12">
          <div className="flex flex-col items-start gap-6">
            <SplitWords
              text={c["contact.form.title"]}
              edit={c.edit("contact.form.title")}
              className="text-h2 text-balance"
            />
            <p
              {...c.edit("contact.form.intro")}
              className="max-w-md text-lead text-pretty text-ink-soft"
            >
              {c["contact.form.intro"]}
            </p>
            <TextLink href={routes.reserver}>Voir les soins et tarifs</TextLink>
          </div>

          <ul className="flex flex-col gap-4">
            <ContactLine icon={<PhoneIcon className="size-4" />}>
              <a href={site.phone.href} className="hover:text-accent-800">
                {site.phone.display}
              </a>
            </ContactLine>
            <ContactLine icon={<MailIcon className="size-4" />}>
              <a
                href={`mailto:${site.email}`}
                className="break-all hover:text-accent-800"
              >
                {site.email}
              </a>
            </ContactLine>
          </ul>
        </Reveal>

        <Reveal
          delay={0.1}
          className="rounded-card bg-paper-soft p-6 shadow-soft md:p-10"
        >
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactLine({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-4 text-body text-ink">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/60 text-accent-800">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}
