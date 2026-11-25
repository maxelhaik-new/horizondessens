"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/*
 * Rail mobile (adaptation mobile du 25/11/2026) : sous le point de rupture
 * choisi, une collection empilée devient une rangée horizontale aimantée
 * (scroll-snap natif, swipe au doigt), avec l'amorce de la carte suivante
 * et une jauge « 01 / 04 ». Au-delà, la mise en page desktop passée dans
 * `className` s'applique telle quelle.
 *
 * Le décalage négatif reprend la marge de `container-site` (1.25rem, puis
 * 2rem dès 48rem) pour que la rangée aille jusqu'aux bords de l'écran.
 */
const variants = {
  md: {
    track:
      "max-md:-mx-5 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-px-5 max-md:px-5 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:*:shrink-0 max-md:*:snap-start",
    item: "max-md:*:w-[84%] max-md:*:max-w-[22rem]",
    gauge: "md:hidden",
  },
  lg: {
    track:
      "max-lg:flex max-lg:snap-x max-lg:snap-mandatory max-lg:gap-3 max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden max-lg:*:shrink-0 max-lg:*:snap-start max-md:-mx-5 max-md:scroll-px-5 max-md:px-5 md:max-lg:-mx-8 md:max-lg:scroll-px-8 md:max-lg:px-8 md:max-lg:gap-4",
    item: "max-md:*:w-[84%] max-md:*:max-w-[22rem] md:max-lg:*:w-[46%]",
    gauge: "lg:hidden",
  },
} as const;

type Props = {
  as?: "ul" | "ol" | "div";
  /** Largeur sous laquelle la collection devient un rail. */
  until?: keyof typeof variants;
  /** Mise en page au-delà du point de rupture (grille, liste…). */
  className?: string;
  /** Largeur des cartes dans le rail (remplace la valeur par défaut). */
  itemClassName?: string;
  /** Couleurs de la jauge : sur fond clair ou sombre. */
  tone?: "light" | "dark";
  label?: string;
  children: React.ReactNode;
};

export function Rail({
  as: Tag = "ul",
  until = "md",
  className,
  itemClassName,
  tone = "light",
  label,
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState({ index: 0, count: 0, progress: 0 });
  const v = variants[until];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(el.children) as HTMLElement[];
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) {
        setState((s) =>
          s.count === 0 ? s : { index: 0, count: 0, progress: 0 },
        );
        return;
      }
      const left = el.scrollLeft;
      // Carte active : la dernière dont le bord gauche est atteint.
      let index = 0;
      items.forEach((item, i) => {
        if (item.offsetLeft - el.offsetLeft - 24 <= left + 1) index = i;
      });
      if (left >= max - 2) index = items.length - 1;
      setState({ index, count: items.length, progress: left / max });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(onScroll);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const dark = tone === "dark";

  return (
    <>
      <Tag
        // @ts-expect-error — ref commun aux trois balises possibles.
        ref={ref}
        aria-label={label}
        className={cn(v.track, itemClassName ?? v.item, className)}
      >
        {children}
      </Tag>
      {state.count > 1 ? (
        <div
          aria-hidden
          className={cn(
            "mt-6 flex items-center gap-4 text-xs font-medium tabular-nums",
            dark ? "text-white/70" : "text-ink-subtle",
            v.gauge,
          )}
        >
          <span>
            {pad(state.index + 1)} / {pad(state.count)}
          </span>
          <span
            className={cn(
              "relative h-px flex-1 overflow-hidden",
              dark ? "bg-white/15" : "bg-line",
            )}
          >
            <span
              className={cn(
                "absolute inset-y-0 left-0 transition-transform duration-150 ease-out",
                dark ? "bg-accent-300" : "bg-ink",
              )}
              style={{
                width: `${100 / state.count}%`,
                transform: `translateX(${state.progress * (state.count - 1) * 100}%)`,
              }}
            />
          </span>
        </div>
      ) : null}
    </>
  );
}
