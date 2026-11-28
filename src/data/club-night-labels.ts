import type { Kind } from "./club-nights";

// The small helpers a club card needs, apart from the club nights themselves, so an A–Z club card doesn't load every
// club's songs (page weight, 16 Nov 2026). club-nights.ts re-exports both.
export const playlistUrl = (id: string) => `https://open.spotify.com/playlist/${id}`;
export const KIND_LABEL: Record<Kind, string> = {
  played: "Played there",
  live: "Performed there live",
  "dj-artist": "An artist the DJs played",
  about: "Tied to the club",
  stage: "A band of its stage",
};

// Other spellings of a club night's slug used in links outside the site (playlist descriptions): Régine's card is
// "re-gine-s", but its Spotify and YouTube descriptions say /spotify/regines and /jukebox?club=regines (28 Nov 2026).
export const CLUB_NIGHT_ALIASES: Record<string, string> = { regines: "re-gine-s" };
