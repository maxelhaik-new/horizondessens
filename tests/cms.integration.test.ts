/**
 * Test de non-régression du mini-CMS, sur le VRAI projet Supabase.
 *
 * Il parcourt le chemin d'Élodie avec une vraie session d'éditeur (RLS
 * compris) : brouillon → invisible du public → publication → lisible par
 * tous → « Rétablir l'original » → publication → disparu. Il vérifie aussi
 * ce qu'un visiteur anonyme ne peut PAS faire.
 *
 * Il n'utilise qu'une clé de test (`test.cms.regression`), que le site ne lit
 * jamais, et ne publie QUE cette clé : les brouillons d'Élodie ne sont pas
 * touchés. À la fin, tout ce qu'il a créé est supprimé (contenu, brouillon,
 * historique), même en cas d'échec.
 *
 * Lancement : `npm run test:cms`. Variables (`.env.local`, jamais sur Vercel) :
 * NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
 * SUPABASE_SECRET_KEY (ouvre la session de test sans e-mail ni mot de passe),
 * CMS_TEST_EDITOR_EMAIL (un compte présent dans `cms_editors`).
 */
import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const KEY = "test.cms.regression";
const VALUE = `Test de non-régression ${new Date().toISOString()}`;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secret = process.env.SUPABASE_SECRET_KEY;
const editorEmail = process.env.CMS_TEST_EDITOR_EMAIL;
const missing = !url || !publishable || !secret || !editorEmail;

const options = {
  auth: { persistSession: false, autoRefreshToken: false },
} as const;

describe(
  "Mini-CMS : brouillon, publication, retour à l'original",
  {
    skip: missing
      ? "Variables absentes (voir l'en-tête du fichier) : test ignoré."
      : false,
  },
  () => {
    let admin: SupabaseClient;
    let editor: SupabaseClient;
    let anon: SupabaseClient;

    /** Efface toute trace de la clé de test (clé secrète : contourne le RLS). */
    const purge = async () => {
      for (const table of ["cms_drafts", "cms_content", "cms_revisions"]) {
        const { error } = await admin.from(table).delete().eq("key", KEY);
        assert.ifError(error);
      }
    };

    /** Ce que voit un visiteur pour la clé de test. */
    const publicValue = async () => {
      const { data, error } = await anon
        .from("cms_content")
        .select("value")
        .eq("key", KEY);
      assert.ifError(error);
      return data.length ? data[0].value : undefined;
    };

    before(async () => {
      admin = createClient(url!, secret!, options);
      anon = createClient(url!, publishable!, options);
      editor = createClient(url!, publishable!, options);

      // Session d'éditeur sans e-mail : lien magique généré puis vérifié ici.
      const { data: link, error: linkError } =
        await admin.auth.admin.generateLink({
          type: "magiclink",
          email: editorEmail!,
        });
      assert.ifError(linkError);
      const { error: otpError } = await editor.auth.verifyOtp({
        token_hash: link.properties.hashed_token,
        type: "magiclink",
      });
      assert.ifError(otpError);

      await purge();
    });

    after(async () => {
      if (admin) await purge();
      if (editor) await editor.auth.signOut({ scope: "local" });
    });

    test("le compte de test est bien éditeur", async () => {
      const { data, error } = await editor.rpc("is_cms_editor");
      assert.ifError(error);
      assert.equal(data, true);
    });

    test("un visiteur ne peut ni écrire, ni lire les brouillons, ni publier", async () => {
      const draft = await anon
        .from("cms_drafts")
        .insert({ key: KEY, value: "x" });
      assert.ok(draft.error, "insertion d'un brouillon anonyme acceptée");

      const content = await anon
        .from("cms_content")
        .insert({ key: KEY, value: "x" });
      assert.ok(content.error, "écriture anonyme du contenu publié acceptée");

      const publish = await anon.rpc("cms_publish", { p_keys: [KEY] });
      assert.ok(publish.error, "publication anonyme acceptée");

      const { data } = await anon.from("cms_drafts").select("key");
      assert.deepEqual(data ?? [], [], "brouillons lisibles par un visiteur");
    });

    test("un brouillon reste invisible du public", async () => {
      const { error } = await editor
        .from("cms_drafts")
        .upsert({ key: KEY, value: VALUE });
      assert.ifError(error);
      assert.equal(await publicValue(), undefined);
    });

    test("« Publier » met le texte en ligne et l'archive", async () => {
      const { data: count, error } = await editor.rpc("cms_publish", {
        p_keys: [KEY],
      });
      assert.ifError(error);
      assert.equal(count, 1);
      assert.equal(await publicValue(), VALUE);

      const drafts = await editor
        .from("cms_drafts")
        .select("key")
        .eq("key", KEY);
      assert.deepEqual(drafts.data, [], "brouillon non vidé après publication");

      const revisions = await editor
        .from("cms_revisions")
        .select("value, previous")
        .eq("key", KEY);
      assert.ifError(revisions.error);
      assert.deepEqual(revisions.data, [{ value: VALUE, previous: null }]);
    });

    test("« Rétablir l'original » puis « Publier » retire le texte", async () => {
      const { error } = await editor
        .from("cms_drafts")
        .upsert({ key: KEY, value: null });
      assert.ifError(error);

      const publish = await editor.rpc("cms_publish", { p_keys: [KEY] });
      assert.ifError(publish.error);
      assert.equal(await publicValue(), undefined);
    });
  },
);
