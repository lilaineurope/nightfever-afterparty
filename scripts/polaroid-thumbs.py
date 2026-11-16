"""Small WebP copies of the square polaroid photos (src/assets/polaroid-*.jpg, 1024px) for places that show them small.

The 1024px JPEGs (~300 KB each) are the masters (share pictures are made from them); the episode page header uses
the 1024px WebP copy. Every other spot uses a thumbnail: 512px for the polaroid boxes (Home, Afterparty page), 240px for the
tiny ones (Quote of the day, Jukebox, In memoriam, Games). Run after adding or changing a polaroid:

    python3 scripts/polaroid-thumbs.py

It writes src/assets/polaroid-thumbs/<name>-1024.webp, -512.webp and -240.webp; src/data/polaroid-thumbs.test.ts checks
that every polaroid has all three.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets"
OUT = SRC / "polaroid-thumbs"
SIZES = {1024: 78, 512: 72, 240: 80}  # width: WebP quality (1024: the episode page header, ~20% lighter than the JPEG)

OUT.mkdir(exist_ok=True)
for jpg in sorted(SRC.glob("polaroid-*.jpg")):
    with Image.open(jpg) as im:
        im = im.convert("RGB")
        for size, q in SIZES.items():
            dest = OUT / f"{jpg.stem}-{size}.webp"
            im.resize((size, size), Image.LANCZOS).save(dest, "WEBP", quality=q, method=6)
            print(f"{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")
