"""Dessine le recto de la carte cadeau « premium » (fond roche rouge, dorure).

Mise en page commune : src/lib/gift-card/card-layout.json (aussi lue par le
PDF et l'aperçu de la page de remerciement). Polices : celles du PDF
(src/lib/gift-card/assets/). Logo : masque généré par `npm run assets:brand`.

Usage (depuis la racine du projet) :
  python dessin-carte-premium.py fond   sortie.jpg [échelle]  -> fond + logo + titre (PDF)
  python dessin-carte-premium.py exemple sortie.png [échelle] -> carte remplie (mockups)
"""
import json
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

mode, out = sys.argv[1], sys.argv[2]
S = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
A = "src/lib/gift-card/assets/"
L = json.load(open("src/lib/gift-card/card-layout.json"))
W, H = round(L["width"] * S), round(L["height"] * S)
SERIF_IT = A + "goudy-italic.woff"
SANS = A + "source-sans-3-400.woff"
SANS_SB = A + "source-sans-3-600.woff"


def rgb(h):
    return np.array([int(h[i : i + 2], 16) for i in (1, 3, 5)], float)


# Fond : brun roche, lumière douce au centre
yy, xx = np.mgrid[0:H, 0:W]
d = np.sqrt(((xx - W * 0.5) / W) ** 2 + ((yy - H * 0.42) / H) ** 2)
t = (np.clip(d / 0.95, 0, 1) ** 1.4)[..., None]
c0, c1 = rgb(L["background"]["center"]), rgb(L["background"]["edge"])
im = Image.fromarray((c0 * (1 - t) + c1 * t).astype(np.uint8)).convert("RGBA")


def foil_layer():  # dégradé « dorure » sable cuivré
    g = np.linspace(0, 1, H)[:, None] * np.ones(W)[None]
    x = np.linspace(0, 1, W)[None]
    k = (0.5 + 0.5 * np.sin((g * 1.2 + x * 0.8) * 3.2))[..., None]
    a, b = rgb(L["foil"]["light"]), rgb(L["foil"]["dark"])
    return Image.fromarray((a * k + b * (1 - k)).astype(np.uint8)).convert("RGBA")


FOIL = foil_layer()


def paint(mask, fill=None, opacity=1.0):
    """Peint `mask` (L) avec la dorure ou une couleur unie."""
    global im
    layer = FOIL.copy() if fill is None else Image.new("RGBA", (W, H), tuple(rgb(fill).astype(int)) + (255,))
    if opacity < 1:
        mask = mask.point(lambda v: round(v * opacity))
    layer.putalpha(mask)
    im = Image.alpha_composite(im, layer)


def text(spec, s, font_path, anchor_x="l", fill=None):
    """Texte posé sur sa ligne de base (ancres « ls », « ms », « rs »)."""
    font = ImageFont.truetype(font_path, round(spec["size"] * S))
    track = spec.get("tracking", 0) * S
    m = Image.new("L", (W, H), 0)
    dm = ImageDraw.Draw(m)
    y = spec["baseline"] * S
    if anchor_x == "m":
        x = spec["cx"] * S
    elif anchor_x == "r":
        x = spec["right"] * S
    else:
        x = spec["x"] * S
    if track:
        w = sum(font.getlength(ch) for ch in s) + track * (len(s) - 1)
        x = x - w / 2 if anchor_x == "m" else (x - w if anchor_x == "r" else x)
        for ch in s:
            dm.text((x, y), ch, font=font, fill=255, anchor="ls")
            x += font.getlength(ch) + track
    else:
        dm.text((x, y), s, font=font, fill=255, anchor=anchor_x + "s")
    paint(m, fill or spec.get("color"), spec.get("opacity", 1.0))


# Logo (symbole + nom) en dorure
logo = Image.open("assets/carte-cadeau-incrustation/premium/logo-masque.png").split()[3]
lw = round(L["logo"]["width"] * S)
logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
m = Image.new("L", (W, H), 0)
m.paste(logo, (round(L["logo"]["cx"] * S - lw / 2), round(L["logo"]["top"] * S)))
paint(m)

# Titre en dorure
t_ = L["title"]
text(t_, t_["text"], SERIF_IT, "m", fill=None)
im_fond = im

if mode == "exemple":
    text(L["tagline"], "une heure rien que pour vous", SERIF_IT, "m")
    r = L["recipientLabel"]
    text(r, r["text"], SANS_SB, "l")
    text(L["recipient"], "Marie Dupont", SERIF_IT, "l")
    text(L["code"], "N° HDS-7K3M-Q9PX", SANS, "r")

out_im = im.convert("RGB")
if out.endswith(".jpg"):
    out_im.save(out, quality=90, optimize=True)
else:
    out_im.save(out)
print(out, out_im.size)
