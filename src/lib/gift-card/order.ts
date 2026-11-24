import "server-only";

import type Stripe from "stripe";

import { getStripe } from "./stripe";

/*
 * Une carte cadeau vendue = une session Stripe Checkout payée. Stripe sert
 * de registre : le code, la prestation et le ou la bénéficiaire sont dans
 * les métadonnées du paiement (recherche par code dans le tableau de bord).
 */

export const GIFT_CARD_VALIDITY_MONTHS = 6;

/** Marqueur des sessions Checkout de cartes cadeaux (métadonnée `type`). */
export const GIFT_CARD_TYPE = "carte-cadeau";

/** Clés des champs saisis sur la page de paiement (alphanumériques). */
export const GIFT_CARD_FIELDS = {
  recipient: "beneficiaire",
  from: "delapartde",
  message: "message",
} as const;

export type GiftCardOrder = {
  sessionId: string;
  paymentIntentId: string | null;
  /** Numéro unique, ex. HDS-7K3M-Q9PX. */
  code: string;
  /** Prestation offerte, ex. « Kobido ». */
  title: string;
  durationMinutes: number;
  priceEuros: number;
  recipient: string;
  from: string;
  message: string;
  buyerName: string;
  buyerEmail: string;
  purchasedAt: Date;
  validUntil: Date;
  /** La carte a déjà été envoyée à l'acheteur (métadonnée du paiement). */
  sent: boolean;
};

/** Sans 0/O, 1/I/L : lisible au téléphone et sur papier. */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function newGiftCardCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]);
  return `HDS-${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}

/** Date + n mois ; le 31 août + 6 mois donne le 28 (ou 29) février. */
export function addMonths(date: Date, months: number) {
  const result = new Date(date);
  const day = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const lastDay = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0),
  ).getUTCDate();
  result.setUTCDate(Math.min(day, lastDay));
  return result;
}

export function formatDateFr(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(date);
}

const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

function fieldValue(session: Stripe.Checkout.Session, key: string) {
  const field = session.custom_fields.find((f) => f.key === key);
  return field?.text?.value?.trim() ?? "";
}

/**
 * Carte cadeau payée correspondant à une session Checkout, ou `null` si la
 * session n'existe pas, n'est pas une carte cadeau ou n'est pas payée.
 */
export async function getPaidGiftCardOrder(
  sessionId: string,
): Promise<GiftCardOrder | null> {
  const stripe = getStripe();
  if (!stripe || !SESSION_ID.test(sessionId)) return null;

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });
  } catch {
    return null;
  }

  const meta = session.metadata ?? {};
  if (meta.type !== GIFT_CARD_TYPE || session.payment_status !== "paid") {
    return null;
  }

  const intent =
    typeof session.payment_intent === "object" ? session.payment_intent : null;
  const purchasedAt = new Date(session.created * 1000);
  const buyerName = session.customer_details?.name?.trim() ?? "";

  return {
    sessionId: session.id,
    paymentIntentId: intent?.id ?? null,
    code: meta.code ?? "",
    title: meta.prestation ?? "",
    durationMinutes: Number(meta.duree_minutes),
    priceEuros: Number(meta.prix_euros),
    recipient: fieldValue(session, GIFT_CARD_FIELDS.recipient),
    from: fieldValue(session, GIFT_CARD_FIELDS.from) || buyerName,
    message: fieldValue(session, GIFT_CARD_FIELDS.message),
    buyerName,
    buyerEmail: session.customer_details?.email ?? "",
    purchasedAt,
    validUntil: addMonths(purchasedAt, GIFT_CARD_VALIDITY_MONTHS),
    sent: intent?.metadata?.carte_envoyee === "oui",
  };
}
