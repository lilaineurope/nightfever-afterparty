# Share pictures (1200x630) for the In memoriam, club and Library item pages (covers: Lisa, 21 Nov 2026) (SEO check, 16 Nov 2026): the page's own halftone header
# photo with its taped polaroid on the right, and the name + years on the left - so a shared link shows that page,
# not the generic A-Z picture. Writes public/og/explore/<slug>.jpg.
#   npx vite-node scripts/og-cards-data.ts > /tmp/og-cards.json && python3 scripts/og-cards.py /tmp/og-cards.json
# Needs Pillow and an Inter Bold font (Linux path below, or set NF_INTER to any Inter-Bold .ttf/.otf).
import json, os, pathlib, sys
from PIL import Image, ImageDraw, ImageFont, ImageOps

R = pathlib.Path(__file__).resolve().parent.parent
O = R / "public/og/explore"
O.mkdir(parents=True, exist_ok=True)
FONT = os.environ.get("NF_INTER", "/usr/share/fonts/opentype/inter/Inter-Bold.otf")
PINK = (233, 66, 162); CREAM = (248, 241, 227); GOLD = (216, 172, 74)
W, H = 1200, 630

def cover(im, focus_y):
    im = im.convert("RGB"); s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = (im.width - W) // 2; y = int((im.height - H) * focus_y)
    return im.crop((x, y, x + W, y + H))

def fit(d, text, size, width):
    f = ImageFont.truetype(FONT, size)
    while d.textlength(text, font=f) > width and size > 30:
        size -= 2; f = ImageFont.truetype(FONT, size)
    return f

def card(row):
    im = cover(Image.open(R / row["photo"].lstrip("/")), float(row["focus"].rstrip("%")) / 100).convert("RGBA")
    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(shade)
    for i in range(H):  # dark at the bottom-left, where the words go
        a = int(245 * min(1, max(0, (i - H * 0.25) / (H * 0.5))) ** 1.2); d.line([(0, i), (W, i)], fill=(6, 9, 23, a))
    im.alpha_composite(shade)
    # The polaroid, slightly tilted, on the right; the words stay left of it (pictures never cover text).
    pol = Image.open(R / row["polaroid"].lstrip("/")).convert("RGB")
    pol = ImageOps.expand(pol.resize((round(470 * pol.width / pol.height), 470), Image.LANCZOS), border=6, fill=CREAM).convert("RGBA")
    pol = pol.rotate(-3, resample=Image.BICUBIC, expand=True)
    px = W - pol.width - 44
    im.alpha_composite(pol, (px, (H - pol.height) // 2))
    d = ImageDraw.Draw(im); room = px - 56 - 32
    kicker = row["years"] if row["kind"] in ("library", "person") else ("IN MEMORIAM" if row["kind"] == "memoriam" else "NEW YORK CLUB") + " · " + row["years"]
    while d.textlength(kicker, font=ImageFont.truetype(FONT, 24)) > room and " " in kicker:  # a long role line is cut at a word
        kicker = kicker.rsplit(" ", 1)[0].rstrip(",")
    name = row["name"]; f = fit(d, name, 68, room); lines = [name]
    if d.textlength(name, font=f) > room or f.size < 46:  # long names go on two lines
        words = name.split(); half = (len(words) + 1) // 2
        lines = [" ".join(words[:half]), " ".join(words[half:])]
        f = fit(d, max(lines, key=lambda t: d.textlength(t, font=f)), 60, room)
    y = H - 92 - len(lines) * (f.size + 8)
    kf = ImageFont.truetype(FONT, 24)  # the kicker on a pink flyer strip, readable on any picture
    d.rectangle([48, y - 46, 64 + d.textlength(kicker, font=kf), y - 10], fill=PINK)
    d.text((56, y - 42), kicker, font=kf, fill=(10, 10, 14))
    for i, line in enumerate(lines):
        d.text((54, y + i * (f.size + 8)), line, font=f, fill=CREAM)
    d.text((56, H - 72), "Night Fever AFTERPARTY", font=ImageFont.truetype(FONT, 26), fill=GOLD)
    return im.convert("RGB")

rows = json.load(open(sys.argv[1]))
for row in rows:
    card(row).save(O / f"{row['slug']}.jpg", quality=82, optimize=True, progressive=True)
print(len(rows), "share pictures,", sum(p.stat().st_size for p in O.glob("*.jpg")) // 1024, "KB")
