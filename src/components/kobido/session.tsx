import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";

/** Déroulé : frise horizontale sur desktop, rail vertical sur mobile. */
export async function KobidoSession() {
  const c = await getContents([
    "kobido.seance.eyebrow",
    "kobido.seance.title",
    "kobido.seance.items",
  ] as const);
  const items = c["kobido.seance.items"];

  return (
    <section className="bg-paper-soft section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={c["kobido.seance.eyebrow"]}
          title={c["kobido.seance.title"]}
          edit={{
            eyebrow: c.edit("kobido.seance.eyebrow"),
            title: c.edit("kobido.seance.title"),
          }}
          align="left"
        />
        <RevealGroup
          as="ol"
          className="relative mt-12 grid gap-10 border-l border-line pl-8 md:mt-16 md:grid-cols-4 md:gap-8 md:border-t md:border-l-0 md:pt-10 md:pl-0"
        >
          {items.map((item, i) => (
            <RevealItem
              as="li"
              key={i}
              className="relative flex flex-col gap-3"
            >
              <span
                aria-hidden
                className="absolute top-1.5 -left-[2.4rem] grid size-3 place-items-center rounded-full bg-night ring-4 ring-paper-soft md:-top-[2.85rem] md:left-0"
              />
              <p
                {...c.edit("kobido.seance.items", i, "time")}
                className="text-eyebrow text-accent-800"
              >
                {item.time}
              </p>
              <h3 className="text-h4 font-serif tracking-[-0.02em] italic">
                <span className="sr-only">Étape {i + 1} : </span>
                <span {...c.edit("kobido.seance.items", i, "title")}>
                  {item.title}
                </span>
              </h3>
              <p
                {...c.edit("kobido.seance.items", i, "text")}
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
