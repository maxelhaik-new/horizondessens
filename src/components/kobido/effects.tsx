import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { Rail } from "@/components/ui/rail";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";
import { cn } from "@/lib/cn";

/**
 * Ressentis : grille « bento » asymétrique (une carte sombre, une avec image).
 * Mobile : rail horizontal aimanté.
 */
export async function KobidoEffects() {
  const c = await getContents([
    "kobido.effets.eyebrow",
    "kobido.effets.title",
    "kobido.effets.items",
  ] as const);
  const items = c["kobido.effets.items"];

  const styles = [
    "md:col-span-4 bg-night text-white md:min-h-80",
    "md:col-span-2 bg-paper-soft",
    "md:col-span-2 bg-accent-200",
    "md:col-span-4 bg-paper-soft md:grid md:grid-cols-2 md:gap-8 md:p-3 md:pl-10",
  ];

  return (
    <section className="bg-paper section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={c["kobido.effets.eyebrow"]}
          title={c["kobido.effets.title"]}
          edit={{
            eyebrow: c.edit("kobido.effets.eyebrow"),
            title: c.edit("kobido.effets.title"),
          }}
        />
        <Rail
          label={c["kobido.effets.title"]}
          className="mt-10 md:mt-16 md:grid md:grid-cols-6 md:gap-4"
        >
          {items.map((item, i) => (
            <Reveal
              key={i}
              as="li"
              delay={i * 0.06}
              className={cn(
                "flex flex-col justify-between gap-10 rounded-card p-7 md:p-10",
                styles[i % styles.length],
              )}
            >
              <div className="flex h-full flex-col justify-between gap-8 md:gap-10 md:py-7">
                <span
                  className={cn(
                    "font-serif text-4xl leading-none italic md:text-6xl",
                    i === 0 ? "text-accent-300" : "text-accent-700",
                  )}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h3
                    {...c.edit("kobido.effets.items", i, "title")}
                    className="text-h4 font-serif tracking-[-0.02em] italic"
                  >
                    {item.title}
                  </h3>
                  <p
                    {...c.edit("kobido.effets.items", i, "text")}
                    className={cn(
                      "max-w-md text-body text-pretty",
                      i === 0 ? "text-white/75" : "text-ink-soft",
                    )}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
              {i === 3 ? (
                <RevealImage
                  src="/images/ambiance/mains-epaules.jpg"
                  alt=""
                  sizes="(min-width: 768px) 30vw, 100vw"
                  parallax={0}
                  className="hidden min-h-64 rounded-panel md:block"
                />
              ) : null}
            </Reveal>
          ))}
        </Rail>
      </div>
    </section>
  );
}
