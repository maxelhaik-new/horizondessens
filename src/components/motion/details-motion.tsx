"use client";

import { useEffect } from "react";

const OPEN = { duration: 460, easing: "cubic-bezier(0.16, 1, 0.3, 1)" };
const CLOSE = { duration: 320, easing: "cubic-bezier(0.4, 0, 0.2, 1)" };

const running = new WeakMap<HTMLDetailsElement, Animation>();
/** Sens de l'animation en cours : `true` = ouverture. */
const heading = new WeakMap<HTMLDetailsElement, boolean>();

/** Hauteur de l'élément fermé, mesurée sans repeindre (même tâche). */
function closedHeight(details: HTMLDetailsElement) {
  const wasOpen = details.open;
  details.open = false;
  const height = details.getBoundingClientRect().height;
  details.open = wasOpen;
  return height;
}

function contentOf(details: HTMLDetailsElement) {
  return Array.from(details.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.tagName !== "SUMMARY",
  );
}

function animate(details: HTMLDetailsElement, open: boolean) {
  const from = details.getBoundingClientRect().height;
  running.get(details)?.cancel();

  // Accordéon exclusif (`name`) : on referme les autres en douceur. Sans
  // retirer leur `name`, le navigateur les fermerait d'un coup.
  if (open && details.name) {
    document
      .querySelectorAll<HTMLDetailsElement>(`details[name="${details.name}"]`)
      .forEach((other) => {
        if (other === details || !other.open) return;
        const name = other.name;
        other.removeAttribute("name");
        animate(other, false);
        const restore = () => (other.name = name);
        const anim = running.get(other);
        if (anim) anim.finished.then(restore, restore);
        else restore();
      });
  }

  if (open) details.open = true;
  const to = open
    ? details.getBoundingClientRect().height
    : closedHeight(details);
  const timing = open ? OPEN : CLOSE;

  details.style.overflow = "hidden";
  const animation = details.animate(
    { height: [`${from}px`, `${to}px`] },
    timing,
  );
  // Contenu : apparaît après le début du déploiement ; s'efface plus vite
  // que la hauteur ne se replie, et reste effacé jusqu'à la fin.
  const fades = contentOf(details).map((child) =>
    child.animate(
      open
        ? { opacity: [0, 1], translate: ["0 -0.375rem", "0 0"] }
        : { opacity: [1, 0] },
      open
        ? { ...timing, delay: 60, fill: "backwards" }
        : { ...timing, duration: 200, fill: "forwards" },
    ),
  );
  running.set(details, animation);
  heading.set(details, open);

  animation.onfinish = () => {
    if (!open) details.open = false;
    fades.forEach((fade) => fade.cancel());
    details.style.overflow = "";
    running.delete(details);
  };
  animation.oncancel = () => {
    fades.forEach((fade) => fade.cancel());
    details.style.overflow = "";
  };
}

/**
 * Ouverture et fermeture fluides de tous les `<details>` du site (FAQ,
 * sommaire des pages légales) : la hauteur se déploie, le contenu apparaît
 * en fondu. Sans JS ou avec mouvement réduit : comportement natif. Exclure
 * un élément avec `data-no-motion`.
 */
export function DetailsMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (event: MouseEvent) => {
      if (reduce.matches || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const summary = target?.closest("summary");
      const details = summary?.parentElement;
      if (
        !summary ||
        !(details instanceof HTMLDetailsElement) ||
        details.hasAttribute("data-no-motion") ||
        target?.closest("[contenteditable='true'], a, button, input")
      )
        return;
      event.preventDefault();
      // Animation en cours : un nouveau clic repart dans l'autre sens.
      const next = running.has(details) ? !heading.get(details) : !details.open;
      animate(details, next);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
