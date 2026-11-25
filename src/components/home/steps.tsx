import type { ComponentType, SVGProps } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { ConversationIcon, HandIcon, LeafIcon } from "@/components/ui/icons";
import { getContents } from "@/content/get-content";

/** Pictogrammes des 3 temps (fixes, dans l'ordre). */
const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  ConversationIcon,
  HandIcon,
  LeafIcon,
];

/**
 * Les 3 temps d'une séance, sur un fil continu (25/11/2026, à la place des
 * cartes hautes) : titre court aligné à gauche, puis une ligne fine où se
 * posent les pictogrammes. Desktop : fil horizontal ; mobile : rail vertical.
 * Composition volontairement différente de la Philosophie (centrée) juste
 * au-dessus.
 */
export async function Steps() {
  const c = await getContents([
    "home.steps.eyebrow",
    "home.steps.items",
  ] as const);

  return (
    <section className="bg-paper pt-12 pb-16 md:pt-28 md:pb-24">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_3fr] lg:gap-16">
        <SplitWords
          text={c["home.steps.eyebrow"]}
          edit={c.edit("home.steps.eyebrow")}
          className="text-h3 text-balance lg:-translate-y-1/2"
        />

        <RevealGroup
          as="ol"
          className="relative ml-5 grid gap-10 border-l border-line pl-10 md:ml-0 md:grid-cols-3 md:gap-10 md:border-t md:border-l-0 md:pt-12 md:pl-0"
        >
          {c["home.steps.items"].map((step, i) => {
            const Icon = ICONS[i] ?? LeafIcon;
            return (
              <RevealItem
                as="li"
                key={i}
                className="relative flex flex-col gap-3"
              >
                <span
                  aria-hidden
                  className="absolute top-0 -left-[3.75rem] grid size-10 place-items-center rounded-full bg-night text-white ring-6 ring-paper md:-top-[4.25rem] md:left-0"
                >
                  <Icon className="size-[1.1rem]" />
                </span>
                <h3
                  {...c.edit("home.steps.items", i, "title")}
                  className="pt-1.5 text-h4 md:pt-0"
                >
                  {step.title}
                </h3>
                <p
                  {...c.edit("home.steps.items", i, "text")}
                  className="max-w-xs text-body text-pretty text-ink-soft"
                >
                  {step.text}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
