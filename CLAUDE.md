# CLAUDE.md — Horizon des Sens

> Point d'entrée pour tout agent qui reprend ce projet. **Lis ce fichier en premier**, puis [docs/CONTEXTE.md](docs/CONTEXTE.md), en particulier **§13 Décisions**.
> ⚠️ **Mets ce fichier à jour à la fin de chaque étape, décision ou livrable** : état d'avancement, décisions, nouveaux fichiers. C'est une règle du projet.

## Le projet

Refonte du site vitrine **horizondessens.fr** pour **Élodie Poirier**, masseuse bien-être, marque **« Horizon des Sens »** (avec un S majuscule).

La refonte accompagne deux changements :
- son **déménagement** au 9 Quai des Maisons Blanches, 37540 Saint-Cyr-sur-Loire, dans le cabinet **Sensoa** (https://www.sensoa-massage.fr/) de la mère de Maxime. ⚠️ **Sensoa est un salon concurrent**, même s'il partage le cabinet. Son site sert de référence d'idées, sans **aucun texte repris tel quel**. Ses images ne sont réutilisables qu'après **validation de Maxime**. Maxime est aussi le développeur de Sensoa ;
- son **repositionnement Kobido**. Une carte courte de massages corps « expérience » est conservée, dont le Massage des 5 continents comme différenciant.

- **Utilisateur** : Maxime, designer et développeur du site, interlocuteur d'Élodie. Il échange en français.
- **Stack (validée)** : **Next.js** (React) + Tailwind CSS + Framer Motion, hébergement **Vercel**. Pages statiques revalidées à la publication, pour le SEO.
- **CMS (validé)** : un **mini-CMS maison**. Élodie édite directement sur `/admin`, qui affiche le vrai site.
  - Seuls les textes et les images sont modifiables, avec un `maxLength` par champ, déclaré dans un registre de champs.
  - Stockage **Supabase** : Postgres, Storage et Auth.
  - Le contenu n'est ni dans des fichiers locaux ni dans Git.
  - Détails : [docs/options-techniques.md](docs/options-techniques.md) §B.
- **Prise de RDV (validée)** : SimplyBook.me (`horizondessens.simplybook.it`), en **hybride**.
  - Les cartes prestations sont générées depuis l'API SimplyBook `getEventList`, côté serveur et mises en cache. SimplyBook est la source de vérité pour le nom, la durée et le prix, donc pas de double saisie.
  - Le widget iframe est thémé via `theme_settings`, sans le CSS payant, et pré-rempli sur la prestation.
  - Le CMS porte l'éditorial, relié à chaque prestation par son ID SimplyBook.
  - Repli : le widget thémé seul, si la custom feature API n'est pas disponible.
  - Détails : [docs/options-techniques.md](docs/options-techniques.md) §A.
- **Cartes cadeaux** : paiement **Stripe** sur le site, avec **génération et envoi automatique d'un PDF**.
- **Domaine** : chez OVH. La bascule se fera en changeant les DNS ; l'ancien site n'est pas supprimé.
- **Dépôt Git** : https://github.com/maxelhaik-new/horizondessens. Il est **PUBLIC** et encore vide. `gh` est connecté au compte `maxelhaik-new`. Le dépôt est initialisé en local sur la branche `main`, avec le remote `origin`.
- **Décision de Maxime** (seul gérant du dépôt) : on **commit tout**, sauf l'évident (`node_modules`, `.env*`, builds, etc. : voir `.gitignore`).
- Premier commit le 23/11/2026.
- **Push** : à faire uniquement quand Maxime le demande.
- **Supabase** : projet `vlpevjffaqzvksjfknhk` (https://supabase.com/dashboard/project/vlpevjffaqzvksjfknhk). Le **serveur MCP Supabase** est déclaré au niveau du projet dans `.mcp.json` (23/11/2026) : transport http, `https://mcp.supabase.com/mcp?project_ref=vlpevjffaqzvksjfknhk&features=docs,account,database,debugging,development,functions,branching,feedback,notebooks`.
- Il ne contient aucun secret. ✅ **Authentifié par OAuth et vérifié** le 23/11/2026 : l'URL de l'API est `https://vlpevjffaqzvksjfknhk.supabase.co` et le schéma `public` est vide pour l'instant.
- Il est prévu pour plus tard, au moment de coder le CMS.
- La Supabase CLI n'est pas installée.

## Documents de référence

| Fichier | Contenu | Quand le lire |
|---|---|---|
| [PRODUCT.md](PRODUCT.md) | **La vérité produit durable, au format impeccable** : utilisateurs, objectif, positionnement, contraintes, engagements de marque, preuves disponibles, principes. Il est lu par le skill impeccable. | Avant tout travail de design ou de contenu |
| [docs/contenu/plan-du-site.md](docs/contenu/plan-du-site.md) | Plan complet du site (pages, URL, SEO, navigation), pages légales obligatoires (mentions, CGV, confidentialité, cookies), redirections 301, règle des contenus éditables. **v1 à valider.** | Avant de rédiger ou de coder une page |
| [docs/contenu/accueil-v1.md](docs/contenu/accueil-v1.md) | Contenu de l'accueil en texte : 10 sections, mise en page décrite, images proposées, clés éditables avec leur `maxLength`. **v1 à valider.** | Avant le design et le dev de l'accueil |
| [docs/design/serelin-inspiration.md](docs/design/serelin-inspiration.md) | Analyse du template **Serelin** (Framer, medspa et wellness). C'est la **référence d'inspiration** pour les tokens, les mises en page et les animations, **réécrits proprement**, sans reprise du code décompilé, des images ni des textes. On y trouve la correspondance des sections avec l'accueil v1. | Avant le design et le code des composants |
| [assets/Cartes cadeau temp/](assets/Cartes%20cadeau%20temp/) | 3 mockups temporaires « main qui tient une carte vierge », sur fond terracotta (décor de riad), en 1200×960. Ils seront remplacés plus tard. | Section et page carte cadeau |
| [assets/images/](assets/images/) | Images **validées par Maxime** (Sensoa et Unsplash), en pleine résolution, à compresser avant usage. | Pour toute image du site |
| [docs/CONTEXTE.md](docs/CONTEXTE.md) | **Synthèse de référence** : acteurs, enjeux, positionnement, offre, DA, SEO, fonctionnalités, technique, planning. **§13 = décisions validées par Maxime, elles priment.** | Toujours, avant tout travail de contenu ou de design |
| [docs/site-actuel.md](docs/site-actuel.md) | Scraping intégral de l'ancien site (23/11/2026) : textes mot pour mot, tarifs, structure, images. | Pour reprendre un contenu existant. **Ne pas re-visiter le site.** |
| [docs/transcription-rdv-cadrage-2026-11-13.md](docs/transcription-rdv-cadrage-2026-11-13.md) | Transcription brute Whisper du RDV de cadrage (13/11/2026). Elle contient des erreurs : « qu'au bidot » = Kobido, « Calmermonie » = Calme et Harmonie, « Tensua / SensoA » = Sensoa. | Pour vérifier une nuance. Sinon, préférer CONTEXTE.md. |
| [docs/options-techniques.md](docs/options-techniques.md) | Options SimplyBook (widget thémé, hybride API + widget, tunnel sur mesure) et options CMS (mini-CMS maison avec édition en place, Sanity, Storyblok), avec recommandations. | Avant toute décision technique |
| [references/sensoa/](references/sensoa/) | Scraping du site concurrent Sensoa (`sensoa-site.md`, 71 URL, Wix) et ses 145 images (`images/`, 218 Mo en pleine résolution, avec une colonne « Réutilisable ? » à remplir par Maxime). **Idées uniquement, pas de reprise de texte. Images seulement si Maxime les valide.** La synthèse est dans CONTEXTE.md §14. | Pour s'inspirer de la structure et des fonctionnalités |
| [Images Elodie/](Images%20Elodie/) | Visuels d'Élodie : `Carte massages 2026.png` (carte IA des prestations, **base de l'offre**), `Logo Old.png` (raster 750 px sur `#B84C64`), `Carte cadeau old.png`, `Image licence.png` (badge M5C), `Photo Elodie.png` (selfie). Analyse : CONTEXTE.md §12bis. | Pour l'offre, la DA et les assets |

L'audio source n'est pas dans le projet : `~/Downloads/Elodie Poirier 13 Nov 2026.m4a`.

## Code : stack initialisée (23/11/2026)

> ⚠️ **Next.js 16.4** : ses API diffèrent de ce que l'on connaît d'habitude. Lis [AGENTS.md](AGENTS.md) (le fichier généré par Next) et la doc embarquée `node_modules/next/dist/docs/` **avant d'écrire du code Next**. `cacheComponents` et `partialPrefetching` sont activés.

| Élément | Choix |
|---|---|
| Framework | Next.js 16.4.6 (App Router, Turbopack, `src/`), React 19.3, TypeScript strict |
| Styles | Tailwind CSS 4.3. Les tokens vont dans le `@theme` de `src/app/globals.css`, **vide en attendant le design**. Pas de police chargée pour l'instant (`next/font`, à faire avec le design). |
| Animations | `motion` (successeur de Framer Motion) : `import { motion } from "motion/react"` dans un composant client, `motion/react-client` côté serveur. |
| Utilitaires | `cn()` (clsx + tailwind-merge) dans `src/lib/cn.ts`. Les données fixes (coordonnées, réseaux, URL SimplyBook) sont dans `src/lib/site.ts`. |
| Qualité | ESLint (config Next), Prettier avec le plugin Tailwind (tri des classes). `serelin/`, `references/`, `docs/`, `assets/` et `.claude/` sont exclus du lint, de TypeScript et de Prettier. |
| Redirections | Les anciennes URL du site PHP sont redirigées vers les nouvelles (308) dans `next.config.ts`. C'est testé. |
| Images | `next/image` en AVIF/WebP. Les originaux en haute définition restent dans `assets/images/`, les versions web optimisées iront dans `public/images/`. |
| Secrets | `.env.example` (Supabase, SimplyBook, Stripe) ; les vraies valeurs vont dans `.env.local`, ignoré par Git. |

**Couche contenu** (`src/content/`), qui préfigure le CMS :
- `schema.ts` : types de champs (`text`, `textarea`, `list`, `image`) avec leurs limites, et le helper `defineFields`.
- `registry.ts` : **le registre des clés éditables**, vide pour l'instant. On y ajoute les clés page par page, en suivant les docs `docs/contenu/`.
- `defaults.ts` : les valeurs par défaut. TypeScript impose une valeur pour chaque clé.
- `get-content.ts` : `getContent(key)` et `getContents([...])`, **seul point d'accès aux contenus** (réservé au serveur). Avec le CMS, seul ce fichier changera.
- `validate.ts` : vérification des longueurs, des listes et des `alt`. Elle est utilisée par `npm run content:check`, qui tourne aussi avant chaque build, et servira à valider les saisies du CMS.

**Couche prestations** (`src/services/`) :
- `getServices()` et `getService(slug)` lisent `local-services.ts`, vide pour l'instant. Plus tard, elles liront l'API SimplyBook.
- L'éditorial des soins passe par les clés `service.<slug>.*`.

**Scripts** :
- `npm run dev`, `build` (avec `content:check` avant), `start` ;
- `lint`, `typecheck` (`next typegen` puis `tsc`) ;
- `format`, `format:check`, `content:check`.

Le dossier **`serelin/`** est le template Framer « Serelin » (medspa et wellness), extrait et décompilé par Maxime, qui s'en est déjà servi sur d'autres projets. C'est la **référence d'inspiration** du design : voir [docs/design/serelin-inspiration.md](docs/design/serelin-inspiration.md). **On n'importe et on ne copie jamais son code**, ses images ni ses textes. ⚠️ Il est actuellement versionné sur le dépôt public : son retrait est recommandé (en attente de la décision de Maxime).

## Ordre de construction (décidé le 23/11/2026)
- On fait d'abord **une première version du site, sans CMS ni Supabase**. Le mini-CMS et Supabase viendront ensuite.
- **Condition pour que ce ne soit pas contre-productif** : dès la v1, **aucun texte ni aucune image éditable n'est écrit en dur dans les composants**.
  - Tout passe par une **couche de contenu typée**, qui préfigure le registre de champs du CMS : clé, type, `maxLength`, ratio d'image.
  - En v1, ses valeurs par défaut sont dans un fichier local.
  - Les composants lisent le contenu par clé, à travers une fonction du type `getContent()`.
  - Le CMS remplacera seulement la source, en lisant Supabase avec repli sur ces valeurs par défaut, sans réécrire les composants.
- Les prestations passent de la même façon par une interface `getServices()` : des données locales en v1, l'API SimplyBook ensuite.

- **Ce qui a une clé éditable** : uniquement le **contenu principal** qu'Élodie doit logiquement maîtriser (titres, accroches, paragraphes, listes, images de contenu).
  - **Pas** les metas, les menus, les liens ni les libellés d'interface. Ces éléments sont fixés dans le code.
  - **Pas** les noms, durées et prix des soins : ils viennent de SimplyBook.
  - Les clés `service.{id}.*` sont partagées entre les pages.
- **Impeccable** sert **uniquement** au polish, à la rédaction de DESIGN.md *a posteriori* et aux fonctions de finition (audit, critique…). **Pas de `shape` ni de new-work** : Maxime les trouve trop approximatifs.
- **Ordre de travail** : on valide d'abord **le contenu** (plan, puis pages en texte), **puis le design**, puis le dev.

## Démarche en étapes (définie par Maxime)

1. **Étape 1 — Contexte** : document de contexte et questions de clarification. ✅ Terminée le 23/11/2026 : questionnaire répondu, il reste quelques points à vérifier avec Élodie.
2. **Étape 2 — `/impeccable init`** : crée `PRODUCT.md`, puis un document de design.
   - ✅ `PRODUCT.md` est écrit (23/11/2026).
   - ⏳ Le **design (DESIGN.md et l'univers visuel) n'est pas commencé**, à la demande de Maxime. Il se fera avec `/impeccable` (new-work / shape), **uniquement quand Maxime le demande**.
   - Impeccable 4.10.0 est installé au niveau du projet (`.claude/skills/impeccable`, agents dans `.claude/agents`, hooks dans `.claude/settings.local.json`).
   - Pas d'outil de génération d'image : le chemin de construction est donc code-first.
3. **Étapes suivantes** : définir le design et le contenu, puis créer le site.

**On n'anticipe pas de livrable avant que Maxime le demande.** La stack est initialisée, mais le contenu et le design ne sont pas codés. Il l'a rappelé pour le RDV du 23/11 : « ne te précipite pas ».

## Règles de travail (toujours valables)

- **Pose des questions** dès qu'un point n'est pas clair, plutôt que de supposer. Un questionnaire interactif (AskUserQuestion) fonctionne bien avec Maxime.
- **Délégation Sonnet** : repère les tâches exécutives sans vraie prise de décision (scraping, téléchargement d'assets, transcription, extraction en masse, édition mécanique). Propose de les confier à un sous-agent **Sonnet** plus économique, et **demande l'accord de Maxime avant**. Garde l'analyse, la synthèse et les décisions.
- **Mets à jour ce CLAUDE.md** après chaque étape ou décision. Reporte aussi les décisions dans `docs/CONTEXTE.md` §13.
- Langue du projet et des contenus : **français**.

## Repères clés (le détail est dans CONTEXTE.md)

### Offre 2026
| Prestation | Durée et tarif | Remarque |
|---|---|---|
| Kobido | 1h 100 € / 1h15 120 € | Prestation prioritaire |
| Calme et harmonie | 1h15 120 € | Dos, visage, crânien + Reiki |
| 5 Continents | 1h15 120 € | Sous licence M5C. Le badge s'affiche en petit dans sa section. |
| Jambes légères | 1h15 120 € | Inclut la **réflexologie plantaire**, à écrire |
| Massage sur mesure | — | Gardé, avec un **nom premium à trouver**, sans être mis en avant |
| Abonnement | 6 séances par an, -10 € par séance | Présenté sans préciser comment on souscrit |

### Pages
| Page | Contenu |
|---|---|
| Accueil | Longue page unique : toutes les prestations, dont la section 5 Continents |
| Kobido | Page dédiée |
| Le salon | Le lieu à Saint-Cyr |
| Carte cadeau | Achat avec Stripe |
| Réserver | Widgets SimplyBook |
| Contact | Formulaire, carte Google Maps, avis Google |
| Mentions légales | — |

Pas de newsletter.

### Concurrent Sensoa (CONTEXTE.md §14)
- **Mêmes tarifs** Kobido et même format d'abonnement : c'est voulu.
- **Ce que Sensoa n'a pas** : le 5 Continents, le Reiki intégré, Jambes légères + réflexo. Ce sont nos différenciants.
- **Ce que Sensoa a aussi** : le Kobido (sa spécialité, avec des formations) et un massage corps sur mesure. Il nous faut un angle et un nom propres.
- ⚠️ **Palette Sensoa** : bordeaux `#5B0829`, framboise `#AE3766`, blush. Elle est très proche du rose d'Élodie : on évite la confusion avec une base ocre/papier, le rose en accent discret, et des typos et photos distinctes.

### Positionnement et DA
- **Direction artistique** :
  - couleur de marque historique : rose framboise `#B84C64` (logo, carte cadeau), utilisée **en accent** sur une base neutre « couleur papier » tirée vers les ocres ;
  - abandonner le teal de l'ancien site ;
  - vraies photos, de l'air, une hiérarchie claire ;
  - harmonie avec Sensoa.
- **Prestations** : chacune a un **nom et un sous-titre** (quoi + bénéfice), puis un descriptif. Pas de noms sur-marketés.
- **Deux audiences** :
  - les chercheurs de « Kobido » : il faut leur dire vite « c'est le bon endroit » ;
  - les chercheurs d'« expérience » : il faut leur montrer les choix, dont le Kobido.
- **Prix** : ne jamais se différencier par le prix, rester aligné sur Sensoa.
- **SEO** : 1 ou 2 expressions-clés par page (« Kobido Saint-Cyr-sur-Loire », « Kobido Tours », « massage Tours », « massage des 5 continents », « réflexologie plantaire Tours »…).
- **Coordonnées** : Élodie Poirier · e.nguyen@horizondessens.fr · 06 76 95 90 03.
- **Retirés** : la citation « Si tu écoutes ton corps… ». La mention du cabinet partagé et des autres praticiennes n'est pas faite pour l'instant (peut-être plus tard, en partenariat).
- **Logo** : vectoriser le PNG en le simplifiant (SVG provisoire). Maxime fournira la version propre pour la version finale.

## État d'avancement

| Date | Étape | Fait |
|---|---|---|
| 2026-11-23 | Étape 1 | Ancien site scrapé (sous-agent Sonnet) → `docs/site-actuel.md`. Audio transcrit en local (mlx-whisper large-v3-turbo) → `docs/transcription-…md`. Synthèse → `docs/CONTEXTE.md`. |
| 2026-11-23 | Étape 1 | Visuels d'Élodie dans `Images Elodie/` analysés (CONTEXTE.md v0.2, §5 et §12bis). |
| 2026-11-23 | Étape 1 | Questionnaire interactif répondu par Maxime → décisions dans CONTEXTE.md v0.3, §13. |
| 2026-11-23 | Étape 1 | Précisions de Maxime : Sensoa est un concurrent, le CMS se fait avec édition en place, SimplyBook sans CSS payant et sans double saisie. → `docs/options-techniques.md`. **Validé par Maxime** : SimplyBook en hybride (API + widget thémé), mini-CMS maison (Supabase), Next.js. Scraping de Sensoa lancé par un sous-agent Sonnet → `references/sensoa/`. |
| 2026-11-23 | Étape 1 | Scraping de Sensoa reçu (`references/sensoa/`). Synthèse concurrentielle → CONTEXTE.md v0.4, §14. |

| 2026-11-23 | Étape 2 | Impeccable installé dans le projet. `/impeccable init` déroulé : courte interview (voix = **vouvoiement**, succès = **équilibre** entre réservations et acquisition, composition de la clientèle à vérifier), puis **PRODUCT.md** écrit. Le design n'est pas commencé. |

| 2026-11-23 | Contenu | Plan du site v1 et accueil v1 rédigés (`docs/contenu/`), **en attente de validation par Maxime**. |

| 2026-11-23 | Design | Serelin analysé comme référence d'inspiration (`docs/design/serelin-inspiration.md`). Mockups temporaires de carte cadeau ajoutés par Maxime. |
| 2026-11-23 | Stack | Next.js 16.4, Tailwind 4, Motion, ESLint et Prettier initialisés. Couches contenu et prestations prêtes (vides). Redirections 301. Typecheck, lint, format et build OK. Aucun contenu ni design codé. |

### Questions encore ouvertes
- `serelin/` sur le dépôt public : faut-il le retirer de Git et le garder seulement en local ? C'est recommandé, car c'est du code et des assets tiers sous licence.
- Faut-il ajouter une FAQ courte sur l'accueil, inspirée de Serelin (bonne pour le SEO et pour lever les freins), ou seulement sur la page Kobido ?
- **Pour l'accueil v1** : le nom du massage sur mesure (proposition : « Rituel Horizon »), l'année de début de pratique (2017, 2018 ou « 8 ans »), une image jambes ou pieds manquante, le mockup carte cadeau à produire, la confirmation des 2 images Sensoa où l'on voit une personne massée, les horaires et l'accès au salon.
- **Pour les CGV et les mentions légales** : le statut juridique, le régime de TVA, le médiateur de la consommation, la politique d'annulation des rendez-vous, la cessibilité de la carte cadeau, le choix de la mesure d'audience.
- La clientèle est-elle réservée aux femmes ou mixte ? À vérifier avec Élodie.
- Élodie est **déjà présentée sur le site de Sensoa** (« Bienvenue à Élodie », « Séance avec Elodie »). Faut-il gérer cette double présence, et comment ?
- ~~Photos du salon et de la Loire issues de Sensoa~~ → ✅ Réutilisables, Maxime en est l'auteur. **Sauf** les images où l'on voit une masseuse ou une personne massée.
- Maxime doit remplir la colonne « Réutilisable ? » dans `references/sensoa/sensoa-site.md`.
- Le SIRET et le statut juridique d'Élodie (mentions légales).
- **À vérifier par Maxime avec Élodie** : le sort des anciennes prestations (Reiki seul, Relaxant, Vitalité, pierres chaudes, réflexo seule, seniors), le Reiki en séance seule, le mode de souscription de l'abonnement.
- Le nom premium du massage sur mesure.
- Le plan SimplyBook d'Élodie et la disponibilité de la custom feature API (à vérifier quand on aura ses accès). Les arbitrages SimplyBook, CMS et stack sont validés.
- Les règles d'usage du badge M5C par la fédération.

### Prochaines actions (sur demande de Maxime uniquement)
- RDV avec Élodie le 23/11 à 16h30 : **Maxime dira quoi préparer.**
- Maxime choisit les images Sensoa réutilisables. Ensuite, les compresser et les copier dans les assets du projet : tâche candidate pour Sonnet.
- Téléchargement des images de l'ancien site dans `assets/legacy/` : candidat Sonnet.
- Vectorisation simplifiée du logo en SVG (provisoire).
- Suite de l'étape 2 : définir le design avec `/impeccable` (shape ou new-work), **sur demande de Maxime uniquement**.
- Fichiers impeccable à committer : `PRODUCT.md`, plus tard `DESIGN.md` et `.impeccable/`. Il faut aussi décider si l'on committe `.claude/` (skill et agents) ; `settings.local.json` est en principe local.

## Outillage local

- Un venv mlx-whisper a été créé dans le scratchpad de la session, qui est temporaire : il faut le recréer si besoin. Commande : `python3.13 -m venv … && pip install mlx-whisper` ; modèle `mlx-community/whisper-large-v3-turbo`, langue `fr`.
