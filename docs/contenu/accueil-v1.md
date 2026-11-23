# Page d'accueil — contenu v1 (à valider)

> Version du 23/11/2026. Contenu et structure seulement : **pas de design**. La mise en page est décrite en mots.
> **Conventions**
> - `[clé · type · max N]` désigne un champ éditable par Élodie, avec son nombre maximum de caractères.
> - 🔒 désigne un élément fixe (code, lien, ou donnée SimplyBook).
> - 🖼 `nom-du-fichier` est l'image proposée, prise dans `assets/images/`.
> - ❓ = point à confirmer.
>
> **Principes appliqués**
> - 10 sections, une idée par section, peu de texte.
> - Chaque section a **un seul CTA principal**.
> - Ordre : orienter (hero), choisir (soins), approfondir les deux piliers (Kobido, 5 Continents), rassurer (lieu, Élodie, avis), puis convertir (abonnement, cadeau, réserver).
> - Vouvoiement, aucune promesse médicale, aucun avis ni chiffre inventé.

---

## 0. Header 🔒
Logo · Soins · Kobido · Le salon · Carte cadeau · Contact · **[Réserver]**
*Mise en page : header fin et transparent sur le hero, qui devient opaque au défilement. Sur mobile, un bouton « Réserver » reste fixé en bas de l'écran.*

---

## 1. Hero
*Mise en page : grande image à droite ou en plein cadre, texte à gauche, beaucoup d'air. Le H1 est le seul titre massif de la page.*

🖼 `katherine-hanlon-WAm_HaI4W2E-unsplash.jpg` : mains sur un visage, lumière chaude et tamisée, qui évoque le Kobido sans montrer de visage identifiable.
Alternative : `salon-02-dscf0679.jpg` (la salle et la Loire).
`[home.hero.image · image · 4:5 desktop / 3:4 mobile]`

**Surtitre** `[home.hero.eyebrow · text · max 50]`
> Saint-Cyr-sur-Loire · Tours

**H1** `[home.hero.title · text · max 70]`
> Kobido et massages bien-être, au bord de la Loire

**Accroche** `[home.hero.lead · textarea · max 160]`
> Un soin du visage japonais ou un massage pensé pour ce que votre corps demande, dans un salon calme à deux pas de Tours.

**CTA** 🔒 **Réserver un soin** (vers `/reserver`) · lien secondaire **Offrir une carte cadeau** (vers `/carte-cadeau`)

---

## 2. Bandeau de réassurance
*Mise en page : une ligne de 4 courts éléments sous le hero, séparés par des points, en petit texte. Le bandeau défile sur mobile.*

`[home.trust.items · list · 4 éléments · max 40 chacun]`
> Praticienne depuis 2018 · Licence officielle Massage des 5 Continents · Reiki Usui · Réflexologie plantaire

