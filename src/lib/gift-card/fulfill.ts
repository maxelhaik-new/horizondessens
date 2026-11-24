import "server-only";

import { sendEmail } from "@/lib/resend";
import { site } from "@/lib/site";

import { renderBuyerEmail, renderSalonEmail } from "./emails";
import {
  formatDateFr,
  getPaidGiftCardOrder,
  type GiftCardOrder,
} from "./order";
import { giftCardFileName, renderGiftCardPdf } from "./pdf";
import { getStripe } from "./stripe";

export type FulfillResult =
  | { status: "sent"; order: GiftCardOrder }
  | { status: "email-failed"; order: GiftCardOrder }
  | { status: "not-found" };

/**
 * Remise d'une carte cadeau payée : PDF, e-mail à l'acheteur, copie à
 * Élodie, puis registre dans Stripe (métadonnées du paiement).
 *
 * Appelée par le webhook Stripe ET par la page de confirmation : elle est
 * idempotente. Une carte déjà envoyée n'est pas renvoyée (métadonnée
 * `carte_envoyee`) et, si les deux appels se croisent, les clés
 * d'idempotence de Resend empêchent le double envoi.
 */
export async function fulfillGiftCard(
  sessionId: string,
  origin: string,
): Promise<FulfillResult> {
  const order = await getPaidGiftCardOrder(sessionId);
  if (!order) return { status: "not-found" };
  if (order.sent) return { status: "sent", order };

  const pdf = await renderGiftCardPdf(order);
  const attachments = [{ filename: giftCardFileName(order), content: pdf }];

  const buyerEmail = renderBuyerEmail(order, origin);
  const buyer = order.buyerEmail
    ? await sendEmail({
        to: [order.buyerEmail],
        replyTo: process.env.CONTACT_TO_EMAIL || site.email,
        ...buyerEmail,
        attachments,
        idempotencyKey: `carte-cadeau-${order.sessionId}-acheteur`,
      })
    : ({ ok: false, reason: "rejected" } as const);

  const salonEmail = renderSalonEmail(order);
  await sendEmail({
    to: [process.env.CONTACT_TO_EMAIL || site.email],
    replyTo: order.buyerEmail || undefined,
    ...salonEmail,
    attachments,
    idempotencyKey: `carte-cadeau-${order.sessionId}-salon`,
  });

  // Registre : tout ce qu'il faut pour retrouver la carte dans Stripe.
  const stripe = getStripe();
  if (stripe && order.paymentIntentId) {
    try {
      await stripe.paymentIntents.update(order.paymentIntentId, {
        metadata: {
          beneficiaire: order.recipient.slice(0, 500),
          de_la_part_de: order.from.slice(0, 500),
          valable_jusqu_au: formatDateFr(order.validUntil),
          ...(buyer.ok ? { carte_envoyee: "oui" } : {}),
        },
      });
    } catch (error) {
      console.error("Carte cadeau : registre Stripe non mis à jour", error);
    }
  }

  return buyer.ok
    ? { status: "sent", order: { ...order, sent: true } }
    : { status: "email-failed", order };
}
