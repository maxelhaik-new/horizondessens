import type { ComponentType, SVGProps } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ConversationIcon, HandIcon, LeafIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";

/** Pictogrammes des 3 temps (fixes, dans l'ordre). */
const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  ConversationIcon,
  HandIcon,
  LeafIcon,
];

/**
 * Les 3 temps d'une séance — cartes hautes Serelin (« usp ») : pastille
 * sombre avec pictogramme en haut, titre italique et texte en bas.
 */
export async function Steps() {
  const c = await getContents([
    "home.steps.eyebrow",
    "home.steps.title",
    "home.steps.intro",
    "home.steps.items",
  ] as const);

  return (
    <section className="bg-paper section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={c["home.steps.eyebrow"]}
          title={c["home.steps.title"]}
          intro={c["home.steps.intro"]}
          edit={{
            eyebrow: c.edit("home.steps.eyebrow"),
            title: c.edit("home.steps.title"),
            intro: c.edit("home.steps.intro"),
          }}
        />

        <RevealGroup
          as="ol"
          className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6"
        >
          {c["home.steps.items"].map((step, i) => {
            const Icon = ICONS[i] ?? LeafIcon;
            return (
              <RevealItem
                as="li"
                key={i}
                className="flex min-h-[20rem] flex-col justify-between gap-12 rounded-card bg-paper-soft p-8 md:min-h-[30rem] md:p-10"
              >
                <span className="grid size-14 place-items-center rounded-full bg-night text-white shadow-lift">
                  <Icon className="size-6" />
                </span>
                <div className="flex flex-col gap-4">
                  <h3
                    {...c.edit("home.steps.items", i, "title")}
                    className="text-h4"
                  >
                    {step.title}
                  </h3>
                  <p
                    {...c.edit("home.steps.items", i, "text")}
                    className="max-w-xs text-body text-pretty text-ink-soft"
                  >
                    {step.text}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
