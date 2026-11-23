import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { site } from "@/lib/site";

/** Approche d'Élodie : grande citation centrée, médaillon portrait, signature. */
export async function KobidoApproach() {
  const c = await getContents([
    "kobido.approche.eyebrow",
    "kobido.approche.quote",
    "kobido.approche.text",
    "home.elodie.image",
  ] as const);

  return (
    <section className="bg-paper section-y">
      <div className="container-site flex max-w-4xl flex-col items-center gap-10 text-center">
        <Reveal>
          <Eyebrow edit={c.edit("kobido.approche.eyebrow")}>
            {c["kobido.approche.eyebrow"]}
          </Eyebrow>
        </Reveal>
        <Reveal>
          <blockquote>
            <p className="text-h3 font-serif tracking-[-0.02em] text-balance italic">
              «{" "}
              <span {...c.edit("kobido.approche.quote")}>
                {c["kobido.approche.quote"]}
              </span>{" "}
              »
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={0.1} className="flex items-center gap-4 text-left">
          <span className="relative size-16 overflow-hidden rounded-full">
            <Image
              src={c["home.elodie.image"].src}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
          </span>
          <span>
            <span className="block font-medium">{site.practitioner}</span>
            <span className="block text-sm text-ink-soft">
              Praticienne Kobido
            </span>
          </span>
        </Reveal>
        <Reveal delay={0.15}>
          <p
            {...c.edit("kobido.approche.text")}
            className="max-w-2xl text-lead text-pretty text-ink-soft"
          >
            {c["kobido.approche.text"]}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
