"use server";

import { refresh, updateTag } from "next/cache";
import { draftMode, headers } from "next/headers";
import { redirect } from "next/navigation";

import { contentFields, type ContentKey } from "@/content/registry";
import { validateField } from "@/content/validate";
import { CMS_TAG, isCmsConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ActionResult = { ok: true } | { ok: false; error: string };

const SESSION_EXPIRED =
  "Votre session a expiré. Reconnectez-vous sur /admin pour continuer.";

/** Client Supabase d'un éditeur autorisé, ou un message d'erreur. */
async function editorClient() {
  if (!isCmsConfigured)
    return { error: "Le CMS n'est pas configuré (clé Supabase absente)." };
  const { isEnabled } = await draftMode();
  if (!isEnabled) return { error: SESSION_EXPIRED };

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return { error: SESSION_EXPIRED };

  const { data: allowed } = await supabase.rpc("is_cms_editor");
  if (!allowed) return { error: "Ce compte n'a pas les droits d'édition." };
  return { supabase };
}

function isContentKey(key: string): key is ContentKey {
  return Object.hasOwn(contentFields, key);
}

/** Enregistre un brouillon (validé contre le registre : type et longueurs). */
export async function saveDraft(
  key: string,
  value: unknown,
): Promise<ActionResult> {
  if (!isContentKey(key)) return { ok: false, error: "Champ inconnu." };
  const issues = validateField(key, contentFields[key], value);
  if (issues.length > 0)
    return { ok: false, error: issues.map((i) => i.message).join(" · ") };

  const { supabase, error } = await editorClient();
  if (!supabase) return { ok: false, error };

  const { error: dbError } = await supabase
    .from("cms_drafts")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (dbError) {
    console.error("[cms] saveDraft", dbError);
    return { ok: false, error: "Enregistrement impossible. Réessayez." };
  }
  refresh();
  return { ok: true };
}

/** Prépare le retour au contenu d'origine (valeur du code) à la publication. */
export async function restoreDefault(key: string): Promise<ActionResult> {
  if (!isContentKey(key)) return { ok: false, error: "Champ inconnu." };
  const { supabase, error } = await editorClient();
  if (!supabase) return { ok: false, error };

  const { error: dbError } = await supabase
    .from("cms_drafts")
    .upsert({ key, value: null, updated_at: new Date().toISOString() });
  if (dbError) return { ok: false, error: "Opération impossible." };
  refresh();
  return { ok: true };
}

/** Annule le brouillon d'un champ (retour à la version publiée). */
export async function discardDraft(key: string): Promise<ActionResult> {
  const { supabase, error } = await editorClient();
  if (!supabase) return { ok: false, error };
  const { error: dbError } = await supabase
    .from("cms_drafts")
    .delete()
    .eq("key", key);
  if (dbError) return { ok: false, error: "Opération impossible." };
  refresh();
  return { ok: true };
}

/** Annule tous les brouillons. */
export async function discardAll(): Promise<ActionResult> {
  const { supabase, error } = await editorClient();
  if (!supabase) return { ok: false, error };
  const { error: dbError } = await supabase
    .from("cms_drafts")
    .delete()
    .neq("key", "");
  if (dbError) return { ok: false, error: "Opération impossible." };
  refresh();
  return { ok: true };
}

/** Publie tous les brouillons et régénère les pages du site. */
export async function publishAll(): Promise<ActionResult> {
  const { supabase, error } = await editorClient();
  if (!supabase) return { ok: false, error };
  const { error: dbError } = await supabase.rpc("cms_publish");
  if (dbError) {
    console.error("[cms] publish", dbError);
    return { ok: false, error: "Publication impossible. Réessayez." };
  }
  updateTag(CMS_TAG);
  refresh();
  return { ok: true };
}

export type SignInState = { error?: string; email?: string };

/** Connexion sur /admin : vérifie le compte, active le mode édition. */
export async function signIn(
  _prev: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password)
    return { email, error: "Renseignez votre e-mail et votre mot de passe." };
  if (!isCmsConfigured)
    return { email, error: "Le CMS n'est pas configuré sur ce site." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { email, error: "E-mail ou mot de passe incorrect." };

  const { data: allowed } = await supabase.rpc("is_cms_editor");
  if (!allowed) {
    await supabase.auth.signOut();
    return { email, error: "Ce compte n'a pas les droits d'édition." };
  }

  (await draftMode()).enable();
  redirect("/");
}

/** Quitte le mode édition et ferme la session. */
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  (await draftMode()).disable();
  redirect("/");
}

export type ResetState = { error?: string; sent?: boolean };

/** « Mot de passe oublié » : envoie le lien (réponse identique si inconnu). */
export async function requestPasswordReset(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Renseignez votre e-mail." };
  if (!isCmsConfigured) return { error: "Le CMS n'est pas configuré." };

  const origin = (await headers()).get("origin") ?? "";
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/admin/bienvenue`,
  });
  if (error?.status === 429)
    return { error: "Trop de demandes. Réessayez dans une heure." };
  if (error) console.error("[cms] resetPasswordForEmail", error.message);
  return { sent: true };
}

export type PasswordState = { error?: string };

/** Choix du mot de passe (après invitation ou oubli), puis mode édition. */
export async function setPassword(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 10)
    return { error: "Le mot de passe doit faire au moins 10 caractères." };
  if (password !== confirm)
    return { error: "Les deux mots de passe ne correspondent pas." };

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims)
    return {
      error:
        "Le lien a expiré. Demandez-en un nouveau depuis la page de connexion.",
    };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.error("[cms] updateUser", error.message);
    return {
      error:
        error.code === "same_password"
          ? "Choisissez un mot de passe différent de l'ancien."
          : error.code === "weak_password"
            ? "Mot de passe trop faible : allongez-le ou variez les caractères."
            : "Enregistrement impossible. Réessayez.",
    };
  }

  const { data: allowed } = await supabase.rpc("is_cms_editor");
  if (!allowed)
    return {
      error:
        "Mot de passe enregistré, mais ce compte n'a pas encore les droits d'édition.",
    };

  (await draftMode()).enable();
  redirect("/");
}
