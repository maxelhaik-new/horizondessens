import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

import { signOut } from "@/cms/actions";
import { isCmsConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { AdminAlert, AdminShell, adminButton } from "./admin-shell";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Espace d'édition",
  robots: { index: false, follow: false },
};

/**
 * Connexion à l'espace d'édition. Une fois connecté·e, le mode édition
 * s'active et on retrouve le vrai site, modifiable en place.
 */
export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <AdminShell
      title="Espace d'édition"
      intro="Modifiez les textes et les photos du site, directement sur ses pages."
    >
      <Suspense fallback={<LoginForm />}>
        <AdminGate searchParams={searchParams} />
      </Suspense>
    </AdminShell>
  );
}

/** Déjà connecté·e (et en mode édition) : on propose de reprendre. */
async function AdminGate({
  searchParams,
}: {
  searchParams: PageProps<"/admin">["searchParams"];
}) {
  if (!isCmsConfigured) {
    return (
      <p className="text-body text-ink-soft">
        Le CMS n&apos;est pas encore configuré sur ce site (clé Supabase
        absente).
      </p>
    );
  }
  const [{ isEnabled }, supabase, params] = await Promise.all([
    draftMode(),
    createSupabaseServerClient(),
    searchParams,
  ]);
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email;

  if (!email || !isEnabled) {
    return (
      <div className="flex flex-col gap-5">
        {params.lien === "expire" ? (
          <AdminAlert>
            Ce lien n&apos;est plus valable (il expire au bout d&apos;une heure
            et ne sert qu&apos;une fois). Utilisez « Mot de passe oublié ? »
            pour en recevoir un nouveau.
          </AdminAlert>
        ) : null}
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 text-center">
      <p className="text-body text-ink-soft">
        Connecté·e en tant que{" "}
        <span className="font-medium text-ink">{String(email)}</span>.
      </p>
      <Link href="/" className={adminButton}>
        Modifier le site
      </Link>
      <form action={signOut}>
        <button
          type="submit"
          className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}
