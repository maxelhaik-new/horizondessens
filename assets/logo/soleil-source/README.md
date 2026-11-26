# Symbole soleil : sources

Tracé fidèle de `midjourney-source.webp` (Maxime, 26/11/2026) : formes d'origine conservées (rayons « bouteille », bosses, reflet et ses ovales), contours nettoyés.

1. `prep2.py source.webp mask.png` : seuil (Otsu sur l'image ×4, fond du papier retiré), grain bouché, taches isolées retirées.
2. `csmooth2.py <sigma reflet>` : lissage des contours le long du tracé (sigma 12 pour les rayons, 11 retenu pour le reflet), sans arrondir les formes. Lit `crop.pgm` (masque recadré).
3. `geo.py cs12.pgm <nom>` : soleil remplacé par le cercle ajusté sur son arc (centre 927 / 928, rayon 481, en px ×4), horizon redressé (bande 1009–1054), puis potrace.
4. `final.py` (fonctions `tidy` et `png1000`) : recadrage, `fill="currentColor"`, PNG 1000 × 1000.

Dépendances : numpy, scipy, opencv-python-headless, resvg-py, potrace (Homebrew).
`essais-abstraits/` : redessin géométrique (pétales en lotus), écarté par Maxime (trop abstrait).
