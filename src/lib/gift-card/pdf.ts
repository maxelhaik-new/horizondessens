import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, type PDFFont, type PDFPage, rgb } from "pdf-lib";

import { site } from "@/lib/site";
import { formatDuration } from "@/services/format";

import { formatDateFr, type GiftCardOrder } from "./order";

/*
 * PDF de la carte cadeau, A5 paysage, à la charte du site : fond papier,
 * symbole du logo, titres en Instrument Serif italique, textes en Manrope,
 * panneau sombre pour le numéro, la validité et la réservation.
 * Polices (OFL, @fontsource) et symbole teinté : ./assets (le symbole est
 * généré par `npm run assets:brand`). Inclus dans le déploiement par
 * `outputFileTracingIncludes` (next.config.ts).
 * Pour passer plus tard sur un fond dessiné dans Canva : remplacer le
 * rectangle de fond par l'image du modèle (`embedPng`) et caler les champs.
 */

const ASSETS = path.join(process.cwd(), "src/lib/gift-card/assets");

const W = 595.28; // A5 paysage, en points
const H = 419.53;

const hex = (value: string) =>
  rgb(
    parseInt(value.slice(1, 3), 16) / 255,
    parseInt(value.slice(3, 5), 16) / 255,
    parseInt(value.slice(5, 7), 16) / 255,
  );
const C = {
  paper: hex("#fbf6f5"),
  blush: hex("#eed5ce"),
  night: hex("#1a110f"),
  ink: hex("#1a110f"),
  soft: hex("#525252"),
  accent: hex("#925443"),
  accentText: hex("#7a483a"),
  white: hex("#ffffff"),
};

let assets: Promise<Record<string, Uint8Array>> | undefined;
function loadAssets() {
  assets ??= (async () => {
    const files = {
      serifItalic: "instrument-serif-latin-400-italic.woff",
      sans: "manrope-latin-400-normal.woff",
      sansBold: "manrope-latin-600-normal.woff",
      symbol: "symbole.png",
    };
    const entries = await Promise.all(
      Object.entries(files).map(
        async ([key, file]) =>
          [key, await readFile(path.join(ASSETS, file))] as const,
      ),
    );
    return Object.fromEntries(entries);
  })();
  return assets;
}

/** Retire les caractères absents de la police (émojis…), normalise. */
function clean(text: string, font: PDFFont) {
  const supported = new Set(font.getCharacterSet());
  return Array.from(text.normalize("NFC"))
    .filter((ch) => supported.has(ch.codePointAt(0)!))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/** Découpe en lignes de largeur maximale ; tronque avec « … » au-delà. */
function wrap(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
  maxLines: number,
) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) line = next;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last && font.widthOfTextAtSize(`${last}…`, size) > maxWidth) {
      last = last.slice(0, -1);
    }
    kept[maxLines - 1] = `${last.trimEnd()}…`;
    return kept;
  }
  return lines;
}

/** Texte espacé (surtitres en capitales). */
function drawTracked(
  page: PDFPage,
  text: string,
  opts: {
    x: number;
    y: number;
    font: PDFFont;
    size: number;
    tracking: number;
    color: ReturnType<typeof rgb>;
    opacity?: number;
  },
) {
  let x = opts.x;
  for (const ch of text) {
    page.drawText(ch, { ...opts, x });
    x += opts.font.widthOfTextAtSize(ch, opts.size) + opts.tracking;
  }
}

function roundedRect(w: number, h: number, r: number) {
  return `M ${r} 0 H ${w - r} Q ${w} 0 ${w} ${r} V ${h - r} Q ${w} ${h} ${w - r} ${h} H ${r} Q 0 ${h} 0 ${h - r} V ${r} Q 0 0 ${r} 0 Z`;
}

