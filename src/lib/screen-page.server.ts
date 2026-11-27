// Moving Images pages (Lisa, 24 Nov 2026: "do it like we did it with the artwork list and pages - and instead the poster it
// would be the jukebox video bigger. info box who was involved, find as many cast and team and support information as
// possible"). Worked out on the server (src/lib/screen-page.functions.ts), drawn by
// src/routes/library_.moving-images.$slug.tsx.
// Who was involved comes from the work's own credits as Wikidata keeps them (CC0, src/data/screen-credits.json made by
// scripts/screen-credits.py), the people on the site and what they did (made-by.ts) and "The story" (item-stories) - no
// guesses. Quotes, moments and videos come from our own AFTERPARTY data, as on the Cover art pages.
import CREDITS from "@/data/screen-credits.json";
import PROVIDERS from "@/data/screen-providers.json";
import { FULL_WATCH, type FullWatch } from "@/data/screen-full";
import { SCREEN_SHELVES, screenBySlug } from "@/data/moving-images";
import { afterpartyOf, entityFor } from "@/data/entities";
import { episodeById, stageName } from "@/data/episodes";
import { episodeShort } from "@/data/entities";
import { ITEM_QUOTES } from "@/data/item-quotes";
import { ITEM_STORIES } from "@/data/item-stories";
import { coverFor } from "@/data/library-covers";
import { MADE_BY } from "@/data/made-by";
import { cardPath } from "@/lib/card-link";
import { polaroidThumb } from "@/lib/polaroids";
import { videosFor } from "@/lib/art-page.server";
import { allTapes, tapeBySlug, type Tape } from "@/lib/tapes.server";
import { entities } from "@/data/entities";
import type { Trailer } from "@/lib/library-item";

type RawPerson = { name: string; as?: string };
type RawWork = {
  qid: string;
  facts: Record<string, string | string[]>;
  team: { role: string; people: RawPerson[] }[];
  support: { role: string; names: string[] }[];
  awards: { name: string; year?: string; for?: string }[];
  nominations: number;
  imdb?: string;
};
const WORKS = CREDITS as unknown as Record<string, RawWork>;

export type Person = {
  name: string;
  href?: string | undefined;
  /** Their AFTERPARTY polaroid, when they are a guest or host. */
  polaroid?: string | undefined;
  /** The part they played. */
  as?: string | undefined;
  /** On the site (has an A–Z card). */
  ours?: boolean | undefined;
};
export type ScreenPageView = {
  slug: string;
  name: string;
  href: string;
  /** "Film", "Documentary", "TV show", "Music video". */
  kind: string;
  shelf: string;
  group: string;
  /** Where the group lives when it is not a Library shelf (a maker's tapes sit on their A–Z page). */
  groupHref?: string | undefined;
  /** "Directed by Susan Seidelman · 1982". */
  line: string;
  intro?: string | undefined;
  poster: { src: string; credit: string } | null;
  videos: Trailer[];
  facts: { label: string; value: string }[];
  team: { role: string; people: Person[] }[];
  cast: Person[];
  /** How many of the cast have a page on the site (they come first). */
  leads: number;
  support: { role: string; people: Person[] }[];
  awards: { name: string; year?: string | undefined; for?: string | undefined }[];
  nominations: number;
  quotes: { episodeId: string; short: string; who: string; time: string; quote: string; polaroid?: string | undefined }[];
  moments: { episodeId: string; short: string; guest: string; time: string; context: string; polaroid?: string | undefined }[];
  more: { slug: string; name: string; src?: string | undefined }[];
  sources: string[];
  /** The whole film, episode or video, when its owner put it up or it is public domain (src/data/screen-full.ts). */
  full: FullWatch | null;
  /** Where to watch it, country by country (TMDB, data from JustWatch: src/data/screen-providers.json). */
  watch: Watch | null;
};
export type WatchRow = { link: string; stream?: string[]; free?: string[]; ads?: string[]; rent?: string[]; buy?: string[] };
export type Watch = { tmdb: string; countries: Record<string, WatchRow> };

const KIND: Record<string, string> = {
  movies: "Film",
  documentaries: "Documentary",
  "tv-shows": "TV show",
  "music-videos": "Music video",
};

function person(name: string, as?: string): Person {
  const e = entityFor(name);
  const ep = afterpartyOf(e);
  return {
    name: e?.name ?? name,
    href: e ? cardPath(e.slug) : undefined,
    polaroid: ep ? polaroidThumb(ep, 240) : undefined,
    as: as || undefined,
    ours: !!e,
  };
}

