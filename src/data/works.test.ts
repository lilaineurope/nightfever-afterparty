import { test } from "node:test";
import assert from "node:assert/strict";
import { entityFor } from "./entities";
import { MADE_BY, OTHER_WORKS } from "./made-by";
import { worksOf } from "../lib/works";

// "<first>'s work" (Lisa, 22 Nov 2026): every work in made-by.ts is a card on the site, and every person named there has a
// page, so no line in the box is dead and nobody's work goes missing because of a spelling.
const PAGE_ALIAS = new Set(["Chi Chi Valenti", "Johnny Dynell", "Luis Camacho", "Wayne County"]);

test("made-by.ts: every work is an A–Z card", () => {
  assert.deepEqual(Object.keys(MADE_BY).filter((w) => !entityFor(w)), []);
});

test("made-by.ts: every maker has a page", () => {
  const missing: string[] = [];
  for (const [work, makers] of Object.entries(MADE_BY))
    for (const m of makers) if (!PAGE_ALIAS.has(m.name) && !entityFor(m.name)) missing.push(`${work}: ${m.name}`);
  for (const who of Object.keys(OTHER_WORKS)) if (!entityFor(who)) missing.push(`OTHER_WORKS: ${who}`);
  assert.deepEqual(missing, []);
});

test("works: Gabriel Rotello shows OutWeek and Sexual Ecology", () => {
  const w = worksOf("gabriel-rotello").map((x) => x.name);
  assert.ok(w.includes("OutWeek"), w.join(", "));
  assert.ok(w.includes("Sexual Ecology"), w.join(", "));
});

test("works: duos and stocktake author lines land on the right page", () => {
  assert.ok(worksOf("tish-and-snooky").some((x) => x.slug === "manic-panic-living-in-color"), "Tish & Snooky's book");
  assert.ok(worksOf("chi-chi-valenti-johnny-dynell").some((x) => x.name.startsWith("Nations")), "Chi Chi's Nations");
  assert.ok(worksOf("luis-camacho").some((x) => x.name === "Truth or Dare"), "Luis in Truth or Dare");
  assert.ok(worksOf("ernie-glam").some((x) => x.slug === "fabulousity"), "Ernie wrote the text of Fabulousity");
});

test("works: the people the 22 Nov check found empty now show their work", () => {
  const P = ["brad-gooch", "daphne-guinness", "jodie-harsh", "screamin-rachael-cain", "junior-vasquez", "frankie-knuckles", "larry-levan", "leigh-bowery", "john-sex", "nelson-sullivan"];
  assert.deepEqual(P.filter((p) => worksOf(p).length === 0), []);
  assert.ok(worksOf("junior-vasquez").some((x) => x.slug === "sound-factory" && x.kind === "Club"), "Junior's Sound Factory");
});
