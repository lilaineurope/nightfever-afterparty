#!/usr/bin/env python3
"""Covers and stories for every work a guest made (Lisa, 23 Nov 2026: "apply it to all 'made by' items of all afterparty
guests (find cover design, create page) and to all future episodes").

Input: a research folder made by fetch_works.py (works.json, results.json, covers/), run on Lisa's Mac because the cloud
can't reach Wikipedia, MusicBrainz or Open Library. Output:
  src/assets/library/work-<slug>.webp      the cover, max 600 px
  src/data/work-covers.json                 A–Z name -> {kind, file, credit}; library-covers.ts adds them under its own
  src/data/item-stories-auto.json           slug -> story; item-stories.ts lays its hand-written stories over these

Check every new story by hand before publishing (a Wikipedia link can land on a redirect, the artist's page or a
disambiguation page; Wikidata often gives 1 January for an unknown date). Story rules (item-stories.ts): facts only from the work's own credits (Wikidata) or a named source (Wikipedia), no
outside links, no YouTube comments, "Since it came out" only from AFTERPARTY references and Library publications - so the
automatic stories leave it empty - and reviews only from publications on our Library shelves (none found automatically).

Run: python3 scripts/item-stories-auto.py <research folder>"""
import json, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1]
works = {w["slug"]: w for w in json.load(open(os.path.join(SRC, "works.json")))}
res = json.load(open(os.path.join(SRC, "results.json")))
# Publications already have their own press pages (founders, team, issues, masthead): no story box for them.
SKIP_KINDS = {"Magazine", "Paper", "Column", "Diary"}
# Pictures checked and turned down by hand: never add them again.
NOT_THE_COVER = {
    "jesus-christ-superstar",  # the 1970 album; Sally Randall put on her own downtown version
    "taboo",  # a roast pig, not Leigh Bowery's club
    "i-want-candy",  # the Strangeloves label; the work is Bow Wow Wow's video
    "new-york-1983",  # a Frommer's guide, not Marcus Leatherdale's book
    "little-gloria-happy-at-last",  # a title page, not the cover
    "footprints",  # a title page, not the cover
}
# Hand-made covers and stories always win (library-covers.ts / item-stories.ts).
covers_ts = open(os.path.join(ROOT, "src/data/library-covers.ts")).read()
stories_ts = open(os.path.join(ROOT, "src/data/item-stories.ts")).read()

MONTHS = "January February March April May June July August September October November December".split()


def date(s):
    m = re.match(r"(\d{4})-(\d{2})-(\d{2})", s or "")
    if not m:
        return None
    y, mo, d = m.groups()
    if mo == "00":
        return y
    if d == "00":
        return f"{MONTHS[int(mo) - 1]} {y}"
    if (mo, d) == ("01", "01"):  # Wikidata's stand-in for "some time that year"
        return y
    return f"{int(d)} {MONTHS[int(mo) - 1]} {y}"


def first_date(vals):
    vals = sorted(v for v in (vals or []) if re.match(r"\d{4}-", v))
    # A bare year sorts as "1983-00-00" ahead of "1983-04-29": keep the most exact date of the earliest year.
    if not vals:
        return None
    y = vals[0][:4]
    same = [v for v in vals if v.startswith(y)]
    return date(max(same, key=lambda v: (v[5:7] != "00", v[8:10] != "00")))


def mins(vals):
    for v in vals or []:
        m = re.match(r"([\d.]+) min", v)
        if m:
            n = round(float(m.group(1)))
            return f"{n // 60} hour{'s' if n >= 120 else ''} {n % 60} minutes" if n >= 60 else f"{n} minutes"
        m = re.match(r"([\d.]+) s", v)
        if m:
            n = round(float(m.group(1)))
            return f"{n // 60}:{n % 60:02d}"
    return None


def join(vals, n=3):
    vals = [v for v in (vals or []) if v and not re.match(r"^Q\d+$", v)][:n]
    return " and ".join([", ".join(vals[:-1]), vals[-1]]) if len(vals) > 1 else (vals[0] if vals else None)


def two_sentences(s, limit=360):
    s = re.sub(r"\s+", " ", s or "").strip()
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z\"“(])", s)
    out = parts[0] if parts else ""
    if len(parts) > 1 and len(out) + len(parts[1]) < limit:
        out += " " + parts[1]
    return out


