// Book Club and Jukebox: every book, magazine, song, band and sound named in the published episode indexes.
// Built from entities.ts, so a new Afterparty episode fills both pages automatically.
import { entities, type Entity, type Ref } from "./entities";
import { episodeById } from "./episodes";

export type Shelf = { key: string; label: string };

export type CollectionItem = {
  slug: string;
  name: string;
  shelf: string;
  link: string;
  mentions: number;
  firstRelease: number; // earliest episode release, for "newest first"
  moments: { episodeId: string; code: string; guest: string; time: string; context: string }[];
};

const hasCat = (e: Entity, cats: string[]) => cats.includes(e.category) || e.refs.some((r) => cats.includes(r.category));

function toItem(e: Entity, shelf: string, cats: string[]): CollectionItem {
  const refs: Ref[] = e.refs.filter((r) => cats.includes(r.category) || cats.includes(e.category));
  const moments = refs
    .filter((r) => r.episode)
    .map((r) => {
      const ep = episodeById(r.episode as string);
      return { episodeId: ep.id, code: `S${ep.season}E${ep.episode}`, guest: ep.guest, time: r.time, context: r.context };
    });
  return {
    slug: e.slug,
    name: e.name,
    shelf,
    link: e.link ?? "",
    mentions: refs.reduce((n, r) => n + r.mentions, 0),
    firstRelease: Math.min(...moments.map((m) => Date.parse(episodeById(m.episodeId).released) || Infinity)),
    moments,
  };
}

const byMentions = (a: CollectionItem, b: CollectionItem) => b.mentions - a.mentions || a.name.localeCompare(b.name);

// ---------- Book Club ----------
export const BOOK_SHELVES: Shelf[] = [
  { key: "books", label: "Books" },
  { key: "press", label: "Magazines, papers & columns" },
];

export const bookClub: CollectionItem[] = entities
  .filter((e) => hasCat(e, ["Book", "Publication"]))
  .map((e) => {
    const isBook = e.category === "Book" || (e.refs.some((r) => r.category === "Book") && !e.refs.some((r) => r.category === "Publication"));
    return toItem(e, isBook ? "books" : "press", ["Book", "Publication"]);
  })
  .sort(byMentions);

// ---------- Jukebox ----------
export const MUSIC_SHELVES: Shelf[] = [
  { key: "songs", label: "Songs, records & videos" },
  { key: "artists", label: "Artists & bands" },
  { key: "sounds", label: "Sounds & scenes" },
  { key: "stage", label: "Stage & musicals" },
];

const SOUNDS = /^(hip-hop|disco|jazz|house music|punk|new romantic|samba|the charleston|theremin)$/i;
const STAGE = /^(flora the red menace|victor\/victoria.*|positive me)$/i;
const SONG = /['‘’"“”]|–|^(fade to grey|the lady in red|too funky|warm leatherette|bedtime stories|presence.*)$/i;

export const jukebox: CollectionItem[] = entities
  .filter((e) => hasCat(e, ["Music"]))
  .map((e) => {
    const shelf = SOUNDS.test(e.name) ? "sounds" : STAGE.test(e.name) ? "stage" : SONG.test(e.name) ? "songs" : "artists";
    return toItem(e, shelf, ["Music"]);
  })
  .sort(byMentions);

/** Search links that let a visitor find the music or the book themselves; nothing is hosted here. */
export const listenLinks = (name: string) => {
  const q = encodeURIComponent(name.replace(/[‘’'"“”]/g, "").replace(/\s+–\s+/g, " "));
  return {
    spotify: `https://open.spotify.com/search/${q}`,
    youtube: `https://www.youtube.com/results?search_query=${q}`,
  };
};

export const findBookLink = (name: string) =>
  `https://openlibrary.org/search?q=${encodeURIComponent(name.replace(/\s*\([^)]*\)/g, "").replace(/[‘’'"“”]/g, ""))}`;
