"""Episode box background in the Makos style: navy paper, torn black-and-white paper scraps,
masking tape, pink crayon scribbles, gold splatter and gold-leaf flakes. Drawn at 2x, saved 1024.
Optional: a cut-out portrait PNG (alpha) placed bottom right with a solid pink sticker edge.
usage: box_makos.py out.jpg seed [portrait.png] [scale] [dx] [dy]"""
import sys, math, random
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFilter

S = 2048
NAVY = (16, 22, 48)
PINK = (236, 72, 160)
GOLD = (214, 170, 72)
TAPE = (226, 214, 180)


def paper(r):
    a = np.ones((S, S, 3)) * np.array(NAVY, float)
    a += r.normal(0, 6, (S, S, 1))
    fib = cv2.GaussianBlur(r.normal(0, 1, (S, S)).astype(np.float32), (0, 0), 1.6) * 9
    a += fib[..., None]
    v = cv2.GaussianBlur(r.random((S // 32, S // 32)).astype(np.float32), (0, 0), 2)
    a += cv2.resize(v, (S, S))[..., None] * 20 - 10
    return Image.fromarray(np.clip(a, 0, 255).astype("uint8")).convert("RGBA")


def smooth_noise(rr, n, amp):
    v = [rr.uniform(-1, 1) for _ in range(n // 6 + 3)]
    out = []
    for i in range(n):
        f = i / 6; k = int(f); t = f - k
        out.append((v[k] * (1 - t) + v[k + 1] * t) * amp + rr.uniform(-amp * 0.25, amp * 0.25))
    return out


def torn_poly(rr, w, h, jag=14):
    pts = []
    for side in range(4):
        L = w if side % 2 == 0 else h
        n = max(8, int(L / 10))
        off = smooth_noise(rr, n, jag)
        for i in range(n):
            t = i / n
            if side == 0: x, y = t * w, off[i]
            elif side == 1: x, y = w + off[i], t * h
            elif side == 2: x, y = w - t * w, h + off[i]
            else: x, y = off[i], h - t * h
            pts.append((x + jag * 2, y + jag * 2))
    return pts


def scrap(rr, r, w, h):
    """A torn piece of black-and-white printed photo / newsprint: mostly dark, stark highlights, no text."""
    J = 14
    W, H = w + 4 * J, h + 4 * J
    def nz(sig):
        z = cv2.GaussianBlur(r.normal(0, 1, (H, W)).astype(np.float32), (0, 0), sig)
        return z / (z.std() + 1e-6)
    crumple = nz(2.5) * 0.35 + nz(9) * 0.45 + nz(28) * 0.6
    base = rr.uniform(105, 160) if rr.random() < 0.2 else rr.uniform(14, 60)
    a = base + crumple * rr.uniform(20, 38)
    ridge = np.abs(nz(7)) < 0.05  # crumple ridges catching the light
    a = np.where(ridge, a + rr.uniform(70, 130), a)
    hi = nz(14) + nz(40) * 0.8  # a few stark photo highlights
    a = np.where(hi > rr.uniform(2.3, 2.9), rr.uniform(170, 215), a).astype(np.float32)
    for _ in range(rr.randint(0, 3)):  # creases / light streaks
        x = rr.uniform(0, W)
        cv2.line(a, (int(x), 0), (int(x + rr.uniform(-40, 40)), H), float(rr.choice([20, 230])), rr.randint(2, 6))
    a = cv2.GaussianBlur(a, (0, 0), rr.uniform(0.8, 2.0))
    a += r.normal(0, 16, (H, W)).astype(np.float32)
    if rr.random() < 0.4:  # halftone screen
        yy, xx = np.mgrid[0:H, 0:W]
        a *= 0.8 + 0.2 * ((np.sin(xx * 0.7) * np.sin(yy * 0.7)) > 0)
    a = np.clip(a, 0, 255).astype("uint8")
    img = Image.fromarray(np.dstack([a, a, a])).convert("RGBA")
    m = Image.new("L", (W, H), 0)
    poly = torn_poly(rr, w, h, jag=J)
    ImageDraw.Draw(m).polygon(poly, fill=255)
    if rr.random() < 0.6:  # white torn rim on some edges
        rim = Image.new("L", (W, H), 0)
        k = len(poly); s0 = rr.randint(0, k - 1); seg = [poly[(s0 + i) % k] for i in range(rr.randint(k // 4, k // 2))]
        ImageDraw.Draw(rim).line(seg, fill=255, width=rr.randint(5, 11))
        rim = Image.fromarray(np.minimum(np.asarray(rim), np.asarray(m)))
        img.paste(Image.new("RGBA", (W, H), (234, 230, 220, 255)), (0, 0), rim)
    img.putalpha(m)
    return img


def scribble(img, rr, cx, cy, w, h, ang, width=(8, 10, 12)):
    lay = Image.new("RGBA", (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    n = rr.randint(8, 14)
    pts = []
    for i in range(n):
        t = i / (n - 1)
        x = -w / 2 + t * w + rr.uniform(-14, 14)
        y = (h / 2 if i % 2 else -h / 2) + rr.uniform(-18, 18)
        pts.append((cx + x * math.cos(ang) - y * math.sin(ang), cy + x * math.sin(ang) + y * math.cos(ang)))
    for _ in range(2):
        q = [(x + rr.uniform(-5, 5), y + rr.uniform(-5, 5)) for x, y in pts]
        d.line(q, fill=PINK + (235,), width=rr.choice(width), joint="curve")
    a = np.asarray(lay).copy()
    g = (np.random.default_rng(rr.randint(0, 9999)).random((S, S)) > 0.38).astype(np.float32)
    a[..., 3] = (a[..., 3] * cv2.GaussianBlur(g, (0, 0), 0.9)).astype("uint8")
    img.alpha_composite(Image.fromarray(a))


def loops(img, rr, cx, cy, rx, ry, turns=5):
    """Crayon coil scribble: tall overlapping loops drifting sideways."""
    lay = Image.new("RGBA", (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    pts = []; step = rr.uniform(22, 40)
    for i in range(turns * 30):
        t = i / 30 * 2 * math.pi
        pts.append((cx + rx * math.cos(t) * rr.uniform(0.9, 1.1) + i * step / 30 * 2.2 - turns * step, cy + ry * math.sin(t) * rr.uniform(0.92, 1.08)))
    for _ in range(2):
        q = [(x + rr.uniform(-3, 3), y + rr.uniform(-3, 3)) for x, y in pts]
        d.line(q, fill=PINK + (230,), width=rr.choice([7, 9, 11]), joint="curve")
    a = np.asarray(lay).copy()
    g = (np.random.default_rng(rr.randint(0, 9999)).random((S, S)) > 0.38).astype(np.float32)
    a[..., 3] = (a[..., 3] * cv2.GaussianBlur(g, (0, 0), 0.9)).astype("uint8")
    lay = Image.fromarray(a).rotate(rr.uniform(-40, 40), center=(cx, cy), resample=Image.BICUBIC)
    img.alpha_composite(lay)


def splatter(img, rr, cx, cy, n=60, spread=90):
    d = ImageDraw.Draw(img)
    for _ in range(n):
        r_ = abs(rr.gauss(0, spread)); a = rr.uniform(0, 2 * math.pi)
        x, y = cx + r_ * math.cos(a), cy + r_ * math.sin(a)
        s = rr.choice([2, 3, 4, 5, 7, 10, 13]) * (1.5 if r_ < spread * 0.3 else 1)
        d.ellipse((x - s, y - s * rr.uniform(0.8, 1.2), x + s, y + s), fill=GOLD + (240,))


def flake(img, rr, r, cx, cy, size):
    n = rr.randint(7, 12)
    pts = [(cx + size * rr.uniform(0.45, 1) * math.cos(2 * math.pi * i / n), cy + size * rr.uniform(0.45, 1) * math.sin(2 * math.pi * i / n)) for i in range(n)]
    m = Image.new("L", (S, S), 0); ImageDraw.Draw(m).polygon(pts, fill=255)
    x0, y0 = int(max(0, cx - size - 4)), int(max(0, cy - size - 4))
    x1, y1 = int(min(S, cx + size + 4)), int(min(S, cy + size + 4))
    w, h = x1 - x0, y1 - y0
    if w < 4 or h < 4: return
    tex = np.ones((h, w, 3), np.float32) * np.array(GOLD, np.float32)
    cr = cv2.GaussianBlur(r.normal(0, 1, (h, w)).astype(np.float32), (0, 0), 2.2)
    tex *= (1 + cr[..., None] * 0.45)
    tex += (cr[..., None] > 0.5) * 55; tex -= (cr[..., None] < -0.5) * 70  # crinkles
    t = Image.fromarray(np.clip(tex, 0, 255).astype("uint8")).convert("RGBA")
    t.putalpha(m.crop((x0, y0, x1, y1)))
    img.alpha_composite(t, (x0, y0))


def tape(img, rr, cx, cy, ang, w=None):
    w, h = w or rr.randint(150, 240), rr.randint(46, 60)
    a = np.zeros((h, w, 4), np.uint8); a[..., :3] = TAPE; a[..., 3] = 175
    for x in range(w):
        if x < 6 or x > w - 7: a[rr.randint(0, h - 1):, x, 3] = 0
    t = Image.fromarray(a).rotate(math.degrees(ang), expand=True, resample=Image.BICUBIC)
    img.alpha_composite(t, (int(cx - t.width / 2), int(cy - t.height / 2)))


def place(img, piece, cx, cy, ang):
    p = piece.rotate(ang, expand=True, resample=Image.BICUBIC)
    sh = Image.new("RGBA", p.size, (0, 0, 0, 0)); sh.putalpha(p.getchannel("A").filter(ImageFilter.GaussianBlur(8)).point(lambda v: v * 0.5))
    img.alpha_composite(sh, (int(cx - p.width / 2) + 8, int(cy - p.height / 2) + 10))
    img.alpha_composite(p, (int(cx - p.width / 2), int(cy - p.height / 2)))


def portrait_sticker(path, height):
    o = Image.open(path).convert("RGBA")
    s = height / o.height; o = o.resize((int(o.width * s), int(o.height * s)), Image.LANCZOS)
    pad = 30
    big = Image.new("RGBA", (o.width + 2 * pad, o.height + pad), (0, 0, 0, 0))
    m = np.zeros((big.height, big.width), np.uint8)
    m[pad:pad + o.height, pad:pad + o.width] = np.asarray(o.getchannel("A"))
    m[-1:, :] = m[-2:-1, :]
    edge = cv2.dilate((m > 100).astype(np.uint8) * 255, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31)))
    edge = cv2.morphologyEx(edge, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41)))
    pink = Image.new("RGBA", big.size, PINK + (0,)); pink.putalpha(Image.fromarray(cv2.GaussianBlur(edge, (3, 3), 0)))
    big.alpha_composite(pink); big.alpha_composite(o, (pad, pad))
    return big


def build(out, seed, portrait=None, pscale=0.66, dx=0, dy=0):
    rr = random.Random(seed); r = np.random.default_rng(seed)
    img = paper(r)
    # dense patchwork of torn black-and-white scraps: left two thirds and the top, thinner on the right
    for _ in range(44):
        w, h = rr.randint(150, 380), rr.randint(380, 900)
        cx = min(rr.uniform(-40, 1400), rr.uniform(-40, 1700))
        cy = rr.uniform(-100, S + 100)
        if cx > 1200 and cy > 700: continue
        place(img, scrap(rr, r, w, h), cx, cy, rr.uniform(-6, 6))
    for _ in range(8):
        tape(img, rr, rr.uniform(60, 1400), rr.uniform(10, 1900), rr.uniform(-0.6, 0.6))
    for _ in range(6):
        loops(img, rr, rr.uniform(150, 1800), rr.choice([rr.uniform(150, 650), rr.uniform(600, 1950)]), rr.uniform(55, 95), rr.uniform(110, 190), turns=rr.randint(4, 7))
    for _ in range(3):
        scribble(img, rr, rr.uniform(150, 1800), rr.uniform(150, 1900), rr.uniform(260, 420), rr.uniform(100, 180), rr.uniform(-0.9, 0.9))
    for _ in range(10):
        splatter(img, rr, rr.uniform(0, S), rr.uniform(0, S), n=rr.randint(40, 90), spread=rr.uniform(60, 170))
    for _ in range(12):
        flake(img, rr, r, rr.uniform(60, S - 60), rr.uniform(60, S - 60), rr.uniform(24, 58))
    if portrait:
        p = portrait_sticker(portrait, int(S * pscale))
        img.alpha_composite(p, (S - p.width + 40 + dx, S - p.height + 30 + dy))
    img.convert("RGB").resize((1024, 1024), Image.LANCZOS).save(out, quality=80, optimize=True, progressive=True)


if __name__ == "__main__":
    a = sys.argv
    build(a[1], int(a[2]), a[3] if len(a) > 3 and a[3] != "-" else None,
          float(a[4]) if len(a) > 4 else 0.66, int(a[5]) if len(a) > 5 else 0, int(a[6]) if len(a) > 6 else 0)
    print("ok", a[1])
