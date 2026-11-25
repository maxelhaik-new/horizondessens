"use client";

import { buttonClass } from "@/components/ui/button-link";
import { PinIcon } from "@/components/ui/icons";
import { setConsent, useConsent } from "@/lib/consent";

/** Carte Google Maps affichée seulement si les cookies tiers sont acceptés. */
export function ConsentMap({ query, title }: { query: string; title: string }) {
  const consent = useConsent();

  if (consent === "granted") {
    return (
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-white text-ink shadow-lift">
        <PinIcon className="size-5" />
      </span>
      {consent === undefined ? null : (
        <>
          <p className="max-w-xs text-sm text-ink-soft">
            La carte Google Maps s&apos;affiche si vous acceptez ses cookies.
          </p>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className={buttonClass({ size: "sm", plain: true })}
          >
            Accepter et afficher
          </button>
        </>
      )}
    </div>
  );
}
