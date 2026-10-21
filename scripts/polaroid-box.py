"""Polaroid episode-box picture generator (Lisa, 21 Oct 2026).

Square 1024x1024 photo for the polaroid-style episode boxes:
  - background unique to the guest: a pink/black halftone photocopy of that episode's OWN references collage,
    with torn paper scraps typed with the episode's top references (from src/data/<id>.json);
  - the guest portrait (black and white with one colour accent) cut out cleanly, head ~9% from the top,
    running off the bottom edge, with a thick solid pink sticker edge - nothing of the old background bleeds in.

Usage:  python3 scripts/polaroid-box.py <episode-id> <portrait> <collage> <out.jpg> [--crop x0,y0,x1,y1] [--seed N]
           [--accent-red]   (keep only red tones in colour, e.g. Patricia Field's hair; everything else black and white)
           [--composite]    (portrait is an old box/card picture: strip its pink/gold sticker and collage first)
Needs rembg (isnet-general-use), opencv-python, numpy, pillow and the Archivo Black / Special Elite woff2 fonts
from node_modules/@fontsource (converted on the fly with fontTools).
"""
import argparse, io, json, os, sys
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = 1024
PINK = np.array([236, 64, 150], np.float32)
INK = np.array([28, 26, 26], np.float32)
PAPER = np.array([237, 231, 220], np.float32)
HOST_OR_CITY = {"James St. James", "Fenton Bailey", "Randy Barbato", "New York", "World of Wonder", "World of Wonder (WOW)"}


def font(name, size):
    from fontTools.ttLib import TTFont
    path = os.path.join(ROOT, "node_modules/@fontsource", name, "files", f"{name}-latin-400-normal.woff")  # zlib woff (no brotli needed)
    f = TTFont(path); f.flavor = None; buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, size)


def screen(tone, cell, angle, ss=2):
    H, W = tone.shape
    big = np.asarray(Image.fromarray((tone * 255).astype(np.uint8)).resize((W * ss, H * ss), Image.BILINEAR), np.float32) / 255
    yy, xx = np.mgrid[0:H * ss, 0:W * ss].astype(np.float32) / ss
    a = np.deg2rad(angle); u = xx * np.cos(a) + yy * np.sin(a); v = -xx * np.sin(a) + yy * np.cos(a)
    du = (u / cell) % 1 - 0.5; dv = (v / cell) % 1 - 0.5; d = np.sqrt(du * du + dv * dv)
    r = np.sqrt(np.clip(big, 0, 1) / np.pi) * 1.05
    m = np.clip((r - d) * cell * ss * 0.9 + 0.5, 0, 1)
    return np.asarray(Image.fromarray((m * 255).astype(np.uint8)).resize((W, H), Image.BOX), np.float32) / 255


def halftone(img, size=(B, B)):
    """Black halftone plus a pink spot-colour halftone from the picture's own pinks and reds."""
    img = img.convert("RGB").resize(size, Image.LANCZOS)
    s = np.asarray(img, np.float32)
    g = np.asarray(ImageOps.autocontrast(img.convert("L"), cutoff=2), np.float32) / 255
    R, G, Bl = s[..., 0], s[..., 1], s[..., 2]
    pinkness = np.maximum(np.clip(np.minimum(R - G, (Bl - G) * 1.6) / 90, 0, 1), np.clip((R - G - 100) / 60, 0, 1) * np.clip((R - Bl - 70) / 60, 0, 1))
    k = np.clip((1 - g) * 1.05 - 0.04, 0, 1) * (1 - pinkness * 0.55)
    mk = screen(k, 6.5, 45); mp = screen(np.clip(pinkness * 0.95 + 0.12, 0, 1), 8, 15)
    out = PAPER * np.ones_like(s)
    out = out * (1 - mp[..., None]) + out * (PINK / 255) * mp[..., None]
    out = out * (1 - mk[..., None]) + INK * mk[..., None]
    return out


def scraps(out, labels, rng, spots=None, scale=1.0):
    """Torn paper scraps with the episode's top references typed on them, in the upper corners."""
    im = Image.fromarray(out.clip(0, 255).astype(np.uint8)).convert("RGBA")
    Hh, Ww = out.shape[:2]
    spots = spots or [(0.04, 0.05), (0.60, 0.04), (0.03, 0.30), (0.66, 0.26)]
    styles = [("archivo-black", 30, (251, 250, 246), (28, 26, 26)), ("special-elite", 30, (28, 26, 26), (251, 250, 246)),
              ("archivo-black", 28, (236, 64, 150), (255, 255, 255)), ("special-elite", 30, (242, 220, 140), (28, 26, 26))]
    for (fx, fy), label, (fname, size, bg, fg) in zip(spots, labels, styles):
        size = int(size * scale); f = font(fname, size); text = label.upper() if fname == "archivo-black" else label
        w = int(f.getlength(text)) + 28; h = size + 22
        tile = Image.new("RGBA", (w, h), bg + (255,)); d = ImageDraw.Draw(tile)
        d.text((14, 9), text, font=f, fill=fg + (255,))
        a = np.full((h, w), 255, np.uint8)  # torn left/right edges
        for y in range(h):
            a[y, :rng.integers(0, 6)] = 0; a[y, w - rng.integers(0, 6):] = 0
        tile.putalpha(Image.fromarray(a))
        tile = tile.rotate(float(rng.uniform(-6, 6)), expand=True, resample=Image.BICUBIC)
        sh = Image.new("RGBA", tile.size, (0, 0, 0, 0)); sh.putalpha(tile.split()[3].point(lambda v: v * 90 // 255))
        x = int(min(fx * Ww, Ww - tile.width - 8)); y = int(fy * Hh)
        im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(3)), (x + 3, y + 5)); im.alpha_composite(tile, (x, y))
    return np.asarray(im.convert("RGB"), np.float32)


