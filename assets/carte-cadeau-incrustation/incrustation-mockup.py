"""Incruste le visuel de carte cadeau sur le mockup « main qui tient une carte ».

Perspective (4 coins ajustés sur les bords), lumière et grain repris de la
photo (le visuel est « imprimé » sur le papier d'origine), pouce au premier
plan, coins arrondis d'origine.
Usage : python incrust.py mockup.png design.png corners.json out.png [debug_dir]
"""
import json
import sys

import cv2
import numpy as np

mock_path, design_path, corners_path, out_path = sys.argv[1:5]
dbg = sys.argv[5] if len(sys.argv) > 5 else None

O8 = cv2.imread(mock_path)
H, W = O8.shape[:2]
O = O8.astype(np.float32) / 255.0
c = json.load(open(corners_path))
quad = np.array([c["tl"], c["tr"], c["br"], c["bl"]], np.float32)

# ---------- 1. Visuel : carte intérieure, fond uniformisé, ratio du mockup ----------
D8 = cv2.imread(design_path)
outer = D8[4, 4].astype(np.int32)
diff = (np.abs(D8.astype(np.int32) - outer).sum(axis=2) > 8).astype(np.uint8)
diff = cv2.morphologyEx(diff, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
# la carte occupe des lignes et colonnes entières (le bruit, non)
rows = np.where(diff.sum(axis=1) > diff.shape[1] * 0.5)[0]
cols = np.where(diff.sum(axis=0) > diff.shape[0] * 0.5)[0]
ys, xs = rows, cols
y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
card = D8[y0:y1, x0:x1].copy()
inner = np.median(card[card.shape[0] // 2 - 5 : card.shape[0] // 2 + 5, -60:-40].reshape(-1, 3), axis=0)
# coins arrondis du visuel → fond de carte (les coins viennent de la photo)
near_outer = np.abs(card.astype(np.int32) - outer).sum(axis=2) <= 6
card[near_outer] = inner
w_top = np.linalg.norm(quad[1] - quad[0])
h_left = np.linalg.norm(quad[3] - quad[0])
target_ratio = (w_top + np.linalg.norm(quad[2] - quad[3])) / (h_left + np.linalg.norm(quad[2] - quad[1]))
ch, cw = card.shape[:2]
new_h = int(round(cw / target_ratio))
if new_h > ch:  # complète en hauteur avec le fond de carte, sans déformer
    pad = new_h - ch
    card = cv2.copyMakeBorder(card, pad // 2, pad - pad // 2, 0, 0, cv2.BORDER_CONSTANT, value=inner.tolist())
else:
    new_w = int(round(ch * target_ratio))
    pad = new_w - cw
    card = cv2.copyMakeBorder(card, 0, 0, pad // 2, pad - pad // 2, cv2.BORDER_CONSTANT, value=inner.tolist())
Dsrc = card.astype(np.float32) / 255.0
Dbg = inner.astype(np.float32) / 255.0

# ---------- 2. Masque de carte : quadrilatère à coins arrondis (suréchantillonné) ----------
SS = 4
mask_hr = np.zeros((H * SS, W * SS), np.uint8)
centroid = quad.mean(axis=0)
inset = quad + (centroid - quad) / np.linalg.norm(centroid - quad, axis=1, keepdims=True) * 0.9
r = float(c.get("radius", 11.0))  # rayon des coins de la carte photographiée (px)
pts = []
for i in range(4):
    p, prev, nxt = inset[i], inset[i - 1], inset[(i + 1) % 4]
    a = p + (prev - p) / np.linalg.norm(prev - p) * r
    b = p + (nxt - p) / np.linalg.norm(nxt - p) * r
    for t in np.linspace(0, 1, 12 if r > 2 else 1):  # Bézier quadratique a → p → b
        pts.append((1 - t) ** 2 * a + 2 * (1 - t) * t * p + t ** 2 * b)
cv2.fillPoly(mask_hr, [np.round(np.array(pts) * SS).astype(np.int32)], 255, lineType=cv2.LINE_AA)
card_alpha = cv2.resize(mask_hr, (W, H), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0

# ---------- 3. Lumière de la carte et occultation (pouce) ----------
lab = cv2.cvtColor(O8, cv2.COLOR_BGR2LAB).astype(np.float32)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float64)
inside = card_alpha > 0.99
er = cv2.erode(inside.astype(np.uint8), np.ones((9, 9), np.uint8)) > 0
tz = c.get("thumb_zone", [0, 440, 470, H])  # zone où un doigt passe devant la carte
thumb_zone = (xx >= tz[0]) & (xx < tz[2]) & (yy >= tz[1]) & (yy < tz[3])
fit_px = er & ~thumb_zone
xn, yn = (xx - W / 2) / W, (yy - H / 2) / H
basis = np.stack([np.ones_like(xn), xn, yn, xn * yn, xn ** 2, yn ** 2, xn ** 2 * yn, xn * yn ** 2, xn ** 3, yn ** 3], -1)
A = basis[fit_px]
model = np.zeros(lab.shape, np.float64)
for k in range(3):
    coef, *_ = np.linalg.lstsq(A, lab[..., k][fit_px].astype(np.float64), rcond=None)
    model[..., k] = np.einsum("hwk,k->hw", basis, coef)
model = model.astype(np.float32)
# Peau du pouce = très saturée ; le papier dans l'ombre du pouce l'est moins.
hsv = cv2.cvtColor(O8, cv2.COLOR_BGR2HSV).astype(np.float32)
sat = cv2.GaussianBlur(hsv[..., 1], (0, 0), 1.2)
occ = (np.clip((sat - 178.0) / 20.0, 0, 1) * (thumb_zone & (card_alpha > 0))).astype(np.float32)
keep_bin = cv2.morphologyEx((occ > 0.5).astype(np.uint8), cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
n, lbl, st, _ = cv2.connectedComponentsWithStats(keep_bin)
keep = np.zeros_like(keep_bin)
for i in range(1, n):  # le pouce touche le bord gauche de la carte
    if st[i, cv2.CC_STAT_AREA] > 150:
        keep[lbl == i] = 1
keep = cv2.morphologyEx(keep, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
occ_soft = np.maximum(cv2.GaussianBlur(keep.astype(np.float32), (0, 0), 1.0), occ * keep)
alpha = card_alpha * (1 - occ_soft)

# Éclairage lisse (normalisé sur le papier visible) et grain = photo / éclairage.
clean = (inside & (keep == 0)).astype(np.float32)
sig = 14
num = cv2.GaussianBlur(O * clean[..., None], (0, 0), sig)
den = cv2.GaussianBlur(clean, (0, 0), sig)[..., None]
illum = num / np.maximum(den, 1e-4)
model_bgr = cv2.cvtColor(np.clip(model, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR).astype(np.float32) / 255.0
illum = np.where(den > 0.25, illum, model_bgr)
grain = np.clip(O / np.maximum(illum, 1e-3), 0.75, 1.25)
grain = np.where(clean[..., None] > 0, grain, 1.0)

# ---------- 4. Projection du visuel ----------
scale = 2.0
tw, th = int(w_top * scale), int(h_left * scale)
Dscaled = cv2.resize(Dsrc, (tw, th), interpolation=cv2.INTER_AREA)
src = np.array([[0, 0], [tw - 1, 0], [tw - 1, th - 1], [0, th - 1]], np.float32)
Hm = cv2.getPerspectiveTransform(src, quad)
Dw = cv2.warpPerspective(Dscaled, Hm, (W, H), flags=cv2.INTER_AREA, borderMode=cv2.BORDER_REPLICATE)
Dw = cv2.GaussianBlur(Dw, (0, 0), 0.45)  # même douceur que la photo

# ---------- 5. Composition : visuel « imprimé » sur le papier photographié ----------
P = np.median(illum[inside & (keep == 0)], axis=0)
lum = lambda v: 0.114 * v[0] + 0.587 * v[1] + 0.299 * v[2]
tint = (Dbg / lum(Dbg)) / (P / lum(P))
tint = 1 + 0.35 * (tint - 1)  # le papier prend la teinte rosée du visuel
ratio = np.clip(Dw / Dbg, 0, 1.2)
# Fusion « produit » : chaque pixel garde sa lumière, son ombre et son grain.
printed = O * tint * ratio
out = O * (1 - alpha[..., None]) + printed * alpha[..., None]
cv2.imwrite(out_path, np.clip(out * 255 + 0.5, 0, 255).astype(np.uint8))

if dbg:
    cv2.imwrite(dbg + "/occ.png", (keep * 255).astype(np.uint8)[400:700, 300:520])
    cv2.imwrite(dbg + "/alpha.png", (alpha * 255).astype(np.uint8))
print("ok", out_path, "ratio", round(float(target_ratio), 3), "Dbg", inner, "P", (P * 255).round())
