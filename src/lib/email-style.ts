import "server-only";

/*
 * Charte des e-mails (HTML en tableaux et styles en ligne, compatibles
 * Gmail, Outlook et Apple Mail) : couleurs du site, polices de repli,
 * échappement des saisies.
 */

export const emailColors = {
  paper: "#f7ece9",
  card: "#fbf6f5",
  blush: "#eed5ce",
  ink: "#1a110f",
  soft: "#525252",
  accent: "#7a483a",
  line: "#eadcd8",
};
export const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
export const SANS =
  "Manrope, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
