# A–Z card header (Lisa, 30 Oct 2026: "more abstract, like the polaroid background from people"): the person-polaroid
# background - an extreme close-up of the Jukebox disco ball's mirror tiles printed with big black halftone dots on paper and
# its pink lights as pink dots - stretched to a wide header whose dots shrink to nothing at the top and bottom (a halftone fade).
# OUT=out.png [CELL=22] [MODE=paper|light|pink] (the A–Z cards use MODE=pink CELL=26) [CX=0.45 CY=0.42 ANG=9 ZOOM=0.30] python3 scripts/page-headers/dots.py
import importlib.util, os, sys
import numpy as np, cv2
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
spec = importlib.util.spec_from_file_location("pb", os.path.join(ROOT, "scripts", "polaroid-box.py")); pb = importlib.util.module_from_spec(spec); sys.argv = ["x"]; spec.loader.exec_module(pb)
E = os.environ; OUT = E["OUT"]; CELL = int(E.get("CELL", "22")); MODE = E.get("MODE", "paper")
W, H = 1920, int(E.get("H", "1000"))
src = np.asarray(Image.open(os.path.join(ROOT, "scripts/person-portraits/disco-ball-source.jpg")).convert("RGB"))
sh, sw = src.shape[:2]
cx, cy, ang, zoom = float(E.get("CX", "0.45")), float(E.get("CY", "0.42")), float(E.get("ANG", "9")), float(E.get("ZOOM", "0.30"))
M = cv2.getRotationMatrix2D((cx * sw, cy * sh), ang, 1.0)
r = cv2.warpAffine(src, M, (sw, sh), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
cw = int(sh * zoom * W / 1024); ch = int(cw * H / W)  # same tile size as the 1024px person polaroids
x0 = int(np.clip(cx * sw - cw / 2, 0, sw - cw)); y0 = int(np.clip(cy * sh - ch / 2, 0, sh - ch))
img = cv2.resize(r[y0:y0 + ch, x0:x0 + cw], (W, H), interpolation=cv2.INTER_CUBIC)
img = cv2.GaussianBlur(img, (0, 0), 6).astype(np.float32)
g = np.clip((img.mean(2) / 255 - 0.45) * 1.6 + 0.45, 0, 1)
R, G, Bl = img[..., 0], img[..., 1], img[..., 2]
pink = np.clip(np.minimum(R - G - 10, (Bl - G) * 1.5) / 55, 0, 1)
k = np.clip(1 - g, 0, 1) * (1 - pink * 0.75)
p = np.clip(pink * 0.62 + 0.05 * (1 - k), 0, 1)
if MODE == "pink": p, k = np.clip(p + (1 - g) * 0.6, 0, 1), np.clip(k - 0.45, 0, 1) * 1.4   # pink tiles, ink only in the deepest shadows
if MODE == "light": k = k * 0.62                                              # lighter print: more paper, so the name reads
# halftone fade: coverage shrinks to nothing at the top (TOP px) and from FS to the bottom
y = np.arange(H, dtype=np.float32)[:, None]
TOP, FS = int(E.get("TOP", "140")), int(E.get("FS", str(int(H * 0.45))))
up = np.clip(y / TOP, 0, 1); up = up * up * (3 - 2 * up)
dn = 1 - np.clip((y - FS) / (H - FS), 0, 1); dn = dn * dn * (3 - 2 * dn)
f = (up * dn).astype(np.float32)
paper = np.array([228, 223, 213], np.float32); ink = np.array([22, 16, 18], np.float32)
if True:
    mk = pb.screen((k * f).astype(np.float32), CELL, 45)
    mp = pb.screen((p * f).astype(np.float32), CELL, 45)
    out = paper * np.ones((H, W, 3), np.float32)
    out = out * (1 - mp[..., None]) + (pb.PINK * 0.92) * mp[..., None]
    out = out * (1 - mk[..., None]) + ink * mk[..., None]
# transparent where nothing is printed, so the page's own paper and grain show through
alpha = np.clip(np.maximum(mk, mp), 0, 1)
Image.fromarray(np.dstack([np.clip(out, 0, 255), alpha * 255]).astype(np.uint8), "RGBA").save(OUT)
print(OUT, W, H)
