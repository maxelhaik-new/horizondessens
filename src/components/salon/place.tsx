import Image from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { getContents } from "@/content/get-content";
import { cn } from "@/lib/cn";

/*
 * Emplacements de la mosaïque (6 colonnes, rangées fixes sur desktop) :
 *  ┌──────────┬────┐
 *  │    0     │ 1  │
 *  │          ├────┤
 *  ├────┬─────┤ 2  │
 *  │ 3  │  4  │    │
 *  │    ├─────┴────┤
 *  │    │    5     │
 *  └────┴──────────┘
 */
const slots = [
  "col-span-2 aspect-[4/3] md:col-span-4 md:row-span-2 md:aspect-auto",
  "aspect-[4/5] md:col-span-2 md:aspect-auto",
  "aspect-[4/5] md:col-span-2 md:row-span-2 md:aspect-auto",
  "aspect-[4/5] md:col-span-2 md:row-span-2 md:aspect-auto",
  "aspect-[4/5] md:col-span-2 md:aspect-auto",
  "col-span-2 aspect-[16/9] md:col-span-4 md:aspect-auto",
];

/** Le lieu : texte d'introduction, mosaïque de toutes les images, atouts. */
export async function SalonPlace() {
  const c = await getContents([
    "salon.lieu.title",
    "salon.lieu.text",
    "salon.lieu.gallery",
    "salon.details.items",
  ] as const);
  const gallery = c["salon.lieu.gallery"];

  return (
    <section className="section-y">
      <div className="container-site flex flex-col gap-12 md:gap-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SplitWords
            text={c["salon.lieu.title"]}
            className="text-h2 text-balance"
          />
          <Reveal>
            <p className="text-lead text-pretty text-ink-soft lg:pt-3">
              {c["salon.lieu.text"]}
            </p>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-[repeat(4,clamp(12rem,18vw,16rem))] md:gap-4"
        >
          {gallery.map((item, i) => (
            <RevealItem
              key={item.image}
              as="li"
              className={cn(
                "group relative overflow-hidden rounded-media md:rounded-panel",
                slots[i] ?? "aspect-[4/5]",
              )}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 60vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-serelin group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-paper-soft/85 px-3.5 py-2 text-xs font-medium text-ink backdrop-blur-md md:bottom-5 md:left-5 md:px-4 md:text-sm">
                {item.caption}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup
          as="ol"
          className="grid gap-8 border-t border-line pt-10 md:grid-cols-3 md:gap-12"
        >
          {c["salon.details.items"].map((item, i) => (
            <RevealItem
              key={item.title}
              as="li"
              className="flex flex-col gap-3"
            >
              <span className="text-sm font-medium text-accent-800 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h4">{item.title}</h3>
              <p className="text-body text-pretty text-ink-soft">{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
