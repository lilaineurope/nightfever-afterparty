// Prints the In memoriam, club and Library item pages that get their own share picture (name, years, header photo, polaroid) as JSON
// for scripts/og-cards.py. Run: npx vite-node scripts/og-cards-data.ts > /tmp/og-cards.json
import { entityBySlug } from "../src/data/entities";
import { MEMORIAM } from "../src/data/memoriam";
import { CLUB_PROFILES } from "../src/data/club-profiles";
import { PERSON_PORTRAITS } from "../src/data/person-portraits";
import { bookClub } from "../src/data/collections";
import { coverFor } from "../src/data/library-covers";
import { BOOK_FACTS } from "../src/data/library-facts";
import { libraryShareCover } from "../src/lib/library-share";

const rows = [
  ...Object.entries(MEMORIAM).map(([slug, m]) => ({ slug, kind: "memoriam", years: `${m.born}–${m.died}`, pic: PERSON_PORTRAITS[slug] })),
  ...Object.entries(CLUB_PROFILES).map(([slug, c]) => ({ slug, kind: "club", years: `${c.opened}–${c.closed}`, pic: c.portrait })),
]
  .filter((r) => r.pic && entityBySlug[r.slug])
  .map((r) => ({ slug: r.slug, name: entityBySlug[r.slug].name, kind: r.kind, years: r.years, photo: r.pic!.photo, polaroid: r.pic!.polaroid, focus: r.pic!.focus }));
// Library items with a real cover (Lisa, 21 Nov 2026): the cover taped on the pink halftone, the name and the shelf on the left.
const KIND: Record<string, string> = { books: "BOOK", magazines: "MAGAZINE", newspapers: "NEWSPAPER", columns: "COLUMN" };
const library = bookClub
  .filter((b) => libraryShareCover(b.shelf, coverFor(b.name)?.kind) && entityBySlug[b.slug])
  .map((b) => ({ slug: b.slug, name: entityBySlug[b.slug].name, kind: "library", years: [KIND[b.shelf], BOOK_FACTS[b.slug]?.year].filter(Boolean).join(" · "), photo: "/src/assets/card-pink.webp", polaroid: coverFor(b.name)!.src, focus: "0%" }));
console.log(JSON.stringify([...rows, ...library], null, 1));
