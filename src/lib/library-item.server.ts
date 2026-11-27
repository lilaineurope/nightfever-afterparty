// Server side of the Library item pages (Lisa, 21 Nov 2026) - see src/lib/library-item.ts. Only card-view.server.ts loads it.
import { afterpartyOf, entityFor, episodeShort, guestOfEpisode, slugify, type Entity } from "@/data/entities";
import { bookClub } from "@/data/collections";
import { coverFor } from "@/data/library-covers";
import { coverDesign } from "@/lib/cover-design";
import { BOOK_FACTS } from "@/data/library-facts";
import { COLUMN_PAPER, ON_SCREEN } from "@/data/library-links";
import { BOOKS_TO_WRITE } from "@/data/still-to-make";
import { DIARY_PAGES } from "@/data/diaries";
import { ITEM_QUOTES } from "@/data/item-quotes";
import { BOOK_CREDITS, CREDIT_ORDER } from "@/data/book-credits";
import { ITEM_STORIES } from "@/data/item-stories";
import { PRESS, PRESS_HISTORY, PUBLISHERS } from "@/data/publication-facts";
import { WRITTEN_BY } from "@/data/written-by";
import { BOOK_FACTS_EXTRA } from "@/data/book-facts-extra";
import { episodeById, stageName } from "@/data/episodes";
import { polaroidThumb } from "@/lib/polaroids";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { namedOn } from "@/lib/name-links";
import type { AlsoOn, Connection, DroppedBy, LibraryItemView, PressView, ShelfMate, StoryView, Trailer, WriterView } from "@/lib/library-item";

