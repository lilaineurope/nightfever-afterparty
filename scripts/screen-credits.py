#!/usr/bin/env python3
"""Moving Images credits (Lisa, 24 Nov 2026: "info box who was involved, find as many cast and team and support
information as possible"). Turns the raw Wikidata pull (screen-credits-raw.json, made by scripts/fetch-screen-credits.py, run where Wikidata is reachable -
Wikidata is CC0) into src/data/screen-credits.json: per A–Z name, the facts, the team role by role, the cast with the
parts they played, the support (companies, network, where it was filmed) and the awards it won.
Usage: python3 scripts/screen-credits.py <screen-credits-raw.json>"""
import json, re, sys, os

raw = json.load(open(sys.argv[1]))
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data", "screen-credits.json")

TEAM = ["Created by", "Directed by", "Written by", "Based on", "After a work by", "Presenter", "Narrator", "Cast", "Voice",
        "Produced by", "Executive producer", "Music by", "Soundtrack", "Cinematography", "Edited by", "Production design",
        "Costume design", "Make-up", "Choreography", "Crew"]
SUPPORT = ["Production company", "Distributed by", "Original network", "Filmed at", "Set in"]
QID = re.compile(r"^Q\d+$")

def year(v):
    m = re.match(r"^\+?(\d{4})-", v or "")
    return m.group(1) if m else None

def as_int(v):
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return None

def first_ord(c):
    try:
        return int(c.get("ord", "9999"))
    except ValueError:
        return 9999

out = {}
for name, w in sorted(raw.items()):
    claims = w["claims"]
    by = {}
    for c in claims:
        by.setdefault(c["label"], []).append(c)
    nm = lambda c: c.get("name") if c.get("name") and not QID.match(c.get("name")) else None

    facts = {}
    for lab, key in (("Released", "Out"), ("First aired", "First aired"), ("Last aired", "Last aired")):
        ys = sorted(y for y in (year(c["v"]) for c in by.get(lab, [])) if y)
        if ys: facts[key] = ys[0] if lab != "Last aired" else ys[-1]
    rt = sorted(x for x in (as_int(c["v"]) for c in by.get("Running time", [])) if x)
    if rt: facts["Running time"] = f"{rt[0]} minutes"
    for lab in ("Seasons", "Episodes"):
        xs = [x for x in (as_int(c["v"]) for c in by.get(lab, [])) if x]
        if xs: facts[lab] = str(max(xs))
    for lab, key in (("Country", "Country"), ("Language", "Language"), ("Genre", "Genre"), ("Is a", "Is a"),
                     ("Part of the series", "Part of"), ("Follows", "Follows"), ("Followed by", "Followed by")):
        vs = list(dict.fromkeys(n for n in (nm(c) for c in by.get(lab, [])) if n))
        if vs: facts[key] = vs[:4]
    imdb = [c["v"] for c in by.get("IMDb id", [])]

    team = []
    for lab in TEAM:
        rows = by.get(lab, [])
        if lab == "Cast": rows = sorted(rows, key=first_ord)
        people, seen = [], {}
        for c in rows:
            n = nm(c)
            if not n: continue
            if lab == "Crew":
                key = (c.get("role") or "Crew").capitalize()
                if n not in [p["name"] for p in seen.setdefault(key, [])]:
                    seen[key].append({"name": n})
                continue
            p = next((p for p in people if p["name"] == n), None)
            if not p:
                p = {"name": n}; people.append(p)
            if c.get("as") and not QID.match(c["as"]):
                p.setdefault("as", [])
                if c["as"] not in p["as"]: p["as"].append(c["as"])
        for p in people:
            if "as" in p: p["as"] = " / ".join(p["as"][:3])
        if lab == "Cast":
            # The billing order where Wikidata has it (the leads), then everyone else by surname.
            ords = {}
            for c in rows:
                if nm(c) and c.get("ord"): ords.setdefault(nm(c), first_ord(c))
            for p in people:
                if ords.get(p["name"], 9999) <= 6: p["lead"] = True
            people.sort(key=lambda p: (ords.get(p["name"], 9999), p["name"].split()[-1].lower()))
        if lab == "Crew":
            for k, ps in seen.items(): team.append({"role": k, "people": ps})
        elif people:
            team.append({"role": lab, "people": people})

    support = []
    for lab in SUPPORT:
        vs = list(dict.fromkeys(n for n in (nm(c) for c in by.get(lab, [])) if n))
        if vs: support.append({"role": lab, "names": vs})

    awards, noms = [], set()
    for c in by.get("Award", []):
        n = nm(c)
        if not n: continue
        y = year(c.get("when"))
        a = {"name": n, **({"year": y} if y else {}), **({"for": c["for"]} if c.get("for") and not QID.match(c["for"]) else {})}
        if a not in awards: awards.append(a)
    for c in by.get("Nominated for", []):
        if nm(c): noms.add(nm(c) + (c.get("for") or "") + (c.get("when") or ""))
    out[name] = {"qid": w["qid"], "facts": facts, "team": team, "support": support,
                 "awards": sorted(awards, key=lambda a: a.get("year", "9999")), "nominations": len(noms),
                 **({"imdb": imdb[0]} if imdb else {})}

# The documentaries (for the Library shelf; a small file so the Library page doesn't load every credit).
DOC = re.compile(r"documentar", re.I)
docs = sorted(n for n, w in out.items() if any(DOC.search(g) for g in w["facts"].get("Genre", []) + w["facts"].get("Is a", [])))
json.dump(docs, open(os.path.join(os.path.dirname(OUT), "screen-docs.json"), "w"), ensure_ascii=False, indent=0)
json.dump(out, open(OUT, "w"), ensure_ascii=False, separators=(",", ":"), sort_keys=True)
people = sum(len(r["people"]) for w in out.values() for r in w["team"])
print(f"{len(out)} works, {people} credited people, {sum(len(w['awards']) for w in out.values())} awards ->", os.path.relpath(OUT))
