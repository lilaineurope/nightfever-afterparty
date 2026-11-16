// Records every name -> card answer a page's links ask for, the way EntityLink, EntityText and MomentsBox ask
// (src/lib/link-index.tsx), so a page can get them from the server instead of loading the whole A–Z. Server only.
import { entityBySlug, entityFor, linkCard } from "@/data/entities";
import { linkNames } from "@/lib/name-links";
import { showParts } from "@/components/show-text";
import { textKey, type LinkCard, type LinkData, type Segment } from "@/lib/link-index";

/** Every name -> card answer a card page asks for, recorded the way EntityLink and EntityText ask. */
export function linkRecorder() {
  const data: LinkData = { names: {}, cards: {}, texts: {} };
  const card = (slug: string) => {
    if (data.cards[slug]) return;
    const c: LinkCard | undefined = linkCard(entityBySlug[slug]);
    if (c) data.cards[slug] = c;
  };
  /** <EntityLink name={n}> */
  const name = (n: string) => {
    if (n in data.names) return;
    const e = entityFor(n);
    data.names[n] = e?.slug ?? null;
    if (e) card(e.slug);
  };
  /** <EntityText text={t} self={self}> */
  const text = (t: string, self: string) => {
    name(self);
    const selfSlug = entityFor(self)?.slug ?? "";
    for (const part of showParts(t)) {
      if (part === "Night Fever" || part === "World of Wonder") continue;
      const segs: Segment[] = linkNames(part, selfSlug);
      // Text without a name to link needs no entry: the page shows it as it is (useLinks falls back to the plain text).
      if (segs.some((s) => s.slug)) data.texts[textKey(part, selfSlug)] = segs;
      for (const s of segs) if (s.slug) card(s.slug);
    }
  };
  return { data, card, name, text };
}

