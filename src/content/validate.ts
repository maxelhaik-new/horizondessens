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
    case "image": {
      const img = value as { src?: unknown; alt?: unknown } | null;
      if (!img || typeof img.src !== "string" || !img.src)
        fail("image sans source");
      if (!img || typeof img.alt !== "string" || !img.alt.trim())
        fail("texte alternatif manquant");
      else if (def.altMaxLength && img.alt.length > def.altMaxLength)
        fail(`alt : ${img.alt.length} caractères (max ${def.altMaxLength})`);
      break;
    }
  }
  return issues;
}

/** Vérifie toutes les valeurs par défaut du registre. */
export function validateDefaults(): ContentIssue[] {
  return (Object.keys(contentFields) as ContentKey[]).flatMap((key) =>
    validateField(key, contentFields[key], contentDefaults[key]),
  );
}
