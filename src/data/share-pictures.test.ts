import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { cardDescription } from "../lib/seo";

// SEO check, 16 Nov 2026: In memoriam and club pages each have their own share picture (scripts/og-cards.py).
// explore.$slug.tsx points them at public/og/explore/<slug>.jpg, so a new page without its picture would share a 404.
const root = new URL("../../", import.meta.url);
const read = (p: string) => readFileSync(new URL(p, root), "utf8");

test("every In memoriam page with a header photo and every club page has its share picture", () => {
  const people = read("src/data/person-portraits.ts");
  const memoriam = [...read("src/data/memoriam.ts").matchAll(/^ {2}"?([a-z0-9-]+)"?: \{/gm)].map((m) => m[1]!);
  // Every club page with a header photo (Les Bains Douches has none yet, so it shares the A–Z picture - 27 Nov 2026).
  const clubFile = read("src/data/club-profiles.ts");
  const clubs = [...clubFile.matchAll(/^ {2}"?([a-z0-9-]+)"?: \{/gm)]
    .filter((m, i, all) => clubFile.slice(m.index, all[i + 1]?.index ?? clubFile.length).includes("portrait:"))
    .map((m) => m[1]!);
  const withPhoto = memoriam.filter((s) => people.includes(`people/${s}-photo.webp`));
  const missing = [...withPhoto, ...clubs].filter((s) => !existsSync(new URL(`public/og/explore/${s}.jpg`, root)));
  assert.deepEqual(missing, [], "run scripts/og-cards-data.ts + scripts/og-cards.py");
});

test("every living-person page with a polaroid has its share picture (A5, 27 Nov 2026)", () => {
  const people = read("src/data/person-portraits.ts");
  const file = read("src/data/person-profiles.ts");
  const slugs = [...file.matchAll(/^ {2}"?([a-z0-9-]+)"?: \{/gm)].map((m) => m[1]!).filter((s) => people.includes(`people/${s}-photo.webp`));
  const missing = slugs.filter((s) => !existsSync(new URL(`public/og/explore/${s}.jpg`, root)));
  assert.deepEqual(missing, [], "run scripts/og-cards-data.ts + scripts/og-cards.py");
});

test("a card description ends on a whole sentence when dropping the episode count allows it", () => {
  const story =
    "A long, narrow club in an old freight warehouse by the Hudson, named for its main room with railroad tracks along the floor. Peter Gatien ran it from 1986.";
  const d = cardDescription("The Tunnel (1986–2001)", story, ["S1E1", "S1E2", "S1E3", "S1E4"]);
  assert.ok(!d.includes("…"), d);
  assert.ok(d.length <= 160, d);
});
