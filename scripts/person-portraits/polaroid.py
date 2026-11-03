"""Person polaroids (Lisa, 29 Oct 2026) - the polaroid look for people who are mentioned but are not guests.

Background (Lisa's pick "1 big dots"): an extreme close-up of a few mirror tiles from the Jukebox disco ball
(disco-ball-source.jpg, a Gemini picture), slightly soft, printed with BIG black halftone dots on paper with hard contrast,
the ball's own pink lights as pink dots. Every person now uses the SAME locked background (STANDARD_BG, Lisa 29 Oct 2026);
the part of the ball and the angle are picked from a name, so it is the same every time it is rebuilt.
Portrait: a retouched studio portrait (black and white, one colour element), cut out with the pink sticker edge and four
torn scraps, then the instant-print frame (scripts/polaroid-frame.py).

Usage: python3 scripts/person-portraits/polaroid.py "<Name>" <studio portrait> <out photo.jpg> <out framed.jpg>
          --labels "A|B|C|D" --code "210 MENTIONS" --line "Pop artist · POPism · Interview" [--zoom 1.0 --head 0.07]
"""
import argparse, hashlib, importlib.util, os, subprocess, sys
import numpy as np, cv2
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
spec = importlib.util.spec_from_file_location("pb", os.path.join(ROOT, "scripts", "polaroid-box.py")); pb = importlib.util.module_from_spec(spec); spec.loader.exec_module(pb)
B = 1024
# Lisa, 29 Oct 2026: ONE background for every person from now on - the disco-ball close-up first made for Randy Barbato
# (same tiles, same angle). Only Andy Warhol keeps his own Brillo-box background.
STANDARD_BG = "Randy Barbato"


def background(name):
    src = np.asarray(Image.open(os.path.join(HERE, "disco-ball-source.jpg")).convert("RGB"))
    H, W = src.shape[:2]
    h = int(hashlib.md5(name.encode()).hexdigest(), 16)
    rnd = lambda i, lo, hi: lo + (hi - lo) * (((h >> (i * 12)) & 0xFFF) / 0xFFF)
    cx, cy = rnd(0, 0.32, 0.6), rnd(1, 0.32, 0.55)
    ang = rnd(2, 4, 16) * (1 if (h >> 40) & 1 else -1)
    M = cv2.getRotationMatrix2D((cx * W, cy * H), ang, 1.0)
    r = cv2.warpAffine(src, M, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
    side = int(H * 0.30); x0 = int(cx * W - side / 2); y0 = int(cy * H - side / 2)
    img = cv2.resize(r[y0:y0 + side, x0:x0 + side], (B, B), interpolation=cv2.INTER_CUBIC)
    img = cv2.GaussianBlur(img, (0, 0), 6).astype(np.float32)
    g = np.clip((img.mean(2) / 255 - 0.45) * 1.6 + 0.45, 0, 1)
    R, G, Bl = img[..., 0], img[..., 1], img[..., 2]
    pink = np.clip(np.minimum(R - G - 10, (Bl - G) * 1.5) / 55, 0, 1)
    k = np.clip(1 - g, 0, 1) * (1 - pink * 0.75)
    mk = pb.screen(k.astype(np.float32), 22, 45)
    mp = pb.screen(np.clip(pink * 0.62 + 0.05 * (1 - k), 0, 1).astype(np.float32), 22, 45)
    paper = np.array([246, 240, 236], np.float32)
    out = paper * np.ones((B, B, 3), np.float32)
    out = out * (1 - mp[..., None]) + (pb.PINK * 0.92) * mp[..., None]
    return out * (1 - mk[..., None]) + np.array([22, 16, 18], np.float32) * mk[..., None]


def touches_sides(ca, edge=0.10):
    """True when the body reaches (within 10%) both side edges along the bottom of the photo."""
    row = ca[-1] > 0; e = int(len(row) * edge)
    return bool(row[:e].any() and row[-e:].any())


def fill_place(rgb, a, zoom, head, fill=True):
    """Lisa, 3 Nov 2026: shoulders must never just stop inside the picture. Grow the figure (up to 1.3x, so
    the face never fills the polaroid) until the body reaches both side edges at the bottom of the photo.
    If it still doesn't, the source picture is too narrow: it says so, and that person needs a wider picture."""
    z = zoom
    can, ca = pb.place(rgb, a, B, B, head, 0.5, 0.0, z, True)
    while fill and not touches_sides(ca) and z < max(zoom, 1.3):
        z = round(z + 0.04, 2)
        can, ca = pb.place(rgb, a, B, B, head, 0.5, 0.0, z, True)
    ok = touches_sides(ca)
    print("  zoom used:", z, "| shoulders reach both edges:", ok, "" if ok or not fill else "-> NEEDS A WIDER PICTURE")
    return can, ca


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("name"); ap.add_argument("portrait"); ap.add_argument("out"); ap.add_argument("framed")
    ap.add_argument("--labels", default=""); ap.add_argument("--code", default=""); ap.add_argument("--line", default="")
    ap.add_argument("--bg-name", default="", help="override the standard background (default: the locked one, STANDARD_BG)")
    ap.add_argument("--zoom", type=float, default=1.0); ap.add_argument("--head", type=float, default=0.07); ap.add_argument("--seed", type=int, default=5)
    ap.add_argument("--no-fill", action="store_true", help="skip the shoulder rule (keep the zoom as given)")
    o = ap.parse_args()
    bg = background(o.bg_name or STANDARD_BG)
    rgb, a = pb.cutout(Image.open(o.portrait), False)
    can, ca = fill_place(rgb, a, o.zoom, o.head, not o.no_fill)
    out = pb.sticker(bg, can, ca, 24)
    labels = [l.strip() for l in o.labels.split("|") if l.strip()]
    out = pb.scraps(out, labels, np.random.default_rng(o.seed), [(0.025, 0.035), (0.99, 0.05), (0.02, 0.86), (0.99, 0.88)])
    Image.fromarray(out.clip(0, 255).astype(np.uint8)).save(o.out, quality=88)
    subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "polaroid-frame.py"), o.out, o.name, o.code, o.framed, o.line], check=True, capture_output=True)
    print(o.name, "->", o.out, o.framed)


if __name__ == "__main__":
    main()
