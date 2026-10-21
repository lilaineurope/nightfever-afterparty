import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { LOCATIONS } from "@/data/locations";
import { CATEGORIES, entities, entityFor, isPlace, relatedTo, totalMentions, type Entity } from "@/data/entities";
import { episodeShort } from "@/data/entities";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/map")({
  staticData: { sitemap: true },
  component: MapPage,
  head: () => pageHead({ path: "/map", title: "Map of New York nightlife – every club and place in Night Fever", description: "Every real place named in Night Fever on one map - clubs, streets, schools and cities - with the people, music, books and stories connected to each. Dive in!", image: "/og/home.jpg" }),
});

type Spot = {
  key: string;
  lat: number;
  lng: number;
  area: string;
  places: Entity[];
  connected: Entity[];
};

function buildSpots(): Spot[] {
  const byCoord = new Map<string, Spot>();
  for (const l of LOCATIONS) {
    const e = entityFor(l.name);
    if (!e) continue;
    const key = `${l.lat.toFixed(4)},${l.lng.toFixed(4)}`;
    let s = byCoord.get(key);
    if (!s) {
      s = { key, lat: l.lat, lng: l.lng, area: l.area, places: [], connected: [] };
      byCoord.set(key, s);
    }
    if (!s.places.some((p) => p.slug === e.slug)) s.places.push(e);
  }
  const sec = (t: string) => {
    const p = t.split(":").map(Number);
    if (p.length < 2 || p.some(isNaN)) return null;
    return p.reduce((a, b) => a * 60 + b, 0);
  };
  for (const s of byCoord.values()) {
    const m = new Map<string, Entity>();
    const keep = (r: Entity) => {
      if (!s.places.some((x) => x.slug === r.slug)) m.set(r.slug, r);
    };
    for (const p of s.places) {
      relatedTo(p).forEach(keep);
      // Anything named within 90 seconds of this place in the same episode.
      for (const pr of p.refs) {
        const t = sec(pr.time);
        if (t == null) continue;
        for (const x of entities)
          if (
            x.refs.some((r) => {
              if (r.episode !== pr.episode) return false;
              const u = sec(r.time);
              return u != null && Math.abs(u - t) <= 90;
            })
          )
            keep(x);
      }
    }
    s.connected = [...m.values()].sort((a, b) => totalMentions(b) - totalMentions(a));
  }
  return [...byCoord.values()];
}

declare global {
  interface Window {
    __nfInitMap?: () => void;
    google?: any;
  }
}

const KEY = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;
const CHANNEL = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] as string | undefined;

const BRING_HOME = "Bring us home";

