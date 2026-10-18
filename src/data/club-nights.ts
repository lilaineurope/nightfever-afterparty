// "A night at <club> sounded like this": public Spotify playlists in Lisa's account, built only from songs
// documented as played at that club (DJ lists, recorded sets, official compilations) - each with its sources.
// Keyed by the club's A–Z card slug. Add a club only when a real source exists.

export type ClubNight = {
  slug: string; // entity slug of the club card
  club: string;
  playlistId: string; // Spotify playlist id in Lisa's account
  songs: number;
  note: string; // where the songs come from - shown on the card
  sources: { label: string; href: string }[];
};

export const CLUB_NIGHTS: ClubNight[] = [];

export const clubNightFor = (slug: string) => CLUB_NIGHTS.find((c) => c.slug === slug);
export const playlistUrl = (id: string) => `https://open.spotify.com/playlist/${id}`;
