import type { FieldDef, GalleryItem, ImageValue } from "@/content/schema";

/**
 * Traduit un élément marqué `data-cms*` en cible d'édition : valeur
 * courante, limite, et comment reconstruire la valeur complète du champ.
 */

export type ListControls = {
  index: number;
  length: number;
  maxItems: number;
  /** Valeur du champ avec un nouvel élément inséré après celui-ci. */
  withAdded: () => unknown;
  /** Valeur du champ sans cet élément. */
  withRemoved: () => unknown;
};

export type TextTarget = {
  kind: "text";
  key: string;
  label: string;
  value: string;
  maxLength: number;
  multiline: boolean;
  build: (text: string) => unknown;
  list?: ListControls;
};

export type ImageTarget = {
  kind: "image";
  key: string;
  label: string;
  ratio: string;
  /** Absent : image décorative, sans description. */
  altMaxLength?: number;
  captionMaxLength?: number;
  current: GalleryItem;
  /** Valeur complète du champ avec cette image remplacée. */
  build: (image: GalleryItem) => unknown;
  /** Galerie : ajout après cette image, retrait. */
  gallery?: {
    length: number;
    maxItems: number;
    withAdded: (image: GalleryItem) => unknown;
    withRemoved: () => unknown;
  };
};

export type Target = TextTarget | ImageTarget;

const PLACEHOLDER = "Nouveau texte";

export function readTarget(
  el: Element,
  fields: Record<string, FieldDef>,
  values: Record<string, unknown>,
): Target | null {
  const key = el.getAttribute("data-cms");
  if (!key) return null;
  const def = fields[key];
  if (!def) return null;
  const itemAttr = el.getAttribute("data-cms-item");
  const item = itemAttr === null ? undefined : Number(itemAttr);
  const sub = el.getAttribute("data-cms-sub") ?? undefined;
  const value = values[key];

  switch (def.type) {
    case "text":
    case "textarea": {
      const text = String(value ?? "");
      // Paragraphe d'un texte long affiché en plusieurs blocs.
      if (sub === "para" && item !== undefined) {
        const paras = text.split(/\n\s*\n/);
        if (item >= paras.length) return null;
        const others = text.length - paras[item].length;
        return {
          kind: "text",
          key,
          label: `${def.label} · paragraphe ${item + 1}`,
          value: paras[item],
          maxLength: Math.max(paras[item].length, def.maxLength - others),
          multiline: true,
          build: (next) =>
            paras.map((p, i) => (i === item ? next : p)).join("\n\n"),
        };
      }
      return {
        kind: "text",
        key,
        label: def.label,
        value: String(value ?? ""),
        maxLength: def.maxLength,
        multiline: def.type === "textarea",
        build: (next) => next,
      };
    }

    case "list": {
      const arr = (value as string[]) ?? [];
      if (item === undefined || item >= arr.length) return null;
      return {
        kind: "text",
        key,
        label: `${def.label} · ${item + 1}`,
        value: arr[item],
        maxLength: def.itemMaxLength,
        multiline: false,
        build: (text) => arr.map((v, i) => (i === item ? text : v)),
        list: {
          index: item,
          length: arr.length,
          maxItems: def.maxItems,
          withAdded: () => [
            ...arr.slice(0, item + 1),
            PLACEHOLDER.slice(0, def.itemMaxLength),
            ...arr.slice(item + 1),
          ],
          withRemoved: () => arr.filter((_, i) => i !== item),
        },
      };
    }

    case "items": {
      const arr = (value as Array<Record<string, string>>) ?? [];
      if (item === undefined || item >= arr.length || !sub) return null;
      const subDef = def.fields[sub];
      if (!subDef) return null;
      if (subDef.image) {
        return {
          kind: "image",
          key,
          label: `${def.label} · ${item + 1} · ${subDef.label}`,
          ratio: subDef.image.ratio,
          current: { src: arr[item][sub] ?? "", alt: "" },
          build: (img) =>
            arr.map((v, i) => (i === item ? { ...v, [sub]: img.src } : v)),
        };
      }
      return {
        kind: "text",
        key,
        label: `${def.label} · ${item + 1} · ${subDef.label}`,
        value: arr[item][sub] ?? "",
        maxLength: subDef.maxLength,
        multiline: Boolean(subDef.multiline),
        build: (text) =>
          arr.map((v, i) => (i === item ? { ...v, [sub]: text } : v)),
        list: {
          index: item,
          length: arr.length,
          maxItems: def.maxItems,
          withAdded: () => [
            ...arr.slice(0, item + 1),
            Object.fromEntries(
              Object.entries(def.fields).map(([name, f]) => [
                name,
                PLACEHOLDER.slice(0, f.maxLength),
              ]),
            ),
            ...arr.slice(item + 1),
          ],
          withRemoved: () => arr.filter((_, i) => i !== item),
        },
      };
    }

    case "image": {
      return {
        kind: "image",
        key,
        label: def.label,
        ratio: def.ratio,
        altMaxLength: def.altMaxLength ?? 140,
        current: value as ImageValue,
        build: (img) => ({ src: img.src, alt: img.alt }),
      };
    }

    case "gallery": {
      const arr = (value as GalleryItem[]) ?? [];
      if (item === undefined || item >= arr.length) return null;
      if (sub === "caption") {
        if (!def.captionMaxLength) return null;
        return {
          kind: "text",
          key,
          label: `${def.label} · photo ${item + 1} · légende`,
          value: arr[item].caption ?? "",
          maxLength: def.captionMaxLength,
          multiline: false,
          build: (text) =>
            arr.map((v, i) => (i === item ? { ...v, caption: text } : v)),
        };
      }
      return {
        kind: "image",
        key,
        label: `${def.label} · photo ${item + 1}`,
        ratio: def.ratio,
        altMaxLength: def.altMaxLength ?? 140,
        captionMaxLength: def.captionMaxLength,
        current: arr[item],
        build: (img) => arr.map((v, i) => (i === item ? img : v)),
        gallery: {
          length: arr.length,
          maxItems: def.maxItems,
          withAdded: (img) => [
            ...arr.slice(0, item + 1),
            img,
            ...arr.slice(item + 1),
          ],
          withRemoved: () => arr.filter((_, i) => i !== item),
        },
      };
    }
  }
}
