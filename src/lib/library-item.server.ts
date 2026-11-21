// Server side of the Library item pages (Lisa, 21 Nov 2026) - see src/lib/library-item.ts. Only card-view.server.ts loads it.
import { afterpartyOf, entityFor, episodeShort, guestOfEpisode, slugify, type Entity } from "@/data/entities";
import { bookClub } from "@/data/collections";
import { coverFor } from "@/data/library-covers";
import { BOOK_FACTS } from "@/data/library-facts";
import { COLUMN_PAPER, ON_SCREEN } from "@/data/library-links";
import { BOOKS_TO_WRITE } from "@/data/still-to-make";
import { DIARY_PAGES } from "@/data/diaries";
import { ITEM_QUOTES } from "@/data/item-quotes";
import { BOOK_CREDITS, CREDIT_ORDER } from "@/data/book-credits";
import { episodeById, stageName } from "@/data/episodes";
import { polaroidThumb } from "@/lib/polaroids";
import type { Connection, DroppedBy, LibraryItemView, ShelfMate, Trailer } from "@/lib/library-item";

type Clip = { id: string; name: string; cat: string; title: string; of?: string };
// Every video in the AFTERPARTY YouTube playlists (src/data/episode-videos), by the card it belongs to.
const clipFiles = import.meta.glob<Clip[]>("../data/episode-videos/*.json", { eager: true, import: "default" });
const TRAILER = /\btrailer\b/i;
const trailersBySlug: Record<string, Trailer[]> = {};
for (const [path, clips] of Object.entries(clipFiles)) {
  const episodeId = path.split("/").pop()!.replace(/\.json$/, "");
  for (const c of clips) {
    // A trailer of a film, show or book - never the show's own season trailers.
    if (!TRAILER.test(c.title) || /night fever/i.test(c.title) || c.cat === "Night Fever") continue;
    const slug = entityFor(c.name)?.slug ?? slugify(c.name);
    const list = (trailersBySlug[slug] ??= []);
    if (!list.some((t) => t.id === c.id)) list.push({ id: c.id, title: c.title, label: c.name, episodeId, short: episodeShort(episodeId) });
  }
}

// The guest's own Jukebox (Lisa, 21 Nov 2026: "if there is no trailer for the book, use the jukebox for the guest"): their
// Night Fever episode on YouTube where there is one, then the videos about them in our playlists.
const allClips = Object.entries(clipFiles).flatMap(([path, clips]) => clips.map((c) => ({ ...c, file: path.split("/").pop()!.replace(/\.json$/, "") })));
function guestJukebox(episodeId: string): Trailer[] {
  const g = guestOfEpisode(episodeId);
  const name = g ? g.name : stageName(episodeById(episodeId).guest);
  const out: Trailer[] = [];
  const add = (c: (typeof allClips)[number]) => {
    if (!out.some((t) => t.id === c.id)) out.push({ id: c.id, title: c.title, label: name, episodeId, short: episodeShort(episodeId), kind: "guest" });
  };
  for (const c of allClips) if (c.cat === "Night Fever" && c.of === episodeId) add(c);
  if (g) for (const c of allClips) if (c.cat === "Person" && entityFor(c.name)?.slug === g.slug) add(c);
  return out;
}

const SCREEN = new Set(["Film", "TV"]);
const libraryBySlug = Object.fromEntries(bookClub.map((b) => [b.slug, b]));
const guestPolaroid = (episodeId: string) => polaroidThumb(episodeId, 240);

/** The card is a Library item (any shelf) or a film / TV card. */
export function isLibraryItem(e: Entity): boolean {
  return !!libraryBySlug[e.slug] || SCREEN.has(e.category);
}

function droppedBy(e: Entity): DroppedBy[] {
  const out: DroppedBy[] = [];
  for (const r of e.refs) {
    if (!r.episode) continue;
    const have = out.find((x) => x.episodeId === r.episode);
    if (have) {
      have.mentions += r.mentions;
      continue;
    }
    const ep = episodeById(r.episode);
    out.push({ episodeId: ep.id, short: episodeShort(ep.id), guest: stageName(ep.guest), polaroid: guestPolaroid(ep.id), time: r.time, mentions: r.mentions });
  }
  return out;
}

/** "Bebe Buell with Victor Bockris" -> the first author who is a Night Fever guest with an AFTERPARTY. */
function authorGuest(author: string | null) {
  if (!author) return undefined;
  for (const n of author.split(/\s+(?:with|and|&)\s+|,\s*/)) {
    const g = entityFor(n.trim());
    const ep = afterpartyOf(g);
    if (g && ep) return { name: g.name, episodeId: ep, short: episodeShort(ep), polaroid: guestPolaroid(ep) };
  }
  return undefined;
}

const coverSrc = (name: string) => {
  const c = coverFor(name);
  return c?.kind === "book" ? c.src : undefined;
};

