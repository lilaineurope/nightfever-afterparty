// Cover art & posters pages (Lisa, 24 Nov 2026: "a page for every single item on who created it for what and who else was
// involved and can get credited - plus quotes of guests mentioning it and youtube box if applicable"; "the art work itself
// should be a big picture on the side"). Worked out on the server (src/lib/art-page.functions.ts), drawn by
// src/routes/library_.art.$slug.tsx. Every fact comes from data the site already keeps: the piece's credit, made-by.ts,
// the work's own credits in "The story" (item-stories), the guests' quotes (item-quotes, club quote walls) and the
// AFTERPARTY playlists - no guesses.
import { artByPage, clubPieceFacts, ART_SHELVES } from "@/data/cover-art";
import { afterpartyOf, entityFor, episodeShort, slugify } from "@/data/entities";
import { episodeById, stageName } from "@/data/episodes";
import { ITEM_QUOTES } from "@/data/item-quotes";
import { ITEM_STORIES } from "@/data/item-stories";
import { MADE_BY } from "@/data/made-by";
import { CLUB_PROFILES } from "@/data/club-profiles";
import { YOUTUBE } from "@/data/jukebox-videos";
import { cardPath } from "@/lib/card-link";
import { polaroidThumb } from "@/lib/polaroids";
import { libraryItemView } from "@/lib/library-item.server";
import type { Trailer } from "@/lib/library-item";

type Clip = { id: string; name: string; cat: string; title: string };
const clipFiles = import.meta.glob<Clip[]>("../data/episode-videos/*.json", { eager: true, import: "default" });

export type Named = { name: string; href?: string | undefined; polaroid?: string | undefined };
export type ArtPageView = {
  page: string;
  /** The work (or club) the piece belongs to, and its A–Z page. */
  name: string;
  href: string;
  /** "Record sleeve", "Film poster", "TV title card", "Club flyer & ticket". */
  kind: string;
  /** The shelf it hangs on ("Club flyers & tickets"). */
  group: string;
  piece: string;
  src: string;
  alt: string;
  w?: number | undefined;
  h?: number | undefined;
  credit: string;
  /** The archive or listing the picture comes from (club pieces). */
  source?: string | undefined;
  /** One sentence: what the piece was made for. */
  forWhat: string;
  date?: string | undefined;
  intro?: string | undefined;
  /** Who made the picture itself (designer, photographer, artist). */
  art: { role: string; people: Named[] }[];
  /** Everyone else credited on the work, role by role. */
  credited: { role: string; people: Named[] }[];
  /** People and bands named on a club piece. */
  onIt: Named[];
  quotes: { episodeId: string; short: string; who: string; time: string; quote: string; polaroid?: string | undefined }[];
  /** How it came up on the show, for guests without a quote. */
  moments: { episodeId: string; short: string; guest: string; time: string; context: string; polaroid?: string | undefined }[];
  videos: Trailer[];
  /** Other pieces on the same shelf, for the strip at the bottom. */
  more: { page: string; name: string; src: string; piece: string }[];
};

const guestPolaroid = (episodeId: string) => polaroidThumb(episodeId, 240);

/** "Madonna and Shep Pettibone" -> two names, each linked when it has an A–Z card. */
function names(value: string): Named[] {
  return value
    .split(/\s*(?:,| and | & )\s*/)
    .map((n) => n.trim())
    .filter(Boolean)
    .map(named);
}
function named(n: string): Named {
  const e = entityFor(n);
  const ep = afterpartyOf(e);
  return { name: e?.name ?? n, href: e ? cardPath(e.slug) : undefined, polaroid: ep ? guestPolaroid(ep) : undefined };
}

// The work's own credits from "The story", in the order a sleeve or a poster prints them.
const CREDIT_FACTS = ["By", "Made by", "Created by", "Directed by", "Directed and edited by", "Written by", "Lyrics", "Music", "Produced by", "Developed by", "Cinematography", "Hosted by", "Label", "Network", "Publisher"];
const KIND: Record<string, string> = { sleeves: "Record sleeve", posters: "Film poster", "title-cards": "TV title card" };
/** A club piece says what it is: "Halloween card" -> Club card, "drink ticket" -> Club ticket. */
const clubKind = (piece: string) => `Club ${/poster/i.test(piece) ? "poster" : /flyer/i.test(piece) ? "flyer" : /invitation|invite/i.test(piece) ? "invitation" : /ticket|stub/i.test(piece) ? "ticket" : /pass/i.test(piece) ? "pass" : "card"}`;
void ART_SHELVES;
const DESIGN = /designed the (cover|sleeve|poster|artwork)|shot the cover|cover (art|photo)|poster/i;

function forWhat(name: string, shelf: string, facts: Record<string, string>): string {
  const by = facts["By"] ?? facts["Made by"] ?? facts["Created by"] ?? facts["Directed by"];
  const year = facts["Out"] ?? facts["On the air"];
  const what = shelf === "sleeves" ? "The sleeve of" : shelf === "title-cards" ? "The title card of" : "The poster of";
  return `${what} ${name}${by ? `, by ${by}` : ""}${year ? ` (${year})` : ""}.`;
}

