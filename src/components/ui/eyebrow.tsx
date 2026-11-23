import type { ReactNode } from "react";

import type { EditAttrs } from "@/content/edit";
import { cn } from "@/lib/cn";

/**
 * Pastille de section (signature Serelin, choisie par Maxime).
 * Texte accent-800 : contraste AA sur fond blanc translucide.
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
  edit,
}: {
  children: ReactNode;
  tone?: "light" | "glass" | "dark";
  className?: string;
  edit?: EditAttrs;
}) {
  return (
    <p
      {...edit}
      className={cn(
        "inline-flex items-center rounded-full px-5 py-3 text-eyebrow",
        tone === "light" && "bg-white/70 text-accent-800",
        tone === "glass" && "bg-white/15 text-white backdrop-blur-md",
        tone === "dark" && "bg-white/10 text-white/85",
        className,
      )}
    >
      {children}
    </p>
  );
}
