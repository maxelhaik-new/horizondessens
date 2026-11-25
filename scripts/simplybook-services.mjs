// Liste les prestations SimplyBook (API REST publique, lecture seule) avec
// leurs IDs, pour renseigner `simplybookId` dans src/services/local-services.ts.
// Usage : npm run simplybook:services   (lit .env.local)
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((line) => /^SIMPLYBOOK_\w+=/.test(line))
    .map((line) => [
      line.slice(0, line.indexOf("=")),
      line.slice(line.indexOf("=") + 1).trim(),
    ]),
);
const host = env.SIMPLYBOOK_API_HOST?.replace(/\/$/, "");
const company = env.SIMPLYBOOK_COMPANY;
const key = env.SIMPLYBOOK_API_KEY;
if (!host || !company || !key) {
  console.error(
    "SIMPLYBOOK_API_HOST, SIMPLYBOOK_COMPANY et SIMPLYBOOK_API_KEY sont requis dans .env.local.",
  );
  process.exit(1);
}

const { token } = await fetch(`${host}/public/auth/token`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ company, key }),
}).then((r) => r.json());
if (!token)
  throw new Error("Jeton refusé : vérifier la clé API REST publique.");

const res = await fetch(`${host}/public/services?on_page=100`, {
  headers: { "X-Company-Login": company, "X-Token": token },
}).then((r) => r.json());

const rows = (res.data ?? []).map((s) => ({
  id: s.id,
  2026: /2026/.test(s.name) ? "✓" : "",
  nom: s.name,
  durée: s.duration ?? "—",
  "pause après": s.buffer_time_after ?? "—",
  visible: s.is_visible ? "oui" : "non",
}));
console.table(rows);
