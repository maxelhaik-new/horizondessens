"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import { Rail } from "@/components/ui/rail";
import type { EditAttrs } from "@/content/edit";
import { cn } from "@/lib/cn";

export type Chapter = {
  title: string;
  text: string;
  image: string;
  edit?: { title?: EditAttrs; text?: EditAttrs; image?: EditAttrs };
};

const number = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Les chapitres du voyage.
 * Desktop : la section s'épingle et les chapitres défilent horizontalement
 * au rythme du scroll vertical, avec une jauge de progression.
 * Mobile et tablette : rail horizontal aimanté (swipe). Mouvement réduit sur
 * desktop : les chapitres s'empilent, sans effet.
 */
export function VoyageScroller({
  heading,
  items,
}: {
  heading: React.ReactNode;
  items: Chapter[];
}) {
  const reduceMotion = useReducedMotion();
  const pinned = !reduceMotion;

  return (
    <>
      {pinned ? <Pinned heading={heading} items={items} /> : null}
      <div
        className={cn(
          "container-site flex flex-col gap-10 section-y md:gap-12",
          pinned && "lg:hidden",
        )}
      >
        {heading}
        <div>
          <Rail
            as="ol"
            until="lg"
            tone="dark"
            label="Les chapitres du soin"
            className="lg:flex lg:flex-col lg:gap-20"
          >
            {items.map((item, i) => (
              <li
                key={i}
                className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-panel sm:aspect-[4/3] lg:aspect-[4/5]">
                  <Image
                    {...item.edit?.image}
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 45vw, (min-width: 768px) 46vw, 84vw"
                    className="object-cover"
                  />
                </div>
                <ChapterText item={item} index={i} />
              </li>
            ))}
          </Rail>
        </div>
      </div>
    </>
  );
}

function ChapterText({ item, index }: { item: Chapter; index: number }) {
  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <p className="font-serif text-xl text-accent-300 italic lg:text-2xl">
        Chapitre {number(index)}
      </p>
      <h3
        {...item.edit?.title}
        className="text-h4 font-serif tracking-[-0.02em] text-balance italic lg:text-h3"
      >
        {item.title}
      </h3>
      <p
        {...item.edit?.text}
        className="max-w-md text-body text-pretty text-white/75 lg:text-lead"
      >
        {item.text}
      </p>
    </div>
  );
}

function Pinned({
  heading,
  items,
}: {
  heading: React.ReactNode;
  items: Chapter[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);

  // Distance à parcourir : largeur de la rangée moins la largeur visible.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const raw = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setActive(Math.min(items.length - 1, Math.floor(p * items.length))),
  );

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `${100 + items.length * 70}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-[6vh] overflow-hidden pt-24 pb-10">
        <div className="container-site">{heading}</div>

        <motion.ol
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-[6vw] pr-[8vw] pl-[max(2rem,calc((100vw-75rem)/2))]"
        >
          {items.map((item, i) => (
            <li
              key={i}
              className="grid w-[min(62rem,70vw)] shrink-0 grid-cols-[auto_1fr] items-center gap-12"
            >
              <div className="relative aspect-[4/5] h-[min(52vh,34rem)] overflow-hidden rounded-panel">
                <Image
                  {...item.edit?.image}
                  src={item.image}
                  alt=""
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
              <ChapterText item={item} index={i} />
            </li>
          ))}
        </motion.ol>

        <div className="container-site">
          <div className="flex items-center gap-6">
            <span className="text-sm text-white/70 tabular-nums">
              {number(active)} / {number(items.length - 1)}
            </span>
            <div className="h-px flex-1 bg-white/15">
              <motion.div
                style={{ scaleX: progress }}
                className="h-px origin-left bg-accent-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
