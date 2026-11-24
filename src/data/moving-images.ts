// Moving Images (Lisa, 24 Nov 2026: "add movies and tv to library", "Call the Category 'Moving Images'", "do it like we did
// it with the artwork list and pages"): every film and TV show the guests drop, on its own Library shelf, each with its own
// page (/library/moving-images/<slug>, src/routes/library_.moving-images.$slug.tsx) - the Jukebox video big on the side
// and everyone who was involved beside it.
// Built from entities.ts like the other categories, so every new episode fills it by itself. The poster or title card is
// the one the A–Z card already shows (src/data/library-covers.ts). Left out: genres ("Film noir"), channels, an advert and
// Night Fever's own episodes. Documentaries are the ones Wikidata files as documentaries (src/data/screen-docs.json, made by
// scripts/screen-credits.py) or that say so in their name.
import { toItem, type CollectionItem, type Shelf } from "./collections";
import { entities, type Entity } from "./entities";
import DOCS from "./screen-docs.json";

/** The shelves of the category, in this order. */
export const SCREEN_SHELVES: Shelf[] = [
  { key: "movies", label: "Movies" },
  { key: "documentaries", label: "Documentaries" },
  { key: "tv-shows", label: "TV shows" },
  { key: "music-videos", label: "Music videos" },
];
const SHELF_KEYS = new Set(SCREEN_SHELVES.map((s) => s.key));

/** Not a film or a show of its own: genres, channels, an advert, and Night Fever itself. */
export const NOT_SCREEN = new Set([
  "Film noir",
  "Women in prison films",
  "Energizer Bunny",
  "Channel J",
  "Style Network",
  "Night Fever S01E01 – Dianne Brill",
  "Night Fever S01E03 – Lisa Edelstein",
]);

// Wikidata files Downtown 81 under documentaries too, but it is a story film (Basquiat plays himself).
const NOT_DOC = new Set(["Downtown 81"]);
const DOC_SET = new Set<string>((DOCS as string[]).filter((n) => !NOT_DOC.has(n)));
const has = (e: Entity, c: string) => e.category === c || e.refs.some((r) => r.category === c);

function shelfOf(e: Entity): string {
  if (/music video|[–-] '.+' video$|^Vogue music video/i.test(e.name)) return "music-videos";
  if (has(e, "Film")) return DOC_SET.has(e.name) || /documentary|shockumentary|\bDoc\b/i.test(e.name) ? "documentaries" : "movies";
  return "tv-shows";
}

const byMentions = (a: CollectionItem, b: CollectionItem) => b.mentions - a.mentions || a.name.localeCompare(b.name);

export const movingImages: CollectionItem[] = entities
  .filter((e) => (has(e, "Film") || has(e, "TV")) && !NOT_SCREEN.has(e.name))
  .map((e) => toItem(e, shelfOf(e), ["Film", "TV"]))
  .sort(byMentions);

/** Every film and show by its A–Z slug (its page: /library/moving-images/<slug>). */
export const screenBySlug: Record<string, CollectionItem> = Object.fromEntries(movingImages.map((it) => [it.slug, it]));
/** True for a card on a Moving Images shelf. */
export const isScreenItem = (it: CollectionItem): boolean => SHELF_KEYS.has(it.shelf) && it.slug in screenBySlug;
