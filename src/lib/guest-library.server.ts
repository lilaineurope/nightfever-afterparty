// A guest's own Library as a summary of the whole Library (Lisa, 28 Nov 2026: "Guest's library pages should be a summary of
// all library categories (publications, cover art, fashion, moving image) and update every time when we add more items to the
// library"). Worked out on the server (src/lib/guest-library.functions.ts), drawn by src/routes/library_.$slug.tsx.
//
// Nothing here is typed in by hand: every category in LIBRARY_CATEGORIES (src/data/library-categories.ts) is read, so a new
// item, shelf or category shows up on every guest's Library by itself. An item belongs to a person's Library when
// - it was dropped on their AFTERPARTY (a moment in their episode), or
// - it is theirs: they made it (src/lib/works.ts), designed the sleeve or poster, made or are on a club piece, are the
//   designer, label or shop, wore the look, or are in the film's or show's credits (cast and team).
import CREDITS from "@/data/screen-credits.json";
import type { CollectionItem } from "@/data/collections";
import { entityBySlug, entityFor } from "@/data/entities";
import { episodeById, stageName } from "@/data/episodes";
import { LIBRARY_CATEGORIES } from "@/data/library-categories";
import { coverFor } from "@/data/library-covers";
import { clubPieceFacts } from "@/data/cover-art";
import { isFashionItem } from "@/data/library-fashion";
import { isScreenItem } from "@/data/moving-images";
import { ITEM_STORIES } from "@/data/item-stories";
import { MADE_BY } from "@/data/made-by";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { coverDesign, type CoverDesign } from "@/lib/cover-design";
import { polaroidThumb } from "@/lib/polaroids";
import { libraryOf, type PersonWork } from "@/lib/works";
import type { StillToMake } from "@/data/still-to-make";
import type { InterviewTip } from "@/data/interview-next";

/** Where a tile opens: its own Library page (art, look, designer, shop, film or show) or its A–Z / item page. */
export type TileLink =
  | { to: "/explore/$slug"; slug: string }
  | { to: "/library/art/$slug"; slug: string }
  | { to: "/library/look/$slug"; slug: string }
  | { to: "/library/designer/$slug"; slug: string }
  | { to: "/library/shop/$slug"; slug: string }
  | { to: "/library/moving-images/$slug"; slug: string };

export type GuestTile = {
  key: string;
  name: string;
  link: TileLink;
  design: CoverDesign;
  why?: string | undefined;
};

export type MadeTile = {
  key: string;
  work: PersonWork;
  link?: TileLink | undefined;
  design?: CoverDesign | undefined;
};

export type GuestCategory = {
  key: string;
  label: string;
  /** Theirs: what they made, designed, wore or are in (with what they did under the cover). */
  own: GuestTile[];
  /** Dropped on their AFTERPARTY, most dropped there first. */
  dropped: GuestTile[];
};

export type GuestLibraryView = {
  slug: string;
  name: string;
  episode?: string | undefined;
  polaroid?: string | undefined;
  made: MadeTile[];
  offShow: number;
  categories: GuestCategory[];
  ideas: (StillToMake & { kind: "Book" | "Film" })[];
  tips: (InterviewTip & { card?: string | undefined })[];
};

type RawWork = { team?: { role: string; people: { name: string; as?: string }[] }[] };
const WORKS = CREDITS as unknown as Record<string, RawWork>;

const slugOf = (name: string): string | undefined => {
  const e = entityFor(name);
  return e?.category === "Person" || e?.category === "Organisation" ? e.slug : undefined;
};

/** The person's part in a film or show: "In it" for the cast, else the credit's own words ("Directed by"). */
let SCREEN_PEOPLE: Map<string, Map<string, string>> | undefined;
function screenPeople(): Map<string, Map<string, string>> {
  if (SCREEN_PEOPLE) return SCREEN_PEOPLE;
  const idx = new Map<string, Map<string, string>>();
  const add = (work: string, name: string, role: string) => {
    const s = slugOf(name);
    if (!s) return;
    const m = idx.get(s) ?? new Map<string, string>();
    if (!m.has(work)) m.set(work, role);
    idx.set(s, m);
  };
  for (const cat of LIBRARY_CATEGORIES)
    for (const it of cat.items) {
      if (!isScreenItem(it)) continue;
      for (const r of WORKS[it.name]?.team ?? [])
        for (const p of r.people)
          add(it.slug, p.name, /cast|voice/i.test(r.role) ? "In it" : r.role);
      for (const p of ITEM_STORIES[it.slug]?.inIt ?? []) add(it.slug, p.name, "In it");
      for (const m of MADE_BY[it.name] ?? []) add(it.slug, m.name, m.role);
    }
  SCREEN_PEOPLE = idx;
  return idx;
}

function linkOf(it: CollectionItem): TileLink {
  if (it.art) return { to: "/library/art/$slug", slug: it.art.page };
  if (isFashionItem(it)) {
    if (it.fashion.kind === "designer") return { to: "/library/designer/$slug", slug: it.slug };
    if (it.fashion.kind === "shop") return { to: "/library/shop/$slug", slug: it.slug };
    if (it.fashion.look && it.shelf !== "rooms")
      return { to: "/library/look/$slug", slug: it.slug };
  }
  if (isScreenItem(it)) return { to: "/library/moving-images/$slug", slug: it.slug };
  return { to: "/explore/$slug", slug: it.slug };
}

const first = (name: string) => name.split(/\s+/)[0] ?? name;

