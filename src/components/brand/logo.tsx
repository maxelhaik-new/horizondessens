import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Symbole du logo, coloré par `currentColor` (masque CSS sur le PNG détouré).
 * Provisoire : à remplacer par le SVG définitif fourni par Maxime.
 */
export function LogoSymbol({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block aspect-square bg-current [mask-image:url(/images/logo/symbole.png)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]",
        className,
      )}
    />
  );
}

/** Logo complet (symbole + nom) cliquable vers l'accueil. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, accueil`}
      className={cn("inline-flex min-h-11 items-center gap-2.5", className)}
    >
      <LogoSymbol className="size-8" />
      <span className="font-serif text-2xl leading-none tracking-[-0.02em]">
        {site.name}
      </span>
    </Link>
  );
}
