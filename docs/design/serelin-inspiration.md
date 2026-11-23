# Serelin : référence d'inspiration (pas une base de code)

> Analyse du 23/11/2026. Le dossier `serelin/` contient une **extraction décompilée** du site de démo `serelin.framer.website` : « Serelin – Luxury Medspa & Wellness Template », un template Framer payant de Shouvik Biswas, avec un lien « Purchase Serelin » dans la navigation.
> **Règle** : on s'en inspire pour le rythme des mises en page, la logique des tokens et les comportements d'animation. On **réécrit tout proprement**. **Aucune reprise** du code décompilé (`custom_code/`, `vendor/`, runtime Framer), des images, des textes ni des noms.

## Pourquoi ça colle à Horizon des Sens
- **Style** : éditorial chic, chaud, contemporain. Fond crème, grandes images, typo serif élégante, beaucoup d'air. C'est exactement la direction du cadrage : base papier, vraies photos, hiérarchie claire, premium sans clinquant.
- **Palette** : la gamme d'accent est **terracotta et rose poudré** (`#fbf6f5` → `#f7ece9` → `#eed5ce` → `#e6c4bb` → `#d6a293` → `#c5816e` → `#af6753` → `#925443` → `#7a483a` → `#674035` → `#361f19`). Elle est cohérente avec la piste « ocre + rose » et avec les mockups de carte cadeau au décor de riad (`assets/Cartes cadeau temp/`). Surtout, elle est **nettement distincte du bordeaux et du framboise de Sensoa**.
- **Domaine** : medspa et bien-être, donc les mêmes besoins de structure (soins, expérience, FAQ, CTA de réservation).

## Ce qu'on reprend, sous une forme propre

| Serelin (décompilé) | Chez nous (réécrit) |
|---|---|
| 64 tokens `--token-<uuid>` sans nom | Des **tokens sémantiques** dans le `@theme` Tailwind : `--color-paper`, `--color-surface`, `--color-ink`, `--color-ink-muted`, `--color-line`, une gamme `--color-accent-50…900`, plus les tailles typographiques, rayons, espacements, durées et courbes d'easing. Les valeurs seront adaptées à Horizon lors du design (on ne copie pas la palette telle quelle). |
| Polices Instrument Serif, Inter, Manrope, Fragment Mono | Les quatre sont des **Google Fonts sous licence OFL**, libres d'usage. On les charge avec `next/font`. On fera probablement un choix plus resserré (un serif de titrage et une sans-serif de texte, la mono pour les surtitres en option), décidé avec le design. |
| `SmoothScroll_Prod` (Lenis) | Un seul composant client `SmoothScroll` (Lenis), **désactivé si `prefers-reduced-motion`**. |
| `Parallax_Reveal` (révélation d'image par clip-path au scroll) | Un composant `RevealImage` (Motion `useScroll` / `useTransform`, clip-path), réutilisable. |
| `Lumina_Parallax` (parallaxe à ressort) | Un composant `Parallax`, léger (un seul `useTransform`, ressort optionnel). |
| Textes qui apparaissent en fondu et en décalé | Un composant `Reveal` (Motion `whileInView`, avec un décalage de délai entre les enfants). |
| Bandeau de mots en défilement continu (marquee) | Un `Marquee` en **CSS pur**, mis en pause au survol et quand le mouvement est réduit. |
| FAQ en accordéon | Un composant `Accordion` accessible (`<details>` ou ARIA). |
| Header sticky qui change d'état au scroll | Un composant `Header` avec un état « au-dessus du hero / opaque ». |
| `CornerSmoother` (coins « squircle ») | Probablement inutile : `border-radius` suffit. À voir au design. |
| `Advanced_Scroll_Pro` (barre de défilement custom) | Abandonné : ça nuit à l'accessibilité et n'apporte rien. |
| `Dual_Axis_Compare` (avant / après) | Hors sujet pour du massage. Abandonné. |

**Principes de propreté**
- Composants serveur par défaut, avec de **petits îlots client** uniquement pour l'animation.
- Une section = un composant. `page.tsx` ne fait qu'assembler les sections.
- Pas de styles en ligne, pas de valeurs magiques : tout passe par les tokens.
- Animations sobres et toujours compatibles avec `prefers-reduced-motion`.
- Aucun texte en dur : tout passe par `getContent()`.

## Correspondance des sections : Serelin → accueil v1

| Serelin | Accueil Horizon (docs/contenu/accueil-v1.md) |
|---|---|
| Hero : surtitre, H1, accroche, CTA, 3 chiffres clés | §1 Hero, puis §2 bandeau de réassurance. **On n'invente aucun chiffre** : uniquement des faits (année, licence M5C, Reiki, réflexologie). |
| Bandeau de mots en marquee | Option : une ligne de mots du soin (« Détente · Éclat · Lâcher-prise… ») entre le hero et les soins. |
| Déclaration de philosophie (grande phrase en serif) | Option : une phrase d'Élodie, mise en valeur comme une citation. |
| Grille de soins (cartes avec lien) | §3 Les soins |
| « An elevated standard of care » (3 piliers) | §6 Les 3 temps d'une séance |
| Témoignages | §8 Avis Google (de vrais avis seulement) |
| Bandeau « Featured in » | ✗ (pas de presse : on n'invente rien) |
| « Built around your comfort » (expérience, grande image) | §6 Le salon |
| FAQ | **À ajouter ?** Une FAQ courte sur l'accueil ou sur la page Kobido, utile pour le SEO et pour lever les freins. |
| CTA final et footer riche | §10 Appel final et infos pratiques, puis le footer |

Les sections propres à Horizon, sans équivalent Serelin : §4 Focus Kobido, §5 Focus 5 Continents, §7 Élodie, §9 Abonnement et carte cadeau.

## ⚠️ Licence et dépôt public
- Le contenu de `serelin/` (code décompilé, bundles Framer, images et polices extraites) est la propriété de l'auteur du template et de Framer. Il est actuellement **poussé sur le dépôt GitHub public**, ce qui en fait une redistribution.
- **Recommandation** : retirer `serelin/` du dépôt et le garder en local (ajout au `.gitignore`). Cette fiche d'analyse suffit comme référence versionnée.
