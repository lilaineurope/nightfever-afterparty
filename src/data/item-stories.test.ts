import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { entityBySlug } from "./entities";

// "The story" for every work a guest made (Lisa, 23 Nov 2026): each automatic story belongs to a card on the site, says
// something, and keeps Lisa's rules - nothing in "Since it came out" or "What the press said" unless it comes from our
// AFTERPARTY references or a Library publication (written by hand in item-stories.ts, never automatically).
const auto = JSON.parse(readFileSync(new URL("./item-stories-auto.json", import.meta.url), "utf8")) as Record<string, { intro: string; facts: { label: string; value: string }[]; since: unknown[]; reviews: unknown[]; sources: string[] }>;

test("item-stories-auto.json: every story is an A–Z card with an intro and its sources", () => {
  for (const [slug, st] of Object.entries(auto)) {
    assert.ok(entityBySlug[slug], `${slug} has no card`);
    assert.ok(st.intro.length > 30, `${slug}: intro too short`);
    assert.ok(st.sources.some((s) => s.includes("AFTERPARTY")), `${slug}: no AFTERPARTY source`);
    assert.deepEqual([st.since.length, st.reviews.length], [0, 0], `${slug}: automatic since/reviews`);
    assert.ok(!st.facts.some((f) => /^1 January \d{4}$/.test(f.value)), `${slug}: placeholder 1 January date`);
  }
});
