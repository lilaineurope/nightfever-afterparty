import { entities, entityFor, type Entity, type Ref } from "../data/entities";

// Cross-connects the cards: a known name written inside another card's text (context or fashion note)
// becomes a link to its own card, and every card lists the other cards that name it.
// Conservative on purpose - only names that can't be ordinary words.

const COMMON = new Set([
  "mother", "heaven", "area", "punk", "disco", "house", "pop", "soul", "jazz", "funk", "rock", "the club", "club", "ones",
  "planets", "tunnel", "the tunnel", "limelight", "palladium", "paradise", "pyramid", "saint", "america", "europe",
  "vogue", "details", "interview", "paper", "the face", "face", "time", "life", "people", "glamour", "elle", "nest",
  "madame", "drag", "fashion", "mood", "money", "candy", "kids", "the kids", "the ritz", "ritz", "boy", "the boy",
  "ballroom", "the ballroom", "downtown", "uptown", "the saint", "trash", "white trash", "the gallery", "gallery", "the loft", "loft", "nells",
]);

const SKIP_CATS = new Set(["Mood"]);

/** Names (as written on the cards) that may be turned into links, longest first. */
const linkable: { text: string; slug: string }[] = (() => {
  const out = new Map<string, string>();
  for (const e of entities) {
    if (SKIP_CATS.has(e.category)) continue;
    if (/\(S\d{2}E\d{2}\)/i.test(e.name)) continue;
    const names = new Set<string>([e.name.replace(/\s*\([^)]*\)/g, "").trim()]);
    for (const n of names) {
      if (!n || !/^[A-Z0-9]/.test(n)) continue;
      const words = n.split(/\s+/);
      const single = words.length === 1;
      if (COMMON.has(n.toLowerCase())) continue;
      if (single && (n.length < 5 || (e.category !== "Person" && n.length < 6))) continue;
      if (!out.has(n)) out.set(n, e.slug);
    }
  }
  return [...out.entries()].map(([text, slug]) => ({ text, slug })).sort((a, b) => b.text.length - a.text.length);
})();

// Names grouped by their first two letters, longest first. linkNames walks the text once and only tries the
// names that start with the letters in front of it. (One giant regex of every name did the same job but took
// most of a second on the server and helped make it time out while starting up.)
const byStart = new Map<string, { text: string; slug: string }[]>();
for (const l of linkable) {
  const key = l.text.slice(0, 2);
  const list = byStart.get(key) ?? [];
  list.push(l); // linkable is already longest first
  byStart.set(key, list);
}
// A name only counts as a whole word: no letter, digit, "_" or "-" right before or after it.
const isWordChar = (c: string | undefined) => !!c && /[\w-]/.test(c);

export type Segment = { text: string; slug?: string };

/** Split text into plain parts and linked names (each name linked once; never the card itself). */
export function linkNames(text: string, selfSlug?: string): Segment[] {
  if (!text || linkable.length === 0) return [{ text }];
  const out: Segment[] = [];
  const seen = new Set<string>();
  let last = 0;
  let i = 0;
  while (i < text.length) {
    const found = isWordChar(text[i - 1])
      ? undefined
      : byStart
          .get(text.slice(i, i + 2))
          ?.find((l) => text.startsWith(l.text, i) && !isWordChar(text[i + l.text.length]));
    if (!found) {
      i++;
      continue;
    }
    const { slug } = found;
    if (slug !== selfSlug && !seen.has(slug)) {
      seen.add(slug);
      if (i > last) out.push({ text: text.slice(last, i) });
      out.push({ text: found.text, slug });
      last = i + found.text.length;
    }
    i += found.text.length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

/** Every card whose text names this entity (other cards only). */
export type NamedOn = { entity: Entity; ref: Ref };
const namedOnIndex: Map<string, NamedOn[]> = (() => {
  const idx = new Map<string, NamedOn[]>();
  for (const e of entities) {
    for (const r of e.refs) {
      for (const seg of linkNames(`${r.context ?? ""} ${r.fashion ?? ""}`, e.slug)) {
        if (!seg.slug) continue;
        const list = idx.get(seg.slug) ?? [];
        if (!list.some((x) => x.entity.slug === e.slug && x.ref.episode === r.episode)) list.push({ entity: e, ref: r });
        idx.set(seg.slug, list);
      }
    }
  }
  return idx;
})();

export const namedOn = (e: Entity): NamedOn[] => namedOnIndex.get(e.slug) ?? [];
export const namedOnCount = (name: string): number => {
  const e = entityFor(name);
  return e ? (namedOnIndex.get(e.slug)?.length ?? 0) : 0;
};