export function guestLibraryData(slug: string): GuestLibraryView | null {
  const e = entityBySlug[slug];
  if (!e || e.category !== "Person") return null;
  const { works, picks, ideas, tips, episode } = libraryOf(slug, (n) =>
    coverFor(n)?.kind === "book" ? coverFor(n)!.src : undefined,
  );
  const name = episode ? stageName(episodeById(episode).guest) : e.name;
  const short = first(name);
  const madeSlugs = new Map(works.filter((w) => w.slug).map((w) => [w.slug!, w]));
  const madeNames = new Map(works.map((w) => [w.name, w]));
  const screen = screenPeople().get(slug);
  const picked = new Set(picks.map((p) => p.slug));

  /** Why an item is theirs (undefined when it isn't). */
  const ownWhy = (it: CollectionItem): string | undefined => {
    const w = madeSlugs.get(it.slug) ?? madeNames.get(it.name);
    if (it.art) {
      if (it.art.designers.some((d) => slugOf(d) === slug)) return "Made the artwork";
      const club = clubPieceFacts(it);
      const role = club?.madeBy.find((m) => slugOf(m.name) === slug)?.role;
      if (role) return role;
      if (club?.onIt.some((n) => slugOf(n) === slug)) return "On it";
      if (w) return w.roles[0];
      return undefined;
    }
    if (isFashionItem(it)) {
      const f = it.fashion;
      if ((f.kind === "designer" || f.kind === "shop") && it.slug === slug)
        return f.kind === "shop" ? "Their shop" : f.tag;
      if (
        f.maker?.slug === slug ||
        (f.kind !== "look" && episode && f.polaroidEpisode === episode && !f.maker?.slug)
      )
        return f.kind === "shop" ? "Their shop" : "Their label";
      // A look's story names whose it is and the designers in it (the same rule as the designer pages).
      if (f.look?.who?.slug === slug)
        return it.shelf === "rooms" ? `${short}'s moment` : `Worn by ${short}`;
      if (f.look?.designers.some((d) => d.slug === slug)) return `Names ${short}`;
      return undefined;
    }
    if (isScreenItem(it)) {
      const role = screen?.get(it.slug);
      if (role) return role;
      return w?.roles[0];
    }
    return w?.roles[0];
  };

  const inEp = (it: CollectionItem) =>
    episode ? it.moments.filter((m) => m.episodeId === episode).length : 0;

  const categories: GuestCategory[] = LIBRARY_CATEGORIES.map((cat) => {
    const own: GuestTile[] = [];
    const dropped: GuestTile[] = [];
    const seen = new Set<string>();
    cat.items.forEach((it) => {
      const link = linkOf(it);
      const key = `${link.to}:${link.slug}`;
      if (seen.has(key)) return;
      // Publications: theirs (also on the "Made by" shelf, so the category count is complete), then libraryOf's picks.
      if (cat.key === "publications") {
        const mine = madeSlugs.get(it.slug);
        if (mine && !mine.offShow) {
          seen.add(key);
          own.push({
            key,
            name: it.name,
            link,
            design: coverDesign(it, own.length),
            why: mine.roles[0],
          });
        } else if (picked.has(it.slug)) {
          seen.add(key);
          dropped.push({ key, name: it.name, link, design: coverDesign(it, dropped.length) });
        }
        return;
      }
      const why = ownWhy(it);
      if (why) {
        seen.add(key);
        own.push({ key, name: it.name, link, design: coverDesign(it, own.length), why });
      } else if (inEp(it) > 0) {
        seen.add(key);
        dropped.push({ key, name: it.name, link, design: coverDesign(it, dropped.length) });
      }
    });
    // Publications keep libraryOf's order (most dropped on the AFTERPARTY first); the rest sort the same way.
    if (cat.key !== "publications") {
      const n = new Map(cat.items.map((it) => [linkOf(it).slug, inEp(it)]));
      dropped.sort((a, b) => (n.get(b.link.slug) ?? 0) - (n.get(a.link.slug) ?? 0));
    } else {
      const order = new Map(picks.map((p, i) => [p.slug, i]));
      dropped.sort((a, b) => (order.get(a.link.slug) ?? 0) - (order.get(b.link.slug) ?? 0));
    }
    return { key: cat.key, label: cat.label, own, dropped };
  });

  // "Made by": a work with a Library item opens its own page there (a film's page, a book's page), and wears that cover.
  const all = LIBRARY_CATEGORIES.flatMap((c) => c.items);
  const pubBySlug = new Map(LIBRARY_CATEGORIES[0]!.items.map((b) => [b.slug, b]));
  const screenBy = new Map(all.filter(isScreenItem).map((it) => [it.slug, it]));
  const made: MadeTile[] = works.map((w) => {
    const key = w.slug ?? w.name;
    if (w.offShow || !w.slug) return { key, work: w };
    const pub = pubBySlug.get(w.slug);
    if (pub)
      return {
        key,
        work: w,
        link: { to: "/explore/$slug", slug: w.slug },
        design: coverDesign(pub, 0),
      };
    const film = screenBy.get(w.slug);
    if (film)
      return {
        key,
        work: w,
        link: { to: "/library/moving-images/$slug", slug: w.slug },
        design: coverDesign(film, 0),
      };
    return { key, work: w, link: { to: "/explore/$slug", slug: w.slug } };
  });

  return {
    slug,
    name,
    episode,
    polaroid: episode ? polaroidThumb(episode, 512) : PERSON_PORTRAITS[slug]?.polaroid,
    made,
    offShow: works.filter((w) => w.offShow).length,
    categories,
    ideas,
    tips: tips.map((t) => ({ ...t, card: entityFor(t.name)?.slug })),
  };
}
