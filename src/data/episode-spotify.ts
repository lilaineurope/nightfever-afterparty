// One Spotify playlist per Afterparty (Lisa, 28 Oct 2026): the songs and bands that come up in that episode,
// on Lisa's Spotify, each description linking back to the episode page. Episodes with fewer than two playable
// songs (S01E03, S03E01, S05E06, S06E08) have none.
export const EPISODE_SPOTIFY: Record<string, string> = {
  s01e01: "531BcdgYQh6BsNIxSdzzv9",
  s01e02: "0P4Rop2yTJCmwzAAx7xsBY",
  s01e04: "3elztHOV56J4hiY1CMZqrS",
  s01e06: "77CLmzA0JTeY77yoaJgRyt",
  s01e07: "47fJcoG2x2h0fXevI6FivS",
  s01e10: "3gZ2KpYkPoas8avCxgbzvW",
  s02e01: "2DLohtnpycsRNF5kSFiQze",
  s02e03: "40N54WxlSt0cRPIAHojuh4",
  s02e04: "5VIHlzYzEcl88zpafMalks",
  s02e06: "4QCYA09ofHX8Xxi0TIyjZO",
  s02e07: "3hPV2D3Di6plssfl6pqKzO",
  s02e08: "2mBImW88RId8Pa1gsQA6M3",
  s03e06: "2JRQhCoEc4igZULztw0XKp",
  s03e08: "1X8BiB95TgVE8jIFxqfvyW",
  s04e04: "6qndnoA1cPCIWYSNdyouRL",
  s04e08: "3VOps7acLMP5A9hrAGKk48",
  s04e10: "2mcWJdSJGZPkJ8sF3FwRR3",
  s05e03: "5ZH59yVG385yYL7vTS7WVJ",
  s05e04: "6HgaLt1T8ifjdLolcZQBqt",
  s06e01: "4LyGFoufrmdv1wsM1i5ZlB",
  s06e03: "5JvyA8VuUUzB9eNC63UjQF",
  s06e07: "1bPn17yGHZmQoP4W6PaRUd",
};
export const episodeSpotifyUrl = (id: string) => (EPISODE_SPOTIFY[id] ? `https://open.spotify.com/playlist/${EPISODE_SPOTIFY[id]}` : undefined);

/** The big YouTube playlist with every Jukebox video, most dropped first. */
export const JUKEBOX_YOUTUBE_URL = "https://www.youtube.com/playlist?list=PLBsKZe3J9J3s";
