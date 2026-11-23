import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PlusIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";

/**
 * §9 bis FAQ : accordéon natif (<details name> = une seule question ouverte),
 * accessible sans JavaScript. Données structurées FAQPage pour le SEO.
 */
export async function Faq() {
  const c = await getContents([
    "home.faq.eyebrow",
    "home.faq.title",
    "home.faq.items",
  ] as const);
  const items = c["home.faq.items"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <section className="bg-sand/20 section-y">
      <div className="container-site grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <SectionHeading
          eyebrow={c["home.faq.eyebrow"]}
          title={c["home.faq.title"]}
          align="left"
          className="md:sticky md:top-28 md:self-start"
        />

        <RevealGroup className="flex flex-col gap-3">
          {items.map(({ question, answer }) => (
            <RevealItem key={question}>
              <details
                name="faq"
                className="group rounded-card bg-paper-soft px-6 md:px-8"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left">
                  <span className="text-body font-medium md:text-lg">
                    {question}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper transition-transform duration-500 ease-soft group-open:rotate-45">
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p className="pb-6 text-body text-pretty whitespace-pre-line text-ink-soft">
                  {answer}
                </p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <script
        type="application/ld+json"
        // Données sérialisées côté serveur à partir du registre de contenu.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
