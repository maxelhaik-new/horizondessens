import "server-only";

import {
  SANS,
  SERIF,
  emailColors as C,
  emailHead,
  emailLogo,
  esc,
} from "@/lib/email-style";
import { routes } from "@/lib/navigation";
import { site } from "@/lib/site";
import { formatDuration, formatPrice } from "@/services/format";

import { formatDateFr, type GiftCardOrder } from "./order";

/*
 * E-mails d'une carte cadeau (PDF en pièce jointe) :
 * - à l'acheteur : merci, récapitulatif, comment l'offrir et réserver ;
 * - à Élodie : la vente, avec tout le détail pour le registre.
 * Charte commune : `src/lib/email-style.ts`.
 */

function row(label: string, value: string) {
  return `<tr>
  <td style="padding:11px 0;border-bottom:1px solid ${C.line};font:500 12px/1.4 ${SANS};letter-spacing:.06em;text-transform:uppercase;color:${C.accent};width:140px;vertical-align:top">${label}</td>
  <td style="padding:11px 0;border-bottom:1px solid ${C.line};font:15px/1.5 ${SANS};color:${C.ink}">${value}</td>
</tr>`;
}

function layout(opts: { preheader: string; body: string; footer: string }) {
  return `<!doctype html>
<html lang="fr">
${emailHead(site.name)}
<body style="margin:0;padding:0;background:${C.paper}">
<div style="display:none;max-height:0;overflow:hidden">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
<tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
    <tr><td style="padding:0 8px 22px">${emailLogo()}</td></tr>
    <tr><td style="background:${C.card};border-radius:28px;padding:36px 32px">${opts.body}</td></tr>
    <tr><td style="padding:20px 8px 0;font:12px/1.6 ${SANS};color:${C.soft}">${opts.footer}</td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function cardLabel(order: GiftCardOrder) {
  return `${order.title} ${formatDuration(order.durationMinutes)}`;
}

/** E-mail à l'acheteur, avec la carte en PDF. */
export function renderBuyerEmail(order: GiftCardOrder, origin: string) {
  const firstName = order.buyerName.split(/\s+/)[0] || "";
  const validUntil = formatDateFr(order.validUntil);
  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
  const bookingUrl = `${origin}${routes.reserver}`;

  // Compromis entre la lettre et la newsletter : charte du site (fond papier,
  // carte claire, Goudy et Source Sans), mais un texte écrit à la première
  // personne, le nom du site en texte plutôt qu'un logo en image, aucun
  // bouton ni pastille et un seul lien. Ce sont surtout les images, boutons
  // et liens multiples qui font classer un e-mail en « Promotions » (Gmail).
  const p = (content: string, last = false) =>
    `<p style="margin:0 0 ${last ? 0 : 16}px;font:16px/1.65 ${SANS};color:${C.ink}">${content}</p>`;
  const html = `<!doctype html>
<html lang="fr">
${emailHead(site.name)}
<body style="margin:0;padding:0;background:${C.paper}">
<div style="display:none;max-height:0;overflow:hidden">Votre carte cadeau ${esc(cardLabel(order))} pour ${esc(order.recipient)}, valable jusqu'au ${esc(validUntil)}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
<tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
    <tr><td style="padding:0 8px 18px;font:italic 400 26px/1 ${SERIF};letter-spacing:-.01em;color:${C.ink}">${site.name.toLowerCase()}</td></tr>
    <tr><td style="background:${C.card};border-radius:28px;padding:36px 32px">
      <h1 style="margin:0 0 22px;font:italic 400 30px/1.2 ${SERIF};letter-spacing:-.02em;color:${C.ink}">Votre carte cadeau pour ${esc(order.recipient)}</h1>
      ${p(`Bonjour${firstName ? ` ${esc(firstName)}` : ""},`)}
      ${p(`Merci pour votre commande. Vous trouverez la carte cadeau en pièce jointe, au format PDF : vous pouvez l'imprimer ou la transférer à ${esc(order.recipient)}.`)}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 24px">
        ${row("Séance", esc(cardLabel(order)))}
        ${row("Numéro", `<strong style="letter-spacing:.04em">${esc(order.code)}</strong>`)}
        ${row("Valable jusqu'au", esc(validUntil))}
      </table>
      ${p(`Pour réserver, ${esc(order.recipient)} peut m'appeler au ${site.phone.display} ou réserver en ligne sur <a href="${bookingUrl}" style="color:${C.accent}">${bookingUrl.replace(/^https?:\/\//, "")}</a>, en indiquant le numéro de la carte. Le salon se trouve ${esc(address)}, près de Tours.`)}
      ${p("Si vous avez la moindre question, répondez simplement à cet e-mail.")}
      ${p(`À bientôt,<br><span style="font:italic 400 20px/1.6 ${SERIF}">Élodie</span>`, true)}
    </td></tr>
    <tr><td style="padding:20px 8px 0;font:12px/1.6 ${SANS};color:${C.soft}">${esc(address)} · ${site.phone.display}<br>Carte nominative, valable 6 mois, utilisable en une fois, non remboursable (conditions générales de vente sur le site).</td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Bonjour${firstName ? ` ${firstName}` : ""},`,
    "",
    `Merci pour votre commande. Vous trouverez la carte cadeau pour ${order.recipient} en pièce jointe, au format PDF.`,
    "",
    `Séance : ${cardLabel(order)}`,
    `Numéro : ${order.code}`,
    `Valable jusqu'au : ${validUntil}`,
    "",
    `Pour réserver : ${site.phone.display} ou ${bookingUrl}, en indiquant le numéro de la carte.`,
    `Adresse : ${address}`,
    "",
    "Si vous avez la moindre question, répondez simplement à cet e-mail.",
    "",
    "À bientôt,",
    "Élodie",
    site.name,
  ].join("\n");

  return {
    subject: `Votre carte cadeau pour ${order.recipient} (n° ${order.code})`,
    html,
    text,
  };
}

