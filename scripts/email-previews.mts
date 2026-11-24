/**
 * Planche d'aperçu de TOUS les e-mails envoyés par le site, avec des données
 * fictives, rendus par les vrais modèles. Usage :
 *   npx tsx --conditions=react-server scripts/email-previews.mts <sortie.html>
 */
import { readFileSync, writeFileSync } from "node:fs";

import { renderContactEmail } from "@/app/contact/email-template";
import { renderBuyerEmail, renderSalonEmail } from "@/lib/gift-card/emails";
import { addMonths, type GiftCardOrder } from "@/lib/gift-card/order";

const out = process.argv[2] ?? "email-previews.html";
const now = new Date("2026-11-24T15:30:00+01:00");

const order: GiftCardOrder = {
  sessionId: "cs_test_apercu",
  paymentIntentId: "pi_test_apercu",
  code: "HDS-7K3M-Q9PX",
  title: "Kobido",
  durationMinutes: 75,
  priceEuros: 120,
  recipient: "Camille Martin",
  from: "Julien",
  message: "Pour prendre enfin un moment rien qu'à toi. Joyeux anniversaire !",
  buyerName: "Julien Bernard",
  buyerEmail: "julien.bernard@example.com",
  purchasedAt: now,
  validUntil: addMonths(now, 6),
  sent: false,
};

const supabase = (file: string, subject: string) => ({
  subject,
  html: readFileSync(`supabase/templates/${file}`, "utf8").replace(
    "{{ .ConfirmationURL }}",
    "#",
  ),
});

const emails = [
  {
    who: "Élodie · formulaire de contact",
    from: "contact@horizondessens.fr → e.nguyen@ (Répondre = le visiteur)",
    ...renderContactEmail(
      {
        name: "Sophie Laurent",
        email: "sophie.laurent@example.com",
        phone: "06 12 34 56 78",
        subject: "Kobido",
        message:
          "Bonjour,\n\nJe souhaiterais savoir si le Kobido convient en cas de peau sensible. Avez-vous des disponibilités un samedi matin ?\n\nMerci beaucoup !",
      },
      now,
    ),
  },
  {
    who: "Acheteur · carte cadeau (PDF joint)",
    from: "contact@horizondessens.fr → acheteur (Répondre = Élodie)",
    ...renderBuyerEmail(order, "https://horizondessens.fr"),
  },
  {
    who: "Élodie · carte cadeau vendue (PDF joint)",
    from: "contact@horizondessens.fr → e.nguyen@ (Répondre = l'acheteur)",
    ...renderSalonEmail(order),
  },
  {
    who: "CMS · invitation (Supabase)",
    from: "contact@horizondessens.fr → nouvel éditeur",
    ...supabase("invite.html", "Votre accès au site Horizon des Sens"),
  },
  {
    who: "CMS · mot de passe oublié (Supabase)",
    from: "contact@horizondessens.fr → éditeur",
    ...supabase("recovery.html", "Nouveau mot de passe · Horizon des Sens"),
  },
];

const attr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

writeFileSync(
  out,
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>E-mails · Horizon des Sens</title>
<style>body{margin:0;padding:32px;background:#e9e6e1;font:14px/1.5 system-ui,sans-serif;color:#222}
h1{font:600 20px system-ui;margin:0 0 24px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(620px,1fr));gap:28px}
figure{margin:0;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)}
figcaption{padding:14px 18px;border-bottom:1px solid #eee}figcaption b{display:block;font-size:15px}
figcaption span{color:#666;font-size:12.5px}iframe{width:100%;height:900px;border:0;display:block}</style></head>
<body><h1>Tous les e-mails envoyés par le site (données fictives)</h1><div class="grid">
${emails
  .map(
    (
      e,
    ) => `<figure><figcaption><b>${e.who}</b><span>Objet : « ${attr(e.subject)} » · ${attr(e.from)}</span></figcaption>
<iframe srcdoc="${attr(e.html)}"></iframe></figure>`,
  )
  .join("\n")}
</div></body></html>`,
);
console.log(`${emails.length} e-mails → ${out}`);
