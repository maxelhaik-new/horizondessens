"use client";

import {
  type AnimationPlaybackControls,
  useAnimate,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { mainNav, routes } from "@/lib/navigation";
import { site } from "@/lib/site";

/*
 * Menu mobile « à voiles courbes » (inspiré du composant CurveMenuOverlay,
 * réécrit avec Motion à la place de GSAP) :
 * - ouverture : un voile rosé monte en se courbant, puis un voile sombre le
 *   suit ; les liens glissent ensuite depuis leur masque, en cascade ;
 * - fermeture : les liens redescendent, le voile sombre redescend en se
 *   creusant, puis le voile rosé.
 * Mêmes tracés SVG, durées et courbes que l'original.
 */

const CLOSED = "M0,100 L0,100 Q50,100 100,100 L100,100 Z";
const OPEN = "M0,100 L0,0 Q50,0 100,0 L100,100 Z";
const BEND_1 = "M0,100 L0,70 Q50,55 100,70 L100,100 Z";
const BEND_2 = "M0,100 L0,10 Q50,-40 100,10 L100,100 Z";
const BEND_1_DOWN = "M0,100 L0,130 Q50,145 100,130 L100,100 Z";
const BEND_2_DOWN = "M0,100 L0,240 Q50,280 100,240 L100,100 Z";

// Équivalents des courbes GSAP.
const POWER1_IN_OUT = [0.45, 0, 0.55, 1] as const;
const SINE_OUT = [0.61, 1, 0.88, 1] as const;
const POWER2_OUT = [0.33, 1, 0.68, 1] as const;
const POWER2_IN = [0.32, 0, 0.67, 0] as const;

// Ouverture : courbure 0.35 s, extension 0.45 s, chevauchement 0.175 s.
const OPEN_LAYER = 0.625;
const OPEN_BEND_AT = 0.35 / OPEN_LAYER;
const CONTENT_AT = OPEN_LAYER * 2;

type Props = { id: string; open: boolean; onNavigate: () => void };

export function MobileMenu({ id, open, onNavigate }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const running = useRef<AnimationPlaybackControls[]>([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    running.current.forEach((c) => c.stop());
    const q = (s: string) => scope.current?.querySelectorAll(s) ?? [];
    const k = reduceMotion ? 0 : 1;

    if (open) {
      // Affiche le calque (hors React, pour ne pas re-rendre pendant l'animation).
      scope.current?.classList.remove("hidden");
      // Laisse React afficher le calque avant d'animer.
      requestAnimationFrame(() => {
        const l1 = q("[data-layer='1']");
        const l2 = q("[data-layer='2']");
        const items = q("[data-item]");
        const extra = q("[data-extra]");
        running.current = [
          animate(
            l1,
            { d: [CLOSED, BEND_1, OPEN] },
            {
              duration: OPEN_LAYER * k,
              times: [0, OPEN_BEND_AT, 1],
              ease: [POWER1_IN_OUT, SINE_OUT],
            },
          ),
          animate(
            l2,
            { d: [CLOSED, BEND_2, OPEN] },
            {
              duration: OPEN_LAYER * k,
              delay: OPEN_LAYER * k,
              times: [0, OPEN_BEND_AT, 1],
              ease: [POWER1_IN_OUT, SINE_OUT],
            },
          ),
          ...Array.from(items).map((item, i) =>
            animate(
              item,
              { y: ["110%", "0%"] },
              {
                duration: 0.5 * k,
                delay: (CONTENT_AT + 0.15 + i * 0.08) * k,
                ease: POWER2_OUT,
              },
            ),
          ),
          animate(
            extra,
            { opacity: [0, 1], y: ["20%", "0%"], scale: [0.98, 1] },
            {
              duration: 0.7 * k,
              delay: (CONTENT_AT + 0.5) * k,
              ease: POWER2_OUT,
            },
          ),
        ];
      });
      return;
    }

    // Fermeture
    const l1 = q("[data-layer='1']");
    const l2 = q("[data-layer='2']");
    const items = q("[data-item]");
    const extra = q("[data-extra]");
    const fade = 0.25;
    const l2Start = fade;
    const l1Start = fade + 0.45 + (0.6 - 0.225);
    const l1Duration = 0.35 + 0.45 - 0.175;
    const l2Duration = 0.45 + 0.6 - 0.225;
    const controls = [
      ...Array.from(items).map((item, i) =>
        animate(
          item,
          { y: "110%" },
          { duration: 0.35 * k, delay: i * 0.04 * k, ease: POWER2_IN },
        ),
      ),
      animate(
        extra,
        { opacity: 0, y: "20%" },
        { duration: fade * k, ease: POWER2_IN },
      ),
      animate(
        l2,
        { d: [OPEN, BEND_2_DOWN, CLOSED] },
        {
          duration: l2Duration * k,
          delay: l2Start * k,
          times: [0, 0.45 / l2Duration, 1],
          ease: [POWER1_IN_OUT, SINE_OUT],
        },
      ),
      animate(
        l1,
        { d: [OPEN, BEND_1_DOWN, CLOSED] },
        {
          duration: l1Duration * k,
          delay: l1Start * k,
          times: [0, 0.35 / l1Duration, 1],
          ease: [POWER1_IN_OUT, SINE_OUT],
        },
      ),
    ];
    running.current = controls;
    let cancelled = false;
    Promise.all(controls.map((c) => c.finished)).then(() => {
      if (!cancelled) scope.current?.classList.add("hidden");
    });
    return () => {
      cancelled = true;
    };
  }, [open, animate, scope, reduceMotion]);

  return (
    <div
      ref={scope}
      id={id}
      className="fixed inset-0 z-40 hidden lg:hidden"
      aria-hidden={!open}
      inert={!open}
    >
      {(["1", "2"] as const).map((layer) => (
        <svg
          key={layer}
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <path
            data-layer={layer}
            d={CLOSED}
            className={layer === "1" ? "fill-accent-200" : "fill-night"}
            style={{ willChange: "d" }}
          />
        </svg>
      ))}

      <div className="relative flex h-full flex-col justify-center gap-[clamp(40px,6vh,60px)] px-[8vw] py-[5vh] text-white">
        <nav aria-label="Navigation mobile">
          <ul className="flex flex-col gap-[clamp(8px,1.5vh,20px)]">
            {mainNav.map((item) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  data-item
                  style={{ transform: "translateY(110%)" }}
                  className="inline-block pr-5 font-serif text-[min(84px,15vw)] leading-none tracking-[0.8px] italic transition-opacity duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div data-extra className="flex flex-col items-start gap-6 opacity-0">
          <div className="flex flex-col gap-3 text-base leading-[1.4] text-white/75">
            <a
              href={`mailto:${site.email}`}
              className="transition-opacity hover:opacity-70"
            >
              {site.email}
            </a>
            <a
              href={site.phone.href}
              className="transition-opacity hover:opacity-70"
            >
              {site.phone.display}
            </a>
          </div>
          <ButtonLink
            href={routes.reserver}
            variant="light"
            onClick={onNavigate}
          >
            Réserver un soin
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
