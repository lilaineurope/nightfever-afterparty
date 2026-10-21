import { test } from "node:test";
import assert from "node:assert/strict";
import { isOtherShowGuest } from "../lib/show-guests";

test("Night Fever chip: other show guests count, the episode's own guest(s) do not", () => {
  assert.equal(isOtherShowGuest("Michael Musto", "Dianne Brill"), true);
  assert.equal(isOtherShowGuest("Dianne Brill", "Dianne Brill"), false);
  assert.equal(isOtherShowGuest("Chi Chi Valenti & Johnny Dynell", "Chi Chi Valenti & Johnny Dynell"), false);
  assert.equal(isOtherShowGuest("Andy Warhol", "Dianne Brill"), false);
});