function connections(e: Entity, shelf: string): Connection[] {
  const out: Connection[] = [];
  const add = (label: string, name: string, note?: string) => {
    const c = entityFor(name);
    if (c && c.slug !== e.slug && !out.some((x) => x.slug === c.slug)) out.push({ label, slug: c.slug, name: c.name, note, cover: coverSrc(c.name) });
  };
  // Page to screen, both ways.
  for (const f of ON_SCREEN[e.name] ?? []) add("On screen", f.name, f.note);
  for (const [book, films] of Object.entries(ON_SCREEN)) if (films.some((f) => entityFor(f.name)?.slug === e.slug)) add("The book", book);
  // A column and its paper, both ways.
  const paperOf = (col: string) => COLUMN_PAPER[col] ?? bookClub.find((b) => b.shelf !== "columns" && b.name.length > 3 && col.includes(`(${b.name}`))?.name;
  if (shelf === "columns") {
    const p = paperOf(e.name);
    if (p) add("Ran in", p);
  }
  for (const col of bookClub.filter((b) => b.shelf === "columns")) if (paperOf(col.name) && entityFor(paperOf(col.name)!)?.slug === e.slug) add("Column in it", col.name);
  // More by the same writer: their other books and their diaries.
  const facts = BOOK_FACTS[e.slug];
  const authors = (facts?.author ?? DIARY_PAGES[e.slug]?.keeper ?? "").split(/\s+(?:with|and|&)\s+|,\s*/).map((a) => a.trim()).filter(Boolean);
  if (authors.length) {
    for (const [slug, f] of Object.entries(BOOK_FACTS)) if (slug !== e.slug && authors.some((a) => f.author?.includes(a)) && libraryBySlug[slug]) add("Also by them", libraryBySlug[slug]!.name);
    for (const [slug, d] of Object.entries(DIARY_PAGES)) if (slug !== e.slug && authors.includes(d.keeper) && libraryBySlug[slug]) add("Also by them", libraryBySlug[slug]!.name);
  }
  return out;
}

/** Other Library items dropped in the same Afterparties, most shared first (covers first). */
function shelfMates(e: Entity, dropped: DroppedBy[]): ShelfMate[] {
  const eps = new Set(dropped.map((d) => d.episodeId));
  return bookClub
    .filter((b) => b.slug !== e.slug)
    .map((b) => ({ b, shared: [...new Set(b.moments.map((m) => m.episodeId).filter((id) => eps.has(id)))] }))
    .filter((x) => x.shared.length > 0)
    .sort((a, b) => b.shared.length - a.shared.length || Number(!!coverSrc(b.b.name)) - Number(!!coverSrc(a.b.name)) || b.b.mentions - a.b.mentions)
    .slice(0, 6)
    .map(({ b, shared }) => ({ slug: b.slug, name: b.name, cover: coverSrc(b.name), shelf: b.shelf, eps: shared.map(episodeShort) }));
}

export function libraryItemView(e: Entity): LibraryItemView | null {
  if (!isLibraryItem(e)) return null;
  const item = libraryBySlug[e.slug];
  const shelf = item?.shelf ?? (e.category === "TV" ? "tv" : "film");
  const c = coverFor(e.name);
  const facts = BOOK_FACTS[e.slug];
  const made = BOOKS_TO_WRITE.find((b) => b.made === "made" && b.library && entityFor(b.library)?.slug === e.slug);
  const dropped = droppedBy(e);
  const trailers = [...(trailersBySlug[e.slug] ?? [])];
  for (const f of ON_SCREEN[e.name] ?? []) for (const t of trailersBySlug[entityFor(f.name)?.slug ?? ""] ?? []) if (!trailers.some((x) => x.id === t.id)) trailers.push(t);
  // No trailer: the Jukebox plays the guests who dropped it instead - most mentions first, a few videos each.
  if (trailers.length === 0)
    for (const d of [...dropped].sort((a, b) => b.mentions - a.mentions)) {
      for (const t of guestJukebox(d.episodeId).slice(0, 3)) if (trailers.length < 6 && !trailers.some((x) => x.id === t.id)) trailers.push(t);
    }
  const quotes = (ITEM_QUOTES[e.slug] ?? []).map((q) => ({ ...q, episodeId: q.episode, short: episodeShort(q.episode), polaroid: guestPolaroid(q.episode) }));
  return {
    shelf,
    // Diaries and columns already wear their keeper's or writer's polaroid on their own sections.
    cover: c && shelf !== "diaries" ? { src: c.src, credit: c.credit, mast: c.kind === "mast" } : null,
    facts: facts ? { ...facts, authorGuest: authorGuest(facts.author) } : null,
    madeSince: made ? { episodeId: made.episodeId, short: episodeShort(made.episodeId), time: made.time, why: made.why, year: made.year } : null,
    dropped,
    quotes,
    connections: connections(e, shelf),
    shelfMates: item ? shelfMates(e, dropped) : [],
    trailers,
    credits: shelf === "books"
      ? [...(BOOK_CREDITS[e.slug] ?? [])]
          .sort((a, b) => CREDIT_ORDER.indexOf(a.role) - CREDIT_ORDER.indexOf(b.role))
          .map((c) => ({ role: c.role, name: c.name, slug: entityFor(c.name)?.slug }))
      : [],
    find: shelf === "books" ? { isbn: facts?.isbn ?? null, query: [facts?.title ?? e.name.replace(/\s*\(.*\)$/, ""), facts?.author].filter(Boolean).join(" "), inPrint: facts ? facts.inPrint : null } : null,
  };
}
