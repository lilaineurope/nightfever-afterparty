// Books by people on the site that no guest has dropped on the show yet (Lisa, 22 Nov 2026: "we need to make proper pages
// for all linked or named publications by guests"). Each one used to be a plain, unlinked line in "<name>'s work"; now it
// is a Book card with its own Library page (/explore/<slug>): cover, author, year and publisher, the moments in the
// episodes where its writer comes up, and the writer's videos from our playlists. When a guest does drop one on the show,
// its episode row joins this card by itself (same A–Z name).
//
// Facts: first edition (publisher and year), checked against Open Library on 22 Nov 2026 (facts.json in NightFever/Libary/
// Publication pages covers (22 Nov 2026)). The ISBN is one Open Library edition, for the find and borrow boxes.
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
  { name: "Sex Tips for Girls", title: "Sex Tips for Girls", by: "Cynthia Heimel", role: "Wrote it", year: 1983, publisher: "Simon & Schuster", isbn: "9780099324904" },
  { name: "Sexual Ecology", title: "Sexual Ecology: AIDS and the Destiny of Gay Men", by: "Gabriel Rotello", role: "Wrote it", year: 1997, publisher: "Dutton", isbn: "9780452277199" },
  { name: "Face It", title: "Face It", by: "Debbie Harry", with: "with Sylvie Simmons", role: "Wrote it", year: 2019, publisher: "Dey Street Books", inPrint: true, isbn: "9780008229436" },
  { name: "A Low Life in High Heels", title: "A Low Life in High Heels: The Holly Woodlawn Story", by: "Holly Woodlawn", with: "with Jeff Copeland", role: "Wrote it", year: 1991, publisher: "St. Martin's Press", isbn: "9780060975128" },
  { name: "Angelique's Descent", title: "Angélique's Descent", by: "Lara Parker", role: "Wrote it", year: 1998, publisher: "HarperEntertainment" },
  { name: "Blitzed!", title: "Blitzed! The Autobiography of Steve Strange", by: "Steve Strange", role: "Wrote it", year: 2002, publisher: "Orion", isbn: "9780752847207" },
  { name: "Walking Through Clear Water in a Pool Painted Black", title: "Walking Through Clear Water in a Pool Painted Black", by: "Cookie Mueller", role: "Wrote it", year: 1990, publisher: "Semiotext(e)", inPrint: true, isbn: "9780936756615" },
  { name: "New York 1983 (Marcus Leatherdale)", title: "New York 1983", by: "Marcus Leatherdale", with: "with Kathy Acker", role: "Photographs", year: 1983, publisher: null },
  { name: "Natural Blonde", title: "Natural Blonde: A Memoir", by: "Liz Smith", role: "Wrote it", year: 2000, publisher: "Hyperion", isbn: "9780375416330" },
  { name: "Dancing the Gay Lib Blues", title: "Dancing the Gay Lib Blues: A Year in the Homosexual Liberation Movement", by: "Arthur Bell", role: "Wrote it", year: 1971, publisher: "Simon & Schuster", isbn: "9780671210427" },
  { name: "Kings Don't Mean a Thing", title: "Kings Don't Mean a Thing: The John Knight Murder Case", by: "Arthur Bell", role: "Wrote it", year: 1978, publisher: "William Morrow", isbn: "9780425042120" },
  { name: "Footprints (Brooke Astor)", title: "Footprints", by: "Brooke Astor", role: "Wrote it", year: 1980, publisher: "Doubleday" },
  { name: "Close to the Knives", title: "Close to the Knives: A Memoir of Disintegration", by: "David Wojnarowicz", role: "Wrote it", year: 1991, publisher: "Vintage", inPrint: true, isbn: "9780679732273" },
  { name: "D.V. (Diana Vreeland)", title: "D.V.", by: "Diana Vreeland", role: "Wrote it", year: 1984, publisher: "Knopf", inPrint: true, isbn: "9780062024404" },
  { name: "The Correct Sadist", title: "The Correct Sadist: The Memoirs of Angel Stern", by: "Terence Sellers", role: "Wrote it", year: 1983, publisher: "V.I.T.R.I.O.L. Publications (Grove Press, 1985)", isbn: "9780394620169" },
  { name: "Jailbait and Other Stories", title: "Jailbait and Other Stories", by: "Brad Gooch", role: "Wrote it", year: 1984, publisher: "SeaHorse Press", isbn: "9780933322172" },
  { name: "Scary Kisses", title: "Scary Kisses", by: "Brad Gooch", role: "Wrote it", year: 1988, publisher: "G. P. Putnam's Sons", isbn: "9780330307512" },
  { name: "City Poet", title: "City Poet: The Life and Times of Frank O'Hara", by: "Brad Gooch", role: "Wrote it", year: 1993, publisher: "Knopf", isbn: "9780060976132" },
  { name: "The Golden Age of Promiscuity", title: "The Golden Age of Promiscuity", by: "Brad Gooch", role: "Wrote it", year: 1996, publisher: "Knopf" },
  { name: "Smash Cut", title: "Smash Cut: A Memoir of Howard & Art & the '70s & the '80s", by: "Brad Gooch", role: "Wrote it", year: 2015, publisher: "Harper", inPrint: true, isbn: "9780062354969" },
  { name: "Flannery", title: "Flannery: A Life of Flannery O'Connor", by: "Brad Gooch", role: "Wrote it", year: 2009, publisher: "Little, Brown and Company", inPrint: true, isbn: "9780316000666" },
  { name: "Rumi's Secret", title: "Rumi's Secret: The Life of the Sufi Poet of Love", by: "Brad Gooch", role: "Wrote it", year: 2017, publisher: "Harper", inPrint: true, isbn: "9780061999147" },
  { name: "Radiant (Brad Gooch)", title: "Radiant: The Life and Line of Keith Haring", by: "Brad Gooch", role: "Wrote it", year: 2024, publisher: "Harper", inPrint: true, isbn: "9780062698285" },
];
