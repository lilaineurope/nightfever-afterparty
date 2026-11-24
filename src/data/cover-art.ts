// Cover art & posters (Lisa, 24 Nov 2026: "we should add a category cover art & posters to library"): a Library shelf of the
// artwork itself - record sleeves, film posters, TV title cards and the real club flyers, tickets and invitations - each
// with its credit and, where the sleeve's or poster's credits name them, who designed it (src/data/made-by.ts).
// Nothing new is downloaded here: it gathers the pictures already hosted on the site (src/data/library-covers.ts,
// src/data/work-covers.json and src/data/club-tickets.ts), so every new cover or ticket lands on the shelf by itself.
// Left out: band photos, logos, stills and book or magazine covers (those sit on their own shelves), pictures drawn for
// the AFTERPARTY, and the Boy Bar photo (Jillian Jonas and Village Preservation approved it for the Clubs page only).
import { toItem, type ArtPiece, type CollectionItem, type Shelf } from "./collections";
import { CLUB_TICKETS, JUKEBOX_PICTURES, type ClubTicket } from "./club-tickets";
import { entityBySlug, entityFor, slugify, type Entity } from "./entities";
import { allCovers } from "./library-covers";
import { MADE_BY } from "./made-by";

/** The shelves of the category, in this order. */
export const ART_SHELVES: Shelf[] = [
  { key: "sleeves", label: "Record sleeves" },
  { key: "posters", label: "Film posters" },
  { key: "title-cards", label: "TV title cards" },
  { key: "club-pieces", label: "Club flyers & tickets" },
];
type ArtGroup = "sleeves" | "posters" | "title-cards" | "club-pieces";

// What the credit says the picture is -> its row. A poster for a TV show or a record joins that row.
function groupOf(credit: string, e: Entity): ArtGroup | undefined {
  if (/^(Sleeve|Sheet music cover)\b/.test(credit)) return "sleeves";
  if (/^Poster\b/.test(credit))
    return e.category === "TV" ? "title-cards" : e.category === "Music" ? "sleeves" : "posters";
  if (/^(Title card|Podcast art)\b/.test(credit)) return "title-cards";
  return undefined;
}

// Only well-documented design roles: the sleeve's or poster's own credits.
const DESIGN =
  /designed the (cover|sleeve|poster|artwork)|shot the cover|cover (art|photo)|poster/i;
const designersOf = (name: string): string[] =>
  (MADE_BY[name] ?? []).filter((m) => DESIGN.test(m.role)).map((m) => m.name);

function piece(
  e: Entity,
  shelf: ArtGroup,
  art: Omit<ArtPiece, "designers" | "page">,
  name = e.name,
  page = e.slug,
): CollectionItem {
  return {
    ...toItem(e, shelf, [e.category]),
    name,
    art: { ...art, page, designers: designersOf(e.name) },
  };
}

const fromCovers: CollectionItem[] = allCovers().flatMap(([name, c]) => {
  const e = entityFor(name);
  const group = e && c.kind === "book" ? groupOf(c.credit, e) : undefined;
  if (!e || !group) return [];
  const what =
    c.credit.match(/^(Sleeve|Poster|Title card|Sheet music cover|Podcast art)/)?.[1] ?? "Cover";
  return [piece(e, group, { src: c.src, piece: what, credit: c.credit }, name)];
});

// Club pieces: the real flyers, tickets, cards and posters (never a photo, never a picture drawn for the AFTERPARTY).
const realPiece = (t: ClubTicket) => !/^Photo:|drawn for the AFTERPARTY/i.test(t.credit);

/** What a club piece was for, who made it and who is on it (Lisa, 24 Nov 2026: "who created it for what and who else was
 *  involved"), only as the piece itself and its archive listing say - no guesses. Keyed by club slug + "ticket" (the Clubs
 *  ticket picture) or "jukebox" (the Jukebox picture). Names with an A–Z card link to it on the page. */