type Clip = { id: string; name: string; cat: string; title: string; of?: string; first?: boolean };
// Every video in the AFTERPARTY YouTube playlists (src/data/episode-videos), by the card it belongs to.
const clipFiles = import.meta.glob<Clip[]>("../data/episode-videos/*.json", { eager: true, import: "default" });
const TRAILER = /\btrailer\b/i;
const trailersBySlug: Record<string, Trailer[]> = {};
const clipsBySlug: Record<string, Trailer[]> = {};
const aboutBySlug: Record<string, Trailer[]> = {};
const SCREEN = new Set(["Film", "TV"]);
const PRINT = new Set(["Book", "Publication"]);
for (const [path, clips] of Object.entries(clipFiles)) {
  const episodeId = path.split("/").pop()!.replace(/\.json$/, "");
  for (const c of clips) {
    if (/night fever/i.test(c.title) || c.cat === "Night Fever") continue;
    const slug = entityFor(c.name)?.slug ?? slugify(c.name);
    // A film or TV show's own clip in our playlists, when it is not a trailer (Lisa, 22 Nov 2026: Candied Camera plays its own clip).
    if (!TRAILER.test(c.title)) {
      if (SCREEN.has(c.cat)) {
        const own = (clipsBySlug[slug] ??= []);
        if (!own.some((t) => t.id === c.id)) own.push({ id: c.id, title: c.title, label: c.name, episodeId, short: episodeShort(episodeId), kind: "clip" });
      }
      // A film about a book or magazine, marked "first" in the episode's video file, plays first on its page (Lisa, 22 Nov
      // 2026: Edie: Girl on Fire on the Edie: An American Biography page).
      if (PRINT.has(c.cat) && c.first) {
        const about = (aboutBySlug[slug] ??= []);
        if (!about.some((t) => t.id === c.id)) about.push({ id: c.id, title: c.title, label: c.name, episodeId, short: episodeShort(episodeId), kind: "about" });
      }
      continue;
    }
    // A trailer of a film, show or book - never the show's own season trailers.
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

const libraryBySlug = Object.fromEntries(bookClub.map((b) => [b.slug, b]));

// Books no guest has dropped yet (src/data/written-by.ts, Lisa 22 Nov 2026): their facts come from there until the book is
// in the Library stocktake, and their page shows where the writer comes up in the episodes instead of "Who dropped it".
const writtenBy = Object.fromEntries(WRITTEN_BY.map((w) => [slugify(w.name), w]));
function writtenByFacts(slug: string): LibraryItemView["facts"] {
  const w = writtenBy[slug];
  const x = BOOK_FACTS_EXTRA[slug];
  // A Library book the stocktake has no row for yet (src/data/book-facts-extra.ts): author, year and publisher only.
  if (!w && x) return { title: x.title, author: x.author, year: x.year, publisher: x.publisher, isbn: x.isbn ?? null, inPrint: true, status: "", stockholm: null, checked: null };
  if (!w) return null;
  return {
    title: w.title,
    author: [w.by, w.with].filter(Boolean).join(" "),
    year: w.year,
    publisher: w.publisher,
    isbn: w.isbn ?? null,
    inPrint: w.inPrint ?? true,
    status: w.inPrint === true ? "In print" : w.inPrint === false ? "Out of print" : "",
    // Not checked in the Stockholm libraries yet: the borrow box shows no Stockholm list rather than a guess.
    stockholm: null,
    checked: null,
  };
}

/** Where the writer of a book no guest has dropped comes up on the show: every episode row that names them (episode,
 *  play time, what was said), and their videos from our playlists for the Jukebox. */
function writerView(e: Entity, dropped: DroppedBy[]): WriterView | null {
  const w = writtenBy[e.slug];
  if (!w || dropped.length > 0) return null;
  const p = entityFor(w.by);
  if (!p) return { name: w.by, moments: [] };
  const ep = afterpartyOf(p);
  const moments = p.refs
    .filter((r) => r.episode)
    .map((r) => ({ episodeId: r.episode as string, short: episodeShort(r.episode as string), guest: stageName(episodeById(r.episode as string).guest), time: r.time, context: r.context, mentions: r.mentions }))
    .sort((a, b) => a.episodeId.localeCompare(b.episodeId) || a.time.localeCompare(b.time));
  return { name: p.name, slug: p.slug, episodeId: ep, polaroid: ep ? guestPolaroid(ep) : PERSON_PORTRAITS[p.slug]?.polaroid, role: w.role, moments };
}

/** The writer's own videos in our playlists (the clips filed under their name). */
function writerJukebox(slug: string, name: string): Trailer[] {
  const out: Trailer[] = [];
  for (const c of allClips)
    if (c.cat === "Person" && entityFor(c.name)?.slug === slug && !out.some((t) => t.id === c.id))
      out.push({ id: c.id, title: c.title, label: name, episodeId: c.file, short: episodeShort(c.file), kind: "writer" });
  return out.slice(0, 6);
}
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
      if (r.context) have.said.push({ time: r.time, text: r.context });
      continue;
    }
    const ep = episodeById(r.episode);
    out.push({ episodeId: ep.id, short: episodeShort(ep.id), guest: stageName(ep.guest), polaroid: guestPolaroid(ep.id), time: r.time, mentions: r.mentions, said: r.context ? [{ time: r.time, text: r.context }] : [] });
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
  const facts = BOOK_FACTS[e.slug] ?? writtenByFacts(e.slug);
  const authors = (facts?.author ?? DIARY_PAGES[e.slug]?.keeper ?? "").split(/\s+(?:with|and|&)\s+|,\s*/).map((a) => a.trim()).filter(Boolean);
  if (authors.length) {
    for (const [slug, f] of Object.entries(BOOK_FACTS)) if (slug !== e.slug && authors.some((a) => f.author?.includes(a)) && libraryBySlug[slug]) add("Also by them", libraryBySlug[slug]!.name);
    for (const [slug, d] of Object.entries(DIARY_PAGES)) if (slug !== e.slug && authors.includes(d.keeper) && libraryBySlug[slug]) add("Also by them", libraryBySlug[slug]!.name);
    for (const [slug, w] of Object.entries(writtenBy)) if (slug !== e.slug && !BOOK_FACTS[slug] && authors.includes(w.by) && libraryBySlug[slug]) add("Also by them", libraryBySlug[slug]!.name);
  }
  return out;
}

/** Other Library items dropped in the same Afterparties, most shared first (covers first). Each carries its Library cover
 *  design, so it looks exactly as it does on the Library shelves (Lisa, 27 Nov 2026). */
function shelfMates(e: Entity, dropped: DroppedBy[]): ShelfMate[] {
  const eps = new Set(dropped.map((d) => d.episodeId));
  return bookClub
    .filter((b) => b.slug !== e.slug)
    .map((b) => ({ b, shared: [...new Set(b.moments.map((m) => m.episodeId).filter((id) => eps.has(id)))] }))
    .filter((x) => x.shared.length > 0)
    .sort((a, b) => b.shared.length - a.shared.length || Number(!!coverSrc(b.b.name)) - Number(!!coverSrc(a.b.name)) || b.b.mentions - a.b.mentions)
    .slice(0, 6)
    .map(({ b, shared }, i) => ({ slug: b.slug, name: b.name, design: coverDesign(b, i), eps: shared.map(episodeShort) }));
}

