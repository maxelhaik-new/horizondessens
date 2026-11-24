import { createGiftCardCheckout } from "@/lib/gift-card/checkout";
import { getGiftCard } from "@/lib/gift-cards";
import { routes } from "@/lib/navigation";

/*
 * Paiement d'une carte cadeau (formulaire POST des boutons « Offrir cette
 * carte ») : crée la session Stripe Checkout et y redirige (303). La suite
 * (PDF, e-mails, registre) : webhook `/api/stripe/webhook` et page
 * `/carte-cadeau/merci`. Voir `src/lib/gift-card/`.
 * Sans Stripe configuré ou en cas d'erreur : la personne écrit à Élodie.
 */
export async function POST(request: Request) {
  const form = await request.formData();
  const id = form.get("carte");
  const card = typeof id === "string" ? await getGiftCard(id) : undefined;
  const base = new URL(request.url);

  if (!card) {
    return Response.redirect(
      new URL(`${routes.carteCadeau}#formules`, base),
      303,
    );
  }

  const checkoutUrl = await createGiftCardCheckout(card, base.origin);
  return Response.redirect(
    checkoutUrl ?? new URL(`${routes.contact}#ecrire`, base),
    303,
  );
}
