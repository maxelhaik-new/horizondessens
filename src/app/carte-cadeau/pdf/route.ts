import { getPaidGiftCardOrder } from "@/lib/gift-card/order";
import { giftCardFileName, renderGiftCardPdf } from "@/lib/gift-card/pdf";

/*
 * Téléchargement du PDF d'une carte cadeau payée, depuis la page de
 * confirmation (`?session_id=`, identifiant de session Stripe, non
 * devinable). Le PDF est régénéré à la demande, rien n'est stocké.
 */
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id") ?? "";
  const order = await getPaidGiftCardOrder(sessionId);
  if (!order) return new Response("Carte introuvable", { status: 404 });

  const pdf = await renderGiftCardPdf(order);
  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${giftCardFileName(order)}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
