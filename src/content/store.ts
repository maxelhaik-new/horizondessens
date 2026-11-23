import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { draftMode } from "next/headers";
import { cache } from "react";

import {
  CMS_TAG,
  isCmsConfigured,
  supabaseKey,
  supabaseUrl,
} from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { contentDefaults } from "./defaults";
import { contentFields, type ContentKey, type ContentValues } from "./registry";
import { hasValidShape } from "./validate";

type RawValues = Record<string, unknown>;

/**
 * Contenu PUBLIÉ (table `cms_content`), mis en cache sans limite et
 * invalidé à chaque publication (`updateTag(CMS_TAG)`). Les pages restent
 * statiques. En cas d'erreur réseau : valeurs du code, réessai dans 1 min.
 */
async function loadPublished(): Promise<RawValues> {
  "use cache";
  cacheTag(CMS_TAG);
  const values = await fetchPublished();
  if (values) cacheLife("max");
  else cacheLife("minutes");
  return values ?? {};
}

/** Lecture REST de `cms_content` (clé publishable). `null` en cas d'erreur. */
async function fetchPublished(): Promise<RawValues | null> {
  if (!isCmsConfigured) return {};
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/cms_content?select=key,value`,
      { headers: { apikey: supabaseKey }, cache: "no-store" },
    );
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    const rows = (await res.json()) as Array<{ key: string; value: unknown }>;
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  } catch (error) {
    console.error("[cms] lecture du contenu publié impossible", error);
    return null;
  }
}

export type CmsState = {
  /** Mode édition actif (Draft Mode). */
  editing: boolean;
  /** Valeurs brutes : publié, recouvert par les brouillons en mode édition. */
  values: RawValues;
  /** Clés publiées (différentes du code). */
  publishedKeys: string[];
  /** Clés avec un brouillon non publié. */
  draftKeys: string[];
  /** Éditeur connecté (mode édition seulement). */
  editor: { email: string } | null;
};

/**
 * État du contenu pour la requête en cours (mémoïsé par requête).
 * Visiteurs : contenu publié en cache. Mode édition : + brouillons, lus
 * avec la session de l'éditeur (RLS), sans cache.
 */
export const loadCmsState = cache(async (): Promise<CmsState> => {
  const { isEnabled } = await draftMode();
  // Mode édition : lecture directe (le Draft Mode contourne le cache, et
  // appeler une fonction `"use cache"` dans ce cas fait échouer le rendu).
  const published = isEnabled
    ? ((await fetchPublished()) ?? {})
    : await loadPublished();
  const base = {
    values: published,
    publishedKeys: Object.keys(published),
    draftKeys: [],
    editor: null,
  };
  if (!isEnabled || !isCmsConfigured) return { editing: false, ...base };

  const supabase = await createSupabaseServerClient();
  const { data: claims } = await supabase.auth.getClaims();
  const email = claims?.claims?.email;
  if (!email) return { editing: true, ...base };

  const { data, error } = await supabase
    .from("cms_drafts")
    .select("key, value");
  if (error) console.error("[cms] lecture des brouillons impossible", error);

  const values = { ...published };
  for (const row of data ?? []) {
    if (row.value === null) delete values[row.key];
    else values[row.key] = row.value;
  }
  return {
    editing: true,
    values,
    publishedKeys: base.publishedKeys,
    draftKeys: (data ?? []).map((row) => row.key as string),
    editor: { email: String(email) },
  };
});

/** Valeur d'une clé : stockée si sa forme est valide, sinon valeur du code. */
export function resolveValue<K extends ContentKey>(
  values: RawValues,
  key: K,
): ContentValues[K] {
  const raw = values[key];
  if (raw !== undefined && hasValidShape(contentFields[key], raw))
    return raw as ContentValues[K];
  return contentDefaults[key];
}
