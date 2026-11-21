import { test } from "node:test";
import assert from "node:assert/strict";
import { ITEM_QUOTES } from "./item-quotes";
import { BOOK_CREDITS } from "./book-credits";
import { PRESS } from "./publication-facts";
import { entityBySlug } from "./entities";
import { EPISODE_REFS } from "./episode-refs";

const HOSTS = ["James St. James", "Fenton Bailey", "Randy Barbato"];
const episodeIds = new Set(EPISODE_REFS.map(([id]) => id));

test("guest quotes on Library pages: max 9, max 2 per guest, guests only, real cards and episodes", () => {
  for (const [slug, qs] of Object.entries(ITEM_QUOTES)) {
    assert.ok(entityBySlug[slug], `no A–Z card ${slug}`);
    assert.ok(qs.length <= 9, `${slug}: more than 9 quotes`);
    const per: Record<string, number> = {};
    for (const q of qs) {
      per[q.who] = (per[q.who] ?? 0) + 1;
      assert.ok(per[q.who]! <= 2, `${slug}: more than 2 from ${q.who}`);
      assert.ok(episodeIds.has(q.episode as never), `${slug}: unknown episode ${q.episode}`);
      assert.match(q.time, /^\d\d:\d\d:\d\d$/);
      // Hosts only count as guests on their own episode (James, S06E01).
      if (HOSTS.includes(q.who)) assert.equal(q.episode, "s06e01", `${slug}: host quote outside S06E01`);
    }
  }
});

test("book credits point at real A–Z cards and say where they were confirmed", () => {
  for (const [slug, cs] of Object.entries(BOOK_CREDITS)) {
    assert.ok(entityBySlug[slug], `no A–Z card ${slug}`);
    for (const c of cs) assert.ok(c.source.length > 0, `${slug}: ${c.role} has no source`);
  }
});

test("magazines and newspapers: real cards, real episodes and HH:MM:SS times (publication-facts)", () => {
  for (const [slug, p] of Object.entries(PRESS)) {
    assert.ok(entityBySlug[slug], `no A–Z card ${slug}`);
    for (const t of p.team ?? []) {
      if (t.episode) assert.ok((episodeIds as Set<string>).has(t.episode), `${slug}: unknown episode ${t.episode}`);
      if (t.time) assert.match(t.time, /^\d\d:\d\d:\d\d$/, `${slug}: bad time ${t.time}`);
    }
    for (const i of p.issues ?? []) {
      assert.ok((episodeIds as Set<string>).has(i.episode), `${slug}: unknown episode ${i.episode}`);
      assert.match(i.time, /^\d\d:\d\d:\d\d$/, `${slug}: bad time ${i.time}`);
      assert.ok(i.search.length > 3);
    }
  }
});
