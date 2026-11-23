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
 * Géométrie du bouton « remix » (Serelin) : la pastille est positionnée en
 * absolu à droite ; au survol elle glisse à gauche pendant que le texte
 * glisse à droite d'autant (shift = inset + pastille + gap − padding gauche).
 */
const sizes: Record<Size, { button: string; text: string; circle: string }> = {
  sm: {
    button: "h-10 pl-4 pr-12 text-sm",
    text: "group-hover:translate-x-8",
    circle: "right-1 size-8 group-hover:right-[calc(100%-2.25rem)]",
  },
  md: {
    button:
      "h-12 pl-6 pr-[3.625rem] text-sm md:h-14 md:pr-[4.125rem] md:text-base",
    text: "group-hover:translate-x-[34px] md:group-hover:translate-x-[42px]",
    circle:
      "right-1.5 size-9 group-hover:right-[calc(100%-2.625rem)] md:size-11 md:group-hover:right-[calc(100%-3.125rem)]",
  },
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
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
          "absolute top-1/2 grid -translate-y-1/2 place-items-center rounded-full transition-[right] duration-600 ease-spring",
          v.circle,
          s.circle,
        )}
      >
        <ChevronRightIcon className="size-4" />
      </span>
    </>
  );

  return isExternal(href) ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
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
    "inline-flex items-center gap-2 text-sm font-medium underline decoration-current/30 underline-offset-[6px] transition-colors hover:decoration-current md:text-base",
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
