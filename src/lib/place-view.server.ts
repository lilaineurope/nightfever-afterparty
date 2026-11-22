// Server side of the place pages (src/lib/place-view.ts): the drawn map, the pins around it and the guests who talk about it.
import { entityFor, episodeShort, type Entity } from "@/data/entities";
import { LOCATIONS, type Located } from "@/data/locations";
import { episodeById } from "@/data/episodes";
import { polaroidThumb } from "@/lib/polaroids";
import type { PlacePin, PlaceView } from "@/lib/place-view";

type Pinned = Located & { slug: string; name: string; club: boolean; mentions: number };

let pinned: Pinned[] | null = null;
const pins = (): Pinned[] =>
  (pinned ??= LOCATIONS.flatMap((l) => {
    const e = entityFor(l.name);
    return e ? [{ ...l, slug: e.slug, name: e.name, club: e.category === "Club", mentions: e.refs.reduce((n, r) => n + r.mentions, 0) }] : [];
  }));

const M_LAT = 111_000;
const metresBetween = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) =>
  Math.hypot((a.lat - b.lat) * M_LAT, (a.lng - b.lng) * M_LAT * Math.cos((a.lat * Math.PI) / 180));

const inNewYork = (p: { lat: number; lng: number }) => p.lat > 40.68 && p.lat < 40.88 && p.lng > -74.03 && p.lng < -73.9;

// The drawing: 1200 x 520, drawn right-aligned (xMaxYMid slice): a narrow screen crops the left side, and on desktop the
// name card covers the left. So the place sits right of centre and every pin stays inside BOX, which is visible on a
// phone (the right ~720 units) and clear of the name card from about 1000 px wide; top and bottom keep clear of the crop
// on very wide screens.
const W = 1200;
const H = 520;
const SELF = { x: 950, y: 255 };
const BOX = { left: 760, right: 1170, top: 70, bottom: 450 };
// Manhattan's grid runs 29 degrees off true north: turning the map by it makes the avenues run straight up the page.
const TURN = (29 * Math.PI) / 180;
// Label widths in viewBox units per character (13px mono labels, 18px flyer type for the place itself).
const CH = 8;
const CH_SELF = 13;

const NICE = [50, 100, 200, 500, 1000, 2000, 5000, 10_000, 20_000, 50_000, 100_000, 200_000, 500_000, 1_000_000, 2_000_000];
const label = (m: number) => (m >= 1000 ? `${m / 1000} km` : `${m} m`);

