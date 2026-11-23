"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { setConsent, useConsent } from "@/lib/consent";
import { routes } from "@/lib/navigation";

/**
 * Bandeau cookies discret : petite carte claire en bas à gauche (au-dessus
 * de la barre « Réserver » sur mobile). « Refuser » et « Accepter » ont le
 * même poids, comme l'exige la CNIL.
 */
export function CookieBanner() {
  const consent = useConsent();
  const reduceMotion = useReducedMotion();
  const visible = consent === null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="region"
          aria-label="Cookies"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-24 z-30 sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
        >
          <div className="flex flex-col gap-4 rounded-panel bg-paper-soft/95 p-5 text-sm text-ink-soft shadow-soft ring-1 ring-line backdrop-blur-xl">
            <p className="leading-relaxed">
              <span className="font-serif text-lg text-ink italic">
                Quelques cookies ?
              </span>{" "}
              Uniquement pour afficher la carte Google Maps. Aucune mesure
              d&apos;audience, aucune publicité.{" "}
              <Link
                href={routes.confidentialite}
                className="underline underline-offset-4 hover:text-ink"
              >
                En savoir plus
              </Link>
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConsent("denied")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 font-medium text-ink shadow-lift transition-colors hover:bg-paper"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-night px-5 font-medium text-white shadow-lift transition-colors hover:bg-accent-950"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Lien pour revenir sur son choix (pied de page, confidentialité). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => setConsent(null)}
      className={className}
    >
      Gérer les cookies
    </button>
  );
}
