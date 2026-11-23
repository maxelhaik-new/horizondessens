import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";

/**
 * Origine : mise en page éditoriale. Colonne gauche collante (titre + image),
 * texte long à droite, premier paragraphe en chapeau, citation détachée.
 */
export async function KobidoOrigin() {
  const c = await getContents([
    "kobido.origine.eyebrow",
    "kobido.origine.title",
    "kobido.origine.text",
    "kobido.origine.quote",
    "kobido.origine.image",
  ] as const);
  const [first, ...rest] = c["kobido.origine.text"].split(/\n\s*\n/);

  return (
    <section className="bg-paper section-y">
      <div className="container-site grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-24">
        <div className="flex flex-col items-start gap-7 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>{c["kobido.origine.eyebrow"]}</Eyebrow>
          </Reveal>
          <SplitWords
            text={c["kobido.origine.title"]}
            className="text-h2 text-balance"
          />
          <RevealImage
            src={c["kobido.origine.image"].src}
            alt={c["kobido.origine.image"].alt}
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="mt-2 hidden aspect-[4/3] w-full rounded-panel lg:block"
          />
        </div>

        <div className="flex flex-col gap-8 lg:pt-24">
          <Reveal>
            <p className="text-xl leading-[1.5] tracking-[-0.005em] text-pretty text-ink md:text-2xl">
              {first}
            </p>
          </Reveal>
          {rest.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)}>
              <p className="text-lead text-pretty text-ink-soft">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal>
            <blockquote className="mt-6 border-l border-accent-500 pl-6 md:mt-10 md:pl-10">
              <p className="text-h4 font-serif tracking-[-0.02em] text-balance italic">
                {c["kobido.origine.quote"]}
              </p>
            </blockquote>
          </Reveal>
          <RevealImage
            src={c["kobido.origine.image"].src}
            alt=""
            sizes="100vw"
            className="aspect-[4/3] rounded-panel lg:hidden"
          />
        </div>
      </div>
    </section>
  );
}
