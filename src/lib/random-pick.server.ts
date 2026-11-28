// Server side of "Random night out" at the bottom of every page (Lisa, 27 Nov 2026: "we should add a 'random pick' category
// on the bottom of every pages, for fun"; 28 Nov: option C, shown filled in with the pictures, "spin again if you like").
// Builds the pools from the data the pages already use - AFTERPARTY guests and the people pages (who you meet), the club
// pages (where you go), the club-night songs in the Jukebox (what the DJ plays) and the Library's books and films with a
// real cover (what you take home). Only the server function in random-pick.functions.ts loads this file, so the footer
// never downloads the A–Z.
import { afterpartyOf, entityBySlug, type Entity } from "@/data/entities";
import { episodes, episodePath } from "@/data/episodes";
import { PERSON_PROFILES } from "@/data/person-profiles";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { MEMORIAM } from "@/data/memoriam";
import { CLUB_PROFILES } from "@/data/club-profiles";
import { CLUB_TICKETS } from "@/data/club-tickets";
import { CLUB_NIGHTS } from "@/data/club-nights";
import { BOOK_SHELVES, bookClub, type CollectionItem } from "@/data/collections";
import { movingImages, SCREEN_SHELVES } from "@/data/moving-images";
import { coverFor } from "@/data/library-covers";
import { polaroidThumb } from "@/lib/polaroids";
import { cardPath } from "@/lib/card-link";
import type { RandomNight, RandomPick } from "@/lib/random-pick";

/** The first sentence (or the first ~170 characters) of a story, for the one line under the name. */
const firstLine = (text: string): string => {
  const t = text.replace(/\s+/g, " ").trim();
  const m = t.match(/^(.{40,200}?[.!?])(\s|$)/);
  const s = m ? m[1]! : t;
  return s.length > 200 ? `${s.slice(0, 197).replace(/\s+\S*$/, "")}…` : s;
};

/** Where it was dropped: "Dropped by Michael Musto on S1E2" (the first episode that names it). */
const droppedLine = (it: CollectionItem): string => {
  const m = it.moments[0];
  if (!m) return "";
  const more = new Set(it.moments.map((x) => x.episodeId)).size - 1;
  return `Dropped by ${m.guest} on ${m.code}${more > 0 ? ` and ${more} more AFTERPARTY${more > 1 ? "s" : ""}` : ""}.`;
};

/** A person's or club's own picture (a whole polaroid card), else the club's ticket, else a Library cover. */
const pictureOf = (e: Entity): RandomPick["pic"] => {
  const framed = PERSON_PORTRAITS[e.slug]?.polaroid ?? CLUB_PROFILES[e.slug]?.portrait?.polaroid;
  if (framed) return { src: framed, framed: true };
  const ticket = CLUB_TICKETS[e.slug]?.src;
  if (ticket) return { src: ticket };
  const cover = coverFor(e.name);
  return cover?.kind === "book" ? { src: cover.src } : undefined;
};

type Pools = {
  who: RandomPick[];
  where: RandomPick[];
  home: RandomPick[];
  songsOf: Map<string, RandomPick[]>;
  songs: RandomPick[];
};
let pools: Pools | undefined;

/** Never "who you meet" on a fun night out: Michael Alig (In memoriam page only), Angel Melendez, and the names Lisa keeps
 *  out of the Hall of Fame or gives no polaroid (Lisa, 21-23 Nov 2026). */
const NOT_ON_A_NIGHT_OUT = new Set([
  "michael-alig",
  "angel-melendez",
  "andre-angel-melendez",
  "andrew-crispo",
  "donald-trump",
  "rudy-giuliani",
  "sean-combs",
  "bruce-weber",
  "eric-trump",
  "ivanka-trump",
  "freeze-riggs",
  "halston",
]);

