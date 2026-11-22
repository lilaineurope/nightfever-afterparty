import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { entityFor, entityBySlug, slugify } from "./entities";
import { LOCATIONS } from "./locations";
import { readFileSync } from "node:fs";

// Club pages read as text: club-profiles.ts imports its pictures, which the test runner cannot load (as in share-pictures.test.ts).
const CLUB_ADDRESS: Record<string, string> = {};
{
  let slug = "";
  for (const line of readFileSync(new URL("./club-profiles.ts", import.meta.url), "utf8").split("\n")) {
    const s = line.match(/^ {2}"?([a-z0-9-]+)"?: \{/);
    if (s) slug = s[1]!;
    const a = line.match(/^ {4}address: "([^"]+)"/);
    if (a && slug) CLUB_ADDRESS[slug] = a[1]!;
  }
}

// "We have to make sure we have no double ups" (Lisa, 22 Nov 2026, location pages + map relaunch):
// one card per place, one pin per card, and a club's street address is its club page, never a place of its own.
//   npx tsx --test src/data/*.test.ts

// Club nights and rooms that are folded into their club page by the club-parts work keep their old pins until then.
const PENDING_CLUB_PARTS = new Set(["Limelight library", "Industrial Night at the Limelight"]);

describe("map pins: no doubles", () => {
  test("every pin belongs to a card", () => {
    const lost = LOCATIONS.filter((l) => !entityFor(l.name) && !PENDING_CLUB_PARTS.has(l.name)).map((l) => l.name);
    assert.deepEqual(lost, [], `pins with no card: ${lost.join(", ")}`);
  });

  test("no card is pinned twice", () => {
    const seen = new Map<string, string>();
    const twice: string[] = [];
    for (const l of LOCATIONS) {
      const slug = entityFor(l.name)?.slug;
      if (!slug) continue;
      if (seen.has(slug)) twice.push(`${l.name} = ${seen.get(slug)}`);
      else seen.set(slug, l.name);
    }
    assert.deepEqual(twice, [], `pinned twice: ${twice.join("; ")}`);
  });

  test("a club's address is its club page, not a card of its own", () => {
    assert.ok(Object.keys(CLUB_ADDRESS).length >= 30, "club addresses read from club-profiles.ts");
    for (const [slug, address] of Object.entries(CLUB_ADDRESS)) {
      if (!/^\d/.test(address)) continue; // "the Meatpacking District" is a neighbourhood, not a street address
      const card = entityBySlug[slugify(address)];
      // Several clubs can share a building (Area, then Quick, at 157 Hudson Street): the address may lead to any of them.
      assert.ok(!card || card.slug in CLUB_ADDRESS, `"${address}" is its own card (${card?.slug}) - point it at ${slug}`);
    }
  });

  test("the London Roxy is not the New York Roxy", () => {
    assert.equal(entityFor("The Roxy (London)")?.slug, "roxy-london");
    assert.equal(entityFor("The Roxy")?.slug, "roxy");
  });
});
