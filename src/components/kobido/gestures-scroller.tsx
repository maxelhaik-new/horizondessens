"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Rail } from "@/components/ui/rail";
import type { EditAttrs } from "@/content/edit";
import { cn } from "@/lib/cn";

type Gesture = {
  title: string;
  text: string;
  image: string;
  edit?: { title?: EditAttrs; text?: EditAttrs; image?: EditAttrs };
};

/**
 * Desktop : l'image reste collée à gauche et se remplace (fondu) selon le
 * geste au centre de l'écran ; le geste actif est mis en avant.
 * Mobile et tablette : rail horizontal aimanté, une carte par geste.
 * Utilisé par la page Kobido.
 */
export function GesturesScroller({
  items,
  label = "Geste",
}: {
  items: Gesture[];
  /** Libellé numéroté de chaque étape (« Geste 01 »). */
  label?: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = items[active] ?? items[0];

  return (
    <div className="mt-10 grid md:mt-16 lg:grid-cols-2 lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-card bg-night">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.image}
              className="absolute inset-0"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                {...current.edit?.image}
                src={current.image}
                alt=""
                fill
                sizes="45vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <p className="absolute right-6 bottom-6 rounded-full bg-white/15 px-4 py-2 font-serif text-xl text-white italic backdrop-blur-md">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <Rail
        as="ol"
        until="lg"
        label={`${label}s`}
        className="lg:flex lg:flex-col lg:py-[18vh]"
      >
        {items.map((item, i) => (
          <li
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn(
              "flex flex-col gap-3 rounded-card bg-paper/70 p-2.5 pb-6 lg:min-h-[45vh] lg:justify-center lg:gap-5 lg:rounded-none lg:border-t lg:border-line lg:bg-transparent lg:p-0 lg:py-12 lg:last:border-b",
            )}
          >
            <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:hidden">
              <Image
                {...item.edit?.image}
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 768px) 46vw, 84vw"
                className="object-cover"
              />
            </div>
            <p className="px-3 text-eyebrow text-accent-800 lg:px-0">
              {label} {String(i + 1).padStart(2, "0")}
            </p>
            <h3
              {...item.edit?.title}
              className={cn(
                "px-3 text-h4 font-serif tracking-[-0.02em] italic transition-opacity duration-500 lg:px-0 lg:text-h3",
                // Geste inactif : seul le titre (grand texte, contraste ≥ 3:1)
                // s'efface ; le texte courant reste lisible (AA).
                i !== active && "lg:opacity-60",
              )}
            >
              {item.title}
            </h3>
            <p
              {...item.edit?.text}
              className="max-w-md px-3 text-body text-pretty text-ink-soft lg:px-0 lg:text-lead"
            >
              {item.text}
            </p>
          </li>
        ))}
      </Rail>
    </div>
  );
}
