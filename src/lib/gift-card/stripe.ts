import "server-only";

import Stripe from "stripe";

let client: Stripe | null | undefined;

/**
 * Client Stripe côté serveur (clé `STRIPE_SECRET_KEY`), ou `null` si la clé
 * manque : la commande retombe alors sur la page Contact.
 */
export function getStripe(): Stripe | null {
  if (client === undefined) {
    const key = process.env.STRIPE_SECRET_KEY;
    client = key
      ? new Stripe(key, {
          appInfo: {
            name: "Horizon des Sens",
            url: "https://horizondessens.fr",
          },
        })
      : null;
  }
  return client;
}
