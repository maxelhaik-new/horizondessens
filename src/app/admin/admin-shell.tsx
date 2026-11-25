import Link from "next/link";
import type { ReactNode } from "react";

import { LogoSymbol } from "@/components/brand/logo";
import { buttonClass } from "@/components/ui/button-link";

/**
 * Cadre des pages de l'espace d'édition (connexion, mot de passe) :
 * plein écran, recouvre l'en-tête et le pied de page du site.
 */
export function AdminShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-paper">
      <div className="flex min-h-full items-center justify-center px-5 py-16">
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <LogoSymbol className="size-12 text-accent-700" />
            <h1 className="text-h3">{title}</h1>
            <p className="text-body text-ink-soft">{intro}</p>
          </div>
          <div className="w-full rounded-card bg-paper-soft p-7 shadow-soft">
            {children}
          </div>
          <Link
            href="/"
            className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
          >
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}

export const adminInput =
  "h-12 w-full rounded-2xl border border-line bg-white px-4 text-body text-ink outline-none transition-colors focus:border-accent-500";

export const adminButton = buttonClass({
  variant: "primary",
  size: "sm",
  plain: true,
});

export function AdminAlert({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-2xl bg-accent-100 px-4 py-3 text-sm text-accent-900"
    >
      {children}
    </p>
  );
}
