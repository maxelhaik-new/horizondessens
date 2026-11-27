import "server-only";

import type { GiftCard } from "@/lib/gift-cards";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";
import { formatDuration } from "@/services/format";

import {
  GIFT_CARD_FIELDS,
  GIFT_CARD_TYPE,
  GIFT_CARD_VALIDITY_MONTHS,
  newGiftCardCode,
} from "./order";
import { getStripe } from "./stripe";

/** Longueurs maximales des saisies (le PDF est mis en page pour elles). */
export const GIFT_CARD_LIMITS = { recipient: 60, from: 60, message: 200 };

/**
 * Crée la page de paiement Stripe Checkout d'une carte cadeau et renvoie
 * son URL. Le prix vient du catalogue (`getGiftCards`, donc des
 * prestations) : rien n'est saisi en double dans Stripe. Le numéro de la
 * carte est tiré ici et suit le paiement dans ses métadonnées.
 */
/**
 * ⚠️ Test en mode réel : `GIFT_CARD_TEST_AMOUNT_CENTS` (ex. `100` = 1 €, au
 * moins 50) remplace le montant facturé de la carte 1h dans Stripe, sans
 * changer l'affichage du site, des e-mails ni du PDF. À supprimer sur Vercel
 * juste après le test (puis redéployer).
 */
function chargedAmountCents(card: GiftCard) {
  const test = Number(process.env.GIFT_CARD_TEST_AMOUNT_CENTS);
  if (card.id === "seance-60" && Number.isInteger(test) && test >= 50) {
    return test;
  }
  return card.priceEuros * 100;
}

export async function createGiftCardCheckout(
  card: GiftCard,
  origin: string,
): Promise<string | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  const duration = formatDuration(card.durationMinutes);
  const label = `Carte cadeau ${card.name.toLowerCase()} ${duration}`;
  const code = newGiftCardCode();
  const metadata = {
    type: GIFT_CARD_TYPE,
    code,
    carte: card.id,
    prestation: card.name,
    duree_minutes: String(card.durationMinutes),
    prix_euros: String(card.priceEuros),
  };
  // Stripe ne peut afficher que des images en ligne (pas en local).
  const isPublic = origin.startsWith("https://");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      submit_type: "pay",
      // Carte bancaire (Apple Pay et Google Pay inclus), comme dans les CGV.
      allowed_payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: chargedAmountCents(card),
            product_data: {
              name: label,
              description: `Une séance de ${duration}, pour le soin de son choix. Valable ${GIFT_CARD_VALIDITY_MONTHS} mois, envoyée par e-mail au format PDF.`,
              ...(isPublic
                ? { images: [`${origin}/carte-cadeau/opengraph-image.jpg`] }
                : {}),
            },
          },
        },
      ],
      name_collection: { individual: { enabled: true } },
      custom_fields: [
        {
          key: GIFT_CARD_FIELDS.recipient,
          label: { type: "custom", custom: "Pour qui ? Prénom et nom" },
          type: "text",
          text: { maximum_length: GIFT_CARD_LIMITS.recipient },
        },
        {
          key: GIFT_CARD_FIELDS.from,
          label: { type: "custom", custom: "De la part de" },
          type: "text",
          optional: true,
          text: { maximum_length: GIFT_CARD_LIMITS.from },
        },
        {
          key: GIFT_CARD_FIELDS.message,
          label: { type: "custom", custom: "Un petit mot sur la carte" },
          type: "text",
          optional: true,
          text: { maximum_length: GIFT_CARD_LIMITS.message },
        },
      ],
      custom_text: {
        submit: {
          message: `Carte nominative, valable ${GIFT_CARD_VALIDITY_MONTHS} mois, envoyée par e-mail dès le paiement. En payant, vous acceptez nos [conditions générales de vente](${origin}${routes.cgv}#cartes-cadeaux).`,
        },
      },
      branding_settings: {
        display_name: site.name,
        background_color: "#f7ece9",
        button_color: "#1a110f",
        border_style: "pill",
        // Police la plus proche de Source Sans 3 (celle du site) parmi celles
        // de Stripe ; logo complet (symbole + nom), comme dans les e-mails.
        font_family: "source_sans_pro",
        ...(isPublic
          ? {
              logo: {
                type: "url",
                url: `${origin}/images/email/logo-horizon-des-sens.png`,
              },
            }
          : {}),
      },
      metadata,
      payment_intent_data: { description: `${label} · ${code}`, metadata },
      success_url: `${origin}${routes.carteCadeauMerci}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${routes.carteCadeau}#formules`,
    });
    return session.url;
  } catch (error) {
    console.error("Carte cadeau : création du paiement impossible", error);
    return null;
  }
}
