import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { JsonLd } from "@/components/seo/json-ld";
import { TextLink } from "@/components/ui/button-link";
import { PlusIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import type { ServicePageSlug } from "@/services/pages";

import { getServicePageContents } from "./content";

/** FAQ : titre collant à gauche, questions en lignes à droite (natif, sans JS). */
export async function ServiceFaq({ slug }: { slug: ServicePageSlug }) {
  const c = await getServicePageContents(slug, [
    "faq.title",
    "faq.intro",
    "faq.items",
  ] as const);
  const items = c["faq.items"];
  if (items.length === 0) return null;

  return (
    <section className="bg-paper section-y">
      <div className="container-site grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-24">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-32 lg:self-start">
          <SplitWords
            text={c["faq.title"]}
            edit={c.edit("faq.title")}
            className="text-h2 text-balance"
          />
          <Reveal delay={0.1} className="flex flex-col items-start gap-4">
            <p
              {...c.edit("faq.intro")}
              className="max-w-sm text-lead text-pretty text-ink-soft"
            >
              {c["faq.intro"]}
            </p>
            <TextLink href={site.phone.href}>{site.phone.display}</TextLink>
          </Reveal>
        </div>

        <RevealGroup className="border-t border-line">
          {items.map(({ question, answer }, i) => (
            <RevealItem key={i}>
              <details
                name={`faq-${slug}`}
                className="group border-b border-line"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-7 text-left">
                  <span
                    {...c.edit("faq.items", i, "question")}
                    className="font-serif text-2xl tracking-[-0.01em] italic md:text-[1.75rem]"
                  >
                    {question}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-500 ease-soft group-open:rotate-45 group-open:bg-night group-open:text-white">
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p
                  {...c.edit("faq.items", i, "answer")}
                  className="max-w-2xl pb-8 text-body text-pretty whitespace-pre-line text-ink-soft"
                >
                  {answer}
                </p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
    </section>
  );
}
