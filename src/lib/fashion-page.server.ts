// One page per designer or label and per shop on the Library's Fashion & outfits shelves (Lisa, 27 Nov 2026: "shops and
// boutiques need pictures and we need to setup pages for it" ... "designers needs pages and polaroids"). Worked out on
// the server (src/lib/fashion-page.functions.ts), drawn by src/components/fashion-name-page.tsx through the routes
// /library/designer/$slug and /library/shop/$slug. Every word comes from the episode rows, src/data/shop-facts.ts and
// the photo credits - nothing guessed.
import { FASHION_DESIGNERS, LIBRARY_LOOKS as FASHION_LOOKS, FASHION_SHOPS, type FashionItem, type FashionLook } from "@/data/library-fashion";
import { SHOP_FACTS } from "@/data/shop-facts";
import { SHOP_PHOTOS, type ShopPhoto } from "@/data/shop-photos";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { afterpartyOf, entityBySlug, entityFor } from "@/data/entities";
import { episodeById } from "@/data/episodes";
import { cardPath } from "@/lib/card-link";
import { polaroidThumb } from "@/lib/polaroids";
import { shopBandOf } from "@/lib/map-view.server";
import type { MapBand } from "@/lib/map-view";
import type { LookNamed } from "@/lib/look-page.server";

export type FashionPageView = {
  kind: "designer" | "shop";
  slug: string;
  name: string;
  /** Designer, Label or Shop. */
  tag: string;
  note: string;
  mentions: number;
  afterparties: number;
  /** The face on the page: their AFTERPARTY polaroid, their person polaroid, or the label's maker's. */
  polaroid?: string | undefined;
  polaroidCredit?: string | undefined;
  /** "Richie Rich's label". */
  maker?: LookNamed | undefined;
  /** Their own A–Z card or AFTERPARTY. */
  card?: LookNamed | undefined;
  photo?: ShopPhoto | undefined;
  where?: string | undefined;
  when?: string | undefined;
  about?: string | undefined;
  band?: MapBand | null;
  /** Looks on the shelf that name this designer (or that they wore), or that were bought, worn or seen at this shop. */
  looks: { slug: string; name: string; who?: string | undefined; outfit: FashionLook["outfit"]; palette: string[] }[];
  /** Names in the episode lines that have a page (people, clubs, places, designers). */
  tags: LookNamed[];
  moments: { episodeId: string; short: string; guest: string; time: string; context: string; polaroid?: string | undefined }[];
  /** The rest of the shelf, for the strip at the bottom. */
  more: { slug: string; name: string; polaroid?: string | undefined; photo?: string | undefined }[];
};

export const designerBySlug = new Map(FASHION_DESIGNERS.map((d) => [d.slug, d]));
export const shopBySlug = new Map(FASHION_SHOPS.map((s) => [s.slug, s]));

const short = (id: string) => {
  const ep = episodeById(id);
  return `S${String(ep.season).padStart(2, "0")}E${String(ep.episode).padStart(2, "0")}${ep.part ?? ""}`;
};

function named(name: string, slug?: string): LookNamed {
  const e = slug ? entityBySlug[slug] : entityFor(name);
  const ep = afterpartyOf(e);
  return { name: e?.name ?? name, href: e ? cardPath(e.slug) : undefined, polaroid: ep ? polaroidThumb(ep, 240) : undefined };
}

/** The designer's or label's face, as on its cover (src/components/fashion-cover.tsx). */
function faceOf(it: FashionItem, size: 1024 | 512 | 240): { src?: string | undefined; credit?: string | undefined } {
  const f = it.fashion;
  if (f.polaroidEpisode) return { src: polaroidThumb(f.polaroidEpisode, size), credit: "Their AFTERPARTY polaroid" };
  const p = f.face ? PERSON_PORTRAITS[f.face] : undefined;
  return p ? { src: p.polaroid, credit: p.credit } : {};
}

