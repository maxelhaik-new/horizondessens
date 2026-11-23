import { Instrument_Serif, Manrope } from "next/font/google";

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
