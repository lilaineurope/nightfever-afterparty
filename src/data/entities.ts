import refsJson from "./s06e01.json";
import refs01Json from "./s01e01.json";
import refs02Json from "./s01e02.json";
import refs301Json from "./s03e01.json";
import refs203Json from "./s02e03.json";
import refs103Json from "./s01e03.json";
import refs408Json from "./s04e08.json";
import refs506Json from "./s05e06.json";
import refs306Json from "./s03e06.json";
import refs107Json from "./s01e07.json";
import { episodes } from "./episodes";
import { guests, type Guest } from "./guests";
import { sceneEvents, type SceneEvent } from "./scene";

// One overview card per name, place, book, song, look... Every page links here.

export type Ref = {
  rank: number;
  mentions: number;
  category: string;
  name: string;
  heard: string;
  time: string;
  context: string;
  link: string;
  status: string;
  fashion?: string;
  episode?: "s06e01" | "s01e01" | "s01e02" | "s01e03" | "s02e03" | "s03e01" | "s03e06" | "s04e08" | "s05e06" | "s01e07";
};

export type Entity = {
  slug: string;
  name: string;
  category: string;
  link?: string;
  guest?: Guest;
  refs: Ref[]; // References across the indexed episodes
  events: SceneEvent[]; // scene timeline
  inGuestStories: Guest[]; // guests whose scenes/timeline mention it
};

const refs: Ref[] = [
  ...(refsJson as Ref[]).map((r) => ({ ...r, episode: "s06e01" as const })),
  ...(refs01Json as Ref[]).map((r) => ({ ...r, episode: "s01e01" as const })),
  ...(refs02Json as Ref[]).map((r) => ({ ...r, episode: "s01e02" as const })),
  ...(refs103Json as Ref[]).map((r) => ({ ...r, episode: "s01e03" as const })),
  ...(refs203Json as Ref[]).map((r) => ({ ...r, episode: "s02e03" as const })),
  ...(refs301Json as Ref[]).map((r) => ({ ...r, episode: "s03e01" as const })),
  ...(refs306Json as Ref[]).map((r) => ({ ...r, episode: "s03e06" as const })),
  ...(refs107Json as Ref[]).map((r) => ({ ...r, episode: "s01e07" as const })),
  ...(refs408Json as Ref[]).map((r) => ({ ...r, episode: "s04e08" as const })),
  ...(refs506Json as Ref[]).map((r) => ({ ...r, episode: "s05e06" as const })),
];

// Bracketed asides are dropped so "Danceteria (probably)" joins "Danceteria", but an episode code such as
// "(S01E07)" is kept, so each episode's on-camera look keeps its own card.
const clean = (n: string) =>
  n
    .replace(/\s*\(([^)]*)\)/g, (m, inner: string) => (/^S\d{2}E\d{2}$/i.test(inner.trim()) ? ` ${inner}` : ""))
    .replace(/&/g, "and")
    .replace(/^the\s+/i, "")
    .trim()
    .toLowerCase();

export const slugify = (n: string) =>
  clean(n)
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const byKey = new Map<string, Entity>();

function add(name: string, category: string, extra: { guest?: Guest; link?: string | undefined } = {}) {
  const key = slugify(name);
  if (!key) return undefined;
  let e = byKey.get(key);
  if (!e) {
    e = { slug: key, name, category, refs: [], events: [], inGuestStories: [] };
    byKey.set(key, e);
  }
  if (extra.guest) {
    e.guest = extra.guest;
    e.slug = extra.guest.slug;
    e.name = extra.guest.name;
    e.category = "Person";
  }
  if (extra.link && !e.link) e.link = extra.link;
  return e;
}

for (const g of guests) add(g.name, "Person", { guest: g });
for (const r of refs) {
  const e = add(r.name, r.category, { link: r.link || undefined });
  e?.refs.push(r);
}
const placeOf = (p: string) => p.split(",")[0]!.trim();
for (const ev of sceneEvents) {
  for (const f of ev.figures) add(f, "Person");
  add(placeOf(ev.place), "Place");
}
for (const g of guests) for (const s of g.scenes) add(s, "Place");

