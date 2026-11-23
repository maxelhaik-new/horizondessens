# Plan du site — Horizon des Sens (v1, à valider)

> Version du 23/11/2026. Elle s'appuie sur PRODUCT.md et sur CONTEXTE.md (§13 et §14).
> ❓ = point à confirmer. Les contenus de chaque page seront rédigés page par page après validation de ce plan. On commence par l'accueil : voir [accueil-v1.md](accueil-v1.md).

## 1. Arborescence

| # | Page | URL | Rôle | Expression-clé SEO principale | Dans le menu |
|---|---|---|---|---|---|
| 1 | **Accueil** | `/` | Présenter l'offre complète, orienter vers le Kobido, le 5 Continents et la réservation | « Kobido et massage bien-être Saint-Cyr-sur-Loire / Tours » | Logo |
| 2 | **Kobido** | `/kobido` | Page de référence pour le public averti : ce qu'est le soin, son déroulé, ses formules, une FAQ, la réservation | « Kobido Tours », « Kobido Saint-Cyr-sur-Loire » | Oui |
| 3 | **Le salon** | `/le-salon` | Le lieu (la salle sur la Loire), Élodie, son parcours, le déroulé d'une séance, l'accès | « salon de massage Saint-Cyr-sur-Loire » | Oui |
| 4 | **Carte cadeau** | `/carte-cadeau` | Choisir un soin, payer avec Stripe, recevoir le PDF | « carte cadeau massage Tours » | Oui |
| 4a | Confirmation d'achat | `/carte-cadeau/merci` | Remerciement, récapitulatif, « le PDF arrive par e-mail » | — (noindex) | Non |
| 4b | Paiement annulé | `/carte-cadeau/annule` | Retour sans achat, CTA pour réessayer | — (noindex) | Non |
| 5 | **Réserver** | `/reserver` | Les cartes prestations (données SimplyBook) et le widget SimplyBook pré-rempli | « réserver massage Tours » | Bouton CTA dans le header |
| 6 | **Contact** | `/contact` | Coordonnées, horaires, plan Google Maps, formulaire, avis Google | « massage Saint-Cyr-sur-Loire contact » | Oui |
| 7 | Mentions légales | `/mentions-legales` | Obligation légale (voir §3) | — | Pied de page |
| 8 | Conditions générales de vente | `/cgv` | Obligation légale pour la vente en ligne de cartes cadeaux, avec les conditions de réservation et d'annulation | — | Pied de page |
| 9 | Politique de confidentialité | `/confidentialite` | RGPD (formulaire, SimplyBook, Stripe, Google Maps) et cookies | — | Pied de page |
| 10 | Page 404 | (automatique) | Retour vers l'accueil, les soins et la réservation | — (noindex) | Non |
| 11 | Admin (mini-CMS) | `/admin` | Édition des textes et des images par Élodie, protégée par une authentification. Elle arrive après la v1. | — (noindex, exclue du sitemap) | Non |

**Pas de pages par soin en v1**, hors Kobido : les soins sont présentés sur l'accueil (ancre `#soins`) et sur `/reserver`.
Piste SEO pour plus tard : une page dédiée `/massage-5-continents` si le soin devient un levier d'acquisition, éventuellement avec des ads.

## 2. Navigation

- **Header** : logo (vers `/`), puis Soins (`/#soins`), Kobido, Le salon, Carte cadeau, Contact, et le **bouton « Réserver »** toujours visible.
- **Mobile** : menu plein écran et un bouton « Réserver » fixe, bien accessible au pouce.
- **Footer** :
  - Horizon des Sens, l'adresse, le téléphone et l'e-mail ;
  - les horaires ❓ ;
  - Instagram et Facebook ;
  - les liens Mentions légales, CGV et Confidentialité ;
  - une mention courte : « Le massage bien-être n'est pas un acte médical. »
- Les menus, les liens, les metas et le footer légal sont **fixés dans le code, sans édition par Élodie**.

## 3. Pages obligatoires : ce qu'elles doivent contenir (droit français)

| Page | Contenu obligatoire | Infos manquantes |
|---|---|---|
| **Mentions légales** (LCEN) | Nom et prénom de l'éditrice, statut (EI ?), **SIRET**, adresse, téléphone, e-mail, directrice de la publication, **hébergeur** (Vercel Inc., avec son adresse), et, s'il y en a, le crédit des photos (Maxime, Unsplash). | SIRET, statut juridique ❓ |
| **CGV** | Identité du vendeur, prestations et prix TTC (avec la mention « TVA non applicable, art. 293 B du CGI » si micro-entreprise ❓), modalités de commande et de paiement (Stripe), **livraison de la carte cadeau en PDF par e-mail**, **validité de 6 mois**, conditions d'utilisation (réservation, non remboursable, cessible ? ❓), **droit de rétractation** (14 jours pour une carte cadeau achetée en ligne ❓ à confirmer), **conditions d'annulation et de report des rendez-vous** ❓, nature non médicale et non sexuelle du massage, **médiateur de la consommation** (obligatoire pour la vente aux particuliers ❓ : lequel ?), droit applicable. | Médiateur, politique d'annulation, régime de TVA, cessibilité de la carte |
| **Politique de confidentialité** (RGPD) | Responsable du traitement, données collectées (formulaire de contact, achat de carte cadeau, réservation via SimplyBook), finalités, durées de conservation, sous-traitants (Stripe, SimplyBook, Vercel, Supabase, Google), droits des personnes et contact, cookies. | — |
| **Cookies** | On vise **aucun cookie non essentiel**. Pas d'analytics à cookies, ou une mesure d'audience sans cookie (Vercel Analytics). Google Maps et SimplyBook déposent des cookies tiers : **on les charge au clic** (« Afficher la carte ») ou après consentement, avec un bandeau minimal. | Choix de la mesure d'audience ❓ |
| Accessibilité | La déclaration n'est pas obligatoire pour une micro-entreprise. On vise néanmoins le niveau WCAG 2.2 AA par principe. | — |

> Les CGV et les mentions légales seront rédigées sur la base de ces éléments. Elles devront être **relues par Élodie**, idéalement avec un conseiller. Je ne remplace pas un avis juridique.

## 4. Technique (rappel, non éditable)

- `sitemap.xml` et `robots.txt` générés automatiquement ; les pages noindex en sont exclues.
- Données structurées : `HealthAndBeautyBusiness` (adresse, téléphone, horaires, géolocalisation) et `Service` pour chaque soin.
- Redirections 301 depuis les anciennes URL :
  - `/index` vers `/` ;
  - `/massage` et `/massage-details?id=*` vers `/#soins`, ou `/kobido` pour le Kobido ;
  - `/carte_cadeau` vers `/carte-cadeau` ;
  - `/fidelite` vers `/#abonnement` ;
  - `/about-us` vers `/le-salon` ;
  - `/contact-us` vers `/contact` ;
  - `/rdv` vers `/reserver`.

## 5. Contenu éditable par Élodie (règle)

On donne une **clé de contenu** uniquement au **contenu principal** : titres de section, accroches, paragraphes, listes de bénéfices, textes des sections et images de contenu.
**Ne sont pas éditables** :
- les metas (title, description) ;
- les menus et les liens, y compris les URL des boutons ;
- les libellés d'interface génériques ;
- les mentions légales ;
- **les noms, durées et prix des soins**, qui viennent de SimplyBook.

Chaque clé a un type (`text` = une ligne, `textarea` = un paragraphe, `list` = une liste de lignes courtes, `image` = une image avec son ratio imposé) et un `maxLength`.
