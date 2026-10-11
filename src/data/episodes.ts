export type Episode = {
  /** Route file id, also used for the URL-friendly path */
  id: string;
  season: number;
  episode: number;
  /** Guest of the episode */
  guest: string;
  /** Release date (ISO) as listed on Spotify / WOW Presents Plus */
  released: string;
  /** Link to the episode audio */
  audioUrl: string;
  /** Approximate runtime as listed on Spotify */
  runtime: string;
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
    audioUrl: "https://open.spotify.com/episode/2WEQu8LV4uIufb9Wb6Fye4",
    runtime: "54 min",
    blurb:
      "The host finally takes the guest chair himself: his childhood, the move to New York, and the club years he has spent documenting ever since.",
    references: 109,
    mentions: 319,
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
    audioUrl:
      "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-dianne-brill",
    runtime: "51 min",
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

/** Newest first, by release date */
export const episodes: Episode[] = [s06e01, s01e01].sort((a, b) =>
  b.released.localeCompare(a.released),
);

export const latestEpisode: Episode = s06e01;

const EPISODE_PATHS: Record<
  Episode["id"],
  "/episodes/s06e01" | "/episodes/s01e01"
> = {
  s06e01: "/episodes/s06e01",
  s01e01: "/episodes/s01e01",
};

export function episodePath(id: Episode["id"]) {
  return EPISODE_PATHS[id];
}
