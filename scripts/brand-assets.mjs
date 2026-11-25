/**
 * Génère les icônes (favicon.ico, icon.png, apple-icon.png) et les images de
 * partage (opengraph-image.jpg + .alt.txt) de chaque page, à partir du
 * symbole du logo et des photos de public/images/, ainsi que le symbole
 * teinté du PDF des cartes cadeaux.
 * Usage : npm run assets:brand (à relancer si le logo ou une photo change).
 */
import { createRequire } from "node:module";
import { writeFile, mkdir } from "node:fs/promises";
const root = process.cwd();
const require = createRequire(root + "/package.json");
const sharp = require("sharp");
const SYMBOL = root + "/public/images/logo/symbole.png";
const PAPER = "#f7ece9",
  MARK = "#925443";

async function tinted(size, color) {
  const alpha = await sharp(SYMBOL)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .extractChannel("alpha")
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 3, background: color },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}
async function icon(size, { rounded }) {
  const r = rounded ? Math.round(size * 0.22) : 0;
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${PAPER}"/></svg>`,
  );
  const inner = Math.round(size * 0.78);
  const mark = await tinted(inner, MARK);
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

// Open Graph 1200×630 : photo recadrée, dégradé bas, symbole clair
const og = [
  [
    "",
    "massages/header1.jpg",
    "Massage bien-être chez Horizon des Sens, à Saint-Cyr-sur-Loire près de Tours",
  ],
  [
    "kobido",
    "kobido/hero-plein.jpg",
    "Séance de Kobido, massage facial japonais, chez Horizon des Sens",
  ],
  [
    "massage-5-continents",
    "massages/dos-2.jpg",
    "Massage des 5 Continents chez Horizon des Sens, à Saint-Cyr-sur-Loire",
  ],
  [
    "massage-calme-et-harmonie",
    "soins/calme-et-harmonie.jpg",
    "Massage Calme et harmonie chez Horizon des Sens, à Saint-Cyr-sur-Loire",
  ],
  [
    "jambes-legeres-reflexologie-plantaire",
    "soins/jambes-legeres.jpg",
    "Massage Jambes légères et réflexologie plantaire chez Horizon des Sens",
  ],
  [
    "rituel-horizon",
    "ambiance/massage-dos.jpg",
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
    "massages/header1.jpg",
    "Horizon des Sens, Kobido et massage bien-être à Saint-Cyr-sur-Loire près de Tours",
  ]),
];
const W = 1200,
  H = 630;
const shade = Buffer.from(
  `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.55" stop-color="#1a110f" stop-opacity="0"/><stop offset="1" stop-color="#1a110f" stop-opacity="0.55"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`,
);
const mark = await tinted(96, "#fbf6f5");
for (const [dir, src, alt] of og) {
  const out = `${app}/${dir ? dir + "/" : ""}`;
  await mkdir(out, { recursive: true });
  const buf = await sharp(`${root}/public/images/${src}`)
    .resize(W, H, { fit: "cover", position: "attention" })
    .composite([{ input: shade }, { input: mark, left: 56, top: H - 96 - 48 }])
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await writeFile(out + "opengraph-image.jpg", buf);
  await writeFile(out + "opengraph-image.alt.txt", alt);
}
// Symbole teinté pour le PDF des cartes cadeaux (src/lib/gift-card/pdf.ts)
await writeFile(
  root + "/src/lib/gift-card/assets/symbole.png",
  await tinted(320, MARK),
);
console.log("ok");
