// Server side of the place pages (src/lib/place-view.ts): the drawn map, the pins around it and the guests who talk about it.
import { entityFor, episodeShort, type Entity } from "@/data/entities";
import { LOCATIONS, type Located } from "@/data/locations";
import { episodeById } from "@/data/episodes";
import { polaroidThumb } from "@/lib/polaroids";
import type { PlacePin, PlaceView } from "@/lib/place-view";

type Pinned = Located & { slug: string; name: string; club: boolean };

let pinned: Pinned[] | null = null;
const pins = (): Pinned[] =>
  (pinned ??= LOCATIONS.flatMap((l) => {
    const e = entityFor(l.name);
    return e ? [{ ...l, slug: e.slug, name: e.name, club: e.category === "Club" }] : [];
  }));

const M_LAT = 111_000;
const metresBetween = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) =>
  Math.hypot((a.lat - b.lat) * M_LAT, (a.lng - b.lng) * M_LAT * Math.cos((a.lat * Math.PI) / 180));

const inNewYork = (p: { lat: number; lng: number }) => p.lat > 40.68 && p.lat < 40.88 && p.lng > -74.03 && p.lng < -73.9;

// The drawing: 1200 x 520, the place right of the name card (the card covers the bottom left on wide screens).
const W = 1200;
const H = 520;
const SELF = { x: 760, y: 250 };
const BOX = { left: 470, right: 1150, top: 40, bottom: 470 };
// Manhattan's grid runs 29 degrees off true north: turning the map by it makes the avenues run straight up the page.
const TURN = (29 * Math.PI) / 180;

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
    .filter((x) => x.m > 15)
    .sort((a, b) => a.m - b.m);
  let close = others.filter((x) => x.m <= 900).slice(0, 10);
  if (close.length < 3) close = others.filter((x) => x.m <= 300_000).slice(0, 8);

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
  // Names never sit on each other: a label that would overlap one already placed (or the place's own name) is left off.
  const placed: { x1: number; x2: number; y: number }[] = [{ x1: SELF.x - 12, x2: SELF.x + 18 + e.name.length * 13, y: SELF.y - 14 }];
  const mapPins: PlacePin[] = close.map(({ p }) => {
    const { x, y } = local(p);
    const px = Math.round(SELF.x + x * s);
    const py = Math.round(SELF.y - y * s);
    const box = { x1: px - 8, x2: px + 12 + p.name.length * 8, y: py + 4 };
    const free = box.x2 < W && !placed.some((b) => Math.abs(b.y - box.y) < 16 && b.x1 < box.x2 && box.x1 < b.x2);
    if (free) placed.push(box);
    return { x: px, y: py, slug: p.slug, name: p.name, club: p.club, label: free };
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
