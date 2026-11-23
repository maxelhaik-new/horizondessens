import type { Metadata } from "next";

import { site } from "@/lib/site";

import "./globals.css";

// Polices : à définir avec le design (next/font), puis exposer en variables CSS
// et les déclarer dans le @theme de globals.css.

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
