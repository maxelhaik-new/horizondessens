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
      <RevealGroup className="container-site grid gap-4 md:grid-cols-2 md:gap-6">
        <RevealItem className="flex flex-col justify-between gap-10 rounded-card bg-accent-200 p-8 md:p-12">
          <div className="flex flex-col gap-4">
            <p className="text-eyebrow text-accent-800">Abonnement</p>
            <h2 className="text-h3 text-balance">{c["home.abo.title"]}</h2>
            <p className="max-w-sm text-body text-pretty text-ink-soft">
              {c["home.abo.text"]}
            </p>
          </div>
          <div>
            <ButtonLink href={routes.contact}>Me renseigner</ButtonLink>
          </div>
        </RevealItem>

        <RevealItem className="flex flex-col overflow-hidden rounded-card bg-paper-soft">
          <RevealImage
            src={c["home.cadeau.image"].src}
            alt={c["home.cadeau.image"].alt}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3] rounded-none"
            parallax={4}
          />
          <div className="flex flex-col gap-4 p-8 md:p-12">
            <p className="text-eyebrow text-accent-800">Carte cadeau</p>
            <h2 className="text-h3 text-balance">{c["home.cadeau.title"]}</h2>
            <p className="max-w-sm text-body text-pretty text-ink-soft">
              {c["home.cadeau.text"]}
            </p>
            <div className="pt-4">
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
