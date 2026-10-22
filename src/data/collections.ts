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
  { key: "magazines", label: "Magazines" },
  { key: "newspapers", label: "Newspapers" },
  { key: "columns", label: "Columns & articles" },
];

// Lisa, 23 Oct 2026: magazines, newspapers and columns are separate shelves.
// Columns & articles: a single piece or a named column - quoted titles, "Magazine – 'Story'", or a column/piece named in brackets after its writer.
const COLUMN = /^'|\s[–-]\s'|^(Page Six|Ms\. Lonely Hearts|Nations|Venus Envy)\b/;
const NEWSPAPER = /\b(Times|Post|News|Daily|Journal|Chronicle|Inquirer|Newsday|Voice|Spectator|Dispatch)\b/;
function pressShelf(name: string): string {
  if (COLUMN.test(name)) return "columns";
  if (/\bmagazine\b/i.test(name)) return "magazines";
  return NEWSPAPER.test(name) ? "newspapers" : "magazines";
}

export const bookClub: CollectionItem[] = entities
  .filter((e) => hasCat(e, ["Book", "Publication"]))
  .map((e) => {
    const isBook = e.category === "Book" || (e.refs.some((r) => r.category === "Book") && !e.refs.some((r) => r.category === "Publication"));
    return toItem(e, isBook ? "books" : pressShelf(e.name), ["Book", "Publication"]);
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
  "Bow Wow Wow": "spotify:artist:52K4ArhA4OgMO7AsyEgqCT",
  "Stray Cats": "spotify:artist:2ibPkysx2PXqWLmxFD7jSg",
  "INXS": "spotify:artist:1eClJfHLoDI4rZe5HxzBFv",
  "The Clash": "spotify:artist:3RGLhK1IP9jnYFH4BRFJBS",
  "Dexys Midnight Runners": "spotify:artist:4QTVePrFu1xuGM9K0kNXkk",
  "Sonic Youth": "spotify:artist:5UqTO8smerMvxHYA5xsXb6",
  "Sex Pistols": "spotify:artist:1u7kkVrr14iBvrpYnZILJR",
  "The Psychedelic Furs": "spotify:artist:0O0lrN34wrcuBenkqlEDZe",
  "A Flock of Seagulls": "spotify:artist:0uAjBatvB4ubpd4kCfjmNt",
  "AC/DC": "spotify:artist:711MCceyCBcFnzjGY4Q7Un",
  "Aerosmith": "spotify:artist:7Ey4PD4MYsKc5I2dolUwbH",
  "Coldplay": "spotify:artist:4gzpq5DPGxSnKTe4SA8HAU",
  "Culture Club": "spotify:artist:6kz53iCdBSqhQCZ21CoLcc",
  "Deee-Lite": "spotify:artist:4eQJIXFEujzhTVVS1gIfu5",
  "Oasis": "spotify:artist:2DaxqgrOhkeH0fpeiQq2f4",
  "Ramones": "spotify:artist:1co4F2pPNH8JjTutZkmgSm",
  "Roxy Music": "spotify:artist:3fhOTtm0LBJ3Ojn4hIljLo",
  "T. Rex": "spotify:artist:3dBVyJ7JuOMt4GE9607Qin",
  "The Buggles": "spotify:artist:057gc1fxmJ2vkctjQJ7Tal",
  "The Soup Dragons": "spotify:artist:5BEYGWk6aPdNXxBx9pwU8S",
  "The Stranglers": "spotify:artist:0RUEHcBiENFEqxgicqS2ig",
  "Buffalo Gals": "spotify:track:5lik8MXJIcgeJz2wZgt530",
  "Ordinary World": "spotify:track:0wokCRaKD0zPNhMRXAgVsr",
  "Sugar Kane": "spotify:track:6q03mlzKsM1m3TLpi6T6Cw",
  "I Want Candy": "spotify:track:77xK9g76GEdK5HC4r9AhFu",
  "Need You Tonight": "spotify:track:5eU8qMd0TpaLqTGDZJaLDs",
  "Rapture": "spotify:track:0D6qZlc6vNR7PDW2RKGPsV",
  "Real Wild Child": "spotify:track:6ZAwEE4kTdtvyE66iRhFxR",
  "Searching (INXS)": "spotify:track:2O7U0XEK5i1PVtw31530Oa",
  "Video Killed the Radio Star": "spotify:track:2wsBzDQpkFmrFnkneiKo9u",
  "White Lines (Duran Duran)": "spotify:track:0IuJngZDzgHXciiGyvILlH",
  "White Man in Hammersmith Palais": "spotify:track:5bIfqDrgR8qgWXvormRHVe",
  "You Oughta Know": "spotify:track:0Dw9z44gXhplDh5HCWZIxP",
  "Divine Thing (probably)": "spotify:track:4VJYmTsXG9hAfWFBEJruRK",
  "The Wedding Album": "spotify:album:0PqCkTvKFJxzr9uujq7a3T",
  "Blah-Blah-Blah": "spotify:album:4j1zp01LTkV9kNWAuKU45c",
  "Kick": "spotify:album:7cuwWzS0oiApEt2fpKafkX",
  "Searching for the Young Soul Rebels": "spotify:album:5iawHcgRuKL5HMRbigdvWC",
  "Bongwater": "spotify:artist:6JooToEGjbAab8XNmXqkF8",
  "Pulsallama": "spotify:track:3ZtcVSZiaHA1NiZQYYmfTE",
  "Devo": "spotify:track:1HQeXwrVQ01Ugq5YhgYV0c",
  "Television": "spotify:track:7Me0vOSlJfaPY7Pc4GeItd",
  "The Damned": "spotify:track:4d8oVJ2hcvRRf8sUDhNyJg",
  "Shpongle": "spotify:album:7fAOqI4aJxx5oTeCMLPONf",
  "The Fuzztones": "spotify:album:1S6JeyisuGACAeehnV1vHQ",
  "Hairspray": "spotify:album:3XPjEfpawBvohxBMDXwXXW",
  "The Music Man": "spotify:album:7asTNsTacprhKJ4KeXtXUj",
  "Run-DMC": "spotify:artist:3CQIn7N5CuRDP8wEI7FiDA",
  "Public Enemy": "spotify:artist:6Mo9PoU6svvhgEum7wh2Nd",
  "Beastie Boys": "spotify:artist:03r4iKL2g2442PT9n2UKsx",
  "My Hair Looks Fierce": "spotify:track:08yzdQW3TpyAwTToQjkYJW",
  "Champagne (Amanda Lepore)": "spotify:track:1KArrl4IXmxGxIvcWLhws4",
};

/** Lisa's public Spotify playlist with every playable Jukebox entry (artists and albums as their best-known song), most mentioned first. */
export const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/4RGIXkJLnDLZvSIagpUU3p";

export const MUSIC_SHELVES: Shelf[] = [
  { key: "songs", label: "Songs, records & videos" },
  { key: "artists", label: "Artists & bands" },
  { key: "sounds", label: "Sounds & scenes" },
  { key: "stage", label: "Stage & musicals" },
];

const SOUNDS = /^(hip-hop|disco|jazz|house music|punk|new romantic|samba|the charleston|theremin|new wave|reggae|grunge|square dance|world music|merengue|rockabilly|john peel sessions)$/i;
const STAGE = /^(flora the red menace|victor\/victoria.*|positive me|cats: the jellicle ball|hairspray|the music man)$/i;
const SONG = /['‘’"“”]|–|^(fade to grey|the lady in red|too funky|warm leatherette|bedtime stories|presence.*|elements of vogue|deep in vogue|vogue \(madonna song\)|silent night \(stevie nicks\)|fans \(malcolm mclaren\)|duck rock|buffalo gals|the wedding album|ordinary world|sugar kane|your cassette pet|back in time for tea|see jungle!.*|blah-blah-blah|divine thing.*|i want candy|kick|need you tonight|rapture|real wild child|searching \(inxs\)|searching for the young soul rebels|video killed the radio star|white lines \(duran duran\)|white man in hammersmith palais|you oughta know|ghost cat)$/i;

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
