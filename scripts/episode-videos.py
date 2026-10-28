#!/usr/bin/env python3
"""Build src/data/episode-videos/<id>.json for the Jukebox's AFTERPARTY sections (Lisa, 28 Oct 2026).

Input: a JSON list of the episode's YouTube playlist videos, each tied to the reference it was picked for:
  [{"id": "<videoId>", "name": "<exact reference name from src/data/<id>.json>", "title": "<YouTube title>",
    "channel": "<channel>", "views": 123456}, ...]
Run:  python3 scripts/episode-videos.py s07e01 picks.json
- Song videos that are already in YOUTUBE (src/data/jukebox-videos.ts) for a Music reference are left out (they are the Songs strips).
- Night Fever full episodes / trailers are tagged "Night Fever" (not listed in the sections).
- "views" (YouTube views, fetched in Lisa's browser with the player endpoint) are merged into src/data/video-views.json;
  add the views of new song videos there too.
"""
import json, re, sys, unicodedata, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ep, picks_path = sys.argv[1], sys.argv[2]
picks = json.load(open(picks_path))
refs = json.load(open(ROOT / f"src/data/{ep}.json"))
yt = dict(re.findall(r'^\s*"((?:[^"\\]|\\.)*)":\s*"([\w-]{11})"', (ROOT / "src/data/jukebox-videos.ts").read_text(), re.M))
song_ids = set(yt.values())

def norm(s):
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\s*\(.*?\)", "", s.lower()).replace("’", "'").strip()
    return re.sub(r"^the ", "", s)

def secs(t):
    if not t or not re.match(r"\d+:\d+:\d+$", t):
        return 10**9
    h, m, s = map(int, t.split(":"))
    return h * 3600 + m * 60 + s

by = {}
for r in refs:
    by.setdefault(norm(r["name"]), r)
out, missing, views = [], [], {}
seen = set()
for p in picks:
    vid = p["id"]
    if vid in seen:
        continue
    seen.add(vid)
    if p.get("views") is not None:
        views[vid] = int(p["views"])
    t = p.get("title", "")
    if re.search(r"Season \d+,? Episode \d+|Season \d+ (Trailer|trailer)|Night Fever: An Introduction", t):
        out.append({"id": vid, "name": p.get("name") or t, "cat": "Night Fever", "time": None, "title": t, "channel": p.get("channel", "")})
        continue
    r = by.get(norm(p.get("name", "")))
    if not r:
        missing.append((vid, p.get("name"), t))
        continue
    if r["category"] == "Music" and vid in song_ids:
        continue
    row = {"id": vid, "name": r["name"], "cat": r["category"], "time": r["time"] if secs(r["time"]) < 10**9 else None, "title": t or r["name"], "channel": p.get("channel", "")}
    if r.get("fashion"):
        row["fashion"] = r["fashion"]
    out.append(row)
out.sort(key=lambda x: secs(x["time"]))
(ROOT / "src/data/episode-videos").mkdir(exist_ok=True)
(ROOT / f"src/data/episode-videos/{ep}.json").write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
vp = ROOT / "src/data/video-views.json"
allv = json.loads(vp.read_text())
allv.update(views)
vp.write_text(json.dumps(allv, separators=(",", ":")))
print(f"{ep}: {len(out)} videos, {len(views)} view counts")
for m in missing:
    print("  no reference with that name:", m)
