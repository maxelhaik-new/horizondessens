"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/cn";

type RevealImageProps = {
  src: string;
  alt: string;
  /** Classes du cadre (ratio, rayon, taille). */
  className?: string;
  sizes: string;
  /** Image au-dessus de la ligne de flottaison (hero). */
  eager?: boolean;
  /** Amplitude de la parallaxe interne, en % de la hauteur (0 = aucune). */
  parallax?: number;
  /** Classes de l'image elle-même (ex. zoom au survol de la carte parente). */
  imageClassName?: string;
};

/**
 * Image révélée au scroll : le cadre s'ouvre (clip-path) et l'image se
 * dézoome légèrement, avec une parallaxe interne optionnelle.
 */
export function RevealImage({
  src,
  alt,
  className,
  sizes,
  eager = false,
  parallax = 8,
  imageClassName,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallax}%`, `${parallax}%`],
  );

  if (reduceMotion) {
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
          loading={eager ? "eager" : "lazy"}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(12% 8% 12% 8% round 1.25rem)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.25rem)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-[-10%]"
        style={{ y: parallax ? y : 0 }}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
      </motion.div>
    </motion.div>
  );
}
