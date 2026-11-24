import type Stripe from "stripe";

import { fulfillGiftCard } from "@/lib/gift-card/fulfill";
import { GIFT_CARD_TYPE } from "@/lib/gift-card/order";
import { getStripe } from "@/lib/gift-card/stripe";

/*
 * Webhook Stripe (endpoint à déclarer dans Stripe, événements
 * `checkout.session.completed` et `checkout.session.async_payment_succeeded`,
 * secret dans STRIPE_WEBHOOK_SECRET).
 * Remet la carte cadeau même si l'acheteur ferme la page avant le retour
 * sur le site. Une réponse en erreur fait réessayer Stripe plus tard.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    console.error("Webhook Stripe : clé ou secret manquant.");
    return new Response("Non configuré", { status: 500 });
  }

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return new Response("Signature invalide", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    if (
      session.metadata?.type === GIFT_CARD_TYPE &&
      session.payment_status === "paid"
    ) {
      const result = await fulfillGiftCard(
        session.id,
        new URL(request.url).origin,
      );
      if (result.status !== "sent") {
        return new Response("Carte non envoyée", { status: 500 });
      }
    }
  }

  return Response.json({ received: true });
}
