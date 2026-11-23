import "server-only";

import { site } from "@/lib/site";

/*
 * Mise en forme de l'e-mail reçu par Élodie : HTML en tableaux et styles en
 * ligne (compatibles Gmail, Outlook, Apple Mail), aux couleurs du site, et
 * version texte de repli. Toutes les saisies sont échappées.
 */

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const C = {
  paper: "#f7ece9",
  card: "#fbf6f5",
  blush: "#eed5ce",
  ink: "#1a110f",
  soft: "#525252",
  accent: "#7a483a",
  line: "#eadcd8",
};
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const SANS = "Manrope, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string) {
  return `<tr>
  <td style="padding:12px 0;border-bottom:1px solid ${C.line};font:500 12px/1.4 ${SANS};letter-spacing:.06em;text-transform:uppercase;color:${C.accent};width:120px;vertical-align:top">${label}</td>
  <td style="padding:12px 0;border-bottom:1px solid ${C.line};font:15px/1.5 ${SANS};color:${C.ink}">${value}</td>
</tr>`;
}

export function renderContactEmail(m: ContactMessage, receivedAt: Date) {
  const firstName = m.name.split(/\s+/)[0] ?? m.name;
  const date = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(receivedAt);
  const replyHref = `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent(`Re : ${m.subject}`)}`;
  const phoneDigits = m.phone.replace(/[^\d+]/g, "");

  const html = `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nouveau message</title></head>
<body style="margin:0;padding:0;background:${C.paper}">
<div style="display:none;max-height:0;overflow:hidden">${esc(m.subject)} · ${esc(m.message.slice(0, 120))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
<tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
    <tr><td style="padding:0 8px 20px;font:italic 22px/1 ${SERIF};color:${C.ink}">${site.name}</td></tr>
    <tr><td style="background:${C.card};border-radius:28px;padding:36px 32px">
      <p style="margin:0 0 14px"><span style="display:inline-block;background:${C.blush};border-radius:999px;padding:8px 14px;font:500 12px/1 ${SANS};letter-spacing:.06em;text-transform:uppercase;color:${C.accent}">${esc(m.subject)}</span></p>
      <h1 style="margin:0 0 6px;font:italic 400 34px/1.15 ${SERIF};letter-spacing:-.02em;color:${C.ink}">Nouveau message de ${esc(firstName)}</h1>
      <p style="margin:0 0 28px;font:14px/1.5 ${SANS};color:${C.soft}">Reçu le ${esc(date)}, via le formulaire de contact.</p>

      <div style="background:#ffffff;border-radius:20px;padding:22px 24px;margin:0 0 28px;font:16px/1.65 ${SANS};color:${C.ink};white-space:pre-wrap">${esc(m.message)}</div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Nom", esc(m.name))}
        ${row("E-mail", `<a href="mailto:${esc(m.email)}" style="color:${C.ink}">${esc(m.email)}</a>`)}
        ${row("Téléphone", m.phone ? `<a href="tel:${esc(phoneDigits)}" style="color:${C.ink}">${esc(m.phone)}</a>` : `<span style="color:${C.soft}">Non indiqué</span>`)}
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px"><tr>
        <td style="background:${C.ink};border-radius:999px"><a href="${replyHref}" style="display:inline-block;padding:14px 26px;font:500 15px/1 ${SANS};color:#ffffff;text-decoration:none">Répondre à ${esc(firstName)}</a></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:20px 8px 0;font:12px/1.6 ${SANS};color:${C.soft}">Vous pouvez aussi répondre directement à cet e-mail : la réponse partira vers ${esc(m.email)}.<br>${site.url.replace("https://", "")}</td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Nouveau message de ${m.name}`,
    `Sujet : ${m.subject}`,
    `Reçu le ${date}`,
    "",
    m.message,
    "",
    "—",
    `Nom : ${m.name}`,
    `E-mail : ${m.email}`,
    `Téléphone : ${m.phone || "non indiqué"}`,
    "",
    `Répondez directement à cet e-mail pour écrire à ${m.name}.`,
  ].join("\n");

  return {
    subject: `${m.subject} · Nouveau message de ${m.name}`,
    html,
    text,
  };
}