def facts_for(kind, c, w, r):
    f = []
    add = lambda label, value: value and f.append({"label": label, "value": value})
    band = kind == "Music" and ("members" in c or "founded" in c) and "performer" not in c
    if kind in ("Film",):
        add("Out", first_date(c.get("date")))
        add("Length", mins(c.get("duration")))
        add("Directed by", join(c.get("director")))
        add("Written by", join(c.get("screenwriter")))
        add("Produced by", join(c.get("producer")))
        add("Music", join(c.get("composer")))
        add("Cinematography", join(c.get("cinematographer")))
        add("Made by", join([x for x in c.get("company", []) if x not in (c.get("producer") or [])]))
    elif kind == "TV":
        s, e = first_date(c.get("start") or c.get("date")), first_date(c.get("end"))
        add("On the air", f"{s} to {e}" if s and e else s)
        add("Network", join(c.get("broadcaster")))
        n_s, n_e = (c.get("seasons") or [None])[0], (c.get("episodes") or [None])[0]
        add("Seasons", n_s and f"{n_s} seasons, {n_e} episodes" if n_s and n_e else n_s)
        add("Created by", join(c.get("creator")))
        add("Hosted by", join(c.get("presenter")))
        add("Directed by", join(c.get("director")))
    elif band:
        add("Formed", first_date(c.get("founded") or c.get("start")))
        add("Label", join(c.get("label")))
        add("Style", join(c.get("genre"), 2))
    elif kind == "Music":
        add("Out", first_date(c.get("date")))
        add("By", join(c.get("performer")))
        add("From the album", join(c.get("partOf"), 1))
        add("Label", join(c.get("label")))
        add("Produced by", join(c.get("producer")))
        add("Written by", join(list(dict.fromkeys((c.get("lyrics") or []) + (c.get("composer") or [])))))
        add("Length", mins(c.get("duration")))
    elif kind == "Book":
        add("Out", first_date(c.get("date")))
        add("Written by", join(c.get("author")))
        add("Publisher", join(c.get("publisher")))
        add("Pages", (c.get("pages") or [None])[0])
    elif kind == "Podcast":
        add("Since", first_date(c.get("start") or c.get("date")))
        add("Hosted by", join(c.get("presenter") or c.get("cast")))
    elif kind == "Club":
        add("Opened", first_date(c.get("founded") or c.get("start")))
        add("Closed", first_date(c.get("end")))
    cov = r.get("cover") or {}
    # Book facts Open Library or Google Books gave when Wikipedia had nothing.
    if kind == "Book" and not any(x["label"] == "Publisher" for x in f) and cov.get("publisher"):
        add("Publisher", cov["publisher"])
    if kind == "Book" and not any(x["label"] == "Out" for x in f) and cov.get("year"):
        add("Out", str(cov["year"])[:4])
    if kind == "Music" and not any(x["label"] == "Out" for x in f) and cov.get("date"):
        add("Out", date(cov["date"] + "-00-00"[len(cov["date"]) - 4:]) if len(cov["date"]) < 10 else date(cov["date"]))
    return f, band


def credit(cov, w, r):
    src = cov.get("source")
    who = (r.get("artist") or "").strip()
    yr = (cov.get("date") or "")[:4] or str(cov.get("year") or "")[:4]
    tail = ", ".join(x for x in [who if w["kind"] == "Music" else cov.get("publisher"), yr] if x)
    if src == "Cover Art Archive":
        return f"Sleeve via the Cover Art Archive ({tail})" if tail else "Sleeve via the Cover Art Archive"
    if src == "Open Library":
        return f"Cover via Open Library ({tail})" if tail else "Cover via Open Library"
    if src == "Google Books":
        return f"Cover via Google Books ({tail})" if tail else "Cover via Google Books"
    if src == "Wikimedia Commons":
        artist = re.sub(r"\s+", " ", cov.get("artist") or "").strip()
        return f"Photo: {artist}, Wikimedia Commons ({cov.get('license') or 'free licence'})" if artist else f"Wikimedia Commons ({cov.get('license') or 'free licence'})"
    what = {"Film": "Poster", "TV": "Title card", "Music": "Sleeve", "Book": "Cover"}.get(w["kind"], "Picture")
    return f"{what} via Wikipedia"


