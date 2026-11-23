# Site actuel - Horizon des sens (référence de scraping)

- **Date du scraping** : 2026-11-23
- **URL source** : https://horizondessens.fr/index
- **Techno détectée** : site PHP sur Apache (`Content-Location: index.php`, URLs sans extension), template Bootstrap 3 (thème type "Kodoka", réalisation par https://www.kodoka.fr/), jQuery, owl.carousel, wow.js, gmap3 (clé Google Maps dans le code), Font Awesome 6 beta2, Google Fonts (Montserrat, Raleway). Pas de CMS type Wix/WordPress. Prise de RDV : widget **SimplyBook.me** (iframe, thème "dainty") vers `https://horizondessens.simplybook.it`. Pages de prestations générées par un unique gabarit `massage-details?id=N` (contenu injecté en JS depuis des variables inline, présentes dans le HTML source).
- **Méthode** : HTML brut récupéré par curl (toutes les pages sont rendues côté serveur, sauf le widget de RDV). Texte transcrit tel quel (fautes d'origine conservées, ex. « masssage », « chuchotte », « dès-corps »).
- **Palette / typo** : couleur principale `#175f5e` (vert profond/teal, très dominante, aussi bordures des tableaux de prix) ; fonds clairs `#f5f5f5`, `#fdfbfb`, `#fff` ; widget RDV : base `#1dc495`, secondaire `#e4ebf5`, texte `#a1a1a1`, texte foncé `#293b36`, annulation `#ff7a93`. Polices : Montserrat (400, 700) et Raleway (300-700).

## Arborescence

| Page | URL | Menu |
|---|---|---|
| Accueil | https://horizondessens.fr/index | ACCUEIL |
| Massages et soins énergétiques | https://horizondessens.fr/massage | Massage / Soin énergétique |
| Détail prestation (9 variantes id=0 à 8) | https://horizondessens.fr/massage-details?id=0 ... id=8 | (via la page massage) |
| Carte cadeau | https://horizondessens.fr/carte_cadeau | Offrir un massage (+ lien "Plaisir d'offrir" en barre du haut) |
| Programme de fidélité | https://horizondessens.fr/fidelite | Programme fidélité |
| À propos | https://horizondessens.fr/about-us | à propos |
| Contact | https://horizondessens.fr/contact-us | Contact |
| Rendez-vous en ligne | https://horizondessens.fr/rdv | Rendez-vous en ligne (bouton mis en avant, classe "reservation") |

Non existants (404) : /sitemap.xml, /robots.txt, /mentions-legales. Aucune page mentions légales, CGV, blog, tarifs séparée, ni témoignages/avis n'a été trouvée dans les menus ou liens.

## Infos pratiques consolidées

- **Marque** : HORIZON DES SENS. Praticienne : Élodie Poirier (non nommée sur le site ; l'email contient "e.nguyen").
- **Adresse** : 43 bis Av. de la République, 37700 Saint-Pierre-des-Corps (lien Google : https://g.page/horizon-des-sens?share)
- **Téléphone** : +33 6 76 95 90 03 (`tel:0676959003`)
- **Email** : e.nguyen@horizondessens.fr
- **Horaires** : Lundi - Mardi : 9h30 - 18h00 / Mercredi : 14h30 - 18h00 / Jeudi - Vendredi : 9h30 - 18h00 / Samedi : 14h30 - 18h00 (dimanche non mentionné)
- **Réseaux** : Facebook https://www.facebook.com/horizondessens.fr/ ; Instagram https://www.instagram.com/horizon.des.sens/
- **Prise de RDV** : SimplyBook.me (https://horizondessens.simplybook.it, intégré sur /rdv)
- **SIRET / moyens de paiement / avis clients / témoignages** : non présents sur le site.
- **Copyright pied de page** : « © 2021 - Propriétaire : HORIZON DES SENS | Réalisation : Kodoka » (lien https://www.kodoka.fr/)
- **Grille tarifaire (récap, détails dans chaque page)** :
  - Reiki Usui : « Tarifs uniquement sur devis »
  - À chacun son massage : 45 min 50 € / 60 min 70 € / 80 min 90 €
  - Le Relaxant : 60 min 70 € / 80 min 90 €
  - Le Sérénité : 45 min 55 € / 60 min 70 €
  - Le Vitalité : 60 min 70 € / 80 min 90 €
  - L'énergisant (pierres chaudes, saisonnier automne-hiver) : 60 min 75 € / 80 min 85 € (tel quel sur le site)
  - Massage des 5 continents : 90 min 95 €
  - Réflexologie plantaire bien-être : 45 min 50 € / 60 min 60 €
  - Séniors : « Tarifs uniquement sur devis »
  - Fidélité : voir page dédiée

## Éléments communs à toutes les pages

- **Title** (identique sur toutes les pages) : `Horizon des sens - Massage à Saint-Pierre-des-Corps`
- **Meta description** (idem partout, sauf /rdv non vérifiée) : `Horizon des sens vous est un salon de massage, Reiki, pierres chaudes à Saint-Pierre-des-Corps, proche Tours (37).`
- **Barre du haut** : tél. +33 6 76 95 90 03 / email e.nguyen@horizondessens.fr / « Plaisir d'offrir » (-> carte_cadeau) / icônes Facebook et Instagram (target _blank)
- **Navigation** (logo `img/logo_hds.png` alt "Logo" -> index) : ACCUEIL (index) / Massage / Soin énergétique (massage) / Offrir un massage (carte_cadeau) / Programme fidélité (fidelite) / à propos (about-us) / Contact (contact-us) / Rendez-vous en ligne (rdv)
- **Pied de page** : logo (`img/logo_hds.png`, alt vide) + H2 « HORIZON DES SENS » ; H2 « Coordonnées » : 43 bis Av. de la République, 37700 Saint-Pierre-des-Corps / +33 6 76 95 90 03 / e.nguyen@horizondessens.fr ; H2 « Horaires » : Lundi - Mardi : 9h30 - 18h00 ; Mercredi : 14h30 - 18h00 ; Jeudi - Vendredi : 9h30 - 18h00 ; Samedi : 14h30 - 18h00 ; ligne copyright (voir ci-dessus) ; lien `#` (retour haut).

---

## Page : Accueil
- URL : https://horizondessens.fr/index
- Structure : barre du haut > menu > bannière (fond `img/services/4.jpg`) avec H1 + citation + bouton > section texte centré > bloc newsletter (fond `img/services/2.jpg`) > image `img/about-us/5.jpg` + « Les Bienfaits du massage » > pied de page.

# Salon de masssage Tours Saint-Pierre-dès-corps, Reiki, pierre chaudes

« Si tu écoutes ton corps lorsqu'il chuchotte, tu n'auras plus à l'entendre crier. »
- Sagesse Tibétaine -

Bouton : **En savoir plus ...** -> /massage

(Section texte)

pour se recentrer sur soi et viser un retour à l’équilibre dans un quotidien agité.

Horizon des sens vous accueille dans un espace confortable et harmonieux afin de profiter pleinement de ce moment de détente.

Un temps d’échange avant le massage ou la séance de Reiki permet de repérer plus facilement la nature des déséquilibres en soi s’il y en a. Dans notre quotidien, notre corps subit énormément de stress. Il est souvent poussé à ses limites, car nous lui en demandons toujours plus, entraînant des répercussions sur notre état de santé.

Retrouver cet état d’équilibre entre l’esprit et le corps, atténuer le stress, les troubles du sommeil, les douleurs chroniques sont possibles si l’on écoute davantage les messages de son corps. C’est à ce moment que les massages peuvent intervenir. Chaque massage peut être personnalisé en fonction de son état physique et mental, de son élément de constitution, de ses émotions, de la saison, de l’âge…

Le massage touche notre corps physique, émotionnel, énergétique, mental et spirituel. Mais il reste un outil, un accompagnement, une aide. Seule la personne peut s’autoguérir. Commencer à se faire masser, c’est planter une petite graine qui permettra d’être dans une démarche active et personnelle de guérison..

(Bloc newsletter)

Inscrivez-vous à notre newsletter pour ne rien rater !
Formulaire (POST, action `#`) : champ email (placeholder « Saisir votre adresse e-mail ... ») + bouton submit. Non rempli.

(Image `img/about-us/5.jpg`, alt vide)

## Les Bienfaits du massage

Prendre soin de son corps est nécessaire, tant sur le plan physique qu’émotionnel. Le massage stimule les systèmes circulatoires du corps (sanguin et lymphatique) et permet de ressentir une sensation de bien-être sur l’ensemble du corps et un relâchement musculaire.

Il réduit le stress en favorisant
### la production d’endorphines, de dopamine et de sérotonine

Il améliore
### le sommeil .

Il
### soulage les douleurs en relâchant les tensions musculaires.

Il
### améliore la circulation sanguine et évite la sensation de jambes lourdes .

Il
### élimine les toxines et permet un regain d’énergie .

Il
### renforce le système immunitaire en stimulant la circulation lymphatique.

Tout est lié. Une agitation mentale va engendrer un sommeil non récupérateur, ce qui va affaiblir nos défenses immunitaires. Devenant plus fragile, le risque d’être exposé à différentes pathologies sera plus important.

Le massage bien être n’est cependant pas reconnu médicalement. Chaque personne ayant un doute concernant un état pathologique se doit de demander un avis auprès de son médecin.

Il est à préciser également que les massages bien être n’ont aucune connotation sexuelle. Toute proposition en ce sens sera systématiquement refusée et entraînera l’arrêt immédiat de la prestation.

(Pied de page commun)

---

## Page : Massages et soins énergétiques
- URL : https://horizondessens.fr/massage
- Structure : bandeau titre (fond `img/bg/title-bg.jpg`) H1 + fil d'Ariane (Accueil > titre) > liste de 9 cartes (image, H2, accroche, lien « En savoir plus... ») > pied de page.

# Les massages et soins énergétiques
Fil d'Ariane : Accueil / Les massages et soins énergétiques

1. Image `img/services/0.jpg` - ## REIKI USUI SHIRI RYOHO
   Le Reiki est une méthode énergétique japonaise qui par imposition des mains vise à harmoniser la circulation de l' énergie. [En savoir plus...](massage-details?id=0)
2. Image `img/services/1.jpg` - ## À chacun son massage
   Ce massage vise à retrouver un certain équilibre en respectant les besoins physiques et psychologiques. [En savoir plus...](massage-details?id=1)
3. Image `img/services/2.jpg` - ## Le Relaxant
   Un massage enveloppant qui amène à se réapproprier son corps en diminuant les douleurs chroniques ou les effets du stress sur le corps. [En savoir plus...](massage-details?id=2)
4. Image `img/services/3.jpg` - ## Le Sérénité
   Le massage crânien apaise rapidement l’agitation mentale et libère les tensions dans la nuque et les cervicales. [En savoir plus...](massage-details?id=3)
5. Image `img/services/4.jpg` - ## Le Vitalité
   Une technique de massage dynamique visant à tonifier, relâcher et favoriser la circulation sanguine et lymphatique. [En savoir plus...](massage-details?id=4)
6. Image `img/services/5.jpg` - ## L’énergisant
   Le massage aux pierres chaudes apporte un réconfort et un bien être immédiat. [En savoir plus...](massage-details?id=5)
7. Image `img/services/6.jpg` - ## Massage des 5 continents
   Ce voyage sensoriel mélange différentes techniques pendant 80 minutes et y mélange des huiles essentielles ainsi qu’un soin énergétique en Reiki. [En savoir plus...](massage-details?id=6)
   (NB : incohérent avec la page détail : 1h30 / 90 min)
8. Image `img/services/7.jpg` - ## Massage en Réflexologie plantaire de Bien-être
   En activant les différentes zones reflexes dans le pied, cette technique active le système lymphatique et améliore la circulation sanguine. Très apprécié en forte chaleur. [En savoir plus...](massage-details?id=7)
9. Image `img/services/8.jpg` - ## Massage dans l’accompagnement des Séniors
   S’effectue en EHPAD, foyer logement ou établissement médico-social. Ce massage aide à détendre les muscles, apaise l’esprit, atténue les raideurs et redonne du mouvement aux articulations. [En savoir plus...](massage-details?id=8)

---

## Pages : Détail des prestations (gabarit `massage-details?id=N`)
- URLs : https://horizondessens.fr/massage-details?id=0 à id=8
- Structure de chaque page : bandeau titre (fond `img/services/N.jpg`) avec H1 = titre + fil d'Ariane ; section « services » : H2 (= titre), tableau 1 ligne d'en-tête (durées) / 1 ligne (prix) avec bordure `#175f5e`, paragraphe d'accroche, paragraphe de contenu ; pied de page. Aucun bouton de réservation sur ces pages.

### id=0 - REIKI USUI SHIRI RYOHO
Accroche : Le Reiki est une méthode énergétique japonaise qui par imposition des mains vise à harmoniser la circulation de l' énergie.
Contenu : Le praticien en soins énergétiques est le vecteur de l'énergie universelle.
En libérant les tensions du corps et de l'esprit, le Reiki aide à faire émerger chez la personne les capacités innées et ressources naturelles qu'elle a déjà en elle-même.
Tarif : « Tarifs uniquement sur devis »

### id=1 - À chacun son massage
Accroche : Ce massage vise à retrouver un certain équilibre en respectant les besoins physiques et psychologiques.
Contenu : Ce massage est personnel car  nos besoins sont différents en fonction de la journée, du temps, des saisons, de l’environnement socio professionnel. Après un échange sur l’état global de la personne, les techniques de massages s’adapteront au mieux  pour se rapprocher à la fin de la séance ou à distance d’un retour à la sérénité, un soulagement des douleurs, un regain d’énergie
Lorsque notre corps et notre esprit sont en harmonie, chaque problème pourra trouver une solution.
Tarifs : 45 min : 50.00 € / 60 min : 70.00 € / 80 min : 90.00 €

### id=2 - Le Relaxant
Accroche : Un massage enveloppant qui amène à se réapproprier son corps en diminuant les douleurs chroniques ou les effets du stress sur le corps.
Contenu : Les différentes techniques du massage relaxant ou « californien » ont comme objectif d’amener la personne vers un Lâcher prise sur le mental et par conséquent de détendre les tensions musculaires.
C’est un massage enveloppant qui permet de se réconcilier avec son corps.
Tarifs : 60 min : 70.00 € / 80 min : 90.00 €

### id=3 - Le Sérénité
Accroche : Le massage crânien apaise rapidement l’agitation mentale et libère les tensions dans la nuque et les cervicales.
Contenu : Ce massage consiste à effectuer des mouvements sur l’ensemble du crâne, du visage sans oublier le dos.
Il possède de nombreuses vertus et réduit les tensions du quotidien, notamment liées à nos rythmes de vie stressants et fatigants. Il améliore la qualité du sommeil, atténue les maux de tête et favorise la concentration idéale en période d’examen.
Tarifs : 45 min : 55.00 € / 60 min : 70.00 €

### id=4 - Le Vitalité
Accroche : Une technique de massage dynamique visant à tonifier, relâcher et favoriser la circulation sanguine et lymphatique.
Contenu : Les gestes dynamiques visent à optimiser les performances physiques mais également une meilleure récupération post évènement sportif. Par son effet tonifiant et relaxant, ce massage favorise la circulation sanguine et l’élimination des toxines. Les douleurs diminuent et l’amplitude des mouvements s’améliore. Le corps relâché envoie un message au cerveau amenant un bien être global de la personne.
Tarifs : 60 min : 70.00 € / 80 min : 90.00 €

### id=5 - L’énergisant
Accroche : Le massage aux pierres chaudes apporte un réconfort et un bien être immédiat.
Contenu : C’est un massage saisonnier en Automne-Hiver. Cette technique utilise des pierres de basalte d’origine volcanique. Une fois chauffées, la chaleur irradie le corps et permet de détoxifier l’organisme, d’atténuer les tensions musculaires et de remonter le taux énergétique.
Tarifs : 60 min : 75.00 € / 80 min : 85.00 €

### id=6 - Massage des 5 continents
Accroche : Ce voyage sensoriel mélange différentes techniques pendant 1h30 et y mélange des huiles essentielles ainsi qu’ un soins énergétique en Reiki.
Contenu : Ce massage se déroule en deux temps :
La première partie a des vertus de détoxification du corps. Les mouvements appuyés et l’utilisation de frictions donnent l’opportunité de se débarrasser de ce qui nous encombre.
La deuxième partie est spécifique pour le lâcher prise et l’unification.
Tarif : 90 min : 95.00 €

### id=7 - Massage en Réflexologie plantaire de Bien-être
Accroche : En activant les différentes zones reflexes dans le pied, cette technique active le système lymphatique et améliore la circulation sanguine. Très apprécié en forte chaleur.
Contenu : Le massage Bien-être se différencie de la réflexologie car la praticienne ne pose pas de diagnostique énergétique. IL est cependant reconnu pour divers bienfaits physiques et psychologiques visant à retrouver de la légèreté, une détente et un regain d’énergie en libérant les toxines pouvant être accumulées dans les membres inférieurs.
Tarifs : 45 min : 50.00 € / 60 min : 60.00 €

### id=8 - Massage dans l’accompagnement des Séniors
Accroche : S’effectue en EHPAD, foyer logement ou établissement médico-social. Ce massage aide à détendre les muscles, apaise l’esprit, atténue les raideurs et redonne du mouvement aux articulations.
Contenu : A tout âge, le massage a des vertus sur le corps et l’esprit de la personne. Les maladies de vieillesse génèrent des douleurs, une mobilité qui diminue, de l’anxiété, des troubles du sommeil.
En retrouvant ce contact par le toucher, la personne âgée retrouve du plaisir, de la détente, un état de bien-être.
Il s’adapte aux besoins de la personne en fonction de son degré d’autonomie. La personne peut s’installer dans un fauteuil, un lit ou une table de massage sans avoir à se déshabiller.
Les zones massées seront à déterminer avant la séance (visage, nuque, épaules, pieds) d’une durée de 30min à 60 min.
Tarifs : « Tarifs uniquement sur devis »

---

## Page : Offrir un massage (carte cadeau)
- URL : https://horizondessens.fr/carte_cadeau
- Structure : bandeau titre > image `img/carte_cadeau.png` + texte + lien de téléchargement > pied de page.

# Offrir un massage
Fil d'Ariane : Accueil / Offrir un massage

Image : `img/carte_cadeau.png` (alt vide)
## CARTE CADEAU
Avec cette carte cadeau, offrez un embarquement immédiat pour la détente.
Votre Soin est valable 6 mois à compter de sa date d'achat.
Lien : **Télécharger la carte cadeau** -> `img/carte_cadeau.png` (fichier image, pas de montant ni de formulaire d'achat en ligne)

---

## Page : Programme de fidélité
- URL : https://horizondessens.fr/fidelite
- Structure : bandeau titre > H2 + liste de 4 offres > image `img/about-us/2.jpg` > pied de page.

# Programme de fidélité
Fil d'Ariane : Accueil (lien `index.html`) / Programme de fidélité

## Notre programme de fidélité
- Engagement sur 3 massages (Sur mesure, Sérénité, Vitalité, Relaxant) de 60 min 65.00 € le massage
- Engagement sur 6 massages (Sur mesure, Sérénité, Vitalité, Relaxant) de 60 min 60.00 € le massage
- Massage Découverte (Relaxant) de 60 min 63.00 € (- 10 %)
- Massage Découverte (Relaxant) de 80 min 81.00 € (- 10 %)

---

## Page : À propos
- URL : https://horizondessens.fr/about-us
- Structure : bandeau titre > image `img/about-us/1.jpg` + texte « Qui suis-je ? » > image `img/about-us/2.jpg` > pied de page.

# À propos
Fil d'Ariane : Accueil (lien `index.html`) / À propos

## Qui suis-je ?
Je vous accompagne dans une reconnexion profonde entre le corps, l’esprit et les émotions, grâce à des soins de massage bien-être pensés comme de véritables temps de pause et de recentrage.

Mon approche est douce, intuitive et personnalisée : chaque séance est un espace pour relâcher les tensions, apaiser le mental et écouter ce que le corps a à exprimer.

Depuis septembre 2025, j’ai enrichi ma pratique avec le Kobido, soin du visage japonais ancestral, reconnu pour ses effets à la fois relaxants, énergétiques et revitalisants. Bien plus qu’un soin esthétique, le Kobido agit sur l’ensemble du corps et favorise une profonde harmonie intérieure.

Un moment pour vous reconnecter à votre corps… et à vous-même.

Au cours de l’année 2017, je suis initiée au 1er degré et 2nd degré de Reiki dans la tradition du système USUI de guérison naturelle. Cette méthode très ancienne m’est transmise par un Maître Reiki Christian BLASZCZYK.

La bienveillance et le soutien de mes enseignants, de mon entourage m’aident à prendre une forte décision.

Je quitte le système hospitalier à la fin de l’année 2017 pour débuter le cursus professionnel en Massage Bien-Être.

Aujourd’hui mon objectif est atteint.

Vivre de ma passion, continuer d’affiner ma pratique et vous amener vers un état d’équilibre, de bien-être et de sérénité.

(Le Kobido n'est présent sur aucune autre page : ni prestation, ni tarif.)

---

## Page : Contact
- URL : https://horizondessens.fr/contact-us
- Structure : pas de bandeau titre ; H1 + coordonnées + formulaire + 2 images (`img/about-us/4.jpg`, `img/about-us/3.jpg`) > pied de page. Chargement de Google Maps (gmap3) dans le code, aucune carte iframe repérée.

# Contactez-moi !
- 43 bis Av. de la République, 37700 Saint-Pierre-des-Corps (lien https://g.page/horizon-des-sens?share, target _blank)
- +33 6 76 95 90 03
- e.nguyen@horizondessens.fr

Formulaire `#contactForm` (POST, validation JS via `mail/js/contact-form-script.js`), non rempli. Champs : Nom (`fname`, text, placeholder « Nom »), Prénom (`lname`, text, « Prénom »), Adresse e-mail (`email`, « Adresse e-mail »), Message (textarea `message`, « Votre message », erreur « Merci de saisir votre message ! »), bouton submit.

---

## Page : Rendez-vous en ligne
- URL : https://horizondessens.fr/rdv
- Structure : barre du haut + menu, puis uniquement le widget de réservation SimplyBook.me (iframe, script `//widget.simplybook.it/v2/widget/widget.js`, URL `https://horizondessens.simplybook.it`, timeline "modern", datepicker "top_calendar"), puis pied de page. Aucun texte propre à la page. Contenu interne du widget (services, créneaux) non lu car hors domaine horizondessens.fr.

---

## Annexe : inventaire des images (URL relatives à https://horizondessens.fr/)

| Fichier | Où | Alt |
|---|---|---|
| img/logo_hds.png | menu (alt "Logo", width 78) et pied de page (alt vide, 50 %) de toutes les pages | Logo / vide |
| img/services/0.jpg à 8.jpg | /massage (cartes), fond de bandeau de chaque massage-details?id=N ; 4.jpg aussi en bannière d'accueil, 2.jpg en fond du bloc newsletter | vide |
| img/about-us/5.jpg | Accueil (avant « Les Bienfaits ») | vide |
| img/about-us/1.jpg | À propos | vide |
| img/about-us/2.jpg | À propos, Programme de fidélité | vide |
| img/about-us/3.jpg, 4.jpg | Contact | vide |
| img/carte_cadeau.png | Carte cadeau (image + cible du lien de téléchargement) | vide |
| img/bg/title-bg.jpg | fond des bandeaux titre (massage, carte_cadeau, fidelite, about-us) | (CSS) |
| img/favicon/* | favicons (16/32/96, apple-icon 57 à 180, android 192, manifest.json) | - |

## Annexe : liens externes (non suivis)
- https://www.facebook.com/horizondessens.fr/
- https://www.instagram.com/horizon.des.sens/
- https://www.kodoka.fr/ (agence web, crédit du pied de page)
- https://g.page/horizon-des-sens?share (fiche Google, page Contact)
- https://horizondessens.simplybook.it (widget RDV)
- Ressources techniques : Google Fonts, cdnjs Font Awesome, maps.google.com (API, clé présente dans le code source, non reproduite ici), oss.maxcdn.com (shims IE).

## Pages inaccessibles / limites
- /sitemap.xml, /robots.txt et /mentions-legales : 404. Aucune page mentions légales, CGV, blog, témoignages trouvée ; ni SIRET ni moyens de paiement mentionnés.
- WebFetch refusant la transcription verbatim, le contenu a été extrait du HTML brut via curl (fidèle). Le rendu visuel n'a pas été inspecté dans le navigateur : l'ordre des sections vient du source HTML.
- Contenu du widget SimplyBook (services/créneaux) non visité (domaine externe). Meta description de /rdv non vérifiée. Les fichiers de CSS n'ont pas été analysés en détail (palette déduite des occurrences les plus fréquentes).
