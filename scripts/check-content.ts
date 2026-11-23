/**
 * Vérifie que les valeurs par défaut respectent le registre de contenu
 * (longueurs max, listes, alt des images). Lancé par `npm run content:check`
 * et avant chaque build.
 */
import { contentFields } from "../src/content/registry";
import { validateDefaults } from "../src/content/validate";

const issues = validateDefaults();
const count = Object.keys(contentFields).length;

if (issues.length > 0) {
  console.error(`✗ Contenu : ${issues.length} problème(s) sur ${count} clé(s)`);
  for (const { key, message } of issues)
    console.error(`  - ${key} : ${message}`);
  process.exit(1);
}

console.log(`✓ Contenu : ${count} clé(s) conformes au registre`);