*(La note Google sera ajoutée ici quand le widget d'avis sera branché, jamais avant.)*

---

## 3. Les soins `#soins`
*Mise en page : titre court, puis 4 cartes en grille (2×2 sur desktop, en colonne sur mobile). Chaque carte a une image, un nom, un sous-titre, une ligne de description, la durée et le prix, et un bouton. Sous la grille vient une ligne discrète pour le soin sur mesure.*

**H2** `[home.soins.title · text · max 50]`
> Quatre soins, une même attention

**Intro** `[home.soins.intro · textarea · max 140]`
> Chaque séance commence par un échange, pour adapter les gestes à votre état du jour.

### Carte 1 — Kobido
- 🔒 Nom, durées et prix (SimplyBook) : **Kobido** · 1h 100 € · 1h15 120 €
- **Sous-titre** `[service.kobido.subtitle · text · max 45]` → *Visage · Détente profonde et éclat*
- **Description** `[service.kobido.short · textarea · max 130]` → *Le massage facial japonais traditionnel : il lisse les traits, relâche les tensions et ravive l'éclat du teint.*
- 🖼 `service-kobido-corps-01.jpg` `[service.kobido.image · image · 4:3]`
- 🔒 CTA **Découvrir le Kobido** (vers `/kobido`)

### Carte 2 — Calme et harmonie
- 🔒 **Calme et harmonie** · 1h15 · 120 €
- **Sous-titre** `[service.calme.subtitle]` → *Dos, visage et crâne · Apaiser le mental*
- **Description** `[service.calme.short]` → *Un massage enveloppant, associé au Reiki, pour relâcher les tensions et retrouver votre équilibre.*
- 🖼 `redd-francisco-ZbOaUHYkaZo-unsplash.jpg` (une femme détendue, allongée)
- 🔒 CTA **Réserver** (vers `/reserver` pré-rempli)

### Carte 3 — 5 Continents
- 🔒 **Massage des 5 Continents** · 1h15 · 120 €
- **Sous-titre** `[service.5continents.subtitle]` → *Corps · Un voyage sensoriel*
- **Description** `[service.5continents.short]` → *Huiles essentielles, gestes venus du monde entier et soin énergétique : un massage rare, pratiqué sous licence.*
- 🖼 `christin-hume-0MoF-Fe0w0A-unsplash.jpg` (des mains et un flacon d'huile, dans des tons sombres et chauds)
- 🔒 CTA **En savoir plus** (vers l'ancre de la section 5)

### Carte 4 — Jambes légères
- 🔒 **Jambes légères** · 1h15 · 120 €
- **Sous-titre** `[service.jambes.subtitle]` → *Jambes et pieds · Retrouver de la légèreté*
- **Description** `[service.jambes.short]` → *Un massage drainant des jambes associé à la réflexologie plantaire, pour soulager les jambes lourdes et relancer la circulation.*
- 🖼 ❓ Il manque une image jambes ou pieds dans `assets/images/`. En attendant, `nataliya-melnychuk-mGMqA4zaPCU-unsplash.jpg` (flacon et fleurs séchées).
- 🔒 CTA **Réserver**

### Ligne « sur mesure »
`[home.soins.surmesure · textarea · max 150]`
> Vous hésitez ? Le **Rituel Horizon** s'adapte entièrement à vos zones de tension, en 1h15. → 🔒 *Réserver*

> **Nom du massage sur mesure, à choisir :**
> 1. **Rituel Horizon** : il reprend le nom de la marque, sonne premium et reste lisible. C'est ma recommandation.
> 2. **Escale sur mesure**.
> 3. **L'Instant choisi**.
>
> Le sous-titre « Sur mesure · Selon vos zones de tension » garantit la compréhension, comme pour les autres soins.

---

## 4. Focus Kobido
*Mise en page : section en deux colonnes, avec l'image d'un côté et le texte de l'autre, et 3 bénéfices en liste courte. C'est la porte d'entrée du public qui connaît déjà le Kobido.*

🖼 `shiva-hemmat-vACg5EYbpqQ-unsplash.jpg` (un visage apaisé, de la lumière, un voile) `[home.kobido.image · image · 4:5]`

**Surtitre** `[home.kobido.eyebrow · text · max 40]` → *Soin signature*

**H2** `[home.kobido.title · text · max 70]`
> Le Kobido, l'art japonais du massage du visage

**Texte** `[home.kobido.text · textarea · max 280]`
> Né au Japon, le Kobido enchaîne des gestes rapides et précis, des pressions et des lissages. Bien plus qu'un soin de beauté, c'est une détente profonde qui gagne tout le corps.

**Bénéfices** `[home.kobido.benefits · list · 3 éléments · max 50 chacun]`
> - Des traits lissés, un teint plus lumineux
> - Les tensions du visage et de la mâchoire relâchées
> - Un lâcher-prise rare, souvent dès la première séance

🔒 CTA **Découvrir le Kobido** (vers `/kobido`) · lien secondaire **Réserver** (pré-rempli)

---

## 5. Focus 5 Continents `#5-continents`
*Mise en page : la seule section à fond sombre et chaud de la page, pour marquer le différenciant. L'image est grande, le texte court, et le badge M5C petit, en réassurance.*

🖼 `nataliya-melnychuk-07gLfXI4W08-unsplash.jpg` (flacon ambré sur une pierre) ou `blog-energetique-…jpeg` (lampe et pierres) `[home.5c.image · image · 3:4]`

**Surtitre** `[home.5c.eyebrow · text · max 40]` → *Un massage rare*

**H2** `[home.5c.title · text · max 70]`
> Le Massage des 5 Continents

**Texte** `[home.5c.text · textarea · max 300]`
> Un voyage en deux temps. D'abord des gestes appuyés, qui libèrent le corps de ce qui l'encombre. Puis le lâcher-prise, porté par des huiles essentielles préparées spécialement pour ce soin et par un soin énergétique.

**Mention de licence** `[home.5c.licence · text · max 80]`
> Praticienne certifiée M5C · Licence professionnelle 2027

🖼 Badge `Images Elodie/Image licence.png` (petit) 🔒
🔒 CTA **Réserver ce soin**

---

## 6. Le salon
*Mise en page : une image panoramique de la salle et de la fenêtre sur la Loire, avec un texte court posé en dessous ou par-dessus. Viennent ensuite les 3 temps d'une séance, en 3 colonnes très courtes.*

🖼 `salon-02-dscf0679.jpg` (la salle et la Loire) · en secondaire, `blog-cocooning-02.jpg` (la fenêtre) `[home.salon.image · image · 16:9]`

**H2** `[home.salon.title · text · max 60]`
> Un salon calme, ouvert sur la Loire

**Texte** `[home.salon.text · textarea · max 180]`
> À Saint-Cyr-sur-Loire, à quelques minutes de Tours, une salle lumineuse face au fleuve, pensée pour que vous puissiez vraiment décrocher.

**Les 3 temps d'une séance** `[home.salon.steps · list · 3 × (titre max 25 + texte max 90)]`
> 1. **Un échange** : quelques minutes pour comprendre vos besoins et adapter le soin.
> 2. **Le soin** : 1h15 sur la table, à votre rythme.
> 3. **Un retour en douceur** : un temps pour revenir à vous avant de repartir.

🔒 CTA **Découvrir le salon** (vers `/le-salon`)

---

## 7. Élodie
*Mise en page : un portrait à côté d'un court texte à la première personne. Le ton est plus intime que le reste de la page.*

🖼 `Images Elodie/Photo Elodie.png` (provisoire, un shooting est prévu) `[home.elodie.image · image · 4:5]`

**H2** `[home.elodie.title · text · max 40]` → *Élodie Poirier*

**Sous-titre** `[home.elodie.subtitle · text · max 70]` → *Praticienne en massage bien-être*

**Texte** `[home.elodie.text · textarea · max 320]`
> Ancienne soignante, j'ai quitté l'hôpital pour me consacrer au massage bien-être. Formée au Reiki Usui, à la réflexologie plantaire, au Massage des 5 Continents et au Kobido, je prends toujours le temps de vous écouter avant de commencer. Mon envie : que vous repartiez plus légère, et plus en accord avec vous-même.

*(⚠️ « plus légère » est au féminin. On attend la décision sur la composition de la clientèle ; une version neutre serait « que vous repartiez apaisé·e », ou mieux, « que chaque séance vous laisse plus léger, plus en accord avec vous-même ».)*

🔒 Lien **Mon parcours** (vers `/le-salon#elodie`)

---

## 8. Avis
*Mise en page : 3 avis Google réels en cartes, avec la note globale et un lien vers tous les avis.*

**H2** `[home.avis.title · text · max 50]` → *Ils et elles en parlent* ❓ (selon la composition de la clientèle), ou *Vos mots*

🔒 Contenu : **widget ou API Google Reviews uniquement.** Aucun avis n'est saisi à la main ou inventé. Tant que la source n'est pas branchée, **la section est masquée**.

---

## 9. Abonnement et carte cadeau
*Mise en page : deux blocs côte à côte (empilés sur mobile), de même poids : « revenir » et « offrir ».*

### Bloc Abonnement `#abonnement`
**H3** `[home.abo.title · text · max 50]` → *Prendre soin de vous, toute l'année*
**Texte** `[home.abo.text · textarea · max 140]` → *6 séances dans l'année, 10 € de moins sur chacune. Pour faire du soin un rendez-vous, pas une exception.*
🔒 CTA **Me renseigner** (vers `/contact`). Le mode de souscription est encore ouvert ❓.

### Bloc Carte cadeau
🖼 Mockup « main qui tient la carte » : **à produire** (ni celui de Sensoa ni son fond bordeaux) `[home.cadeau.image · image · 4:3]`
**H3** `[home.cadeau.title · text · max 50]` → *Offrez une parenthèse*
**Texte** `[home.cadeau.text · textarea · max 140]` → *Choisissez un soin, réglez en ligne, recevez la carte par e-mail. Valable 6 mois.*
🔒 CTA **Offrir une carte cadeau** (vers `/carte-cadeau`)

---

## 9 bis. FAQ (ajoutée le 23/11/2026)
*Mise en page : un accordéon de 4 ou 5 questions, une seule ouverte à la fois.*

**H2** `[home.faq.title · text · max 50]` → *Vos questions*
`[home.faq.items · list · 5 × (question max 90 + réponse max 280)]`, rédigées au moment du dev, puis itérées.

---

## 10. Appel final et infos pratiques
*Mise en page : un bandeau de conclusion sobre, avec le CTA, puis les infos pratiques et une carte qui se charge au clic, pour éviter les cookies Google.*

**H2** `[home.final.title · text · max 60]`
> Et si vous vous accordiez une pause ?

🔒 CTA **Réserver un soin**

🔒 Infos pratiques, qui reprennent les coordonnées : 9 Quai des Maisons Blanches, 37540 Saint-Cyr-sur-Loire · 06 76 95 90 03 · e.nguyen@horizondessens.fr · Horaires ❓
`[home.final.access · textarea · max 140]` → *Accès et stationnement : ❓ à compléter (parking, bus…)*

---

## 11. Footer 🔒
Voir le plan du site, §2.

---

## SEO de la page 🔒 (non éditable)
- **Title** (max 60) : `Kobido & massage bien-être à Saint-Cyr-sur-Loire, Tours | Horizon des Sens`
- **Meta description** (max 155) : `Kobido, Massage des 5 Continents, Calme et harmonie, Jambes légères. Élodie Poirier vous reçoit au bord de la Loire, à 5 min de Tours. Réservation en ligne.`
- **H1** : celui du hero. Une seule expression-clé principale.
- **Alt des images** : descriptifs, avec la localisation quand c'est naturel.

---

## Récapitulatif des clés éditables (accueil)

| Clé | Type | Max |
|---|---|---|
| home.hero.image | image 4:5 | — |
| home.hero.eyebrow | text | 50 |
| home.hero.title | text | 70 |
| home.hero.lead | textarea | 160 |
| home.trust.items | list × 4 | 40 |
| home.soins.title | text | 50 |
| home.soins.intro | textarea | 140 |
| service.{id}.subtitle | text | 45 |
| service.{id}.short | textarea | 130 |
| service.{id}.image | image 4:3 | — |
| home.soins.surmesure | textarea | 150 |
| home.kobido.eyebrow / title / text / benefits / image | text / text / textarea / list×3 / image | 40 / 70 / 280 / 50 / — |
| home.5c.eyebrow / title / text / licence / image | text / text / textarea / text / image | 40 / 70 / 300 / 80 / — |
| home.salon.title / text / steps / image | text / textarea / list×3 / image | 60 / 180 / 25+90 / — |
| home.elodie.title / subtitle / text / image | text / text / textarea / image | 40 / 70 / 320 / — |
| home.avis.title | text | 50 |
| home.abo.title / text | text / textarea | 50 / 140 |
| home.cadeau.title / text / image | text / textarea / image | 50 / 140 / — |
| home.final.title / access | text / textarea | 60 / 140 |

Les champs `service.{id}.*` sont **partagés** entre l'accueil, `/reserver` et `/kobido`. On les édite une seule fois. Ils sont reliés à l'ID SimplyBook de chaque soin.

---

## Points à valider
1. La structure en 10 sections et leur ordre.
2. Le H1 et l'accroche du hero.
3. Les sous-titres des 4 soins (formule « Zone · Bénéfice »).
4. Le nom du massage sur mesure (proposition : **Rituel Horizon**).
5. L'année de début de pratique : 2017, 2018 ou « depuis 8 ans » ❓.
6. Le genre des formulations, selon la composition de la clientèle ❓.
7. Il manque une image jambes ou pieds, et le mockup carte cadeau est à produire.
8. ⚠️ Deux images de `assets/images/` montrent une personne en train d'être massée : `service-kobido-corps-01.jpg` et `service-corps-visage-1h-1-…jpg` (cette dernière en 640 px, trop petite pour un usage plein cadre). Elles viennent de Sensoa, alors que la règle excluait ce type de photo. Je les ai considérées comme validées puisque tu les as placées toi-même dans le dossier. Confirme-le.