// Wire events and guest stories to every entity.
for (const e of byKey.values()) {
  const n = clean(e.name);
  const loose = n.length >= 5 ? n : null;
  e.events = sceneEvents.filter(
    (ev) =>
      (e.guest && ev.people.includes(e.guest.slug)) ||
      ev.figures.some((f) => slugify(f) === slugify(e.name)) ||
      slugify(placeOf(ev.place)) === slugify(e.name) ||
      (!!loose && (ev.title + " " + ev.text).toLowerCase().includes(loose)),
  );
  e.inGuestStories = guests.filter(
    (g) =>
      g !== e.guest &&
      (g.scenes.some((s) => slugify(s) === slugify(e.name)) ||
        (!!loose &&
          [g.now, ...g.timeline.map((t) => t.text)].join(" ").toLowerCase().includes(loose))),
  );
}

export const entities: Entity[] = [...byKey.values()].sort((a, b) =>
  a.name.localeCompare(b.name),
);
export const entityBySlug: Record<string, Entity> = Object.fromEntries(
  entities.map((e) => [e.slug, e]),
);
export const entityFor = (name: string): Entity | undefined =>
  byKey.get(slugify(name)) ?? entityBySlug[name];

/** Other entities that share a night, a story or a guest with this one. */
export function relatedTo(e: Entity): Entity[] {
  const out = new Map<string, Entity>();
  const push = (x?: Entity) => x && x.slug !== e.slug && out.set(x.slug, x);
  for (const ev of e.events) {
    ev.people.forEach((p) => push(entityBySlug[p]));
    ev.figures.forEach((f) => push(entityFor(f)));
    push(entityFor(placeOf(ev.place)));
  }
  e.inGuestStories.forEach((g) => push(entityBySlug[g.slug]));
  if (e.guest) {
    e.guest.scenes.forEach((s) => push(entityFor(s)));
    e.guest.linkedTo.forEach((s) => push(entityBySlug[s]));
  }
  return [...out.values()];
}

export const CATEGORIES = [
  "Person", "Music", "Organisation", "Mood", "Place", "Book", "Event",
  "Publication", "Podcast", "TV", "Film", "Fashion",
] as const;

/** Total mentions of one entity across all episode reference lists. */
export const totalMentions = (e: Entity): number =>
  e.refs.reduce((sum, r) => sum + r.mentions, 0);

/** Total mentions per category across all episodes ("Fashion" counts entries with a fashion note). */
export const categoryMentions: Record<string, number> = (() => {
  const out: Record<string, number> = { All: 0, Fashion: 0 };
  for (const c of CATEGORIES) out[c] = 0;
  for (const r of refs) {
    out["All"] = (out["All"] ?? 0) + r.mentions;
    out[r.category] = (out[r.category] ?? 0) + r.mentions;
    if (r.fashion) out["Fashion"] = (out["Fashion"] ?? 0) + r.mentions;
  }
  return out;
})();

/** "S6E1" style short label for an episode id. */
export const episodeShort = (id: string): string => {
  const ep = episodes.find((x) => x.id === id);
  return ep ? `S${ep.season}E${ep.episode}` : id;
};

/** Mentions of one entity inside a single episode. */
export const mentionsIn = (e: Entity, episode: string): number =>
  e.refs
    .filter((r) => r.episode === episode)
    .reduce((sum, r) => sum + r.mentions, 0);

/** How an entity's mentions split per episode (season/episode order, empty episodes dropped). */
export const mentionsByEpisode = (e: Entity): { episode: string; count: number }[] =>
  episodes
    .map((ep) => ({ episode: ep.id, count: mentionsIn(e, ep.id) }))
    .filter((x) => x.count > 0);

/** Mentions per category, split per episode. */
export const categoryMentionsByEpisode: Record<string, Record<string, number>> = (() => {
  const out: Record<string, Record<string, number>> = {};
  const bump = (c: string, ep: string, n: number) => {
    out[c] = out[c] ?? {};
    out[c][ep] = (out[c][ep] ?? 0) + n;
  };
  for (const r of refs) {
    const ep = r.episode ?? "";
    bump("All", ep, r.mentions);
    bump(r.category, ep, r.mentions);
    if (r.fashion) bump("Fashion", ep, r.mentions);
  }
  return out;
})();
