import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // Racine explicite : un package-lock.json traîne dans ~/Documents.
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Photos remplacées depuis le CMS (bucket Supabase public).
    remotePatterns: [
      new URL(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://vlpevjffaqzvksjfknhk.supabase.co"}/storage/v1/object/public/**`,
      ),
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  // Anciennes URL du site PHP → nouvelles pages (308, conserve le SEO).
  // Voir docs/contenu/plan-du-site.md §4.
  async redirects() {
    return [
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/massage", destination: "/#soins", permanent: true },
      { source: "/massage-details", destination: "/#soins", permanent: true },
      {
        source: "/carte_cadeau",
        destination: "/carte-cadeau",
        permanent: true,
      },
      { source: "/fidelite", destination: "/#abonnement", permanent: true },
      { source: "/about-us", destination: "/le-salon", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/rdv", destination: "/reserver", permanent: true },
    ];
  },
};

export default nextConfig;
