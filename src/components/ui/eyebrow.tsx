import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Surtitre en pastille (style Serelin). */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "glass" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-eyebrow",
        tone === "light" && "bg-white text-ink-soft",
        tone === "glass" && "bg-white/15 text-white backdrop-blur-md",
        tone === "dark" && "bg-white/10 text-white/80",
        className,
      )}
    >
      {children}
    </p>
  );
}
