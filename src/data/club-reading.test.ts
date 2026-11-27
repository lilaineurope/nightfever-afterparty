import { test } from "node:test";
import assert from "node:assert/strict";
import { CLUB_READING } from "./club-reading";
import { readFileSync } from "node:fs";
import { bookClub } from "./collections";

// "Read about it" (Lisa, 27 Nov 2026): every row is a real club page, a real Library item and one of that item's own moments.
test("club reading lists: real clubs, real Library items, real moments", () => {
  // club-profiles.ts imports pictures, so the test reads it as text (like locations.test.ts).
  const profiles = readFileSync(new URL("./club-profiles.ts", import.meta.url), "utf8");
  for (const [club, reads] of Object.entries(CLUB_READING)) {
    assert.ok(profiles.includes(`\n  ${club}: {`) || profiles.includes(`\n  "${club}": {`), `${club}: no club page`);
    for (const r of reads) {
      const it = bookClub.find((b) => b.name === r.name);
      assert.ok(it, `${club}: ${r.name} is not in the Library`);
      assert.ok(it!.moments.some((m) => m.episodeId === r.episode && m.time === r.time), `${club}: ${r.name} has no moment ${r.episode} ${r.time}`);
    }
  }
});
