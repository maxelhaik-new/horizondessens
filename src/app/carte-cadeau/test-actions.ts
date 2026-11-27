"use server";

import { headers } from "next/headers";

import { getGiftCard } from "@/lib/gift-cards";
import { deliverGiftCard } from "@/lib/gift-card/fulfill";
import {
  addMonths,
  GIFT_CARD_VALIDITY_MONTHS,
  newGiftCardCode,
} from "@/lib/gift-card/order";
import { currentEditorEmail } from "@/lib/supabase/editor";

export type GiftCardTestState =
  | { status: "idle" }
  | { status: "sent"; to: string; code: string }
  | { status: "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Test d'envoi d'une carte cadeau, réservé aux éditeurs connectés : mêmes
 * PDF et e-mails qu'après un paiement (webhook Stripe), avec une commande
 * fictive. Aucun paiement, rien n'est écrit dans Stripe. La copie à Élodie
 * (CONTACT_TO_EMAIL) part aussi, avec « [Test] » dans l'objet.
 */
export async function sendGiftCardTest(
  _prev: GiftCardTestState,
  formData: FormData,
): Promise<GiftCardTestState> {
  const editor = await currentEditorEmail();
  if (editor === null)
    return {
      status: "error",
      message: "Réservé aux éditeurs : connectez-vous sur /admin.",
    };

  const to = String(formData.get("email") ?? "").trim();
  if (!EMAIL.test(to) || to.length > 200)
    return { status: "error", message: "Adresse e-mail invalide." };

  const card = await getGiftCard(String(formData.get("card") ?? ""));
  if (!card) return { status: "error", message: "Carte inconnue." };

  const recipient =
    String(formData.get("recipient") ?? "")
      .trim()
      .slice(0, 60) || "Marie Dupont";
  const now = new Date();
  const code = newGiftCardCode();
  const host = (await headers()).get("host") ?? "horizondessens.fr";
  const origin = `${host.startsWith("localhost") ? "http" : "https"}://${host}`;

  const result = await deliverGiftCard(
    {
      sessionId: `test-${crypto.randomUUID()}`,
      paymentIntentId: null,
      code,
      title: card.name,
      durationMinutes: card.durationMinutes,
      priceEuros: card.priceEuros,
      recipient,
      from: "Camille Martin",
      message: "Un moment rien que pour toi. Joyeux anniversaire !",
      buyerName: "Camille Martin",
      buyerEmail: to,
      purchasedAt: now,
      validUntil: addMonths(now, GIFT_CARD_VALIDITY_MONTHS),
      sent: false,
    },
    origin,
    { test: true },
  );

  return result.ok
    ? { status: "sent", to, code }
    : {
        status: "error",
        message:
          result.reason === "unconfigured"
            ? "Resend n'est pas configuré (RESEND_API_KEY, CONTACT_FROM_EMAIL)."
            : "Envoi refusé par Resend : voir les journaux.",
      };
}
