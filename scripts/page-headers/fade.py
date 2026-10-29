# Page header pictures (Jukebox, Library, A–Z - Lisa, 29 Oct 2026): a Gemini photo turned into the pink/black photocopy halftone with pixel fades.
# PHOTO=<gemini.jpeg> OUT=out.png [TOPFADE=260] [START=0.42 EXT=500 LEN=520] python3 scripts/page-headers/fade.py
import os
import importlib.util, sys, os, numpy as np, cv2
from PIL import Image
spec=importlib.util.spec_from_file_location('pb',os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'polaroid-box.py')); pb=importlib.util.module_from_spec(spec); sys.argv=['x']; spec.loader.exec_module(pb)
PHOTO=os.environ['PHOTO']; OUT=os.environ['OUT']; EXT=int(os.environ.get('EXT','1500')); START=float(os.environ.get('START','0.45'))
ph=Image.open(PHOTO).convert('RGB'); W=1920; H=round(ph.height*W/ph.width)
src=np.asarray(ph.resize((W,H),Image.LANCZOS),np.float32)
# 1) extend the PHOTO (not the halftone) downwards: its lower part stretched and blurred, melted into the picture
tail=src[int(H*0.6):]
ext=cv2.GaussianBlur(cv2.resize(tail,(W,EXT),interpolation=cv2.INTER_LINEAR),(0,0),30)
img=np.concatenate([src,ext],0); HH=img.shape[0]
blur=cv2.GaussianBlur(img,(0,0),30)
r=np.arange(HH,dtype=np.float32); w=np.clip((r-H*0.5)/(H*0.6),0,1); w=(w*w*(3-2*w))[:,None,None]
img=img*(1-w)+blur*w
# 2) one halftone over the whole tall picture, so the dots never change texture
ht=pb.halftone(Image.fromarray(np.clip(img,0,255).astype(np.uint8)),(W,HH))
# 3) colour drifts to pink then pale pink; alpha dissolves in dots
FS=int(H*START); LEN=float(os.environ.get('LEN',str(HH-FS))); t=np.clip((r-FS)/LEN,0,1); s=t*t*(3-2*t); T=s[:,None]*np.ones((1,W),np.float32)
pink=np.array([236,64,150],np.float32); pale=np.array([240,205,220],np.float32)
k1=np.clip(T*1.4,0,1)[...,None]*0.75; k2=np.clip((T-0.35)/0.65,0,1)[...,None]
col=ht*(1-k1)+pink*k1; col=col*(1-k2)+pale*k2
dots=pb.screen(np.clip(1-T**1.1,0,1).astype(np.float32),10,45)
m=np.clip(T/0.55,0,1); m=m*m*(3-2*m); a=1-m*(1-dots)
TOP=int(os.environ.get('TOPFADE','0'))
if TOP:
    rows=np.arange(HH,dtype=np.float32); u=np.clip(rows/TOP,0,1); u=(u*u*(3-2*u))[:,None]*np.ones((1,W),np.float32)
    up=pb.screen(u.astype(np.float32),12,45); a=a*np.where(u<1,up,1)
Image.fromarray(np.dstack([np.clip(col,0,255),np.clip(a,0,1)*255]).astype(np.uint8),'RGBA').save(OUT)
print(W,HH)
