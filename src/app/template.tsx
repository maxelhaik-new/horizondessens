import { ViewTransition, type ReactNode } from "react";

/**
 * Transition entre les pages : un gabarit (`template`) est remonté à chaque
 * navigation, ce qui déclenche les animations `enter` / `exit` du
 * `ViewTransition` (classes `page-in` / `page-out` dans `globals.css`).
 * L'en-tête et le pied de page, dans le layout, ne bougent pas.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
