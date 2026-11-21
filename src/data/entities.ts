import { episodes, episodeIdOf, episodePath } from "./episodes";
import { registerFullLinks, type LinkCard } from "../lib/link-index";
import { EPISODE_REFS } from "./episode-refs";
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
  episode?: "s06e01" | "s01e01" | "s01e02" | "s01e03" | "s02e03" | "s03e01" | "s03e06" | "s04e08" | "s05e06" | "s01e07" | "s06e03" | "s05e04" | "s04e10" | "s02e08" | "s05e03" | "s06e08" | "s02e06" | "s01e04" | "s02e04" | "s06e07" | "s01e10" | "s03e08" | "s04e04" | "s02e01" | "s01e06" | "s02e07" | "s02e05" | "s03e10" | "s05e01" | "s02e11" | "s01e08" | "s03e04" | "s04e07" | "s05e10" | "s04e09" | "s01e05" | "s06e06" | "s02e09" | "s03e03" | "s04e03" | "s03e02" | "s02e02" | "s03e05" | "s06e02" | "s06e05" | "s05e07a" | "s05e07b" | "s01e09" | "s04e02" | "s04e06" | "s04e05" | "s02e10" | "s03e07";
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

const refs: Ref[] = EPISODE_REFS.flatMap(([episode, rows]) => rows.map((r) => ({ ...r, episode })));

// Bracketed asides are dropped so "Danceteria (probably)" joins "Danceteria", but an episode code such as
// "(S01E07)" is kept, so each episode's on-camera look keeps its own card.
const clean = (n: string) =>
  n
    .replace(/\s*\(([^)]*)\)/g, (m, inner: string) => (/^S\d{2}E\d{2}$/i.test(inner.trim()) ? ` ${inner}` : ""))
    .replace(/&/g, "and")
    .replace(/^the\s+/i, "")
    .trim()
    .toLowerCase();

// The same thing named two ways in different episodes: one card, every episode's mentions kept on it
// (Lisa, 21 Nov 2026: "double ups in magazines eg paper"). The old address forwards to the card (card-view.server.ts).
export const SAME_AS: Record<string, string> = {
  "paper-magazine": "paper",
  // S06E01: the badger book James sang from is Russell Hoban's Frances book (found 21 Nov 2026) - old card URL redirects.
  "children-s-book-about-a-badger": "egg-thoughts-and-other-frances-songs",
};

// Remembered per name: the site slugifies the same few thousand names over and over while it starts up.
const slugCache = new Map<string, string>();
export const slugify = (n: string) => {
  let s = slugCache.get(n);
  if (s === undefined) {
    s = clean(n)
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    s = SAME_AS[s] ?? s;
    slugCache.set(n, s);
  }
  return s;
};

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
// Lisa, 21 Nov 2026: diaries and journals the guests kept are Diaries, not Books - their card says Diary, the A–Z has a
// Diary chip. Only books: The Wall Street Journal stays a Publication, The Basketball Diaries stays a Film.
export const DIARY_NAME = /\b(diary|diaries|journals?)\b/i;
export const isDiary = (category: string, name: string) => category === "Book" && DIARY_NAME.test(name);
for (const e of byKey.values()) if (isDiary(e.category, e.name)) e.category = "Diary";
// Scene and guest-story labels that are not a place or a thing of their own - they get no card (the text still shows).
const NOT_A_CARD = new Set(
  ["Worldwide", "Cinemas worldwide", "US daytime television", "Music video era", "NYC dance floors",
   "Downtown celebutante scene", "East Village performance"].map((n) => n.toLowerCase()),
);
// Cards known only from the Timeline or guest stories, so no episode row sets their category.
const CARD_CATEGORY: Record<string, string> = {
  "sound-factory": "Club", "junior-vasquez-nights": "Club", bartschland: "Club", wigstock: "Event",
  "london-punk": "Music", "nyc-dance-music": "Music", "logo-tv": "Organisation", fox: "Organisation",
  "v2-records": "Organisation", "cirque-du-soleil": "Organisation",
};
const known = (n: string) => !NOT_A_CARD.has(n.trim().toLowerCase());

// Which card(s) a scene place points to. A place that already has its own card under its full name
// ("The Pants Pub, Washington Place") keeps it; otherwise the text before the first comma names the card
// ("Max's Kansas City, Park Avenue South"), and "London and New York" points to both London and New York.
const placesOf = (p: string): string[] => {
  if (!p.trim() || !known(p)) return [];
  if (byKey.has(slugify(p))) return [p];
  const head = p.split(",")[0]!.trim();
  if (/ and /i.test(head)) {
    const parts = head.split(/ and /i).map((x) => x.trim()).filter((x) => byKey.has(slugify(x)));
    if (parts.length) return parts;
  }
  return known(head) ? [head] : [];
};
for (const ev of sceneEvents) {
  for (const f of ev.figures) add(f, CARD_CATEGORY[slugify(f)] ?? "Person");
  for (const pl of placesOf(ev.place)) add(pl, CARD_CATEGORY[slugify(pl)] ?? "Location");
}
for (const g of guests) for (const s of g.scenes) if (known(s)) add(s, CARD_CATEGORY[slugify(s)] ?? "Location");

