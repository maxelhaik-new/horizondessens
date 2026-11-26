import "server-only";

import { site } from "@/lib/site";

/*
 * Charte des e-mails (HTML en tableaux et styles en ligne, compatibles
 * Gmail, Outlook et Apple Mail) : couleurs, polices et logo du site,
 * échappement des saisies.
 *
 * Polices : Sorts Mill Goudy (titres) et Source Sans 3 (textes), servies par
 * le site (`public/fonts/email/`). Apple Mail et iOS les affichent ; Gmail et
 * Outlook prennent les polices de repli.
 * Logo : `public/images/email/logo-horizon-des-sens.png` (`npm run assets:brand`).
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
export const SERIF = "'Sorts Mill Goudy', Georgia, 'Times New Roman', serif";
export const SANS =
  "'Source Sans 3', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

/**
 * Adresse publique du site pour les images et les polices des e-mails :
 * le domaine de production Vercel (aujourd'hui horizondessens.vercel.app,
 * horizondessens.fr après la bascule), sinon `site.url`.
 */
export function emailAssetOrigin() {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return host ? `https://${host}` : site.url;
}

/** `<head>` commun : encodage, viewport, titre et polices du site. */
export function emailHead(title: string) {
  const o = emailAssetOrigin();
  return `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<style>
@font-face{font-family:'Sorts Mill Goudy';font-style:normal;font-weight:400;src:url(${o}/fonts/email/SortsMillGoudy-latin.woff2) format('woff2')}
@font-face{font-family:'Sorts Mill Goudy';font-style:italic;font-weight:400;src:url(${o}/fonts/email/SortsMillGoudy-Italic-latin.woff2) format('woff2')}
@font-face{font-family:'Source Sans 3';font-style:normal;font-weight:200 900;size-adjust:110%;src:url(${o}/fonts/email/SourceSans3-latin.woff2) format('woff2')}
</style></head>`;
}

/** Logo (symbole + nom), 240 px de large. */
export function emailLogo() {
  return `<img src="${emailAssetOrigin()}/images/email/logo-horizon-des-sens.png" width="240" height="40" alt="${esc(site.name)}" style="display:block;border:0;outline:none;width:240px;height:auto;font:500 16px/1 ${SANS};letter-spacing:.06em;text-transform:uppercase;color:${emailColors.ink}">`;
}

export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
