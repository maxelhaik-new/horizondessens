"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import type { EditAttrs } from "@/content/edit";
import type { ImageValue } from "@/content/schema";
import { cn } from "@/lib/cn";

/**
 * Rangée de grandes images arrondies qui glisse horizontalement pendant le
 * défilement vertical (galerie « experience » de Serelin). Sur mobile ou
 * avec mouvement réduit : défilement horizontal natif au doigt.
 */
export function SalonGallery({
  images,
}: {
  images: Array<ImageValue & { edit?: EditAttrs }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], ["4%", "-28%"]);
  const x = useSpring(raw, { stiffness: 90, damping: 30 });

  return (
    <div ref={ref} className="mt-14 md:mt-20">
      {/* Mobile / mouvement réduit : scroll horizontal natif */}
      <ul
        className={cn(
          "flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-2",
          reduceMotion ? "md:px-8" : "md:hidden",
        )}
      >
        {images.map((img, i) => (
          <li
            key={i}
            className="relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-card md:w-[40vw]"
          >
            <Image
              {...img.edit}
              src={img.src}
              alt={img.alt}
              fill
              sizes="80vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      {/* Desktop : la rangée suit le scroll */}
      {reduceMotion ? null : (
        <motion.ul style={{ x }} className="hidden gap-8 pl-[8vw] md:flex">
          {images.map((img, i) => (
            <li
              key={i}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-card",
                i % 2 === 0
                  ? "aspect-[4/5] w-[30vw]"
                  : "aspect-[3/2] w-[44vw] self-end",
              )}
            >
              <Image
                {...img.edit}
                src={img.src}
                alt={img.alt}
                fill
                sizes="45vw"
                className="object-cover"
              />
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