export async function renderGiftCardPdf(order: GiftCardOrder) {
  const files = await loadAssets();
  // Dates du PDF = date d'achat (et non l'heure de génération).
  const pdf = await PDFDocument.create({ updateMetadata: false });
  pdf.setCreationDate(order.purchasedAt);
  pdf.setModificationDate(order.purchasedAt);
  pdf.setProducer(site.name);
  pdf.registerFontkit(fontkit);
  const [serifItalic, sans, sansBold] = await Promise.all([
    pdf.embedFont(files.serifItalic, { subset: true }),
    pdf.embedFont(files.sans, { subset: true }),
    pdf.embedFont(files.sansBold, { subset: true }),
  ]);
  const symbol = await pdf.embedPng(files.symbol);

  pdf.setTitle(`Carte cadeau ${site.name} · ${order.code}`);
  pdf.setAuthor(site.name);
  pdf.setCreator(site.name);
  pdf.setLanguage("fr-FR");

  const page = pdf.addPage([W, H]);
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.paper });

  /* ---------- Colonne gauche : marque, prestation, bénéficiaire ---------- */
  const x0 = 44;
  const colW = 300;

  page.drawImage(symbol, { x: x0, y: H - 44 - 26, width: 26, height: 26 });
  page.drawText(site.name, {
    x: x0 + 34,
    y: H - 44 - 19,
    size: 17,
    font: serifItalic,
    color: C.ink,
  });

  let y = H - 104;
  drawTracked(page, "CARTE CADEAU", {
    x: x0,
    y,
    font: sansBold,
    size: 7.5,
    tracking: 1.6,
    color: C.accentText,
  });

  y -= 44;
  const title = clean(order.title, serifItalic);
  const duration = formatDuration(order.durationMinutes);
  const titleSize = 50;
  page.drawText(title, {
    x: x0,
    y,
    size: titleSize,
    font: serifItalic,
    color: C.ink,
  });
  page.drawText(duration, {
    x: x0 + serifItalic.widthOfTextAtSize(title, titleSize) + 12,
    y,
    size: titleSize,
    font: serifItalic,
    color: C.accent,
  });

  y -= 36;
  drawTracked(page, "POUR", {
    x: x0,
    y,
    font: sansBold,
    size: 7,
    tracking: 1.4,
    color: C.accentText,
  });
  const recipientLines = wrap(
    clean(order.recipient, serifItalic),
    serifItalic,
    24,
    colW,
    2,
  );
  for (const line of recipientLines) {
    y -= 26;
    page.drawText(line, {
      x: x0,
      y,
      size: 24,
      font: serifItalic,
      color: C.ink,
    });
  }

  const from = clean(order.from, sans);
  if (from) {
    y -= 20;
    drawTracked(page, "DE LA PART DE", {
      x: x0,
      y,
      font: sansBold,
      size: 7,
      tracking: 1.4,
      color: C.accentText,
    });
    y -= 15;
    page.drawText(wrap(from, sans, 11.5, colW, 1)[0], {
      x: x0,
      y,
      size: 11.5,
      font: sans,
      color: C.ink,
    });
  }

  const message = clean(order.message, serifItalic);
  if (message) {
    // Autant de lignes que la place le permet, au-dessus de l'adresse.
    const lineHeight = 15.5;
    y -= 6;
    const maxLines = Math.max(1, Math.floor((y - 62) / lineHeight));
    const lines = wrap(`« ${message} »`, serifItalic, 12.5, colW, maxLines);
    for (const line of lines) {
      y -= lineHeight;
      page.drawText(line, {
        x: x0,
        y,
        size: 12.5,
        font: serifItalic,
        color: C.soft,
      });
    }
  }

  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
  page.drawText(address, {
    x: x0,
    y: 44,
    size: 8,
    font: sans,
    color: C.soft,
  });
  page.drawText(`${site.url.replace("https://", "")} · ${site.phone.display}`, {
    x: x0,
    y: 31,
    size: 8,
    font: sans,
    color: C.soft,
  });

  /* ---------- Panneau sombre : numéro, validité, réservation ---------- */
  const pW = 196;
  const pX = W - 18 - pW;
  const pTop = H - 18;
  page.drawSvgPath(roundedRect(pW, H - 36, 20), {
    x: pX,
    y: pTop,
    color: C.night,
  });

  const px = pX + 24;
  const pInner = pW - 48;
  const label = (text: string, at: number) =>
    drawTracked(page, text, {
      x: px,
      y: at,
      font: sansBold,
      size: 6.8,
      tracking: 1.3,
      color: C.white,
      opacity: 0.6,
    });

  let py = pTop - 44;
  label("NUMÉRO", py);
  py -= 20;
  drawTracked(page, order.code, {
    x: px,
    y: py,
    font: sansBold,
    size: 13.5,
    tracking: 0.8,
    color: C.white,
  });

  py -= 36;
  label("VALABLE JUSQU'AU", py);
  py -= 22;
  page.drawText(formatDateFr(order.validUntil), {
    x: px,
    y: py,
    size: 19,
    font: serifItalic,
    color: C.white,
  });

  py -= 36;
  label("ÉMISE LE", py);
  py -= 16;
  page.drawText(formatDateFr(order.purchasedAt), {
    x: px,
    y: py,
    size: 11,
    font: sans,
    color: C.white,
  });

  // Bas du panneau : comment réserver, conditions.
  let by = 140;
  label("POUR RÉSERVER", by);
  by -= 21;
  page.drawText(site.phone.display, {
    x: px,
    y: by,
    size: 19,
    font: serifItalic,
    color: C.white,
  });
  for (const line of wrap(
    `ou sur ${site.url.replace("https://", "")}/reserver, en indiquant ce numéro.`,
    sans,
    8,
    pInner,
    2,
  )) {
    by -= 12;
    page.drawText(line, {
      x: px,
      y: by,
      size: 8,
      font: sans,
      color: C.white,
      opacity: 0.75,
    });
  }
  let cy = 52;
  for (const line of wrap(
    "Carte nominative, utilisable en une fois pour la séance indiquée, non remboursable.",
    sans,
    6.8,
    pInner,
    3,
  ).reverse()) {
    page.drawText(line, {
      x: px,
      y: cy,
      size: 6.8,
      font: sans,
      color: C.white,
      opacity: 0.55,
    });
    cy += 9.5;
  }

  return pdf.save();
}

/** Nom du fichier joint et téléchargé. */
export function giftCardFileName(order: GiftCardOrder) {
  return `carte-cadeau-horizon-des-sens-${order.code}.pdf`;
}
