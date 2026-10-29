import importlib.util, sys, os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec=importlib.util.spec_from_file_location('pb',f'{ROOT}/scripts/polaroid-box.py'); pb=importlib.util.module_from_spec(spec); sys.argv=['x']; spec.loader.exec_module(pb)
OUT=sys.argv[1] if len(sys.argv)>1 else '.'
W,H=1920,720
def skyline(twin=True, seed=3):
    rnd=random.Random(seed)
    m=np.zeros((H,W),np.uint8)  # building mask
    shade=np.zeros((H,W),np.float32) # 0..1 darkness inside buildings
    img=Image.new('L',(W,H),0); d=ImageDraw.Draw(img)
    base=H
    def box(x,w,h,tone):
        d.rectangle([x,base-h,x+w,base],fill=tone)
    # background filler (lighter)
    x=0
    while x<W:
        w=rnd.randint(30,80); h=rnd.randint(140,330); box(x,w,h,150); x+=w-rnd.randint(0,10)
    # mid filler
    x=0
    while x<W:
        w=rnd.randint(40,95); h=rnd.randint(90,240); box(x,w,h,205); x+=w+rnd.randint(-8,6)
    # landmarks (dark)
    L=[]
    # Empire State ~ x 1150
    def empire(cx):
        for (w,h) in [(150,330),(118,390),(86,440),(56,470),(34,495),(20,515)]: box(cx-w//2,w,h,235)
        d.polygon([(cx-5,base-515),(cx+5,base-515),(cx,base-585)],fill=235)
    def chrysler(cx):
        for (w,h) in [(110,300),(80,360)]: box(cx-w//2,w,h,235)
        for i,(w) in enumerate([64,52,40,28,18]):
            d.pieslice([cx-w//2,base-360-28*i-w//2,cx+w//2,base-360-28*i+w//2],180,360,fill=235)
            box(cx-w//2,w,28,235) if False else None
        d.polygon([(cx-30,base-360),(cx+30,base-360),(cx,base-500)],fill=235)
        d.polygon([(cx-3,base-500),(cx+3,base-500),(cx,base-545)],fill=235)
    def twins(cx):
        box(cx-70,58,500,235); box(cx+12,58,490,235)
        box(cx-44,6,70,235) if False else d.rectangle([cx-42,base-570,cx-40,base-500],fill=235)
    def tower(cx,w,h,crown=None):
        box(cx-w//2,w,h,235)
        if crown=='step':
            box(cx-w//3,2*w//3,24,235) ; d.rectangle([cx-w//3,base-h-24,cx+w//3,base-h],fill=235)
        if crown=='point': d.polygon([(cx-w//2,base-h),(cx+w//2,base-h),(cx,base-h-60)],fill=235)
    if twin: twins(330)
    else: tower(330,90,410,'step')
    tower(500,70,300,'point'); tower(620,80,260)
    tower(860,90,350,'step'); chrysler(1000); tower(1080,70,300); empire(1300)
    tower(1480,95,330,'step'); tower(1620,70,270,'point'); tower(1760,110,250); tower(160,80,280,'step')
    # foreground low row (darkest)
    x=0
    while x<W:
        w=rnd.randint(60,140); h=rnd.randint(40,120); box(x,w,h,250); x+=w+rnd.randint(-10,4)
    a=np.asarray(img,np.float32)/255
    mask=a>0.05
    # windows: lighter dots grid in buildings
    yy,xx=np.mgrid[0:H,0:W]
    win=((yy%14)<5)&((xx%11)<4)
    lit=np.random.default_rng(seed).random((H//14+1,W//11+1))[yy//14,xx//11]<0.35
    tone=a.copy()
    tone[mask&win&lit]*=0.35
    return tone,mask
def topline(mask,lift=12):
    ys=np.full(W,H,np.int32)
    has=mask.any(0); first=np.argmax(mask,0); ys[has]=first[has]
    pts=[]
    for x in range(W):
        y=ys[x]-lift
        if pts and pts[-1][1]!=y: pts.append((x,pts[-1][1]))  # square steps
        pts.append((x,y))
    return pts
def render(name, sky='paper', twin=True, line=('pink',9), seed=3, torn=False):
    tone,mask=skyline(twin,seed)
    # build an RGB "photo" for the halftone: darkness -> dark grey, sky gradient
    g=np.linspace(0,1,H)[:,None]*np.ones((1,W))
    rgb=np.zeros((H,W,3),np.float32)
    if sky in ('paper','clean'):
        skyc=np.stack([255-25*g,255-25*g,255-25*g],-1)
    elif sky=='pink':
        # pink dusk: strong pink at the horizon, fading up to paper
        t=np.clip(g*1.3,0,1)[...,None]
        skyc=(1-t)*np.array([250,245,240])+t*np.array([240,70,150])
    elif sky=='night':
        skyc=np.stack([25+45*g]*3,-1)
    rgb[:]=skyc
    build=np.stack([255*(1-tone)]*3,-1)*(0.9 if sky!='night' else 0.35)+ (0 if sky!='night' else 0)
    rgb[mask]=build[mask]
    im=Image.fromarray(np.clip(rgb,0,255).astype(np.uint8))
    out=pb.halftone(im,(W,H))
    if sky=='clean':
        # sky = the page's own paper, so the skyline looks cut out and pasted on
        above=np.zeros((H,W),bool)
        has=mask.any(0); first=np.where(has,np.argmax(mask,0),H)
        yy=np.arange(H)[:,None]; above=yy<(first[None,:]-2)
        res=Image.fromarray(np.clip(out,0,255).astype(np.uint8)).convert('RGBA')
        al=np.where(above,0,255).astype(np.uint8); res.putalpha(Image.fromarray(al))
    else:
        res=Image.fromarray(np.clip(out,0,255).astype(np.uint8))
    if line[0]=='sticker':
        import cv2
        ring=line[1]
        m8=mask.astype(np.uint8)
        rr=cv2.dilate(m8,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*ring+1,2*ring+1)))
        rs=cv2.GaussianBlur(rr.astype(np.float32),(3,3),0)[...,None]; fs=cv2.GaussianBlur(m8.astype(np.float32),(3,3),0)[...,None]
        base=np.asarray(res.convert('RGB'),np.float32)
        build=base.copy()
        o=base*(1-rs)+pb.PINK*rs
        o=o*(1-fs)+build*fs
        res=Image.fromarray(np.clip(o,0,255).astype(np.uint8))
        res.save(f'{OUT}/{name}.jpg',quality=88); return res
    d=ImageDraw.Draw(res)
    col,wd=line
    c=tuple(int(v) for v in (pb.PINK if col=='pink' else pb.INK))
    pts=topline(mask)
    if col=='pink-ink':
        d.line(pts,fill=tuple(int(v) for v in pb.INK),width=wd+6,joint='curve'); d.line(pts,fill=tuple(int(v) for v in pb.PINK),width=wd,joint='curve')
    else:
        d.line(pts,fill=c,width=wd,joint='curve')
    if torn:
        # torn paper bottom edge
        rnd=random.Random(5); edge=[(0,H)]
        for x in range(0,W+20,20): edge.append((x,H-rnd.randint(4,22)))
        edge.append((W,H))
        d.polygon(edge,fill=tuple(int(v) for v in pb.PAPER))
    if res.mode=='RGBA': res.save(f'{OUT}/{name}.png')
    else: res.save(f'{OUT}/{name}.jpg',quality=86)
    return res
os.makedirs(OUT,exist_ok=True)
render('A-photocopy-paper-sky', sky='paper', twin=True, line=('pink',9))
render('B-pink-dusk', sky='pink', twin=True, line=('pink-ink',8))
render('C-night', sky='night', twin=True, line=('pink',10))
render('D-paper-no-twin-towers', sky='paper', twin=False, line=('pink',9))
render('E-cut-out', sky='clean', twin=True, line=('pink',9))
render('C-night-sticker', sky='night', twin=True, line=('sticker',17))
render('C-night-sticker-thick', sky='night', twin=True, line=('sticker',28))
print('done')
