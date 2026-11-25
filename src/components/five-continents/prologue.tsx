import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { getServicePageContents } from "@/components/service-page/content";

/**
 * Prologue : une grande phrase qui ouvre le récit, puis l'histoire du soin
 * (ce qu'il réunit, pourquoi il est rare) face à l'image des huiles.
 */
export async function FiveContinentsPrologue() {
  const c = await getServicePageContents("5-continents", [
    "prologue.title",
    "prologue.text",
    "prologue.image",
  ] as const);
  const [first, ...rest] = c["prologue.text"].split(/\n\s*\n/);

  return (
    <section className="bg-paper section-y">
      <div className="container-site flex flex-col gap-14 md:gap-20">
        <SplitWords
          as="h2"
          text={c["prologue.title"]}
          edit={c.edit("prologue.title")}
          className="max-w-5xl text-h2 text-balance md:text-[clamp(3rem,5.2vw,4.75rem)] md:leading-[1.1]"
        />

        <div className="grid items-end gap-10 lg:grid-cols-[5fr_6fr] lg:gap-24">
          <RevealImage
            src={c["prologue.image"].src}
            alt={c["prologue.image"].alt}
            edit={c.edit("prologue.image")}
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
            className="aspect-[4/5] rounded-panel sm:max-w-md lg:max-w-none"
          />
          <div className="flex flex-col gap-7 lg:pb-4">
            <Reveal>
              <p
                {...c.edit("prologue.text", 0, "para")}
                className="text-xl leading-[1.5] tracking-[-0.005em] text-pretty text-ink md:text-2xl"
              >
                {first}
              </p>
            </Reveal>
            {rest.map((paragraph, i) => (
              <Reveal key={i}>
                <p
                  {...c.edit("prologue.text", i + 1, "para")}
                  className="text-lead text-pretty text-ink-soft"
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
