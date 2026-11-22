import { cardTo } from "@/lib/card-link";
import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { LOCATIONS } from "@/data/locations";
import { entities, entityFor, isPlace, totalMentions, type Entity } from "@/data/entities";
import { episodeShort } from "@/data/entities";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/map")({
  staticData: { sitemap: true },
  component: MapPage,
  head: () =>
    pageHead({
      path: "/map",
      title: "Map of NYC club kid history – every club and place named in Night Fever",
      description:
        "Every real place named in Night Fever on one map - clubs, streets, schools and cities - with the people, music, books and stories connected to each. Dive in!",
      image: "/og/home.jpg",
    }),
});

// Relaunch (Lisa, 22 Nov 2026, Option A "place cards + map"): one pin per card, the map drawn in the paper look of the
// place pages - clubs black, places open - with Clubs / Places / World layers and a decade filter from the Timeline.
type Spot = {
  key: string;
  lat: number;
  lng: number;
  area: string;
  places: Entity[];
  club: boolean;
  world: boolean;
  episodes: number;
  mentions: number;
  decades: string[];
  tip?: string;
};

const inNewYork = (lat: number, lng: number) =>
  lat > 40.49 && lat < 40.92 && lng > -74.27 && lng < -73.68;
const decadeOf = (when: string) => {
  const y = when.match(/\b(19|20)\d\d\b/)?.[0];
  if (!y) return null;
  const d = Number(y.slice(0, 3)) * 10;
  return d >= 2000 ? "2000s" : `${d}s`;
};
const DECADES = ["1960s", "1970s", "1980s", "1990s", "2000s"];

function buildSpots(): Spot[] {
  const byCoord = new Map<string, Spot>();
  for (const l of LOCATIONS) {
    const e = entityFor(l.name);
    if (!e) continue;
    const key = `${l.lat.toFixed(4)},${l.lng.toFixed(4)}`;
    let s = byCoord.get(key);
    if (!s) {
      s = {
        key,
        lat: l.lat,
        lng: l.lng,
        area: l.area,
        places: [],
        club: false,
        world: !inNewYork(l.lat, l.lng),
        episodes: 0,
        mentions: 0,
        decades: [],
      };
      byCoord.set(key, s);
    }
    if (!s.places.some((p) => p.slug === e.slug)) s.places.push(e);
    if (l.tip) s.tip = l.tip;
  }
  for (const s of byCoord.values()) {
    // The club (or the most talked-about place) names the pin; its nights and neighbours at the same door follow.
    s.places.sort(
      (a, b) =>
        Number(b.category === "Club") - Number(a.category === "Club") ||
        totalMentions(b) - totalMentions(a),
    );
    s.club = s.places.some((p) => p.category === "Club");
    s.episodes = new Set(
      s.places.flatMap((p) => p.refs.map((r) => r.episode).filter(Boolean)),
    ).size;
    s.mentions = s.places.reduce((n, p) => n + totalMentions(p), 0);
    s.decades = [
      ...new Set(
        s.places.flatMap((p) =>
          (p.events ?? []).map((ev) => decadeOf(ev.when)).filter((d): d is string => !!d),
        ),
      ),
    ];
  }
  return [...byCoord.values()].sort((a, b) => b.mentions - a.mentions);
}

declare global {
  interface Window {
    __nfInitMap?: () => void;
    google?: any;
  }
}

const KEY = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;
const CHANNEL = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] as
  string | undefined;

const BRING_HOME = "Bring us home";