export type ClubPieceFacts = { forWhat: string; madeBy: { role: string; name: string }[]; onIt: string[]; date?: string };
export const CLUB_PIECES: Record<string, ClubPieceFacts> = {
  "cbgb:ticket": { forWhat: "Blondie's three nights at CBGB, 17, 18 and 19 June 1976", date: "June 1976", madeBy: [], onIt: ["Blondie", "Debbie Harry"] },
  "max-s-kansas-city:ticket": { forWhat: "Theoretical Girls at Max's Kansas City, Wednesday 31 January, midnight - three xeroxes pasted into one flyer", date: "1979", madeBy: [], onIt: ["Theoretical Girls"] },
  "sound-factory:ticket": { forWhat: "The Sound Factory's Halloween costume party at 116 Crosby Street, 31 October 1988 - the year before the club opened on West 27th Street", date: "31 Oct 1988", madeBy: [{ role: "Drew it (his dancing skeletons)", name: "Keith Haring" }], onIt: ["Keith Haring", "Junior Vasquez"] },
  "danceteria:ticket": { forWhat: "A drink at Danceteria", date: "Early 1980s", madeBy: [], onIt: [] },
  "area:ticket": { forWhat: "The release party of Malcolm McLaren's Swamp Thing at Area, Halloween 1985", date: "31 Oct 1985", madeBy: [{ role: "Sent the invitation", name: "Johnny Dynell" }, { role: "Sent the invitation", name: "Nick Egan" }], onIt: ["Malcolm McLaren"] },
  "mudd-club:ticket": { forWhat: "A street poster for the Mudd Club: \"Did you say the Mudd Club is free!! 227-7777\"", date: "1979", madeBy: [{ role: "Made the poster", name: "Fernando Natalici" }], onIt: [] },
  "limelight:ticket": { forWhat: "A night at Limelight, Wednesday 2 October 1985", date: "2 Oct 1985", madeBy: [{ role: "Took the photo", name: "David LaChapelle" }], onIt: [] },
  "palladium:ticket": { forWhat: "Dianne Brill's \"Pinup Girl!\" birthday party at the Palladium", madeBy: [{ role: "Produced the party", name: "Rudolf Piper" }], onIt: ["Dianne Brill"] },
  "tunnel:ticket": { forWhat: "Ultra Violet's \"The Last Supper\" in the Tunnel's Chandelier Room", date: "22 Sep 1988", madeBy: [], onIt: ["Ultra Violet"] },
  "club-57:ticket": { forWhat: "Club 57 at 57 St. Mark's Place: a smiling woman holding a Heinz-style \"Club 57\" label", date: "Early 1980s", madeBy: [], onIt: [] },
  "pyramid-club:ticket": { forWhat: "\"Born to Be a Wild Night\", the Pyramid's benefit for Wendy Wild", date: "1995", madeBy: [], onIt: ["Wendy Wild", "Brian Butterick", "John Sex", "Lady Bunny", "Deee-Lite", "Joey Arias"] },
  "paradise-garage:ticket": { forWhat: "Vito and Roman's Charivari Christmas Party at the Paradise Garage, 84 King Street - a car stub and claim check", date: "12 Dec 1984", madeBy: [{ role: "Threw the party", name: "Charivari" }], onIt: [] },
  "studio-54:ticket": { forWhat: "Free entry to Studio 54: the silver and gold logo on a black card", madeBy: [], onIt: [] },
  "mudd-club:jukebox": { forWhat: "\"Here's Mudd in Your Ears\": a night of readings and music at the Mudd Club", date: "1981", madeBy: [], onIt: ["Nancy Reilly", "Cookie Mueller", "Chris Kraus", "Avant Squares"] },
  "palladium:jukebox": { forWhat: "The Palladium, 23 November 1985 - his brushstroke poster", date: "23 Nov 1985", madeBy: [{ role: "Made the poster", name: "Roy Lichtenstein" }], onIt: [] },
  "boy-bar:jukebox": { forWhat: "The opening party of Boybar at 15 St. Marks Place - the back of the card is his photograph of the bar", date: "1984", madeBy: [{ role: "Took the photo", name: "Georges Piette" }], onIt: [] },
  "club-57:jukebox": { forWhat: "John Savas's (later Johnny Dynell) disco performance and dance party at Club 57", date: "1979", madeBy: [], onIt: ["Johnny Dynell"] },
};

const clubPiece = (slug: string, t: ClubTicket, which: "ticket" | "jukebox"): CollectionItem[] => {
  const e = entityBySlug[slug];
  if (!e || !realPiece(t)) return [];
  const [what] = t.credit.split(/ - (?=[^-]+$)/);
  const facts = CLUB_PIECES[`${slug}:${which}`];
  const item = piece(
    e,
    "club-pieces",
    { src: t.src, piece: what ?? t.credit, credit: t.credit, href: t.href, alt: t.alt, w: t.w, h: t.h },
    e.name,
    `${slug}-${slugify(what ?? which)}`.slice(0, 80).replace(/-+$/, ""),
  );
  // The people who made a club piece are on its card too (the sleeves get theirs from made-by.ts).
  if (facts && item.art) item.art.designers = facts.madeBy.filter((m) => /drew|made|photo/i.test(m.role)).map((m) => m.name);
  return [item];
};
const fromClubs: CollectionItem[] = [
  ...Object.entries(CLUB_TICKETS).flatMap(([slug, t]) => clubPiece(slug, t, "ticket")),
  ...Object.entries(JUKEBOX_PICTURES).flatMap(([slug, t]) => clubPiece(slug, t, "jukebox")),
];

const byMentions = (a: CollectionItem, b: CollectionItem) =>
  b.mentions - a.mentions || a.name.localeCompare(b.name);

export const coverArt: CollectionItem[] = [...fromCovers, ...fromClubs].sort(byMentions);

/** Every piece by its page slug (/library/art/<page>). */
export const artByPage: Record<string, CollectionItem> = Object.fromEntries(coverArt.map((it) => [it.art!.page, it]));
/** Which CLUB_PIECES entry a club piece is. */
export const clubPieceFacts = (it: CollectionItem): ClubPieceFacts | undefined => {
  if (it.shelf !== "club-pieces") return undefined;
  const which = Object.entries(JUKEBOX_PICTURES).some(([s, t]) => s === it.slug && t.src === it.art?.src) ? "jukebox" : "ticket";
  return CLUB_PIECES[`${it.slug}:${which}`];
};
