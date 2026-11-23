"use client";

import { useActionState, useState } from "react";

import {
  requestPasswordReset,
  signIn,
  type ResetState,
  type SignInState,
} from "@/cms/actions";

import { AdminAlert, adminButton, adminInput } from "./admin-shell";

/** Connexion, avec bascule vers « Mot de passe oublié ». */
export function LoginForm() {
  const [mode, setMode] = useState<"login" | "reset">("login");
  return mode === "login" ? (
    <SignInForm onForgot={() => setMode("reset")} />
  ) : (
    <ResetForm onBack={() => setMode("login")} />
  );
}

function SignInForm({ onForgot }: { onForgot: () => void }) {
  const [state, action, pending] = useActionState<SignInState, FormData>(
    signIn,
    {},
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        E-mail
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          className={adminInput}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        Mot de passe
        <input
          name="password"
          type="password"
          autoComplete="current-password"
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
        {pending ? "Connexion…" : "Se connecter"}
      </button>
      <button
        type="button"
        onClick={onForgot}
        className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
      >
        Mot de passe oublié ?
      </button>
    </form>
  );
}

function ResetForm({ onBack }: { onBack: () => void }) {
  const [state, action, pending] = useActionState<ResetState, FormData>(
    requestPasswordReset,
    {},
  );

  if (state.sent) {
    return (
      <div className="flex flex-col gap-5 text-center">
        <p className="text-body text-ink-soft">
          Si un compte existe pour cette adresse, un e-mail vient de partir avec
          un lien pour choisir un nouveau mot de passe (valable une heure).
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">
        Indiquez votre e-mail : vous recevrez un lien pour choisir un nouveau
        mot de passe.
      </p>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
        E-mail
        <input
          name="email"
          type="email"
          autoComplete="email"
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
        {pending ? "Envoi…" : "Recevoir le lien"}
      </button>
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
      >
        Retour à la connexion
      </button>
    </form>
  );
}
