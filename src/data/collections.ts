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
  /** Spotify URI (spotify:track:… / album / artist) for the Jukebox player, when one exists */
  spotify?: string | undefined;
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
// Official Spotify IDs, checked against Spotify search results (never guessed).
const SPOTIFY: Record<string, string> = {
  "'Heart of Glass' – Blondie": "spotify:track:5lQOzJmQladWC4kLQClssB",
  "'The Glamorous Life' – Sheila E.": "spotify:track:179SfVFJ0ZN41toTxnpgRD",
  "'Dancing in the Dark' video – Bruce Springsteen": "spotify:track:7FwBtcecmlpc1sLySPXeGE",
  "The Cars – 'Hello Again' video": "spotify:track:6HFpfx0Efw1ckqKTLVrMQy",
  "David Bowie – 'Boys Keep Swinging'": "spotify:track:5NXCDF2wyPv06X54abGTcp",
  "Kraftwerk – 'Radioactivity'": "spotify:track:3kwql90R2gmkK12R8uGHCs",
  "RuPaul – 'Supermodel (You Better Work)'": "spotify:track:4D8ZS6i1MX6cuFUZ9jdKYp",
  "'America' (West Side Story)": "spotify:track:71LoilVErjHICT2y5Qxz2E",
  "Fade to Grey": "spotify:track:3yobQNuKVJ62WDU7h725Fu",
  "The Lady in Red": "spotify:track:5tawGZuoaKGinhLIn9U5X4",
  "Too Funky": "spotify:track:1GoYYxXkwaQuLrFwc6nWCV",
  "Warm Leatherette": "spotify:track:1Yqv2qCLzmpNXEWR7tWZtU",
  "Bedtime Stories": "spotify:album:1saoZHjleM0tAQQoCvpMrB",
  "Presence (Led Zeppelin)": "spotify:album:3uhD8hNpb0m3iIZ18RHH5u",
  "Flora the Red Menace": "spotify:album:2VyTCz0JMUOhZVTb5XaQ7Z",
  "Victor/Victoria (Broadway)": "spotify:album:2d8srwInH3rMaj3G6Pim4D",
  "Village People": "spotify:artist:0dCKce6tJJdHvlWnDMwzPW",
  "Duran Duran": "spotify:artist:0lZoBs4Pzo7R89JM9lxwoT",
  "Frankie Goes to Hollywood": "spotify:artist:1mZu3rO7qSD09GdDpePHhY",
  "Kraftwerk": "spotify:artist:0dmPX6ovclgOy8WWJaFEUU",
  "Led Zeppelin": "spotify:artist:36QJpDe2go2KgaRleHCDTp",
  "ABC": "spotify:artist:2s79xe5F6eUQkjwjww27Fh",
  "New York Dolls": "spotify:artist:0WhGV9lzljq2QKJ8ipw6jx",
  "Tears for Fears": "spotify:artist:4bthk9UfsYUYdcFyqxmSUU",
  "The Temptations": "spotify:artist:3RwQ26hR2tJtA8F9p2n7jG",
  "The Who": "spotify:artist:67ea9eGLXYMsO2eYQRui3w",
  "Santana": "spotify:artist:6GI52t8N5F02MxU0g5U69P",
  "Creedence Clearwater Revival": "spotify:artist:3IYUhFvPQItj6xySrBmZkd",
  "The Rolling Stones": "spotify:artist:22bE4uQ6baNwSHPVcDxLCe",
  "U2": "spotify:artist:51Blml2LZPmy7TTiAg47vQ",
  "Crass": "spotify:artist:054P3YpUCLmd6a8HwdWDXE",
  "Elements of Vogue": "spotify:track:2IsWxmCvUFkpAyZUuJNQ0X",
  "DNA": "spotify:track:5Ti1MI6q3HftWtArMIe6OU",
  "Deep in Vogue": "spotify:track:1WHwnBfPaMt6A32VrR0dXv",
  "Vogue (Madonna song)": "spotify:track:27QvYgBk0CHOVHthWnkuWt",
  "Silent Night (Stevie Nicks)": "spotify:track:0WeaB3ox7Xb9OLDbEDKaFd",
  "Fans (Malcolm McLaren)": "spotify:album:3dzKtfxhjj4HpmSZfDYwnH",
  "Duck Rock": "spotify:album:6S4f7yDtJlS0iQMEuCtIF0",
  "Ian Dury and the Blockheads": "spotify:artist:7r993rArgKraCkh8w4Wszl",
  "Talking Heads": "spotify:artist:2x9SpqnPi8rlE9pjHBwmSC",
  "The B-52's": "spotify:artist:3gdbcIdNypBsYNu3iiCjtN",
  "Blondie": "spotify:artist:4tpUmLEVLCGFr93o8hFFIB",
  "Suicide": "spotify:artist:6uVeWolwyRDrT84lLsaZyW",
};

/** Lisa's public Spotify playlist with every playable Jukebox entry (artists and albums as their best-known song), most mentioned first. */
export const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/4RGIXkJLnDLZvSIagpUU3p";

export const MUSIC_SHELVES: Shelf[] = [
  { key: "songs", label: "Songs, records & videos" },
  { key: "artists", label: "Artists & bands" },
  { key: "sounds", label: "Sounds & scenes" },
  { key: "stage", label: "Stage & musicals" },
];

const SOUNDS = /^(hip-hop|disco|jazz|house music|punk|new romantic|samba|the charleston|theremin|new wave|reggae)$/i;
const STAGE = /^(flora the red menace|victor\/victoria.*|positive me|cats: the jellicle ball)$/i;
const SONG = /['‘’"“”]|–|^(fade to grey|the lady in red|too funky|warm leatherette|bedtime stories|presence.*|elements of vogue|deep in vogue|vogue \(madonna song\)|silent night \(stevie nicks\)|fans \(malcolm mclaren\)|duck rock)$/i;

export const jukebox: CollectionItem[] = entities
  .filter((e) => hasCat(e, ["Music"]))
  .map((e) => {
    const shelf = SOUNDS.test(e.name) ? "sounds" : STAGE.test(e.name) ? "stage" : SONG.test(e.name) ? "songs" : "artists";
    return { ...toItem(e, shelf, ["Music"]), spotify: SPOTIFY[e.name] };
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
