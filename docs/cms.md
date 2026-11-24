# Mini-CMS — Horizon des Sens

> Mis en place le 23/11/2026. Élodie (et Maxime) modifient les textes et les photos **directement sur les vraies pages du site**, avec des limites de caractères, sans pouvoir toucher à la mise en page.

## 1. Principe

| | |
|---|---|
| **Où on édite** | Sur le site lui-même. Connexion sur `/admin` → le **mode édition** (Draft Mode de Next.js) s'active → on navigue sur les vraies pages, mises en forme comme en ligne. |
| **Texte** | Clic sur un texte → il devient modifiable **dans l'élément lui-même** : même police, même italique, mêmes retours à la ligne, mise en page recalculée pendant la frappe. Compteur `n / max` et **limite stricte** (frappe et collage bloqués au-delà). Entrée (ou clic ailleurs) enregistre, Échap annule. Textes longs : ⌘ + Entrée valide, Entrée va à la ligne. |
| **Photo** | Survol d'une photo → bouton discret **« Remplacer »** en haut à droite (sur mobile : toucher la photo). Fenêtre : aperçu dans le format du site, choix du fichier, description (alt), légende pour les galeries, ajout / retrait dans une galerie. La photo est **redimensionnée (2400 px max) et compressée en WebP dans le navigateur** avant l'envoi. |
| **Brouillon → publication** | Chaque modification est un **brouillon** (visible uniquement en mode édition, repéré par un pointillé rosé). La barre en bas indique « N modifications » (liste, annulation une à une), « Aperçu » (voir sans les outils), **« Publier »** (met tout en ligne d'un coup) et « Annuler tout ». |
| **Retour en arrière** | « Rétablir l'original » sur un champ = revenir au texte du code (appliqué à la publication). Chaque publication est archivée dans `cms_revisions` (ancienne + nouvelle valeur). |
| **Visiteurs** | Pages **statiques**, HTML **strictement identique** à avant (les marqueurs `data-cms` ne sont posés qu'en mode édition, l'éditeur n'est pas chargé). Le contenu publié est mis en cache sans limite et invalidé à chaque publication. |

## 2. Architecture

```
Composant serveur ──getContents([...])──► store.ts ──┬─ visiteurs : loadPublished()  "use cache" + cacheTag("cms-content")
   │                                                 │               fetch REST cms_content (clé publishable, RLS)
   │  {...c.edit("clé", index?, sous-champ?)}        └─ mode édition : + cms_drafts (session de l'éditeur, RLS), sans cache
   ▼                                                  ▼
 élément HTML (data-cms*)                  valeur = stockée si forme valide, sinon defaults.ts
   ▲
 src/cms/editor.tsx (client, monté par CmsEditorRoot dans le layout, Draft Mode seulement)
   ├─ text-session.ts : édition en place (span contenteditable ajouté, nœuds React masqués, jamais retirés)
   ├─ image-panel.tsx + prepare-image.ts : upload direct navigateur → Storage `cms-media`
   └─ actions.ts (Server Actions) : saveDraft / restoreDefault / discardDraft / discardAll / publishAll / signIn / signOut
                                    validation contre le registre (validateField) + vérification is_cms_editor()
```

- **Registre** (`src/content/registry.ts`) : seule source des champs éditables, de leurs types et de leurs limites. Ajouter un champ = l'ajouter au registre + à `defaults.ts` + `c.edit()` sur l'élément qui l'affiche.
- **Types** : `text`, `textarea`, `list`, `items` (sous-champs ; `image: { ratio }` pour un chemin d'image décorative), `image` (src + alt), `gallery` (images + légende facultative).
- **Marquage** : `c.edit(clé)` ; `c.edit(clé, i)` pour un élément de liste / galerie ; `c.edit(clé, i, "sous-champ")` pour un sous-champ ; `c.edit(clé, i, "para")` pour le paragraphe *i* d'un texte long affiché en plusieurs `<p>`. Composants partagés : `SplitWords edit=`, `Eyebrow edit=`, `SectionHeading edit={{ eyebrow, title, intro }}`, `RevealImage edit=`, `Marquee edit={(i) => …}`. Le marqueur se pose sur l'élément qui ne contient **que** la valeur (sinon : l'envelopper dans un `<span>`).
- **Robustesse** : une valeur stockée dont la forme ne correspond plus au registre (type changé) est ignorée → valeur du code. Une limite resserrée n'efface pas un texte déjà publié.
- **Session** : `src/proxy.ts` rafraîchit la session Supabase, **uniquement** sur `/admin` et pour les navigateurs qui ont le cookie Draft Mode.

## 3. Supabase

Migration : `supabase/migrations/20261123180000_cms.sql` (appliquée le 23/11/2026).

| Objet | Rôle | Accès |
|---|---|---|
| `cms_content` | Contenu publié (clé → JSON). Absent = valeur du code. | Lecture : tous. Écriture : via `cms_publish()` seulement. |
| `cms_drafts` | Brouillons. `value` NULL = « rétablir l'original ». | Éditeurs seulement (RLS). |
| `cms_revisions` | Historique des publications. | Lecture : éditeurs. |
| `cms_editors` | Comptes autorisés (`user_id`). Un compte Auth seul ne suffit pas. | — |
| `is_cms_editor()`, `cms_publish(keys?)` | Contrôle d'accès, publication atomique. | `authenticated` (vérifient eux-mêmes l'éditeur). |
| Bucket `cms-media` | Photos (public en lecture, 10 Mo, jpeg/png/webp/avif). | Écriture / suppression : éditeurs. |

### Ajouter un éditeur
1. **Invitation** (recommandé) : Dashboard → Authentication → Users → **Invite user**, ou API admin `POST /auth/v1/invite?redirect_to=<site>/admin/bienvenue`. La personne reçoit un e-mail, clique, arrive sur `/admin/bienvenue` (lit la session du lien) puis `/admin/mot-de-passe` (choisit son mot de passe, 10 caractères min.) et entre directement en mode édition.
   Variante : « Add user → Create new user » avec un mot de passe choisi par la personne elle-même.
2. L'autoriser (SQL Editor, ou via le MCP) :
   ```sql
   insert into public.cms_editors (user_id)
   select id from auth.users where email = 'adresse@exemple.fr';
   ```
3. **Mot de passe oublié** : lien sur `/admin` → e-mail → `/admin/bienvenue` → `/admin/mot-de-passe`.
4. **Lien expiré** (1 h, usage unique ; certains antivirus de messagerie « ouvrent » le lien avant vous) : générer un lien **sans e-mail** avec l'API admin `POST /auth/v1/admin/generate_link` (`{"type":"recovery","email":…,"redirect_to":"<site>/admin/bienvenue"}`, clé secrète) et le transmettre directement.

### E-mails d'authentification (limites actuelles)
- Serveur d'e-mail **par défaut de Supabase** : n'envoie **qu'aux membres de l'organisation Supabase**, 2 e-mails par heure, modèles **en anglais** et **non modifiables** sur l'offre gratuite. ⚠️ **L'invitation d'Élodie ne partira pas** tant qu'un SMTP personnalisé n'est pas configuré.
- À faire : **SMTP Resend** dans Supabase (Authentication → Emails → SMTP : `smtp.resend.com`, port 465, utilisateur `resend`, mot de passe = une clé API Resend, expéditeur `contact@horizondessens.fr`) une fois le domaine vérifié chez OVH. On pourra alors traduire les modèles (invitation, mot de passe oublié).
- **Site URL** Supabase = `http://localhost:3005` pour l'instant (liens des e-mails). Liste blanche : `localhost:3005`, `horizondessens.vercel.app`, `horizondessens.fr`. **À passer à `https://horizondessens.fr` à la mise en ligne.**

### Variables
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (publiques, protégées par le RLS) : dans `.env.local` et sur Vercel (production, preview, development). **Aucune clé secrète n'est nécessaire.**

### Publication en ligne et environnements
- **Sur le site en ligne** (`horizondessens.fr/admin`, ou `horizondessens.vercel.app/admin` avant la bascule) : « Publier » écrit dans Supabase puis invalide le cache de Vercel (`updateTag`). La modification est **en ligne immédiatement**, sans commit, push ni déploiement.
- **En local** (`localhost:3005`) : la base est **la même**. Publier depuis le local publie donc pour de vrai, mais n'invalide pas le cache de Vercel : la modification n'apparaît en ligne qu'au prochain déploiement. Élodie édite uniquement en ligne ; en local, éviter de publier des essais.

### Test de non-régression
`npm run test:cms` (`tests/cms.integration.test.ts`, runner Node + tsx). Sur le vrai projet, avec une vraie session d'éditeur ouverte sans e-mail (lien magique généré par la clé secrète) : un visiteur ne peut ni écrire, ni lire les brouillons, ni publier ; brouillon invisible du public ; « Publier » met en ligne et archive ; « Rétablir l'original » + « Publier » retire. Il n'utilise que la clé `test.cms.regression` (jamais lue par le site), ne publie que celle-ci, et **efface tout ce qu'il a créé à la fin** (contenu, brouillon, historique), même en cas d'échec. Variables dans `.env.local` : `SUPABASE_SECRET_KEY` (test uniquement, **jamais sur Vercel**) et `CMS_TEST_EDITOR_EMAIL`. Sans elles, le test est ignoré.

## 4. Guide express pour Élodie

1. Aller sur **horizondessens.fr/admin** et se connecter.
2. On arrive sur le site, en mode édition. **Cliquer sur un texte** pour le modifier. Le compteur indique la place restante.
3. **Survoler une photo** et cliquer sur « Remplacer ». Choisir la photo, la décrire en une phrase, puis « Enregistrer ».
4. Les modifications sont **en brouillon** : personne d'autre ne les voit. « Aperçu » permet de vérifier la page sans les outils.
5. Cliquer sur **« Publier »** : le site public est à jour.
6. « ⋯ → Quitter le mode édition » pour sortir.

Dans le mode édition, un clic sur un texte qui est aussi un lien (titre de carte, question de FAQ) le **modifie** au lieu de l'ouvrir. Pour naviguer, utiliser le menu. Pour ouvrir une réponse de FAQ, cliquer sur le **+**.

## 5. Limites connues / suite possible
- Pas d'interface pour l'historique : un retour à une ancienne version se fait en SQL depuis `cms_revisions`.
- Pas de recadrage manuel des photos : le site les cadre au centre (`object-cover`). Un point focal par photo est possible plus tard.
- Les anciennes photos ne sont pas supprimées du bucket (nettoyage à prévoir si besoin).
- Les metas, menus, prix et durées restent dans le code ou dans SimplyBook (choix du projet).
- Édition au clavier seul (sans souris) non prévue.
