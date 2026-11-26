"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { AnchorScroll } from "@/components/motion/anchor-scroll";
import { DetailsMotion } from "@/components/motion/details-motion";

/**
 * Défilement fluide (Lenis), désactivé si l'utilisateur réduit les
 * animations. Les liens d'ancre sont pris en charge par `AnchorScroll`
 * (défilement doux, y compris après un changement de page) ; les
 * `<details>` par `DetailsMotion` (déploiement fluide).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: false }}>
      <AnchorScroll />
      <DetailsMotion />
      {children}
    </ReactLenis>
  );
}
