import type { ServiceVariant } from "@/services/types";

import { site } from "./site";

/**
 * Liens vers la réservation SimplyBook.
 *
 * Chaque variante de soin porte les IDs de sa prestation SimplyBook
 * (`simplybook`, dans `local-services.ts` puis l'API) : le bouton ouvre
 * directement le calendrier de cette prestation. Sans IDs, il ouvre la page
 * de réservation générale.
 */
export function bookingHref(variant?: Pick<ServiceVariant, "simplybook">) {
  const base = `${site.booking.simplybookUrl}/v2/`;
  const sb = variant?.simplybook;
  return sb
    ? `${base}#book/category/${sb.category}/service/${sb.service}/count/1/provider/any/`
    : base;
}
