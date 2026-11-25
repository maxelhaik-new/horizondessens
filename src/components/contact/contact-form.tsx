"use client";

import Link from "next/link";
import { useActionState } from "react";

import { sendContactMessage } from "@/app/contact/actions";
import {
  contactSubjects,
  type ContactState,
} from "@/app/contact/contact-schema";
import { buttonClass } from "@/components/ui/button-link";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full rounded-2xl border border-transparent bg-paper px-5 py-4 text-body text-ink transition max-md:text-base-[border-color,background-color] duration-300 placeholder:text-ink-subtle hover:border-line focus:border-accent-600 focus:bg-white focus:outline-none aria-invalid:border-accent-700";

/** Formulaire de contact (server action + Resend), validé côté serveur. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-[28rem] flex-col items-start justify-center gap-5"
      >
        <span className="grid size-12 place-items-center rounded-full bg-night text-white">
          <CheckIcon className="size-5" />
        </span>
        <p className="text-h4">Merci, votre message est bien parti.</p>
        <p className="max-w-sm text-body text-ink-soft">
          Je vous réponds au plus vite, à l&apos;adresse que vous m&apos;avez
          indiquée.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" htmlFor="contact-name" error={e.name}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            defaultValue={v.name}
            placeholder="Votre nom"
            aria-invalid={Boolean(e.name) || undefined}
            aria-describedby={e.name ? "contact-name-error" : undefined}
            className={fieldClass}
          />
        </Field>
        <Field
          label="Téléphone"
          optional
          htmlFor="contact-phone"
          error={e.phone}
        >
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            defaultValue={v.phone}
            placeholder="06 00 00 00 00"
            aria-invalid={Boolean(e.phone) || undefined}
            aria-describedby={e.phone ? "contact-phone-error" : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="E-mail" htmlFor="contact-email" error={e.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={120}
          defaultValue={v.email}
          placeholder="vous@exemple.fr"
          aria-invalid={Boolean(e.email) || undefined}
          aria-describedby={e.email ? "contact-email-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-ink">
          Votre demande concerne
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {contactSubjects.map((subject) => (
            <label
              key={subject}
              className="flex cursor-pointer items-center gap-3 rounded-2xl bg-paper px-4 py-3.5 text-sm text-ink-soft transition-colors duration-300 hover:text-ink has-checked:bg-night has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-accent-800"
            >
              <input
                type="radio"
                name="subject"
                value={subject}
                defaultChecked={(v.subject ?? contactSubjects[0]) === subject}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="size-3 shrink-0 rounded-full border border-current transition-colors peer-checked:border-white peer-checked:bg-white"
              />
              {subject}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Message" htmlFor="contact-message" error={e.message}>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          defaultValue={v.message}
          placeholder="Dites-m'en un peu plus…"
          aria-invalid={Boolean(e.message) || undefined}
          aria-describedby={e.message ? "contact-message-error" : undefined}
          className={cn(fieldClass, "min-h-36 resize-y")}
        />
      </Field>

      {/* Pot de miel anti-robots : invisible pour les humains. */}
      <div aria-hidden className="hidden">
        <label>
          Site web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.unavailable ? (
        <p
          role="alert"
          className="rounded-2xl bg-accent-100 px-5 py-4 text-sm text-accent-900"
        >
          Le message n&apos;a pas pu partir. Écrivez-moi directement à{" "}
          <a href={`mailto:${site.email}`} className="font-medium underline">
            {site.email}
          </a>{" "}
          ou appelez le{" "}
          <a href={site.phone.href} className="font-medium underline">
            {site.phone.display}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonClass({ variant: "primary", plain: true }), "mt-1")}
      >
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </button>

      <p className="text-xs leading-relaxed text-ink-subtle">
        Vos informations servent uniquement à vous répondre.{" "}
        <Link
          href={routes.confidentialite}
          className="underline underline-offset-4 hover:text-ink"
        >
          Politique de confidentialité
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
        {optional ? (
          <span className="font-normal text-ink-subtle"> (facultatif)</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-accent-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
