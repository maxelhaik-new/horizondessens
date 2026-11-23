import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { ButtonLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/** §9 Abonnement (« revenir ») et carte cadeau (« offrir »), côte à côte. */
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
      <RevealGroup className="container-site grid gap-4 md:grid-cols-[1fr_1.2fr] md:gap-6">
        <RevealItem className="flex flex-col justify-between gap-16 rounded-card bg-blush p-8 md:p-12">
          <h2 {...c.edit("home.abo.title")} className="text-h3 text-balance">
            {c["home.abo.title"]}
          </h2>
          <div className="flex flex-col items-start gap-8">
            <p
              {...c.edit("home.abo.text")}
              className="max-w-sm text-lead text-pretty text-ink-soft"
            >
              {c["home.abo.text"]}
            </p>
            <ButtonLink href={routes.contact}>Poser une question</ButtonLink>
          </div>
        </RevealItem>

        <RevealItem className="flex flex-col gap-3 rounded-card bg-paper-soft p-3 md:p-4">
          <RevealImage
            src={c["home.cadeau.image"].src}
            alt={c["home.cadeau.image"].alt}
            edit={c.edit("home.cadeau.image")}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="aspect-[4/3] rounded-panel"
            parallax={4}
          />
          <div className="flex flex-col gap-5 px-5 pt-4 pb-6 md:px-8 md:pb-8">
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
            <div className="pt-2">
              <ButtonLink href={routes.carteCadeau}>
                Offrir une carte cadeau
              </ButtonLink>
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
