# Bascule de horizondessens.fr vers le nouveau site (Vercel)

> **Déroulé de référence pour l'agent responsable de la bascule.** Rédigé le 24/11/2026.
> ⛔ **Ne rien lancer sans le go explicite de Maxime** (« fais la bascule » ou équivalent). Le go vaut pour la bascule décrite ici, pas pour d'autres changements.
> ✅ **Tenir ce fichier à jour** : cocher chaque case, dater, noter tout écart. Ajouter toute nouvelle étape au bon endroit. La checklist générale reste `docs/CONTEXTE.md` §15, qui renvoie ici.

## 0. Qui fait quoi

L'agent (Claude) est **responsable de la bascule** quand Maxime la demande. Accès disponibles :

| Action | Outil | Statut |
|---|---|---|
| Zone DNS OVH (lire, ajouter, modifier, supprimer, recharger) | MCP `ovh-domain` | ✅ authentifié le 24/11/2026 |
| Domaines, variables et déploiements Vercel | CLI `npx vercel@latest` (dossier lié, équipe `max-00e6`) | ✅ ; une **suppression** de variable demande l'accord de Maxime (la CLI la bloque) |
| Supabase Auth (Site URL) | API de gestion avec le jeton `sbp_…` **ou** dashboard | ⚠️ le jeton doit être révoqué après la bascule : faire la Site URL **avant** de le révoquer, sinon Maxime la change dans le dashboard (Authentication → URL Configuration) |
| Stripe live (webhook, clés) | — | ⛔ **Hors agent** : les clés live ne passent jamais par une conversation. Élodie ou Maxime créent le webhook live et saisissent les 3 variables live dans Vercel (Production). L'agent vérifie ensuite. |
| Resend | MCP `resend` | ✅ domaine vérifié le 24/11/2026, rien à faire à la bascule |

## 1. Prérequis (avant le go)

- [x] Domaine Resend vérifié, e-mails du site et de Supabase en `contact@horizondessens.fr` (24/11/2026).
- [x] Zone d'origine sauvegardée : `docs/dns/zone-horizondessens-2026-11-24.txt` (référence de retour arrière).
- [x] Travail commité, poussé (`4793b4f`) et déployé sur `horizondessens.vercel.app` le 24/11/2026 : pages principales en 200. ⏳ Reste à vérifier en ligne : une publication CMS et un achat de carte cadeau en test. À refaire avant le go si du travail a été ajouté depuis.
- [ ] Contenus validés par Élodie (textes à valider, CGV et mentions sur hypothèses : voir CONTEXTE.md §13).
- [x] Prestations SimplyBook « 2026 » créées (IDs 25 à 30) et branchées dans `local-services.ts` (25/11/2026). - [ ] Temps de pause, agenda et adresse à régler dans SimplyBook (`docs/simplybook/prestations-2026.md`).
- [ ] **Compte Stripe d'Élodie activé** (`charges_enabled: true`). Maxime attend cette activation.
- [ ] Webhook Stripe **live** `https://horizondessens.fr/api/stripe/webhook` (événements `checkout.session.completed`, `checkout.session.async_payment_succeeded`) et 3 variables live en **Production** (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) : par Élodie ou Maxime. Preview garde les clés de test.
- [ ] **La veille de la bascule (agent)** : passer le TTL des enregistrements du site à **300 s** chez OVH (A racine `87.98.154.146`, A `www`), recharger la zone. But : pouvoir revenir en arrière en 5 minutes. Le TTL par défaut de la zone est 3600 s.

## 2. Bascule (agent, environ 1 h)

### 2.1 Vercel
- [ ] `npx vercel@latest domains add horizondessens.fr` et `www.horizondessens.fr` au projet `horizondessens`.
- [ ] Adresse principale : **`horizondessens.fr`** (sans www), `www` redirige vers elle (308). Les canoniques et le sitemap utilisent déjà `https://horizondessens.fr` (`src/lib/site.ts`, `src/lib/seo.ts`).
- [ ] Relever les valeurs DNS **exactes** que Vercel demande (`npx vercel@latest domains inspect horizondessens.fr`) : en général A `76.76.21.21` pour la racine et CNAME `cname.vercel-dns.com.` pour `www`. **Utiliser celles de Vercel**, pas celles-ci.

