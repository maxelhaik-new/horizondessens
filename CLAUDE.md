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
- **Vercel** : projet `horizondessens` (équipe `max-00e6`, https://horizondessens.vercel.app), relié au dépôt. **CLI liée** (`npx vercel@latest`, dossier `.vercel/` ignoré) : je gère les variables avec `vercel env add/ls/pull`. Le doublon `horizondessens-y5z8` a été supprimé.
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
| [docs/questions-elodie-rdv.md](docs/questions-elodie-rdv.md) | Les 10 questions en suspens à poser à Élodie (RDV du 23/11), avec un emplacement pour les réponses. | Après le RDV : reporter les réponses dans CONTEXTE.md §13 |
| [docs/CONTEXTE.md](docs/CONTEXTE.md) | **Synthèse de référence** (§15 = **checklist de mise en production**, à tenir à jour) : acteurs, enjeux, positionnement, offre, DA, SEO, fonctionnalités, technique, planning. **§13 = décisions validées par Maxime, elles priment.** | Toujours, avant tout travail de contenu ou de design |
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
| Navigation et routes | `src/lib/navigation.ts`. **`routes.reserver` pointe directement vers SimplyBook** en attendant la page `/reserver`. Les pages `/kobido`, `/le-salon`, `/carte-cadeau`, `/contact` et les pages légales **n'existent pas encore** et renvoient une 404. |
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

## Images Midjourney intégrées (23/11/2026)
Les 7 images de `assets/massage midjourney/` sont compressées en JPEG dans `public/images/massages/` et branchées dans `src/content/defaults.ts` : hero = `header1` (paysage, fait pour le hero), Kobido (carte) = `kobido-visage-1`, Calme et harmonie = `dos`, 5 Continents (carte) = `bras`, Jambes légères = `pieds`, focus Kobido = `visage-5`, focus 5 Continents = `massages/dos-2` (remplace le flacon d'huile, demandé par Maxime) (jamais deux dos proches). **Kobido = uniquement des visages** (seules 2 images de visage existent). Règle : **jamais deux fois la même image sur une page** (médaillons de la philosophie remplacés par `mains-epaules`, `massage-dos`, `massage-dos-2`).

## Adaptation multi-appareils (23/11/2026)
Accueil et Kobido vérifiées à 320, 390, 768, 844×390 (paysage), 1024 et 1920 px : aucun scroll horizontal. Correctif : en paysage mobile (hauteur ≤ 32rem), le hero de l'accueil passe en `justify-start` avec un titre `text-h3`, pour que le titre soit visible au premier écran. Zones cliquables du header et du logo portées à 44 px. Non testé : appareils réels, vrai toucher, Safari.

## DESIGN.md (23/11/2026)
`DESIGN.md` (racine) et `.impeccable/design.json` sont écrits par `/impeccable document` : tokens, typo, formes, composants et règles tels qu'implémentés. **Statut provisoire** (palette et typos de Serelin, à personnaliser) et **sans « North Star » métaphorique**, voulu par Maxime (risque de perturber les futurs agents). À régénérer quand le design change.

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
- **Section Origine (Japon traditionnel)** : image `public/images/kobido/origine-japon.jpg` (cérémonie du thé, Tiago Ebisui, Unsplash), choisie par Maxime parmi 10 candidates gardées dans `assets/kobido-japon-candidats/`. Cadre passé en portrait 4:5 (hauteur plafonnée à 52vh en desktop pour rester dans la colonne collante).

- **Heros épurés (distill + clarify)** : accueil = titre, accroche, un seul bouton « Réserver un soin ». Kobido = titre, accroche, un bouton, durées et prix, image. Retirés : surtitres, faits clés (2018, M5C, Reiki, Réflexo : déjà dans les sections 5 Continents et Élodie), fil d'Ariane visuel (le JSON-LD reste), liens secondaires, pastille sur l'image. Clés supprimées : `home.hero.eyebrow`, `home.trust.items`, `kobido.hero.eyebrow` (96 clés). Accroches reformulées, avec « Saint-Cyr-sur-Loire, près de Tours » conservé pour le SEO.

## Menu mobile « voiles courbes » (23/11/2026)

- Source : `components/forceful-branding-164349/` (composant Framer CurveMenuOverlay, GSAP), ajouté par Maxime. **Gardé en local, ignoré par Git**, exclu du lint, de TypeScript et de Prettier (`/components/`, à ne pas confondre avec `src/components/`).
- Réécrit avec **Motion** (sans GSAP) dans `src/components/layout/mobile-menu.tsx`, avec les mêmes tracés SVG, durées et courbes :
  - ouverture : voile `accent-200` puis voile `night` qui montent en se courbant, puis les liens glissent depuis leur masque en cascade, puis contact et « Réserver » ;
  - fermeture : à l'inverse.
- Liens en Instrument Serif italique, `min(84px, 15vw)` : **84px comme l'original dès 560px de large**, réduits en dessous, sinon « Carte cadeau » déborde.
- Bouton : même emplacement ; deux barres qui pivotent en croix (0.6 s). En-tête transparent pendant que le menu est ouvert ; la barre « Réserver » mobile se masque.
- Desktop (≥ 1024px) : inchangé.

## Pages légales et Contact (23/11/2026)

- **Réponses d'Élodie** reportées dans `docs/questions-elodie-rdv.md` et CONTEXTE.md §13 (« Réponses d'Élodie ») : clientèle mixte non mentionnée, **Rituel Horizon 1h15 120 €** (`local-services.ts`), **abonnement Kobido à 90 €** la séance (textes mis à jour), horaires **lun.–sam. 9h30–11h / 13h30–17h** (`site.hours`), cartes cadeaux 6 mois, SIREN 841 843 337.
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

## Pages Le salon et Carte cadeau (23/11/2026)

- **Le salon** `/le-salon` (`src/components/salon/`) :
  - `hero` : clair et éditorial (titre à gauche, accroche + adresse + bouton à droite), puis grande image panoramique (`salle-loire`) ;
  - `place` : texte « Un lieu pensé pour ralentir », **mosaïque des 6 images du lieu** (`salon.lieu.gallery` : fenêtre sur la Loire, bords de Loire, salle de soin, lampe et galets, Loire au crépuscule, huiles) avec légendes, puis 3 atouts numérotés ;
  - `story` : **parcours d'Élodie en version longue** (portrait et citation collants, 6 chapitres datés sur un fil vertical : soignante, Reiki 2017, le choix fin 2017, Horizon des Sens 2018, Kobido 2025, au bord de la Loire). Récit réécrit d'après l'ancien « Qui suis-je ? » : **à valider par Élodie** (dates de la réflexologie et du M5C non précisées, nom du maître Reiki volontairement omis) ;
  - `visit` : carte sombre avec adresse, itinéraire, horaires et CTA.
  - Nouvelles images `public/images/salon/loire-jardin.jpg` et `loire-couchant.jpg` (photos Sensoa de Maxime, lieu sans personne). Photo Sensoa `salon-06` (salle avec fauteuils) **non utilisée** : lieu non confirmé.
- **Carte cadeau** `/carte-cadeau` (`src/components/gift-card/`), en **vitrine** :
  - `hero` (texte + visuel de la carte légèrement incliné), `cards` (`id="formules"`, cartes dessinées comme de vraies cartes : Kobido 1h 100 € et 1h15 120 €, prix depuis `getGiftCards()` → `src/lib/gift-cards.ts`), `how-it-works` (4 étapes + « Bon à savoir » et lien CGV) ; note 5 Continents « sur demande ».
  - Bouton « Offrir cette carte » = formulaire **POST** vers `/carte-cadeau/commander` (`src/app/carte-cadeau/commander/route.ts`, `routes.carteCadeauCommander`). **Aujourd'hui : redirection 303 vers `/contact#ecrire`.** C'est là qu'on branchera Stripe Checkout (session, champ « bénéficiaire », webhook → PDF).
  - `RemixButton` ajouté dans `button-link.tsx` (bouton remix en `<button>`).
- Header : `/le-salon` et `/carte-cadeau` ajoutées aux `lightPages` (pilule opaque dès le haut).
- **122 clés** (`salon.*`, `cadeau.*`). Build : 9 pages statiques + la route dynamique de commande. Vérifié en 1440 et 375 px.

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
| 2026-11-23 | Dev | **Accueil v1 développée** : 11 sections, header et footer, animations Serelin, 54 clés de contenu, soins locaux. Images compressées par Sonnet. Vérifié en desktop et en mobile. |
| 2026-11-23 | Dev | **Accueil v1.1** : audit impeccable (contrastes corrigés) et refonte au plus près de Serelin (titres italiques mot à mot, header en pilule, bouton remix, grandes cartes, philosophie, galerie salon, appel final avec footer). |
| 2026-11-23 | Dev | Bouton remix inversé : pastille à gauche au repos, elle glisse à droite au survol (sens de la flèche). Questions pour Élodie préparées (`docs/questions-elodie-rdv.md`). |
| 2026-11-23 | Dev | **Page Kobido** : 9 sections aux layouts distincts de l'accueil, 30 clés de contenu, JSON-LD Service, FAQ et fil d'Ariane. Build statique, vérifiée en desktop et en mobile. |
| 2026-11-23 | Dev | **Menu mobile à voiles courbes** (inspiré de CurveMenuOverlay, réécrit avec Motion). Desktop inchangé. |
| 2026-11-23 | Dev | **Pages Le salon** (lieu, mosaïque, parcours d'Élodie) **et Carte cadeau** (vitrine, bouton prêt pour Stripe). |
| 2026-11-23 | Dev | Réponses d'Élodie reportées. **Pages légales** (mentions, CGV, confidentialité) et **page Contact** (formulaire Resend, carte au clic). Build statique, vérifié en desktop et en mobile. |

### Questions encore ouvertes
- Accueil v1 : en attente des retours de Maxime sur le site développé.
- **Pour l'accueil v1** : le nom du massage sur mesure (proposition : « Rituel Horizon »), l'année de début de pratique (2017, 2018 ou « 8 ans »), une image jambes ou pieds manquante, le mockup carte cadeau à produire, la confirmation des 2 images Sensoa où l'on voit une personne massée, les horaires et l'accès au salon.
- **Pour les CGV et les mentions légales** : le statut juridique, le régime de TVA, le médiateur de la consommation, la politique d'annulation des rendez-vous, la cessibilité de la carte cadeau, le choix de la mesure d'audience.
- La clientèle est-elle réservée aux femmes ou mixte ? À vérifier avec Élodie.
- Élodie est **déjà présentée sur le site de Sensoa** (« Bienvenue à Élodie », « Séance avec Elodie »). Faut-il gérer cette double présence, et comment ?
- ~~Photos du salon et de la Loire issues de Sensoa~~ → ✅ Réutilisables, Maxime en est l'auteur. **Sauf** les images où l'on voit une masseuse ou une personne massée.
- Maxime doit remplir la colonne « Réutilisable ? » dans `references/sensoa/sensoa-site.md`.
- Infos légales envoyées par Élodie (statut, TVA, **médiateur**, annulation) : voir CONTEXTE.md §13. **Clé Resend** à créer et domaine à vérifier.
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
