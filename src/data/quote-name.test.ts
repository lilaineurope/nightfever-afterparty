import { test } from "node:test";
import assert from "node:assert/strict";
import { afterpartyOfGuest, episodes, quoteNamePath } from "./episodes";

// The name in every quote box links to the guest's AFTERPARTY page (Lisa, 27 Nov 2026), via QuoteName (src/components/quote-name.tsx).
test("every guest name finds their own AFTERPARTY", () => {
  for (const e of episodes) assert.equal(afterpartyOfGuest(e.guest), e.id, e.guest);
});

test("two-interview episodes link each guest to their own A/B page", () => {
  assert.equal(quoteNamePath("Christopher Comp", "s05e07a"), "/episodes/s05e07a");
  assert.equal(quoteNamePath("Really Denise", "s05e07b"), "/episodes/s05e07b");
  assert.equal(quoteNamePath("Really Denise", "s05e07a"), "/episodes/s05e07b");
});

test("two-guest lines, stage names and quoted nicknames", () => {
  assert.equal(afterpartyOfGuest("Johnny Dynell"), "s06e03");
  assert.equal(afterpartyOfGuest("Chi Chi Valenti"), "s06e03");
  assert.equal(afterpartyOfGuest("Jenny Talia"), afterpartyOfGuest("Jenny Dembrow aka Jenny Talia"));
  assert.equal(afterpartyOfGuest("Luis Xtravaganza Camacho"), "s01e08");
  assert.equal(afterpartyOfGuest("Johnny Dynell, quoting Sister Dimension"), "s06e03");
});

test("a speaker without an AFTERPARTY links to the one the quote comes from", () => {
  assert.equal(quoteNamePath("Fenton Bailey", "s02e04"), "/episodes/s02e04");
  assert.equal(quoteNamePath("James St. James", "s02e04"), "/episodes/s06e01");
});
