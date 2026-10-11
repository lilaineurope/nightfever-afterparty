import mustoRefs from "./s01e02.json";

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
      "The host finally takes the guest chair himself: his childhood, the move to New York, and the club years he has spent documenting ever since.",
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
      "The very first episode: the 'Queen of the Night' on Warhol, Mugler, Danceteria and inventing her own silhouette.",
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
  blurb: "Village Voice nightlife columnist and author of 'La Dolce Musto' on the downtown scene, Warhol, outlaw parties and the Club Kids.",
  references: mustoRefs.length,
  mentions: mustoRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...mustoRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

/** Season and episode order, earliest first. */
export const episodes: Episode[] = [s01e01, s01e02, s06e01].sort((a, b) =>
  a.season - b.season || a.episode - b.episode,
);

export const latestEpisode: Episode = s06e01;

/** Look an episode up by its route id, for the episode pages themselves. */
export const episodeById = (id: string): Episode =>
  episodes.find((e) => e.id === id) ?? latestEpisode;

export function episodePath(
  id: Episode["id"],
): "/episodes/s06e01" | "/episodes/s01e01" | "/episodes/s01e02" {
  switch (id) {
    case "s01e01":
      return "/episodes/s01e01";
    case "s01e02":
      return "/episodes/s01e02";
    default:
      return "/episodes/s06e01";
  }
}
