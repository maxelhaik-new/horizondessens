import re, cv2, numpy as np, resvg_py
def tidy(raw, pgm, out):
    s=open(raw).read(); m=cv2.imread(pgm,0)
    ys,xs=np.where(m<128); pad=4
    x0,y0,x1,y1=xs.min()-pad,ys.min()-pad,xs.max()+1+pad,ys.max()+1+pad
    g=re.search(r'<g transform="([^"]+)"',s).group(1)
    d=" ".join(p.replace("\n"," ") for p in re.findall(r'<path d="([^"]+)"',s))
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0} {y0} {x1-x0} {y1-y0}" role="img" aria-label="Horizon des Sens">\n<g transform="{g}" fill="currentColor"><path d="{d}"/></g>\n</svg>\n'
    open(out,'w').write(svg); return svg,(x1-x0)/(y1-y0)
def clean_from_build(src,out):
    s=open(src).read()
    s=s.replace('<rect width="1000" height="1000" fill="#fff"/>','').replace('<g fill="#000">','<g fill="currentColor">')
    # recadrage via rendu
    png=bytes(resvg_py.svg_to_bytes(svg_string=open(src).read(),width=1000,height=1000))
    m=cv2.imdecode(np.frombuffer(png,np.uint8),0); ys,xs=np.where(m<128); pad=1
    s=s.replace('viewBox="0 0 1000 1000"',f'viewBox="{xs.min()-pad} {ys.min()-pad} {xs.max()+1-xs.min()+2*pad} {ys.max()+1-ys.min()+2*pad}" role="img" aria-label="Horizon des Sens"')
    open(out,'w').write(s); return s
def png1000(svg, out, box=820):
    s=svg.replace('currentColor','#000')
    vb=[float(v) for v in re.search(r'viewBox="([^"]+)"',s).group(1).split()]
    r=vb[2]/vb[3]; w,h=(box,round(box/r)) if r>=1 else (round(box*r),box)
    p=bytes(resvg_py.svg_to_bytes(svg_string=s,width=w,height=h))
    im=cv2.imdecode(np.frombuffer(p,np.uint8),cv2.IMREAD_UNCHANGED)
    a=im[:,:,3].astype(np.float32)/255 if im.shape[2]==4 else (255-im[:,:,0])/255
    h,w=a.shape; c=np.full((1000,1000),255,np.float32); y=(1000-h)//2; x=(1000-w)//2
    c[y:y+h,x:x+w]=255*(1-a); cv2.imwrite(out,c.astype(np.uint8))
    return c
org,_=tidy('ink1-raw.svg','ink1.pgm','symbole-soleil-organique.svg')
net=clean_from_build('final-clean.svg','symbole-soleil-net.svg')
A=png1000(org,'symbole-soleil-organique-1000.png'); B=png1000(net,'symbole-soleil-net-1000.png')
# test petites tailles
row=[]
for im in (A,B):
    for sz in (128,48,24):
        t=cv2.resize(im,(sz,sz),interpolation=cv2.INTER_AREA); t=cv2.resize(t,(sz*3,sz*3),interpolation=cv2.INTER_NEAREST)
        canvas=np.full((390,390),255,np.float32); canvas[:t.shape[0],:t.shape[1]]=t; row.append(canvas)
cv2.imwrite('small.png',np.hstack(row).astype(np.uint8))
print(len(org),len(net))
