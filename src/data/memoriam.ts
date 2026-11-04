// In memoriam pages (Lisa, 4 Nov 2026, "option C"): people the guests talk about who have died get a fuller A–Z page -
// dates, a short story, and a wall of what the guests said about them, each quote with its play-from timestamp.
// Quotes are cleaned-up lines from the episode transcripts; show Lisa new quotes before they go live.
// Facts: obituaries (Los Angeles Blade 31 Jan 2019, amNY Feb 2019, Howl! Arts 30 Jan 2019).

export type MemoriamQuote = {
  episode: string; // episode id, e.g. "s04e10"
  who: string; // who says it
  time: string; // hh:mm:ss in the episode
  quote: string;
};

export type Memoriam = {
  born: string;
  died: string;
  diedLine: string; // "Died 30 January 2019 in New York, aged 62"
  aka?: string;
  story: string;
  timeline: [string, string][];
  liftedUp: string[]; // people they gave a start
  rooms: string[]; // clubs, nights, places
  said: MemoriamQuote[];
  memorial?: { label: string; href: string };
  // "Read more" on the name card instead of the Google search, when there is no Wikipedia article (Lisa, 4 Nov 2026).
  readMore?: { label: string; href: string };
  wikidata?: string; // for the page markup (sameAs)
};

export const MEMORIAM: Record<string, Memoriam> = {
  "brian-butterick": {
    born: "1956",
    died: "2019",
    diedLine: "Died 30 January 2019 in New York, aged 62",
    aka: "Hattie Hathaway",
    story:
      "Ran the Pyramid Club on Avenue A, and as Hattie Hathaway was one of the Pyramid girls who turned drag into their own characters. Later the fourth Jackie 60 producer.",
    timeline: [
      ["1981", "Starts on the door at the Pyramid, then runs it with Bobby Bradley until 1986"],
      ["1980s", "Becomes Hattie Hathaway and gives early stages to Lypsinka and Ethyl Eichelberger"],
      ["1980s", "Sings in the band 3 Teens Kill 4"],
      ["1984", "Part of the small Pyramid crowd that dreams up Wigstock with Lady Bunny"],
      ["1990s", "Fourth producer of Jackie 60, after Richard Move"],
      ["2003", "Co-runs the Howl! Festival in Tompkins Square Park, until 2013"],
      ["2019", "Dies of lung cancer, aged 62"],
    ],
    liftedUp: ["Lypsinka", "Ethyl Eichelberger", "Lady Bunny", "Sister Dimension"],
    rooms: ["Pyramid Club", "Jackie 60", "Wigstock", "Howl! Happening"],
    said: [
      { episode: "s04e10", who: "Ann Magnuson", time: "00:47:39", quote: "Bobby Bradley and Brian Butterick put it together, and Kestutis Nakas helped a lot." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:17:47", quote: "I was friends with Bobby Bradley and with Brian Butterick. They were the managers and they ran the Pyramid." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:43:10", quote: "It wasn't until the Pyramid, these girls at the Pyramid became, you know, Hattie Hathaway…" },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:50:15", quote: "Later, Richard left and was replaced by Hattie Hathaway as the fourth Jackie producer." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:36:55", quote: "Brian Butterick did a whole Pyramid exhibit, and Sister performed. And it was as weird as hell." },
      { episode: "s02e03", who: "Fenton Bailey", time: "00:27:27", quote: "Bobby Bradley and Brian." },
    ],
    memorial: { label: "brianbutterick.org", href: "https://brianbutterick.org/" },
    // No Wikipedia article for him (checked 4 Nov 2026), so the name card links his memorial site.
    readMore: { label: "on his memorial site", href: "https://brianbutterick.org/" },
    wikidata: "https://www.wikidata.org/wiki/Q81233089",
  },
};
