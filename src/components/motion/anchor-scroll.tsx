"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/** Ease-in-out quartique : départ en douceur, long freinage à l'arrivée. */
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;

/** Laisse la nouvelle page apparaître (transition de page) avant de défiler. */
const ARRIVAL_DELAY = 420;

type Lenis = NonNullable<ReturnType<typeof useLenis>>;

/**
 * Défile jusqu'à `el` (sous l'en-tête, selon son `scroll-margin-top`). La
 * cible est une position absolue mesurée sur la page, pas l'élément : la
 * position interne de Lenis peut être en retard sur la page. Si la page a
 * bougé pendant le trajet (image, contenu chargé), petit rattrapage final.
 */
function glide(lenis: Lenis, el: HTMLElement, correction = false) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 96;
  const target = window.scrollY + el.getBoundingClientRect().top - margin;
  const distance = Math.abs(target - window.scrollY);
  if (distance < 2) return;
  // Plus c'est loin, plus c'est long, dans des bornes raisonnables.
  const duration = correction
    ? 0.4
    : Math.min(1.6, Math.max(0.7, 0.55 + distance / 4200));
  lenis.scrollTo(target, {
    duration,
    easing: easeInOutQuart,
    force: true,
    onComplete: () => {
      if (!correction) glide(lenis, el, true);
    },
  });
}

function targetOf(hash: string) {
  const id = decodeURIComponent(hash.slice(1));
  return id ? document.getElementById(id) : null;
}

/**
 * Liens vers une ancre (`#reserver`, `/kobido#reserver`…) :
 * - même page : défilement doux jusqu'à la cible, au lieu du saut ;
 * - autre page : on arrive en haut de la page, puis on descend en douceur
 *   jusqu'à l'ancre, pour que le visiteur voie où il est arrivé.
 * L'URL garde l'ancre et un `hashchange` est émis (le module de réservation
 * s'en sert pour présélectionner la durée). Mouvement réduit : Lenis est
 * coupé et ce composant n'est pas monté ; le navigateur saute directement.
 */
export function AnchorScroll() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<string | null>(null);

  useEffect(() => {
    if (!lenis) return;

    const setHash = (hash: string, push: boolean) => {
      const url = `${window.location.pathname}${window.location.search}${hash}`;
      if (push) window.history.pushState(window.history.state, "", url);
      else window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash.length < 2) return;

      if (url.pathname === window.location.pathname) {
        const el = targetOf(url.hash);
        if (!el) return;
        event.preventDefault();
        setHash(url.hash, url.hash !== window.location.hash);
        glide(lenis, el);
        return;
      }

      // Autre page : navigation sans ancre (arrivée en haut), puis défilement.
      event.preventDefault();
      pending.current = url.hash;
      router.push(`${url.pathname}${url.search}`);
    };

    // Phase de capture : avant le `onClick` de `next/link`, qui ignore alors
    // le clic (`defaultPrevented`) au lieu de sauter à l'ancre.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis, router]);

  // Arrivée sur la nouvelle page.
  useEffect(() => {
    const hash = pending.current;
    if (!hash || !lenis) return;
    pending.current = null;
    const timer = window.setTimeout(() => {
      const el = targetOf(hash);
      if (!el) return;
      const url = `${window.location.pathname}${window.location.search}${hash}`;
      window.history.replaceState(window.history.state, "", url);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      requestAnimationFrame(() => glide(lenis, el));
    }, ARRIVAL_DELAY);
    return () => window.clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}
