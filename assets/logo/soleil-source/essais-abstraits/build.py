import math, json, sys, resvg_py
P = dict(R=190, g=26, n=9, a0=10, step=20, ro=335, tip=0.42, t=20, L=400, taper=90,
         rgap=24, rgap2=16, rt=16, segs=[[(-300,300)],[(-210,-40),(-10,190)],[(-110,120)],[(-30,40)]])
if len(sys.argv)>2: P.update(json.loads(sys.argv[2]))
cx, cy = 500, 560
def pt(r, a): return (cx + r*math.cos(math.radians(a)), cy - r*math.sin(math.radians(a)))
def f(p): return f"{p[0]:.2f} {p[1]:.2f}"
paths=[]
# soleil
R=P['R']; paths.append(f"M{f(pt(R,180))} A{R} {R} 0 0 1 {f(pt(R,0))} Z")
ri = R+P['g']
for i in range(P['n']):
    a = P['a0'] + i*P['step']
    lo, hi = a - P['step']/2, a + P['step']/2
    ol = P['g']/2
    oh = P['g']/2
    # côté gauche (angle hi) et droit (angle lo) : droites parallèles aux bissectrices, décalées
    def side(theta, off, sign, r):
        # point à distance radiale ~r sur la droite parallèle à la direction theta décalée de off vers le pétale
        d = (math.cos(math.radians(theta)), -math.sin(math.radians(theta)))
        nrm = (-d[1]*sign, d[0]*sign)
        # projeté : on cherche s tel que |base| = r
        bx, by = cx + nrm[0]*off, cy + nrm[1]*off
        s = math.sqrt(max(r*r - off*off, 0))
        return (bx + d[0]*s, by + d[1]*s)
    R0 = side(lo, ol, -1, ri); L0 = side(hi, oh, +1, ri)
    bf=P.get('bfac',1.0)
    if bf!=1.0:
        aR=math.degrees(math.atan2(cy-R0[1],R0[0]-cx)); aL=math.degrees(math.atan2(cy-L0[1],L0[0]-cx))
        R0=pt(ri,a+(aR-a)*bf); L0=pt(ri,a+(aL-a)*bf)
    Lp = P['ro'] - ri
    B = pt(ri, a)
    u = (math.cos(math.radians(a)), -math.sin(math.radians(a)))
    n = (-u[1], u[0])  # vers les angles plus faibles (côté droit)
    if (R0[0]-B[0])*n[0]+(R0[1]-B[1])*n[1] < 0: n = (-n[0], -n[1])
    hw0 = math.dist(R0, L0)/2
    rm = ri + Lp*P.get('bpos',0.42)
    hwmax = rm*math.sin(math.radians(P['step']/2)) - P['g']/2
    hwmax *= P.get('wfac',1.0)
    def loc(s_, w_): return (B[0]+u[0]*s_+n[0]*w_, B[1]+u[1]*s_+n[1]*w_)
    T = loc(Lp, 0)
    c1 = P.get('c1',0.45); c2 = P.get('c2',0.82); tw = P.get('tw',0.42)
    cR1 = loc(Lp*c1, hwmax*P.get('bul',1.3)); cR2 = loc(Lp*c2, hwmax*tw)
    cL1 = loc(Lp*c1, -hwmax*P.get('bul',1.3)); cL2 = loc(Lp*c2, -hwmax*tw)
    paths.append(f"M{f(R0)} C{f(cR1)} {f(cR2)} {f(T)} C{f(cL2)} {f(cL1)} {f(L0)} A{ri} {ri} 0 0 1 {f(R0)} Z")
# horizon : barre à bouts ronds
t,L = P['t'],P['L']; r=t/2
paths.append(f"M{cx-L+r} {cy} H{cx+L-r} A{r} {r} 0 0 1 {cx+L-r} {cy+t} H{cx-L+r} A{r} {r} 0 0 1 {cx-L+r} {cy} Z")
# reflet : rangées de segments (x début, x fin relatifs au centre)
y = cy + t + P['rgap']; rt=P['rt']
for row in P['segs']:
    for a_,b_ in row:
        x0=cx+a_; w=b_-a_; r=rt/2
        paths.append(f"M{x0+r:.2f} {y:.2f} H{x0+w-r:.2f} A{r} {r} 0 0 1 {x0+w-r:.2f} {y+rt:.2f} H{x0+r:.2f} A{r} {r} 0 0 1 {x0+r:.2f} {y:.2f} Z")
    y += rt + P['rgap2']
d="".join(f"<path d=\"{p}\"/>" for p in paths)
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="#fff"/><g fill="#000">{d}</g></svg>'
out=sys.argv[1]
open(out+'.svg','w').write(svg)
open(out+'.png','wb').write(bytes(resvg_py.svg_to_bytes(svg_string=svg, width=1000, height=1000)))
