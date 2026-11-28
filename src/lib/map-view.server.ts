// Server side of the map on club, event and living-people pages (src/lib/map-view.ts; Lisa, 27 Nov 2026: "yes to all
// Which page gets what"). Clubs and events get "Around the block", the drawn band of the place pages with the club in the
// middle; living people get their rooms as numbered pins on a drawn New York, and each AFTERPARTY its places in the order
// they come up (episodeMapOf). No pin means no guess: Bring us home.
import { entityFor, episodeShort, isPlace, type Entity } from "@/data/entities";
import { EVENT_PLACES, NO_SINGLE_PLACE } from "@/data/event-places";
import { CLUB_PROFILES } from "@/data/club-profiles";
import { EVENT_COVERS } from "@/data/event-covers";
import type { CoverDesign } from "@/lib/cover-design";
import { HOME_HINTS } from "@/data/locations";
import { episodeById } from "@/data/episodes";
import { refsOf } from "@/data/episode-refs";
import { toSeconds } from "@/lib/time";
import type { PersonProfile } from "@/data/person-profiles";
import {
  aroundMap,
  BAND,
  inNewYork,
  metresBetween,
  pins,
  type Pinned,
} from "@/lib/place-view.server";
import type {
  CityMap,
  MapBand,
  MapEvent,
  MapHome,
  MapLine,
  MapStop,
  RoomsMap,
} from "@/lib/map-view";

/** The episode line that says most about a card: the row with most mentions, or the first one that names `about`. */
export function lineOf(e: Entity, about?: string[]): MapLine | undefined {
  const rows = e.refs.filter((r) => r.episode && r.context && r.time && r.time !== "On camera");
  const named = about?.length
    ? rows.find((r) => about.some((w) => w.length > 2 && r.context.includes(w)))
    : undefined;
  const r = named ?? [...rows].sort((a, b) => b.mentions - a.mentions)[0];
  if (!r) return undefined;
  return {
    episode: r.episode!,
    short: episodeShort(r.episode!),
    guest: episodeById(r.episode!).guest,
    time: r.time,
    context: r.context,
  };
}

type EventAt = {
  slug: string;
  name: string;
  at: { lat: number; lng: number };
  venue: string | null;
};
let eventsAt: EventAt[] | null = null;
/** Every pinned event with the spot it sits on: its venue's pin, or its own coordinates (src/data/event-places.ts). */
const pinnedEvents = (): EventAt[] =>
  (eventsAt ??= EVENT_PLACES.flatMap((p): EventAt[] => {
    const e = entityFor(p.event);
    if (!e) return [];
    if (p.lat !== undefined && p.lng !== undefined)
      return [{ slug: e.slug, name: e.name, at: { lat: p.lat, lng: p.lng }, venue: null }];
    const v = entityFor(p.at);
    const pin = v && pins().find((x) => x.slug === v.slug);
    return pin ? [{ slug: e.slug, name: e.name, at: pin, venue: v.slug }] : [];
  }));

const SAME_DOOR = 15; // metres: a club's own nights and rooms share its pin
/** Pins that name a street, square or neighbourhood (St. Marks Place, Times Square, Midtown Manhattan), not a door. */
const AREA =
  /(Street|Avenue|Place|Square|Broadway|Bowery|Manhattan|Village|District|Side|Heights|Park)$/;

/** A Library-style cover for an event next door (Lisa, 27 Nov 2026: "use the library cover style and add covers of the
 *  event next door"): the venue's own picture from its club page (flyer, ticket, invitation), else a typed cover. */
function eventCover(x: EventAt, at: string | undefined, metres: number, i: number, photo: boolean): CoverDesign {
  const e = entityFor(x.slug)!;
  const foot = { mentions: e.refs.reduce((n, r) => n + r.mentions, 0), afterparties: new Set(e.refs.map((r) => r.episode)).size };
  // A venue's picture goes on its first cover only, so a row of Studio 54 nights doesn't repeat one photo.
  const pic = photo && x.venue ? CLUB_PROFILES[x.venue]?.portrait?.polaroid : undefined;
  const where = [at, metres < 20 ? "next door" : `${Math.max(1, Math.round(metres / 80))} min walk`].filter(Boolean).join(" · ");
  // An event with its own drawn picture (src/data/event-covers.ts) wears it on every cover.
  const own = EVENT_COVERS[x.slug];
  if (own) return { name: e.name, foot, look: "art", src: own.src, alt: own.alt, tag: "Event", lines: [where] };
  return pic
    ? { name: e.name, foot, look: "art", src: pic, alt: at ?? e.name, tag: "Next door", lines: [where] }
    : { name: e.name, foot, look: "type", colour: i % 2 ? "lib-ink" : "lib-pink", kind: where || "Event" };
}

