import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

/**
 * Symbole du logo (soleil sur l'horizon, SVG vectoriel), coloré par
 * `currentColor` (masque CSS). Cadre serré sur le dessin : 1866 × 1540.
 * Repères verticaux : haut des rayons = 0, bas de la ligne d'horizon = 1044,
 * bas du reflet = 1540. Sources : `assets/logo/soleil-source/`.
 */
export const SYMBOL = { width: 1866, height: 1540, horizon: 1044 } as const;

export function LogoSymbol({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block aspect-[1866/1540] shrink-0 bg-current [mask-image:url(/images/logo/symbole-soleil.svg)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]",
        className,
      )}
      style={style}
    />
  );
}
