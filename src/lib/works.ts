// "<first>'s work" (Lisa, 22 Nov 2026: Gabriel Rotello's page should show OutWeek, and every person's own books, papers,
// films, TV, podcasts and music should show on their page). One list per person, put together from every place the site
// already knows who made what - so a new book in the stocktake or a new founder in publication-facts shows up by itself:
//   - books: the author in the Library stocktake (library-facts.ts), the publishing team (book-credits.ts) and the books
//     no guest has dropped yet (written-by.ts)
//   - diaries and journals: their keeper (diaries.ts)
//   - columns: their writer (column-articles.ts)
//   - magazines and papers: founders and the people who worked there (publication-facts.ts)
//   - books still to be written that have been made since (still-to-make.ts, "made")
//   - everything else - films, TV, podcasts, music: made-by.ts
// Shown on A–Z person pages (card-view.server.ts -> src/components/their-work.tsx) and on guests' AFTERPARTY pages.
import { afterpartyOf, entities, entityFor, slugify, type Entity } from "@/data/entities";
import { bookClub, type CollectionItem } from "@/data/collections";
import { BOOK_FACTS } from "@/data/library-facts";
import { BOOK_CREDITS } from "@/data/book-credits";
import { DIARY_PAGES } from "@/data/diaries";
import { COLUMN_PAGES } from "@/data/column-articles";
import { PRESS } from "@/data/publication-facts";
import { MADE_BY, OTHER_WORKS, type MadeRole } from "@/data/made-by";
import { WRITTEN_BY } from "@/data/written-by";
import { BOOKS_TO_WRITE, FILMS_TO_MAKE, type StillToMake } from "@/data/still-to-make";
import { COME_BACK, NEW_FACES, type InterviewTip } from "@/data/interview-next";

export type WorkKind = "Book" | "Diary" | "Magazine" | "Paper" | "Column" | "Film" | "TV" | "Podcast" | "Music" | "Club" | "Play";

export type PersonWork = {
  /** The work's A–Z card; missing for a work no guest has dropped yet. */
  slug?: string | undefined;
  name: string;
  kind: WorkKind;
  /** What they did: "Wrote it", "Founded it", "Columnist"... several when they did more than one thing. */
  roles: string[];
  year?: string | undefined;
  cover?: string | undefined;
  /** No guest has dropped it on the show yet, so it has no card. */
  offShow?: boolean | undefined;
  /** The A–Z name the Library cover is filed under. */
  coverName?: string | undefined;
};

const KIND_ORDER: WorkKind[] = ["Book", "Diary", "Magazine", "Paper", "Column", "Film", "TV", "Podcast", "Music", "Club", "Play"];
const SHELF_KIND: Record<string, WorkKind> = { books: "Book", diaries: "Diary", magazines: "Magazine", newspapers: "Paper", columns: "Column" };
const libraryBySlug = new Map(bookClub.map((b) => [b.slug, b]));

/** Names written another way than their page: a duo's page, a stage name. */
const ALIAS: Record<string, string> = {
  "Chi Chi Valenti": "Chi Chi Valenti & Johnny Dynell",
  "Johnny Dynell": "Chi Chi Valenti & Johnny Dynell",
  "Tish & Snooky Bellomo": "Tish & Snooky",
  "Luis Camacho": "Luis \"Xtravaganza\" Camacho",
  "Denise Stoughton": "Really Denise",
  "Wayne County": "Jayne County",
};

/** "Bebe Buell with Victor Bockris" -> ["Bebe Buell", "Victor Bockris"]; "Cynthia Heimel (unsigned)" -> ["Cynthia Heimel"]. */
export const namesIn = (s: string | null | undefined): string[] => authorsIn(s).filter((a) => a.role === "Wrote it").map((a) => a.name);

/** The stocktake's author line as people and what they did: "Andy Warhol, ed. Pat Hackett", "Cherry Vanilla (foreword by
 *  Rufus Wainwright)", "Russell Hoban, pictures by Lillian Hoban", "Nick Egan (ed.)", "about Peter Gatien" (nobody). */
