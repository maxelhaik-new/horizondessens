import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SparkIcon } from "@/components/ui/icons";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/** §4 Focus Kobido : porte d'entrée du public qui connaît déjà le soin. */
export async function KobidoFocus() {
  const c = await getContents([
    "home.kobido.image",
    "home.kobido.eyebrow",
    "home.kobido.title",
    "home.kobido.text",
    "home.kobido.benefits",
  ] as const);

  return (
    <section className="bg-paper section-y">
      <div className="container-site grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <RevealImage
          src={c["home.kobido.image"].src}
          alt={c["home.kobido.image"].alt}
          edit={c.edit("home.kobido.image")}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[4/5] rounded-card"
        />

        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <Eyebrow edit={c.edit("home.kobido.eyebrow")}>
              {c["home.kobido.eyebrow"]}
            </Eyebrow>
          </Reveal>
          <SplitWords
            text={c["home.kobido.title"]}
            edit={c.edit("home.kobido.title")}
            className="text-h2 text-balance"
          />
          <Reveal delay={0.15}>
            <p
              {...c.edit("home.kobido.text")}
              className="text-lead text-pretty text-ink-soft"
            >
              {c["home.kobido.text"]}
            </p>
          </Reveal>

          <RevealGroup
            as="ul"
            className="flex w-full flex-col border-t border-line"
          >
            {c["home.kobido.benefits"].map((benefit, i) => (
              <RevealItem
                as="li"
                key={i}
                className="flex items-center gap-4 border-b border-line py-5"
              >
                <SparkIcon className="size-3 shrink-0 text-accent-600" />
                <span
                  {...c.edit("home.kobido.benefits", i)}
                  className="font-serif text-xl tracking-[-0.01em] italic md:text-2xl"
                >
                  {benefit}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
            <ButtonLink href={routes.kobido}>Découvrir le Kobido</ButtonLink>
            <TextLink href={routes.reserver}>Réserver un Kobido</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
