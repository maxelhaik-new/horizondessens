import { RevealImage } from "@/components/motion/reveal-image";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/** Appel final Kobido : carte sombre pleine image, posée sur le fond du footer. */
export async function KobidoFinalCta() {
  const c = await getContents([
    "kobido.final.title",
    "kobido.final.text",
    "kobido.final.image",
  ] as const);

  return (
    <section className="bg-[linear-gradient(180deg,var(--color-paper),var(--color-mist))] pt-6 md:pt-10">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-card bg-night text-white">
          <RevealImage
            src={c["kobido.final.image"].src}
            alt={c["kobido.final.image"].alt}
            edit={c.edit("kobido.final.image")}
            sizes="100vw"
            className="absolute! inset-0 -z-10 opacity-60"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(26_17_15/0.9),rgb(26_17_15/0.35))]"
          />
          <div className="flex min-h-[28rem] flex-col items-start justify-end gap-6 p-8 md:min-h-[32rem] md:p-14">
            <SplitWords
              text={c["kobido.final.title"]}
              edit={c.edit("kobido.final.title")}
              className="max-w-2xl text-h2 text-balance"
            />
            <p
              {...c.edit("kobido.final.text")}
              className="max-w-md text-lead text-pretty text-white/75"
            >
              {c["kobido.final.text"]}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
              <ButtonLink href="#reserver" variant="light">
                Réserver un Kobido
              </ButtonLink>
              <TextLink href={routes.carteCadeau} className="text-white">
                Offrir une carte cadeau
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
