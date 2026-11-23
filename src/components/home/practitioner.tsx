import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
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
    <section id="elodie" className="bg-paper px-3 md:px-4">
      <div className="rounded-card bg-blush py-16 md:py-24">
        <div className="container-site grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-24">
          <RevealImage
            src={c["home.elodie.image"].src}
            alt={c["home.elodie.image"].alt}
            edit={c.edit("home.elodie.image")}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-card"
            parallax={4}
          />

          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <SplitWords
                text={c["home.elodie.title"]}
                edit={c.edit("home.elodie.title")}
                className="text-h2"
              />
              <Reveal delay={0.1}>
                <p
                  {...c.edit("home.elodie.subtitle")}
                  className="text-lead text-accent-800"
                >
                  {c["home.elodie.subtitle"]}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p
                {...c.edit("home.elodie.text")}
                className="max-w-xl text-lead text-pretty text-ink-soft"
              >
                {c["home.elodie.text"]}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <TextLink href={`${routes.salon}#elodie`}>Mon parcours</TextLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