function band(
  kind: MapBand["kind"],
  here: { lat: number; lng: number },
  slug: string,
  name: string,
  area: string,
  tip: string | undefined,
  self: string | null,
): MapBand {
  // Cards at the same door (the club's own nights, a hotel's bar) are the club itself here, not dots of their own; and
  // streets, squares and neighbourhoods are where it is, not what is around it.
  const door = pins()
    .filter(
      (p) =>
        metresBetween(p, here) < SAME_DOOR ||
        (!p.club && AREA.test(p.name.replace(/\s*\(.*\)$/, ""))),
    )
    .map((p) => p.slug);
  const { map, near } = aroundMap(here, slug, name, BAND, door);
  const ev = (x: EventAt, metres?: number): MapEvent => {
    const e = entityFor(x.slug)!;
    return { slug: x.slug, name: x.name, metres, line: lineOf(e) };
  };
  const all = pinnedEvents().filter((x) => x.slug !== self);
  const hereEvents = all.filter((x) => metresBetween(x.at, here) < SAME_DOOR).map((x) => ev(x));
  const nearBy = new Map(near.map((n) => [n.slug, n.metres]));
  const nextDoor = all
    .filter((x) => metresBetween(x.at, here) >= SAME_DOOR && metresBetween(x.at, here) <= 900)
    .map((x) => ({
      x,
      m: (x.venue ? nearBy.get(x.venue) : undefined) ?? Math.round(metresBetween(x.at, here)),
    }))
    .sort((a, b) => a.m - b.m)
    .slice(0, 8)
    .map(({ x, m }, i, list) => {
      const at = x.venue ? entityFor(x.venue)?.name : undefined;
      const first = list.findIndex((y) => y.x.venue === x.venue) === i;
      return { ...ev(x, m), at, design: eventCover(x, at, m, i, first) };
    });
  return {
    kind,
    pin: { slug: kind === "club" ? slug : slug || null, name, area, tip },
    map,
    near,
    here: hereEvents,
    nextDoor,
  };
}

/** The map section of a club or event card: the band, the Bring us home block, or nothing (an event with no single place). */
export function mapSectionOf(e: Entity): { band: MapBand } | { home: MapHome } | null {
  if (e.category === "Club") {
    const here = pins().find((p) => p.slug === e.slug);
    if (here) return { band: band("club", here, e.slug, e.name, here.area, here.tip, null) };
    // A club night filed as a Club row ("Bump", "Groove Thing") sits on its club's pin like the other nights (27 Nov 2026).
    if (!EVENT_PLACES.some((x) => entityFor(x.event)?.slug === e.slug)) return { home: { kind: "club", name: e.name, hint: HOME_HINTS[e.name] } };
  } else if (e.category !== "Event") return null;
  const p = EVENT_PLACES.find((x) => entityFor(x.event)?.slug === e.slug);
  if (!p) {
    // History, tours, TV and the rest with no single place stay off the map (Lisa, 23 Nov 2026); the others come home.
    if ([...NO_SINGLE_PLACE].some((n) => entityFor(n)?.slug === e.slug)) return null;
    return { home: { kind: "event", name: e.name, hint: HOME_HINTS[e.name] } };
  }
  if (p.lat !== undefined && p.lng !== undefined)
    return {
      band: band("event", { lat: p.lat, lng: p.lng }, "", p.at, p.area ?? p.at, p.tip, e.slug),
    };
  const v = entityFor(p.at);
  const here = v && pins().find((x) => x.slug === v.slug);
  if (!v || !here) return { home: { kind: "event", name: e.name, hint: HOME_HINTS[e.name] } };
  return { band: band("event", here, v.slug, v.name, here.area, p.tip ?? here.tip, e.slug) };
}

// ---------- Living people: their rooms on a drawn New York ----------

// Manhattan's shoreline, drawn not traced (south tip, up the Hudson side, round the top, down the Harlem and East River).
const ISLAND: [number, number][] = [
  [40.7003, -74.0158],
  [40.7095, -74.017],
  [40.72, -74.0128],
  [40.73, -74.011],
  [40.742, -74.0095],
  [40.755, -74.0075],
  [40.765, -73.999],
  [40.776, -73.9915],
  [40.8, -73.972],
  [40.83, -73.951],
  [40.855, -73.938],
  [40.873, -73.927],
  [40.877, -73.922],
  [40.871, -73.911],
  [40.85, -73.928],
  [40.83, -73.934],
  [40.81, -73.933],
  [40.797, -73.929],
  [40.785, -73.94],
  [40.77, -73.948],
  [40.756, -73.963],
  [40.744, -73.971],
  [40.733, -73.9725],
  [40.725, -73.9718],
  [40.713, -73.977],
  [40.709, -73.999],
  [40.701, -74.013],
];
const HUDSON_SIDE = 9; // the first 9 points run up the Hudson
const NICE = [200, 500, 1000, 2000, 5000];

