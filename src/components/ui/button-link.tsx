import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ChevronRightIcon } from "./icons";

type Variant = "dark" | "light";
type Size = "sm" | "md";

const variants: Record<Variant, { button: string; circle: string }> = {
  dark: {
    button: "bg-night text-white hover:bg-accent-950",
    circle: "bg-white text-night",
  },
  light: {
    button: "bg-white text-night hover:bg-paper-soft",
    circle: "bg-night text-white",
  },
};

/**
 * Géométrie du bouton « remix » : la pastille est à gauche au repos ; au
 * survol elle glisse à droite (sens de la flèche) pendant que le texte
 * glisse à gauche d'autant (shift = inset + pastille + gap − padding gauche).
 */
const sizes: Record<Size, { button: string; text: string; circle: string }> = {
  sm: {
    button: "h-11 pl-[3.25rem] pr-4 text-sm",
    text: "group-hover:-translate-x-9",
    circle: "left-1.5 size-8 group-hover:left-[calc(100%-2.375rem)]",
  },
  md: {
    button:
      "h-12 pl-[3.625rem] pr-6 text-sm md:h-14 md:pl-[4.125rem] md:text-base",
    text: "group-hover:-translate-x-[34px] md:group-hover:-translate-x-[42px]",
    circle:
      "left-1.5 size-9 group-hover:left-[calc(100%-2.625rem)] md:size-11 md:group-hover:left-[calc(100%-3.125rem)]",
  },
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  /** Lien de téléchargement (fichier servi par une route) : `<a download>`. */
  download?: boolean;
};

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

/** Bouton pilule avec pastille chevron et ombre en couches (style Serelin). */
export function ButtonLink({
  href,
  children,
  variant = "dark",
  size = "md",
  className,
  onClick,
  download,
}: ButtonLinkProps) {
  const v = variants[variant];
  const s = sizes[size];
  const classes = cn(
    "group relative inline-flex shrink-0 items-center overflow-hidden rounded-full font-medium tracking-[0.016em] shadow-lift transition-colors duration-300",
    v.button,
    s.button,
    className,
  );
  const content = (
    <>
      <span
        className={cn("transition-transform duration-600 ease-spring", s.text)}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 grid -translate-y-1/2 place-items-center rounded-full transition-[left] duration-600 ease-spring",
          v.circle,
          s.circle,
        )}
      >
        <ChevronRightIcon className="size-4" />
      </span>
    </>
  );

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
  variant = "dark",
  size = "md",
  className,
  type = "submit",
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "submit" | "button";
}) {
  const v = variants[variant];
  const s = sizes[size];
  return (
    <button
      type={type}
      className={cn(
        "group relative inline-flex shrink-0 cursor-pointer items-center overflow-hidden rounded-full font-medium tracking-[0.016em] shadow-lift transition-colors duration-300",
        v.button,
        s.button,
        className,
      )}
    >
      <span
        className={cn("transition-transform duration-600 ease-spring", s.text)}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 grid -translate-y-1/2 place-items-center rounded-full transition-[left] duration-600 ease-spring",
          v.circle,
          s.circle,
        )}
      >
        <ChevronRightIcon className="size-4" />
      </span>
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
