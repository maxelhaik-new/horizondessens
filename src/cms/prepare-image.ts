/**
 * Prépare une photo avant envoi : orientation corrigée, plus grand côté
 * ramené à 2400 px, compression WebP (JPEG si le navigateur ne sait pas).
 * next/image produit ensuite les tailles AVIF/WebP adaptées à chaque écran.
 */
const MAX_SIDE = 2400;
const QUALITY = 0.84;

export class ImageFormatError extends Error {}

export async function prepareImage(
  file: File,
): Promise<{ blob: Blob; extension: string; width: number; height: number }> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new ImageFormatError(
      "Format non pris en charge. Utilisez une photo JPG, PNG ou WebP.",
    );
  }

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas indisponible");
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const toBlob = (type: string) =>
    new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, type, QUALITY),
    );
  const webp = await toBlob("image/webp");
  if (webp?.type === "image/webp")
    return { blob: webp, extension: "webp", width, height };
  const jpeg = await toBlob("image/jpeg");
  if (!jpeg) throw new Error("Compression impossible");
  return { blob: jpeg, extension: "jpg", width, height };
}

/** « 4:5 » → libellé lisible pour Élodie. */
export function describeRatio(ratio: string): string {
  const [w, h] = ratio.split(":").map(Number);
  if (!w || !h) return ratio;
  if (Math.abs(w - h) < 0.01) return `carrée (${ratio})`;
  return w > h ? `paysage (${ratio})` : `portrait (${ratio})`;
}
