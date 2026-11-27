"use client";

import { useActionState } from "react";

import {
  sendGiftCardTest,
  type GiftCardTestState,
} from "@/app/carte-cadeau/test-actions";
import { buttonClass } from "@/components/ui/button-link";

const field =
  "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-accent-600 focus:outline-none max-md:text-base";

/** Petit panneau repliable, en bas de page, pour les éditeurs. */
export function GiftCardTestForm({
  defaultEmail,
  cards,
}: {
  defaultEmail: string;
  cards: { id: string; label: string }[];
}) {
  const [state, action, pending] = useActionState<GiftCardTestState, FormData>(
    sendGiftCardTest,
    { status: "idle" },
  );

  return (
    <details
      data-no-motion
      className="container-site pb-10 text-sm text-ink-soft"
    >
      <summary className="w-fit cursor-pointer list-none rounded-full border border-dashed border-line-strong px-3 py-1.5 text-xs hover:text-ink">
        Tester l&apos;envoi de la carte (éditeurs)
      </summary>
      <form
        action={action}
        className="mt-4 grid max-w-xl gap-3 rounded-2xl bg-paper-soft p-5 sm:grid-cols-2"
      >
        <p className="sm:col-span-2">
          Envoie le PDF et les e-mails comme après un paiement Stripe réussi,
          avec une commande fictive. Aucun paiement, rien n&apos;est écrit dans
          Stripe. La copie au salon part aussi, marquée « [Test] ».
        </p>
        <label className="flex flex-col gap-1 sm:col-span-2">
          E-mail de l&apos;acheteur
          <input
            name="email"
            type="email"
            required
            defaultValue={defaultEmail}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1">
          Carte
          <select name="card" className={field} defaultValue={cards[0]?.id}>
            {cards.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          Pour
          <input
            name="recipient"
            maxLength={60}
            placeholder="Marie Dupont"
            className={field}
          />
        </label>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className={buttonClass({ size: "sm", plain: true })}
          >
            {pending ? "Envoi…" : "Envoyer le test"}
          </button>
          <p role="status" className="text-ink">
            {state.status === "sent" &&
              `Envoyé à ${state.to} (carte ${state.code}).`}
            {state.status === "error" && state.message}
          </p>
        </div>
      </form>
    </details>
  );
}
