import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

import { LogoSymbol } from "@/components/brand/logo-symbol";
import { LogoWordmark } from "@/components/trials/trials";

export { LogoSymbol, LogoWordmark };

/**
 * Logo complet (symbole + nom en capitales) cliquable vers l'accueil. Le
 * symbole est dessiné par `LogoWordmark` (taille en em, calée sur les
 * capitales et la ligne de base) : il suit la réduction `fit` du nom.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, accueil`}
      className={cn("inline-flex min-h-11 min-w-0 items-center", className)}
    >
      <LogoWordmark
        fit
        symbol
        className="text-[1.5rem] md:text-[1.75rem] xl:text-[2rem]"
      />
    </Link>
  );
}
