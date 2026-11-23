"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type Gesture = { title: string; text: string; image: string };

/**
 * Desktop : l'image reste collée à gauche et se remplace (fondu) selon le
 * geste au centre de l'écran ; le geste actif est mis en avant.
 * Mobile : chaque geste a son image, sans effet.
 */
export function GesturesScroller({ items }: { items: Gesture[] }) {
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
    <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-2 lg:gap-20">
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

      <ol className="flex flex-col lg:py-[18vh]">
        {items.map((item, i) => (
          <li
            key={item.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn(
              "flex flex-col gap-5 border-t border-line py-10 transition-opacity duration-500 last:border-b lg:min-h-[45vh] lg:justify-center lg:py-12",
              i === active ? "lg:opacity-100" : "lg:opacity-35",
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel lg:hidden">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <p className="text-eyebrow text-accent-800">
              Geste {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="text-h3 font-serif tracking-[-0.02em] italic">
              {item.title}
            </h3>
            <p className="max-w-md text-lead text-pretty text-ink-soft">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
