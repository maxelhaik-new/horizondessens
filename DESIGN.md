---
name: Horizon des Sens
description: Site vitrine de massage bien-être (Kobido), papier rosé chaud, serif italique, grands visuels sombres et cartes très arrondies.
colors:
  paper: "#f7ece9"
  paper-soft: "#fbf6f5"
  blush: "#eed5ce"
  sand: "#e6c4bb"
  mist: "#f3e1dc"
  night: "#1a110f"
  ink: "#1a110f"
  ink-soft: "#525252"
  ink-subtle: "#5f5f5f"
  accent-300: "#e6c4bb"
  accent-500: "#c5816e"
  accent-600: "#af6753"
  accent-800: "#7a483a"
  accent-950: "#361f19"
typography:
  display:
    fontFamily: "Sorts Mill Goudy, Georgia, Times New Roman, serif"
    fontSize: "5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Sorts Mill Goudy, Georgia, Times New Roman, serif"
    fontSize: "4rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Sorts Mill Goudy, Georgia, Times New Roman, serif"
    fontSize: "3.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.008em"
  label:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.06em"
  logo:
    fontFamily: "Squatina, Times New Roman, serif"
    fontSize: "1.5rem (×1,25 : police condensée)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.03em"
rounded:
  media: "1.5rem"
  panel: "2rem"
  card: "2.5rem"
  pill: "9999px"
spacing:
  section-y-mobile: "4rem"
  section-y-desktop: "5rem"
  container: "75rem"
components:
  button-primary:
    backgroundColor: "{colors.night}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    height: "3.5rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-950}"
  button-soft:
    backgroundColor: "#ffffff8c"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    height: "3.5rem"
  button-light:
    backgroundColor: "#ffffff"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    height: "3.5rem"
  eyebrow-pill:
    backgroundColor: "#ffffffb3"
    textColor: "{colors.accent-800}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 20px"
  service-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "16px"
  faq-item:
    backgroundColor: "{colors.paper-soft}"
    rounded: "{rounded.panel}"
    padding: "0 32px"
---

# Design System: Horizon des Sens

