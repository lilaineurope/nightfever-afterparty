# Club headers in the pink/black halftone (Lisa, 27 Nov 2026, "H1 pink halftone for all 33"): re-tints a header that is already in our
# black photocopy halftone - the mid tones and the lights get the pink screen, like the drawn nights.
# python3 scripts/page-headers/club-pink.py <repo root> <in.webp> <out.webp> [strength 0.85]
import sys, os, importlib.util, numpy as np, cv2
from PIL import Image
ROOT=sys.argv[1]; SRC=sys.argv[2]; OUT=sys.argv[3]; STRENGTH=float(sys.argv[4]) if len(sys.argv)>4 else 1.0
spec=importlib.util.spec_from_file_location('pb',os.path.join(ROOT,'scripts','polaroid-box.py')); pb=importlib.util.module_from_spec(spec); sys.argv=['x']; spec.loader.exec_module(pb)
im=Image.open(SRC).convert('RGB'); s=np.asarray(im,np.float32); H,W=s.shape[:2]
L=s.mean(2)/255
tone=cv2.GaussianBlur(L,(0,0),3.2)
lo,hi=np.percentile(tone,2),np.percentile(tone,98); g=np.clip((tone-lo)/(hi-lo),0,1)
R,G,B=[cv2.GaussianBlur(s[...,i],(0,0),3.2) for i in range(3)]
old=np.clip(np.minimum(R-G,(B-G)*1.6)/60,0,1)
# pink lives in the mid tones and the lights' glow, like the drawn nights
mid=np.clip(1-np.abs(g-0.52)/0.34,0,1); mid=mid*mid*(3-2*mid)
p=np.clip(np.maximum(old,mid*0.95*STRENGTH),0,1)
k=np.clip((1-g)*1.08-0.05,0,1)*(1-p*0.55)
cell=6.5*W/1920*1.25
mk=pb.screen(k.astype(np.float32),cell,45); mp=pb.screen(np.clip(p*0.95+0.12,0,1).astype(np.float32),cell*1.23,15)
out=pb.PAPER*np.ones_like(s)
out=out*(1-mp[...,None])+out*(pb.PINK/255)*mp[...,None]
out=out*(1-mk[...,None])+pb.INK*mk[...,None]
Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(OUT,quality=88)