const M_LAT = 111_000;
const TURN = (29 * Math.PI) / 180;

/** A living person's rooms (src/data/person-profiles.ts) as numbered pins, in the order the page lists them. */
export function roomsMapOf(p: PersonProfile, name: string): RoomsMap | null {
  const words = name.replace(/\s*\(.*\)$/, "").split(/\s+/);
  const stops: (Pinned & { line?: MapLine | undefined })[] = [];
  const home: RoomsMap["home"] = [];
  const away: RoomsMap["away"] = [];
  const seen = new Set<string>();
  for (const room of p.rooms) {
    const e = entityFor(room);
    if (!e || !isPlace(e.category) || seen.has(e.slug)) continue;
    seen.add(e.slug);
    const pin = pins().find((x) => x.slug === e.slug);
    if (!pin) home.push({ slug: e.slug, name: e.name, hint: HOME_HINTS[e.name] });
    else if (!inNewYork(pin)) away.push({ slug: e.slug, name: e.name, area: pin.area });
    else stops.push({ ...pin, line: lineOf(e, words) });
  }
  if (!stops.length && !home.length && !away.length) return null;
  if (!stops.length) return { stops: [], map: null, home, away };
  return { ...drawnCity(stops), home, away };
}

/** One AFTERPARTY's places as numbered stops (Lisa, 27 Nov 2026, "M2 plus M3 button"): every club and place the guest
 *  names, in the order they come up in the episode, each with its own ▶ time code and what was said. Not one night: the
 *  order is the order of the talk. No pin means no guess (Bring us home); pins outside New York go to "Further away". */
export function episodeMapOf(id: string): RoomsMap | null {
  const ep = episodeById(id as never);
  const stops: (Pinned & { line?: MapLine | undefined })[] = [];
  const home: RoomsMap["home"] = [];
  const away: RoomsMap["away"] = [];
  const seen = new Set<string>();
  const rows = refsOf(id)
    .filter((r) => isPlace(r.category) && r.time && r.time !== "On camera")
    .sort((a, b) => toSeconds(a.time) - toSeconds(b.time));
  for (const r of rows) {
    const e = entityFor(r.name);
    if (!e || !isPlace(e.category) || seen.has(e.slug)) continue;
    seen.add(e.slug);
    const pin = pins().find((x) => x.slug === e.slug);
    const line: MapLine = {
      episode: id,
      short: episodeShort(id),
      guest: ep.guest,
      time: r.time,
      context: r.context,
    };
    // A whole city, country or neighbourhood (New York, East Village, Germany) is where the stops are, not a stop.
    if (pin && !pin.club && (pin.area === e.name || AREA.test(e.name.replace(/\s*\(.*\)$/, ""))))
      continue;
    if (!pin) home.push({ slug: e.slug, name: e.name, hint: HOME_HINTS[e.name], line });
    else if (!inNewYork(pin)) away.push({ slug: e.slug, name: e.name, area: pin.area });
    else stops.push({ ...pin, line });
  }
  if (!stops.length && !home.length) return null;
  if (!stops.length) return { stops: [], map: null, home, away };
  return { ...drawnCity(stops), home, away };
}

