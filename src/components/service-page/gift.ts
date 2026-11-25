import { routes } from "@/lib/navigation";
import { servicePages, type ServicePageSlug } from "@/services/pages";

/** Lien « Offrir » d'un soin : achat en ligne, ou demande par le formulaire. */
export function giftLink(slug: ServicePageSlug) {
  return servicePages[slug].gift === "online"
    ? { href: routes.carteCadeau, label: "Offrir ce massage" }
    : {
        href: `${routes.contact}#ecrire`,
        label: "Offrir ce massage, sur demande",
      };
}
