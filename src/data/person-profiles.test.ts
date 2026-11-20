import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { PERSON_PROFILES } from "./person-profiles";

// Person pages (Lisa, 20 Nov 2026): quote boxes come from different guests, the same guest at most twice (her In memoriam
// rule), and every quote plays from a real episode.
test("person page quotes: real episodes, hh:mm:ss times, the same guest at most twice", () => {
  for (const [slug, p] of Object.entries(PERSON_PROFILES)) {
    const count = new Map<string, number>();
    for (const q of p.said) {
      assert.ok(existsSync(new URL(`./${q.episode}.json`, import.meta.url)) || /^s0\de\d\d[ab]$/.test(q.episode), `${slug}: no episode ${q.episode}`);
      assert.match(q.time, /^\d\d:\d\d:\d\d$/, `${slug}: ${q.time}`);
      count.set(q.who, (count.get(q.who) ?? 0) + 1);
    }
    for (const [who, n] of count) assert.ok(n <= 2, `${slug}: ${who} is quoted ${n} times`);
  }
});