/** Places named in the episodes that have no pin yet - Lisa's "Bring us home" list. */
function homelessPlaces(): Entity[] {
  const pinned = new Set(LOCATIONS.map((l) => entityFor(l.name)?.slug).filter(Boolean));
  return entities
    .filter((e) => isPlace(e.category) && e.refs.length > 0 && !pinned.has(e.slug))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function MapPage() {
  const spots = useMemo(buildSpots, []);
  const homeless = useMemo(homelessPlaces, []);
  const [cat, setCat] = useState<string>("All");
  const [active, setActive] = useState<string | null>(null);
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const [ready, setReady] = useState(false);

  const chips = useMemo(() => {
    const out: [string, number][] = [["All", spots.length]];
    for (const c of CATEGORIES) {
      if (c === "Mood") continue;
      const n = spots.filter((s) => s.connected.some((x) => x.category === c)).length;
      if (n > 0) out.push([c, n]);
    }
    if (homeless.length > 0) out.push([BRING_HOME, homeless.length]);
    return out;
  }, [spots, homeless]);

  const visible = useMemo(
    () =>
      cat === BRING_HOME
        ? []
        : cat === "All"
          ? spots
          : spots.filter((s) => s.connected.some((c) => c.category === cat)),
    [spots, cat],
  );

  useEffect(() => {
    if (!KEY || !mapEl.current) return;
    const init = () => {
      if (!mapEl.current || !window.google?.maps) return;
      mapRef.current = new window.google.maps.Map(mapEl.current, {
        center: { lat: 40.735, lng: -73.99 },
        zoom: 13,
        clickableIcons: false,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1b1424" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#c9b78a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#120c18" }] },
          { featureType: "water", stylers: [{ color: "#0d0a14" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2236" }] },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
        ],
      });
      setReady(true);
    };
    if (window.google?.maps) return init();
    window.__nfInitMap = init;
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&loading=async&callback=__nfInitMap${CHANNEL ? `&channel=${CHANNEL}` : ""}`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!ready) return;
    markers.current.forEach((m) => m.setMap(null));
    markers.current = visible.map((s) => {
      const m = new window.google.maps.Marker({
        position: { lat: s.lat, lng: s.lng },
        map: mapRef.current,
        title: s.places.map((p) => p.name).join(" / "),
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7 + Math.min(s.connected.length, 20) / 3,
          fillColor: s.key === active ? "#ff4fa3" : "#e8c35a",
          fillOpacity: 0.9,
          strokeColor: "#120c18",
          strokeWeight: 1.5,
        },
      });
      m.addListener("click", () => {
        setActive(s.key);
        document.getElementById(`spot-${s.key}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      return m;
    });
  }, [ready, visible, active]);

  const focus = (s: Spot) => {
    setActive(s.key);
    mapRef.current?.panTo({ lat: s.lat, lng: s.lng });
    if (mapRef.current && mapRef.current.getZoom() < 14) mapRef.current.setZoom(14);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-10 pt-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">The map</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
          The scene, <span className="text-pink text-glow-pink">pinned</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Every real club, street and city named on the site - pinned! Under each place you'll find the names that come up alongside it, in the same moment of an episode or the same story on the timeline. Pick a category to see only the places linked to it - the number tells you how many places that is.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          And then there&apos;s <span className="font-semibold text-pink">Bring us home</span>. Some places mentioned in the episodes don&apos;t have a confirmed location. Do you know where they are?{" "}
          <Link to="/contact" search={{ about: "Bring us home" }} className="text-gold underline underline-offset-2 hover:text-pink">
            Help to bring them home!
          </Link>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {chips.map(([c, n]) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                cat === c ? "border-pink bg-pink/15 text-pink" : "border-border text-card-foreground/80 hover:border-gold/50"
              }`}
            >
              {c} <span className="text-muted-foreground">{n}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="h-[460px] overflow-hidden rounded-3xl border border-gold/25 bg-card lg:h-[640px]">
            {KEY ? (
              <div ref={mapEl} className="h-full w-full" aria-label="Map of Night Fever places" />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
                The interactive map switches on once Google Maps is connected. Until then, all the places are listed right here!
              </div>
            )}
          </div>
          {cat === BRING_HOME ? (
            <div className="max-h-[640px] overflow-y-auto rounded-3xl border border-pink/40 bg-card p-6">
              <h2 className="text-2xl font-bold text-cream">Bring us home</h2>
              <p className="mt-3 text-muted-foreground">Here is a list of places which have no real location:</p>
              <ul className="mt-4 space-y-2">
                {homeless.map((e) => (
                  <li key={e.slug} className="flex flex-wrap items-baseline gap-x-2">
                    <Link to="/explore/$slug" params={{ slug: e.slug }} className="font-semibold text-gold hover:text-pink">
                      {e.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {[...new Set(e.refs.map((r) => (r.episode ? episodeShort(r.episode) : "")))].filter(Boolean).join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-muted-foreground">
                Do you know where they are? Send me a message and we can bring it home together.
              </p>
              <Link to="/contact" search={{ about: "Bring us home" }}
                className="mt-4 inline-block rounded-full bg-pink px-5 py-2 text-sm font-semibold text-pink-foreground hover:opacity-90">
                Send me a message
              </Link>
            </div>
          ) : (
          <ol className="max-h-[640px] space-y-3 overflow-y-auto pr-1">
            {visible.map((s) => {
              const shown = cat === "All" ? s.connected : s.connected.filter((c) => c.category === cat);
              return (
                <li
                  key={s.key}
                  id={`spot-${s.key}`}
                  className={`rounded-2xl border bg-card p-4 transition ${active === s.key ? "border-pink" : "border-border"}`}
                >
                  <button onClick={() => focus(s)} className="text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-pink">{s.area}</p>
                    <p className="mt-1 font-semibold text-gold">{s.places.map((p) => p.name).join(" · ")}</p>
                  </button>
                  {shown.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {shown.slice(0, 12).map((c) => (
                        <Link
                          key={c.slug}
                          to="/explore/$slug"
                          params={{ slug: c.slug }}
                          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-card-foreground/80 hover:border-gold/60 hover:text-gold"
                        >
                          {c.name} <span className="text-muted-foreground">· {c.category}</span>
                        </Link>
                      ))}
                      {shown.length > 12 && <span className="px-1 text-xs text-muted-foreground">+{shown.length - 12} more</span>}
                    </div>
                  )}
                  <Link
                    to="/explore/$slug"
                    params={{ slug: s.places[0]!.slug }}
                    className="mt-3 inline-block text-xs text-gold underline underline-offset-2 hover:text-pink"
                  >
                    Dive into this place
                  </Link>
                </li>
              );
            })}
          </ol>
          )}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          Pins are approximate, from the public address of each venue. Vague places like eras or TV channels are left off the map. Spot a wrong pin? Tell me!
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
