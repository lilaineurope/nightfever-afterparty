"""Generic episode art: box = Makos-style background + photo portrait; header = Gemini collage + drawn portrait.
usage: compose_ep.py <box_portrait> <header_portrait> <collage> <out_box> <out_header> [seed] [box_scale] [hdr_h] [hdr_dx] [hdr_dy]"""
import sys, numpy as np
from PIL import Image
from rembg import remove, new_session
sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
import portrait_sticker as c

S = new_session('isnet-general-use')


def cut(src, dst):
    im = Image.open(src).convert('RGB'); m = remove(im, session=S, only_mask=True)
    o = im.convert('RGBA'); o.putalpha(m); o.save(dst); return dst


def main(a):
    bp, hp, col, ob, oh = a[1:6]
    seed = int(a[6]) if len(a) > 6 else 11
    bs = float(a[7]) if len(a) > 7 else 0.72
    hh = int(a[8]) if len(a) > 8 else 660
    hdx = int(a[9]) if len(a) > 9 else 20
    hdy = int(a[10]) if len(a) > 10 else 70
    bc = cut(bp, ob + '.cut.png'); hc = cut(hp, oh + '.cut.png')
    c.bm.build(c.D + '_bg.jpg', seed)
    bg = Image.open(c.D + '_bg.jpg').convert('RGBA').resize((2048, 2048), Image.LANCZOS)
    p = c.sticker(bc, int(2048 * bs), fade_left=0.28, solid=True)
    bg.alpha_composite(p, (2048 - p.width + 40, 2048 - p.height + 6))
    bg.convert('RGB').resize((1024, 1024), Image.LANCZOS).save(ob, quality=82, optimize=True, progressive=True)
    im = Image.open(col).convert('RGBA').resize((1376, 768), Image.LANCZOS)
    q = c.sticker(hc, hh, edge=19, fade_left=0.2, fade_bottom=0.14, solid=True)
    im.alpha_composite(q, (im.width - q.width + hdx, im.height - q.height + hdy))
    im.convert('RGB').save(oh, quality=82, optimize=True, progressive=True)
    print('ok', ob, oh)


if __name__ == '__main__':
    main(sys.argv)
