import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ArrowRightIcon } from "./icons";

type Variant = "dark" | "light" | "glass";

const styles: Record<Variant, { button: string; circle: string }> = {
  dark: {
    button: "bg-night text-white hover:bg-accent-950",
    circle: "bg-white text-night",
  },
  light: {
    button: "bg-white text-night hover:bg-paper-soft",
    circle: "bg-night text-white",
  },
  glass: {
    button: "bg-white/65 text-night backdrop-blur-md hover:bg-white/85",
    circle: "bg-night text-white",
  },
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** Bouton pilule avec pastille flèche (style Serelin). Liens externes détectés. */
export function ButtonLink({
  href,
  children,
  variant = "dark",
  className,
}: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  const { button, circle } = styles[variant];
  const classes = cn(
    "group inline-flex items-center gap-4 rounded-full py-2 pr-2 pl-6 text-sm font-medium tracking-[0.016em] transition-colors duration-300 md:text-base",
    button,
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-full transition-transform duration-500 ease-soft group-hover:translate-x-0.5",
          circle,
        )}
      >
        <ArrowRightIcon className="size-4" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
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
  return /^https?:\/\//.test(href) ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
