import sys, numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter
A="src/lib/gift-card/assets/"; out=sys.argv[1]
W,H=1530,1000
SERIF=A+"instrument-serif-latin-400-italic.woff"; SANS=A+"manrope-latin-600-normal.woff"; SANS4=A+"manrope-latin-400-normal.woff"
# fond : brun espresso, lumière douce au centre
yy,xx=np.mgrid[0:H,0:W]; d=np.sqrt(((xx-W*0.5)/W)**2+((yy-H*0.42)/H)**2)
c0=np.array([92,34,24]); c1=np.array([40,13,9]); t=(np.clip(d/0.95,0,1)**1.4)[...,None]
bg=(c0*(1-t)+c1*t).astype(np.uint8); im=Image.fromarray(bg,"RGB").convert("RGBA")
def foil(size):  # dégradé « dorure » champagne
    g=np.linspace(0,1,size[1])[:,None]*np.ones(size[0])[None]; x=np.linspace(0,1,size[0])[None]
    k=0.5+0.5*np.sin((g*1.2+x*0.8)*3.2)
    a=np.array([240,205,160]); b=np.array([190,126,82])
    return Image.fromarray((a*k[...,None]+b*(1-k[...,None])).astype(np.uint8),"RGB")
def text(s,font,xy,anchor,fill=None,track=0,foil_=False,alpha=255):
    global im
    m=Image.new("L",im.size,0); dm=ImageDraw.Draw(m)
    if track:
        w=sum(font.getlength(ch) for ch in s)+track*(len(s)-1)
        x=xy[0]-w/2 if anchor[0]=="m" else (xy[0]-w if anchor[0]=="r" else xy[0])
        for ch in s: dm.text((x,xy[1]),ch,font=font,fill=alpha,anchor="l"+anchor[1]); x+=font.getlength(ch)+track
    else: dm.text(xy,s,font=font,fill=alpha,anchor=anchor)
    layer=(foil(im.size) if foil_ else Image.new("RGB",im.size,fill)).convert("RGBA"); layer.putalpha(m)
    im=Image.alpha_composite(im,layer)
# symbole en dorure
sym=Image.open("public/images/logo/symbole.png").convert("RGBA").resize((118,118),Image.LANCZOS)
mask=Image.new("L",im.size,0); mask.paste(sym.split()[3],(W//2-59,92))
L=foil(im.size).convert("RGBA"); L.putalpha(mask); im=Image.alpha_composite(im,L)
f=lambda p,s:ImageFont.truetype(p,s)
text("HORIZON DES SENS",f(SANS,30),(W/2,250),"mm",track=9,foil_=True)
text("Carte Cadeau",f(SERIF,210),(W/2,495),"mm",foil_=True)
text("une heure rien que pour vous",f(SERIF,68),(W/2,642),"mm",fill=(236,186,166),alpha=220)
# bas : bénéficiaire et numéro
text("OFFERT À",f(SANS,20),(120,808),"lm",fill=(226,178,132),track=6,alpha=200)
text("Marie Dupont",f(SERIF,64),(116,870),"lm",fill=(246,230,214))
text("N° HDS-7K3M-Q9PX",f(SANS4,22),(W-120,870),"rm",fill=(226,178,132),track=4,alpha=200)
im.convert("RGB").save(out)
