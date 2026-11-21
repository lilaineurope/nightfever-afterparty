import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MENTOR_LINKS } from "./mentors";
import { entityFor } from "./entities";
import { PERSON_PROFILES } from "./person-profiles";

// The Hall of Fame (home page) reads mentors.ts: every mentor must be a reference in the episode it is said in, with its timestamp,
// and every name must have its A–Z card - so the ranking and the links never break when episodes change.
test("every mentor link points at a real reference and card", () => {
  for (const l of MENTOR_LINKS) {
    const refs = JSON.parse(readFileSync(new URL(`./${l.episode}.json`, import.meta.url), "utf8")) as { name: string; time: string }[];
    const names = refs.map((r) => r.name);
    assert.ok(names.includes(l.mentor) || names.includes(l.mentee), `${l.mentor} -> ${l.mentee}: neither is a reference in ${l.episode}`);
    // the moment's timestamp is a reference row's, or a guest quote's on a person page (Kim's Joey Arias intervention, 01:01:25)
    const quoted = Object.values(PERSON_PROFILES).some((p) => p.said.some((q) => q.episode === l.episode && q.time === l.time));
    assert.ok(refs.some((r) => r.time === l.time) || quoted, `${l.mentor} -> ${l.mentee}: no reference at ${l.time} in ${l.episode}`);
    assert.ok(!l.kind || ["lifted", "stood", "door"].includes(l.kind), `${l.mentor} -> ${l.mentee}: unknown kind ${l.kind}`);
    assert.ok(entityFor(l.mentor), `${l.mentor} has no A–Z card`);
  }
});

// Direction (Lisa, 2 Nov 2026): mentor = the one who took the other under their wing. A link can't point both ways or at itself.
test("every mentor link points one way only", () => {
  const key = (a: string, b: string) => `${a}|${b}`;
  const all = new Set(MENTOR_LINKS.map((l) => key(l.mentor, l.mentee)));
  for (const l of MENTOR_LINKS) {
    assert.notEqual(l.mentor, l.mentee, `${l.mentor} is their own mentor`);
    assert.ok(!all.has(key(l.mentee, l.mentor)), `${l.mentor} <-> ${l.mentee} points both ways - check who took whom under their wing`);
  }
});

// The Hall of Fame score (Lisa, 21 Nov 2026; rules on /hall-of-fame-rules). Kim Hastreiter is the worked example there:
// lifted Mickey, Lauren and Trey (9) + stood by Joey (2) + 4 voices + Drew and the Pop Tarts in her family tree (1) = 16.
test("the Hall of Fame scores people helped, voices and the family tree", async () => {
  const { rankedMentors } = await import("../lib/mentor-rank");
  const kim = rankedMentors.find((m) => m.name === "Kim Hastreiter")!;
  assert.equal(kim.help, 11);
  assert.equal(kim.voices.length, 4);
  assert.equal(kim.tree, 1);
  assert.equal(kim.score, 16);
  assert.ok(!rankedMentors.some((m) => m.name === "Michael Alig"), "Michael Alig stays out of the Hall of Fame");
  for (let i = 1; i < rankedMentors.length; i++) assert.ok(rankedMentors[i - 1]!.score >= rankedMentors[i]!.score, "ranked by score");
});
