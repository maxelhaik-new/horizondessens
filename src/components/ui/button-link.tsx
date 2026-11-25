import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ChevronRightIcon } from "./icons";

/**
 * Modèle de bouton global : la géométrie, les couleurs et le geste « remix »
 * sont déclarés dans `src/app/globals.css` (classes `btn*`). Ici, on ne
 * choisit que la variante et la taille.
 *
 * - `soft` (défaut) : pilule claire, pour la plupart des appels ;
 * - `primary` : pilule sombre, rare (actions qui engagent, un appel par page) ;
 * - `light` : pilule blanche, sur fond sombre ou photo.
 */
export type ButtonVariant = "soft" | "primary" | "light";
export type ButtonSize = "sm" | "md";

const variantClass: Record<ButtonVariant, string> = {
  soft: "btn-soft",
  primary: "btn-primary",
  light: "btn-light",
};

/** Classes du modèle, pour un `<button>` ou un lien sans pastille. */
export function buttonClass({
  variant = "soft",
  size = "md",
  plain = false,
}: { variant?: ButtonVariant; size?: ButtonSize; plain?: boolean } = {}) {
  return cn(
    "btn",
    variantClass[variant],
    size === "sm" && "btn-sm",
    plain && "btn-plain",
  );
}

function RemixContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="btn-label">{children}</span>
      <span aria-hidden className="btn-dot">
        <ChevronRightIcon className="size-4" />
      </span>
    </>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  /** Lien de téléchargement (fichier servi par une route) : `<a download>`. */
  download?: boolean;
};

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

/** Bouton-lien « remix » (pilule et pastille chevron). */
export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  onClick,
  download,
}: ButtonLinkProps) {
  const classes = cn(buttonClass({ variant, size }), className);
  const content = <RemixContent>{children}</RemixContent>;

  return isExternal(href) || download ? (
    <a href={href} className={classes} onClick={onClick} download={download}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}

/** Même bouton « remix », en `<button>` (formulaire ou action). */
export function RemixButton({
  children,
  variant,
  size,
  className,
  type = "submit",
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      className={cn(buttonClass({ variant, size }), className)}
    >
      <RemixContent>{children}</RemixContent>
    </button>
  );
}

/** Lien texte secondaire souligné. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "-my-3 inline-flex items-center gap-2 py-3 text-sm font-medium underline decoration-current/30 underline-offset-[6px] transition-colors hover:decoration-current md:text-base",
    className,
  );
  return isExternal(href) ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