### 2.2 OVH (MCP `ovh-domain`)
Montrer à Maxime le tableau exact avant d'appliquer (règle CLAUDE.md), puis :
- [ ] Racine : modifier l'**A** `87.98.154.146` → IP Vercel.
- [ ] `www` : **supprimer** l'A `87.98.154.146`, les 3 MX `www` (`mx1/mx2/mx3.mail.ovh.net`) et les 2 TXT `www` (`"3|welcome"`, `"l|fr"`), restes de l'hébergement OVH (un CNAME ne cohabite avec aucun autre enregistrement). Puis **créer** le CNAME `www` → valeur Vercel.
- [ ] Facultatif : supprimer le TXT racine `"1|www.horizondessens.fr"` (marqueur OVH de l'ancien hébergement) et le CNAME `ftp` (ne sert plus) ; sinon les laisser, ils sont sans effet.
- [ ] **NE PAS TOUCHER** : NS, MX racine, SPF racine `v=spf1 include:mx.ovh.com ~all`, DKIM OVH `ovhmo3699594-selector1/2._domainkey`, `mail`, `imap`, `smtp`, `pop3`, `autoconfig`, `autodiscover`, SRV `_autodiscover`, `_imaps`, `_submission` (messagerie d'Élodie) ; `google-site-verification` ; enregistrements Resend (`resend._domainkey`, `send`, `rsend`, `_dmarc`).
- [ ] **Recharger la zone** (`refresh-domain-zone-zone`). Sans cela, rien n'est appliqué.
- [ ] Contrôler sur `dns112.ovh.net` (`dig @dns112.ovh.net`), puis sur un résolveur public.

### 2.3 Après propagation
- [ ] Vercel affiche le domaine « Valid Configuration » et le certificat HTTPS est émis (automatique).
- [ ] **Redéployer la production** (`npx vercel@latest redeploy <url de prod> --target production`) : `isIndexable` (`src/lib/seo.ts`) lit `VERCEL_PROJECT_PRODUCTION_URL` au build ; sans redéploiement, le site reste en `noindex`.
- [ ] Supabase Auth : **Site URL** → `https://horizondessens.fr` (liste blanche déjà prête : `localhost:3005`, `horizondessens.vercel.app`, `horizondessens.fr`).

## 3. Contrôles (agent)
- [ ] `https://horizondessens.fr` et toutes les pages répondent en HTTPS ; `http://` et `www` redirigent vers `https://horizondessens.fr`.
- [ ] `https://horizondessens.fr/robots.txt` autorise l'indexation ; aucune balise `noindex` sur les pages publiques ; `sitemap.xml` correct.
- [ ] Redirections 308 des anciennes URL PHP (`next.config.ts`).
- [ ] Formulaire de contact : message reçu par Élodie, « Répondre » vers le visiteur.
- [ ] Carte cadeau : achat **réel** de faible montant, e-mail acheteur avec PDF, copie à Élodie, webhook live reçu, puis **remboursement**.
- [ ] CMS : connexion sur `horizondessens.fr/admin`, une modification publiée visible aussitôt, puis rétablie. `npm run test:cms` OK.
- [ ] E-mail « Mot de passe oublié » : le lien mène bien à `horizondessens.fr`.
- [ ] Messagerie d'Élodie : envoi et réception OK sur `e.nguyen@horizondessens.fr` (demander à Maxime de confirmer avec elle).
- [ ] Module de réservation : une page de soin affiche le calendrier (et non le repli téléphone) sur le domaine, ce qui prouve que les variables `SIMPLYBOOK_*` sont actives.

## 4. Après la bascule
- [ ] Google Search Console : propriété de domaine (la vérification TXT existe déjà), envoi du sitemap.
- [ ] Fiche Google Business Profile : URL du site et de réservation (par Élodie).
- [ ] Remettre le TTL des enregistrements du site à 3600 s une fois tout stable (quelques jours).
- [ ] Sécurité : révoquer le jeton Supabase `sbp_…` (après la Site URL) ; régénérer la clé Stripe de **test** et la clé Resend du **site** (passées par une conversation) et les remplacer dans Vercel et `.env.local` ; désactiver les inscriptions publiques Supabase.
- [ ] Inviter Élodie au CMS si ce n'est pas fait (`redirect_to=https://horizondessens.fr/admin/bienvenue`).
- [ ] Garder l'ancien site chez OVH quelque temps, puis décider de sa résiliation avec Maxime.
- [ ] Passer le dépôt GitHub en privé (prévu).
- [ ] Mettre à jour CLAUDE.md, CONTEXTE.md §15 et ce fichier.

## 5. Retour en arrière
Remettre chez OVH l'A racine (et l'A `www`, en supprimant le CNAME) sur `87.98.154.146`, recharger la zone. Avec un TTL de 300 s, l'ancien site revient en quelques minutes. La messagerie n'est jamais concernée. Zone complète d'origine : `docs/dns/zone-horizondessens-2026-11-24.txt`.

## Journal
| Date | Étape | Fait par | Remarque |
|---|---|---|---|
| 24/11/2026 | Préparation | Claude | Resend vérifié, zone sauvegardée, ce déroulé rédigé. Bascule **non lancée** (attend le go de Maxime). |
| 24/11/2026 | Déploiement | Claude | Commit `4793b4f` poussé, production Vercel prête, pages en 200. |

### 26/11/2026 — Bascule faite (go de Maxime, en une passe, sans TTL abaissé la veille)
- Commit `4f7fddf` « Avant test déploiement » poussé (dont l'interrupteur `GIFT_CARD_PAYMENTS=off` : repli vers `/contact#ecrire`).
- Vercel : `CONTACT_TO_EMAIL` = `maxelhaik@gmail.com` (Production et Preview, **tests de Maxime** ; à repasser sur l'adresse d'Élodie après validation). `horizondessens.fr` (principal) et `www.horizondessens.fr` (308 → racine) ajoutés au projet.
- OVH (zone rechargée) : A racine `87.98.154.146` → `216.198.79.1` + nouvel A `64.29.17.1` ; `www` : CNAME `horizondessens.fr.` → `13fd420eb881cba9.vercel-dns-017.com.` ; TXT `www` `"3|welcome"` et `"l|fr"` supprimés. **Non touchés** : MX, SPF, DKIM, Resend, vérification Google, TXT `"1|www.horizondessens.fr"`, `ftp`. (La zone réelle différait de la sauvegarde du 24/11 : `www` était déjà un CNAME, sans A ni MX.)
- Production redéployée → alias `https://horizondessens.fr`. Supabase Auth Site URL → `https://horizondessens.fr` (liste blanche inchangée, contenait déjà le domaine).
- Contrôles : `/` 200, `www` et `http` → 308 vers `https://horizondessens.fr/`, `/rdv` → 308 `/reserver`, `robots.txt` ouvert, `index, follow`, sitemap 13 URL, DNS propagé sur 1.1.1.1.
- **Retour arrière** : A racine → `87.98.154.146` (supprimer `64.29.17.1`), CNAME `www` → `horizondessens.fr.`, recharger la zone.
- Restent : Stripe en **mode test** (Maxime teste ; puis `GIFT_CARD_PAYMENTS=off` + redéploiement en attendant l'activation du compte d'Élodie, puis clés et webhook live) ; `CONTACT_TO_EMAIL` → Élodie ; Search Console ; sécurité (jetons, inscriptions Supabase) ; dépôt GitHub en privé ; réglages SimplyBook.