export function placeView(e: Entity): PlaceView {
  const here = pins().find((p) => p.slug === e.slug);
  // One entry per episode: the episode's guest(s), their polaroid and the line about this place.
  const byEp = new Map<string, PlaceView["who"][number]>();
  for (const r of e.refs) {
    if (!r.episode) continue;
    const ep = episodeById(r.episode);
    const was = byEp.get(r.episode);
    if (was) {
      was.mentions += r.mentions;
      continue;
    }
    byEp.set(r.episode, {
      episode: r.episode,
      short: episodeShort(r.episode),
      guest: ep.guest,
      polaroid: polaroidThumb(r.episode, 240),
      time: r.time,
      context: r.context,
      mentions: r.mentions,
    });
  }
  const who = [...byEp.values()].sort((a, b) => b.mentions - a.mentions || a.time.localeCompare(b.time));
  const mentions = e.refs.reduce((s, r) => s + r.mentions, 0);
  if (!here) return { map: null, near: [], who, mentions };

  // Around the corner: the nearest pins within 900 m; a city or country with nothing that close shows its nearest pins
  // further away instead, so London shows the London places and Paris the Paris ones.
  const seen = new Set([e.slug]);
  const others = pins()
    .filter((p) => !seen.has(p.slug) && (seen.add(p.slug), true))
    .map((p) => ({ p, m: metresBetween(here, p) }))
    .sort((a, b) => a.m - b.m);
  // A club's own nights (Rock and Roll Church at the Limelight) sit on the club's pin: show the club, not each night.
  const venues = others.filter(
    (x) => !(x.p.club && others.some((y) => y !== x && y.p.club && y.p.mentions > x.p.mentions && metresBetween(x.p, y.p) < 15)),
  );
  let close = venues.filter((x) => x.m <= 900).slice(0, 10);
  if (close.length < 3) close = venues.filter((x) => x.m <= 300_000).slice(0, 8);

  const ny = inNewYork(here);
  const turn = ny ? TURN : 0;
  const local = (p: { lat: number; lng: number }) => {
    const x = (p.lng - here.lng) * M_LAT * Math.cos((here.lat * Math.PI) / 180);
    const y = (p.lat - here.lat) * M_LAT;
    return { x: x * Math.cos(turn) - y * Math.sin(turn), y: x * Math.sin(turn) + y * Math.cos(turn) };
  };
  // Scale (viewBox units per metre): as close as possible while every pin stays inside BOX.
  let s = 0.9;
  for (const { p } of close) {
    const { x, y } = local(p);
    if (x > 0) s = Math.min(s, (BOX.right - SELF.x) / x);
    if (x < 0) s = Math.min(s, (SELF.x - BOX.left) / -x);
    if (y > 0) s = Math.min(s, (SELF.y - BOX.top) / y);
    if (y < 0) s = Math.min(s, (BOX.bottom - SELF.y) / -y);
  }
  // Names never sit on each other: right of the dot, else left of it, else left off (the dot stays, its name on hover).
  // The place's own name sits right of its pin; a long one is cut at its first comma, and one that still runs off the
  // edge is left off (the name card beside the map carries it).
  const fitsSelf = (t: string) => SELF.x + 18 + t.length * CH_SELF < W - 8;
  const selfName = [e.name, e.name.split(",")[0]!.trim()].find(fitsSelf) ?? null;
  const selfW = 18 + (selfName?.length ?? 0) * CH_SELF;
  const placed: { x1: number; x2: number; y: number }[] = [
    { x1: SELF.x - 12, x2: SELF.x + selfW, y: SELF.y - 14 },
    { x1: SELF.x - 24, x2: SELF.x + 24, y: SELF.y + 4 },
  ];
  // Dots never hide each other: one that lands on another (two places at the same address) is moved a step aside.
  const dots: { x: number; y: number }[] = [SELF];
  const spot = (x: number, y: number) => {
    for (let ring = 0; ring < 3; ring++)
      for (let k = 0; k < 6; k++) {
        const a = (k * Math.PI) / 3 + ring * 0.5;
        const px = ring ? Math.round(x + 18 * ring * Math.cos(a)) : x;
        const py = ring ? Math.round(y + 18 * ring * Math.sin(a)) : y;
        const onDot = dots.some((d) => Math.hypot(d.x - px, d.y - py) < 16);
        const onName = ring > 0 && placed.some((b) => px + 8 > b.x1 && px - 8 < b.x2 && Math.abs(b.y - 4 - py) < 12);
        if (!onDot && !onName) return { x: px, y: py };
        if (!ring) break;
      }
    return { x, y };
  };
  const fits = (b: { x1: number; x2: number; y: number }) =>
    // Names stay inside the part of the drawing that the name card never covers.
    b.x1 > BOX.left - 20 && b.x2 < W - 4 && !placed.some((o) => Math.abs(o.y - b.y) < 16 && o.x1 < b.x2 && b.x1 < o.x2);
  const mapPins: PlacePin[] = close.map(({ p }) => {
    const { x, y } = local(p);
    const { x: px, y: py } = spot(Math.round(SELF.x + x * s), Math.round(SELF.y - y * s));
    dots.push({ x: px, y: py });
    const w = p.name.length * CH;
    // The boxes hold the name only; the dot itself was kept clear above.
    const right = { x1: px + 10, x2: px + 12 + w, y: py + 4 };
    const left = { x1: px - 12 - w, x2: px - 10, y: py + 4 };
    const side = fits(right) ? "right" : fits(left) ? "left" : null;
    if (side) placed.push(side === "right" ? right : left);
    return { x: px, y: py, slug: p.slug, name: p.name, club: p.club, label: side !== null, left: side === "left" };
  });
  const bar = NICE.find((m) => m * s >= 90) ?? NICE[NICE.length - 1]!;
  return {
    geo: { lat: here.lat, lng: here.lng },
    area: here.area,
    tip: here.tip,
    map: {
      w: W,
      h: H,
      self: SELF,
      selfName,
      pins: mapPins,
      // Street lines only when they are far enough apart to read as streets.
      grid: ny && 80 * s >= 9 ? { street: 80 * s, avenue: 260 * s } : null,
      scale: mapPins.length ? { px: Math.round(bar * s), label: label(bar) } : null,
    },
    near: close.map(({ p, m }) => ({ slug: p.slug, name: p.name, club: p.club, metres: Math.round(m) })),
    who,
    mentions,
  };
}
