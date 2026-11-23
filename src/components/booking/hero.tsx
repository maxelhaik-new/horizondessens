import { SplitWords } from "@/components/motion/split-words";
import { getContents } from "@/content/get-content";
import { site } from "@/lib/site";

const STEPS = ["Le soin", "Le créneau", "La confirmation par e-mail"];

/** Hero Réserver : sobre et direct (on vient pour agir), étapes en ligne. */
export async function BookingHero() {
  const c = await getContents([
    "reserver.hero.title",
    "reserver.hero.lead",
  ] as const);

  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="container-site grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
        <SplitWords
          as="h1"
          text={c["reserver.hero.title"]}
          edit={c.edit("reserver.hero.title")}
          className="text-display text-balance"
          immediate
        />
        <div className="flex animate-rise flex-col gap-6 [animation-delay:400ms]">
          <p
            {...c.edit("reserver.hero.lead")}
            className="text-lead text-pretty text-ink-soft"
          >
            {c["reserver.hero.lead"]}
          </p>
          <ol className="flex flex-wrap gap-2">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2 rounded-full bg-paper-soft py-1.5 pr-3.5 pl-1.5 text-sm text-ink"
              >
                <span className="grid size-6 place-items-center rounded-full bg-night text-xs text-white tabular-nums">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="text-sm text-ink-subtle">
            Une question avant de réserver ?{" "}
            <a
              href={site.phone.href}
              className="font-medium whitespace-nowrap text-ink underline decoration-current/30 underline-offset-4 hover:decoration-current"
            >
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
