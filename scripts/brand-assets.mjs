/**
 * Logo et dérivés de la marque, à partir de deux sources :
 *  - le symbole « soleil sur l'horizon » (public/images/logo/symbole-soleil.svg) ;
 *  - la police du logo, Squatina (src/app/fonts/squatina/), dont le nom
 *    « HORIZON DES SENS » est converti en tracés (pas de police à installer).
 *
 * L'assemblage reprend exactement celui du site (`LogoWordmark`) : haut des
 * rayons = haut des capitales, ligne d'horizon = ligne de base, reflet en
 * dessous, espace de 0,62 hauteur de capitale, interlettrage 0,024 em.
 *
 * Génère : le logo vectoriel (public/images/logo/logo-horizon-des-sens.svg),
 * les icônes, les images de partage de chaque page, le logo des e-mails, les
 * logos du PDF des cartes cadeaux et le masque du visuel de la carte.
 * Usage : npm run assets:brand (à relancer si le logo ou une photo change).
 */
import { createRequire } from "node:module";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const root = process.cwd();
const require = createRequire(root + "/package.json");
const sharp = require("sharp");
const fontkitModule = require("@pdf-lib/fontkit");
const fontkit = fontkitModule.default ?? fontkitModule;

const PAPER = "#f7ece9",
  INK = "#1a110f",
  MARK = "#925443";

/* ---------- Symbole ---------- */
const SYMBOL_SVG = await readFile(
  root + "/public/images/logo/symbole-soleil.svg",
  "utf8",
);
// Cadre du dessin (viewBox) et repères : horizon à 1044, bas du reflet à 1540.
const SYM = { viewBox: "11 10 1866 1540", w: 1866, h: 1540, horizon: 1044 };
const symbolInner = SYMBOL_SVG.replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/fill="[^"]*"/g, 'fill="currentColor"');

/** Symbole seul, `crop` = sans le reflet (petites tailles). */
function symbolSvg(color, { crop = false } = {}) {
  const h = crop ? SYM.horizon + 4 : SYM.h;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="11 10 ${SYM.w} ${h}" width="${SYM.w}" height="${h}" color="${color}">${symbolInner}</svg>`;
}

/* ---------- Nom : Squatina en tracés ---------- */
const font = fontkit.create(
  await readFile(root + "/src/app/fonts/squatina/Squatina-Regular.woff2"),
);
const CAP = font.capHeight; // 700 / 1000
const TRACK = 24; // 0,03 em de la taille du logo = 0,024 em de Squatina (×1,25)
const run = font.layout("HORIZON DES SENS");
let pen = 0;
const glyphPaths = run.glyphs.map((g, i) => {
  const d = g.path.toSVG();
  const x = pen;
  pen += run.positions[i].xAdvance + TRACK;
  return `<path transform="translate(${x} ${CAP}) scale(1 -1)" d="${d}"/>`;
});
const textWidth = pen - TRACK;

/* ---------- Assemblage (unités : 1/1000 de la taille de Squatina) ---------- */
const symH = (CAP * SYM.h) / SYM.horizon;
const symW = (symH * SYM.w) / SYM.h;
const GAP = 0.62 * CAP;
export const LOCKUP = {
  width: Math.ceil(symW + GAP + textWidth),
  height: Math.ceil(symH),
  /** Ligne de base du nom, depuis le haut. */
  baseline: CAP,
};
function lockupSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOCKUP.width} ${LOCKUP.height}" width="${LOCKUP.width}" height="${LOCKUP.height}" color="${color}" role="img" aria-label="Horizon des Sens">
<svg x="0" y="0" width="${symW.toFixed(2)}" height="${symH.toFixed(2)}" viewBox="${SYM.viewBox}">${symbolInner}</svg>
<g fill="currentColor" transform="translate(${(symW + GAP).toFixed(2)} 0)">${glyphPaths.join("")}</g>
</svg>`;
}
/** Rend un SVG en PNG d'une largeur donnée. */
const png = (svg, width) =>
  sharp(Buffer.from(svg), { density: 300 }).resize({ width }).png().toBuffer();

// Logo vectoriel (couleur courante) et PNG de travail.
await writeFile(
  root + "/public/images/logo/logo-horizon-des-sens.svg",
  lockupSvg("currentColor").replace(/ color="currentColor"/, "") + "\n",
);
await writeFile(
  root + "/assets/logo/logo-horizon-des-sens-noir.png",
  await png(lockupSvg(INK), 3000),
);
await writeFile(
  root + "/assets/logo/logo-horizon-des-sens-blanc.png",
  await png(lockupSvg("#ffffff"), 3000),
);