def cutout(img, composite):
    from rembg import remove, new_session
    sess = new_session("isnet-general-use")
    rgb = np.asarray(img.convert("RGB"))
    a = (np.asarray(remove(img.convert("RGB"), session=sess, post_process_mask=True))[..., 3] > 128).astype(np.uint8)
    if composite:  # drop the old pink sticker edge and gold flecks so the old collage never comes along
        R, G, Bl = [rgb[..., i].astype(np.int16) for i in range(3)]
        a &= ~(((R - G) > 70) & ((Bl - G) > 10)) & ~(((R - Bl) > 60) & ((G - Bl) > 30))
        a = cv2.morphologyEx(a.astype(np.uint8), cv2.MORPH_OPEN, np.ones((7, 7), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(a)
    big = st[1:, cv2.CC_STAT_AREA].max()
    a = np.isin(lab, [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] > 0.06 * big]).astype(np.uint8)
    a = cv2.morphologyEx(a, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
    H, W = a.shape; ff = a.copy(); m = np.zeros((H + 2, W + 2), np.uint8); cv2.floodFill(ff, m, (0, 0), 1); a = a | (1 - ff)
    if composite: a = cv2.erode(a, np.ones((5, 5), np.uint8))
    return rgb.astype(np.float32), a


def accent_red(rgb):
    hsv = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
    keep = (((hsv[..., 0] < 10) | (hsv[..., 0] > 170)) & (hsv[..., 1] > 110) & (hsv[..., 2] > 60)).astype(np.float32)
    keep = cv2.GaussianBlur(keep, (9, 9), 0)[..., None]
    grey = cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2GRAY).astype(np.float32)[..., None].repeat(3, 2)
    return rgb * keep + grey * (1 - keep)


def cut_sides(a, band=4, share=0.08):
    """Which sides of the source picture cut through the figure (a clean straight cut, like a cropped photo)."""
    ys, xs = np.where(a > 0); fh = ys.max() - ys.min() + 1; h0, w0 = a.shape
    col = lambda c0, c1: (a[:, c0:c1].max(1) > 0).sum()
    return {"left": xs.min() <= band and col(0, band + 1) > share * fh,
            "right": xs.max() >= w0 - 1 - band and col(w0 - 1 - band, w0) > share * fh,
            "bottom": ys.max() >= h0 - 1 - band}


def place(rgb, a, W, H, head, cx, width=0.0, zoom=1.0, align=True):
    """Scale the cut-out so the head starts at `head` of the height (or to a figure width), head centred on cx.
    With align (Lisa, 22 Oct 2026): where the portrait has a clean cut on a side (the figure runs out of its own
    picture, like Chi Chi & Johnny or Rudolf), that cut lines up with the polaroid's edge instead of floating
    inside the photo with a pink outline - both sides cut: the figure fills the width edge to edge."""
    ys, xs = np.where(a > 0); top = ys.min(); h0, w0 = a.shape
    sides = cut_sides(a) if align else {"left": False, "right": False, "bottom": False}
    k = (H * (1 - head)) / (h0 - top) if not width else (W * width) / (xs.max() - xs.min())
    k *= zoom  # >1 = bigger figure, the body runs off the bottom edge
    if sides["left"] and sides["right"]: k = W / (xs.max() - xs.min() + 1)
    nw, nh = int(w0 * k), int(h0 * k)
    img = np.asarray(Image.fromarray(rgb.clip(0, 255).astype(np.uint8)).resize((nw, nh), Image.LANCZOS), np.float32)
    ar = cv2.resize(a, (nw, nh), interpolation=cv2.INTER_NEAREST)
    hd = ar[: int((top + (h0 - top) * 0.25) * k)]
    hx = np.where(hd > 0)[1].mean() if (hd > 0).any() else nw / 2
    ox = int(W * cx - hx); oy = int(H * head - top * k)
    if sides["left"]: ox = -int(xs.min() * k) - 2
    elif sides["right"]: ox = W - int((xs.max() + 1) * k) + 2
    if sides["bottom"] and oy + int((ys.max() + 1) * k) < H: oy = H - int((ys.max() + 1) * k) + 2
    print("  clean cut on:", [s for s, v in sides.items() if v] or "none")
    can = np.zeros((H, W, 3), np.float32); ca = np.zeros((H, W), np.uint8)
    sx, sy, dx, dy = max(0, -ox), max(0, -oy), max(0, ox), max(0, oy)
    cw, ch = min(nw - sx, W - dx), min(nh - sy, H - dy)
    can[dy:dy + ch, dx:dx + cw] = img[sy:sy + ch, sx:sx + cw]; ca[dy:dy + ch, dx:dx + cw] = ar[sy:sy + ch, sx:sx + cw]
    return can, ca


def sticker(bg, can, ca, ring):
    rr = cv2.dilate(ca, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * ring + 1, 2 * ring + 1)))
    rs = cv2.GaussianBlur(rr.astype(np.float32), (3, 3), 0)[..., None]; fs = cv2.GaussianBlur(ca.astype(np.float32), (3, 3), 0)[..., None]
    out = bg * (1 - rs) + PINK * rs
    return out * (1 - fs) + can * fs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("episode"); ap.add_argument("portrait"); ap.add_argument("collage"); ap.add_argument("out")
    ap.add_argument("--crop", default=""); ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--accent-red", action="store_true"); ap.add_argument("--composite", action="store_true")
    ap.add_argument("--head", type=float, default=0.06); ap.add_argument("--zoom", type=float, default=1.25, help="figure size (1 = head to waist fits the box)"); ap.add_argument("--ring", type=int, default=24); ap.add_argument("--no-align", action="store_true", help="never line clean cuts up with the edge")
    ap.add_argument("--width", type=float, default=0.0, help="figure width as a share of the box (0 = fit by height)")
    ap.add_argument("--labels", default="", help="scrap labels separated by | (default: top references from src/data/<id>.json)")
    ap.add_argument("--header", default="", help="WxH for a wide episode header (portrait on the right) instead of the square box")
    ap.add_argument("--cx", type=float, default=0.0, help="horizontal head centre (share of the width)")
    o = ap.parse_args(); rng = np.random.default_rng(o.seed)

    W, H = (int(v) for v in o.header.split("x")) if o.header else (B, B)
    col = Image.open(o.collage).convert("RGB")
    if o.crop: col = col.crop(tuple(int(v) for v in o.crop.split(",")))
    w, h = col.size; r = W / H
    cw_, ch_ = (min(w, int(h * r)), min(h, int(w / r)))
    col = col.crop(((w - cw_) // 2, (h - ch_) // 2, (w + cw_) // 2, (h + ch_) // 2))
    bg = halftone(col, (W, H))

    if o.labels:
        labels = [l.strip() for l in o.labels.split("|") if l.strip()]
    else:
        refs = json.load(open(os.path.join(ROOT, "src/data", f"{o.episode}.json")))
        from_ep = [r["name"] for r in refs if r["category"] != "Mood" and r["name"] not in HOST_OR_CITY and r.get("status") != "Private person"]
        guest = next(e for e in json.load(open(os.path.join(ROOT, "scripts", "episode-guests.json"))) if e["id"] == o.episode)["guest"]
        labels = [n for n in from_ep if n != guest and not any(n == g for g in guest.split(" & "))][:4]
    import re
    hosts = ("James St. James", "Fenton", "Randy")
    clean = []
    for l in labels if o.labels else [n for n in from_ep if n != guest and not any(n == g for g in guest.split(" & "))]:
        l = re.split(r" \(|:|,| / | - ", l)[0].strip()
        if l and len(l) <= 22 and not any(h in l for h in hosts) and l not in clean: clean.append(l)
    labels = clean[:4]

    rgb, a = cutout(Image.open(o.portrait), o.composite)
    if o.accent_red: rgb = accent_red(rgb)
    if o.header:
        can, ca = place(rgb, a, W, H, o.head, o.cx or 0.8, o.width)
        out = sticker(bg, can, ca, max(10, o.ring * H // B))
        spots = [(0.03, 0.08), (0.36, 0.05), (0.04, 0.80), (0.42, 0.84)]
        out = scraps(out, labels, rng, spots, scale=max(0.8, H / B * 1.15))
    else:
        can, ca = place(rgb, a, W, H, o.head, o.cx or 0.5, o.width, o.zoom, not o.no_align)
        out = sticker(bg, can, ca, o.ring)  # scraps go on top, pinned to the four corners like a real collage
        out = scraps(out, labels, rng, [(0.025, 0.035), (0.99, 0.05), (0.02, 0.86), (0.99, 0.88)])
    Image.fromarray(out.clip(0, 255).astype(np.uint8)).save(o.out, quality=84, optimize=True)
    print(o.episode, "->", o.out, "scraps:", labels)


if __name__ == "__main__":
    main()