/** The drawn New York behind numbered stops, and where each number sits. */
function drawnCity(stops: (Pinned & { line?: MapLine | undefined })[]): {
  stops: MapStop[];
  map: CityMap;
} {
  // Turn the map 29 degrees so Manhattan's avenues run straight up, then fit the stops (at least 1.6 km across).
  const o = {
    lat: stops.reduce((s, x) => s + x.lat, 0) / stops.length,
    lng: stops.reduce((s, x) => s + x.lng, 0) / stops.length,
  };
  const cos = Math.cos((o.lat * Math.PI) / 180);
  const local = (lat: number, lng: number) => {
    const x = (lng - o.lng) * M_LAT * cos;
    const y = (lat - o.lat) * M_LAT;
    return {
      x: x * Math.cos(TURN) - y * Math.sin(TURN),
      y: x * Math.sin(TURN) + y * Math.cos(TURN),
    };
  };
  const pts = stops.map((s) => local(s.lat, s.lng));
  const minX = Math.min(...pts.map((q) => q.x)),
    maxX = Math.max(...pts.map((q) => q.x));
  const minY = Math.min(...pts.map((q) => q.y)),
    maxY = Math.max(...pts.map((q) => q.y));
  const spanX = Math.max(maxX - minX, 3200),
    spanY = Math.max(maxY - minY, 3200);
  // The short map box (Lisa, 28 Nov 2026): at most 520 high, and every pin inside it (the old 640 cap cut off the top and
  // bottom stops when they lay far apart north to south).
  const W = 600,
    PAD = 60,
    MAX_H = 520;
  const s = Math.min((W - 2 * PAD) / spanX, (MAX_H - 2 * PAD) / spanY);
  const H = Math.round(Math.min(MAX_H, Math.max(360, spanY * s + 2 * PAD)));
  const cx = (minX + maxX) / 2,
    cy = (minY + maxY) / 2;
  const at = (lat: number, lng: number) => {
    const q = local(lat, lng);
    return { x: W / 2 + (q.x - cx) * s, y: H / 2 - (q.y - cy) * s };
  };
  const poly = (ll: [number, number][]) =>
    ll
      .map(([a, b]) => at(a, b))
      .map((q) => `${q.x.toFixed(1)},${q.y.toFixed(1)}`)
      .join(" ");

  // Numbers never sit on each other: two rooms at one door are pushed apart, a thin line back to the true spot.
  const placed = stops.map((x) => ({ ...at(x.lat, x.lng) }));
  const dots = placed.map((q) => ({ ...q }));
  for (let round = 0; round < 200; round++) {
    let moved = false;
    for (let i = 0; i < dots.length; i++)
      for (let j = i + 1; j < dots.length; j++) {
        let dx = dots[j]!.x - dots[i]!.x,
          dy = dots[j]!.y - dots[i]!.y;
        let d = Math.hypot(dx, dy);
        if (d >= 26) continue;
        if (d < 0.01) [dx, dy, d] = [1, 0.3, 1.04];
        const push = (26 - d) / 2 + 0.3;
        dots[i]!.x -= (dx / d) * push;
        dots[i]!.y -= (dy / d) * push;
        dots[j]!.x += (dx / d) * push;
        dots[j]!.y += (dy / d) * push;
        moved = true;
      }
    if (!moved) break;
  }
  const keep = (q: { x: number; y: number }) => ({
    x: Math.min(W - 16, Math.max(16, q.x)),
    y: Math.min(H - 16, Math.max(16, q.y)),
  });

  // Water: a band of river beside each shore, and the bay below the island's tip.
  const hudson = ISLAND.slice(0, HUDSON_SIDE);
  const east = ISLAND.slice(HUDSON_SIDE + 4);
  const water = [
    poly([...hudson, ...[...hudson].reverse().map(([a, b]) => [a, b - 0.02] as [number, number])]),
    poly([...east, ...[...east].reverse().map(([a, b]) => [a, b + 0.009] as [number, number])]),
    poly([
      [40.7003, -74.0158],
      [40.701, -74.013],
      [40.709, -73.999],
      [40.704, -73.99],
      [40.69, -74.0],
      [40.685, -74.045],
      [40.7095, -74.037],
    ]),
  ];
  // Streets every third block (about 240 m) and avenues about 275 m apart, drawn straight in the turned map.
  const streets: number[] = [];
  const avenues: number[] = [];
  const st = 240 * s,
    av = 275 * s;
  for (let y = (H / 2) % st; y < H; y += st) streets.push(Math.round(y * 10) / 10);
  for (let x = (W / 2) % av; x < W; x += av) avenues.push(Math.round(x * 10) / 10);
  const bar = [...NICE].reverse().find((m) => m * s <= W / 4) ?? NICE[0]!;
  const map: CityMap = {
    w: W,
    h: H,
    water,
    island: poly(ISLAND),
    streets,
    avenues,
    scale: { px: Math.round(bar * s), label: bar >= 1000 ? `${bar / 1000} km` : `${bar} m` },
  };
  const out: MapStop[] = stops.map((x, i) => {
    const d = keep(dots[i]!);
    return {
      n: i + 1,
      slug: x.slug,
      name: x.name,
      club: x.club,
      area: x.area,
      x: Math.round(d.x * 10) / 10,
      y: Math.round(d.y * 10) / 10,
      tx: Math.round(placed[i]!.x * 10) / 10,
      ty: Math.round(placed[i]!.y * 10) / 10,
      lat: x.lat,
      lng: x.lng,
      line: x.line,
    };
  });
  return { stops: out, map };
}

/** "Where it was" on a shop page of the Library (Lisa, 27 Nov 2026): the same drawn band as a club's, the shop in the
 *  middle - found by its own pin, or by the pin named in src/data/shop-facts.ts. Null when it has no pin. */
export function shopBandOf(slug: string, pinName?: string): MapBand | null {
  const here = pins().find((p) => p.slug === slug) ?? (pinName ? pins().find((p) => p.name === pinName || p.slug === entityFor(pinName)?.slug) : undefined);
  if (!here) return null;
  return band("club", here, here.slug, here.name, here.area, here.tip, null);
}