// Wire events and guest stories to every entity.
// Each event's and guest's slugs and lower-case text are worked out once here, not once per entity:
// doing it inside the entity loop took seconds and made the server time out while starting up.
const eventIndex = sceneEvents.map((ev) => ({
  ev,
  slugs: new Set([...ev.figures.map(slugify), ...placesOf(ev.place).map(slugify)]),
  text: (ev.title + " " + ev.text).toLowerCase(),
}));
const guestIndex = guests.map((g) => ({
  g,
  scenes: new Set(g.scenes.map(slugify)),
  text: [g.now, ...g.timeline.map((t) => t.text)].join(" ").toLowerCase(),
}));
for (const e of byKey.values()) {
  const n = clean(e.name);
  const loose = n.length >= 5 ? n : null;
  const self = slugify(e.name);
  e.events = eventIndex
    .filter(
      ({ ev, slugs, text }) =>
        (e.guest && ev.people.includes(e.guest.slug)) ||
        slugs.has(self) ||
        (!!loose && text.includes(loose)),
    )
    .map((x) => x.ev);
  e.inGuestStories = guestIndex
    .filter(
      ({ g, scenes, text }) =>
        g !== e.guest && (scenes.has(self) || (!!loose && text.includes(loose))),
    )
    .map((x) => x.g);
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
    placesOf(ev.place).forEach((pl) => push(entityFor(pl)));
  }
  e.inGuestStories.forEach((g) => push(entityBySlug[g.slug]));
  if (e.guest) {
    e.guest.scenes.forEach((s) => push(entityFor(s)));
    e.guest.linkedTo.forEach((s) => push(entityBySlug[s]));
  }
  return [...out.values()];
}

export const CATEGORIES = [
  "Person", "Music", "Organisation", "Mood", "Club", "Location", "Book", "Diary", "Event",
  "Publication", "Podcast", "TV", "Film", "Fashion",
] as const;

export const isPlace = (category: string) => category === "Club" || category === "Location";

/** Total mentions of one entity across all episode reference lists. */
export const totalMentions = (e: Entity): number =>
  e.refs.reduce((sum, r) => sum + r.mentions, 0);

/** Total mentions per category across all episodes ("Fashion" counts entries with a fashion note). */
export const categoryMentions: Record<string, number> = (() => {
  const out: Record<string, number> = { All: 0, Fashion: 0 };
  for (const c of CATEGORIES) out[c] = 0;
  for (const r of refs) {
    out["All"] = (out["All"] ?? 0) + r.mentions;
    const c = isDiary(r.category, r.name) ? "Diary" : r.category;
    out[c] = (out[c] ?? 0) + r.mentions;
    if (r.fashion) out["Fashion"] = (out["Fashion"] ?? 0) + r.mentions;
  }
  return out;
})();

/** "S6E1" style short label for an episode id. */
export const episodeShort = (id: string): string => {
  const ep = episodes.find((x) => x.id === id);
  return ep ? `S${ep.season}E${ep.episode}${ep.part ?? ""}` : id;
};

/** Mentions of one entity inside a single episode. */
export const mentionsIn = (e: Entity, episode: string): number =>
  e.refs
    .filter((r) => r.episode === episode)
    .reduce((sum, r) => sum + r.mentions, 0);

/** A card that appears in only one episode with nothing else around it: kept for visitors,
 * but left out of the sitemap and marked noindex so Google sees the rich cards instead. */
/** Sitemap (Lisa, 27 Oct 2026): thin cards stay out, so Google spends its visits on the strongest pages first.
 *  Every other card stays on the site, linked from its episodes. */
// Every card Google may index goes in the sitemap (SEO check, 4 Nov 2026): the same line as the noindex rule, so a
// one-episode card with timeline moments or guest stories (Voguing, Rocky Horror) is listed too. Thin cards stay out.
export const inSitemap = (e: Entity): boolean => !afterpartyOf(e) && !isThinCard(e);

export const isThinCard = (e: Entity): boolean =>
  !e.guest &&
  new Set(e.refs.map((r) => r.episode)).size < 2 &&
  e.events.length === 0 &&
  e.inGuestStories.length === 0;

/** One page per guest (Lisa, 1 Nov 2026): a guest whose AFTERPARTY is on the site has ONE page, the episode page.
 *  Their A–Z card address forwards there and every name link goes straight there. Guests without an AFTERPARTY
 *  yet keep their A–Z card until their episode is registered in episodes.ts. */
export function afterpartyOf(e: Entity | undefined): NonNullable<Ref["episode"]> | undefined {
  if (!e?.guest) return undefined;
  const id = episodeIdOf(e.guest.episode);
  if (!id) return undefined;
  return episodes.some((x) => x.id === id) ? (id as NonNullable<Ref["episode"]>) : undefined;
}

/** The guest card that belongs to an episode page (undefined for an episode without one). */
export const guestOfEpisode = (id: string): Entity | undefined => entities.find((e) => afterpartyOf(e) === id);

// The full name -> card lookups for EntityLink and EntityText on every page that loads the A–Z (src/lib/link-index.tsx).
export const linkCard = (e: Entity | undefined): LinkCard | undefined => {
  if (!e) return undefined;
  const ep = afterpartyOf(e);
  return { slug: e.slug, name: e.name, to: ep ? episodePath(ep) : `/explore/${e.slug}` };
};
registerFullLinks({ cardForName: (name) => linkCard(entityFor(name)), cardForSlug: (slug) => linkCard(entityBySlug[slug]) });
