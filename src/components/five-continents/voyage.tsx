import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { getServicePageContents } from "@/components/service-page/content";

import { VoyageScroller } from "./voyage-scroller";

/**
 * Le voyage : les chapitres du soin, sur fond sombre. Le moment fort de la
 * page (défilement horizontal épinglé sur desktop).
 */
export async function FiveContinentsVoyage() {
  const c = await getServicePageContents("5-continents", [
    "voyage.title",
    "voyage.intro",
    "voyage.items",
  ] as const);
  const items = c["voyage.items"];
  if (items.length === 0) return null;

  const heading = (
    <header className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
      <SplitWords
        text={c["voyage.title"]}
        edit={c.edit("voyage.title")}
        className="text-h2 text-balance"
      />
      <Reveal>
        <p
          {...c.edit("voyage.intro")}
          className="max-w-md text-lead text-pretty text-white/75"
        >
          {c["voyage.intro"]}
        </p>
      </Reveal>
    </header>
  );

  return (
    <section className="bg-night text-white">
      <VoyageScroller
        heading={heading}
        items={items.map((item, i) => ({
          ...item,
          edit: {
            title: c.edit("voyage.items", i, "title"),
            text: c.edit("voyage.items", i, "text"),
            image: c.edit("voyage.items", i, "image"),
          },
        }))}
      />
    </section>
  );
}
