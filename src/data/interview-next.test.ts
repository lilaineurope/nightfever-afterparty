import { test } from "node:test";
import assert from "node:assert/strict";
import { COME_BACK, INTERVIEW_PEOPLE, NEW_FACES, nameKey } from "./interview-next";
import { episodes } from "./episodes";
import { interviewedOn, nameVariants } from "../lib/interviewed.server";

// "Who to interview next" shows each person once (Lisa, 18 Nov 2026): rows are folded by name, and a name that has
// already been a Night Fever guest is labelled. These checks keep new episodes from bringing doubles back.

const rows = [...NEW_FACES, ...COME_BACK];

test("every tip points at a built episode", () => {
  const ids = new Set(episodes.map((e) => e.id));
  for (const t of rows) assert.ok(ids.has(t.episodeId), `${t.name}: no AFTERPARTY ${t.episodeId}`);
});

test("no moment is entered twice", () => {
  const seen = new Set<string>();
  for (const t of rows) {
    const k = `${nameKey(t.name)}|${t.episodeId}|${t.time}`;
    assert.ok(!seen.has(k), `${t.name} ${t.episodeId} ${t.time} is in the list twice`);
    seen.add(k);
  }
});

test("each person shows once, across both tabs", () => {
  const keys = [...INTERVIEW_PEOPLE.newFaces, ...INTERVIEW_PEOPLE.comeBack].map((p) => p.key);
  assert.equal(new Set(keys).size, keys.length);
  const said = [...INTERVIEW_PEOPLE.newFaces, ...INTERVIEW_PEOPLE.comeBack].reduce((n, p) => n + p.said.length, 0);
  assert.equal(said, rows.length, "every row is shown under its person");
});

test("one person, one spelling: no name is part of another name on the list", () => {
  // e.g. a "Johnny Dynell" row next to "Chi Chi Valenti & Johnny Dynell" - use the same A–Z card name instead.
  const people = [...INTERVIEW_PEOPLE.newFaces, ...INTERVIEW_PEOPLE.comeBack];
  for (const a of people)
    for (const b of people) {
      if (a === b) continue;
      const parts = nameVariants(b.name).filter((v) => v !== b.key);
      assert.ok(!parts.includes(a.key), `"${a.name}" and "${b.name}" look like the same person - use one name`);
    }
});

test("Chi Chi & Johnny: one entry, back for a part two, with every moment", () => {
  const p = INTERVIEW_PEOPLE.comeBack.find((x) => x.name === "Chi Chi Valenti & Johnny Dynell");
  assert.ok(p);
  assert.deepEqual(p.said.map((t) => t.episodeId), ["s01e09", "s02e11", "s06e03"]);
  assert.ok(!INTERVIEW_PEOPLE.newFaces.some((x) => x.key === p.key));
});

test("already interviewed is worked out from the guest list", () => {
  assert.equal(interviewedOn("Lauren Ezersky")?.code, "S4E6");
  assert.equal(interviewedOn("Chi Chi Valenti & Johnny Dynell")?.afterparty, true);
  assert.equal(interviewedOn("Johnny Dynell")?.episodeId, "s06e03");
  assert.equal(interviewedOn("Mickey Boardman")?.episodeId, "s04e02");
  assert.equal(interviewedOn("Kembra Pfahler"), undefined);
  assert.equal(interviewedOn("Lynn Yaeger"), undefined);
});

test("every come-back name is a Night Fever guest", () => {
  for (const p of INTERVIEW_PEOPLE.comeBack) assert.ok(interviewedOn(p.name), `${p.name} is under Back for a part two but isn't in the guest list`);
});