# Stories already in the file were checked by hand (wrong-page matches dropped, dates fixed): keep them, only add new ones.
_auto = os.path.join(ROOT, "src/data/item-stories-auto.json")
_cov = os.path.join(ROOT, "src/data/work-covers.json")
covers = json.load(open(_cov)) if os.path.exists(_cov) else {}
stories = json.load(open(_auto)) if os.path.exists(_auto) else {}
report = []
os.makedirs(os.path.join(ROOT, "src/assets/library"), exist_ok=True)
for slug, r in res.items():
    w = works.get(slug)
    if not w:
        continue
    cov = r.get("cover") or {}
    key = w["coverName"]
    # Covers already in work-covers.json were checked by hand (credits tidied, wrong pictures dropped): keep them.
    if not w.get("cover") and cov.get("saved") and slug not in NOT_THE_COVER and key not in covers and json.dumps(key, ensure_ascii=False) + ":" not in covers_ts:
        try:
            im = Image.open(os.path.join(SRC, "covers", cov["saved"])).convert("RGBA")
            # A transparent logo (TV title cards from Commons) would turn black: lay it on white paper instead.
            paper = Image.new("RGBA", im.size, (255, 255, 255, 255))
            im = Image.alpha_composite(paper, im).convert("RGB")
            if min(im.size) >= 120:
                im.thumbnail((600, 600))
                fn = f"work-{slug}.webp"[:90]
                im.save(os.path.join(ROOT, "src/assets/library", fn), "WEBP", quality=82)
                covers[key] = {"kind": "book", "file": fn, "credit": credit(cov, w, r)}
                report.append(f"cover\t{slug}\t{cov.get('source')}\t{im.size[0]}x{im.size[1]}")
        except Exception as e:  # a broken download stays a typed cover
            report.append(f"bad-cover\t{slug}\t{e}")
    if w["kind"] in SKIP_KINDS or f'"{slug}":' in stories_ts or slug in stories:
        continue
    wp, c = r.get("wp") or {}, r.get("claims") or {}
    facts, band = facts_for(w["kind"], c, w, r)
    intro = two_sentences(wp.get("extract"))
    sources = []
    if wp:
        sources.append("Wikipedia")
    if c:
        sources.append("Wikidata (its credits)")
    if cov.get("source") and cov.get("source") not in ("Wikipedia", "Wikimedia Commons"):
        sources.append(cov["source"])
    if not intro:
        # No page about it anywhere we trust: say what the guests said about it on the show.
        ctx = [x for x in w.get("ctx") or [] if x]
        if not ctx:
            continue
        intro = ctx[0].rstrip(".") + "."
        if cov.get("description") and w["kind"] == "Book":
            intro = two_sentences(cov["description"])
            sources.append("the publisher's description")
    eps = sorted({b["ep"] for b in w["by"] if b.get("ep")})
    sources.append((" and ".join(e.upper() for e in eps) + " AFTERPARTY references") if eps else "AFTERPARTY references")
    in_it, label = [], None
    if w["kind"] in ("Film", "TV"):
        in_it = [{"name": n} for n in (c.get("cast") or [])[:8] if not re.match(r"^Q\d+$", n)]
    elif band:
        in_it, label = [{"name": n} for n in (c.get("members") or [])[:8] if not re.match(r"^Q\d+$", n)], "In the band"
    st = {"intro": intro, "facts": facts, "inIt": in_it, "since": [], "reviews": [], "sources": sources}
    if label:
        st["inItLabel"] = label
    stories[slug] = st
    report.append(f"story\t{slug}\t{len(facts)} facts\t{len(in_it)} in it\t{'wp' if wp else 'ctx'}")

json.dump(dict(sorted(covers.items())), open(os.path.join(ROOT, "src/data/work-covers.json"), "w"), ensure_ascii=False, indent=1)
json.dump(dict(sorted(stories.items())), open(os.path.join(ROOT, "src/data/item-stories-auto.json"), "w"), ensure_ascii=False, indent=1)
open(os.path.join(SRC, "report.tsv"), "w").write("\n".join(report))
print(len(covers), "covers,", len(stories), "stories")
