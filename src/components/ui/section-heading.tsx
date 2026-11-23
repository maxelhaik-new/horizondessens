import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Niveau du titre (h2 par défaut). */
  as?: "h2" | "h3";
  className?: string;
};

/** En-tête de section : surtitre pastille, titre serif, intro courte. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
  as: Title = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      as="header"
      className={cn(
        "flex flex-col gap-5",
        align === "center"
          ? "mx-auto max-w-3xl items-center text-center"
          : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === "dark" ? "dark" : "light"}>{eyebrow}</Eyebrow>
      ) : null}
      <Title
        className={cn("text-h2 text-balance", tone === "dark" && "text-white")}
      >
        {title}
      </Title>
      {intro ? (
        <p
          className={cn(
            "max-w-xl text-lead text-pretty",
            tone === "dark" ? "text-white/70" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
