import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { TextLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";
import { routes } from "@/lib/navigation";

/** §6 Le salon et les 3 temps d'une séance (cartes « usp » de Serelin). */
export async function Salon() {
  const c = await getContents([
    "home.salon.image",
    "home.salon.eyebrow",
    "home.salon.title",
    "home.salon.text",
    "home.salon.steps",
  ] as const);

  return (
    <section className="bg-paper section-y">
      <div className="container-site flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow={c["home.salon.eyebrow"]}
          title={c["home.salon.title"]}
          intro={c["home.salon.text"]}
        />

        <RevealImage
          src={c["home.salon.image"].src}
          alt={c["home.salon.image"].alt}
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="aspect-[4/3] rounded-media md:aspect-[21/9]"
        />

        <RevealGroup as="ol" className="grid gap-4 md:grid-cols-3 md:gap-6">
          {c["home.salon.steps"].map((step, i) => (
            <RevealItem
              as="li"
              key={step.title}
              className="flex flex-col gap-3 rounded-card bg-paper-soft p-6 md:p-8"
            >
              <span className="font-serif text-lg text-accent-600 italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h4">{step.title}</h3>
              <p className="text-body text-pretty text-ink-soft">{step.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="flex justify-center">
          <TextLink href={routes.salon}>Découvrir le salon</TextLink>
        </div>
      </div>
    </section>
  );
}
