# Designed covers (Lisa, 27 Nov 2026: "dean's work needs cover designs and each item needs a page"): for a work with no
# picture of the real thing anywhere, an AFTERPARTY cover in the site's own flyer look - pink and black halftone dots on
# paper, the title on black tape, what it is and the year typed on a paper strip. Shown with the credit "Cover designed by
# the AFTERPARTY - no picture of the real one found", so nobody takes it for the real sleeve or poster.
#
#   python3 scripts/designed-covers.py covers.json
#
# covers.json: [{"file": "work-<slug>.webp", "title": "...", "line": "CD · The Velvet Mafia · 1998", "shape": "square" | "poster"}]
# Writes src/assets/library/<file>. Fonts: Archivo Black and Special Elite from node_modules/@fontsource.
import json
import math
import random
import sys

from PIL import Image, ImageDraw, ImageFont

FLYER = "node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff"
TYPE = "node_modules/@fontsource/special-elite/files/special-elite-latin-400-normal.woff"
PAPER = (240, 233, 222)
INK = (17, 17, 17)
PINK = (214, 20, 120)


def halftone(d: ImageDraw.ImageDraw, w: int, h: int, seed: int) -> None:
    """Two overlapping dot screens, sized by a soft blob field - the page-header halftone."""
    rnd = random.Random(seed)
    blobs = [(rnd.uniform(0, w), rnd.uniform(0, h), rnd.uniform(w * 0.18, w * 0.42), rnd.choice([PINK, INK])) for _ in range(5)]
    step = w / 26
    for colour, off in ((PINK, 0.0), (INK, 0.5)):
        y = -step
        while y < h + step:
            x = -step + off * step
            while x < w + step:
                v = 0.0
                for bx, by, r, c in blobs:
                    if c != colour:
                        continue
                    v = max(v, 1 - math.hypot(x - bx, y - by) / r)
                if v > 0:
                    rad = step * 0.48 * min(1, v * 1.4)
                    d.ellipse((x - rad, y - rad, x + rad, y + rad), fill=colour)
                x += step
            y += step


def fit(d: ImageDraw.ImageDraw, words: list[str], font_path: str, width: int, start: int, max_lines: int) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    size = start
    while size > 14:
        f = ImageFont.truetype(font_path, size)
        lines: list[str] = []
        for w in words:
            if lines and d.textlength(lines[-1] + " " + w, font=f) <= width:
                lines[-1] += " " + w
            else:
                lines.append(w)
        if len(lines) <= max_lines and all(d.textlength(l, font=f) <= width for l in lines):
            return f, lines
        size -= 2
    return ImageFont.truetype(font_path, 14), words


def cover(item: dict, out: str) -> None:
    w, h = (900, 900) if item.get("shape", "square") == "square" else (800, 1200)
    im = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(im)
    halftone(d, w, h, sum(map(ord, item["title"])))
    # Title on black tape, slightly tilted, across the middle.
    pad = int(w * 0.07)
    f, lines = fit(d, item["title"].upper().split(), FLYER, w - 2 * pad - 40, int(w * 0.15), 4)
    lh = int(f.size * 1.08)
    tape = Image.new("RGBA", (w - 2 * pad, lh * len(lines) + 40), INK + (255,))
    td = ImageDraw.Draw(tape)
    for i, line in enumerate(lines):
        td.text((20, 14 + i * lh), line, font=f, fill=PAPER)
    tape = tape.rotate(-2.5, expand=True, resample=Image.BICUBIC)
    im.paste(tape, (pad - 10, int(h * 0.44) - tape.height // 2), tape)
    # What it is, typed on a paper strip near the bottom.
    tf = ImageFont.truetype(TYPE, int(w * 0.042))
    line = item["line"]
    tw = int(d.textlength(line, font=tf)) + 36
    strip = Image.new("RGBA", (tw, int(tf.size * 1.9)), PAPER + (255,))
    sd = ImageDraw.Draw(strip)
    sd.rectangle((0, 0, tw - 1, strip.height - 1), outline=INK, width=3)
    sd.text((18, int(tf.size * 0.4)), line, font=tf, fill=INK)
    strip = strip.rotate(1.5, expand=True, resample=Image.BICUBIC)
    im.paste(strip, (pad, int(h * 0.80)), strip)
    # Small print: who made this cover.
    sf = ImageFont.truetype(TYPE, int(w * 0.026))
    d.text((pad, h - int(w * 0.06)), "AFTERPARTY cover design", font=sf, fill=INK)
    im.save(out, "WEBP", quality=82)


if __name__ == "__main__":
    for it in json.load(open(sys.argv[1])):
        cover(it, f"src/assets/library/{it['file']}")
        print("wrote", it["file"])
