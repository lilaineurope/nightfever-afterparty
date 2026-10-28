/**
 * Cross-check one episode against its (private, local) transcript before it goes up.
 *   npx tsx scripts/check-episode.ts s06e04 "/path/to/S06E04 Guest transcript.txt"
 *
 * Reports - it never edits anything:
 *  1. MISSING   names that already have a card elsewhere on the site, are said in this transcript, but have no row here
 *  2. COUNT     rows whose mentions differ from a plain whole-word count of the name and its "heard" variants
 *               (a hint, not the truth: nicknames, first names and misheard words are counted by the episode script)
 *  3. NEW YORK  the city count (New York not followed by Times, Post, Dolls, Magazine, University...)
 *  4. INTERVIEW TIPS  every line where someone says who the show should have on (a new face) or have back (a second
 *               round), plus what src/data/interview-next.ts already holds for this episode - read each hit in context
 *               and add the real ones (Lisa, 28 Oct 2026: always check, every episode)
 * The transcript stays on Lisa's computer and is never committed.
 */
import { readFileSync } from "node:fs";
import { entities, entityFor } from "../src/data/entities";
import { COME_BACK, NEW_FACES } from "../src/data/interview-next";

const [id, transcriptPath] = process.argv.slice(2);
if (!id || !transcriptPath) {
  console.error("usage: npx tsx scripts/check-episode.ts <episode id> <transcript.txt>");
  process.exit(1);
}
type Row = { name: string; heard: string; mentions: number; category: string };
const rows = JSON.parse(readFileSync(new URL(`../src/data/${id}.json`, import.meta.url), "utf8")) as Row[];
const text = readFileSync(transcriptPath, "utf8")
  .split("\n").filter((l) => /^\s*\[\d/.test(l) || !/^(Hosts|Source|Note|Private)/i.test(l)).join("\n")
  .replace(/\[\d{1,2}:\d\d(:\d\d)?\][^:\n]{0,40}:/g, " ") // [h:mm:ss] Speaker:
  .replace(/\s+/g, " ");

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const count = (needle: string, flags = "g") =>
  needle.trim().length < 3 ? 0 : (text.match(new RegExp(`(?<![\\w-])${esc(needle.trim())}(?![\\w-])`, flags)) ?? []).length;
const bare = (n: string) => n.replace(/\s*\([^)]*\)/g, "").replace(/^The /, "").trim();

const here = new Set(rows.map((r) => entityFor(r.name)?.slug));
// Text with this episode's own names blanked out, so "Long Island" isn't found inside "Long Island City".
const own = [...new Set(rows.flatMap((r) => [bare(r.name), r.name, ...r.heard.split(/\s*[\/;,]\s*/)]))]
  .filter((v) => v.trim().length >= 4 && /\s/.test(v.trim()))
  .sort((a, b) => b.length - a.length);
const masked = own.reduce((t, v) => t.replace(new RegExp(`(?<![\\w-])${esc(v.trim())}(?![\\w-])`, "gi"), " # "), text);
const countIn = (t: string, needle: string) =>
  (t.match(new RegExp(`(?<![\\w-])${esc(needle)}(?![\\w-])(?! of Wonder)`, "g")) ?? []).length;
const COMMON = /^(Area|Mother|Heaven|Paper|Details|Interview|Trade|Time|Life|People|Nest|Ones|Kids|Money|Candy|Pop|Punk|Disco|House|Soul|Drag|Vogue|Face|Boy|Club|Saint|Paradise|Tunnel|Downtown|Uptown|Europe|America)$/;

console.log(`\n${id}: ${rows.length} rows, ${rows.reduce((s, r) => s + r.mentions, 0)} mentions\n`);

