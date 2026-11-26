"use client";

import {
  type AnimationPlaybackControls,
  useAnimate,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { mainNav, routes } from "@/lib/navigation";
import { site } from "@/lib/site";
import { soinsNav } from "@/services/pages";

/** Sous-menu « Soins » : toutes les pages de soin, libellés courts. */
const soins = soinsNav.map((s) => ({
  ...s,
  label: s.label.replace(/^Massage des /, ""),
}));

/**
 * Taille commune à toutes les entrées des deux panneaux (25/11/2026) : la
 * plus longue (« Calme et harmonie ») doit tenir sur une ligne dès 320 px ;
 * bornée aussi par la hauteur (paysage).
 */
const itemText =
  "font-serif text-[min(56px,10.4vw,7svh)] leading-[1.08] tracking-[0.4px] italic";

/*
 * Menu mobile « à voiles courbes » (inspiré du composant CurveMenuOverlay,
 * réécrit avec Motion à la place de GSAP) :
 * - ouverture : un voile rosé monte en se courbant, puis un voile sombre le
 *   suit ; les liens glissent ensuite depuis leur masque, en cascade ;
 * - fermeture : les liens redescendent, le voile sombre redescend en se
 *   creusant, puis le voile rosé.
 * Mêmes tracés SVG, durées et courbes que l'original.
 *
 * Sous-menu (25/11/2026) : « Soins » est une entrée comme les autres ; au
 * toucher, le panneau principal glisse à gauche et celui des soins arrive
 * de la droite, avec les mêmes tailles et un retour. À la fermeture, tout le
 * contenu disparaît ensemble, puis on revient au panneau principal.
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
  const [panel, setPanel] = useState<"main" | "soins">("main");
  // Chaque ouverture repart du panneau principal, même si l'on rouvre
  // pendant la fermeture (ajustement d'état au rendu, sans effet).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setPanel("main");
  }
  const soinsButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);

  const showPanel = (next: "main" | "soins") => {
    setPanel(next);
    // Le focus suit le panneau affiché (clavier et lecteurs d'écran).
    requestAnimationFrame(() =>
      (next === "soins" ? backButton : soinsButton).current?.focus({
        preventScroll: true,
      }),
    );
  };

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
        const panels = q("[data-panels]");
        running.current = [
          animate(panels, { opacity: 1 }, { duration: 0 }),
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
    const panels = q("[data-panels]");
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
      // Tout le contenu part en même temps (aucune entrée ne traîne).
      animate(
        panels,
        { opacity: 0 },
        { duration: 0.3 * k, delay: 0.1 * k, ease: POWER2_IN },
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
      if (cancelled) return;
      scope.current?.classList.add("hidden");
      setPanel("main");
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

      <div className="relative flex h-full flex-col justify-center-safe gap-[clamp(20px,4svh,60px)] overflow-y-auto overscroll-contain px-[max(8vw,env(safe-area-inset-left))] pt-[clamp(5rem,13svh,6rem)] pb-[max(4svh,env(safe-area-inset-bottom))] text-white [@media(max-height:32rem)]:flex-row [@media(max-height:32rem)]:items-center [@media(max-height:32rem)]:justify-between [@media(max-height:32rem)]:pt-20 [@media(max-height:32rem)]:pb-6">
        <div
          data-panels
          className="grid min-w-0 overflow-x-clip [@media(max-height:32rem)]:flex-1"
        >
          {/* Panneau principal */}
          <nav
            aria-label="Navigation mobile"
            inert={panel !== "main"}
            className={cn(
              "col-start-1 row-start-1 transition-[translate,opacity] duration-700 ease-soft motion-reduce:transition-none",
              panel !== "main" &&
                "pointer-events-none -translate-x-1/3 opacity-0",
            )}
          >
            <ul className="flex flex-col gap-[clamp(6px,1.4vh,16px)]">
              {mainNav.map((item) => (
                <li key={item.href} className="overflow-hidden">
                  {item.label === "Soins" ? (
                    <button
                      ref={soinsButton}
                      type="button"
                      data-item
                      aria-expanded={panel === "soins"}
                      aria-controls="menu-mobile-soins"
                      onClick={() => showPanel("soins")}
                      style={{ transform: "translateY(110%)" }}
                      className={cn(
                        itemText,
                        "flex w-full max-w-md cursor-pointer items-center justify-between gap-4 pr-1 text-left",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 not-italic"
                      >
                        <ChevronRightIcon className="size-4" />
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      data-item
                      style={{ transform: "translateY(110%)" }}
                      className={cn(itemText, "inline-block pr-5")}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Panneau « Soins » */}
          <nav
            id="menu-mobile-soins"
            aria-label="Nos soins"
            inert={panel !== "soins"}
            className={cn(
              "col-start-1 row-start-1 flex flex-col items-start transition-[translate,opacity] duration-700 ease-soft motion-reduce:transition-none",
              panel !== "soins" &&
                "pointer-events-none translate-x-1/3 opacity-0",
            )}
          >
            <button
              ref={backButton}
              type="button"
              onClick={() => showPanel("main")}
              className="mb-[clamp(4px,1vh,12px)] -ml-1 inline-flex min-h-11 cursor-pointer items-center gap-2 pr-3 text-eyebrow text-white/70 transition-colors hover:text-white"
            >
              <ChevronRightIcon className="size-4 rotate-180" />
              Menu
            </button>
            <ul className="flex flex-col gap-[clamp(6px,1.4vh,16px)]">
              {soins.map((soin, i) => (
                <li key={soin.href} className="overflow-hidden">
                  <Link
                    href={soin.href}
                    onClick={onNavigate}
                    style={{
                      transitionDelay:
                        panel === "soins" ? `${120 + i * 60}ms` : "0ms",
                    }}
                    className={cn(
                      itemText,
                      "inline-block pr-2 whitespace-nowrap transition-[translate] duration-700 ease-soft motion-reduce:transition-none",
                      panel === "soins"
                        ? "translate-y-0"
                        : "translate-y-[110%]",
                    )}
                  >
                    {soin.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={routes.reserver}
              onClick={onNavigate}
              className="mt-[clamp(10px,2vh,24px)] inline-flex min-h-11 items-center gap-2 text-base text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Tous les soins et tarifs
              <ChevronRightIcon className="size-4" />
            </Link>
          </nav>
        </div>

        <div data-extra className="flex flex-col items-start gap-6 opacity-0">
          <div className="flex flex-col gap-3 text-base leading-[1.4] text-white/75 [@media(max-height:46rem)_and_(orientation:portrait)]:hidden">
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
            Choisir un soin
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
