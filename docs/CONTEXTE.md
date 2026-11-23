# Horizon des sens — Document de contexte (refonte du site)

> **Statut** : v0.3, 23/11/2026. Étape 1, avant `/impeccable init`.
> - La v0.2 a intégré les visuels d'Élodie (§5 et §12bis).
> - La v0.3 intègre les **réponses de Maxime au questionnaire (§13 Décisions, qui priment sur les ❓ antérieurs)**.
> - La v0.4 ajoute les arbitrages techniques validés et l'**analyse du concurrent Sensoa (§14)**.
> **Sources** :
> - [site-actuel.md](site-actuel.md) : scraping intégral de horizondessens.fr, fait le 23/11/2026.
> - [transcription-rdv-cadrage-2026-11-13.md](transcription-rdv-cadrage-2026-11-13.md) : RDV de cadrage du 13/11/2026 entre Maxime et Élodie. Transcription automatique, donc certains noms peuvent être déformés.
>
> Les points marqués ❓ sont à confirmer (voir §12).

---

## 1. Le projet en une phrase

On refond le site vitrine de **Horizon des sens**, la marque d'Élodie Poirier, masseuse bien-être. La refonte accompagne son **déménagement** au **9 Quai des Maisons Blanches, 37540 Saint-Cyr-sur-Loire**, et un **repositionnement autour du Kobido**. On garde une carte courte de massages corps « expérience », dont le Massage des 5 continents.

Stack prévue : **React + Tailwind CSS + Framer Motion**.

## 2. Acteurs

| Qui | Rôle |
|---|---|
| **Élodie Poirier** | Cliente. Praticienne en massage bien-être depuis environ 8 ans. Ancienne soignante : elle a quitté l'hôpital fin 2017. Initiée au Reiki Usui (1er et 2e degré) en 2017. Formée à la réflexologie plantaire. Pratique le **Kobido depuis septembre 2025**. Elle se dit perfectionniste. Elle a déjà des douleurs physiques et veut se préserver. |
| **Maxime** | Designer et développeur du site, interlocuteur d'Élodie. Il a déjà fait le site et l'identité du cabinet de sa mère, qui sert de référence tout au long du RDV. |
| **La mère de Maxime / cabinet « Sensoa »** ❓ *(orthographe à confirmer : la transcription donne « Sensoa / SensoA / Tensua »)* | Cabinet de massage où Élodie s'installe. Élodie **rachète une partie de sa clientèle** et de ses « abonnés ». La mère s'est repositionnée sur le Kobido. Elle a arrêté les massages corps complets trop physiques, dont le suédois. |
| **Agnès** | Autre praticienne du même cabinet. Elle fait du Kobido et du massage corps, détails inconnus. Ce sera une **voisine et non une concurrente** : il faut des prestations différenciantes. |

**Cabinet partagé** : on parle de « trois praticiennes dans ma salle » ❓. La clientèle visée est la même pour tous, et l'image doit rester harmonisée avec Sensoa.

## 3. Contexte et enjeux du déménagement

- **Avant** : un cabinet de 14 m² à Saint-Pierre-des-Corps, 43 bis av. de la République. Peu de concurrence, bon emplacement, mais **des tarifs trop bas**.
- **Après** : Saint-Cyr-sur-Loire, dans le cabinet Sensoa. Les prestations seront **plus chères**, alignées sur Sensoa. Élodie ressent de la pression : elle veut « être à la hauteur » et doit **se démarquer** dans un marché saturé autour de Tours (« comme les coiffeurs »).
- **Charge émotionnelle** : elle vit la refonte comme un renouveau, une nouvelle page après 8 ans. Elle est prête à lâcher des éléments historiques (phrases, accroches). Maxime prévient qu'il proposera de supprimer certaines choses. Elle lui fait confiance.
- **Clientèle existante** :
  - Elle a une bonne base d'abonnés, récupérés de la mère depuis environ un an.
  - Certains abonnés pourraient aller voir Agnès.
  - Objectif : **continuer à recruter des abonnés**, mettre l'accent sur les **cartes cadeaux** et sur des **offres découverte**.
- **Disponibilité** : elle évoque « j'ai que 15 jours sur un mois » ❓ et un maximum de **4 clients par jour**.
- **Fin de l'ancien cabinet** : elle y travaillait encore la semaine du 23/11 (journée complète le 25/11).

## 4. Positionnement et stratégie

### Deux audiences à capter
1. **Les gens qui cherchent « Kobido »** : un public averti, qui connaît déjà ce soin. C'est une audience **différente** de celle du massage corps. Le site doit leur dire très vite : *c'est le bon endroit*.
2. **Les gens qui cherchent une expérience** (détente, harmonie, lâcher prise) sans savoir précisément quoi. Le site doit leur montrer qu'il existe plusieurs choix, **dont le Kobido**.

