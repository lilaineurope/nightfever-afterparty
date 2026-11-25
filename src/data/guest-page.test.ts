// One page per guest (Lisa, 1 Nov 2026): a guest with an AFTERPARTY has one page, the episode page.
import { test } from "node:test";
import assert from "node:assert/strict";
import { afterpartyOf, entities, entityBySlug, guestOfEpisode, inSitemap } from "./entities";
import { episodes, episodePath } from "./episodes";
import { cardPath, cardTo } from "../lib/card-link";

test("every AFTERPARTY has its guest's card, and the guest's links go to the episode page", () => {
  for (const ep of episodes) {
    const g = guestOfEpisode(ep.id);
    assert.ok(g, `${ep.id} (${ep.guest}) has no guest card - check the guest's "Season x, Episode y" line in guests.ts`);
    assert.equal(cardPath(g.slug), episodePath(ep.id));
    assert.deepEqual(cardTo(g.slug), { to: episodePath(ep.id) });
    assert.equal(inSitemap(g), false, `${g.slug} forwards to ${ep.id}, so it stays out of the sitemap`);
  }
});

test("guests without an AFTERPARTY and everyone else keep their A–Z card", () => {
  for (const e of entities) {
    if (afterpartyOf(e)) continue;
    assert.equal(cardPath(e.slug), `/explore/${e.slug}`);
  }
  assert.equal(cardPath("andy-warhol"), "/explore/andy-warhol");
  assert.ok(entityBySlug["ann-magnuson"]);
  assert.equal(cardPath("ann-magnuson"), "/episodes/s04e10");
});

// Lisa, 24 Nov 2026: one-episode people with a full person page (Imelda Marcos, Oprah, Sherry Vine) are not thin cards.
test("people with a full page are indexed and in the sitemap", async () => {
  const { isThinCard } = await import("./entities");
  for (const slug of ["imelda-marcos", "oprah-winfrey", "sherry-vine"]) {
    const e = entityBySlug[slug];
    assert.ok(e, slug);
    assert.equal(isThinCard(e!), false, `${slug} has a full page`);
    assert.equal(inSitemap(e!), true, `${slug} is in the sitemap`);
  }
});
