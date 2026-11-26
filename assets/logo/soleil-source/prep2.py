import sys, cv2, numpy as np
from scipy import ndimage as ndi
src, out = sys.argv[1], sys.argv[2]
g = cv2.imread(src, cv2.IMREAD_GRAYSCALE).astype(np.float32)
print("encre", np.percentile(g,1), "papier", np.percentile(g,60))
S = 4
g = cv2.resize(g, None, fx=S, fy=S, interpolation=cv2.INTER_CUBIC)
# fond : on retire les variations lentes du papier
bg = cv2.GaussianBlur(g, (0,0), 60)
n = g / np.maximum(bg,1) * 220
b = cv2.GaussianBlur(n, (0,0), 2.2)   # 0,55 px d'origine : garde les aspérités, gomme le grain
thr, _ = cv2.threshold(b.clip(0,255).astype(np.uint8), 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
print("seuil otsu", thr)
ink = b < thr
# trous blancs enfermés et petits = grain dans l'encre -> bouchés
holes = ndi.binary_fill_holes(ink) & ~ink
lab, nb = ndi.label(holes)
sizes = ndi.sum(holes, lab, range(1, nb+1))
small = np.isin(lab, np.where(sizes < 2500)[0] + 1)   # < ~250 px² d'origine
print("trous bouchés", int((sizes<4000).sum()), "gardés", int((sizes>=4000).sum()), sorted(sizes[sizes>=4000].astype(int)))
ink |= small
# taches noires isolées
lab, nb = ndi.label(ink)
sizes = ndi.sum(ink, lab, range(1, nb+1))
print("composantes", nb, "tailles >", sorted(sizes.astype(int))[-25:])
keep = np.isin(lab, np.where(sizes >= 600)[0] + 1)
cv2.imwrite(out, np.where(keep, 0, 255).astype(np.uint8))
