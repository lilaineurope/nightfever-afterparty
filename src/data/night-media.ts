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
  // Monster Movie Club, Club 57's Tuesday film nights (Lisa, 28 Nov 2026: "do we have more quotes?"). Transcript slips
  // fixed: Jayne Mansfield, "May of '79", Ann Magnuson.
  "monster-movie-club": [
    {
      episode: "s01e10",
      who: "Joey Arias",
      time: "00:28:26",
      quote:
        "It opened up as a monster movie club, because we were all the neighborhood, so it was just the gang. It was a little shitty Polish hall underneath the church. They would show films and we'd all be in there screaming and laughing, with the big reel and popcorn. And then eventually, after about a month or so, instead of doing it every Tuesday, Ann started booking events like Prom Night or Girls on Fire or Mud Wrestling or the Art Show.",
    },
    {
      episode: "s04e10",
      who: "Ann Magnuson",
      time: "00:35:59",
      quote:
        "Tom started to program films, starting with a juvenile delinquent series, and then that moved into Jayne Mansfield movies and Russ Meyer, and also the Monster Movie Club, which was every Tuesday. That didn't happen until May of '79.",
    },
    {
      episode: "s04e10",
      who: "Ann Magnuson",
      time: "00:37:29",
      quote:
        "It was all done on five cents, basically. And I just liked that. I like things that are not money driven and that require ingenuity. So Club 57 was a perfect place for that.",
    },
    {
      episode: "s05e08",
      who: "April Palmieri",
      time: "00:09:22",
      quote:
        "I went to Club 57 because they had the Monster Movie Club. That was the first incarnation of their public reaching out to the local kids. So I went to the Monster Movie Club, and John Sex was there with Wendy.",
    },
    {
      episode: "s05e08",
      who: "April Palmieri",
      time: "00:10:20",
      quote:
        "When I met him at Monster Movie Club, I had my camera, and I said I gotta take your picture - and then Wendy threw herself into the frame.",
    },
  ],
};
