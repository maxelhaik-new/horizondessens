import { routes } from "@/lib/navigation";

/**
 * Lien « Offrir » d'une page de soin : la carte cadeau est généraliste
 * (une séance d'1h ou d'1h15, pour le soin de son choix), achetée en ligne.
 */
export function giftLink() {
  return { href: routes.carteCadeau, label: "Offrir ce massage" };
}
