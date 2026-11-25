import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { bookingAnchor, servicePath } from "@/services/pages";

/** §5 Massage des 5 Continents : la section sombre, pour le différenciant. */
export async function FiveContinents() {
  const c = await getContents([
    "home.5c.image",
    "home.5c.eyebrow",
    "home.5c.title",
    "home.5c.text",
    "home.5c.licence",
  ] as const);

  return (
    <section id="5-continents" className="bg-paper px-3 py-3 md:px-4 md:py-4">
      <div className="rounded-card bg-night py-12 text-white md:py-24">
        <div className="container-site grid items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16 lg:gap-24">
          <div className="order-2 flex flex-col items-start gap-6 md:order-1 md:gap-7">
            <Reveal>
              <Eyebrow tone="dark" edit={c.edit("home.5c.eyebrow")}>
                {c["home.5c.eyebrow"]}
              </Eyebrow>
            </Reveal>
            <SplitWords
              text={c["home.5c.title"]}
              edit={c.edit("home.5c.title")}
              className="text-h2 text-balance"
            />
            <Reveal delay={0.15}>
              <p
                {...c.edit("home.5c.text")}
                className="text-lead text-pretty text-white/75"
              >
                {c["home.5c.text"]}
              </p>
            </Reveal>
            <Reveal
              delay={0.25}
              className="flex items-center gap-4 rounded-full bg-white/8 py-2 pr-6 pl-2"
            >
              <Image
                src="/images/badges/licence-m5c.png"
                alt="Badge Praticien M5C officiel, Fédération du massage des 5 continents"
                width={56}
                height={56}
                className="size-14"
              />
              <p
                {...c.edit("home.5c.licence")}
                className="text-sm text-white/80"
              >
                {c["home.5c.licence"]}
              </p>
            </Reveal>
            <Reveal
              delay={0.35}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2"
            >
              <ButtonLink href={servicePath("5-continents")} variant="light">
                Découvrir ce massage
              </ButtonLink>
              <TextLink
                href={bookingAnchor("5-continents")}
                className="text-white"
              >
                Réserver ce massage
              </TextLink>
            </Reveal>
          </div>

          <RevealImage
            src={c["home.5c.image"].src}
            alt={c["home.5c.image"].alt}
            edit={c.edit("home.5c.image")}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="order-1 aspect-[4/3] rounded-panel md:order-2 md:aspect-[4/5]"
            parallax={10}
          />
        </div>
      </div>
    </section>
  );
}
