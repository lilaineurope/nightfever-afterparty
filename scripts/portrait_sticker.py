"""S06E03 art: box = Makos-style background + photo portrait (p2); header = Gemini collage + drawn portrait (p1).
Where a portrait is cut by its own left edge, body and pink sticker dissolve into the background."""
import sys, numpy as np, cv2
from PIL import Image, ImageFilter
sys.path.insert(0, '/home/claude/nightfever-afterparty/scripts')
import importlib.util
spec = importlib.util.spec_from_file_location('bm', __import__('os').path.join(__import__('os').path.dirname(__import__('os').path.abspath(__file__)), 'box-makos.py'))
bm = importlib.util.module_from_spec(spec); spec.loader.exec_module(bm)
PINK = (236, 72, 160)
D = '/tmp/'


def sticker(cut_path, height, edge=31, fade_left=0.10, fade_bottom=0.0, solid=False):
    o = Image.open(cut_path).convert('RGBA')
    s = height / o.height; o = o.resize((int(o.width * s), int(o.height * s)), Image.LANCZOS)
    a = np.asarray(o.getchannel('A')).astype(np.float32) / 255
    # clean speckles / fill holes in the mask
    hard = (a > 0.45).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(hard)
    if n > 1:
        keep = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA]); hard = (lab == keep).astype(np.uint8)
    pad = edge + 6
    W, H = o.width + 2 * pad, o.height + pad
    m = np.zeros((H, W), np.uint8); m[pad:pad + o.height, pad:pad + o.width] = hard * 255
    m[-pad:, :] = 0; m[pad + o.height - 1:, pad:pad + o.width] = m[pad + o.height - 2, pad:pad + o.width]  # body runs off the bottom
    big = cv2.dilate(m, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (edge, edge)))
    big = cv2.morphologyEx(big, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (edge + 10, edge + 10)))
    big = cv2.GaussianBlur(big, (3, 3), 0).astype(np.float32) / 255
    # fill holes inside the silhouette
    body_a = np.zeros((H, W), np.float32); body_a[pad:pad + o.height, pad:pad + o.width] = a
    ff = (big > 0.5).astype(np.uint8) * 255; h_, w_ = ff.shape; mask = np.zeros((h_ + 2, w_ + 2), np.uint8)
    inv = ff.copy(); cv2.floodFill(inv, mask, (0, 0), 255); holes = (inv == 0)
    big[holes] = 1
    if solid:  # drawings: keep the paper inside the silhouette opaque so the pink sticker doesn't show through
        fill = np.zeros((H, W), np.uint8); fill[pad:pad + o.height, pad:pad + o.width] = hard
        inv2 = (fill * 255).copy(); mk = np.zeros((H + 2, W + 2), np.uint8); cv2.floodFill(inv2, mk, (0, 0), 255)
        fill = np.maximum(fill, (inv2 == 0).astype(np.uint8))
        fill = cv2.GaussianBlur(fill.astype(np.float32), (0, 0), 1.2)
        body_a = np.maximum(body_a, fill)
    # dissolve where the photo is cut by its own left edge
    xx = np.arange(W)[None, :].astype(np.float32); yy = np.arange(H)[:, None].astype(np.float32)
    ramp = np.clip((xx - pad) / (fade_left * o.width), 0, 1) if fade_left else np.ones((1, W), np.float32)
    touches_left = a[:, :6].mean(axis=1) > 0.3  # rows where the body meets the left edge
    rows = np.zeros(H, bool); rows[pad:pad + o.height] = touches_left
    rows = cv2.dilate(rows.astype(np.uint8)[:, None], np.ones((121, 1), np.uint8))[:, 0] > 0
    fade = np.where(rows[:, None], ramp, 1.0)
    if fade_bottom:
        fade = fade * np.clip((pad + o.height - yy) / (fade_bottom * o.height), 0, 1)
    out = Image.new('RGBA', (W, H), PINK + (0,))
    out.putalpha(Image.fromarray((np.clip(big * fade ** 4, 0, 1) * 255).astype('uint8')))
    body = Image.new('RGBA', (W, H), (0, 0, 0, 0)); body.paste(o.convert('RGB'), (pad, pad))
    body.putalpha(Image.fromarray((np.clip(body_a * fade, 0, 1) * 255).astype('uint8')))
    out.alpha_composite(body)
    return out


def box(out, seed=11, scale=0.62, dx=0, dy=0):
    rr = bm.random.Random(seed); r = np.random.default_rng(seed)
    bm.build(D + '_bg.jpg', seed)  # background only (1024)
    bg = Image.open(D + '_bg.jpg').convert('RGBA').resize((2048, 2048), Image.LANCZOS)
    p = sticker(D + 'p2_cut.png', int(2048 * scale))
    bg.alpha_composite(p, (2048 - p.width + 40 + dx, 2048 - p.height + 6 + dy))
    bg.convert('RGB').resize((1024, 1024), Image.LANCZOS).save(out, quality=82, optimize=True, progressive=True)


def header(out, h=820, dx=0, dy=60):
    im = Image.open('/mnt/user-data/uploads/Night Fever Fan Page/Season 6/S06E03 Chi Chi Valenti & Johnny Dynell/Gemini references collage wide.jpeg').convert('RGBA')
    p = sticker(D + 'p1_cut.png', h, edge=19, fade_left=0.12, fade_bottom=0.10)
    im.alpha_composite(p, (im.width - p.width + 30 + dx, im.height - p.height + dy))
    im.convert('RGB').save(out, quality=82, optimize=True, progressive=True)


if __name__ == '__main__':
    box(D + 'box63.jpg', int(sys.argv[1]) if len(sys.argv) > 1 else 11, float(sys.argv[2]) if len(sys.argv) > 2 else 0.62)
    header(D + 'hdr63.jpg', int(sys.argv[3]) if len(sys.argv) > 3 else 820)
    print('ok')
