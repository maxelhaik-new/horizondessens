import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import { CmsEditorRoot } from "@/cms/editor-root";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { isIndexable, siteGraph } from "@/lib/seo";
import { site } from "@/lib/site";

import { fontLogo, fontSans, fontSerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description:
    "Kobido et massages bien-être par Élodie Poirier, au bord de la Loire à Saint-Cyr-sur-Loire, près de Tours.",
  applicationName: site.name,
  authors: [{ name: site.practitioner, url: site.url }],
  creator: site.legal.developer.name,
  publisher: site.name,
  category: "Bien-être",
  formatDetection: { telephone: false, email: false, address: false },
  robots: isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: site.name },
};

export const viewport: Viewport = {
  themeColor: "#f7ece9",
  // Plein écran jusque sous l'encoche ; les éléments fixés en bas
  // (barre « Réserver ») tiennent compte de `safe-area-inset-bottom`.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fontSerif.variable} ${fontSans.variable} ${fontLogo.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#contenu"
          className="sr-only z-[60] rounded-full bg-night px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <SmoothScroll>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </SmoothScroll>
        <JsonLd data={siteGraph} />
        <Suspense>
          <CmsEditorRoot />
        </Suspense>
      </body>
    </html>
  );
}
