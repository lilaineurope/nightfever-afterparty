import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MENTOR_LINKS } from "./mentors";
import { entityFor } from "./entities";

// The Hall of Fame (home page) reads mentors.ts: every mentor must be a reference in the episode it is said in, with its timestamp,
// and every name must have its A–Z card - so the ranking and the links never break when episodes change.
test("every mentor link points at a real reference and card", () => {
  for (const l of MENTOR_LINKS) {
    const refs = JSON.parse(readFileSync(new URL(`./${l.episode}.json`, import.meta.url), "utf8")) as { name: string; time: string }[];
    const names = refs.map((r) => r.name);
    assert.ok(names.includes(l.mentor) || names.includes(l.mentee), `${l.mentor} -> ${l.mentee}: neither is a reference in ${l.episode}`);
    assert.ok(refs.some((r) => r.time === l.time), `${l.mentor} -> ${l.mentee}: no reference at ${l.time} in ${l.episode}`);
    assert.ok(entityFor(l.mentor), `${l.mentor} has no A–Z card`);
  }
});
