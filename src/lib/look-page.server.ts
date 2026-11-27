// One page per look and outfit on the Library's Fashion & outfits shelf (Lisa, 24 Nov 2026: "a page per look and outfit
// which describes it with a mannequin setup like we have it in wardrobe and look for a photo of the real thing the guests
// were referring to"). Worked out on the server (src/lib/look-page.functions.ts), drawn by src/routes/library_.look.$slug.tsx.
// Every word comes from the episode index rows (what was worn, the colours, the moment) - nothing guessed.
import { FASHION_LOOKS, type FashionLook } from "@/data/library-fashion";
import { LOOK_PHOTOS, type LookPhoto } from "@/data/look-photos";
import { afterpartyOf, entityBySlug, entityFor } from "@/data/entities";
import { episodeById } from "@/data/episodes";
import { cardPath } from "@/lib/card-link";
import { polaroidThumb } from "@/lib/polaroids";
import { SLOTS } from "@/data/fashion-words";
import { LOOK_OUTFITS } from "@/data/look-outfits";

export type LookNamed = { name: string; href?: string | undefined; polaroid?: string | undefined };
export type LookPageView = {
  slug: string;
  name: string;
  /** "On camera", "Look" */
  tag: string;
  shelf: string;
  code: string;
  episodeId: string;
  episodeGuest: string;
  worn: string;
  who?: LookNamed | undefined;
  palette: string[];
  outfit: FashionLook["outfit"];
  /** The pieces rail by rail, in the Wardrobe's order. */
  pieces: { rail: string; label: string; hex: string }[];
  designers: LookNamed[];
  /** Names in the story that have a page (clubs, people, places), so the look links into the site. */
  tags: LookNamed[];
  moments: { episodeId: string; short: string; guest: string; time: string; context: string; polaroid?: string | undefined }[];
  mentions: number;
  photo?: LookPhoto | undefined;
  /** True when the mannequin wears what the photo shows rather than the episode's words. */
  asPhoto: boolean;
  /** Other looks from the same episode, for the strip at the bottom. */
  more: { slug: string; name: string; who?: string | undefined; outfit: FashionLook["outfit"]; palette: string[] }[];
};

export const lookBySlug = new Map(FASHION_LOOKS.map((l) => [l.slug, l]));

function named(name: string, slug?: string): LookNamed {
  const e = slug ? entityBySlug[slug] : entityFor(name);
  const ep = afterpartyOf(e);
  return { name: e?.name ?? name, href: e ? cardPath(e.slug) : undefined, polaroid: ep ? polaroidThumb(ep, 240) : undefined };
}

const short = (id: string) => {
  const ep = episodeById(id);
  return `S${String(ep.season).padStart(2, "0")}E${String(ep.episode).padStart(2, "0")}${ep.part ?? ""}`;
};

export function lookPageData(slug: string): LookPageView | null {
  const it = lookBySlug.get(slug);
  const l = it?.fashion.look;
  if (!it || !l) return null;
  const e = entityBySlug[slug];
  const ep = episodeById(l.episode);
  const who = l.who ? named(l.who.name, l.who.slug) : undefined;
  const skip = new Set([slug, l.who?.slug, ...l.designers.map((d) => d.slug)]);
  const tagSlugs = new Set<string>();
  for (const r of e?.refs ?? [])
    for (const m of `${r.context} ${r.fashion ?? ""}`.matchAll(/\b[A-Z][\w'.&-]+(?: [A-Z][\w'.&-]+)*/g)) {
      const hit = entityFor(m[0]);
      if (hit && !skip.has(hit.slug) && /^(Person|Club|Location|Event|Organisation|Music|Film|TV)$/.test(hit.category)) tagSlugs.add(hit.slug);
    }
  return {
    slug,
    name: it.name,
    tag: it.fashion.tag,
    shelf: it.shelf,
    code: l.code,
    episodeId: ep.id,
    episodeGuest: ep.guest,
    worn: l.worn,
    who,
    palette: l.palette,
    outfit: l.outfit,
    pieces: SLOTS.flatMap((s) => {
      const g = l.outfit[s.id];
      return g ? [{ rail: s.label, label: g.label, hex: g.hex }] : [];
    }),
    designers: l.designers.map((d) => named(d.name, d.slug)),
    tags: [...tagSlugs].slice(0, 8).map((s) => named(entityBySlug[s]!.name, s)),
    moments: it.moments.map((m) => ({ ...m, short: short(m.episodeId), polaroid: polaroidThumb(m.episodeId, 240) })),
    mentions: it.mentions,
    photo: LOOK_PHOTOS[slug],
    asPhoto: !!LOOK_PHOTOS[slug] && slug in LOOK_OUTFITS,
    more: FASHION_LOOKS.filter((x) => x.slug !== slug && x.fashion.look?.episode === l.episode)
      .slice(0, 12)
      .map((x) => ({ slug: x.slug, name: x.name, who: x.fashion.look!.who?.name, outfit: x.fashion.look!.outfit, palette: x.fashion.look!.palette })),
  };
}
