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
