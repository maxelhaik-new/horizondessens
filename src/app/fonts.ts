import {
  Figtree,
  Hanken_Grotesk,
  Instrument_Sans,
  Instrument_Serif,
  Manrope,
  Source_Sans_3,
  Work_Sans,
  Young_Serif,
} from "next/font/google";
import localFont from "next/font/local";

/**
 * Titres : Sorts Mill Goudy (OFL, Barry Schwartz), romain et italique,
 * sous-ensemble latin. Choisie par Maxime le 26/11/2026 (remplace Instrument
 * Serif). Une seule graisse : le navigateur ne doit pas en synthétiser d'autre.
 */
export const fontSerif = localFont({
  src: [
    {
      path: "./fonts/sorts-mill-goudy/SortsMillGoudy-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/sorts-mill-goudy/SortsMillGoudy-Italic-latin.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-goudy",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * Textes et interface : Source Sans 3 (OFL, Adobe), variable 200–900, romain
 * et italique, sous-ensemble latin. Agrandie de 10 % (`size-adjust`) pour
 * retrouver la taille apparente de Manrope, l'ancienne police (hauteur d'x
 * 48,6 contre 54 à 100 px) : les tailles CSS du site ne changent pas.
 */
export const fontSans = localFont({
  src: [
    {
      path: "./fonts/source-sans-3/SourceSans3-latin.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "./fonts/source-sans-3/SourceSans3-Italic-latin.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  declarations: [{ prop: "size-adjust", value: "110%" }],
  variable: "--font-source-sans-3",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/**
 * Logo (nom « HORIZON DES SENS », en capitales) : Squatina Regular (Anaëlle
 * Turc, Louise Sansoldi, Julia Veljkovic, ESAD Valence ; licence OFL à
 * confirmer, voir `fonts/squatina/LICENSE.md`), choisie par Maxime le
 * 26/11/2026. Condensée : affichée à 125 % de la taille du logo. Hauteur des
 * capitales : 0,7 em (H de 0 à 700 sur 1000) : `LogoWordmark` cale le
 * symbole dessus.
 */
export const fontLogo = localFont({
  src: [{ path: "./fonts/squatina/Squatina-Regular.woff2", weight: "400" }],
  variable: "--font-squatina",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

/*
 * ⚠️ TEMPORAIRE (26/11/2026) : polices proposées par le sélecteur d'essais
 * (`src/components/trials/`). `preload: false` : leurs fichiers ne sont
 * téléchargés que si on les choisit dans le sélecteur. À retirer avec lui
 * (voir CONTEXTE.md §15).
 */
export const fontTrialInstrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--font-instrument-serif",
});
export const fontTrialManrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-manrope",
});
export const fontTrialSourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-essai-source-sans-3",
});
export const fontTrialFigtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-essai-figtree",
});
export const fontTrialInstrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-essai-instrument-sans",
});
export const fontTrialHanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-essai-hanken-grotesk",
});
export const fontTrialWorkSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-essai-work-sans",
});

export const fontTrialYoungSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-essai-young-serif",
});

/** Variables CSS des polices d'essai, à poser sur `<html>`. */
export const trialFontVariables = [
  fontTrialInstrumentSerif,
  fontTrialManrope,
  fontTrialSourceSans,
  fontTrialFigtree,
  fontTrialInstrumentSans,
  fontTrialHanken,
  fontTrialWorkSans,
  fontTrialYoungSerif,
]
  .map((f) => f.variable)
  .join(" ");
