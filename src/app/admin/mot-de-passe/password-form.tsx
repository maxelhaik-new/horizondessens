"use client";

import { useActionState } from "react";

import { setPassword, type PasswordState } from "@/cms/actions";

import { AdminAlert, adminButton, adminInput } from "../admin-shell";

export function PasswordForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState<PasswordState, FormData>(
    setPassword,
    {},
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">
        Compte : <span className="font-medium text-ink">{email}</span>
      </p>
      {/* Aide les gestionnaires de mots de passe à associer le compte. */}
      <input
        type="email"
        name="username"
        autoComplete="username"
        value={email}
        readOnly
        hidden
      />
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Nouveau mot de passe
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={10}
          required
          className={adminInput}
        />
        <span className="text-xs font-normal text-ink-subtle">
          10 caractères minimum.
        </span>
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Confirmer le mot de passe
        <input
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={10}
          required
          className={adminInput}
        />
      </label>
      {state.error ? <AdminAlert>{state.error}</AdminAlert> : null}
      <button
        type="submit"
        disabled={pending}
        className={`mt-2 ${adminButton}`}
      >
        {pending ? "Enregistrement…" : "Enregistrer et ouvrir l'édition"}
      </button>
    </form>
  );
}
