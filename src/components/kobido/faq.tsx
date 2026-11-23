import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { TextLink } from "@/components/ui/button-link";
import { PlusIcon } from "@/components/ui/icons";
import { getContents } from "@/content/get-content";
import { site } from "@/lib/site";

/** FAQ Kobido : titre collant à gauche, questions en lignes à droite (natif, sans JS). */
export async function KobidoFaq() {
  const c = await getContents([
    "kobido.faq.title",
    "kobido.faq.intro",
    "kobido.faq.items",
  ] as const);
  const items = c["kobido.faq.items"];

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
    <section className="bg-paper section-y">
      <div className="container-site grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-24">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-32 lg:self-start">
          <SplitWords
            text={c["kobido.faq.title"]}
            edit={c.edit("kobido.faq.title")}
            className="text-h2 text-balance"
          />
          <Reveal delay={0.1} className="flex flex-col items-start gap-4">
            <p
              {...c.edit("kobido.faq.intro")}
              className="max-w-sm text-lead text-pretty text-ink-soft"
            >
              {c["kobido.faq.intro"]}
            </p>
            <TextLink href={site.phone.href}>{site.phone.display}</TextLink>
          </Reveal>
        </div>

        <RevealGroup className="border-t border-line">
          {items.map(({ question, answer }, i) => (
            <RevealItem key={i}>
              <details name="faq-kobido" className="group border-b border-line">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-7 text-left">
                  <span
                    {...c.edit("kobido.faq.items", i, "question")}
                    className="font-serif text-2xl tracking-[-0.01em] italic md:text-[1.75rem]"
                  >
                    {question}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-500 ease-soft group-open:rotate-45 group-open:bg-night group-open:text-white">
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p
                  {...c.edit("kobido.faq.items", i, "answer")}
                  className="max-w-2xl pb-8 text-body text-pretty whitespace-pre-line text-ink-soft"
                >
                  {answer}
                </p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
