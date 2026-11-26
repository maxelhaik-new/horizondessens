"use client";

/*
 * ⚠️ TEMPORAIRE (26/11/2026) : essais de logos pour Maxime.
 * Un sélecteur dans le menu (desktop et mobile) change le nom du logo partout
 * sur le site ; le choix est gardé dans `localStorage` (navigateur seulement).
 * À retirer une fois le logo choisi : garder la variante retenue dans
 * `LogoWordmark`, supprimer `LogoTrialSelect`.
 */

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type Variant = { id: string; label: string };

export const logoVariants: Variant[] = [
  { id: "lt-superior", label: "1 · LT Superior Serif" },
];

const KEY = "hds-logo-essai";
const EVENT = "hds-logo-essai";
const DEFAULT = logoVariants[0].id;

function read() {
  try {
    const v = localStorage.getItem(KEY);
    return logoVariants.some((x) => x.id === v) ? (v as string) : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function useLogoVariant() {
  return useSyncExternalStore(subscribe, read, () => DEFAULT);
}

function setLogoVariant(id: string) {
  try {
    localStorage.setItem(KEY, id);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Nom de la marque. Par défaut : LT Superior Serif (Medium, droit).
 * À utiliser partout où le nom accompagne le symbole, jamais en Instrument Serif.
 */
export function LogoWordmark({ className }: { className?: string }) {
  const id = useLogoVariant();
  const variant = logoVariants.find((v) => v.id === id) ?? logoVariants[0];

  return (
    <span
      data-logo={variant.id}
      className={cn(
        "font-logo leading-none font-medium tracking-[-0.015em] whitespace-nowrap not-italic",
        className,
      )}
    >
      {site.name}
    </span>
  );
}

/** Sélecteur temporaire des essais de logo (menu desktop et mobile). */
export function LogoTrialSelect({ className }: { className?: string }) {
  const id = useLogoVariant();
  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      <span className="text-[0.6875rem] tracking-[0.08em] uppercase opacity-70">
        Logo
      </span>
      <select
        value={id}
        onChange={(e) => setLogoVariant(e.target.value)}
        className="max-w-[9.5rem] cursor-pointer rounded-full border border-current/25 bg-transparent px-3 py-1.5 text-xs text-current max-md:text-base"
      >
        {logoVariants.map((v) => (
          <option key={v.id} value={v.id} className="text-ink">
            {v.label}
          </option>
        ))}
      </select>
    </label>
  );
}
