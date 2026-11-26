import cv2, numpy as np, subprocess, sys
from scipy.ndimage import gaussian_filter1d
m = cv2.imread('crop.pgm',0)            # 4x, encre = 0, soleil bouché
ink = (m<128).astype(np.uint8)
def smooth(sig, name):
    cs, hier = cv2.findContours(ink, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    out = np.zeros_like(ink)
    polys_out=[]; polys_in=[]
    for i,c in enumerate(cs):
        p = c[:,0,:].astype(np.float64)
        if len(p) < 20: continue
        if hier[0][i][3]>=0 and p[:,1].mean()<1009: continue  # trous au-dessus de l'horizon : bouchés
        sg = sig if p[:,1].mean() < 1070 else WSIG
        if sg: p = np.stack([gaussian_filter1d(p[:,0],sg,mode='wrap'), gaussian_filter1d(p[:,1],sg,mode='wrap')],1)
        (polys_in if hier[0][i][3]>=0 else polys_out).append(np.round(p*4).astype(np.int32))
    big = np.zeros((ink.shape[0]*4, ink.shape[1]*4), np.uint8)
    cv2.fillPoly(big, polys_out, 255, lineType=cv2.LINE_AA, shift=0)
    if polys_in: cv2.fillPoly(big, polys_in, 0)
    big = cv2.resize(big, (ink.shape[1], ink.shape[0]), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f'{name}.pgm', np.where(big>127,0,255).astype(np.uint8))
    subprocess.run(['potrace',f'{name}.pgm','-b','svg','-o',f'{name}-raw.svg','--turdsize','40','--alphamax','1.15','--opttolerance','0.35','--flat'],check=True)
    subprocess.run(['potrace',f'{name}.pgm','-b','pgm','-o',f'{name}-r.pgm','--turdsize','40','--alphamax','1.15','--opttolerance','0.35','-W','11in'],check=True)
    return cv2.imread(f'{name}-r.pgm',0)
WSIG=float(sys.argv[1]) if len(sys.argv)>1 else 4
tiles=[]
for s in [12]:
    r=smooth(s,f'cs{s}'); cv2.putText(r,f'{s}',(10,40),cv2.FONT_HERSHEY_SIMPLEX,1.2,0,2); tiles.append(r)
h=min(t.shape[0] for t in tiles); w=min(t.shape[1] for t in tiles); tiles=[t[:h,:w] for t in tiles]
cv2.imwrite('cmp-cs.png', np.vstack([np.hstack(tiles[:2]),np.hstack(tiles[2:])]))
# zoom rayons
z=[cv2.resize(t[int(h*0.0):int(h*0.45), int(w*0.5):int(w*0.95)],None,fx=1.0,fy=1.0) for t in tiles]
cv2.imwrite('cmp-cs-zoom.png', np.vstack([np.hstack(z[:2]),np.hstack(z[2:])]))
