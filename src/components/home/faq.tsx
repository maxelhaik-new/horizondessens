import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PlusIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";

/**
 * FAQ (Serelin « Clarity for your journey ») : titre centré, questions en
 * accordéon natif (<details name> = une seule ouverte), sans JS.
 * Données structurées FAQPage pour le SEO.
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
      <div className="container-site">
        <SectionHeading
          eyebrow={c["home.faq.eyebrow"]}
          title={c["home.faq.title"]}
          edit={{
            eyebrow: c.edit("home.faq.eyebrow"),
            title: c.edit("home.faq.title"),
          }}
        />

        {/*
         * Mobile : trois questions, les suivantes derrière « Voir d'autres
         * questions » (case à cocher + :has, sans JS ; tout reste dans le
         * HTML et dans le JSON-LD).
         */}
        <input
          id="faq-plus"
          type="checkbox"
          className="peer sr-only"
          aria-label="Afficher toutes les questions"
        />
        <RevealGroup className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 md:mt-16 [&>*:nth-child(n+4)]:max-md:hidden peer-checked:[&>*:nth-child(n+4)]:max-md:block peer-checked:[&>*:nth-child(n+4)]:max-md:animate-settle">
          {items.map(({ question, answer }, i) => (
            <RevealItem key={i}>
              <details
                name="faq"
                className="group rounded-panel bg-paper-soft px-5 md:px-8"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left md:py-6">
                  <span
                    {...c.edit("home.faq.items", i, "question")}
                    className="text-base font-medium tracking-[0.008em] md:text-lg"
                  >
                    {question}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-500 ease-soft group-open:rotate-45 group-open:bg-night group-open:text-white">
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p
                  {...c.edit("home.faq.items", i, "answer")}
                  className="max-w-2xl pb-7 text-body text-pretty whitespace-pre-line text-ink-soft"
                >
                  {answer}
                </p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
        {items.length > 3 ? (
          <label
            htmlFor="faq-plus"
            className="mx-auto mt-6 flex min-h-11 w-fit cursor-pointer items-center gap-2 text-sm font-medium text-ink underline decoration-current/30 underline-offset-[6px] peer-checked:hidden peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent-800 md:hidden"
          >
            Voir d&apos;autres questions ({items.length - 3})
          </label>
        ) : null}
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
