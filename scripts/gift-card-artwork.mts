/**
 * Exemples de cartes cadeaux remplies (recto du PDF en PNG) (nom, petit mot, numéro…), pour les
 * incruster dans les mockups « main qui tient une carte » de la page Carte
 * cadeau. Ils passent par le vrai générateur du PDF client
 * (src/lib/gift-card/pdf.ts) : le visuel est toujours celui que les clients
 * reçoivent. Données fictives.
 * Sorties : assets/carte-cadeau-incrustation/*.pdf et *.png (3 000 px).
 * Usage : npx tsx --conditions=react-server scripts/gift-card-artwork.mts
 */
import { execFileSync } from "node:child_process";
import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { addMonths, type GiftCardOrder } from "@/lib/gift-card/order";
import { renderGiftCardPdf } from "@/lib/gift-card/pdf";

const OUT = path.join(process.cwd(), "assets/carte-cadeau-incrustation");
const purchasedAt = new Date(Date.UTC(2026, 10, 24, 10));

const base: GiftCardOrder = {
  sessionId: "exemple",
  paymentIntentId: null,
  code: "HDS-7K3M-Q9PX",
  title: "Séance",
  durationMinutes: 75,
  priceEuros: 120,
  recipient: "",
  from: "",
  message: "",
  buyerName: "",
  buyerEmail: "",
  purchasedAt,
  validUntil: addMonths(purchasedAt, 6),
  sent: true,
};

const examples: [file: string, order: GiftCardOrder][] = [
  [
    "exemple-carte-seance-1h15",
    {
      ...base,
      recipient: "Marie Dupont",
      from: "Camille et Théo",
      message:
        "Joyeux anniversaire ! Une heure et quart rien que pour toi, pour prendre soin de toi et souffler un peu.",
    },
  ],
  [
    "exemple-carte-seance-1h",
    {
      ...base,
      code: "HDS-4R8T-WN2C",
      durationMinutes: 60,
      priceEuros: 100,
      recipient: "Claire Martin",
      from: "Julien",
      message: "Pour une parenthèse de douceur. Avec tout mon amour.",
    },
  ],
];

await mkdir(OUT, { recursive: true });
for (const [file, order] of examples) {
  const pdfPath = path.join(OUT, `${file}.pdf`);
  await writeFile(pdfPath, await renderGiftCardPdf(order));
  // PNG haute définition (rendu macOS Quick Look), pour Figma ou Photoshop.
  execFileSync("qlmanage", ["-t", "-s", "3000", "-o", OUT, pdfPath], {
    stdio: "ignore",
  });
  await rename(`${pdfPath}.png`, path.join(OUT, `${file}.png`));
}
await rm(path.join(OUT, ".DS_Store"), { force: true });
console.log("ok →", path.relative(process.cwd(), OUT));
