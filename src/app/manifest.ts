import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/** Manifeste web : nom, couleurs et icônes (ajout à l'écran d'accueil). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Kobido et massage bien-être`,
    short_name: site.name,
    description:
      "Kobido et massages bien-être par Élodie Poirier, à Saint-Cyr-sur-Loire, près de Tours.",
    lang: "fr-FR",
    start_url: "/",
    display: "browser",
    background_color: "#f7ece9",
    theme_color: "#f7ece9",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
