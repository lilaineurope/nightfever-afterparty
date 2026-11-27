import type { CollectionItem } from "@/data/collections";
import { coverFor } from "@/data/library-covers";
import { polaroidThumb } from "@/lib/polaroids";
import { isScreenItem } from "@/data/moving-images";
import { isFashionItem, type FashionItem } from "@/data/library-fashion";
import { FULL_WATCH } from "@/data/screen-full";
import headPaper from "@/assets/library/col-head-paper.webp";
import headOutweek from "@/assets/library/col-head-outweek.webp";
import headSoho from "@/assets/library/col-head-soho-news.webp";
import faceHeimel from "@/assets/library/col-face-cynthia-heimel.webp";

// One Library cover worked out once (the newsstand look): the Library shelves (src/routes/library.tsx), each guest's own
// Library (src/routes/library_.$slug.tsx) and "Also on the shelf in these Afterparties" on Library item pages (Lisa, 27 Nov
// 2026: "the covers don't carry over the cover designs. update for all") all draw it with CoverFace
// (src/components/cover-face.tsx), so a cover looks the same everywhere. Plain data, so a server function can send it.

export const KIND: Record<string, string> = {
  books: "Books",
  magazines: "Magazines",
  newspapers: "Newspapers",
  columns: "Columns",
  diaries: "Diary",
  movies: "Film",
  documentaries: "Documentary",
  "tv-shows": "TV",
  "music-videos": "Music video",
};

// Lisa, 21 Nov 2026: a diary's cover is the polaroid of the guest or host who kept it (their AFTERPARTY episode).
const DIARY_KEEPER: Record<string, string> = {
  "James St. James's diaries (1981–91)": "s06e01",
  "Nora Burns's diaries (1980)": "s06e05",
  "Miss Guy's journals (1989)": "s03e10",
  "Richard Boch's journals": "s02e11",
  "Ann Magnuson's journals": "s04e10",
  "Mickey Boardman's journal": "s04e02",
};

// Lisa, 21 Nov 2026: a column shows where it ran (masthead band) over the writer's polaroid (their AFTERPARTY episode).
const COLUMN_IN: Record<string, { paper: string; head: string; writer?: string; face?: string }> = {
  "Lunch with Lauren (Paper column)": { paper: "Paper", head: headPaper, writer: "s04e06" },
  "Fat and All That (Paper column)": { paper: "Paper", head: headPaper, writer: "s04e02" },
  "'Diary of a Mad Queen' (column)": { paper: "OutWeek", head: headOutweek, writer: "s06e01" },
  "Ms. Lonely Hearts": { paper: "the SoHo News", head: headSoho, face: faceHeimel }, // Cynthia Heimel, from her In memoriam polaroid
};

/** What the strip at the foot of a cover says: "by <name>" or "3× dropped in 2 Afterparties". */
export type CoverFoot = { by: string } | { mentions: number; afterparties: number };

export type CoverDesign = { name: string; foot: CoverFoot } & (
  | { look: "art"; src: string; alt: string; tag: string; lines: string[] }
  | { look: "screen"; src?: string | undefined; alt: string; tag: string; full: boolean }
  | { look: "diary"; src: string }
  | { look: "column"; face?: string | undefined; head: string; paper: string }
  | { look: "book"; src: string }
  | { look: "type"; colour: string; kind: string; mast?: string | undefined }
  | { look: "fashion"; item: FashionItem }
);

export function coverDesign(item: CollectionItem, tint: number): CoverDesign {
  const cover = coverFor(item.name);
  const name = item.name;
  const foot: CoverFoot = item.by
    ? { by: item.by.name }
    : { mentions: item.mentions, afterparties: new Set(item.moments.map((m) => m.episodeId)).size };
  // Fashion & outfits (Lisa, 24 Nov 2026): the mannequin on a swatch card for looks, typed covers or polaroids for designers,
  // carrier bags for shops - drawn by FashionCover (src/components/fashion-cover.tsx).
  if (isFashionItem(item)) return { name, foot, look: "fashion", item };
  // Cover art & posters (Lisa, 24 Nov 2026): the whole piece shows, never cropped - a square sleeve, a tall poster or a
  // wide ticket sits on black with a tag saying what it is, the designer under the name when the credits name them.
  if (item.art) {
    const lines = [
      ...(item.shelf === "club-pieces" ? [item.art.piece] : []),
      ...(item.art.designers.length > 0 ? [`Cover: ${item.art.designers.join(" & ")}`] : []),
    ];
    return {
      name,
      foot,
      look: "art",
      src: item.art.src,
      alt: `${item.art.piece} - ${name}`,
      tag: item.shelf === "club-pieces" ? "From the club" : item.art.piece,
      lines,
    };
  }
  // Moving Images (Lisa, 24 Nov 2026): the poster or title card whole on black, like Cover art & posters, tagged Film / TV /
  // Documentary; without one, a black screen card with the title.
  if (isScreenItem(item)) {
    const pic =
      cover?.kind === "book" && !/^Photo:|^Logo/i.test(cover.credit) ? cover.src : undefined;
    return {
      name,
      foot,
      look: "screen",
      src: pic,
      alt: `${item.shelf === "tv-shows" ? "Title card" : "Poster"} - ${name}`,
      tag: KIND[item.shelf] ?? "",
      full: !!FULL_WATCH[item.slug],
    };
  }
  // Lisa, 21 Nov 2026: the keeper's portrait fills the whole diary cover.
  const keeper = item.shelf === "diaries" ? DIARY_KEEPER[name] : undefined;
  const polaroid = keeper ? polaroidThumb(keeper, 512) : undefined;
  if (polaroid) return { name, foot, look: "diary", src: polaroid };
  const column = item.shelf === "columns" ? COLUMN_IN[name] : undefined;
  if (column)
    return {
      name,
      foot,
      look: "column",
      face: column.face ?? (column.writer ? polaroidThumb(column.writer, 512) : undefined),
      head: column.head,
      paper: column.paper,
    };
  if (cover?.kind === "book") return { name, foot, look: "book", src: cover.src };
  // Magazines alternate pink and black; newspapers are newsprint; columns are marker yellow; diaries are burgundy notebooks; books without a cover are black.
  const colour =
    item.shelf === "newspapers"
      ? "lib-news"
      : item.shelf === "columns"
        ? "lib-col"
        : item.shelf === "diaries"
          ? "lib-diary"
          : item.shelf === "books"
            ? "lib-ink"
            : tint % 2
              ? "lib-ink"
              : "lib-pink";
  return {
    name,
    foot,
    look: "type",
    colour,
    kind: KIND[item.shelf] ?? "",
    mast: cover?.kind === "mast" ? cover.src : undefined,
  };
}
