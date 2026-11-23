import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/lib/site";

import { fontSans, fontSerif } from "./fonts";
import "./globals.css";

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

export const viewport: Viewport = {
  themeColor: "#f7ece9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fontSerif.variable} ${fontSans.variable} antialiased`}
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
        </SmoothScroll>
      </body>
    </html>
  );
}
