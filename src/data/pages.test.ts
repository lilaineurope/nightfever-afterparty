import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { ALL_PAGES, CONTACT_TOPICS, GUESTBOOK_PAGES, PAGES } from "../lib/pages";

// Every page the site has must be in the one page list (src/lib/pages.ts), so the menu, search,
// the contact form's "What it's about" and the guestbook's "Favourite page" never go out of date.
const ROUTES = new URL("../routes/", import.meta.url);

function sitePagePaths(): string[] {
  const paths: string[] = [];
  for (const f of readdirSync(ROUTES)) {
    if (!f.endsWith(".tsx")) continue;
    const src = readFileSync(new URL(f, ROUTES), "utf8");
    if (/sitemap:\s*false/.test(src)) continue; // hidden pages (admin, unsubscribe, redirects)
    const m = src.match(/createFileRoute\("([^"]+)"\)/);
    if (!m) continue;
    let path = m[1]!.replace(/\/$/, "") || "/";
    if (path.startsWith("/episodes/")) path = "/episodes"; // each episode is part of the Afterparty
    if (path.startsWith("/explore/")) path = "/explore"; // each card is part of Everything A–Z
    paths.push(path);
  }
  return [...new Set(paths)];
}

test("every page is in the one page list", () => {
  const listed = new Set(ALL_PAGES.map((p) => p.to));
  const missing = sitePagePaths().filter((p) => !listed.has(p));
  assert.deepEqual(missing, [], `add these pages to src/lib/pages.ts: ${missing.join(", ")}`);
});

test("every listed page exists", () => {
  const real = new Set(sitePagePaths());
  const gone = ALL_PAGES.map((p) => p.to).filter((p) => !real.has(p));
  assert.deepEqual(gone, [], `these pages no longer exist: ${gone.join(", ")}`);
});

test("contact form and guestbook dropdowns follow the page list", () => {
  for (const p of ALL_PAGES) if (p.to !== "/contact") assert.ok(CONTACT_TOPICS.includes(p.label), `contact form is missing ${p.label}`);
  for (const p of PAGES) if (p.to !== "/guestbook") assert.ok(GUESTBOOK_PAGES.some((g) => g.to === p.to), `guestbook is missing ${p.label}`);
  assert.equal(new Set(ALL_PAGES.map((p) => p.label)).size, ALL_PAGES.length, "two pages share a name");
});
