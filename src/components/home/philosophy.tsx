import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { cn } from "@/lib/cn";

/** Médaillons flottants (décor, non éditables) — position, taille, vitesse. */
const ORBS = [
  {
    src: "/images/ambiance/gua-sha.jpg",
    className: "left-[6%] top-[8%] size-20 md:size-28",
    distance: 120,
  },
  {
    src: "/images/ambiance/flacon-ombre.jpg",
    className: "right-[8%] top-[4%] size-16 md:size-24",
    distance: 70,
  },
  {
    src: "/images/ambiance/mains-epaules.jpg",
    className: "left-[14%] bottom-[10%] size-16 md:size-24",
    distance: 90,
  },
  {
    src: "/images/ambiance/massage-dos.jpg",
    className: "right-[4%] top-[48%] size-24 md:size-32",
    distance: 150,
  },
  {
    src: "/images/ambiance/massage-dos-2.jpg",
    className: "right-[22%] bottom-[4%] size-16 md:size-20",
    distance: 60,
  },
] as const;

/**
 * Déclaration d'Élodie en très grand italique, entourée de médaillons
 * photo qui flottent en parallaxe (section « philosophy » de Serelin).
 */
export async function Philosophy() {
  const c = await getContents([
    "home.philo.eyebrow",
    "home.philo.text",
  ] as const);

  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        {ORBS.map((orb) => (
          <Parallax
            key={orb.src}
            distance={orb.distance}
            className={cn("absolute", orb.className)}
          >
            <div className="relative size-full overflow-hidden rounded-full shadow-soft">
              <Image
                src={orb.src}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </Parallax>
        ))}
      </div>

      <div className="relative container-site flex flex-col items-center gap-8 text-center">
        <Reveal>
          <Eyebrow>{c["home.philo.eyebrow"]}</Eyebrow>
        </Reveal>
        <SplitWords
          as="p"
          text={c["home.philo.text"]}
          className="max-w-4xl text-h2 text-balance text-ink"
        />
        <Reveal delay={0.2}>
          <ButtonLink href={`${routes.salon}#elodie`}>
            Découvrir Élodie
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
