import { getGiftCard } from "@/lib/gift-cards";

/*
 * Point d'entrée du paiement d'une carte cadeau (formulaire POST des
 * boutons « Offrir cette carte »).
 *
 * v1 : Stripe n'est pas encore branché → redirection vers la page Contact.
 * À brancher (voir CONTEXTE.md §15, « Cartes cadeaux ») : créer ici une
 * session Stripe Checkout (prix de `getGiftCard`, champ personnalisé « nom
 * du ou de la bénéficiaire », e-mail de l'acheteur), puis rediriger (303)
 * vers `session.url`. Le webhook générera et enverra le PDF.
 */
export async function POST(request: Request) {
  const form = await request.formData();
  const id = form.get("carte");
  const card = typeof id === "string" ? await getGiftCard(id) : undefined;
  const base = new URL(request.url);

  if (!card) return Response.redirect(new URL("/carte-cadeau", base), 303);

  // En attendant Stripe : la personne écrit à Élodie pour commander.
  return Response.redirect(new URL("/contact#ecrire", base), 303);
}
