import { contentDefaults } from "./defaults";
import { contentFields, type ContentKey } from "./registry";
import type { FieldDef } from "./schema";

/** Problème de conformité d'une valeur par rapport à son champ. */
export type ContentIssue = { key: string; message: string };

/**
 * Vérifie qu'une valeur respecte les contraintes de son champ
 * (longueurs max, nombre d'éléments, texte alternatif des images).
 * Sert aux valeurs par défaut (`npm run content:check`) et, plus tard,
 * à la validation côté serveur des saisies du CMS.
 */
export function validateField(
  key: string,
  def: FieldDef,
  value: unknown,
): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const fail = (message: string) => issues.push({ key, message });

  switch (def.type) {
    case "text":
    case "textarea": {
      if (typeof value !== "string") return [{ key, message: "texte attendu" }];
      if (value.length > def.maxLength)
        fail(`${value.length} caractères (max ${def.maxLength})`);
      if (def.type === "text" && value.includes("\n"))
        fail("retour à la ligne interdit dans un champ une ligne");
      break;
    }
    case "list": {
      if (!Array.isArray(value)) return [{ key, message: "liste attendue" }];
      if (value.length > def.maxItems)
        fail(`${value.length} éléments (max ${def.maxItems})`);
      value.forEach((item, i) => {
        if (typeof item !== "string") fail(`élément ${i + 1} : texte attendu`);
        else if (item.length > def.itemMaxLength)
          fail(
            `élément ${i + 1} : ${item.length} caractères (max ${def.itemMaxLength})`,
          );
      });
      break;
    }
    case "items": {
      if (!Array.isArray(value)) return [{ key, message: "liste attendue" }];
      if (value.length > def.maxItems)
        fail(`${value.length} éléments (max ${def.maxItems})`);
      value.forEach((item, i) => {
        for (const [name, sub] of Object.entries(def.fields)) {
          const text = (item as Record<string, unknown>)?.[name];
          if (typeof text !== "string") {
            fail(`élément ${i + 1} · ${name} : texte attendu`);
          } else {
            if (text.length > sub.maxLength)
              fail(
                `élément ${i + 1} · ${name} : ${text.length} caractères (max ${sub.maxLength})`,
              );
            if (!sub.multiline && text.includes("\n"))
              fail(`élément ${i + 1} · ${name} : retour à la ligne interdit`);
          }
        }
      });
      break;
    }
    case "image": {
      checkImage(value, def.altMaxLength, "", fail);
      break;
    }
    case "gallery": {
      if (!Array.isArray(value)) return [{ key, message: "liste attendue" }];
      if (value.length === 0) fail("galerie vide");
      if (value.length > def.maxItems)
        fail(`${value.length} images (max ${def.maxItems})`);
      value.forEach((item, i) => {
        checkImage(item, def.altMaxLength, `image ${i + 1} · `, fail);
        const caption = (item as { caption?: unknown })?.caption;
        if (def.captionMaxLength) {
          if (typeof caption !== "string")
            fail(`image ${i + 1} · légende : texte attendu`);
          else if (caption.length > def.captionMaxLength)
            fail(
              `image ${i + 1} · légende : ${caption.length} caractères (max ${def.captionMaxLength})`,
            );
        }
      });
      break;
    }
  }
  return issues;
}

function checkImage(
  value: unknown,
  altMaxLength: number | undefined,
  prefix: string,
  fail: (message: string) => void,
) {
  const img = value as { src?: unknown; alt?: unknown } | null;
  if (!img || typeof img.src !== "string" || !img.src)
    fail(`${prefix}image sans source`);
  else if (!/^(\/|https:\/\/)/.test(img.src))
    fail(`${prefix}source d'image invalide`);
  if (!img || typeof img.alt !== "string" || !img.alt.trim())
    fail(`${prefix}texte alternatif manquant`);
  else if (altMaxLength && img.alt.length > altMaxLength)
    fail(`${prefix}alt : ${img.alt.length} caractères (max ${altMaxLength})`);
}

/**
 * Vérifie seulement la FORME d'une valeur stockée (type, sous-champs), pas
 * les longueurs : une valeur publiée reste affichée même si une limite a été
 * resserrée depuis dans le code. Une forme invalide → valeur par défaut.
 */
export function hasValidShape(def: FieldDef, value: unknown): boolean {
  switch (def.type) {
    case "text":
    case "textarea":
      return typeof value === "string";
    case "list":
      return Array.isArray(value) && value.every((v) => typeof v === "string");
    case "items":
      return (
        Array.isArray(value) &&
        value.every(
          (item) =>
            item !== null &&
            typeof item === "object" &&
            Object.keys(def.fields).every(
              (name) =>
                typeof (item as Record<string, unknown>)[name] === "string",
            ),
        )
      );
    case "image":
      return isImage(value);
    case "gallery":
      return Array.isArray(value) && value.length > 0 && value.every(isImage);
  }
}

function isImage(value: unknown): boolean {
  const img = value as { src?: unknown; alt?: unknown } | null;
  return (
    !!img &&
    typeof img.src === "string" &&
    img.src.length > 0 &&
    typeof img.alt === "string"
  );
}

/** Vérifie toutes les valeurs par défaut du registre. */
export function validateDefaults(): ContentIssue[] {
  return (Object.keys(contentFields) as ContentKey[]).flatMap((key) =>
    validateField(key, contentFields[key], contentDefaults[key]),
  );
}
