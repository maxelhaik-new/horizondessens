import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/** §7 Élodie : portrait et texte à la première personne. */
export async function Practitioner() {
  const c = await getContents([
    "home.elodie.image",
    "home.elodie.title",
    "home.elodie.subtitle",
    "home.elodie.text",
  ] as const);

  return (
    <section className="bg-blush section-y">
      <div className="container-site grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-24">
        <Parallax distance={50}>
          <RevealImage
            src={c["home.elodie.image"].src}
            alt={c["home.elodie.image"].alt}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-media"
            parallax={4}
          />
        </Parallax>

        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <p className="text-eyebrow text-accent-700">
              {c["home.elodie.subtitle"]}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h2">{c["home.elodie.title"]}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif text-2xl leading-snug tracking-[-0.01em] text-pretty md:text-3xl">
              {c["home.elodie.text"]}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <TextLink href={`${routes.salon}#elodie`}>Mon parcours</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
