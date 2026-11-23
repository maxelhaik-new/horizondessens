import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import { AdminShell, adminButton } from "../admin-shell";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = {
  title: "Choisir un mot de passe",
  robots: { index: false, follow: false },
};

/** Après le lien d'invitation ou de mot de passe oublié. */
export default function PasswordPage() {
  return (
    <AdminShell
      title="Votre mot de passe"
      intro="Choisissez le mot de passe de votre espace d'édition."
    >
      <Suspense fallback={null}>
        <PasswordGate />
      </Suspense>
    </AdminShell>
  );
}

async function PasswordGate() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email;

  if (!email) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <p className="text-body text-ink-soft">
          Le lien a expiré ou a déjà servi. Demandez-en un nouveau depuis la
          page de connexion (« Mot de passe oublié ? »).
        </p>
        <Link href="/admin" className={adminButton}>
          Page de connexion
        </Link>
      </div>
    );
  }
  return <PasswordForm email={String(email)} />;
}
