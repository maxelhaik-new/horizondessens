/**
 * Applique les modèles d'e-mails Supabase Auth versionnés dans
 * supabase/templates/ (invitation, mot de passe oublié) par l'API de gestion,
 * puis relit la configuration pour vérifier. Les objets des e-mails ne sont
 * pas modifiés.
 *
 * Jeton : SUPABASE_ACCESS_TOKEN (jeton personnel `sbp_…`, Account → Access
 * Tokens), lu dans l'environnement ou dans .env.local (jamais versionné).
 * Usage : npm run supabase:templates
 */
import { readFile } from "node:fs/promises";

const REF = "vlpevjffaqzvksjfknhk";
const root = process.cwd();

async function token() {
  if (process.env.SUPABASE_ACCESS_TOKEN)
    return process.env.SUPABASE_ACCESS_TOKEN;
  const env = await readFile(`${root}/.env.local`, "utf8").catch(() => "");
  const line = env
    .split("\n")
    .find((l) => l.startsWith("SUPABASE_ACCESS_TOKEN="));
  return line
    ?.slice("SUPABASE_ACCESS_TOKEN=".length)
    .trim()
    .replace(/^"|"$/g, "");
}

const auth = await token();
if (!auth) {
  console.error(
    "SUPABASE_ACCESS_TOKEN absent (environnement ou .env.local) : rien n'est envoyé.",
  );
  process.exit(1);
}

const templates = {
  mailer_templates_invite_content: await readFile(
    `${root}/supabase/templates/invite.html`,
    "utf8",
  ),
  mailer_templates_recovery_content: await readFile(
    `${root}/supabase/templates/recovery.html`,
    "utf8",
  ),
};

const url = `https://api.supabase.com/v1/projects/${REF}/config/auth`;
const headers = {
  Authorization: `Bearer ${auth}`,
  "Content-Type": "application/json",
};

const res = await fetch(url, {
  method: "PATCH",
  headers,
  body: JSON.stringify(templates),
});
if (!res.ok) {
  console.error(`Échec de l'envoi : HTTP ${res.status}`, await res.text());
  process.exit(1);
}

const check = await fetch(url, { headers });
const config = await check.json();
for (const [key, value] of Object.entries(templates)) {
  console.log(
    `${key} : ${config[key] === value ? "appliqué" : "DIFFÉRENT de la version du dépôt"}`,
  );
}
