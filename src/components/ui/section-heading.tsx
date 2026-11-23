import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { cn } from "@/lib/cn";

import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Action sous l'intro (bouton), comme Serelin. */
  action?: ReactNode;
  className?: string;
};

/** En-tête de section : pastille, titre italique révélé mot à mot, intro courte. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
  action,
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6",
        align === "center"
          ? "mx-auto max-w-4xl items-center text-center"
          : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={tone === "dark" ? "dark" : "light"}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <SplitWords
        text={title}
        className={cn(
          "text-h2 text-balance",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      />
      {intro ? (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "max-w-xl text-lead text-pretty",
              tone === "dark" ? "text-white/75" : "text-ink-soft",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
      {action ? (
        <Reveal delay={0.25} className="pt-2">
          {action}
        </Reveal>
      ) : null}
    </header>
  );
}
