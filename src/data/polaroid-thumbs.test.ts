// Every guest polaroid needs its small WebP copies (scripts/polaroid-thumbs.py) so lists don't load the 1024px photo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const assets = join(import.meta.dirname, "..", "assets");

test("every polaroid has 1024px, 512px and 240px WebP copies", () => {
  const missing = readdirSync(assets)
    .filter((f) => /^polaroid-.*\.jpg$/.test(f))
    .flatMap((f) => [1024, 512, 240].map((size) => `polaroid-thumbs/${f.replace(/\.jpg$/, "")}-${size}.webp`))
    .filter((thumb) => !existsSync(join(assets, thumb)));
  assert.deepEqual(missing, [], "Run: python3 scripts/polaroid-thumbs.py");
});
