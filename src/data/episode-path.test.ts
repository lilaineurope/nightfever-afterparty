import { test } from "node:test";
import assert from "node:assert/strict";
import { episodes, episodePath } from "./episodes";

// Every episode links to its own page (S03E10 once fell through to S06E01 - Lisa, 31 Oct 2026). A new episode needs its case in episodePath().
test("every episode's path is its own page", () => {
  for (const e of episodes) assert.equal(episodePath(e.id), `/episodes/${e.id}`, `${e.id} links to ${episodePath(e.id)}`);
});
