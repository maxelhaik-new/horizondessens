import "server-only";

import { draftMode } from "next/headers";

import { isCmsConfigured } from "./config";
import { createSupabaseServerClient } from "./server";

/**
 * E-mail de l'éditeur connecté (mode édition actif, compte dans
 * `cms_editors`), ou `null`. Sert aux outils réservés aux éditeurs hors du
 * CMS (test d'envoi de la carte cadeau).
 */
export async function currentEditorEmail(): Promise<string | null> {
  if (!isCmsConfigured) return null;
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return null;
  const { data: allowed } = await supabase.rpc("is_cms_editor");
  if (!allowed) return null;
  return typeof data.claims.email === "string" ? data.claims.email : "";
}
