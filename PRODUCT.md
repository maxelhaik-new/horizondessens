# Product

<!-- impeccable:product-schema 1 -->

> Site vitrine et de réservation de **Horizon des Sens**, la marque d'Élodie Poirier, praticienne en massage bien-être.
> Les sources détaillées sont dans `docs/CONTEXTE.md` : §13 Décisions et §14 Concurrence. Ce fichier ne garde que la vérité produit durable.

## Platform

web

## Stack

Choix confirmé par Maxime (designer et développeur) :
- **Next.js** (React), **Tailwind CSS** et **Framer Motion**, hébergé sur **Vercel**.
- Pages statiques revalidées à la publication, pour le SEO.
- **Supabase** (Postgres, Storage, Auth) pour le mini-CMS. Projet : `vlpevjffaqzvksjfknhk`.
- **Stripe** (Checkout et fonctions serverless) pour les cartes cadeaux.
- **SimplyBook.me** (`horizondessens.simplybook.it`) pour la réservation.
- Le domaine `horizondessens.fr` est chez OVH, avec une bascule par les DNS.

## Users

1. **Les personnes qui cherchent du Kobido.** C'est un public averti, qui connaît déjà ce soin japonais du visage et le cherche près de Tours ou de Saint-Cyr-sur-Loire. Leur besoin : constater vite qu'elles sont au bon endroit, puis réserver.
2. **Les personnes qui cherchent une expérience de bien-être**, sans savoir précisément quoi : détente, lâcher-prise, soulager des tensions, du stress ou les jambes lourdes. Leur besoin : comprendre en un titre et un sous-titre ce que chaque soin procure, puis choisir et réserver. Beaucoup arrivent fatiguées et pensent d'abord « dos, épaules » plutôt que « visage ».
3. **Les clientes et abonnées existantes.** Ce sont la clientèle d'Élodie depuis environ 8 ans et des abonnées reprises depuis environ un an. Leur besoin : retrouver Élodie à sa nouvelle adresse, réserver, renouveler leur abonnement.
4. **Les personnes qui offrent un soin.** Elles achètent une carte cadeau en ligne et la reçoivent tout de suite.
5. **Élodie elle-même**, dans un rôle d'éditrice. Elle modifie seule les textes et les images du site après la livraison.

Composition de la clientèle (réservée aux femmes ou mixte) : **décision ouverte**, à vérifier avec Élodie.

## Product Purpose

Accompagner le **déménagement** d'Élodie au 9 Quai des Maisons Blanches, 37540 Saint-Cyr-sur-Loire, et sa **montée en gamme** : tarifs alignés sur le marché local, carte resserrée, **positionnement Kobido**.

Le site doit :
- faire comprendre à celles qui cherchent du Kobido que c'est le bon endroit ;
- montrer à celles qui cherchent une expérience les choix possibles, dont le Kobido ;
- convertir en réservation, avec SimplyBook intégré ;
- vendre des cartes cadeaux en ligne ;
- présenter l'abonnement.

**Succès** : un **équilibre** entre les réservations directes (en priorité Kobido, puis 5 Continents) et l'acquisition de nouvelles clientes (cartes cadeaux, découverte), qui deviennent ensuite des abonnées.

Le site ne cherche **pas** à convaincre seul une personne qui ne connaît pas le Kobido. Cette conversion se fait en cabinet. Le site informe et rassure.

## Positioning

