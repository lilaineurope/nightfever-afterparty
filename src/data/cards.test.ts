import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { entities, entityFor, CATEGORIES } from "./entities";
import { episodes } from "./episodes";
import { guests } from "./guests";
import { namedOn, namedOnCount } from "../lib/name-links";

// Guards for "no doubles, everything connected, counted properly" - run with every change:
//   npx tsx --test src/data/*.test.ts
// A failure names the card(s) to fix. If two names really are different things, add the pair to DISTINCT.

type Row = { rank: number; mentions: number; category: string; name: string; time: string };
const DIR = dirname(fileURLToPath(import.meta.url));
const EPISODE_FILES: Record<string, Row[]> = Object.fromEntries(
  readdirSync(DIR)
    .filter((f) => /^s\d\de\d\d\.json$/.test(f))
    .map((f) => [`./${f}`, JSON.parse(readFileSync(join(DIR, f), "utf8")) as Row[]]),
);

// Pairs checked by hand and confirmed as different people/places/things.
const DISTINCT = new Set(
  [
    ["baby-rue", "boy-bar"], ["bailey", "bebe-buell"], ["bern", "brian-eno"], ["dean-johnson", "don-johnson"],
    ["leo", "lila"], ["mk", "mokai"], ["nice", "nico"], ["paper", "pierre"], ["paris", "piers"], ["rome", "romeo"],
    ["soho", "sushi"], ["astro-earl", "australia"], ["carlyle", "carol"],
  ].map((p) => p.sort().join("|")),
);

// Sound-alike key: catches spelling variants such as Terry Toy / Teri Toye or Howie Montag / Haoui Montaug.
const soundKey = (slug: string) =>
  slug.replace(/-/g, "").replace(/y/g, "i").replace(/(?!^)[aeiou]/g, "").replace(/(.)\1+/g, "$1");

const cards = entities.filter((e) => e.category !== "Mood" && !/s\d\de\d\d/.test(e.slug));

describe("cards: no doubles", () => {
  test("no two cards are spelling variants of one name", () => {
    const byKey = new Map<string, string[]>();
    for (const e of cards) byKey.set(soundKey(e.slug), [...(byKey.get(soundKey(e.slug)) ?? []), e.slug]);
    const doubles: string[] = [];
    for (const slugs of byKey.values()) {
      for (let i = 0; i < slugs.length; i++)
        for (let j = i + 1; j < slugs.length; j++) {
          const pair = [slugs[i]!, slugs[j]!].sort().join("|");
          if (!DISTINCT.has(pair)) doubles.push(pair);
        }
    }
    assert.deepEqual(doubles, [], "possible double cards - merge them, or list the pair in DISTINCT");
  });

  test("every card has one category in every episode", () => {
    const mixed = entities
      .map((e) => [e.slug, [...new Set(e.refs.map((r) => r.category))]] as const)
      .filter(([, c]) => c.length > 1)
      .map(([s, c]) => `${s}: ${c.join("/")}`);
    assert.deepEqual(mixed, []);
  });

  test("only house categories are used, never Place", () => {
    const bad = entities.filter((e) => !(CATEGORIES as readonly string[]).includes(e.category)).map((e) => `${e.slug}: ${e.category}`);
    assert.deepEqual(bad, []);
  });

  test("each guest has exactly one card, reached from every episode row that names them", () => {
    for (const g of guests) {
      const e = entityFor(g.name);
      assert.equal(e?.slug, g.slug, `${g.name} resolves to ${e?.slug}`);
    }
  });
});

describe("episodes: counted properly", () => {
  for (const [file, rows] of Object.entries(EPISODE_FILES)) {
    test(`${file}: ranked by mentions, then first mention, rank 1..n`, () => {
      rows.forEach((r, i) => {
        assert.equal(r.rank, i + 1, `${r.name} has rank ${r.rank}, expected ${i + 1}`);
        assert.ok(Number.isInteger(r.mentions) && r.mentions >= 0, `${r.name}: mentions ${r.mentions}`);
        if (i > 0) {
          const p = rows[i - 1]!;
          assert.ok(
            p.mentions > r.mentions || (p.mentions === r.mentions && (p.time <= r.time || !/^\d/.test(r.time) || !/^\d/.test(p.time))),
            `${p.name} (${p.mentions}, ${p.time}) is listed before ${r.name} (${r.mentions}, ${r.time})`,
          );
        }
      });
    });

    test(`${file}: no name listed twice`, () => {
      const seen = new Map<string, string>();
      for (const r of rows) {
        const slug = entityFor(r.name)?.slug ?? r.name;
        assert.ok(!seen.has(slug), `${r.name} and ${seen.get(slug)} are the same card`);
        seen.set(slug, r.name);
      }
    });

    test(`${file}: the city of New York is counted`, () => {
      assert.ok(rows.some((r) => r.name === "New York"), "add a New York row (Location) counting the city");
    });
  }

  test("episode totals on boxes match their reference lists", () => {
    for (const ep of episodes) {
      const rows = EPISODE_FILES[`./${ep.id}.json`];
      if (!rows) continue;
      assert.equal(ep.references, rows.length, `${ep.id} references`);
      assert.equal(ep.mentions, rows.reduce((s, r) => s + r.mentions, 0), `${ep.id} mentions`);
    }
  });
});

describe("cards: connected", () => {
  test("a name written on another card links back (Jackie Curtis on Vain Victory)", () => {
    const jc = entityFor("Jackie Curtis")!;
    assert.ok(namedOn(jc).some((x) => x.entity.slug === "vain-victory"));
    assert.ok(namedOnCount("Jackie Curtis") >= 1);
  });

  test("every episode row belongs to a card", () => {
    for (const rows of Object.values(EPISODE_FILES))
      for (const r of rows) assert.ok(entityFor(r.name), `${r.name} has no card`);
  });
});