function videosFor(slug: string, name: string, firstEpisode: string | undefined): Trailer[] {
  const out: Trailer[] = [];
  const add = (t: Trailer) => {
    if (!out.some((x) => x.id === t.id)) out.push(t);
  };
  // A film or TV show: the trailers and clips its Library page plays.
  const e = entityFor(name);
  if (e) for (const t of libraryItemView(e)?.trailers ?? []) if (t.kind !== "guest") add(t);
  // Its own video in the AFTERPARTY playlists.
  for (const [path, clips] of Object.entries(clipFiles)) {
    const episodeId = path.split("/").pop()!.replace(/\.json$/, "");
    for (const c of clips) {
      if (/night fever/i.test(c.title) || c.cat === "Night Fever") continue;
      if ((entityFor(c.name)?.slug ?? slugify(c.name)) === slug) add({ id: c.id, title: c.title, label: c.name, episodeId, short: episodeShort(episodeId), kind: "clip" });
    }
  }
  // A song or record: its Jukebox video.
  const y = YOUTUBE[name];
  if (y && firstEpisode) add({ id: y, title: name, label: name, episodeId: firstEpisode, short: episodeShort(firstEpisode), kind: "clip" });
  return out.slice(0, 6);
}

export function artPageData(page: string): ArtPageView | null {
  const it = artByPage[page];
  if (!it?.art) return null;
  const e = entityFor(it.name) ?? entityFor(it.slug);
  const slug = e?.slug ?? it.slug;
  const story = ITEM_STORIES[slug];
  const facts: Record<string, string> = Object.fromEntries((story?.facts ?? []).map((f) => [f.label, f.value]));
  const club = clubPieceFacts(it);
  const makers = MADE_BY[it.name] ?? [];

  // Who made the picture itself.
  const art: ArtPageView["art"] = [];
  const addRole = (list: { role: string; people: Named[] }[], role: string, people: Named[]) => {
    for (const p of people) {
      const have = list.find((r) => r.role === role);
      if (have) {
        if (!have.people.some((x) => x.name === p.name)) have.people.push(p);
      } else list.push({ role, people: [p] });
    }
  };
  for (const m of makers.filter((m) => DESIGN.test(m.role))) addRole(art, m.role, [named(m.name)]);
  for (const m of club?.madeBy ?? []) addRole(art, m.role, [named(m.name)]);

  // Everyone else credited on the work: its own credits first, then the people on the site and what they did.
  const credited: ArtPageView["credited"] = [];
  for (const label of CREDIT_FACTS) if (facts[label]) addRole(credited, label, names(facts[label]!));
  // A club piece's people are the ones on the piece, not the club's founders.
  for (const m of club ? [] : makers.filter((m) => !DESIGN.test(m.role))) {
    if (credited.some((r) => r.people.some((p) => p.name === m.name))) continue;
    addRole(credited, m.role, [named(m.name)]);
  }

  // What the guests said: their own words about it (item quotes, or the club's quote wall for a club piece).
  const said = club ? (CLUB_PROFILES[it.slug]?.said ?? []) : (ITEM_QUOTES[slug] ?? []);
  const quotes = said.slice(0, 6).map((q) => ({ episodeId: q.episode, short: episodeShort(q.episode), who: q.who, time: q.time, quote: q.quote, polaroid: guestPolaroid(q.episode) }));
  const quoted = new Set(quotes.map((q) => q.episodeId));
  const moments = club
    ? []
    : it.moments
        .filter((m) => !quoted.has(m.episodeId) && m.context)
        .slice(0, 6)
        .map((m) => ({ episodeId: m.episodeId, short: m.code, guest: stageName(episodeById(m.episodeId).guest), time: m.time, context: m.context, polaroid: guestPolaroid(m.episodeId) }));

  const more = Object.values(artByPage)
    .filter((x) => x.shelf === it.shelf && x.art!.page !== page)
    .slice(0, 8)
    .map((x) => ({ page: x.art!.page, name: x.name, src: x.art!.src, piece: x.art!.piece }));

  const [, source] = it.art.credit.split(/ - (?=[^-]+$)/);
  return {
    page,
    name: it.name,
    href: cardPath(slug),
    kind: club ? clubKind(it.art.piece) : (KIND[it.shelf] ?? "Cover art"),
    group: ART_SHELVES.find((s) => s.key === it.shelf)?.label ?? "Cover art & posters",
    piece: it.art.piece,
    src: it.art.src,
    alt: it.art.alt ?? `${it.art.piece} - ${it.name}`,
    w: it.art.w,
    h: it.art.h,
    credit: it.art.credit,
    source: club ? source : undefined,
    forWhat: club ? `${club.forWhat}.` : forWhat(it.name, it.shelf, facts),
    date: club?.date,
    intro: club ? undefined : story?.intro,
    art,
    credited,
    onIt: (club?.onIt ?? []).map(named),
    quotes,
    moments,
    videos: videosFor(slug, it.name, it.moments[0]?.episodeId),
    more,
  };
}
