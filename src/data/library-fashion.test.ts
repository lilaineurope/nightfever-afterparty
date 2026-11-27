import { test } from "node:test";
import assert from "node:assert/strict";
import { FASHION_DESIGNERS, FASHION_LOOKS, FASHION_MOODS, FASHION_SHELVES, FASHION_SHOPS, fashionShelf } from "./library-fashion";
import { entityBySlug } from "./entities";

test("Fashion & outfits: every item is a real A–Z card on a known shelf, once per shelf", () => {
  const shelves = new Set(FASHION_SHELVES.map((s) => s.key));
  const seen = new Set<string>();
  for (const it of fashionShelf) {
    assert.ok(entityBySlug[it.slug], `no A–Z card ${it.slug}`);
    assert.ok(shelves.has(it.shelf), `${it.name}: unknown shelf ${it.shelf}`);
    const k = `${it.shelf}|${it.slug}`;
    assert.ok(!seen.has(k), `${it.name} twice on ${it.shelf}`);
    seen.add(k);
  }
  for (const s of FASHION_SHELVES) assert.ok(fashionShelf.some((i) => i.shelf === s.key), `${s.label} is empty`);
});

test("Fashion & outfits: looks carry their colours and episode, designers and shops don't overlap", () => {
  for (const l of FASHION_LOOKS) {
    assert.ok(l.fashion.look, `${l.name}: no look data`);
    assert.match(l.fashion.look.code, /^S\d\dE\d\d[AB]?$/, `${l.name}: bad episode code`);
    for (const hex of l.fashion.look.palette) assert.match(hex, /^#[0-9a-fA-F]{6}$/, `${l.name}: bad colour ${hex}`);
    assert.ok(!l.fashion.look.designers.some((d) => d.slug === l.fashion.look!.who?.slug), `${l.name}: wearer named as its designer`);
  }
  const shops = new Set(FASHION_SHOPS.map((s) => s.slug));
  for (const d of FASHION_DESIGNERS) assert.ok(!shops.has(d.slug), `${d.name} is on both Designers and Shops`);
  // Every on-camera look of the hosts is on the shelf.
  assert.ok(FASHION_LOOKS.filter((l) => l.shelf === "on-camera" && /^(James|Fenton|Randy)'s on-camera look/.test(l.name)).length >= 100);
});

test("Fashion & outfits: every mood in the episodes is on the shelf exactly once", () => {
  const moods = Object.values(entityBySlug).filter((e) => e?.category === "Mood");
  const onShelf = [...FASHION_LOOKS, ...FASHION_MOODS].map((i) => i.slug);
  assert.equal(new Set(onShelf).size, onShelf.length);
  assert.equal(onShelf.length, moods.length);
});

test("every photo outfit belongs to a real look", async () => {
  const { LOOK_OUTFITS } = await import("./look-outfits");
  const { FASHION_LOOKS } = await import("./library-fashion");
  const slugs = new Set(FASHION_LOOKS.map((l) => l.slug));
  for (const k of Object.keys(LOOK_OUTFITS)) assert.ok(slugs.has(k), k);
});