console.log("1. MISSING - said in the transcript, has a card elsewhere, no row in this episode (check: a row here may cover it under another name):");
let n = 0;
for (const e of entities) {
  if (e.category === "Mood" || here.has(e.slug) || /\(S\d\dE\d\d\)/.test(e.name)) continue;
  const name = bare(e.name);
  const single = !name.includes(" ");
  // first-name-only people ("Jerry", "Bailey (Susanne's son)") and "The X" single words match too much
  if (COMMON.test(name) || (single && (name.length < 5 || /\(|^The /.test(e.name)))) continue;
  const c = countIn(masked, name);
  if (c > 0) { console.log(`   ${String(c).padStart(3)}  ${e.name}  [${e.category}]  /explore/${e.slug}`); n++; }
}
if (!n) console.log("   none");

console.log("\n2. COUNT - row mentions vs a plain count of the name and heard variants (check the big gaps):");
n = 0;
for (const r of rows) {
  if (r.category === "Mood" || r.mentions === 0) continue;
  // only multi-word variants: single words ("James", "Time") are counted with context by the episode script
  const variants = new Set([bare(r.name), ...r.heard.split(/\s*[\/;,]\s*/).map(bare)].filter((v) => /\S\s+\S/.test(v)));
  // over-count: more mentions than every heard variant together (e.g. "4th Street" also counting "14th Street")
  const all = [...new Set([bare(r.name), ...r.heard.split(/\s*[\/;,]\s*/).map(bare)].filter((v) => v.length >= 3))];
  const most = all.reduce((s, v) => s + count(v, "gi"), 0);
  if (most > 0 && r.mentions > most) { console.log(`   ${r.name}: row ${r.mentions}, but name + heard variants appear only ${most}x - over-counted?`); n++; }
  if (!variants.size) continue;
  const plain = Math.max(...[...variants].map((v) => count(v, "gi")), 0);
  if (plain > r.mentions) { console.log(`   ${r.name}: row ${r.mentions}, but the full name alone is said ${plain}x  (heard: ${r.heard})`); n++; }
}
if (!n) console.log("   none");

// longer names that start with New York and have their own row here (New York Cabaret Association...) don't count
const cityText = own
  .filter((v) => /^new york\s+\S/i.test(v.trim()) && !/^new york( city)?$/i.test(v.trim()))
  .reduce((t, v) => t.replace(new RegExp(`(?<![\\w-])${esc(v.trim())}(?![\\w-])`, "gi"), " # "), text);
const city = (cityText.match(/(?<![\w-]|upstate |upstate, )New York(?![\w-]| (?:Times|Post|Dolls|Magazine|University|Daily News|Historical|Observer|Review|Fashion Week|State)| ?-New York)/gi) ?? []).length;
const row = rows.find((r) => r.name === "New York");
console.log(`\n3. NEW YORK - city mentions ${city}, row ${row ? row.mentions : "MISSING"}${row && row.mentions !== city ? "  <- check" : ""}\n`);

// 4. Interview tips: who the show should have on next, or have back for a second round.
const TIP = /(you should (interview|have|talk to|get)|should (interview|have .{0,20} on|talk to)|have (him|her|them|you) (back|on)|get (him|her|them) on|bring (him|her|them) on|come back (on|again)|back on (the show|again)|part (two|2)|second (round|episode|part)|another (episode|three hours|hour)|talk (some )?more|tried to get|we need to (get|have|interview)|have you (interviewed|talked to|had)|did you (interview|have) .{0,30} on|on the show)/i;
const lines = readFileSync(transcriptPath, "utf8").split("\n").filter((l) => /^\s*\[\d/.test(l) && TIP.test(l));
console.log("4. INTERVIEW TIPS - lines to read in context (new faces / second round):");
if (!lines.length) console.log("   none found");
for (const l of lines) console.log("   " + l.trim().slice(0, 220));
const have = [...NEW_FACES, ...COME_BACK].filter((t) => t.episodeId === id);
console.log(`   already in interview-next.ts for ${id}: ${have.length ? have.map((t) => `${t.name} (${t.time})`).join(", ") : "nothing yet"}\n`);
