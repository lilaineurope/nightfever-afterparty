// Books by people on the site that no guest has dropped on the show yet (Lisa, 22 Nov 2026: "we need to make proper pages
// for all linked or named publications by guests"). Each one used to be a plain, unlinked line in "<name>'s work"; now it
// is a Book card with its own Library page (/explore/<slug>): cover, author, year and publisher, the moments in the
// episodes where its writer comes up, and the writer's videos from our playlists. When a guest does drop one on the show,
// its episode row joins this card by itself (same A–Z name).
//
// Facts: first edition (publisher and year), from the publisher's and the library records. `checked` = verified against a
// library record or the publisher; the rest are still to be checked against Open Library before publishing.
// Covers go in src/assets/library + src/data/library-covers.ts like every other Library cover (Open Library first).
// Loads nothing, so entities.ts can read it.

export type WrittenBy = {
  /** The A–Z name of the card (and of its Library cover). */
  name: string;
  /** The full title, as on the cover. */
  title: string;
  /** Who wrote it - their A–Z name, exactly. */
  by: string;
  /** Co-writer, editor, photographer... after the name: "with Jeff Copeland". */
  with?: string;
  role: "Wrote it" | "Photographs";
  year: number;
  publisher: string | null;
  isbn?: string;
  /** In print today, where known. */
  inPrint?: boolean;
};

export const WRITTEN_BY: WrittenBy[] = [
  { name: "The Power Look (Egon von Furstenberg)", title: "The Power Look", by: "Egon von Furstenberg", with: "with Camille Duhé", role: "Wrote it", year: 1978, publisher: "Fawcett", isbn: "9780449901243", inPrint: false },
  { name: "Sex Tips for Girls", title: "Sex Tips for Girls", by: "Cynthia Heimel", role: "Wrote it", year: 1983, publisher: "Simon & Schuster" },
  { name: "Sexual Ecology", title: "Sexual Ecology: AIDS and the Destiny of Gay Men", by: "Gabriel Rotello", role: "Wrote it", year: 1997, publisher: "Dutton" },
  { name: "Face It", title: "Face It", by: "Debbie Harry", with: "with Sylvie Simmons", role: "Wrote it", year: 2019, publisher: "Dey Street Books", inPrint: true },
  { name: "A Low Life in High Heels", title: "A Low Life in High Heels: The Holly Woodlawn Story", by: "Holly Woodlawn", with: "with Jeff Copeland", role: "Wrote it", year: 1991, publisher: "St. Martin's Press" },
  { name: "Angelique's Descent", title: "Angélique's Descent", by: "Lara Parker", role: "Wrote it", year: 1998, publisher: "HarperEntertainment" },
  { name: "Blitzed!", title: "Blitzed! The Autobiography of Steve Strange", by: "Steve Strange", role: "Wrote it", year: 2002, publisher: "Orion" },
  { name: "Walking Through Clear Water in a Pool Painted Black", title: "Walking Through Clear Water in a Pool Painted Black", by: "Cookie Mueller", role: "Wrote it", year: 1990, publisher: "Semiotext(e)", inPrint: true },
  { name: "New York 1983 (Marcus Leatherdale)", title: "New York 1983", by: "Marcus Leatherdale", with: "with Kathy Acker", role: "Photographs", year: 1983, publisher: null },
  { name: "Natural Blonde", title: "Natural Blonde: A Memoir", by: "Liz Smith", role: "Wrote it", year: 2000, publisher: "Hyperion" },
  { name: "Dancing the Gay Lib Blues", title: "Dancing the Gay Lib Blues: A Year in the Homosexual Liberation Movement", by: "Arthur Bell", role: "Wrote it", year: 1971, publisher: "Simon & Schuster" },
  { name: "Kings Don't Mean a Thing", title: "Kings Don't Mean a Thing: The John Knight Murder Case", by: "Arthur Bell", role: "Wrote it", year: 1978, publisher: "William Morrow" },
  { name: "Footprints (Brooke Astor)", title: "Footprints", by: "Brooke Astor", role: "Wrote it", year: 1980, publisher: "Doubleday" },
  { name: "Close to the Knives", title: "Close to the Knives: A Memoir of Disintegration", by: "David Wojnarowicz", role: "Wrote it", year: 1991, publisher: "Vintage", inPrint: true },
  { name: "D.V. (Diana Vreeland)", title: "D.V.", by: "Diana Vreeland", role: "Wrote it", year: 1984, publisher: "Knopf", inPrint: true },
  { name: "The Correct Sadist", title: "The Correct Sadist: The Memoirs of Angel Stern", by: "Terence Sellers", role: "Wrote it", year: 1983, publisher: "Self-published (Grove Press, 1985)" },
  { name: "Jailbait and Other Stories", title: "Jailbait and Other Stories", by: "Brad Gooch", role: "Wrote it", year: 1984, publisher: "SeaHorse Press" },
  { name: "Scary Kisses", title: "Scary Kisses", by: "Brad Gooch", role: "Wrote it", year: 1988, publisher: "G. P. Putnam's Sons" },
  { name: "City Poet", title: "City Poet: The Life and Times of Frank O'Hara", by: "Brad Gooch", role: "Wrote it", year: 1993, publisher: "Knopf" },
  { name: "The Golden Age of Promiscuity", title: "The Golden Age of Promiscuity", by: "Brad Gooch", role: "Wrote it", year: 1996, publisher: "Knopf" },
  { name: "Smash Cut", title: "Smash Cut: A Memoir of Howard & Art & the '70s & the '80s", by: "Brad Gooch", role: "Wrote it", year: 2015, publisher: "Harper", inPrint: true },
  { name: "Radiant (Brad Gooch)", title: "Radiant: The Life and Line of Keith Haring", by: "Brad Gooch", role: "Wrote it", year: 2024, publisher: "Harper", inPrint: true },
];
