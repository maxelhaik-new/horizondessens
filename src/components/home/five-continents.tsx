import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/** §5 Massage des 5 Continents : la seule section sombre, pour le différenciant. */
export async function FiveContinents() {
  const c = await getContents([
    "home.5c.image",
    "home.5c.eyebrow",
    "home.5c.title",
    "home.5c.text",
    "home.5c.licence",
  ] as const);

  return (
    <section id="5-continents" className="bg-night section-y text-white">
      <div className="container-site grid items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16 lg:gap-24">
        <div className="order-2 flex flex-col items-start gap-6 md:order-1">
          <Reveal>
            <Eyebrow tone="dark">{c["home.5c.eyebrow"]}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h2 text-balance">{c["home.5c.title"]}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lead text-pretty text-white/75">
              {c["home.5c.text"]}
            </p>
          </Reveal>
          <Reveal
            delay={0.3}
            className="flex items-center gap-4 border-t border-white/15 pt-6"
          >
            <Image
              src="/images/badges/licence-m5c.png"
              alt="Badge Praticien M5C officiel, Fédération du massage des 5 continents"
              width={64}
              height={64}
              className="size-16"
            />
            <p className="text-sm text-white/70">{c["home.5c.licence"]}</p>
          </Reveal>
          <Reveal delay={0.35} className="pt-2">
            <ButtonLink href={routes.reserver} variant="light">
              Réserver ce soin
            </ButtonLink>
          </Reveal>
        </div>

        <RevealImage
          src={c["home.5c.image"].src}
          alt={c["home.5c.image"].alt}
          sizes="(min-width: 768px) 55vw, 100vw"
          className="order-1 aspect-[3/4] rounded-media md:order-2 md:aspect-[4/5]"
          parallax={10}
        />
      </div>
    </section>
  );
}
