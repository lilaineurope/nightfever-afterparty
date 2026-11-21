import { test } from "node:test";
import assert from "node:assert/strict";
import { ITEM_QUOTES } from "./item-quotes";
import { BOOK_CREDITS } from "./book-credits";
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
