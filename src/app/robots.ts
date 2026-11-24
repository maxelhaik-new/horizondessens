import type { MetadataRoute } from "next";

import { routes } from "@/lib/navigation";
import { isIndexable } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * robots.txt. Hors du vrai domaine de production (aperçus Vercel,
 * *.vercel.app avant la bascule), tout est fermé aux robots.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        routes.carteCadeauCommander,
        routes.carteCadeauMerci,
        routes.carteCadeauPdf,
        "/admin",
        "/api/",
      ],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
