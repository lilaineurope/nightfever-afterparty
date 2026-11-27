// What a night's own page plays (Lisa, 27 Nov 2026: every club night, theme night and party gets its own page). Songs are
// titles from the club's night in src/data/club-nights.ts, films are video ids from its footage - hand-checked against
// each song's "why" and each film's title, so a page only shows what really belongs to that night. Keyed by the night's
// page slug (the slug of its first row in src/data/club-parts.ts). Strings only.

export type NightMedia = { songs?: string[]; films?: string[] };

export const NIGHT_MEDIA: Record<string, NightMedia> = {
  // Larry Levan's closing-party sets, 26-27 Sep 1987 (song recognition on the tapes) and the tapes themselves.
  "paradise-garage-closing-weekend": {
    songs: [
      "Move Your Body",
      "Nude Photo",
      "Dreamin'",
      "You Don't Know",
      "Let's Make a Baby",
      "Goin' Down",
    ],
    films: ["cdVyhpW5bdE", "B3cGe4GwZR8", "qgQ0FAaBT-U"],
  },
  "studio-54-opening-night": { songs: ["Devil's Gun"] },
  "grace-jones-s-halloween-concert-at-the-sound-factory": { songs: ["Love on Top of Love"] },
  "area-s-suburbia-theme": { songs: ["Born in the U.S.A."] },
  "x-at-the-mudd-club": { songs: ["Los Angeles"] },
  "talking-heads-at-the-mudd-club": { films: ["mGYmnd3Vjj4"] },
  "danceteria-shoot-for-desperately-seeking-susan": {
    songs: ["Into the Groove"],
    films: ["xyiG9P_Vc7A"],
  },
  "tunnel-sunday-hip-hop-night": { films: ["uyIAG0TR4Vk"] },
  "club-57-exhibition-at-moma": { films: ["31rGzgN1Kfg", "OY3h0Jm8T88"] },
};