const PRESS_SHELVES = new Set(["magazines", "newspapers"]);
/** "Vogue magazine" -> "Vogue magazine"; "Straight to Hell (magazine)" -> "Straight to Hell magazine"; papers get "newspaper". */
function backIssueQuery(name: string, shelf: string): string {
  const base = name.replace(/\s*\((?:magazine)\)$/i, "").replace(/\s*\(.*\)$/, "").trim();
  if (shelf === "newspapers") return /newspaper/i.test(base) ? base : `${base} newspaper`;
  return /magazine|zine/i.test(base) ? base : `${base} magazine`;
}

function pressView(e: Entity, shelf: string): PressView | null {
  if (!PRESS_SHELVES.has(shelf)) return null;
  const p = PRESS[e.slug] ?? {};
  return {
    founded: p.founded ?? PRESS_HISTORY[e.slug]?.founded ?? null,
    publisher: PUBLISHERS[e.slug] ?? null,
    by: (p.by ?? []).map((name) => ({ name, slug: entityFor(name)?.slug })),
    ran: p.ran ?? PRESS_HISTORY[e.slug]?.ran ?? null,
    team: (p.team ?? []).map((t) => ({ role: t.role, name: t.name, slug: entityFor(t.name)?.slug, note: t.note, episodeId: t.episode, short: t.episode ? episodeShort(t.episode) : undefined, time: t.time })),
    issues: (p.issues ?? []).map((i) => ({ what: i.what, date: i.date, episodeId: i.episode, short: episodeShort(i.episode), guest: stageName(episodeById(i.episode).guest), polaroid: guestPolaroid(i.episode), time: i.time, search: i.search, page: i.page })),
    buy: p.online ? null : { query: p.query ?? backIssueQuery(e.name, shelf) },
  };
}

/** "The story" (Lisa, 23 Nov 2026): names and works that have an A–Z card link to it; a chapter about a work shows its cover. */
export function storyView(e: Entity): StoryView | null {
  const st = ITEM_STORIES[e.slug];
  if (!st) return null;
  const secs = (at: string) => at.split(":").reduce((n, x) => n * 60 + Number(x), 0);
  const card = (name: string) => {
    const c = entityFor(name);
    return c && c.slug !== e.slug ? c : undefined;
  };
  return {
    intro: st.intro,
    film: st.film ?? null,
    facts: st.facts,
    inIt: st.inIt.map((p) => ({ ...p, slug: card(p.name)?.slug })),
    inItLabel: st.inItLabel ?? "In it",
    chapters: (st.chapters ?? []).map((c) => {
      const to = c.card ? card(c.card) : undefined;
      return { at: c.at, secs: secs(c.at), title: c.title, slug: to?.slug, cover: to ? coverSrc(to.name) : undefined };
    }),
    since: st.since,
    reviews: (st.reviews ?? []).map((r) => {
      const c = entityFor(r.publication);
      const m = coverFor(r.publication);
      return { ...r, slug: c?.slug, mast: m?.src };
    }),
    sources: st.sources,
  };
}


// Websites and apps the guests only name as where something can be seen or heard: no story of their own to connect.
const PLATFORMS = new Set(["youtube", "spotify", "instagram", "facebook", "twitter", "tiktok", "wikipedia", "google", "imdb", "amazon", "ebay", "discogs", "apple-music", "soundcloud", "vimeo", "myspace", "netflix"]);

/** "Also on the site": the cards whose reference notes name this item, and guests who bring it up in their own AFTERPARTY
 *  without having dropped it - each with why. Leaves out platforms and anyone or anything already on the page. */
function alsoOnSite(e: Entity, v: Omit<LibraryItemView, "alsoOn">): AlsoOn[] {
  const shown = new Set<string>([e.slug]);
  const see = (name?: string | null) => name && name.split(/\s+(?:with|and|&)\s+|,\s*/).forEach((n) => { const x = entityFor(n.trim()); if (x) shown.add(x.slug); });
  v.dropped.forEach((d) => see(d.guest));
  see(v.facts?.author);
  if (v.writer?.slug) shown.add(v.writer.slug);
  for (const s of [...v.connections, ...v.shelfMates, ...v.credits, ...(v.press?.by ?? []), ...(v.press?.team ?? []), ...(v.story?.inIt ?? []), ...(v.story?.chapters ?? [])]) if (s.slug) shown.add(s.slug);
  const sinceText = (v.story?.since ?? []).map((n) => n.what.toLowerCase()).join(" ");
  const out: AlsoOn[] = [];
  for (const { entity: x, ref } of namedOn(e)) {
    if (shown.has(x.slug) || PLATFORMS.has(x.slug) || sinceText.includes(x.name.toLowerCase())) continue;
    if (out.some((o) => o.slug === x.slug && o.episodeId === ref.episode)) continue;
    out.push({ slug: x.slug, name: x.name, why: ref.context ?? "", episodeId: ref.episode, short: ref.episode ? episodeShort(ref.episode) : undefined, time: ref.time });
  }
  for (const g of e.inGuestStories) {
    const ge = entityFor(g.slug);
    if (!ge || shown.has(ge.slug) || out.some((o) => o.slug === ge.slug)) continue;
    const ep = afterpartyOf(ge);
    out.push({ slug: ge.slug, name: ge.name, why: "Brings it up in their own story", episodeId: ep, short: ep ? episodeShort(ep) : undefined });
  }
  return out;
}

