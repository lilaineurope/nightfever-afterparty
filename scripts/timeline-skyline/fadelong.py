import os
import importlib.util, sys
import numpy as np
from PIL import Image
spec=importlib.util.spec_from_file_location('pb',os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'polaroid-box.py')); pb=importlib.util.module_from_spec(spec); sys.argv=['x']; spec.loader.exec_module(pb)
import os
SRC=os.environ.get('SRC','C-night.jpg'); TAG=os.environ.get('TAG','')
src=np.asarray(Image.open(SRC).convert('RGB'),np.float32)
H,W,_=src.shape; EXT=1500
band=src[H-180:H]; reps=[]
while sum(r.shape[0] for r in reps)<EXT: reps+= [band[::-1],band]
img=np.concatenate([src]+reps,0)[:H+EXT]; HH=img.shape[0]
FS=H-60
t=np.clip((np.arange(HH)-FS)/(HH-FS),0,1)[:,None]*np.ones((1,W),np.float32)
dots=pb.screen(np.clip(1-t**0.75,0,1).astype(np.float32),14,45)
alpha=np.where(t>0,dots,1)
def save(rgb,a,name):
    Image.fromarray(np.dstack([np.clip(rgb,0,255),np.clip(a,0,1)*255]).astype(np.uint8),'RGBA').save(name)
# L1: the same ink dots all the way down
save(img,alpha,f'L1-ink-dots{TAG}.png')
# L2: the dots soften into pale pink as they go down, so text stays readable
pink=np.array([236,64,150],np.float32); paperish=np.array([235,200,215],np.float32)
k=np.clip((t-0.05)/0.5,0,1)[...,None]
col=img*(1-k)+ (pink*(1-k*0.6)+paperish*(k*0.6))*k
save(col,alpha*(1-0.45*np.clip(t*1.4,0,1)),f'L2-pink-fade{TAG}.png')
print(HH)
