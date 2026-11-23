# Options techniques à arbitrer — SimplyBook & CMS

> Version du 23/11/2026, faisant suite aux précisions de Maxime. Ce document sert à décider. Une fois les choix faits, ils seront reportés dans CONTEXTE.md §13.

---

## A. SimplyBook : aligner l'apparence sans le CSS payant, et ne plus dupliquer les prestations

### Constats
- **Le widget gratuit propose déjà un thème configurable.** L'ancien site l'utilise sur `/rdv` : `theme: "dainty"` et un objet `theme_settings`. Couleurs modifiables :
  - `sb_base_color`, `secondary_color`, `sb_text_color` ;
  - `body_bg_color`, `dark_font_color`, `light_font_color` ;
  - `sb_company_label_color`, `sb_cancellation_color`.

  Autres réglages :
  - `display_item_mode` (`block`/`list`), `hide_img_mode`, `sb_background_image` ;
  - `timeline` (`modern`…) et `datepicker` (`top_calendar`…) ;
  - `app_config.predefined`.

  → On peut **aligner les couleurs** sur la DA gratuitement. En revanche, le widget est une **iframe d'un autre domaine** : on ne contrôle ni la typo, ni les marges, ni la mise en page. Le rendu restera « SimplyBook ».
- **Le CSS personnalisé** est une *Custom Feature* payante ([doc](https://help.simplybook.me/index.php/Custom_CSS_custom_feature)). Exclu à la demande de Maxime.
- **L'API SimplyBook** (JSON-RPC, [doc développeur](https://simplybook.me/de/api/developer-api)) est aussi une *Custom Feature*, nommée « API ». Elle s'active avec une clé et un `getToken`. `getEventList` renvoie les prestations : nom, description, durée, prix, image ; `getUnitList` renvoie les praticiens.
  - Le plan gratuit n'autorise qu'**une** custom feature premium ([Custom Features](https://help.simplybook.me/index.php/Custom_Features)).
  - ❓ Il faut vérifier si « API » est gratuite ou premium, et **quel plan SimplyBook Élodie possède**. On le saura avec ses accès.

### Options

| | Option 1 — Widget thémé seul | **Option 2 — Hybride : API en lecture + widget pré-rempli** ⭐ | Option 3 — Tunnel de réservation 100 % sur mesure via l'API |
|---|---|---|---|
| Principe | On garde l'iframe, en réglant les couleurs dans `theme_settings`. | Les **cartes prestations du site sont générées depuis SimplyBook** (API `getEventList`, appelée côté serveur et mise en cache). Le bouton « Réserver » ouvre le widget **directement sur la bonne prestation** (`predefined: { service: id }` ❓ à confirmer). Le widget est thémé aux couleurs du site. | Toute la réservation (choix, créneau, formulaire, confirmation) est reconstruite en React, avec l'API en lecture et en écriture. |
| Apparence | Couleurs alignées, le reste est SimplyBook. | Le **catalogue** est 100 % aux couleurs du site. Seule l'étape créneau et paiement reste SimplyBook (thémé). | 100 % aux couleurs du site. |
| Duplication des prestations | Elle reste, sauf si l'on renonce à présenter les prestations sur le site. | **Supprimée** pour les données de réservation : nom, durée, prix. | Supprimée. |
| Effort de dev | Très faible. C'est ce qui a été vendu. | Modéré : une fonction serverless, un cache, un mapping. | Élevé : il faut gérer créneaux, erreurs, annulations, rappels, et maintenir le tout à chaque évolution de l'API. |
| Risques | Aucun. | Il dépend de la custom feature API ❓. Si l'API est indisponible, on retombe sur l'option 1 avec des données en cache. | Fragile et coûteux, hors du périmètre vendu. |

**Recommandation : l'option 2.** Elle règle le vrai problème (la double saisie) pour un effort raisonnable, et elle reste proche de « l'intégration SimplyBook » vendue.

Point d'articulation avec le CMS :
- **SimplyBook** est la source de vérité des **données de réservation** : nom court, durée, prix, disponibilité.
- **Le CMS** porte le **contenu éditorial** : sous-titre, accroche, texte long, photos, page Kobido. Il est relié à chaque prestation par son **ID SimplyBook**.
- Élodie change donc un prix **une seule fois**, dans SimplyBook.

Point de vigilance : la clé API ne doit **jamais** être exposée côté client. Les appels passent par une fonction serverless Vercel.

---

## B. CMS minimaliste avec édition directe sur la page

### Besoin exprimé
- Une édition **directement sur une page qui ressemble au site** : la cliente voit son site et clique sur un texte pour le modifier.
- Seuls les **textes et les images** sont modifiables, sans toucher à la structure ni à la mise en page.
- Une **limite de caractères pour chaque champ**.
- Le contenu est **stocké proprement, à distance**, et non dans des fichiers du dépôt. TinaCMS est donc exclu : il stocke dans Git.

### Impact sur la stack : React → Next.js (recommandé)
Si le contenu est chargé depuis une base au moment de l'affichage, un site React classique (Vite) affiche un HTML vide aux moteurs de recherche, ce qui est mauvais pour le SEO. C'est un enjeu fort ici (Kobido Tours, etc.).
**Next.js** reste du React, avec Tailwind et Framer Motion. Il génère des pages statiques, revalidées à la demande quand Élodie publie. On obtient du SEO optimal et un site rapide, et c'est natif sur Vercel.

### Options

| | **Option 1 — Mini-CMS sur mesure intégré au site** ⭐ | Option 2 — Sanity + Visual Editing / Presentation | Option 3 — Storyblok Visual Editor |
|---|---|---|---|
| Expérience d'édition | **Exactement le besoin.** Élodie se connecte sur `/admin`, voit le vrai site et clique sur un texte pour l'éditer en place, avec un compteur de caractères. Elle clique sur une image pour la remplacer (recadrage imposé), puis clique sur « Publier ». | Le site s'affiche dans un aperçu. Un clic sur un élément ouvre le champ correspondant dans un **panneau latéral**. C'est proche, mais l'édition ne se fait pas en place, et l'interface Sanity Studio est plus technique. | Même principe que Sanity, avec un aperçu et un panneau latéral. L'interface est plutôt orientée marketing. |
| Limites de caractères | Définies dans le code, champ par champ (`maxLength`), avec un compteur visible. | Validation `Rule.max(n)` par champ. | Option « max length » par champ. |
| Stockage | Supabase (Postgres, Storage pour les images, Auth). On peut aussi utiliser une base Vercel (Neon, Blob). Hébergé et sauvegardé. | Content Lake Sanity (hébergé). | Storyblok (hébergé). |
| Verrouillage de la structure | Total : seuls les champs déclarés sont éditables. | Bon, si le schéma est strict. | Bon, si les blocs sont figés ; la restriction des rôles peut être une option payante ❓. |
| Coût | Offres gratuites suffisantes pour ce volume (à vérifier au moment du choix). | Offre gratuite généreuse (à vérifier). | Offre gratuite limitée en utilisateurs et en rôles ❓. |
| Effort de dev | Moyen : auth, mode édition, upload et redimensionnement des images, brouillon / publication, revalidation. **Réutilisable** pour Sensoa et d'autres clients. | Moyen : schémas, intégration Visual Editing, déploiement du Studio. | Moyen : composants Storyblok et configuration du Visual Editor. |
| Dépendance | Aucune vis-à-vis d'un éditeur SaaS de CMS, mais on maintient soi-même le code. | Sanity. | Storyblok. |

**Recommandation : l'option 1**, un mini-CMS maison sur Next.js, Supabase et Vercel. C'est la seule qui offre vraiment l'**édition en place** demandée. Le périmètre est volontairement réduit (textes et images, champs déclarés), ce qui rend le développement maîtrisable. Si l'effort pose problème, l'option 2 (Sanity) est la meilleure solution clé en main.

Principes de conception (si l'option 1 est retenue) :
- Un **registre de champs** dans le code. Chaque champ a une clé (ex. `home.hero.title`), un type (texte court, texte long, image), un `maxLength`, un ratio d'image et une valeur par défaut.
- Les composants `<EditableText field="…">` et `<EditableImage field="…">` se rendent normalement pour les visiteurs et deviennent éditables en mode admin.
- Un **brouillon** est enregistré automatiquement, puis Élodie **publie**. La publication déclenche la revalidation des pages (`revalidatePath`). On garde un historique simple, pour pouvoir annuler.
- Le texte est brut, avec seulement des retours à la ligne. Il n'y a pas de mise en forme libre, ce qui protège la DA.
- Les données de prestation (prix, durées) ne sont **pas éditables dans le CMS** : elles viennent de SimplyBook (voir A).

---

## ✅ Décisions (validées par Maxime le 23/11/2026)
1. **SimplyBook : option 2, l'hybride.**
   - Les cartes prestations sont générées depuis l'API `getEventList`, côté serveur et mises en cache.
   - Le widget est thémé avec `theme_settings` et pré-rempli sur la prestation.
   - Repli : l'option 1 (widget thémé seul) si l'API n'est pas disponible sur le plan d'Élodie.
2. **CMS : option 1, un mini-CMS maison** : édition en place sur `/admin`, textes et images uniquement, `maxLength` par champ, stockage Supabase.
3. **Stack : Next.js** (React) + Tailwind + Framer Motion, sur Vercel.
4. Reste à faire : récupérer le plan SimplyBook d'Élodie et vérifier la disponibilité de la custom feature API.
