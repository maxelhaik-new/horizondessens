import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, type PDFFont, type PDFPage, rgb } from "pdf-lib";

import { site } from "@/lib/site";
import { formatDuration } from "@/services/format";

import { cardLayout as L, cardTagline } from "./card-face";
import { formatDateFr, type GiftCardOrder } from "./order";

/*
 * PDF de la carte cadeau, deux pages au format de la carte (210 × 137 mm) :
 *  1. le recto, identique au visuel des mockups du site : fond et dorure
 *     (logo, « Carte Cadeau ») en image (`carte-fond.jpg`, dessinée par
 *     `assets/carte-cadeau-incrustation/premium/dessin-carte-premium.py`),
 *     accroche, bénéficiaire et numéro en texte, aux positions de
 *     `card-layout.json` ;
 *  2. les détails, sur fond papier : logo, prestation, message, numéro,
 *     validité, réservation, conditions.
 * Polices du site (OFL) : Sorts Mill Goudy italique (titres), Source Sans 3
 * (textes). Logo encre : `npm run assets:brand`. Tout est dans ./assets,
 * inclus au déploiement par `outputFileTracingIncludes` (next.config.ts).
 */

const ASSETS = path.join(process.cwd(), "src/lib/gift-card/assets");

const W = 595.28; // 210 mm, au ratio de la carte (1530 × 1000)
const H = (W * L.height) / L.width;
/** Pixels de la carte → points du PDF. */
const k = W / L.width;

const hex = (value: string) =>
  rgb(
    parseInt(value.slice(1, 3), 16) / 255,
    parseInt(value.slice(3, 5), 16) / 255,
    parseInt(value.slice(5, 7), 16) / 255,
  );
const C = {
  paper: hex("#fbf6f5"),
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
      serifItalic: "goudy-italic.woff",
      sans: "source-sans-3-400.woff",
      sansBold: "source-sans-3-600.woff",
      cardFace: "carte-fond.jpg",
      logo: "logo-encre.png",
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

/** Largeur d'un texte espacé. */
function trackedWidth(
  text: string,
  font: PDFFont,
  size: number,
  tracking: number,
) {
  const chars = Array.from(text);
  return (
    chars.reduce((w, ch) => w + font.widthOfTextAtSize(ch, size), 0) +
    tracking * (chars.length - 1)
  );
}

/** Recto : le visuel de la carte, rempli. */
function drawFace(
  page: PDFPage,
  order: GiftCardOrder,
  fonts: { serifItalic: PDFFont; sans: PDFFont; sansBold: PDFFont },
) {
  const { serifItalic, sans, sansBold } = fonts;
  const y = (baseline: number) => H - baseline * k;

  // Accroche, centrée.
  const tagline = cardTagline(order.durationMinutes);
  const tSize = L.tagline.size * k;
  page.drawText(tagline, {
    x: L.tagline.cx * k - serifItalic.widthOfTextAtSize(tagline, tSize) / 2,
    y: y(L.tagline.baseline),
    size: tSize,
    font: serifItalic,
    color: hex(L.tagline.color),
    opacity: L.tagline.opacity,
  });

  // « OFFERT À »
  const label = L.recipientLabel;
  drawTracked(page, label.text, {
    x: label.x * k,
    y: y(label.baseline),
    font: sansBold,
    size: label.size * k,
    tracking: label.tracking * k,
    color: hex(label.color),
    opacity: label.opacity,
  });

  // Bénéficiaire : réduit jusqu'à `minSize` pour tenir, puis tronqué.
  const r = L.recipient;
  const recipient = clean(order.recipient, serifItalic);
  const maxWidth = r.maxWidth * k;
  let size = r.size * k;
  while (
    size > r.minSize * k &&
    serifItalic.widthOfTextAtSize(recipient, size) > maxWidth
  ) {
    size -= 0.5;
  }
  page.drawText(wrap(recipient, serifItalic, size, maxWidth, 1)[0] ?? "", {
    x: r.x * k,
    y: y(r.baseline),
    size,
    font: serifItalic,
    color: hex(r.color),
  });

  // Numéro, aligné à droite.
  const c = L.code;
  const code = `N° ${order.code}`;
  const cSize = c.size * k;
  drawTracked(page, code, {
    x: c.right * k - trackedWidth(code, sans, cSize, c.tracking * k),
    y: y(c.baseline),
    font: sans,
    size: cSize,
    tracking: c.tracking * k,
    color: hex(c.color),
    opacity: c.opacity,
  });
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
  const [cardFace, logo] = await Promise.all([
    pdf.embedJpg(files.cardFace),
    pdf.embedPng(files.logo),
  ]);

  pdf.setTitle(`Carte cadeau ${site.name} · ${order.code}`);
  pdf.setAuthor(site.name);
  pdf.setCreator(site.name);
  pdf.setLanguage("fr-FR");

  /* ---------- Page 1 : recto ---------- */
  const face = pdf.addPage([W, H]);
  face.drawImage(cardFace, { x: 0, y: 0, width: W, height: H });
  drawFace(face, order, { serifItalic, sans, sansBold });

  /* ---------- Page 2 : détails ---------- */
  const page = pdf.addPage([W, H]);
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.paper });

  // Colonne gauche : marque, prestation, bénéficiaire
  const x0 = 40;
  const colW = 300;

  const logoW = 150;
  const logoH = (logoW * logo.height) / logo.width;
  page.drawImage(logo, {
    x: x0,
    y: H - 38 - logoH,
    width: logoW,
    height: logoH,
  });

  let y = H - 96;
  drawTracked(page, "CARTE CADEAU", {
    x: x0,
    y,
    font: sansBold,
    size: 7.5,
    tracking: 1.6,
    color: C.accentText,
  });

  y -= 42;
  const title = clean(order.title, serifItalic);
  const duration = formatDuration(order.durationMinutes);
  const titleSize = 46;
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

  y -= 32;
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
    22,
    colW,
    2,
  );
  for (const line of recipientLines) {
    y -= 24;
    page.drawText(line, {
      x: x0,
      y,
      size: 22,
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
    y: 42,
    size: 8,
    font: sans,
    color: C.soft,
  });
  page.drawText(`${site.url.replace("https://", "")} · ${site.phone.display}`, {
    x: x0,
    y: 30,
    size: 8,
    font: sans,
    color: C.soft,
  });

  /* Panneau sombre : numéro, validité, réservation */
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

  let py = pTop - 40;
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

  py -= 34;
  label("VALABLE JUSQU'AU", py);
  py -= 22;
  page.drawText(formatDateFr(order.validUntil), {
    x: px,
    y: py,
    size: 19,
    font: serifItalic,
    color: C.white,
  });

  py -= 32;
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
  let by = 132;
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
  let cy = 46;
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
