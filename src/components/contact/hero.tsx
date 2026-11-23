import Image from "next/image";
import Link from "next/link";

import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/**
 * Hero Contact : image cadrée dans une grande carte arrondie (et non plein
 * cadre comme l'accueil), titre en bas à gauche. Animations CSS, sans JS.
 */
export async function ContactHero() {
  const c = await getContents([
    "contact.hero.eyebrow",
    "contact.hero.title",
    "contact.hero.lead",
    "contact.hero.image",
  ] as const);

  return (
    <section className="px-2 pt-2 md:px-3 md:pt-3">
      <div className="relative isolate flex min-h-[78svh] items-end overflow-hidden rounded-card bg-night text-white md:min-h-[82svh]">
        <Image
          {...c.edit("contact.hero.image")}
          src={c["contact.hero.image"].src}
          alt={c["contact.hero.image"].alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="-z-10 animate-hero-zoom object-cover object-[50%_45%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-night/85 via-night/30 to-night/20"
        />

        <div className="container-site flex flex-col items-start gap-6 pt-36 pb-10 md:pb-16">
          <nav
            aria-label="Fil d'Ariane"
            className="animate-rise text-sm text-white/70"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href={routes.home}
                  className="transition-colors hover:text-white"
                >
                  Accueil
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white">
                Contact
              </li>
            </ol>
          </nav>
          <div className="animate-rise [animation-delay:100ms]">
            <Eyebrow tone="glass" edit={c.edit("contact.hero.eyebrow")}>
              {c["contact.hero.eyebrow"]}
            </Eyebrow>
          </div>
          <div className="grid w-full items-end gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <SplitWords
              as="h1"
              text={c["contact.hero.title"]}
              edit={c.edit("contact.hero.title")}
              className="max-w-3xl text-display text-balance"
              immediate
              delay={150}
            />
            <div className="flex animate-rise flex-col items-start gap-6 [animation-delay:500ms]">
              <p
                {...c.edit("contact.hero.lead")}
                className="max-w-md text-lead text-pretty text-white/80"
              >
                {c["contact.hero.lead"]}
              </p>
              <ButtonLink href="#ecrire" variant="light">
                Écrire un message
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