// A made-by role ("Directed it", "In it", "Hosted it") -> the row it belongs on.
function rowOf(role: string): string {
  if (/direct/i.test(role)) return "Directed by";
  if (/wrote|writ|script/i.test(role)) return "Written by";
  if (/executive/i.test(role)) return "Executive producer";
  if (/produc/i.test(role)) return "Produced by";
  if (/host|present/i.test(role)) return "Presenter";
  if (/creat|made it|devised/i.test(role)) return "Created by";
  if (/narrat/i.test(role)) return "Narrator";
  if (/music|score|song/i.test(role)) return "Music by";
  if (/costume|styl|wardrobe/i.test(role)) return "Costume design";
  if (/star|in it|appear|cast|played|judge|contestant|guest/i.test(role)) return "Cast";
  if (/about/i.test(role)) return "About";
  return role;
}

// "The story" labels -> rows.
const STORY_ROWS: Record<string, string> = {
  "Created by": "Created by",
  "Made by": "Created by",
  By: "Created by",
  "Directed by": "Directed by",
  "Directed and edited by": "Directed by",
  "Written by": "Written by",
  "Produced by": "Produced by",
  "Hosted by": "Presenter",
  Music: "Music by",
  Cinematography: "Cinematography",
  "Developed by": "Created by",
};
const ROW_ORDER = [
  "Created by",
  "Directed by",
  "Written by",
  "Based on",
  "After a work by",
  "Presenter",
  "Narrator",
  "About",
  "Produced by",
  "Executive producer",
  "Music by",
  "Soundtrack",
  "Cinematography",
  "Edited by",
  "Production design",
  "Costume design",
  "Make-up",
  "Choreography",
  "Voice",
];
const SUPPORT_ROWS: Record<string, string> = {
  "Production company": "Production company",
  "Distributed by": "Distributed by",
  "Original network": "Network",
  "Filmed at": "Filmed at",
  "Set in": "Set in",
};

const splitNames = (v: string) =>
  v
    .split(/\s*(?:,| and | & )\s*/)
    .map((n) => n.trim())
    .filter(Boolean);

const asList = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);

