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

/** The guests' own words about a night, from the episode transcripts (Lisa, 27 Nov 2026: "make it all three quotes with
 *  polaroids as in other pages"). Times are where the words start; transcript slips fixed (Joey Llanos, David DePino). */
export type NightQuote = { episode: string; who: string; time: string; quote: string };

export const NIGHT_QUOTES: Record<string, NightQuote[]> = {
  "paradise-garage-closing-weekend": [
    {
      episode: "s01e08",
      who: 'Luis "Xtravaganza" Camacho',
      time: "00:55:56",
      quote:
        "I went to Paradise Garage once, at the end. There was that big weekend when they were closing, and there was a big sit-in outside afterwards. I only went once, but thank goodness - I had to go before it closed. I had to. So I lied to my mom that I was going somewhere else.",
    },
    {
      episode: "s06e02",
      who: "Christina Visca",
      time: "00:18:46",
      quote:
        "After the Garage and the Saint closed... people were lighting candles the last night of the Garage and crying, and same with the Saint, and I'm like, this can't be it. I was shocked that in the next coming weeks nobody had a plan.",
    },
    {
      episode: "s06e02",
      who: "Christina Visca",
      time: "00:19:05",
      quote:
        "Well, I sort of thought ahead. The last night of the Garage, I had a party ready to go. Joey Llanos and David DePino, who played at the Garage, were my DJs for the first week or two.",
    },
  ],
};
