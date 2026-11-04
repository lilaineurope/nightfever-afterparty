"""Small WebP copies of the square polaroid photos (src/assets/polaroid-*.jpg, 1024px) for places that show them small.

The 1024px JPEGs (~300 KB each) stay for the episode page header, where the photo fills the box.
Every other spot uses a thumbnail: 512px for the polaroid boxes (Home, Afterparty page), 240px for the
tiny ones (Quote of the day, Jukebox, In memoriam, Games). Run after adding or changing a polaroid:

    python3 scripts/polaroid-thumbs.py

It writes src/assets/polaroid-thumbs/<name>-512.webp and <name>-240.webp; src/data/polaroid-thumbs.test.ts checks
that every polaroid has both.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets"
OUT = SRC / "polaroid-thumbs"
SIZES = {512: 72, 240: 80}  # width: WebP quality

OUT.mkdir(exist_ok=True)
for jpg in sorted(SRC.glob("polaroid-*.jpg")):
    with Image.open(jpg) as im:
        im = im.convert("RGB")
        for size, q in SIZES.items():
            dest = OUT / f"{jpg.stem}-{size}.webp"
            im.resize((size, size), Image.LANCZOS).save(dest, "WEBP", quality=q, method=6)
            print(f"{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")
