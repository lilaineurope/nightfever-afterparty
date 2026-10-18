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

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const RX = new RegExp(`(?<![\\w-])(${linkable.map((l) => esc(l.text)).join("|")})(?![\\w-])`, "g");
const slugOfText = new Map(linkable.map((l) => [l.text, l.slug]));

export type Segment = { text: string; slug?: string };

/** Split text into plain parts and linked names (each name linked once; never the card itself). */
export function linkNames(text: string, selfSlug?: string): Segment[] {
  if (!text || linkable.length === 0) return [{ text }];
  const out: Segment[] = [];
  const seen = new Set<string>();
  let last = 0;
  for (const m of text.matchAll(RX)) {
    const slug = slugOfText.get(m[1]!);
    if (!slug || slug === selfSlug || seen.has(slug)) continue;
    seen.add(slug);
    if (m.index! > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: m[1]!, slug });
    last = m.index! + m[1]!.length;
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
