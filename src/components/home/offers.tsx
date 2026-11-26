import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { ButtonLink } from "@/components/ui/button-link";
import { Rail } from "@/components/ui/rail";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/**
 * §9 Abonnement (« revenir ») et carte cadeau (« offrir »), côte à côte ;
 * en rail horizontal sur mobile.
 */
export async function Offers() {
  const c = await getContents([
    "home.abo.title",
    "home.abo.text",
    "home.cadeau.image",
    "home.cadeau.title",
    "home.cadeau.text",
  ] as const);

  return (
    <section id="abonnement" className="bg-paper section-y">
      <div className="container-site">
        <Rail
          label="Revenir ou offrir"
          className="md:grid md:grid-cols-[1fr_1.2fr] md:gap-6"
        >
          <Reveal
            as="li"
            className="flex flex-col justify-start gap-6 rounded-card bg-blush p-7 md:justify-between md:gap-16 md:p-12"
          >
            <h2 {...c.edit("home.abo.title")} className="text-h3 text-balance">
              {c["home.abo.title"]}
            </h2>
            <div className="flex flex-col items-start gap-6 md:gap-8">
              <p
                {...c.edit("home.abo.text")}
                className="max-w-sm text-lead text-pretty text-ink-soft"
              >
                {c["home.abo.text"]}
              </p>
              <ButtonLink href={`${routes.contact}#ecrire`}>
                Poser une question
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            as="li"
            delay={0.08}
            className="flex flex-col gap-3 rounded-card bg-paper-soft p-3 md:p-4"
          >
            <RevealImage
              src={c["home.cadeau.image"].src}
              alt={c["home.cadeau.image"].alt}
              edit={c.edit("home.cadeau.image")}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="aspect-[3/2] rounded-panel md:aspect-[4/3]"
              parallax={4}
            />
            <div className="flex flex-col gap-4 px-4 pt-3 pb-5 md:gap-5 md:px-8 md:pt-4 md:pb-8">
              <h2
                {...c.edit("home.cadeau.title")}
                className="text-h3 text-balance"
              >
                {c["home.cadeau.title"]}
              </h2>
              <p
                {...c.edit("home.cadeau.text")}
                className="max-w-md text-lead text-pretty text-ink-soft"
              >
                {c["home.cadeau.text"]}
              </p>
              <div className="pt-1 md:pt-2">
                <ButtonLink href={routes.carteCadeau}>
                  Offrir une carte cadeau
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Rail>
      </div>
    </section>
  );
}
