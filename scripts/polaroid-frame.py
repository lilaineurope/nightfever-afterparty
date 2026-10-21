"""Frame a polaroid-box photo as a classic instant print (Lisa, 22 Oct 2026).

Every guest gets a polaroid: the square photo from scripts/polaroid-box.py goes on the site (home + Afterparty boxes),
and this framed print (photo + wide bottom strip with the guest's name and episode code) is the keepsake - saved in
the episode folder and in the Polaroids folder.

Usage: python3 scripts/polaroid-frame.py <photo.jpg> "<Guest name>" "<S01E01>" <out.jpg> ["<description line>"]
(the description line comes from scripts/episode-guests.json "line" - the guest line from the episode page header)
"""
import io, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def font(name, size):
    from fontTools.ttLib import TTFont
    f = TTFont(os.path.join(ROOT, "node_modules/@fontsource", name, "files", f"{name}-latin-400-normal.woff"))
    f.flavor = None; buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, size)


def wrap(d, text, f, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=f) <= width or not cur: cur = t
        else: lines.append(cur); cur = w
    return lines + [cur] if cur else lines


def frame(photo, name, code, line=""):
    P = 1024; side = 64; top = 64; bottom = 340           # classic proportions: 88 x 107 mm
    W, H = P + 2 * side, P + top + bottom
    rng = np.random.default_rng(7)
    base = np.linspace([253, 251, 244], [239, 233, 216], H)[:, None, :].repeat(W, 1)
    base += rng.normal(0, 2.2, (H, W, 1))                  # paper grain
    card = Image.fromarray(base.clip(0, 255).astype(np.uint8))
    ph = Image.open(photo).convert("RGB").resize((P, P), Image.LANCZOS)
    a = np.asarray(ph, np.float32)                        # slight instant-film look
    a = (a - 128) * 1.04 + 128; g = a.mean(2, keepdims=True); a = g + (a - g) * 0.95
    a = a * np.array([1.02, 1.0, 0.95])
    ph = Image.fromarray(a.clip(0, 255).astype(np.uint8))
    card.paste(ph, (side, top))
    d = ImageDraw.Draw(card)
    d.rectangle([side - 1, top - 1, side + P, top + P], outline=(0, 0, 0, 60))
    f1 = font("special-elite", 64 if len(name) < 22 else 50)
    f2 = font("archivo-black", 26)
    f3 = font("special-elite", 30)
    y = top + P + 48
    nw = d.textlength(name, font=f1)
    d.text(((W - nw) / 2, y), name, font=f1, fill=(30, 28, 28)); y += 84
    for l in wrap(d, line, f3, W - 2 * side - 40)[:2]:
        lw = d.textlength(l, font=f3)
        d.text(((W - lw) / 2, y), l, font=f3, fill=(70, 66, 62)); y += 40
    tag = f"{code} · THE AFTERPARTY"
    tw = d.textlength(tag, font=f2)
    d.text(((W - tw) / 2, H - 70), tag, font=f2, fill=(236, 64, 150))
    return card


if __name__ == "__main__":
    photo, name, code, out = sys.argv[1:5]
    frame(photo, name, code, sys.argv[5] if len(sys.argv) > 5 else "").save(out, quality=90, optimize=True)
    print(out)
