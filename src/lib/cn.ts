import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doit connaître les utilitaires typo du projet (globals.css),
 * sinon il les confond avec des couleurs (`text-h2` vs `text-ink`) et en
 * supprime une.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h2", "h3", "h4", "lead", "body", "eyebrow"] },
      ],
    },
  },
});

/** Combine des classes conditionnelles et résout les conflits Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