> **Statut : provisoire.** Palette, typographies et composants sont repris du template Serelin (référence d'inspiration, réécrite proprement) et seront personnalisés ensuite pour Horizon des Sens. Ce document décrit l'existant, il ne le fige pas.

## Overview

Un site de soin calme et chaleureux : fond papier rosé, grands visuels photographiques sombres et dorés, titres en serif italique et cartes aux angles très arrondis. La couleur de marque historique d'Élodie, le rose framboise `#B84C64`, n'est **pas** utilisée aujourd'hui : l'accent est un terracotta poudré (échelle `accent-*`). Le rose reste une option d'accent discret, à trancher.

Le site est une page d'accueil longue, en mode Persuade : réserver un soin ou découvrir le Kobido. Les animations sont généreuses mais toutes désactivables (`prefers-reduced-motion`).

**Key Characteristics:**
- Fond rosé `paper`, sections alternées `paper`, `blush`, `mist` et une section sombre `night`.
- Titres en Sorts Mill Goudy italique, texte en Source Sans 3, logo en Squatina capitales.
- Cartes de 40 px de rayon, médias de 24 à 32 px, boutons et pastilles en forme de pilule.
- Photos chaudes et sombres (Midjourney, salon à Saint-Cyr) en grand, avec un léger zoom ou une parallaxe.
- Aucun texte ni aucune couleur en dur dans les composants : tout passe par les tokens de `src/app/globals.css`.

## Colors

Palette neutre chaude tirée vers le rose et l'ocre, un seul accent terracotta, un noir chaud pour les boutons et les sections sombres.

### Primary
- **Noir chaud** (`#1a110f`, `night` et `ink`) : titres, hero, section sombre 5 Continents et les rares boutons `primary`. Jamais du noir pur.
- **Terracotta** (`accent-600` `#af6753`, `accent-800` `#7a483a`) : accent. `accent-800` est le minimum pour du petit texte sur fond clair (contraste AA). `accent-600` sert aux éléments non textuels (barre de défilement).

### Neutral
- **Papier rosé** (`#f7ece9`, `paper`) : fond principal de la page.
- **Papier clair** (`#fbf6f5`, `paper-soft`) : cartes et éléments posés sur `paper`, comme les questions de la FAQ.
- **Rose poudré** (`#eed5ce`, `blush`) et **sable rosé** (`#e6c4bb`, `sand`) : fond de la section Soins (dégradé de `paper` vers `blush`), sélection de texte, séparations.
- **Brume rosée** (`#f3e1dc`, `mist`) : bas de page (appel final et footer).
- **Gris texte** (`#525252` `ink-soft`, `#5f5f5f` `ink-subtle`) : texte courant, avec un contraste d'au moins 5,4 à 1 sur `paper`.

### Named Rules
**The Warm Black Rule.** Le noir est toujours `#1a110f`, jamais `#000`. Les ombres sont teintées `rgb(26 17 15 / …)`.

**The Small Text Rule.** Tout petit texte d'accent est en `accent-800` ou plus foncé. Les accents plus clairs ne portent jamais de texte.

## Typography

**Display et titres :** Sorts Mill Goudy (OFL), toujours en italique, poids 400.
**Texte et interface :** Source Sans 3 (OFL, variable), agrandie de 10 % par `size-adjust` pour garder la taille apparente de l'ancienne police : les tailles CSS ne tiennent pas compte de cet agrandissement.
**Logo :** Squatina Regular (licence à confirmer), en capitales, uniquement dans le logo.

Aucune police en dur dans un composant : tout passe par `--font-serif`, `--font-sans` et `--font-logo` (`globals.css`, alimentés par `src/app/fonts.ts`). Hors navigateur, les mêmes polices sont reprises par le PDF de la carte cadeau (fichiers statiques dans `src/lib/gift-card/assets/`) et par les e-mails (`public/fonts/email/`, avec Georgia et Helvetica en repli pour Gmail et Outlook). Un sélecteur d'essais temporaire (onglet « Aa ») permet encore de comparer d'autres polices.

**Character :** un serif éditorial italique à l'ancienne (Goudy), chaleureux, posé sur un sans-serif humaniste et lisible ; le logo, condensé et droit, fait contrepoint. Les titres sont révélés mot à mot (flou, glissement, fondu).

### Hierarchy
- **Display** (400 italique, 3 → 4 → 5 rem, interligne 1.2, -0.02em) : titre du hero uniquement.
- **Headline `text-h2`** (400 italique, 2.5 → 3.5 → 4 rem) : titres de section.
- **Title `text-h3`** (400 italique, 2.25 → 3 → 3.5 rem) : titres des cartes de soin et des offres. `text-h4` (1.75 → 2 rem) pour les petits titres.
- **Body `text-lead`** (Source Sans 3, 1 → 1.125 rem, interligne 1.6, 0.008em) : textes d'introduction. `text-body` (0.9375 → 1 rem) pour le reste.
- **Label `text-eyebrow`** (Source Sans 3 500, 0.8125 → 0.875 rem, 0.06em, capitales) : surtitres de section, toujours dans une pastille.

### Named Rules
**The Italic Serif Only Rule.** Le serif n'apparaît qu'en italique et uniquement pour les titres. Aucun texte courant n'est en serif.

## Layout

Conteneur de 1200 px de contenu (`container-site`, 20 px de marge sur mobile, 32 px dès 768 px). Rythme vertical des sections : 64 px sur mobile, 80 px dès 1024 px (`section-y`). Alignement à gauche par défaut ; la FAQ et les appels centraux sont centrés. Les cartes de soin sont de grandes cartes en deux colonnes (image 1.25fr, texte 1fr) empilées en sticky sur desktop et en liste simple sur mobile. La galerie du salon défile horizontalement avec le scroll sur desktop, en swipe natif sur mobile. Points de rupture Tailwind : 48 rem (md), 64 rem (lg), 80 rem (xl).

## Elevation & Depth

Surtout tonal : la profondeur vient de l'alternance des fonds et des arrondis. Deux ombres seulement, toutes deux chaudes.

### Shadow Vocabulary
- **Lift** (`0 0.6px 1.1px -0.75px / 0 1.9px 3.5px -1.5px / 0 5px 9px -2.25px / 0 16px 29px -3px`, teinte `rgb(26 17 15)` à 10-16 %) : boutons et pastilles.
- **Soft** (`0 24px 60px -32px rgb(54 31 25 / 0.35)`) : en-tête flottant une fois la page défilée.

### Named Rules
**The Warm Shadow Rule.** Aucune ombre grise ou noire pure : toujours la teinte chaude du noir de marque.

## Shapes

Langage d'arrondis généreux. Cartes `rounded-card` (40 px), panneaux et images de cartes `rounded-panel` (32 px), médias `rounded-media` (24 px). Tout élément interactif ou étiquette est une **pilule** (rayon complet). Les images sont révélées par un clip-path qui s'ouvre, avec un dézoom et une parallaxe légers.

## Components

### Buttons
Modèle **global** déclaré dans `src/app/globals.css` (classes `btn`, `btn-soft`, `btn-primary`, `btn-light`, `btn-sm`, `btn-plain`, variables `--btn-*`), consommé par `ButtonLink`, `RemixButton` et `buttonClass()` (`src/components/ui/button-link.tsx`). Aucun bouton ne définit ses couleurs ou sa géométrie dans un composant.
- **Shape :** pilule, 48 px de haut sur mobile, 56 px dès 768 px ; 44 px en `sm`.
- **Soft (défaut) :** blanc à 55 %, contour fin `line-strong`, texte `ink`, pastille `accent-200`. Au survol : fond blanc, pastille `accent-800`. Pour tous les appels répétés (cartes de soin, offres, « Découvrir »).
- **Primary :** fond `night`, pastille `accent-200`, ombre courte. **Rare** : actions qui engagent (confirmer un RDV, envoyer, payer, télécharger) et un seul appel par page au plus (appel final de l'accueil, barre « Réserver » mobile).
- **Light :** fond blanc, pastille `accent-200` (`night` au survol). Sur photo ou fond sombre.
- **Plain :** sans pastille, texte centré (formulaires, choix des cookies, à poids égal).
- **Hover :** la pastille glisse à droite pendant que le texte glisse à gauche, 0,5 s en `ease-soft` (sans rebond). Désactivé avec `prefers-reduced-motion`. Focus : contour `accent-800` décalé de 3 px.
- **Text link :** lien souligné, soulignement à 30 % qui passe à 100 % au survol. Pour les actions secondaires.

### Eyebrow pill
Pastille de section : fond blanc à 70 %, texte `accent-800`, majuscules espacées. Variantes `glass` (blanc à 15 % flouté, sur photo) et `dark` (sur fond sombre).

### Cards / Containers
- **Service card :** fond `paper`, rayon 40 px, 16 px de marge interne, image à gauche (32 px de rayon, zoom 105 % au survol sur 1.4 s), titre italique, sous-titre en `accent-800`, tarifs en pilules blanches, un seul bouton « Réserver ». Hauteur mini de 560 px sur desktop.
- **Offer / final CTA card :** même rayon, fond clair, logo, titre italique à gauche, texte et appel à droite.

### FAQ item
Élément `<details name>` natif : fond `paper-soft`, rayon 32 px, question en 18 px, pastille cerclée d'un filet avec un plus qui tourne de 45 degrés et se remplit en `night` à l'ouverture. Une seule question ouverte à la fois.

### Service hero
Toutes les pages de soin (Kobido, 5 Continents, Calme et harmonie, Jambes légères, Rituel Horizon) partagent un hero plein cadre (`FullHero`) : photo sombre pleine largeur sur au moins un écran, dégradé `night` de 75 % en haut (lisibilité de la navigation) à 85 % en bas, H1 court en `text-display`, accroche avec la localisation, un seul bouton `light`, durées et prix en serif italique à droite derrière un filet (au-dessus sur mobile), badge M5C pour le 5 Continents.

### Navigation
En-tête en pilule flottante de 72 px (64 px sur mobile), transparente sur le hero sombre, puis blanche à 70 % avec un flou fort au défilement. Mobile : menu plein écran et barre « Réserver » fixe en bas.

### Logo
Symbole « soleil sur l'horizon » (`public/images/logo/symbole-soleil.svg`, une couleur, `currentColor`) suivi du nom « HORIZON DES SENS » en Squatina capitales. Assemblage fixe (`LogoWordmark symbol`) : haut des rayons au haut des capitales, ligne d'horizon sur la ligne de base, reflet en dessous, espace de 0,62 hauteur de capitale, interlettrage 0,03 em, nom affiché à 125 %. Toujours d'une seule couleur : `ink` sur fond clair, blanc sur photo ou fond sombre, `accent-800` dans l'appel final, dorure sable cuivré sur la carte cadeau. Version vectorielle complète (nom en tracés) : `public/images/logo/logo-horizon-des-sens.svg` ; icônes, images de partage, logo des e-mails et du PDF générés par `npm run assets:brand`. Sous 64 px (favicon), le symbole perd son reflet, qui se brouille.

### Gift card
Recto unique pour le visuel des mockups, la page 1 du PDF et l'aperçu de la page de remerciement, positions et tailles dans `src/lib/gift-card/card-layout.json` : fond roche rouge (`#5c2218` au centre, `#280d09` aux bords), logo et « Carte Cadeau » en dorure sable cuivré (`#f0cda0` → `#be7e52`), accroche selon la durée en rose terre, « Offert à » et nom en crème, numéro en bas à droite. La page 2 du PDF reprend la charte claire du site (fond papier, panneau `night`). Les cartes de choix de la page Carte cadeau (1h et 1h15, avec prix et bouton) restent des cartes du site, pas des répliques du recto.

## Do's and Don'ts

### Do:
- **Do** utiliser uniquement les tokens de `globals.css`, jamais une couleur ou une taille en dur.
- **Do** garder une seule action principale par bloc (« Réserver »), les autres en lien texte.
- **Do** respecter `prefers-reduced-motion` : le texte et les images doivent rester visibles sans animation ni JavaScript.
- **Do** faire passer le contenu éditable (textes, images) par la couche `src/content/`, jamais en dur dans un composant.
- **Do** utiliser des photos chaudes et sombres, avec des visages uniquement pour le Kobido, et jamais deux fois la même image sur une page.

### Don't:
- **Don't** utiliser le noir pur ni une ombre grise.
- **Don't** mettre de petit texte en accent plus clair que `accent-800`.
- **Don't** reprendre la palette bordeaux et framboise de Sensoa (`#5B0829`, `#AE3766`) : elle est trop proche et prêterait à confusion avec le salon partagé.
- **Don't** copier le code, les images ou les textes du template Serelin : on s'en inspire et on réécrit.
- **Don't** montrer de prix ni de durée ailleurs que depuis les données SimplyBook.