export function authorsIn(s: string | null | undefined): { name: string; role: string }[] {
  const out: { name: string; role: string }[] = [];
  let line = (s ?? "").trim();
  if (!line || /^about\b/i.test(line)) return out;
  // Bracketed extras: "(foreword by X)", "(text by X)", "(ed.)", "(MoMA)", "(probably)".
  let edited = false;
  line = line.replace(/\s*\(([^)]*)\)/g, (_, inner: string) => {
    const by = inner.match(/^(foreword|introduction|text|pictures|photographs) by (.+)$/i);
    if (by) out.push({ name: by[2]!.trim(), role: by[1]!.toLowerCase() === "foreword" ? "Foreword" : by[1]!.toLowerCase() === "introduction" ? "Introduction" : by[1]!.toLowerCase() === "text" ? "Wrote the text" : "Pictures" });
    if (/^ed\.?$/i.test(inner.trim())) edited = true;
    return "";
  });
  line = line.replace(/\s+et al\.?$/i, "");
  for (const part of line.split(/,\s*/)) {
    const ed = part.match(/^ed\.\s+(.+)$/i);
    const pics = part.match(/^pictures by\s+(.+)$/i);
    if (ed) { out.push({ name: ed[1]!.trim(), role: "Edited it" }); continue; }
    if (pics) { out.push({ name: pics[1]!.trim(), role: "Pictures" }); continue; }
    // "Tish & Snooky Bellomo" is one page; otherwise "A with B", "A & B", "A and B" are two people.
    const whole = ALIAS[part.trim()] ?? part.trim();
    const names = entityFor(whole) ? [whole] : part.split(/\s+(?:with|and|&)\s+/);
    for (const n of names) if (n.trim()) out.push({ name: n.trim(), role: edited ? "Edited it" : "Wrote it" });
  }
  return out;
}

/** The person's card slug for a name (their A–Z card, or the slug it would have). */
const personSlug = (name: string) => {
  const n = ALIAS[name] ?? name;
  return entityFor(n)?.slug ?? slugify(n);
};

/** "Kevin Aviance – 'Alive'", "'Porcelain' – Moby", "David Bowie – Hunky Dory", "Larry Tee & Afrojack – 'Bounce'": the
 *  artists named in a Music card's own name, when they are people with a page, and whether it is a song. */
function artistsOf(name: string): { names: string[]; song: boolean } | undefined {
  const m = name.match(/^(.+?) – (.+)$/);
  if (!m) return undefined;
  const [a, b] = [m[1]!.trim(), m[2]!.trim()];
  const quoted = (x: string) => /^'.*'/.test(x);
  const [artist, title] = quoted(a) ? [b, a] : [a, b];
  const names = artist.split(/\s+(?:&|and)\s+/).map((x) => ALIAS[x.trim()] ?? x.trim()).filter((x) => entityFor(x)?.category === "Person");
  return names.length ? { names, song: quoted(title) } : undefined;
}

function kindOf(slug: string | undefined, fallback?: string): WorkKind {
  const b = slug ? libraryBySlug.get(slug) : undefined;
  if (b) return SHELF_KIND[b.shelf] ?? "Book";
  const cat = fallback ?? "";
  if (cat === "Film" || cat === "TV" || cat === "Podcast" || cat === "Music" || cat === "Club") return cat;
  if (cat === "Publication") return "Magazine";
  return "Book";
}

type Index = Map<string, Map<string, PersonWork>>; // person slug -> work key -> work

function build(): Index {
  const idx: Index = new Map();
  const add = (person: string, work: { slug?: string; name: string; category?: string; kind?: WorkKind; offShow?: boolean }, role: string, year?: string | number) => {
    const p = personSlug(person);
    if (!p) return;
    const e: Entity | undefined = work.slug ? undefined : entityFor(work.name);
    const slug = work.offShow ? undefined : (work.slug ?? e?.slug);
    // A name the A–Z doesn't know (and not marked off-show) has nothing to link to: skip it rather than show a dead line.
    if (!slug && !work.offShow) return;
    const key = slug ?? `off:${work.name}`;
    const list = idx.get(p) ?? new Map<string, PersonWork>();
    idx.set(p, list);
    const have = list.get(key);
    if (have) {
      if (!have.roles.includes(role)) have.roles.push(role);
      if (!have.year && year) have.year = String(year);
      return;
    }
    const lib = slug ? libraryBySlug.get(slug) : undefined;
    const name = lib?.name ?? (slug ? (entityFor(work.name)?.name ?? work.name) : work.name);
    // The index's research notes stay off the cover: "The Eyes of Tammy Faye (implied)" -> "The Eyes of Tammy Faye".
    const shown = name.replace(/\s*\((?:implied|probably|unpublished)\)$/i, "");
    list.set(key, {
      slug,
      name: shown,
      coverName: name,
      kind: work.kind ?? kindOf(slug, work.category ?? e?.category),
      roles: [role],
      year: year ? String(year) : undefined,
      offShow: work.offShow || undefined,
    });
  };

  // Books: the stocktake's author line, and the publishing team.
  for (const [slug, f] of Object.entries(BOOK_FACTS)) {
    if (!libraryBySlug.has(slug)) continue;
    for (const a of authorsIn(f.author)) add(a.name, { slug, name: f.title }, a.role, f.year ?? undefined);
  }
  for (const [slug, credits] of Object.entries(BOOK_CREDITS)) {
    if (!libraryBySlug.has(slug)) continue;
    for (const c of credits) if (c.role !== "Imprint" && c.role !== "Printed by" && c.role !== "Distributed by") add(c.name, { slug, name: slug }, c.role.replace(/ by$| with$/, ""));
  }
  // Books no guest has dropped yet, with their own page (src/data/written-by.ts).
  for (const w of WRITTEN_BY) {
    const slug = slugify(w.name);
    if (libraryBySlug.has(slug)) add(w.by, { slug, name: w.name }, w.role, w.year);
  }
  // Diaries and journals: the keeper.
  for (const [slug, d] of Object.entries(DIARY_PAGES)) if (libraryBySlug.has(slug)) add(d.keeper, { slug, name: slug }, "Kept it");
  // Columns: the writer.
  for (const [slug, c] of Object.entries(COLUMN_PAGES)) for (const w of namesIn(c.writer)) add(w, { slug, name: slug }, "Wrote it");
  // Magazines and papers: founders, then the people who worked there (in their role there, from the show).
  for (const [slug, p] of Object.entries(PRESS)) {
    if (!libraryBySlug.has(slug)) continue;
    for (const f of p.by ?? []) add(f, { slug, name: slug }, "Founded it", p.founded);
    for (const t of p.team ?? []) add(t.name, { slug, name: slug }, t.role);
  }
  // Songs and records named after their artist ("Martha Wash – 'Carry On'").
  for (const e of entities) {
    if (e.category !== "Music") continue;
    const a = artistsOf(e.name);
    if (a) for (const n of a.names) add(n, { slug: e.slug, name: e.name, category: "Music" }, a.song ? "Sang it" : "Made it");
  }
  // Everything else.
  for (const [work, makers] of Object.entries(MADE_BY)) for (const m of makers) add(m.name, { name: work }, m.role, m.year);
  for (const [person, works] of Object.entries(OTHER_WORKS))
    for (const w of works) add(person, { name: w.title, kind: w.kind, offShow: true }, w.role, w.year);
  return idx;
}

