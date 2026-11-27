// Two-way story links (Lisa, 27 Nov 2026, "A6"): when a club, In memoriam, living-person or diary page names someone in
// its story, timeline, stage, rooms or diary moments, that person's page links back to it ("On these AFTERPARTY pages").
// Before, Xenon's story named Peppo Vanini and his page didn't know. Server only.
import { entityBySlug, entityFor } from "@/data/entities";
import { CLUB_PROFILES } from "@/data/club-profiles";
import { MEMORIAM } from "@/data/memoriam";
import { PERSON_PROFILES } from "@/data/person-profiles";
import { DIARY_PAGES } from "@/data/diaries";
import { linkNames } from "@/lib/name-links";

export type StoryPage = { slug: string; name: string; kind: string };

const index: Map<string, StoryPage[]> = (() => {
  const idx = new Map<string, StoryPage[]>();
  const add = (page: string, kind: string, texts: string[], names: string[]) => {
    const own = entityBySlug[page];
    if (!own) return;
    const found = new Set<string>();
    for (const t of texts) for (const s of linkNames(t, page)) if (s.slug) found.add(s.slug);
    for (const n of names) {
      const e = entityFor(n);
      if (e && e.slug !== page) found.add(e.slug);
    }
    for (const slug of found) {
      const list = idx.get(slug) ?? [];
      if (!list.some((x) => x.slug === page)) list.push({ slug: page, name: own.name, kind });
      idx.set(slug, list);
    }
  };
  for (const [slug, c] of Object.entries(CLUB_PROFILES))
    add(slug, "Club", [c.story, ...c.timeline.map((t) => t[1])], [...c.stage, ...c.rooms, ...(c.also?.names ?? [])]);
  for (const [slug, m] of Object.entries(MEMORIAM))
    add(slug, "In memoriam", [m.story, ...m.timeline.map((t) => t[1])], [...m.liftedUp, ...m.rooms, ...(m.also?.names ?? [])]);
  for (const [slug, p] of Object.entries(PERSON_PROFILES))
    add(slug, "Person", [p.story, ...p.timeline.map((t) => t[1])], [...p.liftedUp, ...p.rooms, ...(p.also?.names ?? [])]);
  for (const [slug, d] of Object.entries(DIARY_PAGES))
    add(slug, "Diary", [d.story, ...d.moments.flatMap((m) => m.lines?.map((l) => l.text) ?? [])], [d.keeper]);
  return idx;
})();

/** Every club, In memoriam, person and diary page whose story names this card. */
export const storyPagesFor = (slug: string): StoryPage[] => index.get(slug) ?? [];
