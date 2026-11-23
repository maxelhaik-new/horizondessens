import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";
import { bookingHref } from "@/lib/simplybook";
import { formatDuration, formatPrice } from "@/services/format";
import { getService } from "@/services/get-services";

/**
 * Formules : comparatif en deux colonnes (durée en très grand), puis la cure.
 * Durées et prix viennent des prestations (SimplyBook), pas du contenu.
 */
export async function KobidoFormulas() {
  const [c, service] = await Promise.all([
    getContents([
      "kobido.formules.eyebrow",
      "kobido.formules.title",
      "kobido.formules.court",
      "kobido.formules.long",
      "kobido.formules.cure",
    ] as const),
    getService("kobido"),
  ]);
  if (!service) return null;
  const descriptions = [
    { text: c["kobido.formules.court"], edit: c.edit("kobido.formules.court") },
    { text: c["kobido.formules.long"], edit: c.edit("kobido.formules.long") },
  ];

  return (
    <section id="formules" className="scroll-mt-24 bg-mist section-y">
      <div className="container-site">
        <SectionHeading
          eyebrow={c["kobido.formules.eyebrow"]}
          title={c["kobido.formules.title"]}
          edit={{
            eyebrow: c.edit("kobido.formules.eyebrow"),
            title: c.edit("kobido.formules.title"),
          }}
        />

        <RevealGroup className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-card bg-paper-soft md:mt-16 md:grid-cols-2">
          {service.variants.map((v, i) => (
            <RevealItem
              key={v.durationMinutes}
              className="flex flex-col gap-6 border-line p-8 not-first:border-t md:p-12 md:not-first:border-t-0 md:not-first:border-l"
            >
              <p className="text-eyebrow text-accent-800">
                {i === 0 ? "Découverte" : "Prolongé"}
              </p>
              <p className="flex items-baseline justify-between gap-6">
                <span className="font-serif text-7xl leading-none tracking-[-0.03em] italic md:text-8xl">
                  {formatDuration(v.durationMinutes)}
                </span>
                <span className="text-2xl font-medium md:text-3xl">
                  {v.priceEuros === null ? "—" : formatPrice(v.priceEuros)}
                </span>
              </p>
              <p
                {...descriptions[i]?.edit}
                className="text-body text-pretty text-ink-soft"
              >
                {descriptions[i]?.text}
              </p>
              <ButtonLink href={bookingHref(v)} className="mt-auto self-start">
                Réserver {formatDuration(v.durationMinutes)}
              </ButtonLink>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-4 flex max-w-5xl flex-col items-start gap-5 rounded-card border border-white/70 px-8 py-8 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-h4 font-serif tracking-[-0.02em] italic">
              En cure
            </p>
            <p
              {...c.edit("kobido.formules.cure")}
              className="text-body text-pretty text-ink-soft"
            >
              {c["kobido.formules.cure"]}
            </p>
          </div>
          <TextLink href={routes.carteCadeau} className="shrink-0">
            Offrir un Kobido
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