function buildPools(): Pools {
  // Who you meet: an AFTERPARTY guest (their polaroid) or a person with their own page and polaroid.
  const guests: RandomPick[] = episodes.map((ep) => ({
    kind: "guest",
    tag: `Guest · S${ep.season}E${ep.episode}${ep.part ?? ""}`,
    name: ep.guest.replace(/ aka .*/, ""),
    href: episodePath(ep.id),
    pic: polaroidThumb(ep.id, 512) ? { src: polaroidThumb(ep.id, 512)! } : undefined,
    line: firstLine(ep.blurb),
    go: "Go to the AFTERPARTY",
  }));
  const people: RandomPick[] = [
    ...Object.entries(PERSON_PROFILES).map(([slug, p]) => ({
      slug,
      story: p.story,
      tag: "Person",
    })),
    ...Object.entries(MEMORIAM).map(([slug, m]) => ({ slug, story: m.story, tag: "In memoriam" })),
  ].flatMap(({ slug, story, tag }) => {
    const e = entityBySlug[slug];
    const pic = e ? pictureOf(e) : undefined;
    if (!e || afterpartyOf(e) || !pic || NOT_ON_A_NIGHT_OUT.has(slug)) return [];
    return [
      {
        kind: "person" as const,
        tag,
        name: e.name,
        href: cardPath(slug),
        pic,
        line: firstLine(story),
      },
    ];
  });

  // Where you go: a club with its own page.
  const clubs: RandomPick[] = Object.entries(CLUB_PROFILES).flatMap(([slug, c]) => {
    const e = entityBySlug[slug];
    if (!e) return [];
    const where = [c.address, c.city].filter(Boolean).join(", ");
    return [
      {
        kind: "club" as const,
        tag: "Club",
        name: e.name,
        href: cardPath(slug),
        pic: pictureOf(e),
        line: `${where} · ${c.opened}–${c.closed}`,
      },
    ];
  });

  // What the DJ plays: a song from a club night in the Jukebox (the club's own night when it has one).
  const songsOf = new Map<string, RandomPick[]>(
    CLUB_NIGHTS.map((night) => [
      night.slug,
      night.songs.map((s) => ({
        kind: "song" as const,
        tag: `Song · ${night.club}`,
        name: s.title.replace(/\s*\((12"|7"|single|album version)\)\s*$/i, ""),
        href: `/jukebox?club=${night.slug}`,
        line: `${s.artist}, ${s.year}`,
        go: "Play it in the Jukebox",
      })),
    ]),
  );

  // What you take home: a Library book, magazine or film with a real cover.
  const shelfLabel = (key: string) =>
    [...BOOK_SHELVES, ...SCREEN_SHELVES].find((s) => s.key === key)?.label ?? "Library";
  const books: RandomPick[] = bookClub.flatMap((it) => {
    const cover = coverFor(it.name);
    if (!cover || cover.kind !== "book" || !it.moments.length) return [];
    return [
      {
        kind: "library" as const,
        tag: `Library · ${shelfLabel(it.shelf)}`,
        name: it.name,
        href: cardPath(it.slug),
        pic: { src: cover.src },
        line: droppedLine(it),
      },
    ];
  });
  const films: RandomPick[] = movingImages.flatMap((it) => {
    const cover = coverFor(it.name);
    if (!cover || !it.moments.length) return [];
    return [
      {
        kind: "film" as const,
        tag: `Library · ${shelfLabel(it.shelf)}`,
        name: it.name,
        href: `/library/moving-images/${it.slug}`,
        pic: { src: cover.src },
        line: droppedLine(it),
      },
    ];
  });

  return {
    who: [...guests, ...people],
    where: clubs,
    home: [...books, ...films],
    songsOf,
    songs: [...songsOf.values()].flat(),
  };
}

const pickOne = <T>(xs: T[]): T => xs[Math.floor(Math.random() * xs.length)]!;

/** One random night out (Lisa, 28 Nov 2026, option C): who you meet, where you go, what the DJ plays and what you take
 *  home. Never the page the visitor is on. The song comes from the club's own night in the Jukebox when it has one. */
export function randomNight(here: string): RandomNight {
  pools ??= buildPools();
  const path = here.split(/[?#]/)[0];
  const from = (xs: RandomPick[]) => {
    const ok = xs.filter((x) => x.href !== path);
    return pickOne(ok.length ? ok : xs);
  };
  const where = from(pools.where);
  const own = pools.songsOf.get(where.href.replace(/^\/explore\//, ""));
  return {
    who: from(pools.who),
    where,
    plays: pickOne(own?.length ? own : pools.songs),
    home: from(pools.home),
  };
}
