import cv2, numpy as np, subprocess, sys
src=sys.argv[1]; out=sys.argv[2]
cx,cy,R=927.04,928.22,480.78; ht,hb=1009,1054
m=cv2.imread(src,0); H,W=m.shape
S=4  # sur-échantillonnage pour des bords nets
big=cv2.resize(m,(W*S,H*S),interpolation=cv2.INTER_LINEAR)
ink=(big<128).astype(np.uint8)*255
Y,X=np.mgrid[0:H*S,0:W*S]
y=Y/S; x=X/S
dist=np.hypot(x-cx,y-cy)
# 1) soleil : on efface l'ancien (anneau compris) puis disque parfait
ink[(dist<R+14)&(y<hb)]=0
ink[(dist<=R)&(y<=hb)]=255
# 2) horizon : bande droite, dessous dégagé
row=(m<128)[ (ht+hb)//2 ]; xs=np.where(row)[0]; xl,xr=xs.min(),xs.max()
band=(y>=ht)&(y<=hb)&(x>=xl+40)&(x<=xr-40)
ink[band]=255
ink[(y>hb)&(y<1100)]=0
# intervalles soleil / bosses : rien au-dessus de l'horizon
for a,b in [(394,450),(1401,1458)]:
    g=(x>=a)&(x<=b)&(y<ht)&(y>ht-60)&(dist>R)
    ink[g]=0
small=cv2.resize(ink,(W,H),interpolation=cv2.INTER_AREA)
cv2.imwrite(out+'.pgm',np.where(small>127,0,255).astype(np.uint8))
for be,o in [('svg',out+'-raw.svg'),('pgm',out+'-r.pgm')]:
    args=['potrace',out+'.pgm','-b',be,'-o',o,'--turdsize','40','--alphamax','1.15','--opttolerance','0.35']
    args+=['--flat'] if be=='svg' else ['-W','13in']
    subprocess.run(args,check=True)
print(xl,xr)