/** E-mail à Élodie : une carte vient d'être vendue. */
export function renderSalonEmail(order: GiftCardOrder) {
  const validUntil = formatDateFr(order.validUntil);
  const body = `
      <p style="margin:0 0 14px"><span style="display:inline-block;background:${C.blush};border-radius:999px;padding:8px 14px;font:500 12px/1 ${SANS};letter-spacing:.06em;text-transform:uppercase;color:${C.accent}">Carte cadeau vendue</span></p>
      <h1 style="margin:0 0 6px;font:italic 400 34px/1.15 ${SERIF};letter-spacing:-.02em;color:${C.ink}">${esc(cardLabel(order))} pour ${esc(order.recipient)}</h1>
      <p style="margin:0 0 26px;font:14px/1.5 ${SANS};color:${C.soft}">Payée en ligne le ${esc(formatDateFr(order.purchasedAt))}. La carte est jointe ; elle a été envoyée à l'acheteur.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Numéro", `<strong style="letter-spacing:.04em">${esc(order.code)}</strong>`)}
        ${row("Séance", esc(cardLabel(order)))}
        ${row("Montant", esc(formatPrice(order.priceEuros)))}
        ${row("Pour", esc(order.recipient))}
        ${row("De la part de", order.from ? esc(order.from) : `<span style="color:${C.soft}">Non indiqué</span>`)}
        ${order.message ? row("Petit mot", esc(order.message)) : ""}
        ${row("Acheteur", `${esc(order.buyerName)}<br><a href="mailto:${esc(order.buyerEmail)}" style="color:${C.ink}">${esc(order.buyerEmail)}</a>`)}
        ${row("Valable jusqu'au", esc(validUntil))}
      </table>`;

  const html = layout({
    preheader: `${order.code} · ${cardLabel(order)} pour ${order.recipient}`,
    body,
    footer: `Pour retrouver une carte : tableau de bord Stripe, Paiements, recherche par numéro (${esc(order.code)}).<br>Répondre à cet e-mail écrit à l'acheteur.`,
  });

  const text = [
    `Carte cadeau vendue : ${cardLabel(order)} pour ${order.recipient}`,
    "",
    `Numéro : ${order.code}`,
    `Montant : ${formatPrice(order.priceEuros)}`,
    `De la part de : ${order.from || "non indiqué"}`,
    ...(order.message ? [`Petit mot : ${order.message}`] : []),
    `Acheteur : ${order.buyerName} <${order.buyerEmail}>`,
    `Émise le : ${formatDateFr(order.purchasedAt)}`,
    `Valable jusqu'au : ${validUntil}`,
  ].join("\n");

  return {
    subject: `Carte cadeau vendue · ${cardLabel(order)} · ${order.code}`,
    html,
    text,
  };
}
