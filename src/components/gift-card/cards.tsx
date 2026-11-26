import Link from "next/link";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { RemixButton } from "@/components/ui/button-link";
import { LogoWordmark } from "@/components/brand/logo";
import { getContents } from "@/content/get-content";
import { getGiftCards } from "@/lib/gift-cards";
import { routes } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice } from "@/services/format";

/**
 * Les cartes à offrir, dessinées comme de vraies cartes cadeaux (logo,
 * durée en grand, prix). Chaque bouton envoie vers le paiement
 * (`/carte-cadeau/commander` → Stripe Checkout, voir `src/lib/gift-card/`).
 */
export async function GiftCardCards() {
  const [c, cards] = await Promise.all([
    getContents([
      "cadeau.formules.title",
      "cadeau.formules.intro",
      "cadeau.formules.note",
    ] as const),
    getGiftCards(),
  ]);

  return (
    <section id="formules" className="scroll-mt-24 bg-mist section-y">
      <div className="container-site flex flex-col gap-10 md:gap-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <SplitWords
            text={c["cadeau.formules.title"]}
            edit={c.edit("cadeau.formules.title")}
            className="text-h2 text-balance"
          />
          <p
            {...c.edit("cadeau.formules.intro")}
            className="text-lead text-pretty text-ink-soft"
          >
            {c["cadeau.formules.intro"]}
          </p>
        </div>

        <RevealGroup className="mx-auto grid w-full max-w-4xl gap-4 md:grid-cols-2 md:gap-6">
          {cards.map((card, i) => {
            const dark = i === cards.length - 1;
            return (
              <RevealItem key={card.id}>
                <form
                  action={routes.carteCadeauCommander}
                  method="post"
                  className={cn(
                    "flex h-full flex-col gap-7 rounded-card p-6 shadow-soft sm:p-8 md:gap-10 md:p-10",
                    dark
                      ? "bg-gift bg-[radial-gradient(120%_90%_at_50%_42%,var(--color-gift),var(--color-gift-edge))] text-white"
                      : "bg-paper-soft text-ink",
                  )}
                >
                  <input type="hidden" name="carte" value={card.id} />
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className={cn(
                        "flex items-center gap-2 text-lg whitespace-nowrap md:gap-2.5 md:text-xl",
                        dark ? "text-white" : "text-accent-800",
                      )}
                    >
                      <LogoWordmark symbol />
                    </span>
                    <span
                      className={cn(
                        "hidden rounded-full px-3.5 py-2 text-xs font-medium whitespace-nowrap sm:inline-block",
                        dark
                          ? "bg-white/10 text-white/85"
                          : "bg-white text-accent-800",
                      )}
                    >
                      Carte cadeau
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p
                      className={cn(
                        "text-eyebrow",
                        dark ? "text-white/65" : "text-accent-800",
                      )}
                    >
                      {card.name}
                    </p>
                    <p className="font-serif text-6xl leading-none tracking-[-0.03em] italic md:text-8xl">
                      {formatDuration(card.durationMinutes)}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-sm text-pretty",
                        dark ? "text-white/75" : "text-ink-soft",
                      )}
                    >
                      {card.soins.length === 1
                        ? `Pour un ${card.soins[0]}`
                        : `Pour le soin de son choix : ${card.soins.join(", ")}`}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "mt-auto flex flex-wrap items-center justify-between gap-6 border-t pt-6",
                      dark ? "border-white/15" : "border-line",
                    )}
                  >
                    <p className="font-serif text-4xl italic">
                      {formatPrice(card.priceEuros)}
                    </p>
                    <RemixButton variant={dark ? "light" : "primary"}>
                      Offrir cette carte
                    </RemixButton>
                  </div>
                </form>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="mx-auto max-w-xl text-center text-body text-pretty text-ink-soft">
          <span {...c.edit("cadeau.formules.note")}>
            {c["cadeau.formules.note"]}
          </span>{" "}
          <Link
            href={`${routes.contact}#ecrire`}
            className="font-medium text-ink underline decoration-current/30 underline-offset-4 hover:decoration-current"
          >
            Me contacter
          </Link>
        </p>
      </div>
    </section>
  );
}
