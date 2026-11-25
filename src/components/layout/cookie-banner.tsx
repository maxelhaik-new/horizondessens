"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { buttonClass } from "@/components/ui/button-link";
import { setConsent, useConsent } from "@/lib/consent";
import { routes } from "@/lib/navigation";

/**
 * Bandeau cookies discret : petite carte claire en bas à gauche, **sur
 * ordinateur et tablette seulement** (dès `sm`). « Refuser » et « Accepter »
 * ont le même poids, comme l'exige la CNIL.
 *
 * Mobile (décision de Maxime, 25/11/2026, critique impeccable) : pas de
 * bandeau, il masquait tout le hero à la première visite. Le seul usage
 * (Google Maps sur /contact) se consent au clic sur la carte
 * (`consent-map`), ce qui suffit : rien n'est déposé sans ce clic.
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
          className="fixed bottom-6 left-6 z-30 hidden max-w-sm sm:block"
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
                className={buttonClass({ size: "sm", plain: true })}
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className={buttonClass({ size: "sm", plain: true })}
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
