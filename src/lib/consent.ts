"use client";

import { useSyncExternalStore } from "react";

/*
 * Consentement aux cookies tiers (Google Maps), conservé 6 mois dans le
 * navigateur (recommandation CNIL : redemander au plus tard après 13 mois).
 * `null` = pas encore de choix → le bandeau s'affiche.
 */

export type Consent = "granted" | "denied";

const KEY = "hds-consent";
const MAX_AGE = 1000 * 60 * 60 * 24 * 182;
const EVENT = "hds-consent-change";

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { value, at } = JSON.parse(raw) as { value: Consent; at: number };
    if (Date.now() - at > MAX_AGE) return null;
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent | null) {
  try {
    if (value === null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    // Stockage indisponible : le choix vaut pour la page en cours.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Choix courant ; `undefined` côté serveur (avant hydratation). */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, read, () => undefined);
}
