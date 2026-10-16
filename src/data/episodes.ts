import mustoRefs from "./s01e02.json";
import fieldRefs from "./s03e01.json";
import bartschRefs from "./s02e03.json";
import edelsteinRefs from "./s01e03.json";
import richieRefs from "./s04e08.json";
import makosRefs from "./s05e06.json";

export type Episode = {
  /** Route file id, also used for the URL-friendly path */
  id: string;
  season: number;
  episode: number;
  /** Guest of the episode */
  guest: string;
  /** Release date (ISO) as listed on Spotify / WOW Presents Plus */
  released: string;
  /** WOW Presents Plus page where the episode can be watched */
  watchUrl: string;
  /** Spotify address where the episode can be heard */
  listenUrl: string;
  /** Approximate runtime as listed on Spotify */
  runtime: string;
  /** Date this afterparty connection was published on this site (ISO) */
  afterpartyPublished: string;
  /** Short summary written from the public episode description */
  blurb: string;
  /** How many names, places and works are tagged on the episode page */
  references: number;
  /** Total mentions across all tagged references */
  mentions: number;
  /** The most-mentioned names in the episode */
  top: { name: string; mentions: number }[];
};

const s06e01: Episode = {
    id: "s06e01",
    season: 6,
    episode: 1,
    guest: "James St. James",
    released: "2026-08-21",
    watchUrl: "https://www.wowpresentsplus.com/night-fever/season:6/videos/nf-601",
    listenUrl: "https://open.spotify.com/episode/2WEQu8LV4uIufb9Wb6Fye4",
    runtime: "54 min",
    afterpartyPublished: "2026-10-10",
    blurb:
      "The host finally takes the guest chair! James on growing up, moving to New York and the club years he has been documenting ever since - with Warhol and Michael Alig never far away.",
    references: 119,
    mentions: 336,
    top: [
      { name: "James St. James", mentions: 25 },
      { name: "Andy Warhol", mentions: 24 },
      { name: "Michael Alig", mentions: 21 },
    ],
};

const s01e01: Episode = {
    id: "s01e01",
    season: 1,
    episode: 1,
    guest: "Dianne Brill",
    released: "2021-08-30",
    watchUrl:
      "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-dianne-brill",
    listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
    runtime: "51 min",
    afterpartyPublished: "2026-10-11",
    blurb:
      "Where it all started - the very first episode! Dianne Brill, the Queen of the Night, on Warhol, Mugler, Danceteria and inventing her very own silhouette. Pure glamour.",
    references: 112,
    mentions: 293,
    top: [
      { name: "Dianne Brill", mentions: 31 },
      { name: "Andy Warhol", mentions: 18 },
      { name: "Rudolf Piper", mentions: 13 },
    ],
};

const s01e02: Episode = {
  id: "s01e02",
  season: 1,
  episode: 2,
  guest: "Michael Musto",
  released: "2021-09-06",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-michael-musto",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  runtime: "1:04:35",
  afterpartyPublished: "2026-10-11",
  blurb:
    "The oldest club kid in the world! Village Voice legend Michael Musto on Studio 54, outlaw parties, ACT UP, the Club Kids - and the vodka cranberry waiting for him at the Limelight.",
  references: mustoRefs.length,
  mentions: mustoRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...mustoRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s01e03: Episode = {
  id: "s01e03",
  season: 1,
  episode: 3,
  guest: "Lisa Edelstein",
  released: "2021-09-13",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-lisa-edelstein",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  runtime: "1:08:34",
  afterpartyPublished: "2026-10-15",
  blurb:
    "Lisa E., the it girl! James's NYU partner-in-crime on their plan to conquer the clubs, lunchboxes and drooping hats, Warhol's memorial - and the New York Times story that changed her life.",
  references: edelsteinRefs.length,
  mentions: edelsteinRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...edelsteinRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s02e03: Episode = {
  id: "s02e03",
  season: 2,
  episode: 3,
  guest: "Susanne Bartsch",
  released: "2022-08-22",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:2/videos/nf-203",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  runtime: "1:01:34",
  afterpartyPublished: "2026-10-14",
  blurb:
    "The Empress of the Night! Susanne Bartsch on running away to London, the Blitz, her SoHo stores, Savage, Bentley's and the Copa - and throwing the Love Balls that raised millions for AIDS.",
  references: bartschRefs.length,
  mentions: bartschRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...bartschRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s03e01: Episode = {
  id: "s03e01",
  season: 3,
  episode: 1,
  guest: "Patricia Field",
  released: "2023-06-15",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:3/videos/nf-301",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  runtime: "52 min",
  afterpartyPublished: "2026-10-13",
  blurb:
    "The fashion legend herself! Patricia Field on her 8th Street store, the House of Field balls, dressing Carrie Bradshaw and Miranda Priestly - and why the world needs way more personal style.",
  references: fieldRefs.length,
  mentions: fieldRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...fieldRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s04e08: Episode = {
  id: "s04e08",
  season: 4,
  episode: 8,
  guest: "Richie Rich",
  released: "2024-08-21",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:4/videos/nf-408",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  runtime: "1:03:03",
  afterpartyPublished: "2026-10-16",
  blurb:
    "Boom! Richie Rich skates from the Ice Capades to the Style Summit, Hotel 17 and Susanne Bartsch's side - then Heatherette, with Miss Piggy front row and Paris in a studded bodysuit.",
  references: richieRefs.length,
  mentions: richieRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...richieRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s05e06: Episode = {
  id: "s05e06",
  season: 5,
  episode: 6,
  guest: "Christopher Makos",
  released: "2025-07-23",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:5/videos/nf-506",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  runtime: "47:17",
  afterpartyPublished: "2026-10-17",
  blurb:
    "Christopher Makos, Warhol's perfect companion! From a Catholic boy in El Monte to Tennessee Williams's typewriter, Tony Perkins on the Riviera, a weekend with Man Ray and Andy in drag.",
  references: makosRefs.length,
  mentions: makosRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...makosRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

/** Season and episode order, earliest first. */
export const episodes: Episode[] = [s01e01, s01e02, s01e03, s02e03, s03e01, s04e08, s05e06, s06e01].sort((a, b) =>
  a.season - b.season || a.episode - b.episode,
);

export const latestEpisode: Episode = s06e01;

/** Look an episode up by its route id, for the episode pages themselves. */
export const episodeById = (id: string): Episode =>
  episodes.find((e) => e.id === id) ?? latestEpisode;

export function episodePath(
  id: Episode["id"],
): "/episodes/s06e01" | "/episodes/s01e01" | "/episodes/s01e02" | "/episodes/s01e03" | "/episodes/s02e03" | "/episodes/s03e01" | "/episodes/s04e08" | "/episodes/s05e06" {
  switch (id) {
    case "s01e01":
      return "/episodes/s01e01";
    case "s01e02":
      return "/episodes/s01e02";
    case "s01e03":
      return "/episodes/s01e03";
    case "s02e03":
      return "/episodes/s02e03";
    case "s03e01":
      return "/episodes/s03e01";
    case "s04e08":
      return "/episodes/s04e08";
    case "s05e06":
      return "/episodes/s05e06";
    default:
      return "/episodes/s06e01";
  }
}
