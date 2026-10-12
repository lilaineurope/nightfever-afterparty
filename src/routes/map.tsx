import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { LOCATIONS } from "@/data/locations";
import { CATEGORIES, entities, entityFor, relatedTo, totalMentions, type Entity } from "@/data/entities";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => ({
    meta: [
      { title: "Night Fever Map — Every club, street and city on one map" },
      {
        name: "description",
        content:
          "A map of every real place named in Night Fever — clubs, streets, schools and cities — with the people, music, books and stories connected to each.",
      },
      { property: "og:title", content: "Night Fever Map — The scene, pinned" },
      {
        property: "og:description",
        content: "From CBGB to Studio 54 to the Limelight: every place, and everything that happened there.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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

function MapPage() {
  const spots = useMemo(buildSpots, []);
  const [cat, setCat] = useState<string>("All");
  const [active, setActive] = useState<string | null>(null);
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const [ready, setReady] = useState(false);

  const visible = useMemo(
    () =>
      cat === "All"
        ? spots
        : cat === "Place"
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
          Every real club, street, school and city named on the site — with the people, music, books and stories tied to each. Pick a category to see where it happened.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", ...CATEGORIES.filter((c) => c !== "Place" && c !== "Mood")].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                cat === c ? "border-pink bg-pink/15 text-pink" : "border-border text-card-foreground/80 hover:border-gold/50"
              }`}
            >
              {c}
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
                The interactive map switches on once Google Maps is connected. All places are listed alongside.
              </div>
            )}
          </div>
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
                    Open the place card
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          Pins are approximate, from public addresses of each venue. Vague places like eras or TV channels are left off the map.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
