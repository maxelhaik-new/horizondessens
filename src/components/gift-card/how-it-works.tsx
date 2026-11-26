import Link from "next/link";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { CheckIcon } from "@/components/ui/icons";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/**
 * Comment ça marche (étapes numérotées, visuel collant à gauche) puis
 * les conditions essentielles, avec renvoi vers les CGV.
 */
export async function GiftCardHowItWorks() {
  const c = await getContents([
    "cadeau.steps.title",
    "cadeau.steps.items",
    "cadeau.steps.image",
    "cadeau.conditions.title",
    "cadeau.conditions.items",
  ] as const);

  return (
    <section className="section-y">
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <RevealImage
            src={c["cadeau.steps.image"].src}
            edit={c.edit("cadeau.steps.image")}
            alt={c["cadeau.steps.image"].alt}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="aspect-[3/2] max-h-[70vh] w-full rounded-card sm:aspect-[4/5]"
          />
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          <div className="flex flex-col gap-6 md:gap-8">
            <SplitWords
              text={c["cadeau.steps.title"]}
              edit={c.edit("cadeau.steps.title")}
              className="text-h2 text-balance"
            />
            <RevealGroup as="ol" className="flex flex-col border-t border-line">
              {c["cadeau.steps.items"].map((step, i) => (
                <RevealItem
                  key={i}
                  as="li"
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5 md:grid-cols-[4rem_1fr] md:py-7"
                >
                  <span className="font-serif text-3xl leading-none text-accent-800 italic lining-nums tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3
                      {...c.edit("cadeau.steps.items", i, "title")}
                      className="text-h4"
                    >
                      {step.title}
                    </h3>
                    <p
                      {...c.edit("cadeau.steps.items", i, "text")}
                      className="max-w-lg text-body text-pretty text-ink-soft"
                    >
                      {step.text}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="flex flex-col gap-5 rounded-card bg-paper-soft p-6 md:gap-6 md:p-10">
            <h2 {...c.edit("cadeau.conditions.title")} className="text-h4">
              {c["cadeau.conditions.title"]}
            </h2>
            <ul className="flex flex-col gap-3">
              {c["cadeau.conditions.items"].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-body text-ink-soft"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blush text-accent-800">
                    <CheckIcon className="size-3.5" />
                  </span>
                  <span {...c.edit("cadeau.conditions.items", i)}>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`${routes.cgv}#cartes-cadeaux`}
              className="w-fit text-sm font-medium underline decoration-current/30 underline-offset-[6px] hover:decoration-current"
            >
              Conditions générales de vente
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