let INDEX: Index | undefined;

/** Everything a person made that the site knows about, books first, then by year. `coverOf` adds the Library cover
 *  (pass `(n) => coverFor(n)?.src` from library-covers.ts; kept out of this file so the tests can load it). */
export function worksOf(personSlugOrName: string, coverOf?: (name: string) => string | undefined): PersonWork[] {
  INDEX ??= build();
  const slug = INDEX.has(personSlugOrName) ? personSlugOrName : personSlug(personSlugOrName);
  const list = [...(INDEX.get(slug)?.values() ?? [])].map((w) => ({ ...w, roles: [...w.roles], cover: w.slug && coverOf ? coverOf(w.coverName ?? w.name) : undefined }));
  const yr = (w: PersonWork) => Number(w.year?.match(/\d{4}/)?.[0] ?? 9999);
  return list.sort((a, b) => Number(!!a.offShow) - Number(!!b.offShow) || KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || yr(a) - yr(b) || a.name.localeCompare(b.name));
}

/** A guest's own Library (Lisa, 22 Nov 2026, "Visit <name>'s Library"): what they made, then the books, magazines and
 *  columns dropped on their AFTERPARTY that they didn't make themselves, most dropped there first. */
export function libraryOf(
  personSlug: string,
  coverOf?: (name: string) => string | undefined,
): { works: PersonWork[]; picks: CollectionItem[]; ideas: (StillToMake & { kind: "Book" | "Film" })[]; tips: InterviewTip[]; episode?: string | undefined } {
  const works = worksOf(personSlug, coverOf);
  const e = entities.find((x) => x.slug === personSlug);
  const episode = e ? afterpartyOf(e) : undefined;
  const mine = new Set(works.map((w) => w.slug).filter(Boolean));
  const inEp = (b: CollectionItem) => b.moments.filter((m) => m.episodeId === episode).length;
  const picks = episode ? bookClub.filter((b) => !mine.has(b.slug) && inEp(b) > 0).sort((a, b) => inEp(b) - inEp(a) || b.mentions - a.mentions) : [];
  // Suggestions made on their AFTERPARTY (Lisa, 22 Nov 2026, "plus her suggestions ... same for all guests"): the books and
  // films it says should be written or made (still-to-make.ts), and who the show should have on next (interview-next.ts).
  const ideas = episode
    ? [...BOOKS_TO_WRITE.map((i) => ({ ...i, kind: "Book" as const })), ...FILMS_TO_MAKE.map((i) => ({ ...i, kind: "Film" as const }))].filter((i) => i.episodeId === episode)
    : [];
  const tips = episode ? [...NEW_FACES, ...COME_BACK].filter((t) => t.episodeId === episode) : [];
  return { works, picks, ideas, tips, episode };
}

/** Every person the site knows made something (for the check in works.test.ts and the gap list). */
export function allMakers(): string[] {
  INDEX ??= build();
  return [...INDEX.keys()];
}

export type { MadeRole };
