"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

import { adminButton } from "../admin-shell";

/**
 * Lit la session laissée par le lien de l'e-mail :
 * - invitation : `#access_token=…&refresh_token=…` (flux implicite) ;
 * - mot de passe oublié : `?code=…` (PKCE, vérificateur en cookie).
 * La session est écrite en cookies, puis direction le mot de passe.
 */
export function SessionFromLink() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");

    const open: Promise<{ error: unknown }> =
      accessToken && refreshToken
        ? supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
        : code
          ? supabase.auth.exchangeCodeForSession(code)
          : Promise.resolve({ error: new Error("Lien incomplet") });

    void open.then(({ error }) => {
      // Les jetons ne restent pas dans l'historique du navigateur.
      window.history.replaceState(null, "", window.location.pathname);
      if (error) setFailed(true);
      else window.location.replace("/admin/mot-de-passe");
    });
  }, []);

  if (!failed) {
    return (
      <p className="text-center text-body text-ink-soft">
        Vérification du lien…
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-5 text-center">
      <p className="text-body text-ink-soft">
        Ce lien n&apos;est plus valable (il expire au bout d&apos;une heure et
        ne sert qu&apos;une fois). Demandez-en un nouveau depuis la page de
        connexion, avec « Mot de passe oublié ? ».
      </p>
      <Link href="/admin" className={adminButton}>
        Page de connexion
      </Link>
    </div>
  );
}
