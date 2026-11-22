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
    // Leaflet, loaded from a CDN on this page only (free map tiles, no key: Lisa, 22 Nov 2026).
    L?: any;
  }
}

// Free tiles: the OpenStreetMap tile server (no key, credit shown), turned to the paper look in src/styles.css (.nf-map).
// The Google Maps key only worked on lovable.app, not on nightfever-afterparty.com; CARTO tiles now need a key too.
const LEAFLET = "https://unpkg.com/leaflet@1.9.4/dist/leaflet";
const TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const CREDIT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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
    if (!mapEl.current) return;
    const init = () => {
      if (!mapEl.current || !window.L || mapRef.current) return;
      const L = window.L;
      mapRef.current = L.map(mapEl.current, { zoomControl: true, worldCopyJump: true }).setView(
        [40.735, -73.99],
        13,
      );
      L.tileLayer(TILES, { attribution: CREDIT, maxZoom: 19 }).addTo(mapRef.current);
      setReady(true);
    };
    if (window.L) return init();
    if (!document.querySelector(`link[href="${LEAFLET}.css"]`)) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = `${LEAFLET}.css`;
      document.head.appendChild(css);
    }
    const js = document.createElement("script");
    js.src = `${LEAFLET}.js`;
    js.async = true;
    js.onload = init;
    document.head.appendChild(js);
  }, []);

  // World shows the whole world; the other layers go back to downtown New York.
  useEffect(() => {
    if (!ready || layer === BRING_HOME) return;
    if (layer === "World" && visible.length) {
      mapRef.current.fitBounds(
        visible.map((s) => [s.lat, s.lng]),
        { padding: [30, 30] },
      );
    } else {
      mapRef.current.setView([40.735, -73.99], 13);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, layer]);

  useEffect(() => {
    if (!ready) return;
    const L = window.L;
    markers.current.forEach((m) => m.remove());
    // Biggest first, so small pins sit on top and stay clickable; the picked pin last of all.
    const order = [...visible].sort(
      (a, b) => Number(a.key === active) - Number(b.key === active) || b.mentions - a.mentions,
    );
    markers.current = order.map((s) => {
      const on = s.key === active;
      const m = L.circleMarker([s.lat, s.lng], {
        radius: on ? 9 : 4 + Math.min(Math.log2(1 + s.mentions), 5),
        color: "#111111",
        weight: 2,
        fillColor: on ? "#e6007e" : s.club ? "#111111" : "#f6f0ea",
        fillOpacity: 1,
      })
        .bindTooltip(s.places.map((p) => p.name).join(" / "), { direction: "top", offset: [0, -6] })
        .addTo(mapRef.current);
      m.on("click", () => {
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
    mapRef.current?.setView([s.lat, s.lng], Math.max(mapRef.current.getZoom(), 15));
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
            <div
              ref={mapEl}
              className="nf-map h-full w-full"
              aria-label="Map of Night Fever places"
            />
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
              {visible.slice(0, limit).map((s) => {
                // Click a card and its box opens underneath (Lisa, 22 Nov 2026); the headline itself goes to the page.
                const open = active === s.key;
                const lines = s.places
                  .flatMap((p) =>
                    p.refs
                      .filter((r) => r.episode && r.context)
                      .map((r) => ({ ep: r.episode!, context: r.context, mentions: r.mentions })),
                  )
                  .sort((x, y) => y.mentions - x.mentions)
                  .filter((x, i, all) => all.findIndex((y) => y.ep === x.ep) === i)
                  .slice(0, 3);
                return (
                  <li
                    key={s.key}
                    id={`spot-${s.key}`}
                    className={`border-2 bg-[#f6f0ea] text-[#111] transition ${open ? "border-pink shadow-[4px_4px_0_#e6007e]" : "border-[#111] shadow-[4px_4px_0_#111]"}`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={open}
                      aria-controls={`box-${s.key}`}
                      onClick={() => (open ? setActive(null) : focus(s))}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter" || ev.key === " ") {
                          ev.preventDefault();
                          if (open) setActive(null);
                          else focus(s);
                        }
                      }}
                      className="flex cursor-pointer items-start justify-between gap-3 p-4"
                    >
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-pink">
                          <span
                            aria-hidden="true"
                            className={s.club ? "place-key place-key-club" : "place-key"}
                          />{" "}
                          {s.club ? "Club" : "Place"} · {s.area}
                        </p>
                        <Link
                          {...cardTo(s.places[0]!.slug)}
                          onClick={(ev) => ev.stopPropagation()}
                          className="mt-1 inline-block font-semibold text-[#111] transition-colors hover:text-pink"
                        >
                          {s.places[0]!.name}
                        </Link>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`mt-4 text-sm transition-transform ${open ? "rotate-180 text-pink" : ""}`}
                      >
                        &#9662;
                      </span>
                    </div>
                    {open && (
                      <div
                        id={`box-${s.key}`}
                        className="mx-4 mb-4 border-t-2 border-dashed border-[#111] pt-3 text-sm"
                      >
                        <p className="text-xs text-[#555]">
                          {s.episodes} {s.episodes === 1 ? "episode" : "episodes"} · {s.mentions}{" "}
                          {s.mentions === 1 ? "mention" : "mentions"}
                          {s.decades.length > 0 && <> · {[...s.decades].sort().join(", ")}</>}
                        </p>
                        {s.tip && <p className="mt-1 text-xs italic text-[#555]">{s.tip}</p>}
                        {s.places.length > 1 && (
                          <p className="mt-2 text-xs">
                            <span className="uppercase tracking-[0.15em] text-[#555]">
                              Same door:{" "}
                            </span>
                            {s.places.slice(1).map((p, i) => (
                              <span key={p.slug}>
                                {i > 0 && ", "}
                                <Link
                                  {...cardTo(p.slug)}
                                  className="font-semibold text-[#111] transition-colors hover:text-pink"
                                >
                                  {p.name}
                                </Link>
                              </span>
                            ))}
                          </p>
                        )}
                        {lines.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {lines.map((l) => (
                              <li key={l.ep} className="text-[13px] leading-snug">
                                <span className="font-semibold">{episodeShort(l.ep)}</span> ·{" "}
                                {l.context}
                              </li>
                            ))}
                          </ul>
                        )}
                        <Link
                          {...cardTo(s.places[0]!.slug)}
                          className="mt-3 inline-block text-xs font-semibold text-[#111] underline decoration-dotted underline-offset-2 transition-colors hover:text-pink"
                        >
                          Open the page &rarr;
                        </Link>
                      </div>
                    )}
                  </li>
                );
              })}
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
