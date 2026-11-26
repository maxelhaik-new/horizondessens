import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import fontkitModule from "@pdf-lib/fontkit";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { cardLayout as L, cardTagline } from "@/lib/gift-card/card-face";
import type { GiftCardOrder } from "@/lib/gift-card/order";
import { site } from "@/lib/site";

/*
 * Recto de la carte cadeau en HTML (page de remerciement) : même fond que le
 * PDF (`public/images/carte-cadeau/carte-fond.jpg`, dessiné par
 * `dessin-carte-premium.py`) et textes en SVG aux positions de
 * `card-layout.json` (lignes de base exactes). Source Sans 3 est agrandie de
 * 10 % sur le site (`size-adjust`) : ses tailles sont divisées d'autant ici.
 */

const SANS_ADJUST = 1.1;

let goudyItalic: Promise<{ unitsPerEm: number; widthOf(s: string): number }>;
function measurer() {
  goudyItalic ??= readFile(
    path.join(process.cwd(), "src/lib/gift-card/assets/goudy-italic.woff"),
  ).then((buf) => {
    const font = fontkitModule.create(buf);
    return {
      unitsPerEm: font.unitsPerEm,
      widthOf: (s: string) => font.layout(s).advanceWidth,
    };
  });
  return goudyItalic;
}

/**
 * Nom : réduit jusqu'à `minSize` pour tenir, puis tronqué avec « … »,
 * comme dans le PDF.
 */
async function fitRecipient(name: string) {
  const { unitsPerEm, widthOf } = await measurer();
  const r = L.recipient;
  const width = (s: string, size: number) => (widthOf(s) / unitsPerEm) * size;
  const full = width(name, r.size);
  if (full <= r.maxWidth) return { size: r.size, text: name };
  const size = Math.max(r.minSize, (r.size * r.maxWidth) / full);
  let text = name;
  while (text.length > 1 && width(text, size) > r.maxWidth) {
    text = `${text.slice(0, -2).trimEnd()}…`;
  }
  return { size, text };
}

export async function GiftCardFace({
  order,
  className,
}: {
  order: GiftCardOrder;
  className?: string;
}) {
  const name = await fitRecipient(order.recipient);
  const serif = { fontFamily: "var(--font-serif)", fontStyle: "italic" };
  const sans = { fontFamily: "var(--font-sans)" };
  return (
    <div
      className={cn(
        "relative aspect-[1530/1000] w-full overflow-hidden rounded-2xl shadow-soft",
        className,
      )}
    >
      <Image
        src="/images/carte-cadeau/carte-fond.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
      <svg
        viewBox={`0 0 ${L.width} ${L.height}`}
        className="absolute inset-0 size-full"
        role="img"
        aria-label={`Carte cadeau ${site.name}, ${cardTagline(order.durationMinutes)}, offerte à ${order.recipient}, numéro ${order.code}`}
      >
        <text
          x={L.tagline.cx}
          y={L.tagline.baseline}
          textAnchor="middle"
          fontSize={L.tagline.size}
          fill={L.tagline.color}
          fillOpacity={L.tagline.opacity}
          style={serif}
        >
          {cardTagline(order.durationMinutes)}
        </text>
        <text
          x={L.recipientLabel.x}
          y={L.recipientLabel.baseline}
          fontSize={L.recipientLabel.size / SANS_ADJUST}
          fontWeight={600}
          letterSpacing={L.recipientLabel.tracking}
          fill={L.recipientLabel.color}
          fillOpacity={L.recipientLabel.opacity}
          style={sans}
        >
          {L.recipientLabel.text}
        </text>
        <text
          x={L.recipient.x}
          y={L.recipient.baseline}
          fontSize={name.size}
          fill={L.recipient.color}
          style={serif}
        >
          {name.text}
        </text>
        <text
          x={L.code.right}
          y={L.code.baseline}
          textAnchor="end"
          fontSize={L.code.size / SANS_ADJUST}
          letterSpacing={L.code.tracking}
          fill={L.code.color}
          fillOpacity={L.code.opacity}
          style={sans}
        >
          N° {order.code}
        </text>
      </svg>
    </div>
  );
}
