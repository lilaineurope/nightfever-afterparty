import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { entityBySlug } from "./entities";
import { bookClub } from "./collections";
import { DIARY_PAGES } from "./diaries";

// Diary pages (Lisa, 21 Nov 2026): every diary on the Library's Diaries shelf is a Diary, not a Book, and has a page with
// every moment it comes up - each moment in a real episode, and every episode the reference sheets tie to it covered.
test("every diary on the shelf is a Diary with a page", () => {
  const shelf = bookClub.filter((b) => b.shelf === "diaries");
  assert.ok(shelf.length >= 7, `only ${shelf.length} diaries on the shelf`);
  for (const b of shelf) {
    assert.equal(entityBySlug[b.slug]?.category, "Diary", `${b.name} is not a Diary`);
    assert.ok(DIARY_PAGES[b.slug], `${b.name} (${b.slug}) has no diary page`);
  }
  assert.notEqual(entityBySlug["the-wall-street-journal"]?.category, "Diary");
});

test("diary moments: real cards, real episodes, every referenced episode covered, readings marked", () => {
  for (const [slug, d] of Object.entries(DIARY_PAGES)) {
    const e = entityBySlug[slug];
    assert.ok(e, `no card ${slug}`);
    const eps = new Set(d.moments.map((m) => m.episode));
    for (const m of d.moments) {
      assert.ok(existsSync(new URL(`./${m.episode}.json`, import.meta.url)), `${slug}: no episode ${m.episode}`);
      assert.match(m.time, /^\d\d:\d\d:\d\d$/, `${slug}: ${m.time}`);
      assert.ok(m.lines.length > 0 && m.lines.every((l) => l.who && l.text), `${slug} ${m.time}: empty line`);
    }
    for (const r of e.refs) if (r.episode) assert.ok(eps.has(r.episode), `${slug}: ${r.episode} is in the references but has no moment`);
  }
  assert.ok(DIARY_PAGES["nora-burns-s-diaries"]!.moments.some((m) => m.lines.some((l) => l.read)));
});