/* ---------- Icônes : symbole sur fond papier ---------- */
async function icon(size, { rounded }) {
  const r = rounded ? Math.round(size * 0.22) : 0;
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${PAPER}"/></svg>`,
  );
  // Sous 64 px, le reflet se brouille : symbole sans reflet, plus grand.
  const small = size < 64;
  const inner = Math.round(size * (small ? 0.84 : 0.72));
  const mark = await sharp(Buffer.from(symbolSvg(MARK, { crop: small })), {
    density: 600,
  })
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  const off = Math.round((size - inner) / 2);
  return sharp(bg)
    .composite([{ input: mark, left: off, top: off }])
    .png()
    .toBuffer();
}
// ICO with embedded PNGs
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const dirs = [];
  for (const { size, buf } of pngs) {
    const d = Buffer.alloc(16);
    d.writeUInt8(size >= 256 ? 0 : size, 0);
    d.writeUInt8(size >= 256 ? 0 : size, 1);
    d.writeUInt16LE(1, 4);
    d.writeUInt16LE(32, 6);
    d.writeUInt32LE(buf.length, 8);
    d.writeUInt32LE(offset, 12);
    offset += buf.length;
    dirs.push(d);
  }
  return Buffer.concat([header, ...dirs, ...pngs.map((p) => p.buf)]);
}
const app = root + "/src/app";
await writeFile(app + "/icon.png", await icon(512, { rounded: true }));
await writeFile(app + "/apple-icon.png", await icon(180, { rounded: false }));
await writeFile(
  app + "/favicon.ico",
  ico(
    await Promise.all(
      [16, 32, 48].map(async (s) => ({
        size: s,
        buf: await icon(s, { rounded: true }),
      })),
    ),
  ),
);

// Open Graph 1200×630 : photo recadrée, dégradé bas, logo complet en blanc
const og = [
  [
    "",
    "massages/visage-6.jpg",
    "Massage bien-être chez Horizon des Sens, à Saint-Cyr-sur-Loire près de Tours",
  ],
  [
    "kobido",
    "massages/visage-hero.jpg",
    "Séance de Kobido, massage facial japonais, chez Horizon des Sens",
  ],
  [
    "massage-5-continents",
    "massages/dos-hero.jpg",
    "Massage des 5 Continents chez Horizon des Sens, à Saint-Cyr-sur-Loire",
  ],
  [
    "massage-calme-et-harmonie",
    "massages/visage-7.jpg",
    "Massage Calme et harmonie chez Horizon des Sens, à Saint-Cyr-sur-Loire",
  ],
  [
    "jambes-legeres-reflexologie-plantaire",
    "massages/pieds.jpg",
    "Massage Jambes légères et réflexologie plantaire chez Horizon des Sens",
  ],
  [
    "rituel-horizon",
    "massages/trapeze-hero.jpg",
    "Rituel Horizon, massage sur mesure chez Horizon des Sens",
  ],
  [
    "le-salon",
    "salon/salle-loire.jpg",
    "Le salon d'Horizon des Sens, face à la Loire à Saint-Cyr-sur-Loire",
  ],
  [
    "carte-cadeau",
    "carte-cadeau/main-carte-1.jpg",
    "Carte cadeau Horizon des Sens tenue en main",
  ],
  [
    "reserver",
    "massages/nuque.jpg",
    "Réserver un soin chez Horizon des Sens, à Saint-Cyr-sur-Loire",
  ],
  [
    "contact",
    "salon/fenetre-loire.jpg",
    "Vue sur la Loire depuis le salon Horizon des Sens",
  ],
  ...["mentions-legales", "cgv", "confidentialite"].map((dir) => [
    dir,
    "salon/loire-couchant.jpg",
    "Horizon des Sens, Kobido et massage bien-être à Saint-Cyr-sur-Loire près de Tours",
  ]),
];
const W = 1200,
  H = 630;
const shade = Buffer.from(
  `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.5" stop-color="#1a110f" stop-opacity="0"/><stop offset="1" stop-color="#1a110f" stop-opacity="0.6"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`,
);
// Logo : 340 px de large, à 56 px du bord gauche, ligne de base à 64 px du bas.
const ogLogoWidth = 340;
const ogLogo = await png(lockupSvg("#fbf6f5"), ogLogoWidth);
const ogScale = ogLogoWidth / LOCKUP.width;
const ogTop = Math.round(H - 64 - LOCKUP.baseline * ogScale);
for (const [dir, src, alt] of og) {
  const out = `${app}/${dir ? dir + "/" : ""}`;
  await mkdir(out, { recursive: true });
  const buf = await sharp(`${root}/public/images/${src}`)
    .resize(W, H, { fit: "cover", position: "attention" })
    .composite([{ input: shade }, { input: ogLogo, left: 56, top: ogTop }])
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await writeFile(out + "opengraph-image.jpg", buf);
  await writeFile(out + "opengraph-image.alt.txt", alt);
}

/* ---------- E-mails : logo encre, ×3 (affiché à 240 px de large) ---------- */
await mkdir(root + "/public/images/email", { recursive: true });
await writeFile(
  root + "/public/images/email/logo-horizon-des-sens.png",
  await png(lockupSvg(INK), 720),
);

/* ---------- PDF des cartes cadeaux (src/lib/gift-card/pdf.ts) ---------- */
// Logo encre (page de détails) et masque blanc du visuel de la carte
// (assets/carte-cadeau-incrustation/premium/dessin-carte-premium.py).
await writeFile(
  root + "/src/lib/gift-card/assets/logo-encre.png",
  await png(lockupSvg(INK), 1600),
);
await writeFile(
  root + "/assets/carte-cadeau-incrustation/premium/logo-masque.png",
  await png(lockupSvg("#ffffff"), 3000),
);
console.log("ok", LOCKUP);
