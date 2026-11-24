import "server-only";

/*
 * Envoi d'e-mails via l'API REST de Resend (sans dépendance npm).
 * Variables : RESEND_API_KEY et CONTACT_FROM_EMAIL (expéditeur sur le
 * domaine vérifié). Utilisé par le formulaire de contact et les cartes
 * cadeaux.
 */

export type Email = {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Uint8Array }[];
  /**
   * Clé d'idempotence Resend (24 h) : un second envoi avec la même clé
   * n'envoie rien de plus. Sert quand le webhook Stripe et la page de
   * confirmation déclenchent le même envoi.
   */
  idempotencyKey?: string;
};

export type SendResult =
  { ok: true } | { ok: false; reason: "unconfigured" | "rejected" | "network" };

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}

export async function sendEmail(email: Email): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("E-mail : RESEND_API_KEY ou CONTACT_FROM_EMAIL manquant.");
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(email.idempotencyKey
          ? { "Idempotency-Key": email.idempotencyKey }
          : {}),
      },
      body: JSON.stringify({
        from,
        to: email.to,
        reply_to: email.replyTo,
        subject: email.subject,
        html: email.html,
        text: email.text,
        attachments: email.attachments?.map((a) => ({
          filename: a.filename,
          content: Buffer.from(a.content).toString("base64"),
        })),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    // 409 : la même clé d'idempotence a déjà servi (envoi déjà fait, ou en
    // cours). Le corps peut différer (un PDF régénéré n'est jamais
    // identique à l'octet près) : on considère l'e-mail comme parti.
    if (res.status === 409 && email.idempotencyKey) return { ok: true };
    if (!res.ok) {
      console.error("E-mail : Resend a répondu", res.status, await res.text());
      return { ok: false, reason: "rejected" };
    }
    return { ok: true };
  } catch (error) {
    console.error("E-mail : envoi impossible", error);
    return { ok: false, reason: "network" };
  }
}
