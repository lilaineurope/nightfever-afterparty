#!/usr/bin/env python3
"""Where to watch (Lisa, 24 Nov 2026: "find an option to check where to watch it, somewhere the user is connected to, like
Plex does it"). For every film and show in src/data/screen-tmdb.json (A–Z name -> TMDB "movie/<id>" or "tv/<id>", from
Wikidata), asks TMDB which services carry it in each country - TMDB's watch-provider data comes from JustWatch, so the box
on the site credits both. Writes src/data/screen-providers.json. Nothing about the visitor is ever sent anywhere: the site
picks the country in the visitor's own browser from this file.

Needs a free TMDB API key (non-commercial use; a commercial licence once the site earns money):
    TMDB_API_KEY=... python3 scripts/fetch-watch-providers.py
or a file tmdb-key.txt next to this script / in the current folder holding the key.
Run it where api.themoviedb.org is reachable (the Mac; the cloud blocks it). Rerun now and then - offers change."""
import json, os, sys, time, urllib.error, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "src", "data")
# The countries the box offers (the visitor can switch); the rest of the world falls back to the US list.
COUNTRIES = ["SE", "GB", "US", "DE", "FR", "NL", "DK", "NO", "FI", "ES", "IT", "IE", "CA", "AU", "BR", "MX", "JP"]
KINDS = {"flatrate": "stream", "free": "free", "ads": "ads", "rent": "rent", "buy": "buy"}


def key() -> str:
    k = os.environ.get("TMDB_API_KEY", "").strip()
    for p in (os.path.join(HERE, "tmdb-key.txt"), "tmdb-key.txt"):
        if not k and os.path.exists(p):
            k = (open(p).read().split() or [""])[0]  # first key if the file holds two
    if not k:
        sys.exit("No TMDB key: set TMDB_API_KEY or put it in tmdb-key.txt")
    return k


def get(url: str, k: str):
    # A v4 read token (long, starts with "ey") goes in the header; a v3 key goes in the address.
    headers = {"Accept": "application/json", "User-Agent": "NightFeverLibraryBuilder/1.0"}
    if k.startswith("ey"):
        headers["Authorization"] = "Bearer " + k
    else:
        url += ("&" if "?" in url else "?") + "api_key=" + k
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            if e.code == 401:
                sys.exit("TMDB says the key is wrong (401)")
            time.sleep(2 * (i + 1))
        except Exception:
            time.sleep(2 * (i + 1))
    return None


def main() -> None:
    k = key()
    ids = json.load(open(os.path.join(DATA, "screen-tmdb.json")))
    out = {}
    for n, (name, tmdb) in enumerate(sorted(ids.items()), 1):
        d = get(f"https://api.themoviedb.org/3/{tmdb}/watch/providers", k)
        res = (d or {}).get("results", {})
        countries = {}
        for c in COUNTRIES:
            r = res.get(c)
            if not r:
                continue
            row = {"link": r.get("link", "")}
            for src, dst in KINDS.items():
                names = [p["provider_name"] for p in sorted(r.get(src, []), key=lambda p: p.get("display_priority", 99))]
                if names:
                    row[dst] = names
            if len(row) > 1:
                countries[c] = row
        if countries:
            out[name] = {"tmdb": tmdb, "countries": countries}
        if n % 20 == 0:
            print(f"{n}/{len(ids)}")
        time.sleep(0.05)
    json.dump(out, open(os.path.join(DATA, "screen-providers.json"), "w"), ensure_ascii=False, separators=(",", ":"), sort_keys=True)
    print(f"wrote screen-providers.json: {len(out)} of {len(ids)} works can be watched somewhere")


if __name__ == "__main__":
    main()
