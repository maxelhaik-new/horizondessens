import type { Metadata } from "next";

import { LogoSymbol } from "@/components/brand/logo";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { routes } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

/** 404 : fond sombre (l'en-tête est transparent hors des pages claires). */
export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center bg-night pt-32 pb-20 text-white">
      <div className="container-site flex flex-col items-start gap-8">
        <LogoSymbol className="size-14 text-accent-300" />
        <p className="text-eyebrow text-white/70">Erreur 404</p>
        <h1 className="max-w-3xl text-display text-balance">
          Cette page s&apos;est égarée en chemin
        </h1>
        <p className="max-w-xl text-lead text-pretty text-white/75">
          Elle a peut-être changé d&apos;adresse avec le nouveau site. Les
          soins, le Kobido, le 5 Continents et la réservation sont à portée de
          main.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href={routes.home} variant="light">
            Retour à l&apos;accueil
          </ButtonLink>
          <TextLink href={routes.kobido}>Le Kobido</TextLink>
          <TextLink href={routes.cinqContinents}>Le 5 Continents</TextLink>
          <TextLink href={routes.reserver}>Réserver un soin</TextLink>
        </div>
      </div>
    </section>
  );
}
