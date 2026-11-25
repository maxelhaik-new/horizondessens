import { Logo } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

/**
 * §10 Appel final (Serelin « cta ») : grande carte claire posée sur le fond
 * rosé du bas de page — logo et titre à gauche, texte et CTA à droite.
 * Le footer enchaîne sur le même fond.
 */
export async function FinalCta() {
  const c = await getContents(["home.final.title", "home.final.text"] as const);

  return (
    <section className="bg-[linear-gradient(180deg,var(--color-paper),var(--color-mist))] pt-10 md:pt-16">
      <div className="container-site">
        <Reveal className="grid gap-10 rounded-card border border-white bg-[linear-gradient(160deg,white,var(--color-paper-soft)_45%,var(--color-accent-100))] p-8 shadow-soft md:grid-cols-[1.3fr_1fr] md:gap-16 md:p-14">
          <div className="flex flex-col gap-10">
            <Logo className="text-accent-800" />
            <SplitWords
              text={c["home.final.title"]}
              edit={c.edit("home.final.title")}
              className="text-h2 text-balance"
            />
          </div>
          <div className="flex flex-col justify-between gap-10">
            <p
              {...c.edit("home.final.text")}
              className="text-lead text-pretty text-ink-soft"
            >
              {c["home.final.text"]}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <ButtonLink href={routes.reserver} variant="primary">
                Choisir un soin
              </ButtonLink>
              <TextLink href={site.phone.href}>{site.phone.display}</TextLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