export function screenPageData(slug: string): ScreenPageView | null {
  const it = screenBySlug[slug];
  if (!it) {
    const t = tapeBySlug(slug);
    return t ? tapePage(t) : null;
  }
  const e = entityFor(it.name);
  const raw = WORKS[it.name];
  const story = ITEM_STORIES[slug];
  const storyFacts: Record<string, string> = Object.fromEntries((story?.facts ?? []).map((f) => [f.label, f.value]));

  // ---- The team, role by role: the work's own credits first, then the people on the site, then "The story".
  const team: { role: string; people: Person[] }[] = [];
  const cast: Person[] = [];
  const inTeam = (row: string, name: string) =>
    row === "Cast" ? cast.some((p) => p.name === name) : !!team.find((r) => r.role === row)?.people.some((p) => p.name === name);
  const add = (row: string, name: string, as?: string) => {
    const p = person(name, as);
    if (inTeam(row, p.name)) {
      if (as && row === "Cast") {
        const have = cast.find((x) => x.name === p.name)!;
        have.as ??= as;
      }
      return;
    }
    if (row === "Cast") cast.push(p);
    else {
      const r = team.find((x) => x.role === row);
      if (r) r.people.push(p);
      else team.push({ role: row, people: [p] });
    }
  };
  for (const r of raw?.team ?? []) for (const p of r.people) add(r.role, p.name, p.as);
  for (const label of Object.keys(STORY_ROWS))
    if (storyFacts[label]) for (const n of splitNames(storyFacts[label]!)) add(STORY_ROWS[label]!, n);
  for (const p of story?.inIt ?? []) add("Cast", p.name);
  for (const m of MADE_BY[it.name] ?? []) {
    const row = rowOf(m.role);
    // Someone on the site already on a row keeps it; their own words for what they did go on a new row only if new.
    const anywhere = cast.some((p) => p.name === m.name) || team.some((r) => r.people.some((p) => p.name === m.name));
    if (anywhere && row !== "About") continue;
    add(row, m.name);
  }
  // The guests and the people with a page on the site first, then everyone else as the credits list them (by surname).
  const rank = (p: Person) => (p.polaroid ? 0 : p.ours ? 1 : 2);
  cast.sort((a, b) => rank(a) - rank(b));
  const leads = cast.filter((p) => p.ours).length;
  team.sort((a, b) => {
    const ia = ROW_ORDER.indexOf(a.role);
    const ib = ROW_ORDER.indexOf(b.role);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  // ---- Support: the companies, the network, where it was filmed and where it is set.
  const support = (raw?.support ?? []).map((s) => ({ role: SUPPORT_ROWS[s.role] ?? s.role, people: s.names.map((n) => person(n)) }));
  if (storyFacts["Network"] && !support.some((s) => s.role === "Network"))
    support.unshift({ role: "Network", people: splitNames(storyFacts["Network"]!).map((n) => person(n)) });

  // ---- Facts.
  const f = raw?.facts ?? {};
  const facts: { label: string; value: string }[] = [];
  const push = (label: string, value: string | undefined) => {
    if (value) facts.push({ label, value });
  };
  const out = asList(f["Out"])[0] ?? storyFacts["Out"];
  const first = asList(f["First aired"])[0];
  const last = asList(f["Last aired"])[0];
  const aired = first ? (last && last !== first ? `${first}–${last}` : first) : storyFacts["On the air"];
  if (it.shelf === "tv-shows") push("On the air", aired ?? out);
  else push("Out", out ?? aired);
  push("Running time", asList(f["Running time"])[0] ?? storyFacts["Length"]);
  push("Seasons", asList(f["Seasons"])[0]);
  push("Episodes", asList(f["Episodes"])[0]);
  push("Country", asList(f["Country"]).join(", "));
  push("Language", asList(f["Language"]).join(", "));
  push("Genre", asList(f["Genre"]).slice(0, 3).join(", "));
  push("Part of", asList(f["Part of"]).join(", "));
  push("Follows", asList(f["Follows"]).join(", "));
  push("Followed by", asList(f["Followed by"]).join(", "));

  // ---- The line under the title.
  const kind = KIND[it.shelf] ?? "Film";
  const lead = team.find((r) => r.role === "Directed by") ?? team.find((r) => r.role === "Created by") ?? team.find((r) => r.role === "Presenter");
  const leadWord = lead?.role === "Presenter" ? "Hosted by" : lead?.role;
  const when = it.shelf === "tv-shows" ? (aired ?? out) : (out ?? aired);
  const line = [lead ? `${leadWord} ${lead.people.slice(0, 2).map((p) => p.name).join(" and ")}` : kind, when]
    .filter(Boolean)
    .join(" · ");

  // ---- What the guests said, and how it came up for the guests without a quote (episode mention lines rule).
  const quotes = (ITEM_QUOTES[slug] ?? []).slice(0, 9).map((q) => ({
    episodeId: q.episode,
    short: episodeShort(q.episode),
    who: q.who,
    time: q.time,
    quote: q.quote,
    polaroid: polaroidThumb(q.episode, 240),
  }));
  const quoted = new Set(quotes.map((q) => q.episodeId));
  const moments = it.moments
    .filter((m) => !quoted.has(m.episodeId) && m.context)
    .slice(0, 12)
    .map((m) => ({
      episodeId: m.episodeId,
      short: m.code,
      guest: stageName(episodeById(m.episodeId).guest),
      time: m.time,
      context: m.context,
      polaroid: polaroidThumb(m.episodeId, 240),
    }));

  const cover = coverFor(it.name);
  const poster = cover && cover.kind === "book" && !/^Photo:|^Logo/i.test(cover.credit) ? { src: cover.src, credit: cover.credit } : null;
  const more = Object.values(screenBySlug)
    .filter((x) => x.shelf === it.shelf && x.slug !== slug)
    .slice(0, 10)
    .map((x) => {
      const c = coverFor(x.name);
      return { slug: x.slug, name: x.name, src: c?.kind === "book" ? c.src : undefined };
    });

  const sources = [
    ...(raw ? ["Wikidata (its credits, CC0)"] : []),
    ...(story ? ["The work's own credits"] : []),
    ...(MADE_BY[it.name] ? ["Who made what on the site"] : []),
    "AFTERPARTY references",
  ];

  return {
    slug,
    name: it.name,
    href: e ? cardPath(e.slug) : cardPath(slug),
    kind,
    shelf: it.shelf,
    group: SCREEN_SHELVES.find((s) => s.key === it.shelf)?.label ?? "Moving Images",
    line,
    intro: story?.intro,
    poster,
    videos: videosFor(slug, it.name, it.moments[0]?.episodeId),
    facts,
    team,
    cast,
    leads,
    support,
    awards: (raw?.awards ?? []).slice(0, 12),
    nominations: raw?.nominations ?? 0,
    quotes,
    moments,
    more,
    sources,
    full: FULL_WATCH[slug] ?? null,
    watch: (PROVIDERS as Record<string, Watch>)[it.name] ?? null,
  };
}

// ---- A maker's own tape (src/lib/tapes.server.ts): one of Nelson Sullivan's videos.
const ON_TAPE = new Set(["Person", "Host"]);
const WHERE = new Set(["Club", "Location", "Place"]);
const EVENT = new Set(["Event"]);
let PEOPLE: { name: string; re: RegExp }[] | undefined;
/** The people and places the site has a card for whose name is in a tape's title ("Taking Lady Bunny to The Pyramid Club"). */
function namedIn(title: string, cats: Set<string>): string[] {
  PEOPLE ??= entities
    .filter((e) => (ON_TAPE.has(e.category) || WHERE.has(e.category) || EVENT.has(e.category)) && e.name.length > 5 && /\s/.test(e.name))
    .map((e) => ({ name: e.name, re: new RegExp(`\\b${e.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/^The /, "(?:The )?")}\\b`, "i") }));
  return PEOPLE.filter((p) => cats.has(entityFor(p.name)?.category ?? "") && p.re.test(title)).map((p) => p.name);
}

function tapePage(t: Tape): ScreenPageView {
  const maker = entityFor(t.maker);
  const makerHref = maker ? `${cardPath(maker.slug)}#tapes` : "/library";
  const cast: Person[] = [];
  const addCast = (n: string) => {
    const p = person(n);
    if (p.name !== t.maker && !cast.some((x) => x.name === p.name)) cast.push(p);
  };
  const where: Person[] = [];
  const events: Person[] = [];
  const addTo = (list: Person[], n: string) => {
    const p = person(n);
    if (!list.some((x) => x.name === p.name)) list.push(p);
  };
  for (const pl of t.places) {
    const cat = entityFor(pl.name)?.category ?? pl.cat;
    if (ON_TAPE.has(cat)) addCast(pl.name);
    else if (WHERE.has(cat)) addTo(where, pl.name);
    else if (cat === "Event") addTo(events, pl.name);
  }
  for (const n of namedIn(t.title, ON_TAPE)) addCast(n);
  for (const n of namedIn(t.title, WHERE)) addTo(where, n);
  for (const n of namedIn(t.title, EVENT)) addTo(events, n);
  const rank = (p: Person) => (p.polaroid ? 0 : p.ours ? 1 : 2);
  cast.sort((a, b) => rank(a) - rank(b));

  const team = [{ role: "Filmed by", people: [person(t.maker)] }];
  const support = [
    ...(where.length ? [{ role: "Filmed at", people: where }] : []),
    ...(events.length ? [{ role: "Event", people: events }] : []),
    { role: t.whole ? "Online at" : "Licensed by", people: [{ name: t.channel.split(",")[0]! }] },
  ];
  const facts = [
    ...(t.year ? [{ label: "Filmed", value: t.year }] : []),
    { label: "Shot on", value: "Nelson's own video camera" },
    { label: "On YouTube", value: t.whole ? "The whole tape, from his archive" : "A clip, for licensing" },
  ].filter((f) => t.maker === "Nelson Sullivan" || f.label !== "Shot on");

  // How it came up: every AFTERPARTY that has it in its playlist, at the moment its card comes up, in the guest's words.
  const moments = t.places
    .map((pl) => {
      const e = entityFor(pl.name);
      const ref = e?.refs.find((r) => r.episode === pl.episodeId && (!pl.time || r.time === pl.time)) ?? e?.refs.find((r) => r.episode === pl.episodeId);
      return ref?.context
        ? {
            episodeId: pl.episodeId,
            short: episodeShort(pl.episodeId),
            guest: stageName(episodeById(pl.episodeId).guest),
            time: ref.time || pl.time,
            context: ref.context,
            polaroid: polaroidThumb(pl.episodeId, 240),
          }
        : null;
    })
    .filter((m): m is NonNullable<typeof m> => !!m)
    .slice(0, 12);
  const first = t.places[0]?.episodeId ?? "";
  const first2 = t.maker.split(" ")[0]!;

  return {
    slug: t.slug,
    name: t.title,
    href: makerHref,
    kind: t.whole ? "Video diary" : "Video clip",
    shelf: "tapes",
    group: `${t.maker}'s tapes`,
    groupHref: makerHref,
    line: [`Filmed by ${t.maker}`, t.year].filter(Boolean).join(" · "),
    intro:
      t.maker === "Nelson Sullivan"
        ? `${t.whole ? "One of the tapes" : "A clip from the tapes"} ${first2} shot as he went out in downtown New York, from 1983 until he died on 4 July 1989 - the camera in his hand, talking to it as he went. The guests don't drop the ${t.whole ? "tape" : "clip"} itself on the show; it is in the AFTERPARTY playlists for what is on it.`
        : undefined,
    poster: null,
    videos: [{ id: t.id, title: t.title, label: t.title, episodeId: first, short: first ? episodeShort(first) : "", kind: "clip" }],
    facts,
    team,
    cast,
    leads: cast.filter((p) => p.ours).length,
    support,
    awards: [],
    nominations: 0,
    quotes: [],
    moments,
    more: allTapes()
      .filter((x) => x.maker === t.maker && x.slug !== t.slug)
      .slice(0, 12)
      .map((x) => ({ slug: x.slug, name: x.title })),
    sources: [t.whole ? "The tape itself, as his archive put it online" : "The clip as Kinolibrary lists it", "AFTERPARTY references and playlists"],
    full: t.whole ? { kind: "youtube", id: t.id, title: t.title, channel: t.channel, what: "The whole tape" } : null,
    watch: null,
  };
}
