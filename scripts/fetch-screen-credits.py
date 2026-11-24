#!/usr/bin/env python3
"""Moving Images credits (Lisa, 24 Nov 2026): cast, team and support credits for every film and TV show on the
AFTERPARTY, from Wikidata (CC0). Reads screen-works.json next to this file, writes screen-credits.json next to it.
Only works whose A-Z link is an English Wikipedia page are looked up (no guessing by title)."""
import json, os, sys, time, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
UA = {"User-Agent": "NightFeverLibraryBuilder/1.0 (fan site research script)", "Accept": "application/json"}

def get(url, data=None, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, data=data, headers=UA)
            with urllib.request.urlopen(req, timeout=90) as r:
                return json.load(r)
        except Exception as e:
            print("  retry", i + 1, e, file=sys.stderr)
            time.sleep(3 * (i + 1))
    raise SystemExit("failed: " + url[:120])

works = json.load(open(os.path.join(HERE, "screen-works.json")))
titles = {}
for w in works:
    link = w["link"]
    if "en.wikipedia.org/wiki/" in link or "en.m.wikipedia.org/wiki/" in link:
        t = urllib.parse.unquote(link.split("/wiki/", 1)[1].split("#")[0]).replace("_", " ")
        titles[w["name"]] = t

# 1) Wikipedia title -> Wikidata id (follows redirects)
qid_of = {}
names = list(titles.items())
for i in range(0, len(names), 40):
    chunk = names[i:i + 40]
    q = urllib.parse.urlencode({"action": "query", "format": "json", "prop": "pageprops", "ppprop": "wikibase_item",
                                "redirects": 1, "titles": "|".join(t for _, t in chunk)})
    d = get("https://en.wikipedia.org/w/api.php?" + q)["query"]
    norm = {n["from"]: n["to"] for n in d.get("normalized", [])}
    redir = {n["from"]: n["to"] for n in d.get("redirects", [])}
    by_title = {p["title"]: p.get("pageprops", {}).get("wikibase_item") for p in d["pages"].values()}
    for name, t in chunk:
        t2 = norm.get(t, t); t2 = redir.get(t2, t2)
        if by_title.get(t2):
            qid_of[name] = by_title[t2]
    time.sleep(1)
print(len(titles), "with Wikipedia,", len(qid_of), "found on Wikidata")

PROPS = {
    "P57": "Directed by", "P58": "Written by", "P162": "Produced by", "P1431": "Executive producer",
    "P161": "Cast", "P725": "Voice", "P2438": "Narrator", "P371": "Presenter", "P170": "Created by",
    "P86": "Music by", "P406": "Soundtrack", "P344": "Cinematography", "P1040": "Edited by", "P2515": "Costume design",
    "P2554": "Production design", "P1809": "Choreography", "P4805": "Make-up", "P3092": "Crew",
    "P272": "Production company", "P750": "Distributed by", "P449": "Original network", "P144": "Based on",
    "P1877": "After a work by", "P577": "Released", "P580": "First aired", "P582": "Last aired", "P2047": "Running time",
    "P2437": "Seasons", "P1113": "Episodes", "P495": "Country", "P364": "Language", "P136": "Genre",
    "P915": "Filmed at", "P840": "Set in", "P166": "Award", "P1411": "Nominated for", "P2142": "Box office",
    "P2130": "Budget", "P345": "IMDb id", "P31": "Is a", "P179": "Part of the series", "P155": "Follows", "P156": "Followed by",
}
values = " ".join("wd:" + p for p in PROPS)
out = {}
items = list(qid_of.items())
for i in range(0, len(items), 8):
    chunk = items[i:i + 8]
    vals = " ".join("wd:" + q for _, q in chunk)
    sparql = f"""
SELECT ?item ?prop ?v ?vLabel ?role ?roleLabel ?crole ?croleLabel ?ord ?for ?forLabel ?when WHERE {{
  VALUES ?item {{ {vals} }}
  VALUES ?prop {{ {values} }}
  ?prop wikibase:claim ?claim; wikibase:statementProperty ?sp.
  ?item ?claim ?st. ?st ?sp ?v.
  OPTIONAL {{ ?st pq:P453 ?role. }}
  OPTIONAL {{ ?st pq:P3831 ?crole. }}
  OPTIONAL {{ ?st pq:P1545 ?ord. }}
  OPTIONAL {{ ?st pq:P1686 ?for. }}
  OPTIONAL {{ ?st pq:P585 ?when. }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}"""
    d = get("https://query.wikidata.org/sparql", data=urllib.parse.urlencode({"query": sparql, "format": "json"}).encode())
    rows = d["results"]["bindings"]
    for name, q in chunk:
        out.setdefault(name, {"qid": q, "wikipedia": titles[name], "claims": []})
    inv = {q: name for name, q in chunk}
    for r in rows:
        q = r["item"]["value"].rsplit("/", 1)[1]
        p = r["prop"]["value"].rsplit("/", 1)[1]
        val = lambda k: r[k]["value"] if k in r else None
        v = val("v")
        c = {"p": p, "label": PROPS[p], "v": v.rsplit("/", 1)[1] if v and v.startswith("http://www.wikidata.org/entity/") else v,
             "name": val("vLabel")}
        for k, key in (("roleLabel", "as"), ("croleLabel", "role"), ("ord", "ord"), ("forLabel", "for"), ("when", "when")):
            if val(k): c[key] = val(k)
        out[inv[q]]["claims"].append(c)
    print(f"{min(i + 8, len(items))}/{len(items)}", len(rows), "rows")
    time.sleep(1.5)

json.dump(out, open(os.path.join(HERE, "screen-credits.json"), "w"), ensure_ascii=False, indent=1)
print("wrote screen-credits.json:", len(out), "works,", sum(len(v["claims"]) for v in out.values()), "credits")