/** Words to find a shop by in the looks' stories: its name without the bracket, and "Pat Field" for Patricia Field's. */
function shopWords(it: FashionItem): RegExp {
  const base = it.name.replace(/\s*\(.*\)$/, "").replace(/,.*$/, "");
  const alts = [base];
  if (/^Patricia Field/.test(it.name)) alts.push("Pat Field", "Patricia Field's");
  return new RegExp(`\\b(?:${alts.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "i");
}

function tagsOf(it: FashionItem, skip: Set<string>): LookNamed[] {
  const e = entityBySlug[it.slug];
  const found = new Set<string>();
  for (const r of e?.refs ?? [])
    for (const m of `${r.context} ${r.fashion ?? ""}`.matchAll(/\b[A-Z][\w'.&-]+(?: [A-Z][\w'.&-]+)*/g)) {
      const hit = entityFor(m[0]);
      if (hit && !skip.has(hit.slug) && /^(Person|Club|Location|Event|Organisation)$/.test(hit.category)) found.add(hit.slug);
    }
  return [...found].slice(0, 10).map((s) => named(entityBySlug[s]!.name, s));
}

const lookCard = (x: FashionItem) => ({
  slug: x.slug,
  name: x.name,
  who: x.fashion.look!.who?.name,
  outfit: x.fashion.look!.outfit,
  palette: x.fashion.look!.palette,
});

function base(it: FashionItem, kind: "designer" | "shop") {
  const e = entityBySlug[it.slug];
  const ep = afterpartyOf(e);
  return {
    kind,
    slug: it.slug,
    name: it.name,
    tag: it.fashion.tag,
    note: it.fashion.note,
    mentions: it.mentions,
    afterparties: new Set(it.moments.map((m) => m.episodeId)).size,
    card: e ? { name: ep ? `${e.name}'s AFTERPARTY` : `${e.name} in the A–Z`, href: cardPath(e.slug) } : undefined,
    moments: it.moments.map((m) => ({ ...m, short: short(m.episodeId), polaroid: polaroidThumb(m.episodeId, 240) })),
  };
}

export function designerPageData(slug: string): FashionPageView | null {
  const it = designerBySlug.get(slug);
  if (!it) return null;
  const face = faceOf(it, 1024);
  const maker = it.fashion.maker;
  return {
    ...base(it, "designer"),
    polaroid: face.src,
    polaroidCredit: face.credit,
    maker: maker ? (maker.slug ? named(maker.name, maker.slug) : { name: maker.name }) : undefined,
    // The looks they made, then the looks they wore themselves (Leigh Bowery's own looks are his designs too).
    looks: [
      ...FASHION_LOOKS.filter((l) => l.fashion.look?.designers.some((d) => d.slug === slug)),
      ...FASHION_LOOKS.filter((l) => l.fashion.look?.who?.slug === slug && !l.fashion.look.designers.some((d) => d.slug === slug)),
    ]
      .slice(0, 24)
      .map(lookCard),
    tags: tagsOf(it, new Set([slug, maker?.slug ?? ""])),
    more: FASHION_DESIGNERS.filter((d) => d.slug !== slug)
      .slice(0, 12)
      .map((d) => ({ slug: d.slug, name: d.name, polaroid: faceOf(d, 240).src })),
  };
}

export function shopPageData(slug: string): FashionPageView | null {
  const it = shopBySlug.get(slug);
  if (!it) return null;
  const facts = SHOP_FACTS[slug];
  const rx = shopWords(it);
  const looks = FASHION_LOOKS.filter((l) =>
    entityBySlug[l.slug]?.refs.some((r) => rx.test(`${r.name} ${r.heard ?? ""} ${r.context ?? ""} ${r.fashion ?? ""}`)),
  );
  return {
    ...base(it, "shop"),
    photo: SHOP_PHOTOS[slug],
    where: facts?.where,
    when: facts?.when,
    about: facts?.about,
    band: shopBandOf(slug, facts?.pin),
    looks: looks.slice(0, 24).map(lookCard),
    tags: tagsOf(it, new Set([slug])),
    more: FASHION_SHOPS.filter((s) => s.slug !== slug)
      .slice(0, 12)
      .map((s) => ({ slug: s.slug, name: s.name, photo: SHOP_PHOTOS[s.slug]?.src })),
  };
}
