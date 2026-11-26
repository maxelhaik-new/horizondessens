import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rail } from "@/components/ui/rail";
import { getContents } from "@/content/get-content";
import { site } from "@/lib/site";

/**
 * Le parcours d'Élodie (version longue) : portrait et citation collants à
 * gauche, récit en chapitres datés à droite, reliés par un fil vertical.
 * Mobile : portrait et citation côte à côte, chapitres en rail horizontal.
 */
export async function SalonStory() {
  const c = await getContents([
    "salon.elodie.eyebrow",
    "salon.elodie.title",
    "salon.elodie.intro",
    "salon.elodie.image",
    "salon.elodie.chapters",
    "salon.elodie.quote",
  ] as const);

  return (
    <section id="elodie" className="scroll-mt-24 bg-paper-soft section-y">
      <div className="container-site flex flex-col gap-10 md:gap-16">
        <div className="flex max-w-3xl flex-col items-start gap-5 md:gap-6">
          <Eyebrow edit={c.edit("salon.elodie.eyebrow")}>
            {c["salon.elodie.eyebrow"]}
          </Eyebrow>
          <SplitWords
            text={c["salon.elodie.title"]}
            edit={c.edit("salon.elodie.title")}
            className="text-h2 text-balance"
          />
          <Reveal>
            <p
              {...c.edit("salon.elodie.intro")}
              className="max-w-[65ch] text-lead text-pretty text-ink-soft"
            >
              {c["salon.elodie.intro"]}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] items-end gap-5 sm:flex sm:flex-col sm:items-stretch sm:gap-8 lg:sticky lg:top-32 lg:self-start">
            <RevealImage
              src={c["salon.elodie.image"].src}
              alt={c["salon.elodie.image"].alt}
              edit={c.edit("salon.elodie.image")}
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 45vw"
              className="aspect-[3/4] max-h-[70vh] w-full rounded-panel sm:max-w-md sm:rounded-card lg:max-w-none"
            />
            <Reveal>
              <figure className="flex flex-col gap-3 border-l-2 border-accent-500 pl-4 sm:pl-6">
                <blockquote className="font-serif text-xl leading-snug tracking-[-0.01em] text-balance italic sm:text-2xl md:text-3xl">
                  «{" "}
                  <span {...c.edit("salon.elodie.quote")}>
                    {c["salon.elodie.quote"]}
                  </span>{" "}
                  »
                </blockquote>
                <figcaption className="text-sm text-ink-subtle">
                  {site.practitioner}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="min-w-0">
            <Rail
              as="ol"
              label="Mon parcours"
              className="md:relative md:flex md:flex-col"
            >
              {c["salon.elodie.chapters"].map((chapter, i, all) => (
                <li
                  key={i}
                  className="relative flex flex-col gap-2 rounded-card bg-paper p-6 md:grid md:grid-cols-[1.25rem_8rem_1fr] md:gap-x-8 md:gap-y-0 md:rounded-none md:bg-transparent md:p-0 md:pb-12 md:last:pb-0"
                >
                  {/* Fil et point du chapitre (desktop) */}
                  <span
                    aria-hidden
                    className="relative hidden justify-center md:flex"
                  >
                    <span
                      className={
                        i === all.length - 1
                          ? "mt-2 size-3 rounded-full bg-night ring-4 ring-paper-soft"
                          : "mt-2 size-3 rounded-full border-2 border-accent-600 bg-paper-soft"
                      }
                    />
                    {i < all.length - 1 ? (
                      <span className="absolute top-6 -bottom-2 w-px bg-line" />
                    ) : null}
                  </span>
                  <p
                    {...c.edit("salon.elodie.chapters", i, "time")}
                    className="font-serif text-xl leading-tight text-accent-800 italic md:pt-0.5 md:text-2xl"
                  >
                    {chapter.time}
                  </p>
                  <div className="flex flex-col gap-3 md:col-start-3">
                    <h3
                      {...c.edit("salon.elodie.chapters", i, "title")}
                      className="text-h4"
                    >
                      {chapter.title}
                    </h3>
                    <p
                      {...c.edit("salon.elodie.chapters", i, "text")}
                      className="max-w-xl text-body text-pretty text-ink-soft"
                    >
                      {chapter.text}
                    </p>
                  </div>
                </li>
              ))}
            </Rail>
          </div>
        </div>
      </div>
    </section>
  );
}