**Le site ne convertira pas au Kobido à lui seul.** La conversion se fait en cabinet : Élodie glisse une petite partie de Kobido dans un massage dos et crânien, puis propose une séance complète. Le site fait de la **pédagogie** (soin japonais ancestral, plus qu'esthétique) sans chercher à convaincre à 100 %.

### Différenciation
- **Ne jamais se différencier par le prix.** Ce serait concurrentiel avec Sensoa, cela brouillerait le message et attirerait une autre clientèle (l'expérience Groupon chez la mère).
- **Pas d'identité de rupture.** Ni bleu, ni ton agressif, ni univers radicalement différent de Sensoa : c'est la même audience.
- On se différencie par **1 ou 2 prestations phares** :
  - **Kobido** : la cible principale et la priorité de volume.
  - **Massage des 5 continents** : le grand différenciant. Rare, adoré des clients. C'est un **massage sous licence** avec des **huiles essentielles préparées par un labo spécifique** et un soin énergétique. Il faut le présenter comme « reconnu / agréé » (sans parler de licence payée). Le nom est à garder. Il mérite peut-être une section dédiée, voire des ads plus tard.
- On mise sur la marque « **Horizon des sens** », avec l'univers **sensation et expérience**.

### Priorités d'activité (côté Élodie)
1. Faire le maximum de prestations en **Kobido**.
2. Ensuite le **Massage des 5 continents**.
3. Les massages corps ne doivent **pas prendre le dessus**. C'est une question d'énergie et de santé physique.

## 5. Offre de prestations

### Offre actuelle (ancien site)
9 prestations, plus un Kobido cité sans fiche ni tarif. Voir [site-actuel.md](site-actuel.md) :

| Prestation | Durées et tarifs actuels |
|---|---|
| Reiki Usui | sur devis |
| À chacun son massage (sur mesure) | 45 min 50 € / 60 min 70 € / 80 min 90 € |
| Le Relaxant (californien) | 60 min 70 € / 80 min 90 € |
| Le Sérénité (crânien, visage, dos) | 45 min 55 € / 60 min 70 € |
| Le Vitalité (dynamique, sportif) | 60 min 70 € / 80 min 90 € |
| L'énergisant (pierres chaudes, en automne-hiver) | 60 min 75 € / 80 min 85 € |
| Massage des 5 continents | 90 min 95 € (une autre page indique 80 min) |
| Réflexologie plantaire bien-être | 45 min 50 € / 60 min 60 € |
| Massage seniors (en EHPAD) | sur devis |

À cela s'ajoutent un programme fidélité (forfaits de 3 ou 6 massages, découverte -10 %) et une carte cadeau valable 6 mois, en simple PNG téléchargeable.

### Offre future — base de travail : « Carte massages 2026 »
On veut une **carte courte** : le Kobido et 3 autres prestations. Les massages corps durent **1h15 sur la table**.

La source est le visuel [`Images Elodie/Carte massages 2026.png`](../Images%20Elodie/Carte%20massages%202026.png), généré par IA par Élodie. C'est **une bonne base, susceptible de changer**. Les textes ci-dessous sont recopiés de la carte :

| Prestation | Durée / tarif | Texte de la carte | Compléments issus du RDV |
|---|---|---|---|
| **Kobido** | 1h : **100 €** / 1h15 : **120 €** | « Massage facial japonais qui allie détente profonde, lissage des traits et stimulation des points énergétiques. Il révèle l'éclat du visage et libère les tensions. » | Priorité n°1, tarif aligné sur Sensoa. Pédagogie à prévoir : soin ancestral, plus qu'esthétique. Pratiqué depuis septembre 2025. |
| **Calme et harmonie** | 1h15 : **120 €** | « Un voyage entre dos, visage et crânien, associé au Reiki. Il apaise le mental, relâche les tensions et rééquilibre vos énergies. » | Création d'Élodie, sur la base du Sérénité. Le « rééquilibrage » évoqué au RDV = **Reiki** (confirmé par la carte). Le nom répond à un besoin. Classique, peu différenciant. |
| **5 Continents** | 1h15 : **120 €** | « Un massage organique et sensoriel, inspiré des 5 continents, avec des huiles essentielles. Il stimule la circulation énergétique, détoxifie et favorise un profond lâcher-prise. » | **Le différenciant.** Massage **sous licence officielle** (praticienne M5C, voir §12bis). Huiles d'un labo spécifique, deux temps (détox, puis lâcher-prise). ⚠️ Il passe de 90 min / 95 € à **1h15 / 120 €**. |
| **Jambes légères** | 1h15 : **120 €** | « Un soin enveloppant et tonifiant pour soulager les jambes lourdes, favoriser la circulation et retrouver une sensation de légèreté. » | Au RDV : massage jambes **+ réflexologie plantaire** ❓. La carte ne mentionne pas la réflexo, alors que c'est un terme recherché et crédibilisant. |
| **Abonnement** | **6 séances à l'année, -10 € par séance** | Bandeau sur la carte | C'est le format des « abonnés ». Il remplace le programme fidélité 3/6 séances. Il s'applique à toutes les prestations ❓. |

Points notables :
- **En-tête de la carte** : « Horizon des Sens », « MASSAGES BIEN-ÊTRE • KOBIDO • REIKI », « Elodie Poirier ». Le Reiki reste revendiqué dans la signature, alors qu'il n'a plus de prestation seule ❓.
- **Citation conservée** en pied de carte : « Si tu écoutes ton corps lorsqu'il **murmure**, tu n'auras plus à l'entendre crier. » (l'ancien site dit « chuchote »). Maxime avait prévenu que les phrases historiques pourraient sauter ❓.
- **Absent de la carte : le massage sur mesure.** Elle a dit au RDV ne pas l'avoir mis. Pourtant, c'est ce que vient chercher **la majorité de sa clientèle actuelle**, mais il l'épuise. Il ne faut pas le supprimer, mais il **ne doit pas cannibaliser** les autres. Le nom « sur mesure » fait trop « presta » : il faudra lui donner un nom premium. Il peut servir de porte d'entrée vers le Kobido ❓.
- **Grille tarifaire uniforme à 120 € / 1h15** (Kobido 1h à 100 €). Les prix ont fortement augmenté par rapport à l'ancien site (70-95 €), ce qui est cohérent avec la montée en gamme.

Prestations **abandonnées** : elles ne figurent ni au RDV ni sur la carte (à confirmer ❓) : Reiki seul, Relaxant, Vitalité, pierres chaudes, réflexologie seule, massage seniors, À chacun son massage.

### Règle de présentation des prestations
Chaque prestation a :
- un **nom** : il évoque le bénéfice ou l'univers (ex. « Calme et Harmonie ») ;
- un **sous-titre** qui dit **quoi** (dos + crânien, jambes, visage…) et **ce que ça procure**, pour comprendre sans lire le texte ;
- puis un descriptif : bienfaits, durée, accroches, réponse au « point de douleur » du client.

C'est la logique des cartes de spa. **Pas de noms trop marketés** : chez la mère, des noms en langues étrangères avaient desservi l'offre, et elle est revenue à « Kobido », « Massage corps »…

### L'expérience en cabinet (à valoriser)
- Environ 10-15 minutes d'échange avant le soin, environ 10 minutes après. 1h15 effective sur la table.
- Le nouvel espace a un petit coin salon séparé du coin table. On pourrait proposer un thé ❓, sans en faire un riad.
- Rythme : 4 clients par jour maximum.

## 6. Direction artistique (orientations du RDV)

- **Abandonner le bleu canard / teal** (`#175f5e` actuel). Il fait trop médical, froid, et envoie des signaux contradictoires.
- **Base neutre et chaleureuse « couleur papier »**, plutôt tirée vers les **ocres**, avec des **accents de rose** (féminité, douceur).
  - Le rose ne sert que pour les accents : boutons, petites sections.
  - **Jamais d'aplats rose vif en fond.** Ça noie l'info et ça fait moins premium.
  - L'image IA d'Élodie est une bonne base de couleurs : un mix rose et ocre.
- **Rester cohérent avec Sensoa** : doux, même audience.
- **Premium = laisser respirer l'image.** Des photos **réelles** (massages, gestes, lieu). Des photos libres de droit bien choisies pour commencer, puis **des photos d'Élodie** à terme. Pas d'infographies ni d'affiches façon IA.
- **Cohérence stylistique.** On évite le patchwork typique de l'IA : pictos, fond et logo qui ont l'air de venir de « 8 artistes différents ».
- **Hiérarchie claire** : un titre important, un bouton important. Ça s'oppose au site actuel, « tassé », effet « menu de restaurant chinois ». C'est **aéré**, avec l'info diluée dans le visuel.
- **Peu de choix, mais très mis en valeur.** Des sections « vitrines » façon pub pour le Kobido et les 5 continents.
- **Logo** : Maxime ne refait pas le logo. Élodie doit envoyer toutes les versions existantes pour détourage et intégration.
- **Assets graphiques** : Maxime créera de petits éléments décoratifs, réutilisables par Élodie dans Canva pour ses cartes cadeaux.

## 7. Contenus et ton

- **Approche hybride** : Maxime pré-rédige à partir du site actuel, du RDV et de ses conseils. Ils itèrent **en live** : Élodie commente, Maxime modifie.
- Élodie doit se reconnaître dans les textes, sans effet « trop généré ». Elle doit être **confiante** à la livraison.
- **Après la livraison**, elle doit pouvoir **modifier les textes elle-même** ❓. C'est un impact technique, voir §10.
- Matière réutilisable de l'ancien site : le parcours d'Élodie (« Qui suis-je ? »), les bienfaits du massage, les descriptifs des 5 continents et de la réflexo, la mention légale « non médical / aucune connotation sexuelle ».
- Éléments historiques qui peuvent disparaître : la citation « sagesse tibétaine », les titres actuels, etc. Élodie est d'accord sur le principe.

## 8. SEO

- On pense les mots-clés **dès la conception** : 1 ou 2 expressions principales par page, reprises dans les titres, les textes et les `alt` des images.
- Pistes :
  - « Kobido Saint-Cyr-sur-Loire », « Kobido Tours » ;
  - « massage Tours », « massage Saint-Cyr-sur-Loire » ;
  - « massage des 5 continents Tours » ;
  - « réflexologie plantaire Tours » ;
  - « Horizon des sens ».
- **Observation de Maxime** (via les ads de Sensoa) : la recherche « massage Tours » baisse, et « Kobido / Kobido Tours » monte fortement. C'est une vague comparable à celle du californien.
- Le changement d'adresse est un point d'attention : fiche Google Business ❓ et cohérence des NAP.

## 9. Fonctionnalités attendues

| Fonction | Détail |
|---|---|
| **Prise de RDV** | Via **SimplyBook.me** (`horizondessens.simplybook.it`), intégré au nouveau site par widget. Maxime aura les accès et paramétrera les widgets. **Il ne modifie pas la config actuelle**, toujours utilisée. SimplyBook est la référence des prestations des 3 dernières années, mais pas de la future offre. |
| **Carte cadeau** | **Vente en ligne**, sur le site ou via SimplyBook ❓. Le visuel est un **mockup réaliste (main qui tient la carte)**, comme sur le site de Sensoa, pour la rendre « physique ». Élodie garde la main sur le template Canva. Maxime conseille et fournit les assets, sans designer la carte finale. Fond neutre si la carte porte beaucoup d'info. |
| **Abonnements / fidélité** | Les « abonnés » sont centraux. Format, d'après la carte 2026 : **6 séances à l'année, -10 € par séance**. Le mode de souscription (SimplyBook ? paiement ?) et le périmètre (toutes les prestations ?) sont ❓. |
| **Offres découverte** | Pour recruter de nouveaux clients. |
| **Contact** | Coordonnées, nouvelle adresse, plan ❓, formulaire ❓. |
| **Newsletter** | Existe sur l'ancien site (formulaire inactif). À garder ❓. |
| **Mentions légales** | Absentes du site actuel. À créer : SIRET, hébergeur, etc. |

## 10. Technique et hébergement

- **Actuel** : site PHP et Bootstrap 3 (agence Kodoka, 2021), hébergé chez **OVH**, avec le domaine `horizondessens.fr` chez OVH. Maxime a déjà les accès OVH.
- **Cible** : React + Tailwind + Framer Motion. L'hébergeur reste à définir ❓.
- **Bascule** : Maxime change les **DNS** sur OVH pour faire pointer le domaine vers le nouvel hébergement. L'ancien site **n'est pas supprimé** : les fichiers restent sur OVH, mais il n'est plus accessible via le domaine.
- **Après la bascule** : Élodie pourra passer à une formule OVH « domaine seul » pour économiser.
- **Point clé** : si Élodie doit éditer ses textes, il faut un CMS headless ou un mécanisme d'édition ❓.

## 11. Planning et process

- **13/11/2026** : RDV de cadrage.
- **Lundi 23/11/2026 à 16h30** : point prévu pour montrer **une première version**, avec un peu de texte, quelques images et le logo intégré. Ce n'est pas une version définitive.
  - ⚠️ **C'est aujourd'hui** ❓.
- Communication via **WhatsApp**, pas de SMS. Des inspirations design seront envoyées au fil de l'eau, sans urgence.
- Option proposée par Maxime : un **mini-sondage des abonnés** (Google Form, 3 à 5 questions) sur leurs besoins, ce qu'ils aiment dans leur abonnement et le Kobido. C'est utile, mais pas bloquant.

## 12. Assets et éléments attendus d'Élodie

- [~] Logos : une seule version reçue, raster 750 px sur fond rose (voir §12bis). Il manque l'original HD ou vectoriel, sur fond transparent, et les variantes.
- [x] Image IA de la future carte : `Carte massages 2026.png` (1024×1536).
- [x] Carte cadeau actuelle : `Carte cadeau old.png`.
- [x] Badge licence 5 continents : `Image licence.png`.
- [~] Photo d'Élodie : un selfie reçu. Un shooting pro est à prévoir.
- [ ] Accès SimplyBook.
- [x] Accès OVH : déjà envoyés.
- [ ] Photos réelles : cabinet, gestes. À prévoir plus tard.

## 12bis. Ressources visuelles reçues (`Images Elodie/`, 23/11/2026)

| Fichier | Contenu | Analyse / usage |
|---|---|---|
| `Carte massages 2026.png` (1024×1536) | Carte des prestations 2026 générée par IA (voir §5). | **Contenu** : la base de travail pour l'offre et les tarifs. **Visuel** : fond poudré rosé-pêche (≈ `#F8EBE2`), titres en serif rose framboise foncé, signature et citation en script, petites capitales espacées, pictos au trait dans des médaillons, fleurs et bougie décoratives, bandeau rose pâle (≈ `#F1D3C9`). Cela confirme la tendance « papier + rose ». C'est **le défaut que Maxime pointait** : pictos, logo et décor de styles hétérogènes, trop chargé, effet IA. On s'en inspire pour la palette, **pas comme maquette**. |
| `Logo Old.png` (750×750) | Logo symbole : mandala ou lotus stylisé, deux mains tenant une sphère lumineuse rose, feuillage en dessous. Trait blanc sur **fond rose framboise `#B84C64`**. | **Logo à conserver** : Maxime ne refait pas de logo. Problèmes : basse résolution, fond plein, et un dégradé (la sphère lumineuse) difficile à vectoriser proprement. Il faut une version HD/transparente ou un détourage/vectorisation. **Aucun logotype texte** : sur la carte 2026, le nom est composé en serif et script. La couleur de marque historique est donc déjà le **rose framboise**, et non le teal du site actuel. |
| `Carte cadeau old.png` (1748×1241, A5 paysage) | Carte cadeau actuelle (Canva) : **aplat rose framboise `#B84C64`**, ornements et champs dorés (≈ `#EDD08A`). Textes : « RITUELS BIEN-ÊTRE CHEZ HORIZON DES SENS », « UN CADEAU RIEN QUE POUR SOI », la citation (« chuchote »), les champs « À : / Massage : / Valable jusqu'au : », et **déjà la nouvelle adresse** (9 Quai des Maisons Blanches, 37540 Saint-Cyr-sur-Loire), horizondessens.fr, 06.76.95.90.03. | C'est le cas typique de **l'aplat de couleur en fond** déconseillé par Maxime. Coquille : « Saint-Cyr-sur-Loire**fr** ». À refaire plus tard dans Canva, avec les assets du site et un mockup « main ». Le **téléphone reste le même**. |
| `Image licence.png` (2000×2000, PNG) | Badge « Fédération du massage des 5 continents / 5 Continents Massage International Federation — **PRATICIEN M5C OFFICIEL** — 2027 — Licence professionnelle ». Style très doré et noir, brillant. | C'est **l'argument de crédibilité du 5 Continents**. Mais le style clinquant **détonne** avec la DA douce. On l'utilisera en petit, en élément de réassurance, ou bien on le remplacera par une mention texte (« Praticienne certifiée M5C, licence professionnelle »). La licence est **annuelle** (millésime 2027), donc il faudra la mettre à jour chaque année. Les règles d'usage du badge par la fédération sont à vérifier ❓. |
| `Photo Elodie.png` (1086×1448) | Selfie souriant : chignon, haut orange vif, papier peint floral aquarelle rose et gris, fauteuil gris. | Le rendu est chaleureux et authentique : on peut l'utiliser en **provisoire** pour « À propos ». Mais c'est un selfie, avec un haut orange qui sort de la palette, et la qualité n'est pas pro. **Il faut recommander un shooting** : portrait, mains en geste de Kobido, cabinet à Saint-Cyr. Le papier peint floral (cabinet actuel ?) est cohérent avec la DA papier et rose. |

**Synthèse DA confirmée par les visuels** : la couleur identitaire réelle est le **rose framboise `#B84C64`** (logo, carte cadeau), et la direction souhaitée est **fond papier/poudré, plus rose en accent**. On dispose donc d'une couleur d'accent légitime, déjà associée à la marque, et d'une base neutre à affiner vers les ocres, comme le conseillait Maxime.

Graphie du nom : « Horizon des **S**ens » sur la carte 2026, « HORIZON DES SENS » sur la carte cadeau, « Horizon des sens » sur le site ❓.

---

## 13. Décisions (questionnaire du 23/11/2026, réponses de Maxime)

> **Ces décisions priment** sur les ❓ restés dans les sections précédentes.

### Identité et périmètre
| Sujet | Décision |
|---|---|
| Nom de marque | **« Horizon des Sens »**, avec un S majuscule. |
| Nom et email affichés | **Élodie Poirier**. On garde l'email actuel `e.nguyen@horizondessens.fr`. Téléphone : 06 76 95 90 03. |
| Cabinet de la mère | **Sensoa**, https://www.sensoa-massage.fr/. Maxime en est aussi le développeur. **Sensoa et Horizon des Sens sont des salons concurrents**, même s'ils partagent le cabinet et ont des points communs (clientèle, Kobido…). Le site de Sensoa sert de **référence d'idées** (structure, sections, fonctionnalités, intégrations), mais on **ne reprend aucun texte tel quel**. Les **images** ne sont réutilisées qu'après **choix explicite de Maxime**. Scraping : `references/sensoa/`. L'identité doit rester **propre à Horizon des Sens** : des codes doux, mais différenciés. |
| Mention du cabinet partagé / des autres praticiennes | **Pas pour l'instant.** Ce sera peut-être fait plus tard, sous forme de partenariat. |
| Citation « Si tu écoutes ton corps… » | **Retirée** du site. |
| Fiche Google Business | **Hors périmètre** : Élodie s'en charge. On vérifie seulement la cohérence des NAP. |

### Offre
| Sujet | Décision |
|---|---|
| Carte 2026 | C'est la base : Kobido, Calme et harmonie, 5 Continents, Jambes légères, et l'abonnement. |
| Massage sur mesure | **On le garde, avec un nom premium.** C'est une prestation à part entière, mais elle n'est pas mise en avant, pour ne pas cannibaliser le Kobido et le 5 Continents. Le nom reste à trouver. |
| Jambes légères | **Inclut la réflexologie plantaire, et on l'écrit** (sous-titre ou texte), pour le SEO et la crédibilité. |
| Abonnement | On le **présente sans préciser le mode de souscription** pour l'instant. Maxime vérifiera avec Élodie. |
| Badge licence M5C | **Petit**, comme élément de réassurance dans la section 5 Continents. |
| Anciennes prestations (Reiki seul, Relaxant, Vitalité, pierres chaudes, réflexo seule, seniors) | **À vérifier avec Élodie.** Par défaut, on ne présente que la carte 2026. |
| Reiki en séance seule | **À vérifier avec Élodie.** |

### Site et technique
| Sujet | Décision |
|---|---|
| Architecture | **Une page d'accueil longue et des pages clés** : Accueil (one-page), **Kobido**, **Le salon** (le lieu à Saint-Cyr), **Carte cadeau**, **Réserver** (avec des items et widgets SimplyBook intégrés), **Contact**. Pas de page dédiée au 5 Continents pour l'instant : c'est une section de l'accueil. Mentions légales à ajouter. |
| Édition des contenus | **CMS minimaliste avec édition directe sur une page qui ressemble au site.** Seuls les textes et les images sont modifiables par la cliente, avec une **limite de caractères par champ**. Le contenu est **stocké à distance**, pas dans des fichiers locaux ni dans Git. ✅ **Décidé : un mini-CMS maison** (Next.js + Supabase, édition en place sur `/admin`). Voir [options-techniques.md §B](options-techniques.md). |
| Stack | ✅ **Next.js** (React) + Tailwind + Framer Motion sur Vercel, avec des pages statiques revalidées à la publication, pour le SEO. |
| Mini-CMS (mis en place le 23-24/11/2026) | ✅ Édition **sur les vraies pages** (connexion `/admin` → Draft Mode) : clic sur un texte = édition dans l'élément lui-même (vraie typo, mise en page recalculée en direct), limite stricte par champ ; bouton « Remplacer » discret sur les photos (optimisées en WebP dans le navigateur) ; brouillons puis « Publier » ; « Rétablir l'original ». Supabase : `cms_content` (publié, public), `cms_drafts` (RLS éditeurs), `cms_revisions`, `cms_editors`, bucket `cms-media`. **HTML public inchangé**, pages statiques. Détails : [cms.md](cms.md). |
| SimplyBook | Ce qui a été vendu : une intégration de SimplyBook. On veut **aligner son apparence sur le site sans le CSS payant** et **supprimer la double saisie** des prestations.
✅ **Décidé : l'hybride.**
- SimplyBook est la source de vérité pour le nom, la durée et le prix ; l'API est lue côté serveur.
- Le widget est thémé et pré-rempli sur la prestation.
- Le CMS porte le contenu éditorial, relié à chaque prestation par son ID SimplyBook.
- Repli : le widget thémé seul, si l'API n'est pas disponible.

Voir [options-techniques.md §A](options-techniques.md). |
| Hébergement | **Vercel**. Le domaine reste chez OVH, avec bascule des DNS. |
| Carte cadeau | **Paiement sur le site via Stripe** (Checkout). Le **PDF est généré et envoyé automatiquement par email** à l'acheteur, et Élodie reçoit une notification. Cela implique des fonctions serverless sur Vercel, un template PDF cohérent avec la DA et une gestion de la validité de 6 mois. |
| Contact et engagement | Formulaire de contact, carte Google Maps et **avis Google**. **Pas de newsletter.** |
| Logo | **Vectoriser le PNG en le simplifiant** (SVG provisoire). Maxime refera une version propre qui remplacera le provisoire dans la version finale. |
| RDV du 23/11 à 16h30 | Maintenu. **Maxime dira quoi préparer : ne rien anticiper.** |

### Réponses d'Élodie (RDV du 23/11/2026, transmises par Maxime)
> Elles priment sur les lignes « à vérifier » ci-dessus. Détail : [questions-elodie-rdv.md](questions-elodie-rdv.md).

| Sujet | Réponse |
|---|---|
| Clientèle | **Mixte**, mais **on ne le mentionne pas**. Les formulations restent neutres. |
| Massage sur mesure | **« Rituel Horizon »** validé : **1h15, 120 €**. |
| Anciennes prestations | **Ignorées pour l'instant.** Seule la carte 2026 est présentée. |
| Abonnement | Il concerne le **Kobido** : **90 € la séance** au lieu de 100 €, 6 séances par an. Le mode de souscription n'est pas précisé. |
| Horaires | **Du lundi au samedi, 9h30–11h et 13h30–17h.** |
| Accès, stationnement | À préciser. |
| Double présence sur Sensoa | Pas encore tranchée. |
| Badge M5C (règles d'usage) | Inconnu. |
| SimplyBook (abonnement, accès) | Pas de réponse. |
| Cartes cadeaux | **Valables 6 mois.** Kobido 1h à 100 € et 1h15 à 120 €. Le **Massage des 5 Continents** est **à gérer séparément**. Cessibilité et remboursement : non précisés. |
| Légal | **SIREN 841 843 337.** Élodie envoie le reste (statut, TVA, médiateur, annulation). |
| Développeur du site | **Maxime Elhaik**, maxime.elhaik@gmail.com (crédit dans les mentions légales). |

#### ⚠️ Pages légales : rédigées sur hypothèses, donc incomplètes (23/11/2026)
Décision de Maxime : les pages affichent les hypothèses **sans mention « à compléter »** ; l'incomplet est noté **ici uniquement**. À reprendre quand Élodie envoie ses infos :
- **Statut** : « Entreprise individuelle », **TVA non applicable (art. 293 B du CGI)** — donné par Maxime, à confirmer (micro-entreprise ?).
- **Médiateur de la consommation** : **non nommé**. Les CGV disent seulement que ses coordonnées sont « communiquées sur simple demande ». C'est **insuffisant légalement** : il faut nommer le médiateur (nom, site) dès qu'Élodie y a adhéré.
- **Annulation** : règle des **24 h** (choix de Maxime en attendant Élodie). Au-delà ou absence : séance due, ou décomptée de la carte cadeau / de l'abonnement.
- **Paiement des séances** : supposé **au salon, le jour du rendez-vous**.
- **Abonnement Kobido** : « 6 séances par an à 90 € », modalités de souscription « précisées au salon ».
- **Carte cadeau** : **nominative, non remboursable** (choix de Maxime), 6 mois, Kobido 1h ou 1h15 ; 5 Continents « sur demande, auprès d'Élodie » (interprétation de « à gérer séparément »). Rétractation de 14 jours mentionnée.
- **Crédits** : photos du salon par Maxime ; visuels d'illustration Unsplash et **images générées par IA** (Midjourney) — à valider par Maxime.
- **Confidentialité** : durées de conservation standard CNIL (3 ans contacts/clients, 10 ans comptable), aucun outil d'audience, Google Maps chargé au clic.
- Le tout doit être **relu par Élodie**, idéalement avec un conseiller.

## 14. Enseignements du site concurrent Sensoa (analyse du 23/11/2026)

> Source : [references/sensoa/sensoa-site.md](../references/sensoa/sensoa-site.md) (71 URL) et 145 images dans `references/sensoa/images/` (218 Mo, en pleine résolution).
> **On ne reprend aucun texte. On ne réutilise les images qu'après validation de Maxime.**

### Faits utiles
- **Stack** : Wix (Bookings, Stores, Pricing Plans, Blog), derrière Cloudflare. **Ni SimplyBook ni Next.js** : rien n'est réutilisable techniquement, l'intérêt est fonctionnel et éditorial.
- **Équipe** :
  - Agnès : massage et Kobido, formée en 2022 puis au Kobido en 2025 ;
  - Nathalie : spécialiste et **formatrice** Kobido depuis 2021, centre « Sensoa Formation ».
- ⚠️ **Élodie apparaît déjà sur Sensoa.** Un article de blog « Bienvenue à Élodie ! » existe, et la prestation « Corps & Visage 1h15 » indique « Séance avec Elodie » ❓.
- **La salle donne sur la Loire.** C'est l'argument fort du lieu, et le même lieu qu'Élodie.
- **Tarifs Sensoa** :

| Prestation Sensoa | Durée | Tarif |
|---|---|---|
| Rituel Kobido | 1h | 100 € |
| Grand Kobido | 1h15 | 120 € |
| Corps & Visage | 1h | 110 € |
| Corps & Visage | 1h15 | 135 € |
| Massage corps sur mesure | 1h ou 1h15 | non relevé |
| Abonnement Kobido | 6 séances, 1 toutes les 4 à 6 semaines | 90 € la séance |
| Coffret Cure | — | 510 € |
| Formation Kobido | — | 450 € |

  → La carte 2026 d'Élodie est **alignée** : Kobido 1h à 100 € et 1h15 à 120 €, abonnement de 6 séances à -10 €. C'est conforme à la consigne « ne pas se différencier par le prix ».
- **Carte cadeau Sensoa** :
  - vendue comme produit Wix Stores, paiement Stripe, PDF envoyé par email ;
  - validité de 6 mois (1 an pour le coffret) ;
  - le **mockup « main qui tient la carte » sur fond bordeaux** existe : `carte-cadeau-01.jpg`, `carte-cadeau-04-corps-visage-1h.png`, `accueil-04-corps-visage-1h15.png`, `produit-coffret-kobido-01-cure-kobido.png`.
- **DA Sensoa** :
  - palette : **bordeaux `#5B0829`**, **framboise `#AE3766`**, vieux rose `#9F484E`, texte `#524444`, blush `#FFF9F9` ;
  - typos : Kotori Ro / Kotori Rose (titres), Airbnb Cereal (corps) ;
  - photos : gros plans de soin en lumière douce.
- **Avis** : le widget Google Reviews est installé, mais **aucun avis ne s'affiche**. C'est un point à soigner chez nous, puisqu'on a décidé d'afficher les avis Google.
- **SEO** :
  - Sensoa vise « Kobido Tours » et « Massage Tours » dans ses titles et H1 ;
  - il publie des données structurées `LocalBusiness` et un blog de 39 articles, dont beaucoup sur le Kobido.
  - **Concurrence SEO directe** sur les mêmes requêtes, à la même adresse.

### Ce qui différencie Horizon des Sens (à exploiter)
| Horizon des Sens a… | Sensoa n'a pas… |
|---|---|
| **Massage des 5 Continents**, praticienne M5C sous licence | ✔ Absent chez Sensoa : le **différenciant n°1** se confirme. |
| **Calme et harmonie** (dos, visage, crânien + **Reiki**) | Sensoa propose de l'« harmonisation des fascias » et de l'énergétique via une partenaire, mais pas de Reiki intégré. |
| **Jambes légères + réflexologie plantaire** | ✔ Absent chez Sensoa. |
| 8 ans d'expérience, passé de soignante, Reiki Usui depuis 2017 | — |
| Kobido | ⚠️ Présent chez les deux (Sensoa en a fait sa spécialité et forme au Kobido). Il faut **affirmer le Kobido d'Élodie sans singer Sensoa**, avec un angle propre (par ex. le lien Kobido + énergétique / Reiki ❓). |
| Massage sur mesure (nom premium à trouver) | ⚠️ Sensoa a aussi un « Massage corps sur mesure ». Raison de plus pour lui donner **un nom et un angle propres**. |

### Points de vigilance pour la DA
- ⚠️ **Collision de palette.** Le rose framboise d'Élodie (`#B84C64`) est **très proche** de celui de Sensoa (`#AE3766`), et Sensoa a déjà le bordeaux et le blush. Deux concurrents à la même adresse avec la même palette, c'est la confusion assurée.
  → Cela renforce la consigne du RDV : **base papier tirée vers les ocres et terres**, le rose framboise seulement en **accent discret**, et des typos et photos différentes de Sensoa.
- **Le mockup « main »** est une bonne idée de principe, mais il ne faut pas reprendre le même cadrage ni le même fond bordeaux que Sensoa.
- **Les photos du salon** (vue sur la Loire) représentent le même lieu. Maxime en est probablement l'auteur, puisque le site le crédite comme « photographe et webdesigner ». Leur réutilisation est techniquement possible, mais il faut l'**accord de Maxime et de Sensoa** et un choix de photos différentes de celles en vitrine chez Sensoa ❓.

### Idées de structure ou de fonctionnalités à considérer (sans copier)
- Un hero avec 2 ou 3 CTA clairs (Réserver / Offrir / Découvrir le Kobido).
- Une carte cadeau achetable « en quelques clics », avec un aperçu produit.
- La page « Le salon », organisée autour du lieu (la Loire, l'échange avant la séance). On ne peut pas reprendre la formulation de Sensoa, mais le sujet est commun et légitime.
- Une mise en avant des huiles et partenaires. Pour Élodie : le labo des huiles 5 Continents et la fédération M5C.
- Les données structurées `LocalBusiness` / `HealthAndBeautyBusiness` dès la v1.
- Pas de blog en v1. C'est une piste SEO possible plus tard, sans concurrencer frontalement les 39 articles Kobido de Sensoa.

### Questions encore ouvertes
- **Élodie est déjà présentée sur Sensoa** (article de bienvenue, « Séance avec Elodie »). Continue-t-elle à recevoir des clients sous la marque Sensoa en parallèle ? Comment le site d'Horizon des Sens doit-il gérer cette double présence ?
- ~~Photos du salon et de la Loire venant de Sensoa~~ → ✅ **Réutilisables.** Maxime en est l'auteur. **Sont exclues** les images où l'on voit une masseuse ou une personne massée. Seuls le lieu, la salle et la vue sur la Loire sont autorisés.
- Le SIRET et le statut juridique d'Élodie, pour les mentions légales.
- Les points « à vérifier avec Élodie » : anciennes prestations, Reiki seul, mode de souscription de l'abonnement.
- Le nom premium du massage sur mesure.
- Le plan SimplyBook d'Élodie et la disponibilité de la custom feature API.
- Les règles d'usage du badge de la fédération M5C.

## 15. Checklist de mise en production (tenue à jour)

> À dérouler avant la bascule DNS de horizondessens.fr. Cocher au fur et à mesure. Ajouter toute nouvelle tâche ici.

### Contenu et pages
- [x] Pages **Le salon** et **Carte cadeau** (vitrine) créées le 23/11/2026.
- [ ] Faire valider par Élodie le récit de son parcours (page Le salon).
- [x] Page **Réserver** (`/reserver`) : liste des soins, chaque durée ouvre directement son calendrier SimplyBook, sans iframe (23/11/2026).
- [ ] Page 404 aux couleurs du site.
- [ ] Textes relus et validés par Élodie (accueil, Kobido : citation de l'approche, déroulé, FAQ, contre-indications).
- [ ] Accès et stationnement du salon (`home.final.access` affiche « informations à venir »).
- [ ] Logo définitif en SVG (fourni par Maxime) à la place du provisoire.
- [ ] Image jambes ou pieds pour Jambes légères, portrait professionnel d'Élodie (si shooting).
- [ ] Badge M5C : règles d'usage de la fédération.
- [ ] Avis Google (section masquée tant que `getReviews()` est vide).

### Légal (voir §13, « Pages légales : rédigées sur hypothèses »)
- [ ] Infos envoyées par Élodie : confirmer statut (EI, micro-entreprise ?) et TVA (art. 293 B).
- [ ] **Nommer le médiateur de la consommation** dans les CGV (obligatoire).
- [ ] Confirmer la politique d'annulation (24 h), le paiement des séances au salon, les modalités de l'abonnement Kobido, la carte cadeau 5 Continents.
- [ ] Valider la mention « images générées par IA » dans les crédits.
- [ ] Mettre à jour `site.legal.updatedAt` (`src/lib/site.ts`) à chaque modification.
- [ ] Relecture par Élodie, idéalement avec un conseiller.

### Formulaire de contact (Resend)
- [x] Domaine `horizondessens.fr` créé dans Resend (région eu-west-1, 23/11/2026), statut « non vérifié ».
- [ ] **Obtenir l'accès à la zone DNS OVH d'Élodie** (prérequis).
- [ ] Ajouter chez OVH (Zone DNS → Ajouter une entrée ; saisir seulement le sous-domaine) :

  | Type | Sous-domaine | Valeur | Priorité |
  |---|---|---|---|
  | TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5mBAAb4P77ZN2eMD22t59XUNMB9GOugH3Ss1M2F/IEiBW6qEzJ+1Ej8TZ5fyK1J0oUhYAJLN5SDjr58e3Ki8odYqEcj54fxRAkrxUAErg9vCbI5YIrqqotEEx5v9wagxYXpg5FOltbJEyArObeWWoEP0NCLa3c9lJy6kYudEqQQIDAQAB` | — |
  | MX | `send` | `feedback-smtp.eu-west-1.amazonses.com.` | 10 |
  | TXT | `send` | `v=spf1 include:amazonses.com ~all` | — |
  | CNAME | `rsend` | `send.forge.rmta.net.` | — |

  Sans impact sur l'ancien site ni sur la messagerie d'Élodie (MX principaux intacts). Valeurs à recontrôler dans Resend (ou via le MCP `get-domain`) au moment de les saisir.
- [ ] Lancer la vérification (MCP Resend `verify-domain`, ou bouton Verify) après propagation (quelques minutes à quelques heures).
- [x] Sur **Vercel** (Production et Preview) : `RESEND_API_KEY`, `CONTACT_FROM_EMAIL="Horizon des Sens <contact@horizondessens.fr>"`, `CONTACT_TO_EMAIL=e.nguyen@horizondessens.fr` (ajoutées le 23/11/2026, effectives au prochain déploiement).
- [x] Supprimer le projet Vercel en double `horizondessens-y5z8`.
- [ ] **Régénérer la clé Resend** (l'actuelle a été collée dans une conversation) et la remplacer dans Vercel et `.env.local`.
- [ ] Repasser `.env.local` du mode test (`onboarding@resend.dev` → `maxelhaik@gmail.com`) au mode réel, une fois le domaine vérifié.
- [ ] Test de bout en bout : message reçu par Élodie, « Répondre » renvoie bien à l'expéditeur, pas en indésirables.

### Réservation (SimplyBook)
- [ ] Accès administrateur, plan SimplyBook et disponibilité de la custom feature API.
- [ ] Brancher `getServices()` sur l'API `getEventList` (repli : données locales) et variables `SIMPLYBOOK_COMPANY`, `SIMPLYBOOK_API_KEY`.
- [x] Liens directs vers le calendrier de chaque prestation (`bookingHref`, IDs `simplybook: { service, category }` dans `local-services.ts`) : Kobido 1h, Calme et harmonie, 5 Continents (23/11/2026). Pas d'iframe (décision de Maxime).
- [ ] Créer dans SimplyBook les prestations manquantes (**Kobido 1h15, Jambes légères, Rituel Horizon**) et renseigner leurs IDs ; en attendant, leurs boutons ouvrent la réservation générale.
- [ ] Harmoniser l'apparence de la page SimplyBook (thème, couleurs, image de fond) avec le site, dans l'admin SimplyBook.
- [ ] ⚠️ **Mettre à jour les prestations dans SimplyBook** : la page de réservation affiche encore l'ancienne carte (« Kobido Lumière 1h 85 € », « Cure Renaissance », « 5 Continents 1h20 95 € »…). Noms, durées et prix doivent correspondre à la carte 2026 (Kobido 1h 100 € / 1h15 120 €, Calme et harmonie, 5 Continents, Jambes légères, Rituel Horizon 1h15 120 €, abonnement Kobido 90 €). **Modifier** les prestations liées (24, 15, 21) sans les recréer, pour garder leurs IDs (sinon, les mettre à jour dans `local-services.ts`), et masquer les anciennes prestations. À faire par Élodie ou avec ses accès, sans casser les rendez-vous en cours.

### Cartes cadeaux (Stripe)
- [ ] Compte Stripe d'Élodie, clés **live** et webhook (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`).
- [ ] Brancher Stripe Checkout dans `src/app/carte-cadeau/commander/route.ts` (aujourd'hui : redirection vers Contact).
- [ ] Génération du PDF, envoi par e-mail (Resend), notification à Élodie, numéro et validité 6 mois, nom du bénéficiaire (carte nominative).
- [ ] Paiement de test puis paiement réel remboursé.

### CMS (Supabase) — voir [cms.md](cms.md)
- [x] Mini-CMS : édition en place (mode édition = Draft Mode), brouillons, publication, images (bucket `cms-media`), `getContent()` lu depuis Supabase avec repli sur `defaults.ts` (23-24/11/2026).
- [x] Variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` sur Vercel (production, preview, development).
- [x] Compte de Maxime (`maxelhaik@gmail.com`) invité et ajouté à `cms_editors` (24/11/2026).
- [ ] **Test de bout en bout** : lien d'invitation → mot de passe → texte, photo, publication, revalidation en ligne.
- [ ] **SMTP Resend dans Supabase Auth** (domaine vérifié requis) : sans lui, les e-mails d'auth ne partent qu'aux membres de l'org Supabase → **l'invitation d'Élodie est impossible**. Puis traduire les modèles d'e-mail.
- [ ] À la mise en ligne : Supabase Auth **Site URL** → `https://horizondessens.fr` (aujourd'hui `http://localhost:3005`).
- [ ] Supprimer la ligne de test `home.hero.lead` (« TEST CMS… ») de `cms_content` si elle y est encore.
- [ ] Désactiver les inscriptions publiques dans Supabase Auth (Authentication → Sign In / Providers → « Allow new users to sign up » : off). Sans effet sur la sécurité du CMS (seuls les comptes de `cms_editors` éditent), mais plus propre.
- [ ] **Révoquer le jeton d'accès Supabase** `sbp_…` collé dans une conversation (Account → Access Tokens).
- [ ] Compte d'Élodie, prise en main (guide express : cms.md §4).

### Cookies et confidentialité
- [x] Bandeau cookies en place (Google Maps seulement). SimplyBook n'est pas intégré au site (liens vers son propre site), donc hors bandeau (23/11/2026).
- [ ] Si une mesure d'audience est ajoutée : la soumettre au consentement (ou choisir une solution exemptée) et mettre à jour la politique de confidentialité.

### SEO et technique
> Stratégie complète : [docs/seo/strategie-seo.md](seo/strategie-seo.md).
- [x] `sitemap.xml`, `robots.txt`, manifeste, métadonnées par page, images de partage, icônes, page 404, données structurées communes (23/11/2026).
- [ ] **Après l'ajout du domaine dans Vercel : redéployer.** L'indexation ne s'active qu'en production sur `horizondessens.fr` (`VERCEL_PROJECT_PRODUCTION_URL`, lu au build). Vérifier ensuite `https://horizondessens.fr/robots.txt` (doit autoriser) et l'absence de `noindex`.
- [ ] Icônes et images de partage à régénérer (`npm run assets:brand`) quand le logo définitif arrivera.
- [ ] Vérifier les redirections 308 des anciennes URL PHP (`next.config.ts`) sur le domaine réel.
- [ ] Tester les données structurées (test des résultats enrichis de Google) et l'aperçu de partage (Facebook, WhatsApp).
- [ ] Audit final : Lighthouse (performance, accessibilité), `/impeccable audit` et `polish`, test mobile réel (iOS et Android).
- [ ] Google Search Console : propriété de domaine (TXT chez OVH), envoi du sitemap.
- [ ] **Fiche Google Business Profile** (Élodie) : nouvelle adresse, horaires, catégories, lien du site et de réservation, services, photos ; nom exact « Horizon des Sens » ; attention à la confusion avec la fiche Sensoa (même adresse). Puis demander des avis et y répondre.
- [ ] Cohérence NAP : nouvelle adresse sur Facebook, Instagram, SimplyBook, PagesJaunes et annuaires ; demander un lien depuis l'annuaire des praticiens M5C.

### Bascule
- [ ] Ajouter le domaine dans Vercel (`horizondessens.fr` et `www`), puis modifier chez **OVH** les enregistrements A/CNAME indiqués par Vercel. Ne pas toucher aux MX de la messagerie.
- [ ] L'ancien site n'est pas supprimé (le garder accessible le temps de vérifier).
- [ ] Après bascule : HTTPS, redirection www, formulaires, réservation, paiement et carte testés en production.
- [ ] Passer le dépôt GitHub en **privé** (prévu).
