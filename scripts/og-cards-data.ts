// Prints the In memoriam and club pages that get their own share picture (name, years, header photo, polaroid) as JSON
// for scripts/og-cards.py. Run: npx vite-node scripts/og-cards-data.ts > /tmp/og-cards.json
import { entityBySlug } from "../src/data/entities";
import { MEMORIAM } from "../src/data/memoriam";
import { CLUB_PROFILES } from "../src/data/club-profiles";
import { PERSON_PORTRAITS } from "../src/data/person-portraits";

const rows = [
  ...Object.entries(MEMORIAM).map(([slug, m]) => ({ slug, kind: "memoriam", years: `${m.born}–${m.died}`, pic: PERSON_PORTRAITS[slug] })),
  ...Object.entries(CLUB_PROFILES).map(([slug, c]) => ({ slug, kind: "club", years: `${c.opened}–${c.closed}`, pic: c.portrait })),
]
  .filter((r) => r.pic && entityBySlug[r.slug])
  .map((r) => ({ slug: r.slug, name: entityBySlug[r.slug].name, kind: r.kind, years: r.years, photo: r.pic!.photo, polaroid: r.pic!.polaroid, focus: r.pic!.focus }));
console.log(JSON.stringify(rows, null, 1));
