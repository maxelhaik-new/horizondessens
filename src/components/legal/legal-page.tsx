import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { legalNav, routes } from "@/lib/navigation";
import { site } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

/**
 * Gabarit des pages légales (contenu fixé dans le code, non éditable) :
 * en-tête clair avec onglets entre les trois pages, sommaire collant à
 * gauche (desktop) et texte en colonne de lecture à droite.
 */
export function LegalPage({
  title,
  intro,
  current,
  sections,
}: {
  title: string;
  intro: ReactNode;
  current: string;
  sections: LegalSection[];
}) {
  return (
    <article className="pt-32 pb-20 md:pt-40 lg:pb-28">
      <header className="container-site flex flex-col gap-8 pb-12 md:pb-16">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ink-subtle">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href={routes.home}
                className="transition-colors hover:text-ink"
              >
                Accueil
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {title}
            </li>
          </ol>
        </nav>

        <nav aria-label="Pages légales">
          <ul className="flex w-fit max-w-full flex-wrap gap-1 rounded-[1.75rem] bg-paper-soft p-1 shadow-soft">
            {legalNav.map((item) => {
              const active = item.href === current;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-10 items-center rounded-full px-3.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors sm:px-5 sm:text-sm",
                      active
                        ? "bg-night text-white"
                        : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex max-w-3xl flex-col gap-5">
          <h1 className="animate-rise text-display text-balance">{title}</h1>
          <div className="animate-rise text-lead text-pretty text-ink-soft [animation-delay:150ms]">
            {intro}
          </div>
          <p className="text-sm text-ink-subtle">
            Dernière mise à jour : {site.legal.updatedAt}
          </p>
        </div>
      </header>

      <div className="container-site grid gap-12 border-t border-line pt-12 lg:grid-cols-[16rem_1fr] lg:gap-24 lg:pt-16">
        <nav
          aria-label="Sommaire"
          className="hidden lg:sticky lg:top-32 lg:block lg:self-start"
        >
          <p className="mb-4 text-eyebrow text-accent-800">Sommaire</p>
          <ol className="flex flex-col gap-1 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex gap-3 py-1.5 text-ink-soft transition-colors hover:text-ink"
                >
                  <span className="w-5 shrink-0 text-ink-subtle tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex max-w-[44rem] flex-col gap-14">
          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="flex scroll-mt-32 flex-col gap-5"
            >
              <h2
                id={`${s.id}-title`}
                className="flex items-baseline gap-4 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] italic md:text-[2rem]"
              >
                <span className="font-sans text-sm font-medium tracking-normal text-accent-800 not-italic tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </h2>
              <div className="legal-prose">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