/** Places named in the episodes that have no pin yet - Lisa's "Bring us home" list. */
function homelessPlaces(): Entity[] {
  const pinned = new Set(LOCATIONS.map((l) => entityFor(l.name)?.slug).filter(Boolean));
  return entities
    .filter((e) => isPlace(e.category) && e.refs.length > 0 && !pinned.has(e.slug))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** How many places the list draws at first, and how many more each time it is scrolled to the end. */
const LIST_STEP = 40;

type Layer = "All" | "Clubs" | "Places" | "World" | typeof BRING_HOME;
const LAYERS: Layer[] = ["All", "Clubs", "Places", "World"];
const inLayer = (s: Spot, l: Layer) =>
  l === "All"
    ? true
    : l === "Clubs"
      ? s.club && !s.world
      : l === "Places"
        ? !s.club && !s.world
        : l === "World"
          ? s.world
          : false;

// The paper look of the place pages (src/styles.css .place-*): cream paper, white streets, grey-blue water, no shop pins.
const PAPER = [
  { elementType: "geometry", stylers: [{ color: "#ece6da" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6f6656" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ece6da" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#cfd6d6" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f6f0ea" }] },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "off" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#dfe3cf" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#b9ae9a" }],
  },
];

const chip = (on: boolean) =>
  `rounded-full border-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
    on
      ? "border-[#111] bg-[#111] text-[#f6f0ea]"
      : "border-[#111] bg-[#f6f0ea] text-[#111] hover:bg-pink hover:text-pink-foreground"
  }`;

function MapPage() {
  const spots = useMemo(buildSpots, []);
  const homeless = useMemo(homelessPlaces, []);
  const [layer, setLayer] = useState<Layer>("All");
  const [decade, setDecade] = useState<string>("any");
  const [active, setActive] = useState<string | null>(null);
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const [ready, setReady] = useState(false);
  // The list starts with the first places and adds more as it is scrolled (or a pin is tapped) - speed, 16 Nov 2026.
  const [limit, setLimit] = useState(LIST_STEP);
  useEffect(() => setLimit(LIST_STEP), [layer, decade]);

  const inDecade = (s: Spot) => decade === "any" || s.decades.includes(decade);
  const visible = useMemo(
    () => (layer === BRING_HOME ? [] : spots.filter((s) => inLayer(s, layer) && inDecade(s))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spots, layer, decade],
  );
  const layerCount = (l: Layer) => spots.filter((s) => inLayer(s, l) && inDecade(s)).length;
  const decadeCount = (d: string) =>
    spots.filter(
      (s) =>
        inLayer(s, layer === BRING_HOME ? "All" : layer) && (d === "any" || s.decades.includes(d)),
    ).length;

  useEffect(() => {
    if (!KEY || !mapEl.current) return;
    const init = () => {
      if (!mapEl.current || !window.google?.maps) return;
      mapRef.current = new window.google.maps.Map(mapEl.current, {
        center: { lat: 40.735, lng: -73.99 },
        zoom: 13,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: PAPER,
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

  // World shows the whole world; the other layers go back to downtown New York.
  useEffect(() => {
    if (!ready || layer === BRING_HOME) return;
    const g = window.google.maps;
    if (layer === "World" && visible.length) {
      const b = new g.LatLngBounds();
      visible.forEach((s) => b.extend({ lat: s.lat, lng: s.lng }));
      mapRef.current.fitBounds(b, 40);
    } else {
      mapRef.current.setCenter({ lat: 40.735, lng: -73.99 });
      mapRef.current.setZoom(13);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, layer]);

  useEffect(() => {
    if (!ready) return;
    markers.current.forEach((m) => m.setMap(null));
    markers.current = visible.map((s) => {
      const on = s.key === active;
      const m = new window.google.maps.Marker({
        position: { lat: s.lat, lng: s.lng },
        map: mapRef.current,
        title: s.places.map((p) => p.name).join(" / "),
        zIndex: on ? 1000 : s.club ? 2 : 1,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: on ? 9 : 4 + Math.min(Math.log2(1 + s.mentions), 5),
          fillColor: on ? "#e6007e" : s.club ? "#111111" : "#f6f0ea",
          fillOpacity: 1,
          strokeColor: "#111111",
          strokeWeight: 2,
        },
      });
      m.addListener("click", () => {
        setActive(s.key);
        const at = visible.indexOf(s);
        setLimit((l) => Math.max(l, at + 1));
        // wait a frame so a place further down the list is drawn before scrolling to it
        requestAnimationFrame(() =>
          document
            .getElementById(`spot-${s.key}`)
            ?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
        );
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
      <section className="place-hero px-4 pb-8 pt-24 text-center">
        <h1 className="timeline-title">
          <span className="timeline-strip timeline-strip-ink">The scene,</span>
          <br />
          <span className="timeline-strip timeline-strip-pink">pinned</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground">
          Every club and place named in Night Fever, one pin each. Clubs are black, places are open,
          and each pin opens its own page with the guests who were there. Pick a layer, or a decade
          from the Timeline.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {LAYERS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLayer(l)}
              aria-pressed={layer === l}
              className={chip(layer === l)}
            >
              {l === "All" ? "Everything" : l}{" "}
              <span className={layer === l ? "text-pink" : "text-[#777]"}>{layerCount(l)}</span>
            </button>
          ))}
          {homeless.length > 0 && (
            <button
              type="button"
              onClick={() => setLayer(BRING_HOME)}
              aria-pressed={layer === BRING_HOME}
              className={chip(layer === BRING_HOME)}
            >
              {BRING_HOME}{" "}
              <span className={layer === BRING_HOME ? "text-pink" : "text-[#777]"}>
                {homeless.length}
              </span>
            </button>
          )}
        </div>
        {layer !== BRING_HOME && (
          <div className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Decade">
            {["any", ...DECADES].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDecade(d)}
                aria-pressed={decade === d}
                className={chip(decade === d)}
              >
                {d === "any" ? "Any year" : d === "2000s" ? "2000s +" : d}{" "}
                <span className={decade === d ? "text-pink" : "text-[#777]"}>{decadeCount(d)}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="h-[460px] overflow-hidden border-2 border-[#111] bg-[#ece6da] shadow-[5px_6px_0_#111] lg:h-[640px]">
            {KEY ? (
              <div ref={mapEl} className="h-full w-full" aria-label="Map of Night Fever places" />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
                The interactive map switches on once Google Maps is connected. Until then, all the
                places are listed right here!
              </div>
            )}
          </div>
          {layer === BRING_HOME ? (
            <div className="place-box max-h-[640px] overflow-y-auto">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                Bring us home
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                These places come up in the episodes, but we don&apos;t know where they were yet:
              </p>
              <ul className="mt-4 space-y-2">
                {homeless.map((e) => (
                  <li key={e.slug} className="flex flex-wrap items-baseline gap-x-2">
                    <Link {...cardTo(e.slug)} className="font-semibold hover:text-pink">
                      {e.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {[...new Set(e.refs.map((r) => (r.episode ? episodeShort(r.episode) : "")))]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Do you know where one of them was? Tell me and we bring it home together.
              </p>
              <Link
                to="/contact"
                search={{ about: BRING_HOME }}
                className="mt-4 inline-block rounded-full bg-pink px-5 py-2 text-sm font-semibold text-pink-foreground hover:opacity-90"
              >
                Send me a message
              </Link>
            </div>
          ) : (
            <ol
              className="max-h-[640px] space-y-3 overflow-y-auto pr-2"
              onScroll={(ev) => {
                const el = ev.currentTarget;
                if (
                  limit < visible.length &&
                  el.scrollTop + el.clientHeight > el.scrollHeight - 600
                )
                  setLimit((l) => l + LIST_STEP);
              }}
            >
              {visible.length === 0 && (
                <li className="text-sm text-muted-foreground">No pins for this pick yet.</li>
              )}
              {visible.slice(0, limit).map((s) => (
                <li
                  key={s.key}
                  id={`spot-${s.key}`}
                  className={`border-2 bg-[#f6f0ea] p-4 text-[#111] transition ${active === s.key ? "border-pink shadow-[4px_4px_0_#e6007e]" : "border-[#111] shadow-[4px_4px_0_#111]"}`}
                >
                  <button type="button" onClick={() => focus(s)} className="w-full text-left">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-pink">
                      <span
                        aria-hidden="true"
                        className={s.club ? "place-key place-key-club" : "place-key"}
                      />{" "}
                      {s.club ? "Club" : "Place"} · {s.area}
                    </p>
                    <p className="mt-1 font-semibold">{s.places[0]!.name}</p>
                    {s.places.length > 1 && (
                      <p className="text-xs text-[#555]">
                        Same door:{" "}
                        {s.places
                          .slice(1)
                          .map((p) => p.name)
                          .join(", ")}
                      </p>
                    )}
                    {s.tip && <p className="mt-1 text-xs italic text-[#555]">{s.tip}</p>}
                    <p className="mt-1 text-xs text-[#555]">
                      {s.episodes} {s.episodes === 1 ? "episode" : "episodes"} · {s.mentions}{" "}
                      {s.mentions === 1 ? "mention" : "mentions"}
                      {s.decades.length > 0 && <> · {s.decades.sort().join(", ")}</>}
                    </p>
                  </button>
                  <Link
                    {...cardTo(s.places[0]!.slug)}
                    className="mt-2 inline-block text-xs font-semibold underline decoration-dotted underline-offset-2 hover:text-pink"
                  >
                    Open the page &rarr;
                  </Link>
                </li>
              ))}
              {limit < visible.length && (
                <li className="text-center">
                  <button
                    type="button"
                    onClick={() => setLimit((l) => l + LIST_STEP)}
                    className={chip(false)}
                  >
                    Show more places ({visible.length - limit} left)
                  </button>
                </li>
              )}
            </ol>
          )}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          Pins are approximate, from the public address of each venue. Decades come from the
          Timeline, so a place without a Timeline moment only shows under Any year. Spot a wrong
          pin? Tell me!
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
