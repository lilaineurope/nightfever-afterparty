// Cover art & posters (Lisa, 24 Nov 2026: "we should add a category cover art & posters to library"): a Library shelf of the
// artwork itself - record sleeves, film posters, TV title cards and the real club flyers, tickets and invitations - each
// with its credit and, where the sleeve's or poster's credits name them, who designed it (src/data/made-by.ts).
// Nothing new is downloaded here: it gathers the pictures already hosted on the site (src/data/library-covers.ts,
// src/data/work-covers.json and src/data/club-tickets.ts), so every new cover or ticket lands on the shelf by itself.
// Left out: band photos, logos, stills and book or magazine covers (those sit on their own shelves), pictures drawn for
// the AFTERPARTY, and the Boy Bar photo (Jillian Jonas and Village Preservation approved it for the Clubs page only).
import { toItem, type ArtPiece, type CollectionItem, type Shelf } from "./collections";
import { CLUB_TICKETS, JUKEBOX_PICTURES, type ClubTicket } from "./club-tickets";
import { entityBySlug, entityFor, type Entity } from "./entities";
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
  art: Omit<ArtPiece, "designers">,
  name = e.name,
): CollectionItem {
  return {
    ...toItem(e, shelf, [e.category]),
    name,
    art: { ...art, designers: designersOf(e.name) },
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
const clubPiece = (slug: string, t: ClubTicket): CollectionItem[] => {
  const e = entityBySlug[slug];
  if (!e || !realPiece(t)) return [];
  const [what] = t.credit.split(/ - (?=[^-]+$)/);
  return [
    piece(e, "club-pieces", {
      src: t.src,
      piece: what ?? t.credit,
      credit: t.credit,
      href: t.href,
    }),
  ];
};
const fromClubs: CollectionItem[] = [
  ...Object.entries(CLUB_TICKETS).flatMap(([slug, t]) => clubPiece(slug, t)),
  ...Object.entries(JUKEBOX_PICTURES).flatMap(([slug, t]) => clubPiece(slug, t)),
];

const byMentions = (a: CollectionItem, b: CollectionItem) =>
  b.mentions - a.mentions || a.name.localeCompare(b.name);

export const coverArt: CollectionItem[] = [...fromCovers, ...fromClubs].sort(byMentions);
