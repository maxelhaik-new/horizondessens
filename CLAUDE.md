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
- **Prise de RDV** : SimplyBook.me (`horizondessens.simplybook.it`) reste l'agenda d'Élodie. **Depuis le 25/11/2026** : **module de réservation intégré** à chaque page de soin, via l'**API REST publique** (prestations « 2026 » dédiées, sans paiement). Voir la section « SimplyBook » plus bas et `docs/simplybook/`. Les noms, durées et prix restent dans `src/services/local-services.ts`. *(Le schéma « hybride getEventList + widget thémé » du 23/11 est abandonné.)*
- **Cartes cadeaux** : paiement **Stripe** sur le site, avec **génération et envoi automatique d'un PDF**.
- **Domaine** : chez OVH. La bascule se fera en changeant les DNS ; l'ancien site n'est pas supprimé.
- **Dépôt Git** : https://github.com/maxelhaik-new/horizondessens. Il est **PUBLIC** et encore vide. `gh` est connecté au compte `maxelhaik-new`. Le dépôt est initialisé en local sur la branche `main`, avec le remote `origin`.
- **Décision de Maxime** (seul gérant du dépôt) : on **commit tout**, sauf l'évident (`node_modules`, `.env*`, builds, etc. : voir `.gitignore`).
- Premier commit le 23/11/2026.
- **Push** : à faire uniquement quand Maxime le demande.
- **Vercel** : projet `horizondessens` (équipe `max-00e6`, https://horizondessens.vercel.app), relié au dépôt. **CLI liée** (`npx vercel@latest`, dossier `.vercel/` ignoré) : je gère les variables avec `vercel env add/ls/pull`. Le doublon `horizondessens-y5z8` a été supprimé.
- **Supabase** : projet `vlpevjffaqzvksjfknhk` (https://supabase.com/dashboard/project/vlpevjffaqzvksjfknhk). Le **serveur MCP Supabase** est déclaré au niveau du projet dans `.mcp.json` (23/11/2026) : transport http, `https://mcp.supabase.com/mcp?project_ref=vlpevjffaqzvksjfknhk&features=docs,account,database,debugging,development,functions,branching,feedback,notebooks`.
- Il ne contient aucun secret. ✅ **Authentifié par OAuth et vérifié** le 23/11/2026 : l'URL de l'API est `https://vlpevjffaqzvksjfknhk.supabase.co` et le schéma `public` est vide pour l'instant.
- **Utilisé par le mini-CMS** depuis le 23/11/2026 (voir « Mini-CMS » plus bas et `docs/cms.md`). Les écritures (DDL, DELETE) via le MCP peuvent être refusées par le mode de permissions : demander à Maxime.
- La Supabase CLI n'est pas installée. Migrations versionnées dans `supabase/migrations/`.
- **OVH (domaine et DNS)** : serveur MCP officiel OVHcloud (bêta) déclaré dans `.mcp.json` le 24/11/2026 (`ovh-domain`, `https://mcp.eu.ovhcloud.com/mcp/v1_domain`, http, OAuth, sans secret). ✅ **Authentifié par Maxime et vérifié en lecture le 24/11/2026** (zone lue, sauvegarde dans `docs/dns/zone-horizondessens-2026-11-24.txt`). ⛔ **Bascule du domaine vers Vercel (A / www) : uniquement sur le go explicite de Maxime.** Outils : `get-domain-zone-details`, `create-domain-zone-record`, `delete-domain-zone-record` ; **toujours recharger la zone** après une modification, sinon elle n'est pas appliquée. ⚠️ **Règle** : le domaine porte la messagerie d'Élodie (MX OVH à la racine) → **montrer chaque modification DNS à Maxime avant de l'appliquer**, ne jamais toucher à la racine (MX, SPF, A) sans son accord explicite. Si l'OAuth échoue (comme Stripe), passer par une clé d'API OVH en portée locale, hors du dépôt. **24/11/2026 : enregistrements Resend ajoutés** (`resend._domainkey`, MX et TXT `send`, CNAME `rsend`, TXT `_dmarc`), zone rechargée, racine inchangée ; vérification Resend lancée (`docs/resend-mise-en-production.md`).
- **Stripe** : serveur MCP officiel `https://mcp.stripe.com`, pour la carte cadeau. L'OAuth échoue (la redirection `claude://` ne revient pas à l'app) : le serveur est donc déclaré **en portée locale** (`~/.claude.json`, projet courant, **hors du dépôt public**) avec l'en-tête `Authorization: Bearer <clé secrète de test>` (24/11/2026). Il n'est **plus** dans `.mcp.json`. Si la clé change, mettre à jour cette entrée locale.
  - **Clés de test** (compte Stripe d'Élodie `acct_1UfFPNIKYew1AWjw`, FR, EUR, mode test) dans `.env.local` (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`), **vérifiées par l'API** le 24/11/2026, et sur Vercel avec le secret du webhook de test (voir « Cartes cadeaux : paiement Stripe »). Compte non activé pour les vrais paiements (`charges_enabled: false`) : Élodie devra l'activer avant la mise en ligne.

## Documents de référence

| Fichier | Contenu | Quand le lire |
|---|---|---|
| [PRODUCT.md](PRODUCT.md) | **La vérité produit durable, au format impeccable** : utilisateurs, objectif, positionnement, contraintes, engagements de marque, preuves disponibles, principes. Il est lu par le skill impeccable. | Avant tout travail de design ou de contenu |
| [docs/contenu/plan-du-site.md](docs/contenu/plan-du-site.md) | Plan complet du site (pages, URL, SEO, navigation), pages légales obligatoires (mentions, CGV, confidentialité, cookies), redirections 301, règle des contenus éditables. **v1 à valider.** | Avant de rédiger ou de coder une page |
| [docs/contenu/accueil-v1.md](docs/contenu/accueil-v1.md) | Contenu de l'accueil en texte : 10 sections, mise en page décrite, images proposées, clés éditables avec leur `maxLength`. **v1 à valider.** | Avant le design et le dev de l'accueil |
| [docs/design/serelin-inspiration.md](docs/design/serelin-inspiration.md) | Analyse du template **Serelin** (Framer, medspa et wellness). C'est la **référence d'inspiration** pour les tokens, les mises en page et les animations, **réécrits proprement**, sans reprise du code décompilé, des images ni des textes. On y trouve la correspondance des sections avec l'accueil v1. | Avant le design et le code des composants |
| [assets/Cartes cadeau temp/](assets/Cartes%20cadeau%20temp/) | 3 mockups temporaires « main qui tient une carte vierge », sur fond terracotta (décor de riad), en 1200×960. Ils seront remplacés plus tard. | Section et page carte cadeau |
| [assets/images/](assets/images/) | Images **validées par Maxime** (Sensoa et Unsplash), en pleine résolution, à compresser avant usage. | Pour toute image du site |
| [docs/questions-elodie-rdv.md](docs/questions-elodie-rdv.md) | Les 10 questions en suspens à poser à Élodie (RDV du 23/11), avec un emplacement pour les réponses. | Après le RDV : reporter les réponses dans CONTEXTE.md §13 |
| [docs/seo/strategie-seo.md](docs/seo/strategie-seo.md) | **Stratégie SEO** : constat (local, Sensoa à la même adresse, Kobido en hausse), expressions-clés par page, priorités (fiche Google, NAP, contenus à venir, mesure), ce qui est en place dans le code, règles pour les nouvelles pages. | Avant de créer une page ou de toucher aux metas |
| [docs/CONTEXTE.md](docs/CONTEXTE.md) | **Synthèse de référence** (§15 = **checklist de mise en production**, à tenir à jour) : acteurs, enjeux, positionnement, offre, DA, SEO, fonctionnalités, technique, planning. **§13 = décisions validées par Maxime, elles priment.** | Toujours, avant tout travail de contenu ou de design |
| [docs/site-actuel.md](docs/site-actuel.md) | Scraping intégral de l'ancien site (23/11/2026) : textes mot pour mot, tarifs, structure, images. | Pour reprendre un contenu existant. **Ne pas re-visiter le site.** |
| [docs/transcription-rdv-cadrage-2026-11-13.md](docs/transcription-rdv-cadrage-2026-11-13.md) | Transcription brute Whisper du RDV de cadrage (13/11/2026). Elle contient des erreurs : « qu'au bidot » = Kobido, « Calmermonie » = Calme et Harmonie, « Tensua / SensoA » = Sensoa. | Pour vérifier une nuance. Sinon, préférer CONTEXTE.md. |
| [docs/options-techniques.md](docs/options-techniques.md) | *(Historique : la réservation a depuis été intégrée par l'API REST publique, voir `docs/simplybook/`.)* Options SimplyBook (widget thémé, hybride API + widget, tunnel sur mesure) et options CMS (mini-CMS maison avec édition en place, Sanity, Storyblok), avec recommandations. | Avant toute décision technique |
| [docs/simplybook/](docs/simplybook/README.md) | **SimplyBook** : doc officielle pour agents, état du projet, spécifications OpenAPI, prestations « 2026 » (`prestations-2026.md`, avec les réglages qui restent à faire dans l'interface). | Avant de toucher à la réservation |
| [docs/bascule-domaine.md](docs/bascule-domaine.md) | **Déroulé de la bascule du domaine vers Vercel** : qui fait quoi (MCP OVH, CLI Vercel, Stripe live hors agent), prérequis, enregistrements à changer et à ne jamais toucher, contrôles, retour arrière, journal. **Checklist à tenir à jour.** | Avant et pendant la bascule, sur le go de Maxime |
| [docs/resend-mise-en-production.md](docs/resend-mise-en-production.md) | **Sortir Resend du mode test** : les 4 enregistrements DNS à poser chez OVH (+ DMARC), vérification, variables du site, SMTP Supabase, contrôles. | Avant la mise en ligne, pour les e-mails |
| [docs/cms.md](docs/cms.md) | **Mini-CMS** : principe (édition en place, brouillons, publication), architecture, tables Supabase, ajout d'un éditeur, guide express pour Élodie, limites. | Avant de toucher au contenu éditable, à `src/cms/` ou à Supabase |
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
- `get-content.ts` : `getContent(key)` et `getContents([...])`, **seul point d'accès aux contenus** (réservé au serveur). `getContents` renvoie aussi `edit(clé, index?, sous-champ?)` pour marquer l'élément éditable (voir « Mini-CMS »).
- `validate.ts` : vérification des longueurs, des listes et des `alt`. Elle est utilisée par `npm run content:check`, qui tourne aussi avant chaque build, et servira à valider les saisies du CMS.

**Couche prestations** (`src/services/`) :
- `getServices()` et `getService(slug)` lisent `local-services.ts`, vide pour l'instant. Plus tard, elles liront l'API SimplyBook.
- L'éditorial des soins passe par les clés `service.<slug>.*`.

**Scripts** :
- `npm run dev`, `build` (avec `content:check` avant), `start` ;
- `lint`, `typecheck` (`next typegen` puis `tsc`) ;
- `test:cms` (test de non-régression du mini-CMS, sur Supabase) ;
- `format`, `format:check`, `content:check`.

Le dossier **`serelin/`** est le template Framer « Serelin » (medspa et wellness), extrait et décompilé par Maxime, qui s'en est déjà servi sur d'autres projets. C'est la **référence d'inspiration** du design : voir [docs/design/serelin-inspiration.md](docs/design/serelin-inspiration.md). **On n'importe et on ne copie jamais son code**, ses images ni ses textes. Il a été **retiré du dépôt** (commit `aaeac3c`) et il est ignoré par Git. Il reste disponible en local. Le dépôt GitHub va passer en privé.

## Accueil v1 développée (23/11/2026)

**Où trouver quoi :**

| Élément | Emplacement |
|---|---|
| Assemblage de la page, metas fixes, JSON-LD `HealthAndBeautyBusiness` | `src/app/page.tsx` |
| Sections (une section = un composant serveur async qui lit `getContents`) | `src/components/home/` : `hero`, `words-band` (marquee), `services` (cartes empilées en sticky sur desktop, en liste simple sur mobile), `kobido-focus`, `five-continents` (section sombre, badge M5C), `salon` (avec les 3 temps), `practitioner` (Élodie), `reviews` (**masquée tant que `getReviews()` est vide**), `offers` (abonnement et carte cadeau), `faq` (`<details name>` natif + JSON-LD FAQPage), `final-cta` |
| Mise en page globale | `src/components/layout/` : `header` (transparent sur le hero puis opaque au scroll, menu plein écran sur mobile, barre « Réserver » fixe sur mobile) et `footer` (année via `"use cache"`, car Cache Components interdit `new Date()` hors cache) |
| UI | `src/components/ui/` : `ButtonLink` (pilule avec pastille flèche : `dark`, `light`, `glass`), `TextLink`, `Eyebrow`, `SectionHeading`, `Marquee` (CSS), icônes SVG |
| Animations | `src/components/motion/` : `SmoothScroll` (Lenis), `Reveal`, `RevealGroup` et `RevealItem` (Motion `whileInView`), `RevealImage` (clip-path, dézoom et parallaxe), `Parallax`. Tout respecte `prefers-reduced-motion`. **Le hero utilise une animation CSS (`animate-rise`)**, qui ne dépend pas du JS, pour le LCP et le SEO. |
| Logo | `src/components/brand/logo.tsx` : symbole en masque CSS sur `public/images/logo/symbole.png`, coloré par `currentColor`, avec le nom en Instrument Serif. **Provisoire.** |
| Tokens | `src/app/globals.css` : `@theme` (palette Serelin `paper`, `paper-soft`, `blush`, `sand`, `night`, `ink*`, `accent-50…950`, rayons, easing, keyframes) et utilitaires typo `text-display`, `text-h2`, `text-h3`, `text-h4`, `text-lead`, `text-body`, `text-eyebrow`, plus `container-site` et `section-y` |
| Polices | `src/app/fonts.ts` : **Instrument Serif** (titres) et **Manrope** (textes), comme Serelin |
| Contenu | **54 clés** dans `src/content/registry.ts` et `defaults.ts`. Un type `items` (éléments structurés) a été ajouté pour les étapes et la FAQ. |
| Soins | `src/services/local-services.ts` (carte 2026). Le prix du Rituel Horizon vaut `null`, car il n'est pas encore connu. Formatage dans `src/services/format.ts`. |
| Navigation et routes | `src/lib/navigation.ts`. `routes.reserver` = `/reserver` (page avec l'agenda intégré) ; l'URL SimplyBook directe reste dans `site.booking.simplybookUrl`. |
| Images web | `public/images/` (compressées par Sonnet, 3,9 Mo) ; inventaire et crédits dans `public/images/README.md` |
| Serveur de dev | `.claude/launch.json` (config `dev`, port 3000) |

Vérifié : typecheck, lint, format, `content:check` et build OK, page statique. Rendu contrôlé en desktop (1440) et en mobile (375), menu mobile compris.

## Accueil v1.1 : refonte au plus près de Serelin (23/11/2026)

**Valeurs relevées sur serelin.framer.website** (1440 px) et dans `serelin components/` (composants décompilés ajoutés par Maxime, gardés en local et ignorés par Git) :
- **Titres** : Instrument Serif **en italique**, avec un interlettrage de -0.02em et un interligne de 1.2. Tailles : H1 80, H2 64, titres de cartes de soin 56, H3 32. Ils sont **révélés mot à mot** (flou de 10px, glissement, fondu).
- **Texte courant** : Manrope 18/1.6, couleur `#525252`.
- **Mise en page** : conteneur de 1200px, sections de 64 à 80px de padding vertical.
- **Header** : une **pilule flottante** de 72px de haut avec un rayon de 40px. Elle est transparente sur le hero, puis blanche translucide et floutée.
- **Bouton « remix »** : une pilule sombre avec une pastille chevron et une ombre en couches. **Au survol, la pastille passe à gauche et le texte glisse à droite**, avec un ressort de 0.6s.
- **Cartes** : rayon de 40px (`rounded-card`), médias à 24-32px. Les cartes de soin font environ 560px de haut, avec un zoom de l'image au survol (courbe `ease-serelin` `[.6,0,.4,1]`).

**Implémentation :**
- `SplitWords` (serveur) et `InView` (client) : mots en `<span class="split-word">`, animés en CSS et déclenchés par `data-inview`. Le texte complet est dans le HTML. Sans JS (`@media (scripting: none)`) ou avec mouvement réduit, le texte s'affiche directement. **Le H1 du hero est animé sans JS.**
- `src/lib/cn.ts` : `tailwind-merge` étendu aux utilitaires typo (`text-h2`, `text-eyebrow`…). Sinon il les confondait avec des couleurs et les supprimait.
- **Nouvel ordre des sections** :
  - Hero (4 faits en italique, valeur et libellé)
  - Bandeau de mots en italique
  - **Philosophie** (déclaration d'Élodie entourée de médaillons photo en parallaxe)
  - Soins (grandes cartes)
  - Kobido
  - **Séance** (3 cartes hautes avec pictogramme dans une pastille sombre)
  - 5 Continents (carte sombre arrondie)
  - **Salon** (titre, CTA, puis galerie horizontale qui défile avec le scroll, swipe natif sur mobile)
  - Élodie
  - Avis (masqués)
  - Abonnement et carte cadeau
  - FAQ (centrée)
  - **Appel final** (carte claire, logo, titre à gauche, texte et CTA à droite)
  - Footer sur fond `mist`
- **Contrastes corrigés (audit impeccable)** :
  - `ink-subtle` passe à `#5f5f5f` ;
  - le petit texte d'accent est en `accent-800` au minimum ;
  - footer en `ink` / `ink-soft` sur `mist`.
  - Après correction, **le détecteur ne relève plus aucun contraste insuffisant**. Ses alertes « kicker », « italic serif », « cream » et « oversized h1 » sont **assumées** : ce sont les choix de Serelin fixés par Maxime.
- **Contenu** : 61 clés. Nouvelles clés : `home.trust.items` (valeur et libellé), `home.philo.*`, `home.steps.*`, `home.salon.gallery`, `home.faq.intro`.
- **Rapport d'audit** : `.impeccable/audit/`.

## Accueil : section « Votre séance » refaite (25/11/2026)
- Elle répétait la composition de la Philosophie juste au-dessus (pastille + grand titre centrés) avec trois cartes hautes et vides. Désormais (`src/components/home/steps.tsx`) : titre court seul, aligné à gauche, posé sur un **fil** où se placent les 3 pictogrammes (horizontal sur desktop, rail vertical sur mobile). Clés `home.steps.title` et `home.steps.intro` **supprimées** ; `home.steps.eyebrow` sert de titre. ⚠️ Valeur publiée dans le CMS : « VOTRE séance » (saisie en majuscules pour l'ancienne pastille) → à corriger en « Votre séance » via `/admin`. Une ligne `home.steps.intro` publiée reste en base, sans effet.

## Adaptation mobile (25/11/2026, `/impeccable adapt`)
- **Mesures en 390 px (écrans de 844 px), avant → après** : accueil 15,8 → 11,9 ; Kobido 11,9 → 7,3 ; 5 Continents 9,8 → 6,7 ; Calme et harmonie 8,2 → 6,0 ; Jambes légères 7,8 → 5,8 ; Rituel Horizon 7,6 → 5,6 ; Le salon 9,0 → 5,9 ; Carte cadeau 6,1 → 4,9 ; pied de page 1 365 → 833 px. Aucun débordement horizontal (320, 390, 768, 1440). Desktop inchangé.
- **`Rail`** (`src/components/ui/rail.tsx`, client) : sous `md` (ou `lg` avec `until="lg"`), une collection empilée devient une rangée horizontale aimantée (scroll-snap natif, cartes à 84 %, amorce de la suivante, jauge « 01 / 04 »). Au-delà, la mise en page passée dans `className` s'applique. Dans une grille, envelopper d'un `<div className="min-w-0">`. Utilisé pour : soins de l'accueil, gestes et ressentis Kobido, chapitres du 5 Continents (`until="lg"`, `tone="dark"`), mosaïque et parcours d'Élodie du salon.
- **Menu mobile** (`mobile-menu.tsx`) : les 6 entrées ont la même taille (`min(60px, 11.2vw)`, « Calme et harmonie » tient sur une ligne dès 320 px) et la même animation. « Soins » est un bouton : le panneau principal glisse à gauche, le panneau des 5 soins arrive de la droite (même taille), avec « ‹ Menu » et « Tous les soins et tarifs ». Focus déplacé, `inert` sur le panneau caché ; à la fermeture tout le contenu part ensemble, puis retour au panneau principal.
- **Pied de page** : Soins et Pages côte à côte sur mobile, adresse puis contact en pastilles (téléphone, Instagram, Facebook), mentions en petit ; texte d'accès masqué sous `md`. « Soins et tarifs » rejoint la colonne Pages ; « Massage des 5 Continents » abrégé en « 5 Continents » (menu et pied de page).
- **Module de réservation** : sur mobile, les champs de coordonnées n'apparaissent qu'une fois un créneau choisi (masqués en CSS, jamais retirés du DOM).
- **Images en 4:5 pleine largeur** passées en 4:3 ou 3:2 sous `md`/`sm` (focus Kobido, 5 Continents, hero et présentation des pages de soin, origine Kobido, « Comment ça marche ») ; portrait d'Élodie carré sur l'accueil, réduit à côté de la citation sur Le salon. Espacements et tailles de texte resserrés sous `md`.
- **Champs de formulaire en 16 px sous `md`** (pas de zoom automatique d'iOS) ; `viewportFit: "cover"` et barre « Réserver » au-dessus de `safe-area-inset-bottom`.
- Vérifié : typecheck, lint, build ; menu (ouverture, sous-menu, retour, fermeture, 320 px), rails, module (champs après choix d'un créneau, **sans envoi**). **Non testé** : vrai iPhone / Safari, vrai toucher sur les rails (Chromium émulé seulement).

## Polish d'ensemble (26/11/2026, `/impeccable polish`)
- **Incohérences corrigées** : carte de choix 1h15 de `/carte-cadeau` sur le fond « roche rouge » de la vraie carte (tokens `--color-gift` / `--color-gift-edge`) ; images de partage des pages légales sur `salon/loire-couchant.jpg` (plus `header1`).
- **Chiffres alignés** (`font-variant-numeric: lining-nums` sur `body`) : les chiffres elzéviriens de Goudy faisaient lire « 1h » comme « Ih ». PDF : chiffres alignés intégrés aux polices `goudy*.woff` (cmap remappée sur `lnum`).
- **Accessibilité** : gestes inactifs du Kobido (seul le titre s'efface à 60 %, le texte reste AA ; avant tout l'élément à 55 %, 2,4:1) ; voile en haut des heros plein cadre renforcé (75 %) pour la navigation sur photo claire ; titres des soins de `/reserver` en `h2` (h1 → h3 sautait un niveau) ; colonne des pages légales limitée à 62ch ; chapeau du parcours (Le salon) à 65ch ; sous-titres en capitales de `/reserver` à interligne 1,35 (accents serrés sur deux lignes).
- Détecteur impeccable sur toutes les pages : plus aucun défaut réel. Restent les choix assumés (surtitres, serif italique, fond papier, grand H1) et l'onglet « Aa » temporaire (contraste faible voulu). Tests mobiles WebKit 32/32 sur le build, aucune erreur console.

## Charte unifiée : polices, logo, carte cadeau, e-mails (26/11/2026)
- **Choix temporaires de Maxime** : titres Sorts Mill Goudy, textes Source Sans 3 (+10 %), **logo en Squatina Regular capitales** (rendu identique à l'option du sélecteur : police à 125 %, interlettrage 0,03 em, `--cap` 0,875). `fontLogo` → `src/app/fonts/squatina/` (+ `LICENSE.md` : **OFL à confirmer**, dépôt public), `--font-squatina`. Bluu Next retirée du site (reste dans les essais). **Sélecteur « Aa » conservé** (variante « actuel » = Squatina).
- **Logo vectoriel complet** généré par `npm run assets:brand` (`scripts/brand-assets.mjs`) : nom converti en tracés avec fontkit, même assemblage que `LogoWordmark` → `public/images/logo/logo-horizon-des-sens.svg`, PNG noir et blanc dans `assets/logo/`. Le script produit aussi : icônes (symbole soleil teinté `#925443` sur papier, **sans reflet sous 64 px**), images de partage (logo complet blanc en bas à gauche), logo des e-mails (`public/images/email/`), logo encre du PDF, masque du visuel de la carte. `public/images/logo/symbole.png` (ancien logo) supprimé.
- **Carte cadeau, un seul recto** : `src/lib/gift-card/card-layout.json` (positions, tailles, couleurs en px d'une carte 1530 × 1000) est lu par `dessin-carte-premium.py` (modes `fond` et `exemple`), le PDF et `GiftCardFace` (`src/components/gift-card/card-face.tsx`, aperçu de `/carte-cadeau/merci` : fond `public/images/carte-cadeau/carte-fond.jpg` + textes SVG aux lignes de base). Accroche selon la durée (`cardTagline`, `src/lib/gift-card/card-face.ts`) : « une heure… » / « une heure et quart rien que pour vous » (**à valider par Élodie**). Nom trop long : réduit jusqu'à 40 px puis tronqué, à l'identique partout.
- **PDF** (`src/lib/gift-card/pdf.ts`) : 2 pages au format de la carte (595 × 389 pt) ; page 1 = fond `assets/carte-fond.jpg` (×2) + textes ; page 2 = détails sur papier (logo encre, prestation, message, panneau numéro/validité/réservation). Polices statiques sous-ensemble latin dans `src/lib/gift-card/assets/` (Goudy romain et italique, Source Sans 3 400 et 600, tirées de `Font import/` et de la variable). Exemples : `scripts/gift-card-artwork.mts` → `assets/carte-cadeau-incrustation/exemple-carte-seance-1h(15).pdf/png`.
- **Mockups** refaits (3 photos) avec `incrustation-carte-sombre.py` → `public/images/carte-cadeau/main-carte-1/2/3.jpg`. Correspondance photos : 1 = `…3b432d55…_0`, 2 = `…60c641e7…_0`, 3 = `…60c641e7…_3` (`assets/Cartes cadeau temp/`). Environnement Python : `pip install numpy pillow opencv-python-headless fonttools brotli`.
- **E-mails** (`src/lib/email-style.ts`) : `emailHead()` (polices du site auto-hébergées dans `public/fonts/email/`, Source Sans +10 %, en-tête CORS dans `next.config.ts`) et `emailLogo()` (image, origine `emailAssetOrigin()` = domaine de production Vercel, sinon `site.url`). Contact, acheteur, Élodie alignés. Modèles Supabase (`supabase/templates/`) refaits à la même charte et **appliqués** le 26/11/2026 (`npm run supabase:templates`, nouveau jeton `SUPABASE_ACCESS_TOKEN` dans `.env.local`, à révoquer après la bascule). Gmail et Outlook ignorent les polices web (repli Georgia / Helvetica).
- **Stripe Checkout** : `font_family: "source_sans_pro"` et `logo` (logo des e-mails) au lieu de l'icône.
- DESIGN.md (typo, sections Logo et Gift card), `.impeccable/design.json` et `config.json`, mentions légales (liste des polices) mis à jour.
- Vérifié : typecheck, lint, format, build ; en-tête 1440 et 320 px (Squatina, sans débordement) ; aperçu de la carte (nom normal et très long) ; PDF d'exemple ; e-mails rendus dans le navigateur. **Non vérifié** : vrai envoi d'e-mail, Apple Mail / Gmail réels, page Stripe Checkout.

## Images Midjourney, troisième lot (26/11/2026)
- 10 images renommées par Maxime (« hero » = paysage) → `public/images/massages/` (détail dans `public/images/README.md`). **Heros** : Kobido `visage-hero`, 5 Continents `dos-hero`, Rituel Horizon `trapeze-hero` (Calme et harmonie garde `visage-7`, Jambes légères garde `pieds`, aucun paysage de jambes). **Reiki** : carte Calme et harmonie `reiki-1`, « Le soin » Calme `reiki-2`, « Le soin énergétique » 5 Continents `reiki-3`. Jambes légères « Le soin » `pieds-6` (réflexologie, remplace `bras`), carte `pieds-5` ; carte 5 Continents `bras-5`. Non utilisées : `trapeze-hero-2`, `kobido/hero-plein`. Sitemap, JSON-LD et images de partage alignés. Vérifié : aucune image deux fois sur une page, build OK.

## Images Midjourney, deuxième lot (26/11/2026)
- 5 nouvelles images de Maxime (`assets/massage midjourney/` : `visage6`, `visage7`, `huile3`, `huile4`, `cou1`) → `public/images/massages/visage-6.jpg`, `visage-7.jpg`, `huile-3.jpg`, `huile-4.jpg`, `cou.jpg` (détail et règle dans `public/images/README.md`).
- **Règles de Maxime** : jamais deux fois la même image sur une page ; un maximum d'images Midjourney pour représenter les massages (Unsplash et salon pour le lieu et l'ambiance) ; le sujet colle au soin (Kobido = visage, 5 Continents = corps et huiles, etc.).
- Remplacements : **accueil** hero `visage-6` (moins sombre que `header1`), médaillons de la philosophie `nuque`, `huile-4`, `cou` (au lieu de photos Unsplash) ; **Kobido** geste « Les percussions » `visage-7`, carte de « Ce que l'on ressent » `visage-6` (au lieu d'épaules) ; **5 Continents** prologue `huile-3`, chapitres « Les huiles » `huile-4` et « Le soin énergétique » `cou` (au lieu d'un plateau de produits et d'une lampe) ; **Calme et harmonie** hero `visage-7`, « Le soin » `nuque` ; **Jambes légères** « Le soin » `bras` (jambe) ; **Rituel Horizon** hero `cou`, « Le soin » `dos`. Sitemap (`seo.ts`) et images de partage (`brand-assets.mjs`, régénérées) alignés.
- Vérifié par page : aucune image affichée deux fois (les seuls doublons du HTML sont les versions desktop/mobile masquées l'une par l'autre).

## Heros des pages de soin : un seul modèle plein cadre (26/11/2026)
- Demande de Maxime : homogénéiser les heros de tous les soins sur le modèle Kobido / 5 Continents (image pleine largeur, `min-h-[100svh]`).
- **Composant unique** `FullHero` (`src/components/service-page/full-hero.tsx`) : image plein cadre + dégradé sombre, H1, accroche, un bouton `light` (`data-hero-cta`), durées et prix à droite, `aside` facultatif (`M5cBadge`). `ServiceHero` (gabarit + 5 Continents, badge selon `servicePages`) et `KobidoHero` ne font que lui passer leurs clés. `FiveContinentsHero` = `ServiceHero slug="5-continents"`. L'ancien hero scindé (texte + image à droite) n'existe plus.
- Cadrage par page : `heroPosition` dans `servicePages` (`src/services/pages.ts`) ; Kobido `object-[50%_40%]`. Ratio de `soin.<slug>.hero.image` passé de 4:5 à 16:9 (aperçu du CMS).
- **Jambes légères** : images échangées (hero = `massages/pieds.jpg`, sombre comme les autres ; « Le soin » = le flacon d'huile). Alt corrigés : le hero de Calme et harmonie et le flacon étaient décrits comme d'autres photos.
- Vérifié en 1440 et 375 px, build OK.

## Heros des pages de soin : H1 courts (26/11/2026, `/impeccable clarify`)
- H1 trop longs visuellement (« Massage Calme et harmonie à Saint-Cyr-sur-Loire, près de Tours ») → **H1 = nom du soin** : « Kobido, le massage facial japonais », « Le Massage des 5 Continents », « Calme et harmonie », « Jambes légères », « Rituel Horizon ». **Localisation dans l'accroche** (« … À Saint-Cyr-sur-Loire, près de Tours. »), qui dit d'abord ce qu'est le soin. `<title>` inchangés (ils gardent « Tours »). 5 Continents : « en deux temps » retiré (la page présente 4 chapitres). Règle reportée dans `docs/seo/strategie-seo.md` §4. Aucune valeur publiée dans le CMS pour ces clés. **À relire par Élodie.**

## Revue d'ensemble avant déploiement (26/11/2026)
- **Carte cadeau généraliste** : `getGiftCards()` (`src/lib/gift-cards.ts`) regroupe les soins par durée → « Séance 1h » (Kobido, 100 €) et « Séance 1h15 » (tous les soins, 120 € = tarif le plus bas). IDs `seance-60` / `seance-75`, `prestation: "Séance"` dans Stripe (libellé « Carte cadeau séance 1h15 »), `soins` affichés sur chaque carte et dans les CGV. Différence réglée au salon pour un soin plus cher (5 Continents) : **à confirmer par Élodie**. Champ `gift` retiré de `servicePages` : `giftLink()` mène toujours à `/carte-cadeau`. Metas et JSON-LD de `/carte-cadeau` généralisés. Le Kobido garde « Offrir un Kobido ».
- **Abonnement = Kobido seulement** : clés `soin.<slug>.reserver.abonnement` supprimées ; le pied de la section Réserver des pages de soin propose la carte cadeau.
- « Réserver un soin » → **« Choisir un soin »** quand le lien mène à `/reserver` (accueil, salon, menu mobile, barre mobile hors page de soin, 404) ; Contact : « Voir les soins et tarifs ». Fil d'Ariane visible retiré (Contact, pages légales). Bouton « Découvrir Élodie » retiré de la Philosophie. « Poser une question » (abonnement) → `/contact#ecrire`.
- CMS : `home.steps.eyebrow` corrigé en « Votre séance » (base Supabase, 26/11). Lignes orphelines sans effet : `home.steps.intro`, `kobido.approche.quote`.
- Non modifié : titres du voyage 5 Continents présents deux fois dans le HTML (version épinglée desktop et version empilée, chacune en `display:none` hors de son écran : invisibles des lecteurs d'écran).

## Boutons : modèle global et passe « quieter » (26/11/2026)
- Demande de Maxime : les pilules noires étaient partout (chaque carte de soin, offres, sections) et alourdissaient l'interface.
- **Modèle global** dans `src/app/globals.css` (`@layer components`) : `.btn` + variantes `btn-soft` (**défaut**), `btn-primary`, `btn-light`, modificateurs `btn-sm`, `btn-plain`, variables `--btn-*` (géométrie et couleurs). Nouveau token `--color-line-strong`. `ButtonLink`, `RemixButton` et `buttonClass()` (`src/components/ui/button-link.tsx`) ne font que choisir les classes. La variante `dark` n'existe plus.
- **Hiérarchie** : `soft` (clair, contour fin, pastille rose poudré) pour les appels répétés ; `primary` (noir) **réservé** à l'appel final de l'accueil, la barre « Réserver » mobile, « Confirmer le rendez-vous », « Envoyer le message », « Offrir cette carte » (carte claire), « Télécharger la carte », bouton admin ; `light` sur photo et fond sombre (inchangé).
- Boutons ad hoc convertis : formulaires (réservation, contact, repli téléphone), bandeau cookies (**Refuser et Accepter désormais à poids égal**, exigence CNIL), carte Google, admin. Pastilles de la FAQ de l'accueil alignées sur celles du Kobido (filet, noir seulement à l'ouverture).
- Geste remix conservé, adouci : 0,5 s en `ease-soft` (plus de rebond), survol seulement sur appareils qui survolent.
- **Règle** : tout nouveau bouton passe par `ButtonLink` / `RemixButton` / `buttonClass()` ; `primary` au plus une fois par page hors actions qui engagent.

## Logo : police du nom (26/11/2026, essai)
- Demande de Maxime : ne plus dessiner le nom du logo en Instrument Serif (utilisée pour tous les titres). **Essai avec LT Superior Serif** (OFL, zip `LTSuperiorSerif-2120.zip` à la racine, non versionné).
- Regular et Medium convertis en woff2, sous-ensemble latin (~22 Ko chacun) : `src/app/fonts/lt-superior-serif/` (+ `OFL.txt`). `fontLogo` (`next/font/local`) dans `src/app/fonts.ts`, variable `--font-lt-superior-serif`, token Tailwind `font-logo`.
- `LogoWordmark` (`src/components/brand/logo.tsx`) : Medium 500, droit, interlettrage -0,015em. Utilisé par `Logo` (en-tête, appel final de l'accueil), les cartes de `/carte-cadeau` et la carte de `/carte-cadeau/merci` (avant : Instrument Serif italique). **Règle** : le nom de la marque à côté du symbole passe toujours par `LogoWordmark`.
- Non changé : e-mails (`email-template.ts`, police système), PDF de la carte cadeau, images de partage (`npm run assets:brand`). À aligner si la police est retenue.
- Graisse retenue par Maxime : **Medium** (option 1).
- **Symbole « soleil sur l'horizon » (26/11/2026, branché sur le site)** : tracé vectoriel **fidèle** à la composition Midjourney de Maxime (rayons « bouteille » conservés à sa demande, bosses, reflet ondulé avec ses ovales), contours lissés, soleil en cercle parfait, horizon droit. `assets/logo/symbole-soleil.svg` (`currentColor`) + PNG 1000 × 1000 ; sources dans `assets/logo/soleil-source/` (le redessin géométrique « lotus » est écarté : `essais-abstraits/`). En dessous de 32 px le reflet se brouille : prévoir une version favicon sans reflet. **Branché** : `LogoSymbol` lit `public/images/logo/symbole-soleil.svg` (masque, `currentColor`, format paysage `aspect-[1874/1548]` : fixer la hauteur). En-tête : `h-7` (< 360 px), `h-8`, `md:h-11` (44 px pour des capitales de 21 px, centré sur la hauteur des capitales). Utilisé aussi par la 404, l'admin, `/reserver` (Rituel Horizon), les cartes de `/carte-cadeau` et `/merci`. ⚠️ Non alignés : favicon et icônes, images de partage (`npm run assets:brand` lit encore `symbole.png`), PDF de la carte cadeau.
- *(Remplacé le soir même par Squatina, voir « Charte unifiée ».)* **Logo définitif (26/11/2026, choix de Maxime)** : nom en **Bluu Next Bold, en capitales** (`src/app/fonts/bluu-next/`, `fontLogo` → `--font-bluu-next`, token `font-logo` ; LT Superior Serif retirée de `src/app/fonts/`, reste dans les essais), interlettrage **-0,02 em** (les lettres se touchent dès -0,05 em ; écart mini restant 0,03 em). **Assemblage** : `LogoWordmark symbol` dessine le soleil dans la même ligne, en `em` à partir de la hauteur des capitales (`--cap` = 0,685 pour Bluu, mesurée pour les polices d'essai) : **haut des rayons = haut des capitales, bas de la ligne d'horizon = ligne de base, reflet en dessous** (vérifié au 1/100 px), espace 0,62 cap. Le symbole suit la réduction `fit` du nom. Repères du SVG dans `logo-symbol.tsx` (`SYMBOL`, cadre 1866 × 1540, horizon à 1044). En-tête : 24 px, `md` 28 px, `xl` 32 px (la navigation tient sur une ligne à 1024 px). Cartes de `/carte-cadeau` et `/merci` sur le même assemblage. Licence Bluu Next : note dans `src/app/fonts/bluu-next/LICENSE.md`, texte d'origine à vérifier (§15).
- **Polices du site (26/11/2026, choix de Maxime)** : titres en **Sorts Mill Goudy** (OFL, romain et italique, `src/app/fonts/sorts-mill-goudy/`, variable `--font-goudy`) ; textes en **Source Sans 3 agrandie de 10 %** (OFL, variable 200–900 + italique, `src/app/fonts/source-sans-3/`, `declarations: size-adjust 110%`, variable `--font-source-sans-3`) pour garder la taille apparente de Manrope : **tailles CSS inchangées**. Remplacent Instrument Serif et Manrope (encore chargeables par le sélecteur d'essais, `preload: false`). Menu mobile : liens ramenés à `min(56px,10.4vw,7svh)` (Goudy est plus large ; « Calme et harmonie » tient à 320 px). Mentions légales mises à jour. ⚠️ Non alignés : e-mails (`src/lib/email-style.ts`), PDF de la carte cadeau (`src/lib/gift-card/pdf.ts`), DESIGN.md (à régénérer).
- ⚠️ **Essais typographiques TEMPORAIRES** (`src/components/trials/trials.tsx`, `TrialsDock` monté dans `layout.tsx`) : petit onglet **« Aa »** au bord droit de l'écran (à mi-hauteur, 35 % d'opacité, point rose si un essai est actif) qui ouvre un panneau à trois listes ; Échap ou clic à l'extérieur pour fermer ; « Revenir aux polices du site ». Masqué en mode édition du CMS (`data-cms-hide`). **Retrait inscrit dans la checklist de mise en production** (CONTEXTE.md §15, « Contenu et pages »).
  - **Logo** : le nom écrit avec chaque police du dossier `Font import/` (non versionné), plus **Young Serif** (Google, `next/font` `preload: false`) et **Gambarino** (Fontshare, licence ITF gratuite, feuille `api.fontshare.com` injectée **seulement quand on la choisit**, à auto-héberger si retenue), une option par graisse et style, en **MAJUSCULES** et en **minuscules**, sur une ligne (29 options, « actuel » = LT Superior Medium).
  - **Logo agrandi (26/11/2026)** : nom à 26 px (mobile) / 30 px (≥ `md`), symbole `size-9` / `size-10` (`Logo`, `src/components/brand/logo.tsx`). `LogoWordmark fit` réduit la taille si le nom ne tient pas à côté du bouton du menu (mesure + `ResizeObserver` + chargement des polices) : de 320 px au desktop, aucune variante ne déborde ; en mobile, les versions en capitales descendent vers 12–17 px à 320 px. Polices condensées (Americaine Condensed, Squatina) agrandies de **25 %** (`scale` dans `faces`, span interne en `em`) : même hauteur que les autres mais deux fois moins larges, elles paraissaient plus petites.
  - **Titres** : remplace `--font-serif` sur `<html>` (Goudy par défaut, Instrument Serif, polices importées). **Textes** : remplace `--font-sans` (Source Sans 3 +10 % par défaut, Manrope, Source Sans 3 taille d'origine, Figtree, Instrument Sans, Hanken Grotesk, Work Sans). Écartées par Maxime : Alegreya Sans (trop complexe), DM Sans (trop pro).
  - Polices importées converties en woff2 latin dans `public/fonts/essais/`, déclarées dans `src/components/trials/font-trials.css` (familles « Essai … »). Téléchargées seulement si choisies.
  - Choix dans `localStorage` (`hds-logo-essai`, `hds-serif-essai`, `hds-sans-essai`), propagés par l'événement `hds-essais`. Le serveur rend toujours les valeurs par défaut.
  - **Licences** : LT Superior, Sorts Mill Goudy, Americaine, Source Sans 3 : OFL ; Bluu Next (Velvetyne, OFL a priori) ; **Thestral Neue et Squatina : licence non trouvée**, à vérifier avant de les garder (dépôt public).
- **Polices du site** : aucune police en dur dans les composants. Tout passe par les tokens `--font-serif`, `--font-sans` et `--font-logo` (`@theme` de `globals.css`, alimentés par `next/font` dans `layout.tsx`). Exceptions hors navigateur : e-mails (`src/lib/email-style.ts`) et PDF de la carte cadeau (`src/lib/gift-card/pdf.ts`), mentions légales (liste des polices).

## Adaptation mobile, deuxième passe (26/11/2026)
- **En-tête masquable** (< `lg`) : s'efface en descendant, revient en remontant, avec hystérésis (12 px vers le bas pour masquer, 48 px vers le haut pour réafficher : les réajustements de la page ne le font pas clignoter). Marge haute sur `safe-area-inset-top`.
- **Module de réservation** : après le choix de l'heure (< `lg`), défilement doux jusqu'à « Vos coordonnées » ; lien « Changer » pour remonter au calendrier. Jours du calendrier : nom complet en `sr-only`, abrégé visible en `aria-hidden` (le libellé contient le texte visible, WCAG 2.5.3).
- **Menu mobile** : taille bornée aussi par la hauteur (`min(60px, 11.2vw, 7.4svh)`) ; en paysage bas (≤ 32rem), menu et coordonnées en deux colonnes ; e-mail et téléphone retirés du menu sous 46rem de haut en portrait (déjà dans le pied de page) ; chaque ouverture repart du panneau principal, même si l'on rouvre pendant la fermeture.
- **Raccourcis** : `section-y` à 3,5rem sous `md` ; abonnement + carte cadeau en rail ; FAQ de l'accueil à 3 questions sur mobile, « Voir d'autres questions » sans JS (case à cocher + `peer-checked`, tout reste dans le HTML et le JSON-LD) ; `/reserver` sans la description courte sous `sm` ; pages légales : sommaire repliable (< `lg`) et rythme resserré ; contact resserré.
- **`SplitWords`** : `aria-label` seulement sur un titre `h1`–`h6` (interdit sur un `<p>`, relevé par Lighthouse).
- **Tests mobiles Playwright** (`npm run test:mobile`, serveur `npm run dev` déjà lancé sur le port 3000, ou `BASE_URL`) : `playwright.config.ts`, `tests/mobile/mobile.spec.ts`, **WebKit** (moteur de Safari) avec profils iPhone 15 et iPhone SE. 32 tests : aucun débordement sur 11 pages, menu (tailles identiques, sous-menu sur une ligne, tient dans l'écran, retour, focus, `inert`, réouverture), rail aimanté et jauge, en-tête masquable, pied de page, module (champs après le créneau, **sans envoi** ; ignoré si l'agenda ne répond pas). Limite : WebKit mobile ne simule ni molette ni glissement, les défilements sont faits en JS.
- **Lighthouse mobile** (build de production) : 100 en performance, accessibilité et bonnes pratiques sur accueil, Kobido, 5 Continents, Calme et harmonie, Le salon, Carte cadeau, Soins et tarifs, CGV ; SEO à 69 = `noindex` voulu hors du vrai domaine. **Piste ouverte** : `/contact` à 81 en performance (LCP 4,7 s simulé alors que l'image démarre aussi tôt qu'ailleurs ; probablement une partie rendue en différé), non traitée.
- **Non fait** : simulateur iOS (Xcode n'est pas installé sur ce Mac, seulement les outils en ligne de commande). Vrai iPhone toujours à tester.

## Images Midjourney intégrées (23/11/2026)
Les 7 images de `assets/massage midjourney/` sont compressées en JPEG dans `public/images/massages/` et branchées dans `src/content/defaults.ts` : hero = `header1` (paysage, fait pour le hero), Kobido (carte) = `kobido-visage-1`, Calme et harmonie = `dos`, 5 Continents (carte) = `bras`, Jambes légères = `pieds`, focus Kobido = `visage-5`, focus 5 Continents = `massages/dos-2` (remplace le flacon d'huile, demandé par Maxime) (jamais deux dos proches). **Kobido = uniquement des visages** (seules 2 images de visage existent). Règle : **jamais deux fois la même image sur une page** (médaillons de la philosophie remplacés par `mains-epaules`, `massage-dos`, `massage-dos-2`).

## Adaptation multi-appareils (23/11/2026)
Accueil et Kobido vérifiées à 320, 390, 768, 844×390 (paysage), 1024 et 1920 px : aucun scroll horizontal. Correctif : en paysage mobile (hauteur ≤ 32rem), le hero de l'accueil passe en `justify-start` avec un titre `text-h3`, pour que le titre soit visible au premier écran. Zones cliquables du header et du logo portées à 44 px. Non testé : appareils réels, vrai toucher, Safari.

## DESIGN.md (23/11/2026)
`DESIGN.md` (racine) et `.impeccable/design.json` sont écrits par `/impeccable document` : tokens, typo, formes, composants et règles tels qu'implémentés. **Statut provisoire** (palette et typos de Serelin, à personnaliser) et **sans « North Star » métaphorique**, voulu par Maxime (risque de perturber les futurs agents). À régénérer quand le design change.

## Page Kobido développée (23/11/2026)

- **Route** : `src/app/kobido/page.tsx`. Metas fixes (« Kobido à Saint-Cyr-sur-Loire, près de Tours »), JSON-LD `Service` (offres tirées des prestations) et `BreadcrumbList`.
- **Sections** (`src/components/kobido/`), avec **des layouts volontairement différents de l'accueil** :
  - `hero` : composition scindée sur fond sombre (texte à gauche, portrait cadré à droite), fil d'Ariane, durées et prix dès le premier écran ;
  - `origin` : éditorial, colonne gauche collante (titre et image), texte long avec chapeau et citation ;
  - `gestures` + `gestures-scroller` (client) : 4 gestes numérotés, **image collante qui change au défilement** (desktop), image par geste sur mobile ;
  - `effects` : grille bento asymétrique (carte sombre, carte avec image) ;
  - `formulas` (`id="formules"`) : comparatif 1h / 1h15 en deux colonnes, durées en très grand, puis la cure (abonnement). Prix depuis `getService("kobido")` ;
  - `session` : frise horizontale sur desktop, rail vertical sur mobile ;
  - `approach` : grande citation d'Élodie centrée avec médaillon portrait ;
  - `faq` : titre collant à gauche, questions en lignes à droite, JSON-LD FAQPage ;
  - `final-cta` : carte sombre pleine image.
- **Contenu** : 30 clés `kobido.*` (91 au total). **Textes à valider par Élodie**, en particulier la citation de l'approche (rédigée, pas dite par elle), le déroulé (nettoyage du visage en début de séance ?), la FAQ « démaquillé » et les contre-indications.
- **Images** : `public/images/kobido/` (hero, geste-lissage, geste-pressions, geste-modelage), tirées de `assets/massage midjourney/` et compressées.

- **Philosophie (accueil)** : la déclaration est désormais la citation « Si tu écoutes ton corps lorsqu'il chuchote, tu n'auras plus à l'entendre crier. », demandée par Maxime (elle figurait dans la liste des éléments retirés ; ce choix prime). Elle est en tutoiement, alors que le site vouvoie : voulu ou à reformuler.
- **Section Origine (Japon traditionnel)** : image `public/images/kobido/origine-the.jpg` (cérémonie du thé, image Midjourney `tea.png` de Maxime, 26/11/2026 ; remplace la photo Unsplash `origine-japon.jpg`, gardée mais inutilisée), choisie par Maxime parmi 10 candidates gardées dans `assets/kobido-japon-candidats/`. Cadre en 4:5 partout (desktop : largeur min(100 %, 52vh × 0,8), pour garder le ratio exact sans dépasser la colonne collante ; avant, le plafond de hauteur l'écrasait en carré).

- **Heros épurés (distill + clarify)** : accueil = titre, accroche, un seul bouton « Réserver un soin ». Kobido = titre, accroche, un bouton, durées et prix, image. Retirés : surtitres, faits clés (2018, M5C, Reiki, Réflexo : déjà dans les sections 5 Continents et Élodie), fil d'Ariane visuel (le JSON-LD reste), liens secondaires, pastille sur l'image. Clés supprimées : `home.hero.eyebrow`, `home.trust.items`, `kobido.hero.eyebrow` (96 clés). Accroches reformulées, avec « Saint-Cyr-sur-Loire, près de Tours » conservé pour le SEO.

## Page Kobido épurée (25/11/2026, `/impeccable distill`)
- **Hero plein écran** (`kobido/hero.tsx`), sur le modèle du 5 Continents : image `public/images/kobido/hero-plein.jpg` (« visage 4 » Midjourney, mains qui encadrent le visage ; ≠ hero de l'accueil `header1`), titre, accroche, un bouton (`#reserver`), durées et prix à droite. Clé `kobido.hero.image` en ratio 16:9.
- **Sections** : hero, origine, gestes, ressentis, **réserver** (`kobido/reserve.tsx` : ce que comprend la séance + module + cure + « Offrir un Kobido »), FAQ. **Supprimées** (doublons) : Formules (durées/prix déjà dans le module et le hero), Déroulé (gestes + FAQ), Mon approche (citation de l'accueil au tutoiement), appel final (réservation juste au-dessus). Clés `kobido.formules.*`, `seance.*`, `approche.*`, `final.*` supprimées ; nouvelles `kobido.reserver.text` / `.cure`. 165 clés.
- Geste « Les lissages » : image `kobido/hero.jpg` (ancien hero), car `geste-lissage.jpg` était la même photo que le nouveau hero. Gestes inactifs à 55 % d'opacité (au lieu de 35 %, contraste). Menu « Soins » non actif sur Kobido / 5 Continents (liens directs).
- ⚠️ Constaté, pas de mon fait : le bouton « Réserver » de l'en-tête desktop a été retiré (`header.tsx`) ; seule la barre mobile reste.

## Menu mobile « voiles courbes » (23/11/2026)

- Source : `components/forceful-branding-164349/` (composant Framer CurveMenuOverlay, GSAP), ajouté par Maxime. **Gardé en local, ignoré par Git**, exclu du lint, de TypeScript et de Prettier (`/components/`, à ne pas confondre avec `src/components/`).
- Réécrit avec **Motion** (sans GSAP) dans `src/components/layout/mobile-menu.tsx`, avec les mêmes tracés SVG, durées et courbes :
  - ouverture : voile `accent-200` puis voile `night` qui montent en se courbant, puis les liens glissent depuis leur masque en cascade, puis contact et « Réserver » ;
  - fermeture : à l'inverse.
- Liens en Instrument Serif italique. ⚠️ Taille et sous-menu **remplacés le 25/11/2026** : voir « Adaptation mobile ».
- Bouton : même emplacement ; deux barres qui pivotent en croix (0.6 s). En-tête transparent pendant que le menu est ouvert ; la barre « Réserver » mobile se masque.
- Desktop (≥ 1024px) : inchangé.

## Pages légales et Contact (23/11/2026)

- **Réponses d'Élodie** reportées dans `docs/questions-elodie-rdv.md` et CONTEXTE.md §13 (« Réponses d'Élodie ») : clientèle mixte non mentionnée, **Rituel Horizon 1h15 120 €** (`local-services.ts`), **abonnement Kobido à 90 €** la séance (textes mis à jour), horaires **lun.–sam. 9h30–11h / 13h30–17h** (`site.hours`), cartes cadeaux 6 mois, SIREN 841 843 337 ; **certificat INSEE reçu le 24/11/2026** : EI, nom Poirier, nom d'usage Nguyen, SIRET 841 843 337 00012 (établissement encore à Saint-Pierre-des-Corps : transfert à déclarer, nouveau SIRET à reporter), APE 9604Z ; ajoutés aux mentions légales et CGV (`site.legal`).
- **Pages légales** `/mentions-legales`, `/cgv`, `/confidentialite` :
  - gabarit commun `src/components/legal/legal-page.tsx` (onglets entre les 3 pages, sommaire collant, sections numérotées) ; styles du texte : `.legal-prose` dans `globals.css` (CSS hors `@layer`, sinon non servi) ;
  - **contenu fixé dans le code** (pas de clés CMS), données dans `site.legal` (`src/lib/site.ts`) ; la liste des prix des CGV vient de `getServices()` ;
  - ⚠️ **rédigées sur hypothèses, sans mention « à compléter »** (choix de Maxime) : l'incomplet (médiateur non nommé, statut/TVA à confirmer, annulation 24 h…) est listé **uniquement** dans CONTEXTE.md §13.
- **Header** : sur les pages légales (fond clair, `lightPages` dérivé de `legalNav`), la pilule est opaque dès le haut.
- **Page Contact** `/contact` (`src/components/contact/`) :
  - `hero` : image du salon côté Loire dans une grande carte arrondie (inset, pas plein cadre), titre en bas à gauche ;
  - `conversation` (`id="ecrire"`) : carte rosée (titre, intro, téléphone, e-mail : adresse et horaires sont **seulement** dans « Venir au salon », sans doublon) + formulaire sur carte claire (style Serelin) ;
  - `contact-form` (client, `useActionState`) → server action `src/app/contact/actions.ts` : validation serveur, pot de miel, envoi via **l'API REST Resend** (sans dépendance). Variables : `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` (`.env.example`). **Sans clé, le formulaire affiche un repli (e-mail et téléphone directs)**. Destinataire : `e.nguyen@horizondessens.fr`. `.env.local` créé (clé vide). Reste : compte Resend, domaine vérifié (DNS OVH), variables sur Vercel. **En local (23/11/2026)** : `.env.local` en mode test, expéditeur `onboarding@resend.dev` vers `maxelhaik@gmail.com` (compte Resend, seul destinataire autorisé sans domaine vérifié) ; envoi via le formulaire **testé et reçu par Resend**. La clé fournie est « sending access » seulement (pas de gestion des domaines). **Serveur MCP Resend** officiel déclaré dans `.mcp.json` (`https://mcp.resend.com/`, OAuth, sans secret), comme Supabase : ✅ authentifié. **Domaine `horizondessens.fr` créé dans Resend (eu-west-1) le 23/11/2026** : DNS à ajouter chez OVH (DKIM `resend._domainkey`, MX + TXT SPF sur `send`, CNAME `rsend`), puis `verify-domain` ;
  - `visit` : adresse + lien Itinéraire, horaires, accès (`home.final.access`) et carte `consent-map` : **Google Maps affiché seulement si les cookies sont acceptés**, sinon une pastille « Accepter et afficher ».
- **Bandeau cookies** (`src/components/layout/cookie-banner.tsx`, monté dans `layout.tsx`) : petite carte claire en bas à gauche (au-dessus de la barre « Réserver » sur mobile), « Refuser » et « Accepter » de même poids. Choix dans `localStorage` (`hds-consent`, 6 mois) via `src/lib/consent.ts` (`useConsent`, `setConsent`). Lien « Gérer les cookies » dans le pied de page. Seul Google Maps en dépend pour l'instant.
  - JSON-LD `ContactPage` (avec `openingHoursSpecification`) et `BreadcrumbList`.
  - 8 clés `contact.*` (99 au total).
  - **E-mail reçu par Élodie** mis en forme (`src/app/contact/email-template.ts`) : HTML en tableaux et styles en ligne aux couleurs du site (pastille sujet, titre serif, message en carte, coordonnées, bouton « Répondre »), version texte de repli, saisies échappées.

## Page Contact simplifiée (26/11/2026, `/impeccable distill` + `clarify`)
- Demande de Maxime : page inutilement complexe (hero photo proche de celui du salon, beaucoup de texte) → **mettre en avant le formulaire**.
- **Nouvelle structure** : un seul bloc en haut de page (`conversation.tsx`, `id="ecrire"`) : H1 « Écrivez-moi » (`contact.form.title`), intro d'une phrase (`contact.form.intro`, réécrite), lien « Choisir un soin » pour réserver, **formulaire visible dès le premier écran** (à droite en desktop, juste après l'intro en mobile), puis coordonnées en liste (téléphone, e-mail, horaires, adresse + itinéraire). Ensuite **la carte seule** (`visit.tsx`, titre `sr-only`). Animations CSS uniquement (pas de dépendance au JS au-dessus de la ligne de flottaison).
- **Supprimés** : hero photo (`hero.tsx`), carte rosée, section « Venir au salon » (texte d'intro et accès : déjà dans le pied de page). Clés retirées : `contact.hero.*` (4) et `contact.visit.*` (2), aucune n'était publiée dans le CMS. **155 clés**.
- En-tête opaque dès le haut sur `/contact` (`lightPages`) ; barre mobile « Choisir un soin » masquée sur `/contact` (le formulaire est l'action principale, le lien est dans l'intro).
- Mobile (390 px) : 2 810 px de haut. Vérifié en 1440 et 390 px, typecheck, lint, `content:check`. Non testé : envoi réel du formulaire après refonte (composant `ContactForm` inchangé).

## Pages Le salon et Carte cadeau (23/11/2026)

- **Le salon** `/le-salon` (`src/components/salon/`) :
  - `hero` : clair et éditorial (titre à gauche, accroche + adresse + bouton à droite), puis grande image panoramique (`salle-loire`) ;
  - `place` : texte « Un lieu pensé pour ralentir », **mosaïque des 6 images du lieu** (`salon.lieu.gallery` : fenêtre sur la Loire, bords de Loire, salle de soin, lampe et galets, Loire au crépuscule, huiles) avec légendes, puis 3 atouts numérotés ;
  - `story` : **parcours d'Élodie en version longue** (portrait et citation collants, 6 chapitres datés sur un fil vertical : soignante, Reiki 2017, le choix fin 2017, Horizon des Sens 2018, Kobido 2025, au bord de la Loire). Récit réécrit d'après l'ancien « Qui suis-je ? » : **à valider par Élodie** (dates de la réflexologie et du M5C non précisées, nom du maître Reiki volontairement omis) ;
  - `visit` : carte sombre avec adresse, itinéraire, horaires et CTA.
  - Nouvelles images `public/images/salon/loire-jardin.jpg` et `loire-couchant.jpg` (photos Sensoa de Maxime, lieu sans personne). Photo Sensoa `salon-06` (salle avec fauteuils) **non utilisée** : lieu non confirmé.
- **Carte cadeau** `/carte-cadeau` (`src/components/gift-card/`), en **vitrine** :
  - `hero` (texte + visuel de la carte légèrement incliné), `cards` (`id="formules"`, cartes dessinées comme de vraies cartes : Kobido 1h 100 € et 1h15 120 €, prix depuis `getGiftCards()` → `src/lib/gift-cards.ts`), `how-it-works` (4 étapes + « Bon à savoir » et lien CGV) ; note 5 Continents « sur demande ».
  - Bouton « Offrir cette carte » = formulaire **POST** vers `/carte-cadeau/commander` (`src/app/carte-cadeau/commander/route.ts`, `routes.carteCadeauCommander`) → **Stripe Checkout** (voir « Cartes cadeaux : paiement Stripe »). Sans clé Stripe : repli vers `/contact#ecrire`.
  - `RemixButton` ajouté dans `button-link.tsx` (bouton remix en `<button>`).
- Header : `/le-salon` et `/carte-cadeau` ajoutées aux `lightPages` (pilule opaque dès le haut).
- **122 clés** (`salon.*`, `cadeau.*`). Build : 9 pages statiques + la route dynamique de commande. Vérifié en 1440 et 375 px.

## SEO technique (23/11/2026)

- **Stratégie** : `docs/seo/strategie-seo.md`. Le levier n°1 est hors du site (fiche Google Business Profile et avis). Prochain contenu recommandé : une page `/massage-5-continents`.
- **`src/lib/seo.ts`** :
  - `pageMetadata({ title, description, path, absoluteTitle?, index? })` pour **toutes les pages** : title, description, canonical, Open Graph et carte X complets ;
  - `isIndexable` : indexable **seulement** en production sur `horizondessens.fr` (`VERCEL_ENV`, `VERCEL_PROJECT_PRODUCTION_URL`, lus au build ; forçable par `SITE_INDEXABLE`). Sinon `noindex` et `robots.txt` fermé. ⚠️ **Redéployer après l'ajout du domaine dans Vercel** ;
  - `indexedPages` (sitemap, avec images) et `contentUpdatedAt` ;
  - `siteGraph` (JSON-LD `WebSite` + `HealthAndBeautyBusiness` + `Person`, rendu dans le layout) et `ids` : les pages y renvoient par `@id` ; `breadcrumbJsonLd()`.
- `src/components/seo/json-ld.tsx` (`<JsonLd data>`), `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`, `not-found.tsx` (404 sombre, noindex).
- **Titles revus** (≤ 60 caractères, « Tours » dans le title, « Saint-Cyr-sur-Loire, près de Tours » dans le texte).
- **Images de partage** : un `opengraph-image.jpg` + `.alt.txt` **dans chaque dossier de page** (obligatoire : l'Open Graph de `pageMetadata` masque celui de la racine). Icônes `favicon.ico`, `icon.png`, `apple-icon.png` (symbole sur fond papier). Tout est généré par `npm run assets:brand` (`scripts/brand-assets.mjs`), à relancer avec le logo définitif.
- **Nouvelle page** : `pageMetadata()`, entrée dans `indexedPages`, `opengraph-image` (ajouter la ligne dans le script), `breadcrumbJsonLd()`.

## Corrections de la critique impeccable (23/11/2026)
Critique d'ensemble : 24/32 (`.impeccable/critique/2026-11-23T21-45-22Z__src-app.md`). Corrigés :
- **Accès au salon** (`home.final.access`) : « informations à venir » remplacé, d'après Sensoa (« à 5 minutes de Tours par tous types de transports », vue sur la Loire), **reformulé**. Aucune info de stationnement : **à compléter avec Élodie**.
- **Barre « Réserver » mobile** : masquée tant que le bouton du hero est à l'écran (`data-hero-cta` sur les heros accueil et Kobido, IntersectionObserver dans `header.tsx`).
- **Révélations au scroll** : saut d'ancre Lenis instantané (`immediate`), marges d'intersection réduites (-4 %), révélations plus courtes (0,6 s ; mots 0,8 s avec délai plafonné).
- **Encore ouverts** (P1/P2) : libellés « Réserver » par soin et page `/reserver`, bouton « Offrir cette carte » (renvoie vers /contact), identité visuelle (rose d'Élodie), bandeau cookies qui recouvre le CTA du hero mobile à la première visite.

## Page Réserver (23/11/2026)

- **Route** `/reserver` (`src/app/reserver/page.tsx`, composants `src/components/booking/`) :
  - `hero` : clair et direct (titre, accroche, 3 étapes en pastilles, téléphone) ;
  - `services-list` (`id="soins"`) : une ligne par soin (vignette, sous-titre, nom, description, « Découvrir ce soin »), puis **une ligne par durée : tarif + bouton « Réserver » vers le module de la page du soin (`#reserver-<min>`)** (25/11). Le Rituel Horizon a une vignette au logo (clé `service.rituel-horizon.short`) ;
  - `infos` : « Bon à savoir » (annulation 24 h, règlement au salon, carte cadeau, jour du soin), liens CGV et contact.
- **Pas d'iframe SimplyBook** (décision de Maxime). ⚠️ **Remplacé le 25/11/2026** : les boutons mènent au module intégré de la page du soin (`bookingAnchor`) ; `bookingHref` et `src/lib/simplybook.ts` sont supprimés (voir « SimplyBook : API REST publique »).
- *(Historique, remplacé le 25/11 :)* **Système de liens** :
  - les IDs SimplyBook sont **sur les variantes** des soins (`simplybook: { service, category }` dans `src/services/local-services.ts`, type dans `types.ts`), plus tard fournis par l'API ;
  - `bookingHref(variant)` (`src/lib/simplybook.ts`) construit `…/v2/#book/category/{c}/service/{s}/count/1/provider/any/` ; sans IDs, la réservation générale `…/v2/`. **La catégorie est nécessaire** : une prestation présente dans plusieurs catégories (ex. 21) fait sinon redemander le choix ;
  - utilisé sur `/reserver` et sur les boutons par durée de la page Kobido (`formulas`). Les boutons généraux « Réserver » mènent à `/reserver`.
- **Correspondances (relevées le 23/11/2026 via l'API publique `/v2/service/` et `/v2/ext/category/`)** : Kobido 1h → service 24 / catégorie 16 (« Kobido Lumière ») ; Calme et harmonie → 15 / 13 ; 5 Continents → 21 / 6. **Sans prestation SimplyBook** (réservation générale) : Kobido 1h15, Jambes légères, Rituel Horizon. ⚠️ Élodie doit **modifier** les prestations existantes (noms, durées, prix 2026) **sans les recréer**, pour garder les IDs, et créer les manquantes ; on renseigne alors leurs IDs.
- Clés `reserver.*` (7) et `service.rituel-horizon.short` : **129 clés**. Barre « Réserver » mobile masquée sur cette page ; en-tête opaque dès le haut.
- SEO : `pageMetadata`, sitemap (0.8), image de partage, fil d'Ariane, `ReserveAction` → `/reserver`.
- Vérifié : liens testés (calendrier ouvert directement pour 24, 15 et 21), rendu 1440 et 375 px.

## Cartes cadeaux : paiement Stripe (24/11/2026)

- **Parcours** : « Offrir cette carte » → `POST /carte-cadeau/commander` → **Stripe Checkout** (hébergé, thémé par `branding_settings` : fond papier, bouton nuit, pilules) → retour sur `/carte-cadeau/merci?session_id=` (noindex, dynamique) → téléchargement `/carte-cadeau/pdf?session_id=`. Le **webhook** `/api/stripe/webhook` (`checkout.session.completed`, `…async_payment_succeeded`) remet la carte même si l'acheteur ferme la page.
- **Code** (`src/lib/gift-card/`) : `stripe.ts` (client, `null` sans clé), `checkout.ts` (session : prix de `getGiftCards()`, 3 champs Stripe « Pour qui ? », « De la part de », « Un petit mot », `allowed_payment_method_types: ["card"]`, numéro tiré ici), `order.ts` (lecture d'une session payée → `GiftCardOrder`, numéro `HDS-XXXX-XXXX` sans caractères ambigus, validité 6 mois), `pdf.ts` (**pdf-lib** + fontkit, A5 paysage à la charte, polices WOFF OFL et symbole teinté dans `assets/`, inclus au déploiement par `outputFileTracingIncludes`), `emails.ts` (acheteur, Élodie), `fulfill.ts` (**idempotent** : métadonnée `carte_envoyee` + clés d'idempotence Resend ; un 409 Resend = déjà envoyé).
- **Registre = Stripe** : métadonnées du paiement (`code`, `prestation`, `beneficiaire`, `de_la_part_de`, `valable_jusqu_au`, `carte_envoyee`), description « Carte cadeau Kobido 1h15 · HDS-… ». Recherche par numéro vérifiée (`payment_intents/search`).
- **E-mails** : `src/lib/resend.ts` (`sendEmail`, pièces jointes, idempotence), partagé avec le formulaire de contact ; charte commune `src/lib/email-style.ts`.
- **Testé en local le 24/11/2026** (mode test, carte 4242) : paiement, page de remerciement, PDF, registre, e-mail à Élodie reçu une seule fois malgré les rechargements, webhook (signature refusée / acceptée). L'e-mail à l'acheteur échoue **tant que le domaine Resend n'est pas vérifié** (normal en mode test) : la page le dit et propose le PDF.
- **Webhook de test** `we_1UfMElIKYew1AWjwNfm76vjE` → `https://horizondessens.vercel.app/api/stripe/webhook` et **variables Stripe de test sur Vercel** (Production et Preview), le 24/11/2026. En local, `STRIPE_WEBHOOK_SECRET` reste vide (Stripe ne peut pas joindre localhost ; la page de remerciement remet la carte).
- **Reste** (CONTEXTE.md §15) : pousser pour activer le webhook de test, activation du compte d'Élodie, domaine Resend vérifié, puis à la bascule webhook live sur `horizondessens.fr` et clés live en Production.
- **Mockup final de la carte** (24/11/2026) : visuel redessiné par Maxime dans Canva (titre, « Pour », nom ; sans bloc sombre), incrusté sur le mockup `assets/Cartes cadeau temp/…_3.png` → `assets/carte-cadeau-incrustation/mockup-carte-kobido-1h15.png` (1200 × 960) ; puis V2 à V5. **V5 retenue** (fond blanc, logo « HORIZON DES SENS » centré, « Séance une heure », « Pour » + nom), incrustée sur les **3 photos** (`mockup-carte-v5.png`, `-photo1`, `-photo2` ; coins par photo affinés par gradient, paramètres `radius` et `thumb_zone` dans le JSON des coins) et **publiée sur le site** à la place des cartes vierges : `public/images/carte-cadeau/main-carte-1/2/3.jpg` (accueil, hero et « Comment ça marche » de la page Carte cadeau, image de partage régénérée). Script `incrustation-mockup.py` (même dossier, Python + OpenCV, environnement à recréer : `pip install numpy pillow opencv-python-headless`) : perspective sur les 4 bords, fusion « produit » (lumière, ombres et grain de la photo conservés), pouce détouré par la saturation, coins d'origine. Le PDF client n'est pas modifié.
- **Carte premium (24/11/2026, retenue et publiée)** : remplace la V5 sur le site. Fond **roche rouge** sombre (`#5C2218` → `#280D09`), dorure sable cuivré (`#F0CDA0` → `#BE7E52`) sur le symbole, « HORIZON DES SENS » et « Carte Cadeau », accroche « une heure rien que pour vous » en rose terre, « Offert à » + nom en crème, numéro en bas à droite ; **pas de filet doré**. Tout est dans `assets/carte-cadeau-incrustation/premium/` : visuel (`carte-premium.png`, dessiné par `dessin-carte-premium.py`, Pillow), incrustation carte sombre `incrustation-carte-sombre.py` (projection à la résolution d'origine sur une image ×4 puis réduction : pas de crénelage ; éclairage lissé de la photo + grain atténué sur la dorure ; masque qui déborde de `grow` px pour couvrir la tranche claire ; pouce détouré par le contour `thumb_poly` relevé à la main), réglages par photo `photoN-coins.json` (coins au sous-pixel, `radius`, `grow`, `thumb_poly`), rendus `mockup-premium-photoN.png` → `public/images/carte-cadeau/main-carte-1/2/3.jpg` (photo 1 = hero et image de partage, 2 = accueil, 3 = « Comment ça marche »). ⚠️ Le **PDF client** garde le modèle clair : à aligner sur cette direction si Maxime le demande. *(Fait le 26/11/2026 : voir « Charte unifiée ».)*
- **Exemples remplis pour les mockups** (`assets/carte-cadeau-incrustation/`, 24/11/2026) : `exemple-carte-kobido-1h15` et `exemple-carte-kobido-1h` (nom, « De la part de », petit mot, numéro, dates fictifs), en PDF et PNG 3 000 px, générés par le **vrai** générateur du PDF client (format A5 paysage). Commande : `npx tsx --conditions=react-server scripts/gift-card-artwork.mts` (à relancer si le PDF ou le logo change). Maxime fait l'incrustation lui-même.
- Le symbole teinté du PDF est régénéré par `npm run assets:brand`. CGV et confidentialité mises à jour (moyens de paiement, petit mot, Resend).

## Pages de soin : gabarit en 5 sections (25/11/2026)

- **Contexte** : Maxime envisage de remplacer SimplyBook (pages de soin, agenda, e-mails). On commence par les **pages de soin**. Rien n'est fait côté agenda.
- **Refonte du gabarit (25/11/2026, demandée par Maxime)** : l'ancien gabarit de 9 sections faisait 10 écrans en desktop et 16 en mobile, avec beaucoup de redondances (« deux temps », Reiki, huiles et séance répétés 5 à 7 fois ; une formule à une seule durée qui répétait le hero et le module ; un déroulé générique placé après la réservation). Il est remplacé par un **gabarit générique en 5 temps** (`src/components/service-page/service-page.tsx`), où **chaque information n'apparaît qu'une fois** :
  1. `hero` (inchangé : titre, accroche, durée et prix, badge M5C, « Réserver ce massage ») ;
  2. `presentation` (« Le soin » : titre et image à gauche ; chapeau et temps du soin numérotés à droite ; **pas de surtitre, pas de galerie collante**) ;
  3. `reserve` (`#reserver` : « Ce que comprend la séance », module intégré via `BookingSection` (props `heading` et `footer`), puis ligne abonnement + « Offrir ») : il remplace les anciennes Formule et Réservation ;
  4. `faq` (inclut « Comment se passe la séance ? », qui remplace le déroulé) ;
  5. pied de page (plus d'appel final).
  Résultat sur Calme et harmonie : **4 340 px en desktop (environ 5 écrans) et 6 970 px en mobile (8,6 écrans)**, module à 2,2 écrans (desktop) et 3,6 écrans (mobile). **13 clés par soin** au lieu de 28 (`soin.<slug>.hero.*`, `soin.*`, `reserver.*`, `faq.*`). **179 clés au total** sur le site.
- **Migration terminée (25/11/2026)** : **Calme et harmonie, Jambes légères et Rituel Horizon** sont sur le gabarit en 5 sections, avec des textes propres à chaque soin (à valider par Élodie). L'ancien gabarit (`legacy/`) et `stepLabel` sont **supprimés**. `TemplateServicePageSlug` (`pages.ts`) = tous les soins sauf le 5 Continents.
- **Page sur mesure du 5 Continents** (25/11/2026, demandée par Maxime, orientée récit et expérience), `src/components/five-continents/` + `src/app/massage-5-continents/page.tsx` :
  1. `hero` : image **plein cadre**, titre en bas à gauche, durée, prix et badge M5C à droite (différent du hero scindé du Kobido) ;
  2. `prologue` : grande phrase, puis le récit (ce que le soin réunit, pourquoi il est rare) face à l'image des huiles ;
  3. `voyage` + `voyage-scroller` (client) : les **chapitres du soin** sur fond sombre. Sur desktop, la section s'**épingle** et les chapitres **défilent horizontalement** avec le scroll, avec une jauge et un compteur « 01 / 04 ». En mobile ou avec mouvement réduit, ils s'empilent (images en 4:3) ;
  4. `ServiceReserve` et 5. `ServiceFaq`, **partagés** avec le gabarit (socle commun).
  Contenu : `fiveContinentsFields()` = socle commun (`servicePageCommon` : hero, `reserver.*`, FAQ) + `prologue.*` + `voyage.*`, toujours sous `soin.5-continents.*`. Environ 7 600 px en desktop et 8 400 px en mobile.
- **Menu** : Kobido et 5 Continents ont **leur propre lien** dans le menu principal (`mainNav`, `featuredSoins`, `routes.cinqContinents` dans `src/lib/navigation.ts`), **en plus** du sous-menu « Soins ». Dans le pied de page, ils restent dans la colonne « Soins » (retirés de « Pages »). Le menu tient sur une ligne à 1024 px. Menu mobile : ils sont retirés de la sous-liste « Soins » (`otherSoins` dans `mobile-menu.tsx`), puisqu'ils ont leur grand lien ; le menu tient tout juste en 375 × 812 (peut déborder sur les écrans plus petits, à surveiller).
- **Liens vérifiés le 25/11/2026** (69 liens et ancres internes, sur toutes les pages) : corrigés « Réserver un Kobido » de l'accueil (→ `/kobido#reserver` au lieu de `/reserver`), ajout de « Réserver ce massage » dans la section 5 Continents de l'accueil, ancre `#elodie` manquante sur `/le-salon` (liens « Mon parcours » de l'accueil), lien 5 Continents sur la page 404.
- **Config** `src/services/pages.ts` (`servicePages`) : URL, libellé, libellé des étapes, badge, carte cadeau `online` ou `on-request` (→ `/contact#ecrire`). Une seule durée : « Réserver ce massage » ouvre directement le calendrier ; plusieurs : ancre `#formules`.
- **Contenu** : `servicePageFields(slug)` (gabarit en 5 sections) et `fiveContinentsFields()` dans `registry.ts`, sur un socle commun hero + réserver + FAQ (`servicePageCommon`) ; `getServicePageContents(slug, [...])` (`service-page/content.ts`) les lit sans répéter le préfixe. **179 clés au total** (25/11/2026).
- **Pages** : `/massage-5-continents`, `/massage-calme-et-harmonie`, `/jambes-legeres-reflexologie-plantaire`, `/rituel-horizon` (+ `/kobido`, sur mesure), toutes avec le **module de réservation** (`#reserver`). Sitemap, images de partage, metas. Liens : cartes de l'accueil (« Réserver » → `page#reserver`, « Découvrir ce soin »), section 5 Continents de l'accueil, `/reserver` (une ligne par durée → `page#reserver-<min>`), barre mobile et bouton du header (→ `#reserver` sur une page de soin ; barre masquée quand le module est à l'écran). Helpers `servicePath(slug)` et `bookingAnchor(slug, min)` dans `src/services/pages.ts`. **Navigation harmonisée (25/11/2026)** : « Soins » de l'en-tête = sous-menu desktop (`src/components/layout/soins-menu.tsx`, liste `soinsNav` + « Tous les soins et tarifs » → `/reserver`), lien vers `/reserver` dans le menu mobile ; bouton « Réserver » de l'en-tête **retiré** (25/11/2026, jugé trop présent) ; barre mobile « Réserver ce soin » → `#reserver` sur une page de soin, sinon `/reserver` ; pied de page : colonne Soins = vraies pages. `routes.soins` (ancre de l'accueil) supprimé. Règle écrite en tête de `src/lib/navigation.ts`. **Critique impeccable du 25/11** (28/40, `.impeccable/critique/2026-11-25T13-57-54Z__src-app.md`) — corrigé : boutons par durée `#reserver-<min>` → cibles invisibles dans `BookingSection` + présélection au clic (Next change l'URL sans `hashchange`) : le clic défile jusqu'au calendrier, aussi depuis `/reserver` ; **bandeau cookies masqué sur mobile** (< `sm`, décision de Maxime ; consentement au clic sur la carte de /contact) ; **menu mobile** : conteneur `justify-center-safe` + défilement (sous-liste des soins remplacée par un panneau glissant, voir « Adaptation mobile ») ; `/reserver` renommée **« Soins et tarifs »** (H1, title, fil d'Ariane). Reste (P2) : champ carte cadeau dans le formulaire, adresse + .ics dans la confirmation ; mineurs : mois à 10,4 px du calendrier, gestes Kobido inactifs à 35 % d'opacité. ⚠️ Une autre session (« Service page model review ») a refondu le gabarit des pages de soin (4 sections : hero, présentation, `reserve.tsx`, FAQ) et créé une page sur mesure pour le 5 Continents (`src/components/five-continents/`, `routes.cinqContinents`, entrée de menu) : la description du gabarit ci-dessus est à mettre à jour par cette session. **Textes à valider par Élodie** (CONTEXTE.md §13).
- **Ajouter un soin** : une entrée dans `servicePages`, `...servicePageFields("<slug>")` dans le registre, les valeurs dans `defaults.ts`, un dossier `src/app/<url>/page.tsx` (metas + `<ServicePage slug>`), une ligne dans `indexedPages` et une dans `scripts/brand-assets.mjs`.

<!-- BEGIN simplybook-api-rules -->
## SimplyBook : API REST publique et module de réservation intégré (25/11/2026)

- **Doc à suivre** : [docs/simplybook/README.md](docs/simplybook/README.md) (doc officielle pour agents + état du projet) et les spécifications `docs/simplybook/openapi-public.json` / `openapi-admin.json`. **Ne jamais inventer un endpoint.**
- **API REST publique** uniquement (pas d'API admin, pas de MCP : décidé avec Maxime). Variables dans `.env.local` : `SIMPLYBOOK_API_HOST=https://user-api-v2.simplybook.it`, `SIMPLYBOOK_COMPANY=horizondessens`, `SIMPLYBOOK_API_KEY` (clé « API REST publique »). Jeton `POST /public/auth/token` `{company, key}` (1 h), puis `X-Company-Login` + `X-Token`. L'ancienne API JSON-RPC refuse cette clé : ne pas mélanger. Modules SimplyBook : API activé, **Catégories du service conservé**, pas de captcha.
- **Prestations « 2026 »** (décision de Maxime) : créer de **nouvelles** prestations marquées 2026, **ne jamais modifier les legacy**, et **plus aucun lien vers une prestation legacy** sur le site. Liste et réglages : [docs/simplybook/prestations-2026.md](docs/simplybook/prestations-2026.md). Elles se créent dans l'interface (ou via l'API admin, non configurée). ✅ **Créées le 25/11/2026 via l'API admin** (IDs 25 à 30) et branchées : le module est actif sur les 5 pages. Restent dans l'interface : temps de pause (0 min à la création), catégorie, masquer les legacy. **API admin** : `SIMPLYBOOK_ADMIN_LOGIN` + `SIMPLYBOOK_ADMIN_API_KEY` (utilisateur `admin`, tous droits) dans `.env.local` **uniquement** (pas sur Vercel), pour les scripts de gestion ; `POST /admin/services` n'accepte que nom, description, durée, visibilité, praticiennes (le prix exige le module paiement). Variables publiques `SIMPLYBOOK_API_HOST/COMPANY/API_KEY` sur **Vercel** (Production, Preview et Development, 25/11 ; valeurs « sensibles », relues comme `[SENSITIVE]`, c'est normal), actives au prochain déploiement.
- ✅ **L'app n'utilise que l'API publique** (vérifié le 25/11 : aucune occurrence de `/admin/` ni de `SIMPLYBOOK_ADMIN_*` dans `src/`). L'API admin sert seulement aux opérations ponctuelles menées par l'agent (création des prestations, annulation d'un RDV de test), avec l'accord de Maxime ; ne jamais l'ajouter à l'app ni à Vercel.
- **Pas de paiement à la réservation** (décision de Maxime, 25/11) : règlement sur place. Piste si les absences deviennent un problème : rappel SMS, puis empreinte bancaire Stripe pour les nouveaux clients (à inscrire dans les CGV) ; éviter le paiement complet obligatoire.
- **Code** : `src/lib/simplybook/api.ts` (client serveur, jeton en mémoire, retry sur 401) ; `src/lib/booking/` (`actions.ts` : Server Actions `getAvailability` (14 jours, horizon 120 j) et `bookAppointment` (pot de miel, validation, relecture des créneaux du jour puis `POST /public/booking/item`, conditions acceptées ; ⚠️ **ne pas utiliser `/public/booking/validate-time`** : il renvoie « libre » sans champ `available`, pour n'importe quelle heure, même passée — bug du 1er test de Maxime, 25/11) ; `options.ts` : liste blanche `<slug>-<minutes>` → `simplybookId` ; le navigateur n'envoie jamais d'ID SimplyBook) ; `src/components/booking-module/` (`BookingModule` client : durée → jour → heure → coordonnées → confirmation, ancre `#reserver-<minutes>` ; `BookingSection` serveur, `id="reserver"` ; `BookingFallback`).
- **Brancher une prestation** : `npm run simplybook:services` (liste lecture seule, colonne « 2026 ») → `simplybookId` dans `src/services/local-services.ts`. Noms, durées et **prix restent locaux** (SimplyBook n'a pas de prix).
- **Testé** (25/11) : créneaux réels chargés sur Kobido avec des IDs legacy **temporaires**, changement de durée, choix d'heure, rendu 1440 / 375. **Aucune réservation envoyée** : le premier vrai test de `bookAppointment` se fait sur une prestation 2026, avec l'accord de Maxime, puis annulation.
- **Aucune réservation, client ou réglage créé, modifié ou annulé sans l'accord explicite de Maxime** (vrai agenda, vraies notifications).
<!-- END simplybook-api-rules -->

## Mini-CMS (23-24/11/2026) — détails dans `docs/cms.md`

- **Principe** : connexion sur `/admin` (Supabase Auth, compte présent dans `cms_editors`) → **Draft Mode** activé → on navigue sur les **vraies pages**. Clic sur un texte = édition **dans l'élément lui-même** (span `contenteditable` ajouté, nœuds React masqués mais jamais retirés : sûr pour React), compteur et **limite stricte** (frappe, collage, dictée tronqués). Photos : bouton « Remplacer » au survol, fenêtre avec aperçu au ratio, alt, légende, ajout et retrait en galerie ; redimensionnement 2400 px + WebP **dans le navigateur**, envoi direct au bucket `cms-media`. Brouillons → barre basse (liste, Aperçu, **Publier**, Annuler tout) ; « Rétablir l'original » par champ.
- **Code** : `src/content/store.ts` (publié en `"use cache"` + `cacheTag("cms-content")`, invalidé par `updateTag` à la publication ; en mode édition : lecture directe + brouillons avec la session, **jamais de fonction `"use cache"` dans ce chemin**, sinon erreur « cache miss after cache warming ») ; `src/content/edit.ts` (marqueurs `data-cms*`, vides pour les visiteurs) ; `src/cms/` (éditeur client, session texte, panneau photo, Server Actions validées par `validateField` + `is_cms_editor()`) ; `src/app/admin/` (connexion, plein écran) ; `src/proxy.ts` (rafraîchit la session **seulement** sur `/admin` et avec le cookie Draft Mode) ; `src/lib/supabase/`.
- **Supabase** : `cms_content` (publié, lisible par tous), `cms_drafts` (RLS éditeurs ; `value` NULL = rétablir l'original), `cms_revisions`, `cms_editors`, `cms_publish()`, bucket public `cms-media`. Migration : `supabase/migrations/20261123180000_cms.sql`. **Aucune clé secrète** : clé publishable + RLS.
- **Nouveaux types de champ** : `gallery` (images + légende ; `home.salon.gallery` et `salon.lieu.gallery` convertis) ; sous-champ d'`items` avec `image: { ratio }` (chemin d'image décorative, ex. gestes Kobido).
- **Règle pour toute nouvelle clé** : registre + `defaults.ts` + `{...c.edit("clé")}` sur l'élément qui ne contient **que** la valeur (sinon l'envelopper dans un `<span>`). Composants partagés : `SplitWords`/`Eyebrow`/`RevealImage` (`edit=`), `SectionHeading` (`edit={{ eyebrow, title, intro }}`), `Marquee` (`edit={(i) => …}`). Texte long en plusieurs `<p>` : `c.edit(clé, i, "para")`.
- **Vérifié** : HTML public sans aucun `data-cms` (seul `data-cms-hide` statique sur la barre « Réserver » mobile), pages toujours statiques, RLS testé (lecture publique OK, brouillons invisibles, écriture et publication anonymes refusées), édition en place, limite, Cmd+A, Échap, échec propre sans session, panneau photo. **Testé de bout en bout par Maxime en local le 24/11/2026** (connexion, édition sur plusieurs pages, publication). **Test de non-régression** `npm run test:cms` (`tests/cms.integration.test.ts`) : RLS, brouillon, publication, retour à l'original, sur la clé `test.cms.regression`, nettoyée à la fin ; clé secrète Supabase dans `.env.local` **pour ce test seulement**. Ligne « TEST CMS » retirée de `cms_content`. ⚠️ Base commune au local et à la production : publier en local publie pour de vrai (visible en ligne au prochain déploiement) ; en ligne, la publication est immédiate, sans déploiement.
- **Serveur local** : `.claude/launch.json` → `start-cms` (`next start`, port 3005), car un autre `next dev` tourne déjà dans ce dossier.
- **Comptes** : invitation → `/admin/bienvenue` (lit la session du lien, client) → `/admin/mot-de-passe` → mode édition ; « Mot de passe oublié ? » sur `/admin`. Compte de Maxime `maxelhaik@gmail.com` invité et éditeur (24/11/2026). ✅ **SMTP Resend** configuré le 24/11/2026 (clé dédiée, expéditeur `contact@horizondessens.fr`) et modèles d'invitation et de mot de passe en **français** (`supabase/templates/`) : Élodie peut être invitée. Site URL Supabase = `http://localhost:3005` jusqu'à la mise en ligne.

## Décisions pour le dev de l'accueil (23/11/2026)
- **Contenu** : on développe sur la base de `docs/contenu/accueil-v1.md` **tel quel**. Maxime itérera sur le site développé.
- **Palette et typos** : **exactement celles de Serelin pour commencer**, traduites en tokens sémantiques propres. On ajustera ensuite.
- **Animations** : niveau Serelin. Lenis smooth scroll, images révélées au scroll, textes en fondu décalé, parallaxe légère, marquee. Tout se désactive avec `prefers-reduced-motion`.
- **Massage sur mesure** : il s'appelle **« Rituel Horizon »**, avec le sous-titre « Sur mesure · Selon vos zones de tension ».
- **Début de pratique** : **2018**.
- **FAQ** : une FAQ courte (4 ou 5 questions) **sur l'accueil**, avant l'appel final, avec des clés éditables.
- **Compression des images** vers `public/images/` : déléguée à un sous-agent Sonnet.
- **Formulations** : neutres en genre, tant que la composition de la clientèle n'est pas confirmée.

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

## Bascule du domaine (décidé le 24/11/2026)
- **Claude est responsable de la bascule** de `horizondessens.fr` vers Vercel, **uniquement quand Maxime le demande** explicitement. Déroulé complet et checklist : [docs/bascule-domaine.md](docs/bascule-domaine.md), résumé dans CONTEXTE.md §15 « Bascule ».
- Outils : MCP `ovh-domain` (zone DNS), CLI Vercel (domaines, variables, redéploiement). **Stripe live hors agent** (clés live jamais dans une conversation). Supabase Site URL : via le jeton `sbp_…` **avant** sa révocation, sinon par Maxime dans le dashboard.
- **La veille** : TTL des enregistrements du site à 300 s (retour arrière rapide).
- **Ne jamais toucher** à la messagerie d'Élodie (MX, SPF, DKIM OVH, `mail`/`imap`/`smtp`…), aux enregistrements Resend ni à la vérification Google.
- Maxime **attend l'activation du compte Stripe d'Élodie** avant de lancer la bascule.
- ✅ **Règle** : toute checklist (CONTEXTE.md §15, `docs/bascule-domaine.md`) est **mise à jour à chaque étape** (case cochée, date, écart), pour qu'un autre agent puisse reprendre.

## Règles de travail (toujours valables)

- **Pose des questions** dès qu'un point n'est pas clair, plutôt que de supposer. Un questionnaire interactif (AskUserQuestion) fonctionne bien avec Maxime.
- **Délégation Sonnet** : repère les tâches exécutives sans vraie prise de décision (scraping, téléchargement d'assets, transcription, extraction en masse, édition mécanique). Propose de les confier à un sous-agent **Sonnet** plus économique, et **demande l'accord de Maxime avant**. Garde l'analyse, la synthèse et les décisions.
- **Mets à jour ce CLAUDE.md** après chaque étape ou décision. Reporte aussi les décisions dans `docs/CONTEXTE.md` §13.
- Langue du projet et des contenus : **français**.

## Repères clés (le détail est dans CONTEXTE.md)

### Offre 2026
| Prestation | Durée et tarif | Remarque |
|---|---|---|
| Kobido | 1h 100 € / 1h15 120 € | Prestation prioritaire · SimplyBook 25 / 26 |
| Calme et harmonie | 1h15 120 € | Dos, visage, crânien + Reiki · SimplyBook 27 |
| 5 Continents | 1h15 **135 €** (décidé le 25/11/2026) | Sous licence M5C, badge dans le hero de sa page · SimplyBook 28 |
| Jambes légères | 1h15 120 € | Inclut la **réflexologie plantaire** (à confirmer par Élodie) · SimplyBook 29 |
| Rituel Horizon (sur mesure) | 1h15 120 € | Discret, sans être mis en avant · SimplyBook 30 |
| Abonnement | 6 séances par an, -10 € par séance | Présenté sans préciser comment on souscrit (abonnement Kobido : 90 €) |

### Pages
| Page | Contenu |
|---|---|
| Accueil | Longue page unique : toutes les prestations, dont la section 5 Continents |
| Kobido | Page dédiée, avec module de réservation |
| Pages de soin | Calme et harmonie, 5 Continents, Jambes légères, Rituel Horizon (gabarit commun, module de réservation) |
| Le salon | Le lieu à Saint-Cyr |
| Carte cadeau | Achat avec Stripe |
| Réserver (`/reserver`) | Tous les soins et tarifs, chaque durée → module de la page du soin |
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
- **Citation « Si tu écoutes ton corps… »** : conservée **uniquement** comme philosophie d'Élodie (section Philosophie de l'accueil ; éventuellement page Le salon ou page de soin si un emplacement existe), décision du 26/11/2026. La mention du cabinet partagé et des autres praticiennes n'est pas faite pour l'instant (peut-être plus tard, en partenariat).
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
| 2026-11-23 | Dev | **Accueil v1 développée** : 11 sections, header et footer, animations Serelin, 54 clés de contenu, soins locaux. Images compressées par Sonnet. Vérifié en desktop et en mobile. |
| 2026-11-23 | Dev | **Accueil v1.1** : audit impeccable (contrastes corrigés) et refonte au plus près de Serelin (titres italiques mot à mot, header en pilule, bouton remix, grandes cartes, philosophie, galerie salon, appel final avec footer). |
| 2026-11-23 | Dev | Bouton remix inversé : pastille à gauche au repos, elle glisse à droite au survol (sens de la flèche). Questions pour Élodie préparées (`docs/questions-elodie-rdv.md`). |
| 2026-11-23 | Dev | **Page Kobido** : 9 sections aux layouts distincts de l'accueil, 30 clés de contenu, JSON-LD Service, FAQ et fil d'Ariane. Build statique, vérifiée en desktop et en mobile. |
| 2026-11-23 | Dev | **Menu mobile à voiles courbes** (inspiré de CurveMenuOverlay, réécrit avec Motion). Desktop inchangé. |
| 2026-11-23 | Dev | **Pages Le salon** (lieu, mosaïque, parcours d'Élodie) **et Carte cadeau** (vitrine, bouton prêt pour Stripe). |
| 2026-11-23 | Dev | Réponses d'Élodie reportées. **Pages légales** (mentions, CGV, confidentialité) et **page Contact** (formulaire Resend, carte au clic). Build statique, vérifié en desktop et en mobile. |
| 2026-11-23 | Dev | **Page Réserver** : liste des soins, chaque durée ouvre directement son calendrier SimplyBook (pas d'iframe). Les boutons « Réserver » généraux y mènent. |
| 2026-11-23 | SEO | **Stratégie SEO** (`docs/seo/`) et SEO technique : metas par page, sitemap, robots, manifeste, icônes, images de partage, 404, JSON-LD commun. Indexation limitée au vrai domaine. |
| 2026-11-24 | Dev | **Cartes cadeaux payantes** : Stripe Checkout, PDF à la charte, e-mails (acheteur, Élodie), registre dans Stripe, page de remerciement, webhook. Testé en local en mode test. |
| 2026-11-24 | E-mails | **Resend sorti du mode test** : enregistrements DNS posés via le MCP OVH (racine intacte), domaine vérifié, expéditeur `contact@horizondessens.fr` sur Vercel (production redéployée), SMTP Supabase par Resend avec modèles en français. Envois testés. Le site n'est **pas** branché sur le domaine (attend le go de Maxime). |
| 2026-11-25 | Dev | **Module de réservation intégré** (API REST publique SimplyBook) sur toutes les pages de soin, pages Calme et harmonie, Jambes légères, Rituel Horizon. Plus aucun lien vers SimplyBook legacy. En attente des prestations « 2026 ». |
| 2026-11-25 | Dev | **Gabarit des pages de soin** et première page `/massage-5-continents`, à valider. Étude « remplacer SimplyBook » : on fait les pages de soin d'abord. |
| 2026-11-25 | Dev | **Gabarit des pages de soin refait en 5 sections** (évaluation distill + clarify : redondances retirées, page deux fois plus courte), appliqué à Calme et harmonie, Jambes légères et Rituel Horizon. **Page sur mesure du 5 Continents** (récit, voyage en chapitres à défilement horizontal). Kobido et 5 Continents dans le menu. Liens internes vérifiés et corrigés. |
| 2026-11-25 | Mobile | **Adaptation mobile** (`/impeccable adapt`) : rails horizontaux, menu à sous-panneau « Soins », pied de page compact, module replié, pages 25 à 40 % plus courtes. |
| 2026-11-26 | Mobile | **Deuxième passe mobile** : en-tête masquable, module guidé, menu paysage et écrans bas, raccourcis (FAQ, offres, légal, tarifs), tests Playwright WebKit (32/32), Lighthouse à 100. |
| 2026-11-24 | CMS | **Mini-CMS** : schéma Supabase (RLS, bucket), édition en place sur les vraies pages (Draft Mode), photos, brouillons et publication, `/admin`. 131 clés marquées sur toutes les pages. Variables sur Vercel. Reste : compte éditeur et test de bout en bout. |

### Questions encore ouvertes
- Accueil v1 : en attente des retours de Maxime sur le site développé.
- **Pour l'accueil v1** : le nom du massage sur mesure (proposition : « Rituel Horizon »), l'année de début de pratique (2017, 2018 ou « 8 ans »), une image jambes ou pieds manquante, le mockup carte cadeau à produire, la confirmation des 2 images Sensoa où l'on voit une personne massée, les horaires et l'accès au salon.
- **Pour les CGV et les mentions légales** : le statut juridique, le régime de TVA, le médiateur de la consommation, la politique d'annulation des rendez-vous, la cessibilité de la carte cadeau, le choix de la mesure d'audience.
- La clientèle est-elle réservée aux femmes ou mixte ? À vérifier avec Élodie.
- Élodie est **déjà présentée sur le site de Sensoa** (« Bienvenue à Élodie », « Séance avec Elodie »). Faut-il gérer cette double présence, et comment ?
- ~~Photos du salon et de la Loire issues de Sensoa~~ → ✅ Réutilisables, Maxime en est l'auteur. **Sauf** les images où l'on voit une masseuse ou une personne massée.
- Maxime doit remplir la colonne « Réutilisable ? » dans `references/sensoa/sensoa-site.md`.
- Infos légales envoyées par Élodie (statut, TVA, **médiateur**, annulation) : voir CONTEXTE.md §13. ~~Clé Resend~~ → domaine vérifié le 24/11.
- **À vérifier par Maxime avec Élodie** : le sort des anciennes prestations (Reiki seul, Relaxant, Vitalité, pierres chaudes, réflexo seule, seniors), le Reiki en séance seule, le mode de souscription de l'abonnement.
- ~~Le nom premium du massage sur mesure~~ → « Rituel Horizon ».
- ~~Plan SimplyBook et custom feature API~~ → API activée le 25/11. **Reste dans SimplyBook** : temps de pause des prestations 2026, agenda (aucun créneau après le 27/11, heures à aligner), adresse, masquer les legacy (`docs/simplybook/prestations-2026.md`).
- **Textes des pages de soin à valider par Élodie** (CONTEXTE.md §13).
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
