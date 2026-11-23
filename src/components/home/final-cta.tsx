import { LogoSymbol } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

/** §10 Appel final : carte centrée (style Serelin), avant le footer. */
export async function FinalCta() {
  const c = await getContents(["home.final.title", "home.final.text"] as const);

  return (
    <section className="bg-paper pt-6 pb-16 md:pb-24">
      <div className="container-site">
        <Reveal className="flex flex-col items-center gap-6 rounded-card bg-[linear-gradient(180deg,var(--color-paper-soft),var(--color-blush))] px-6 py-16 text-center md:py-24">
          <LogoSymbol className="size-12 text-accent-600" />
          <h2 className="max-w-2xl text-h2 text-balance">
            {c["home.final.title"]}
          </h2>
          <p className="max-w-md text-lead text-pretty text-ink-soft">
            {c["home.final.text"]}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
            <ButtonLink href={routes.reserver}>Réserver un soin</ButtonLink>
            <TextLink href={site.phone.href}>{site.phone.display}</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
