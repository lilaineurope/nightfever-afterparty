"""Episode box picture (house style from S03E06 Eric Goode on):
Makos-style background (torn black-and-white scraps, tape, zigzag scribbles, gold) with a wide hot-pink dry-brush
stroke, and the guest's portrait in black and white with ONE element in colour (e.g. hair, lipstick, glasses,
a scarf), cut out with a solid pink sticker edge, as big as James St. James's box: head top ~34% down, figure
about three quarters of the box wide, running off the bottom and right edges.

usage: episode-box.py <portrait> <out.jpg> <seed> [width_frac=0.78] [head_top=0.34] [inpaint=x0,y0,x1,y1 fractions or -] [mask.png]
"""
import os, sys, numpy as np, cv2
from PIL import Image
from rembg import remove, new_session

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import portrait_sticker as ps  # noqa: E402

S = 2048


def accent_only(img, sat_min=70):
    """Strict black and white except the coloured accent (pixels clearly saturated)."""
    a = np.asarray(img.convert("RGB")).astype(np.float32)
    hsv = cv2.cvtColor(a.astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
    keep = np.clip((hsv[..., 1] - sat_min) / 40.0, 0, 1)
    keep = cv2.GaussianBlur(keep, (0, 0), 1.2)[..., None]
    g = (0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2])[..., None].repeat(3, 2)
    return Image.fromarray(np.clip(a * keep + g * (1 - keep), 0, 255).astype("uint8"))


def inpaint_light_strokes(img, box):
    """Remove light handwriting on a dark area inside box (fractions x0,y0,x1,y1)."""
    a = np.asarray(img.convert("RGB")).copy(); h, w = a.shape[:2]
    x0, y0, x1, y1 = [int(v * (w if i % 2 == 0 else h)) for i, v in enumerate(box)]
    g = cv2.cvtColor(a, cv2.COLOR_RGB2GRAY)
    roi = g[y0:y1, x0:x1]
    th = cv2.morphologyEx(roi, cv2.MORPH_TOPHAT, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
    m = (th > 28).astype(np.uint8) * 255
    m = cv2.dilate(m, np.ones((5, 5), np.uint8))
    full = np.zeros((h, w), np.uint8); full[y0:y1, x0:x1] = m
    return Image.fromarray(cv2.inpaint(a, full, 7, cv2.INPAINT_TELEA))


def build(portrait, out, seed, width_frac=0.78, head_top=0.34, inpaint=None, mask=None):
    im = Image.open(portrait).convert("RGB")
    if inpaint:
        im = inpaint_light_strokes(im, inpaint)
    im = accent_only(im)
    sess = new_session("isnet-general-use")
    m = Image.open(mask).convert('L').resize(im.size, Image.LANCZOS) if mask else remove(im, session=sess, only_mask=True)
    o = im.convert("RGBA"); o.putalpha(m)
    tmp = out + ".cut.png"; o.save(tmp)
    # scale: figure width = width_frac of the box
    pw = int(S * width_frac); ph = int(im.height * pw / im.width)
    st = ps.sticker(tmp, ph, fade_left=0.22, solid=True)
    # head top row in the sticker
    alpha = np.asarray(st.getchannel("A"))
    rows = np.where((alpha > 128).mean(axis=1) > 0.02)[0]
    top = rows[0] if len(rows) else 0
    y = int(S * head_top) - top
    x = S - st.width + 60
    ps.bm.build(out + ".bg.jpg", seed)
    bg = Image.open(out + ".bg.jpg").convert("RGBA").resize((S, S), Image.LANCZOS)
    bg.alpha_composite(st, (x, y)) if y >= 0 else bg.alpha_composite(st.crop((0, -y, st.width, st.height)), (x, 0))
    bg.convert("RGB").resize((1024, 1024), Image.LANCZOS).save(out, quality=82, optimize=True, progressive=True)
    for f in (tmp, out + ".bg.jpg"):
        try: os.remove(f)
        except OSError: pass
    print("ok", out)


if __name__ == "__main__":
    a = sys.argv
    ip = [float(v) for v in a[6].split(",")] if len(a) > 6 and a[6] != "-" else None
    build(a[1], a[2], int(a[3]), float(a[4]) if len(a) > 4 else 0.78, float(a[5]) if len(a) > 5 else 0.34, ip, a[7] if len(a) > 7 else None)