- **Massage des 5 Continents** : Élodie est praticienne M5C sous **licence professionnelle** (Fédération du massage des 5 continents), avec des huiles essentielles préparées par un laboratoire spécifique. C'est un soin rare localement et absent chez le concurrent installé dans le même cabinet. **C'est le différenciant n°1.**
- **Reiki Usui** (1er et 2e degré depuis 2017), intégré à « Calme et harmonie ». C'est une dimension énergétique que les offres voisines n'intègrent pas ainsi.
- **Jambes légères avec réflexologie plantaire** : Élodie est formée à la réflexologie plantaire.
- **8 ans de pratique**, après un **passé de soignante** (elle a quitté l'hôpital fin 2017). Elle a une écoute fine et adapte chaque soin à la personne.
- **Différenciation par l'expérience et les soins, jamais par le prix.** Les tarifs sont volontairement alignés sur le marché local.

## Operating Context

- **Le lieu** : un cabinet partagé à Saint-Cyr-sur-Loire, aux portes de Tours. La salle donne sur la Loire.
- **Le concurrent Sensoa** (https://www.sensoa-massage.fr/) exerce dans **le même cabinet**. Il vise la même clientèle et les mêmes requêtes (« Kobido Tours ») et propose aussi du Kobido et du massage sur mesure. On ne reprend aucun de ses textes. Sur le site d'Horizon des Sens, on ne mentionne pour l'instant ni le cabinet partagé ni les autres praticiennes (un partenariat est possible plus tard).
- **Le déroulé d'une séance** : 10 à 15 minutes d'échange avant le soin, 1h15 sur la table pour les soins corps, environ 10 minutes après. Élodie reçoit au maximum 4 clientes par jour.
- **La réservation** se fait dans SimplyBook.me, déjà utilisé depuis environ 3 ans. **SimplyBook est la source de vérité** des prestations réservables : nom, durée et prix.
- **Communication** : Élodie et Maxime échangent par WhatsApp. Élodie conçoit ses cartes cadeaux dans Canva.

## Capabilities and Constraints

**Pages**
- Une **page d'accueil longue** qui présente toutes les prestations, dont une section 5 Continents.
- Des pages dédiées : **Kobido**, **Le salon**, **Carte cadeau**, **Réserver** (avec SimplyBook intégré), **Contact**, et des mentions légales.

**Offre 2026** (base de travail, susceptible d'évoluer)

| Prestation | Durée et tarif | Contenu |
|---|---|---|
| Kobido | 1h : 100 €, 1h15 : 120 € | Soin du visage japonais |
| Calme et harmonie | 1h15 : 120 € | Dos, visage et crânien, avec du Reiki |
| 5 Continents | 1h15 : 120 € | Massage sous licence M5C |
| Jambes légères | 1h15 : 120 € | Inclut la réflexologie plantaire, à mentionner |
| Massage sur mesure | — | Conservé, avec un nom premium à trouver. Il n'est pas mis en avant, pour ne pas prendre le pas sur le Kobido et le 5 Continents. |

L'**abonnement** donne 6 séances par an, avec 10 € de remise par séance. Il est présenté sans préciser comment on y souscrit (décision ouverte).

**Règle de présentation des soins** : chaque soin a un **nom**, puis un **sous-titre** qui dit ce qu'il fait et ce qu'il procure, puis un descriptif (bienfaits, durée). Pas de noms sur-marketés.

**SimplyBook, en mode hybride**
- Les cartes de prestations sont générées depuis l'API SimplyBook, côté serveur et avec un cache. La clé API n'est jamais exposée au navigateur.
- Le widget iframe prend les couleurs du site grâce au réglage gratuit `theme_settings`. On n'utilise pas le CSS personnalisé, qui est payant.
- Le widget s'ouvre directement sur la prestation choisie.
- Si l'API n'est pas disponible avec l'abonnement SimplyBook d'Élodie, on garde seulement le widget aux couleurs du site.

**Cartes cadeaux**
- Paiement **Stripe** sur le site.
- Un PDF est généré et envoyé automatiquement à l'acheteur, et Élodie est notifiée.
- La carte est valable **6 mois**.

**Mini-CMS**
- Élodie modifie les contenus **directement sur une page identique au site** (`/admin`).
- Seuls les **textes et les images** sont modifiables, avec une **limite de caractères par champ**.
- Les contenus sont stockés dans Supabase, jamais dans des fichiers ni dans Git.
- Les prix et les durées ne s'éditent pas dans le CMS : ils viennent de SimplyBook.

**Contact et confiance** : formulaire de contact, plan Google Maps, avis Google. **Pas de newsletter.**

**SEO** : une ou deux expressions-clés par page, par exemple « Kobido Saint-Cyr-sur-Loire », « Kobido Tours », « massage Tours », « massage des 5 continents », « réflexologie plantaire Tours ». On ajoute des données structurées de type LocalBusiness.

**Mentions obligatoires**
- Le massage bien-être n'est pas un acte médical. En cas de doute sur sa santé, il faut demander l'avis d'un médecin.
- Les soins n'ont aucune connotation sexuelle.

**Décisions ouvertes**
- Clientèle réservée aux femmes ou mixte.
- Sort des anciennes prestations : Reiki seul, Relaxant, Vitalité, pierres chaudes, réflexologie seule, seniors.
- Nom du massage sur mesure.
- Mode de souscription de l'abonnement.
- Abonnement SimplyBook d'Élodie et disponibilité de l'API.
- SIRET et statut juridique, pour les mentions légales.
- Règles d'usage du badge M5C.

## Brand Commitments

- **Nom** : « Horizon des Sens », avec un S majuscule. Praticienne : **Élodie Poirier**.
- **Coordonnées** : e.nguyen@horizondessens.fr et 06 76 95 90 03.
- **Voix** : **vouvoiement**. Le ton est chaleureux, doux et à l'écoute, sans jargon et sans formules génériques ou trop « IA ». Élodie doit se reconnaître dans les textes, qui sont relus et ajustés avec elle.
- **Logo** : on garde le symbole existant (mandala et lotus, deux mains, une sphère lumineuse, des feuillages). Une version vectorisée et simplifiée sert en attendant la version définitive de Maxime. Le logo n'est pas redessiné.
- **Contraintes d'identité fixées au cadrage** :
  - abandonner le bleu canard de l'ancien site, jugé trop médical ;
  - ne pas se différencier par une identité agressive ;
  - **rester clairement distincte de Sensoa**, qui vise la même clientèle à la même adresse ;
  - montrer de vraies photos plutôt que des illustrations.
- **Retirés** : la citation « Si tu écoutes ton corps… » et le crédit « sagesse tibétaine ».

## Evidence on Hand

- **Carte des prestations 2026** (visuel IA fait par Élodie : contenus et tarifs, pas la mise en page) : `Images Elodie/Carte massages 2026.png`.
- **Logo actuel**, en raster 750 px sur fond plein : `Images Elodie/Logo Old.png`.
- **Badge de licence M5C** (millésime 2027, à renouveler chaque année) : `Images Elodie/Image licence.png`.
- **Portrait d'Élodie** (selfie, usage provisoire, un shooting est à prévoir) : `Images Elodie/Photo Elodie.png`.
- **Ancienne carte cadeau** : `Images Elodie/Carte cadeau old.png`.
- **Textes de l'ancien site** (parcours d'Élodie, descriptifs) : `docs/site-actuel.md`.
- **Photos du salon et de la vue sur la Loire**, réutilisables puisque Maxime en est l'auteur : à choisir dans `references/sensoa/images/`. **Sont exclues** les images où l'on voit une masseuse ou une personne massée.
- **Ce qui n'existe pas encore**, et qu'il ne faut pas inventer :
  - avis ou témoignages clients, avant leur intégration depuis Google ;
  - photos professionnelles d'Élodie au travail ;
  - chiffres de fréquentation ;
  - labels autres que la licence M5C.

## Product Principles

1. **Peu de choix, chacun pleinement mis en valeur.** Une carte courte, lisible en un coup d'œil (nom, sous-titre, durée, prix), plutôt qu'un catalogue.
2. **L'expérience et l'expertise, jamais le prix.** Les différenciants sont le 5 Continents, le Reiki, la réflexologie, l'écoute et le soin sur mesure.
3. **Une seule source de vérité pour chaque donnée.** SimplyBook gère ce qui se réserve, le CMS gère l'éditorial. Rien n'est saisi deux fois.
4. **Le vrai plutôt que le générique.** De vraies photos et des textes qui sonnent comme Élodie, sans promesse ni preuve inventée.
5. **Autonomie de la praticienne.** Élodie fait vivre son site seule, sans pouvoir en casser la structure.
