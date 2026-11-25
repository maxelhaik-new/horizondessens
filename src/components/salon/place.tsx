import Image from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { getContents } from "@/content/get-content";
import { cn } from "@/lib/cn";
import { Rail } from "@/components/ui/rail";

/*
 * Mobile : rail horizontal aimanté (images en 4:5).
 * Emplacements de la mosaïque (6 colonnes, rangées fixes dès 48rem) :
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
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-4",
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
      <div className="container-site flex flex-col gap-10 md:gap-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SplitWords
            text={c["salon.lieu.title"]}
            edit={c.edit("salon.lieu.title")}
            className="text-h2 text-balance"
          />
          <Reveal>
            <p
              {...c.edit("salon.lieu.text")}
              className="text-lead text-pretty text-ink-soft lg:pt-3"
            >
              {c["salon.lieu.text"]}
            </p>
          </Reveal>
        </div>

        <div>
          <Rail
            label="Le salon en images"
            className="md:grid md:grid-cols-6 md:grid-rows-[repeat(4,clamp(12rem,18vw,16rem))] md:gap-4"
          >
            {gallery.map((item, i) => (
              <li
                key={i}
                className={cn(
                  "group relative aspect-[4/5] overflow-hidden rounded-panel md:aspect-auto",
                  slots[i] ?? "md:col-span-2",
                )}
              >
                <Image
                  {...c.edit("salon.lieu.gallery", i)}
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 84vw"
                  className="object-cover transition-transform duration-[1.2s] ease-serelin group-hover:scale-105"
                />
                <span
                  {...c.edit("salon.lieu.gallery", i, "caption")}
                  className="absolute bottom-3 left-3 rounded-full bg-paper-soft/85 px-3.5 py-2 text-xs font-medium text-ink backdrop-blur-md md:bottom-5 md:left-5 md:px-4 md:text-sm"
                >
                  {item.caption}
                </span>
              </li>
            ))}
          </Rail>
        </div>

        <RevealGroup
          as="ol"
          className="grid gap-7 border-t border-line pt-8 md:grid-cols-3 md:gap-12 md:pt-10"
        >
          {c["salon.details.items"].map((item, i) => (
            <RevealItem
              key={i}
              as="li"
              className="flex flex-col gap-2 md:gap-3"
            >
              <span className="text-sm font-medium text-accent-800 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                {...c.edit("salon.details.items", i, "title")}
                className="text-h4"
              >
                {item.title}
              </h3>
              <p
                {...c.edit("salon.details.items", i, "text")}
                className="text-body text-pretty text-ink-soft"
              >
                {item.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
