// Spotify and YouTube search links for a song or artist without a known Spotify id (ids are never guessed).
// Its own file so the A–Z card's player doesn't load the whole Jukebox (page weight, 16 Nov 2026).
export const listenLinks = (name: string) => {
  const q = encodeURIComponent(name.replace(/[‘’'"“”]/g, "").replace(/\s+–\s+/g, " "));
  return {
    spotify: `https://open.spotify.com/search/${q}`,
    youtube: `https://www.youtube.com/results?search_query=${q}`,
  };
};