export function libraryItemView(e: Entity): LibraryItemView | null {
  if (!isLibraryItem(e)) return null;
  const item = libraryBySlug[e.slug];
  const shelf = item?.shelf ?? (e.category === "TV" ? "tv" : "film");
  const c = coverFor(e.name);
  const facts = BOOK_FACTS[e.slug] ?? writtenByFacts(e.slug);
  const made = BOOKS_TO_WRITE.find((b) => b.made === "made" && b.library && entityFor(b.library)?.slug === e.slug);
  const dropped = droppedBy(e);
  const trailers = [...(trailersBySlug[e.slug] ?? [])];
  for (const f of ON_SCREEN[e.name] ?? []) for (const t of trailersBySlug[entityFor(f.name)?.slug ?? ""] ?? []) if (!trailers.some((x) => x.id === t.id)) trailers.push(t);
  // A film or TV card's own clips come after its trailers, before any guest's Jukebox.
  if (SCREEN.has(e.category)) for (const t of clipsBySlug[e.slug] ?? []) if (!trailers.some((x) => x.id === t.id)) trailers.push(t);
  // A film or video about the book or magazine plays first (Lisa, 22 Nov 2026).
  const about = (aboutBySlug[e.slug] ?? []).filter((t) => !trailers.some((x) => x.id === t.id));
  // No trailer: the Jukebox plays the guests who dropped it instead (after any film about it) - most mentions first, a few videos each.
  if (trailers.length === 0)
    for (const d of [...dropped].sort((a, b) => b.mentions - a.mentions)) {
      for (const t of guestJukebox(d.episodeId).slice(0, 3))
        if (trailers.length + about.length < 6 && !trailers.some((x) => x.id === t.id) && !about.some((x) => x.id === t.id)) trailers.push(t);
    }
  const writer = writerView(e, dropped);
  if (writer?.slug && trailers.length === 0) trailers.push(...writerJukebox(writer.slug, writer.name));
  trailers.unshift(...about);
  const quotes = (ITEM_QUOTES[e.slug] ?? []).map((q) => ({ ...q, episodeId: q.episode, short: episodeShort(q.episode), polaroid: guestPolaroid(q.episode) }));
  const view: Omit<LibraryItemView, "alsoOn"> = {
    shelf,
    // Diaries and columns already wear their keeper's or writer's polaroid on their own sections.
    cover: c && shelf !== "diaries" ? { src: c.src, credit: c.credit, mast: c.kind === "mast", light: !!c.light } : null,
    facts: facts ? { ...facts, authorGuest: authorGuest(facts.author) } : null,
    madeSince: made ? { episodeId: made.episodeId, short: episodeShort(made.episodeId), time: made.time, why: made.why, year: made.year } : null,
    dropped,
    writer,
    quotes,
    connections: connections(e, shelf),
    shelfMates: item ? shelfMates(e, dropped) : [],
    trailers,
    credits: shelf === "books"
      ? [...(BOOK_CREDITS[e.slug] ?? [])]
          .sort((a, b) => CREDIT_ORDER.indexOf(a.role) - CREDIT_ORDER.indexOf(b.role))
          .map((c) => ({ role: c.role, name: c.name, slug: entityFor(c.name)?.slug }))
      : [],
    press: pressView(e, shelf),
    story: storyView(e),
    find: shelf === "books" ? { isbn: facts?.isbn ?? null, query: [facts?.title ?? e.name.replace(/\s*\(.*\)$/, ""), facts?.author].filter(Boolean).join(" "), inPrint: facts ? facts.inPrint : null } : null,
  };
  return { ...view, alsoOn: alsoOnSite(e, view) };
}
