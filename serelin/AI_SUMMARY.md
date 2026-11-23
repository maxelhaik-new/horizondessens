# Blueprint & Analyse du Template Framer pour Agent IA
**Source :** `https://serelin.framer.website/`  
**Nom du site d'origine :** Serelin - Luxury Medspa & Wellness Template  
**Date d'extraction :** 2026-09-26 13:49:45  

Ce dossier contient toutes les informations requises pour comprendre, adapter ou réutiliser ce template Framer dans un projet **Next.js (App Router) + Tailwind CSS + Motion (Framer Motion) / GSAP**.

---

## 🧭 ADN du Template & Contexte d'Origine (À titre informatif)

> **Note de contextualisation :** Cette analyse décrit l'intention et le contenu du site d'origine afin de vous donner des repères sur les textes et médias extraits. Ce template est **100% neutre et adaptable** : sa structure, ses composants et ses animations peuvent être réutilisés pour **n'importe quel produit, secteur ou entreprise** (SaaS, cabinet, mobile, e-commerce, santé, industrie, startup, etc.).

- **🎨 Direction Artistique & Style Visuel :** **Éditorial Chic & Warm Contemporary**  
  *Fond crème/ivoire apaisant, typographie éditoriale élégante, grands espaces blancs et mise en page digne d'un magazine de luxe.*
- **🏷️ Thématique du site d'origine :** Studio Créatif, Agence & Showcase Visuel  
  *Site vitrine à forte identité visuelle mettant l'accent sur les médias, la typographie et les transitions de projets.*  


### 💡 Forces du Layout & Dynamique Visuelle :
- Mise en scène visuelle immersive (grands visuels, showreel, transitions fluides)
- Typographie audacieuse et contrastée adaptée aux claims et slogans marquants
- Animations cinétiques au scroll idéales pour valoriser des réalisations ou du storytelling
- Grilles de cartes modulaires facilement adaptables à tout type de services ou produits

---

## 📐 Structure & Wireframe des Sections Détectées

- **Hero Section :** Accroche d'origine : *"Radiance, Refined"*
- **Pôles Majeurs / Blocs de Contenu Identifiés :**
- **`We believe every treatment should honor your unique anatomy and your personal narrative.`**
- **`Nurturing your natural baseline`**
- **`An elevated standard of care`**
- **`Notes from our clients`**
- **`Built around your comfort`**
- **`Clarity for your journey`**
- **`Return to your natural vitality`**
- **Sous-pages & Routes Détectées :** `/about`, `/contact`, `/legal`, `/treatments`

---

## 🎨 Signature Visuelle, Tokens & Typographie

- **Thème dominant :** Light Mode Épuré (Dominante claire / blanc cassé)
- **Fond principal :** `#ffffffe0` | **Texte principal :** `#000`
- **Couleur d'accent :** `#d6a293`
- **Typographies détectées :** `Fragment Mono`, `Fragmentmono`, `Instrument Serif`, `Instrumentserif`, `Inter`, `Manrope`
- **Nombre total de variables CSS extraites :** 64 (fichiers sources : `tokens/tokens.css` et `tokens/tokens.json`)

### Échantillon de tokens clés :
```css
  --token-4a6b33f3-498c-4288-825f-82360b88fec8: #000;
  --token-53deb343-6d94-4c29-a47f-88f1593094bf: #fff;
  --token-61cedb92-e2b9-4cd2-b272-9d6742010abf: #fafafa;
  --token-053f7d88-019c-448b-99d4-cdfcb06828fd: #e5e5e5;
  --token-336218b4-35e1-4d9b-9047-e8f2b5b67726: #f5f5f5;
  --token-a570d345-eeb9-4870-88b6-40807547f8e7: #d4d4d4;
  --token-a8a1523f-bd3f-4297-924c-30c6c15fde90: #a3a3a3;
  --token-2480ffea-650f-4a33-95ac-570544d6c07e: #737373;
```

---

## 🛠️ Recommandations Techniques d'Adaptation

Pour réutiliser et adapter ce template au nouveau projet demandé :

1. **Règle d'or ZÉRO Monolithe :**  
   Ne créez JAMAIS une page monolithique dans `app/page.tsx`. Découpez chaque bloc dans un composant dédié sous `src/components/` (`Navbar.tsx`, `Hero.tsx`, `Features.tsx`, etc.). Le fichier `app/page.tsx` ne doit servir qu'à orchestrer et assembler ces composants.
2. **Liberté Thématique Totale :**  
   Remplacez librement les textes, titres, propositions de valeur et visuels selon le nouveau sujet client, tout en tirant parti du rythme et de la hiérarchie visuelle déjà en place dans le template.
