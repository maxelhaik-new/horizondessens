"use server";

import { site } from "@/lib/site";

import { renderContactEmail } from "./email-template";
import { contactSubjects, type ContactState } from "./contact-schema";

/*
 * Envoi du formulaire de contact par e-mail, via l'API REST de Resend
 * (pas de dépendance npm). Variables d'environnement :
 * - RESEND_API_KEY : clé Resend (domaine horizondessens.fr vérifié) ;
 * - CONTACT_FROM_EMAIL : expéditeur, ex. « Horizon des Sens <contact@horizondessens.fr> » ;
 * - CONTACT_TO_EMAIL : destinataire (par défaut l'e-mail d'Élodie).
 * Sans clé, le formulaire répond par une erreur qui propose l'e-mail direct.
 */

const LIMITS = { name: 80, email: 120, phone: 30, message: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Pot de miel : champ invisible, rempli seulement par les robots.
  if (field(formData, "website")) return { status: "success" };

  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    subject: field(formData, "subject"),
    message: field(formData, "message"),
  };

  const errors: NonNullable<ContactState["errors"]> = {};
  if (!values.name) errors.name = "Indiquez votre nom.";
  else if (values.name.length > LIMITS.name) errors.name = "Nom trop long.";
  if (!EMAIL_RE.test(values.email) || values.email.length > LIMITS.email)
    errors.email = "Indiquez une adresse e-mail valide.";
  if (values.phone.length > LIMITS.phone) errors.phone = "Numéro trop long.";
  if (values.message.length < 10)
    errors.message = "Votre message est un peu court.";
  else if (values.message.length > LIMITS.message)
    errors.message = `${LIMITS.message} caractères au maximum.`;
  const subject = (contactSubjects as readonly string[]).includes(
    values.subject,
  )
    ? values.subject
    : "Autre question";

  if (Object.keys(errors).length > 0)
    return { status: "error", errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact : RESEND_API_KEY ou CONTACT_FROM_EMAIL manquant.");
    return { status: "error", unavailable: true, values };
  }

  const email = renderContactEmail({ ...values, subject }, new Date());

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: values.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Contact : Resend a répondu", res.status, await res.text());
      return { status: "error", unavailable: true, values };
    }
  } catch (error) {
    console.error("Contact : envoi impossible", error);
    return { status: "error", unavailable: true, values };
  }

  return { status: "success" };
}
