import { Instrument_Serif, Manrope } from "next/font/google";
import localFont from "next/font/local";

/** Titres : serif éditorial (comme Serelin). */
export const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/** Textes et interface. */
export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

/**
 * Logo (nom « Horizon des Sens ») : LT Superior Serif (licence OFL, fichiers
 * dans `fonts/lt-superior-serif/`, sous-ensemble latin). Essai du 26/11/2026,
 * pour ne plus dessiner le logo en Instrument Serif comme les titres.
 */
export const fontLogo = localFont({
  src: [
    {
      path: "./fonts/lt-superior-serif/LTSuperiorSerif-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/lt-superior-serif/LTSuperiorSerif-Medium.woff2",
      weight: "500",
    },
  ],
  variable: "--font-lt-superior-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});
