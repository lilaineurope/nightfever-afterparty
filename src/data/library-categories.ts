// Library categories (Lisa, 24 Nov 2026: "we should add a category cover art & posters to library", and Fashion & outfits the
// same day): the Library is a row of categories, each with its own shelves. Publications (books, magazines, newspapers,
// columns, diaries) is the first and the default - bookClub stays the publications list that A–Z, the stocktake, guest
// Libraries and item pages read. A new category (Bands, TV, Movies... on Lisa's idea list) is its own data file that makes
// CollectionItems with its shelf keys, plus ONE line below. The Library page (src/routes/library.tsx) shows the row, the
// chosen category's shelf chips and its EVERYTHING count, and keeps the choice in the address (/library?cat=<key>).
import { BOOK_SHELVES, bookClub, type CollectionItem, type Shelf } from "./collections";
import { ART_SHELVES, coverArt } from "./cover-art";
import { FASHION_SHELVES, fashionShelf } from "./library-fashion";
import { SCREEN_SHELVES, movingImages } from "./moving-images";

export type LibraryCategory = {
  key: string;
  label: string;
  /** One line under the row, saying what the category holds. */
  blurb: string;
  shelves: Shelf[];
  items: CollectionItem[];
};

export const LIBRARY_CATEGORIES: LibraryCategory[] = [
  {
    key: "publications",
    label: "Publications",
    blurb: "Every book, magazine and column the guests drop. Tap a cover for every moment.",
    shelves: BOOK_SHELVES,
    items: bookClub,
  },
  {
    key: "art",
    label: "Cover art & posters",
    blurb:
      "The sleeves, posters, title cards and club flyers of everything the guests drop - each credited. Tap one for every moment.",
    shelves: ART_SHELVES,
    items: coverArt,
  },
  {
    key: "fashion",
    label: "Fashion & outfits",
    blurb:
      "The designers and labels, the shops and boutiques, and every outfit told in the stories - each in its own colours. Tap one for every moment.",
    shelves: FASHION_SHELVES,
    items: fashionShelf,
  },
  {
    key: "moving-images",
    label: "Moving Images",
    blurb:
      "Every film, documentary and TV show the guests drop - with its clip, its cast and its whole team. Tap one for every moment.",
    shelves: SCREEN_SHELVES,
    items: movingImages,
  },
];

export const DEFAULT_CATEGORY = LIBRARY_CATEGORIES[0]!.key;
export const categoryOf = (key: string | undefined): LibraryCategory =>
  LIBRARY_CATEGORIES.find((c) => c.key === key) ?? LIBRARY_CATEGORIES[0]!;
/** Every item in every category (the Library's head and share card count them all). */
export const libraryCount = (): number =>
  LIBRARY_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
