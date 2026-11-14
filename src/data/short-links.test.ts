import { test } from "node:test";
import assert from "node:assert/strict";
import { episodes } from "./episodes";
import { CLUB_NIGHTS } from "./club-nights";
import { shortLinkTarget } from "./short-links";

// /spotify/<code> must land on the right page with UTM tags (Lisa, 14 Nov 2026: track visits from Spotify).
test("every episode has a short Spotify address", () => {
  for (const e of episodes) {
    assert.equal(shortLinkTarget("spotify", e.id), `/episodes/${e.id}?utm_source=spotify&utm_medium=playlist&utm_campaign=${e.id}`);
    assert.equal(shortLinkTarget("spotify", e.id.toUpperCase()), shortLinkTarget("spotify", e.id));
  }
});

test("/spotify alone and /spotify/jukebox open the Jukebox", () => {
  const jukebox = "/jukebox?utm_source=spotify&utm_medium=playlist&utm_campaign=jukebox";
  assert.equal(shortLinkTarget("spotify", ""), jukebox);
  assert.equal(shortLinkTarget("spotify", "jukebox/"), jukebox);
});

test("every club night has a short Spotify address", () => {
  for (const c of CLUB_NIGHTS) {
    const want = `/jukebox?club=${c.slug}&utm_source=spotify&utm_medium=playlist&utm_campaign=club-${c.slug}`;
    assert.equal(shortLinkTarget("spotify", c.slug), want);
    assert.equal(shortLinkTarget("spotify", `club-${c.slug}`), want);
  }
});

test("an unknown code still lands on the home page, tagged", () => {
  assert.equal(shortLinkTarget("spotify", "nope"), "/?utm_source=spotify&utm_medium=playlist&utm_campaign=unknown");
});
