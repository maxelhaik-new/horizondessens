import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import type { TemplateServicePageSlug } from "@/services/pages";

import { getServicePageContents } from "./content";

/**
 * Le soin : ce qu'il est (chapeau) et comment il se déroule (les temps du
 * soin, numérotés car l'ordre compte). Titre et image à gauche, texte à
 * droite ; en mobile : titre, image, texte.
 */
export async function ServicePresentation({
  slug,
}: {
  slug: TemplateServicePageSlug;
}) {
  const c = await getServicePageContents(slug, [
    "soin.title",
    "soin.text",
    "soin.items",
    "soin.image",
  ] as const);
  const items = c["soin.items"];

  return (
    <section className="bg-paper section-y">
      <div className="container-site grid gap-x-24 gap-y-8 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr]">
        <SplitWords
          text={c["soin.title"]}
          edit={c.edit("soin.title")}
          className="text-h2 text-balance lg:col-start-1"
        />

        <RevealImage
          src={c["soin.image"].src}
          alt={c["soin.image"].alt}
          edit={c.edit("soin.image")}
          sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
          className="aspect-[3/2] rounded-panel sm:aspect-[4/5] sm:max-w-md lg:col-start-1 lg:row-start-2 lg:max-w-none lg:self-start"
        />

        <div className="flex flex-col gap-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-3">
          <Reveal>
            <p
              {...c.edit("soin.text")}
              className="text-lg leading-[1.55] tracking-[-0.005em] text-pretty text-ink md:text-2xl"
            >
              {c["soin.text"]}
            </p>
          </Reveal>

          {items.length > 0 ? (
            <RevealGroup as="ol" className="border-b border-line">
              {items.map((item, i) => (
                <RevealItem
                  as="li"
                  key={i}
                  className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-line py-5 md:grid-cols-[4rem_1fr] md:py-8"
                >
                  <span
                    aria-hidden
                    className="font-serif text-3xl leading-none text-accent-700 italic md:text-4xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h4 font-serif tracking-[-0.02em] italic">
                      <span className="sr-only">{i + 1}. </span>
                      <span {...c.edit("soin.items", i, "title")}>
                        {item.title}
                      </span>
                    </h3>
                    <p
                      {...c.edit("soin.items", i, "text")}
                      className="max-w-xl text-body text-pretty text-ink-soft"
                    >
                      {item.text}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : null}
        </div>
      </div>
    </section>
  );
}
