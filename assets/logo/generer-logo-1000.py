import sys
from PIL import Image, ImageDraw, ImageFont
sym_path, font_path, out = sys.argv[1:4]
W = H = 1000
SS = 4  # suréchantillonnage pour des bords propres
canvas = Image.new("L", (W*SS, H*SS), 255)  # blanc

# Symbole : alpha du PNG détouré = forme ; recadré serré
sym = Image.open(sym_path).split()[-1]
sym = sym.crop(sym.getbbox())
sym_h = 460 * SS
sym = sym.resize((round(sym.width * sym_h / sym.height), sym_h), Image.LANCZOS)

# Nom : LT Superior Serif Medium, largeur cible ~780 px
text = "Horizon des Sens"
target_w = 740 * SS
size = 100
font = ImageFont.truetype(font_path, size)
w = font.getlength(text)
size = round(size * target_w / w)
font = ImageFont.truetype(font_path, size)
bbox = font.getbbox(text)  # (x0, y0, x1, y1) relatif au point d'origine
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

gap = 45 * SS
block_h = sym.height + gap + th
top = (H*SS - block_h) // 2
canvas.paste(0, ((W*SS - sym.width)//2, top), sym)
d = ImageDraw.Draw(canvas)
d.text(((W*SS - tw)//2 - bbox[0], top + sym.height + gap - bbox[1]), text, font=font, fill=0)

canvas.resize((W, H), Image.LANCZOS).convert("RGB").save(out, optimize=True)
print(out, "taille police", size // SS, "px")