3. **Personnalisation des Tokens (`tokens/tokens.css`) :**  
   Ajustez simplement les variables CSS (couleur d'accent, teintes de fond/surfaces) pour les accorder à la charte graphique de la nouvelle marque.
4. **Préservation des Animations :**  
   Réutilisez les modules cinétiques décompilés sous `custom_code/` (GSAP ScrollTrigger, SplitText reveals, Motion transitions) et Lenis pour préserver la fluidité et le niveau de finition professionnel du rendu Framer.

---

## 🏗️ Architecture Recommandée du Projet

```
src/
├── app/
│   └── page.tsx              # Uniquement l'assemblage des sections
├── components/
│   ├── Navbar.tsx            # Header sticky / navigation
│   ├── Hero.tsx              # Section haute avec reveal
│   ├── SmoothScroll.tsx      # Wrapper Lenis Smooth Scroll
│   ├── CardStack.tsx         # Section des cartes empilées au scroll
│   ├── TextReveal.tsx        # Composant Revelo adapté (GSAP SplitText / Motion)
│   └── Footer.tsx
├── tokens/
│   └── tokens.css            # Variables CSS extraites directement
└── assets/                   # Médias originaux extraits
```

---

## 🧩 Composants Clés & Mécanismes d'Animation Détectés

### 1. Composants Personnalisés (`custom_code/`)
- **`U6aSNyrnR.js`** : Logique réutilisable décompilée sans minification.
- **`k9rl3R1d_-0.js`** : Logique réutilisable décompilée sans minification.
- **`tLKK_iffS-0.js`** : Logique réutilisable décompilée sans minification.
- **`B8qNNlozU.js`** : Logique réutilisable décompilée sans minification.
- **`ProCircularGallery.js`** : Logique réutilisable décompilée sans minification.
- **`phfCE2XYJ.js`** : Logique réutilisable décompilée sans minification.
- **`rP3ajCvD6.js`** : Logique réutilisable décompilée sans minification.
- **`AvoidLayoutJumping_Prod.js`** : Logique réutilisable décompilée sans minification.
- **`CbX0b__Vr.js`** : Logique réutilisable décompilée sans minification.
- **`gtRGluzEd.js`** : Logique réutilisable décompilée sans minification.
- **`lHx8133CN.js`** : Logique réutilisable décompilée sans minification.
- **`TMLSaTLjg.js`** : Logique réutilisable décompilée sans minification.
- **`GURmLP2fR.js`** : Logique réutilisable décompilée sans minification.
- **`fVlDNKLNV.js`** : Logique réutilisable décompilée sans minification.
- **`nqqm30FmN.js`** : Logique réutilisable décompilée sans minification.

### 2. Moteurs d'Animation Utilisés
- **Motion (`framer-motion`)** : Utilisé pour les transitions layout (`layoutId`), les animations d'entrée au viewport et les transitions de page.
- **GSAP + ScrollTrigger** : Détecté dans les composants personnalisés pour le scrub au scroll et les calculs de pinning.
- **Lenis Smooth Scroll** : Recommandé pour synchroniser l'inertie molette avec les animations.

---

## 📊 Données Dynamiques & Scroll Timeline (`dynamic_audit/`)
- **Screenshots haute définition :** disponibles dans `dynamic_audit/screenshots/` (Desktop, Tablet, Mobile).
- **Matrices de défilement :** `dynamic_audit/scroll_transforms.json` enregistre l'évolution exacte des propriétés `transform` et `opacity` au fur et à mesure du scroll (0% à 100%).
- **Web Animations :** 0 animations actives inspectées dans `dynamic_audit/web_animations.json`.

---

## 🚀 Prompt Prêt à l'Emploi pour Agent IA

> *"Tu es chargé d'adapter ce template Framer décompilé `https://serelin.framer.website/` pour concevoir un projet web complet en Next.js (App Router) et Tailwind CSS.  
> Le design d'origine présente un style `Éditorial Chic & Warm Contemporary` avec une architecture modulaire (7 sections clés identifiées dans `AI_SUMMARY.md`).  
> Adapte librement l'ensemble des textes, visuels et thématiques selon les besoins du nouveau projet.  
> Règle d'or absolue : ZÉRO page monolithique. Découpe chaque section dans des composants autonomes sous `components/` et assemble-les dans `app/page.tsx`.  
> Utilise les variables CSS extraites dans `tokens/tokens.css`, réutilise les modules d'animation de `custom_code/`, et intègre Lenis Smooth Scroll pour obtenir le même rendu haute fidélité."*
