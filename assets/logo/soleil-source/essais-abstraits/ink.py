import sys, cv2, numpy as np, resvg_py, subprocess, re
svg=open('final-clean.svg').read()
N=4000
png=bytes(resvg_py.svg_to_bytes(svg_string=svg,width=N,height=N))
im=cv2.imdecode(np.frombuffer(png,np.uint8),cv2.IMREAD_GRAYSCALE).astype(np.float32)/255
ink=(im<0.5).astype(np.uint8)
# distance signée (px à 4000)
din=cv2.distanceTransform(ink,cv2.DIST_L2,5); dout=cv2.distanceTransform(1-ink,cv2.DIST_L2,5)
sd=din-dout
rng=np.random.default_rng(7)
def noise(sig):
    n=rng.standard_normal((N,N)).astype(np.float32); n=cv2.GaussianBlur(n,(0,0),sig); return n/n.std()
outs=[]
for name,amp,sg in [('ink1',3.0,50),('ink2',5.0,60)]:
    nz=noise(sg)
    m=sd+amp*nz
    b=np.where(m>0,0,255).astype(np.uint8)
    # arrondit très légèrement les pointes (rayon ~1,5 px à 1000)
    k=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(9,9))
    b=255-cv2.morphologyEx(255-b,cv2.MORPH_OPEN,k)
    cv2.imwrite(f'{name}.pgm',b)
    subprocess.run(['potrace',f'{name}.pgm','-b','svg','-o',f'{name}-raw.svg','--turdsize','20','--alphamax','1.15','--opttolerance','0.3','--flat'],check=True)
    subprocess.run(['potrace',f'{name}.pgm','-b','pgm','-o',f'{name}-r.pgm','--turdsize','20','--alphamax','1.15','--opttolerance','0.3','-W','13.89in'],check=True)
    outs.append(name)
c=cv2.imread('a.png',0)
tiles=[c[150:620,60:940]]+[cv2.imread(f'{n}-r.pgm',0)[150:620,60:940] for n in outs]
cv2.imwrite('cmp-ink.png',np.hstack(tiles))
# zoom sur un détail
z=[cv2.resize(t[0:230,560:880],None,fx=1.6,fy=1.6) for t in tiles]
cv2.imwrite('cmp-ink-zoom.png',np.hstack(z))
print(cv2.imread('ink1-r.pgm',0).shape)
