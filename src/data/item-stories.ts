// "The story" on Library item pages (Lisa, 23 Nov 2026, Creative Vandal as the test: "create a page for each item ... do
// research on anything [the guest] said on his interview about it, then check all his interviews and comments on youtube
// and then online"). What the item is, who made it and who is in it, what is inside it, what happened to it since, and
// what the press on our Library shelves said about it. Keyed by A–Z card slug; shown by Story in
// src/components/library-item.tsx.
//
// Facts come from the work itself (its credits, its own description) or a named source - no guesses. A name or work with
// an A–Z card links to it. Never YouTube or social media comments (Lisa, 23 Nov 2026).

import AUTO from "./item-stories-auto.json";

export type StoryFact = { label: string; value: string };
/** A part of a film, with its time code in the film. `card` is the A–Z name of a work or person it is about. */
export type StoryChapter = { at: string; title: string; card?: string };
/** Only from our AFTERPARTY references (the episode indexes) and the publications on our Library shelves (Lisa, 23 Nov
 *  2026). `episode` + `time` play the moment on the show. */
export type StoryNote = { when: string; what: string; source: string; episode?: string; time?: string };

export type ItemStory = {
  /** One or two sentences: what it is. */
  intro: string;
  /** The film itself on YouTube, played from its chapters (loaded only when a chapter is pressed). */
  film?: { id: string; title: string; channel: string; note?: string };
  facts: StoryFact[];
  /** People in it, as the credits name them; `note` is who they are. */
  inIt: { name: string; note?: string }[];
  /** Heading over `inIt` when "In it" is wrong (a band: "In the band"). */
  inItLabel?: string;
  chapters?: StoryChapter[];
  /** Since it came out: what our AFTERPARTY references and our Library publications say happened to it. */
  since: StoryNote[];
  /** What the press said: reviews from publications on our Library shelves only (Lisa, 23 Nov 2026: no YouTube comments -
   *  "to avoid bad comments"; "can we add reviews from publications we have listed in library?"). `publication` is the
   *  Library name, so the review wears its masthead and links to its page. */
  reviews?: { publication: string; date: string; quote: string; by?: string }[];
  sources: string[];
};

// Every other work a guest made gets an automatic story (Lisa, 23 Nov 2026: "apply it to all 'made by' items of all
// afterparty guests ... and to all future episodes"): scripts/item-stories-auto.py writes item-stories-auto.json from the
// work's Wikipedia page and Wikidata credits. A story written here by hand always wins.
const HAND: Record<string, ItemStory> = {
  "creative-vandal": {
    intro:
      "An hour-long documentary about Nick Egan: from a working-class art-school punk making T-shirts for the Ramones to the sleeves for The Clash, Bow Wow Wow, INXS and Duran Duran, and the music videos that followed.",
    film: { id: "ysToqInTSQ8", title: "Creative Vandal - full documentary", channel: "DOGMA85" },
    // No reviews yet in the publications on our Library shelves (searched 23 Nov 2026).
    reviews: [],
    facts: [
      { label: "Out", value: "14 September 2024, free on YouTube" },
      { label: "Length", value: "1 hour 1 minute" },
      { label: "Directed and edited by", value: "Peter Pahor" },
      { label: "Made by", value: "DOGMA85, a London channel of films about artists" },
      { label: "Cinematography", value: "Ava Egan and Angel Andres Martinez" },
      { label: "Music", value: "Chris Campanaro" },
    ],
    inIt: [
      { name: "Nick Egan" },
      { name: "Siobhan Fahey", note: "Bananarama" },
      { name: "Leigh Gorman", note: "Bow Wow Wow" },
      { name: "Michael Holman", note: "filmmaker, there when hip-hop was born" },
      { name: "Sean Dickson", note: "The Soup Dragons" },
      { name: "John Taylor", note: "Duran Duran" },
      { name: "Allison Iraheta", note: "American Idol" },
      { name: "Nate Merchant" },
      { name: "Frank Carlos" },
      { name: "Ann Haugen" },
    ],
    chapters: [
      { at: "00:22", title: "Intro" },
      { at: "02:37", title: "Siobhan Fahey" },
      { at: "03:49", title: "I did not know you could have a career in art" },
      { at: "05:37", title: "The Sex Pistols at the 100 Club", card: "Sex Pistols" },
      { at: "06:00", title: "First cover: The Clash, (White Man) In Hammersmith Palais", card: "White Man in Hammersmith Palais" },
      { at: "08:33", title: "The attitude I grew up with" },
      { at: "08:45", title: "Dexys Midnight Runners, Searching for the Young Soul Rebels", card: "Searching for the Young Soul Rebels" },
      { at: "09:30", title: "Bow Wow Wow, See Jungle! See Jungle!", card: "See Jungle! See Jungle! Go Join Your Gang Yeah, City All Over! Go Ape Crazy!" },
      { at: "10:37", title: "Leigh Gorman" },
      { at: "12:04", title: "At the National Portrait Gallery" },
      { at: "12:47", title: "New York was the greatest city in the world" },
      { at: "13:14", title: "Michael Holman and the birth of hip-hop in New York", card: "Michael Holman" },
      { at: "14:10", title: "Malcolm McLaren and the Duck Rock cover", card: "Duck Rock" },
      { at: "19:16", title: "INXS, the Kick album cover", card: "Kick" },
      { at: "24:08", title: "Becoming a music video director" },
      { at: "24:40", title: "Iggy Pop, Real Wild Child", card: "Real Wild Child" },
      { at: "25:34", title: "Sean Dickson of The Soup Dragons, Divine Thing", card: "Divine Thing (probably)" },
      { at: "28:29", title: "Kylie Minogue, Step Back in Time", card: "Kylie Minogue" },
      { at: "31:10", title: "Sonic Youth, Youth Against Fascism", card: "Sonic Youth" },
      { at: "32:20", title: "John Taylor", card: "John Taylor" },
      { at: "33:27", title: "Duran Duran and the Wedding Album cover", card: "The Wedding Album" },
      { at: "36:07", title: "Duran Duran, Ordinary World", card: "Ordinary World" },
      { at: "37:35", title: "The Ordinary World location: the Huntington gardens" },
      { at: "42:32", title: "Allison Iraheta from American Idol" },
      { at: "43:53", title: "Nate Merchant" },
      { at: "44:24", title: "Control spontaneity" },
      { at: "45:21", title: "Alanis Morissette, You Oughta Know", card: "You Oughta Know" },
      { at: "47:17", title: "Duran Duran, Pressure Off" },
      { at: "50:14", title: "Painting" },
      { at: "52:11", title: "I like imperfection" },
      { at: "56:00", title: "In the office" },
      { at: "57:31", title: "Ann Haugen" },
      { at: "58:05", title: "Being creative is a psychological hell" },
      { at: "59:21", title: "Outro" },
    ],
    since: [
      { when: "On the show", what: "James introduces Nick with it: just out, free to watch on YouTube.", source: "S05E04", episode: "s05e04", time: "00:00:49" },
      { when: "On the show", what: "James says it won best feature music film or documentary at the California Music Video Awards.", source: "S05E04", episode: "s05e04", time: "00:01:09" },
    ],
    sources: ["The film's own credits and chapters", "S05E04 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  // S05E02 Jodie Harsh (24 Nov 2026): her memoir. (Her single My House has no card - not said on the show - so only its sleeve.)
  "you-had-to-be-there": {
    intro:
      "Jodie Harsh's memoir of a decade in 2000s London nightlife, one club to a chapter, from sneaking into G-A-Y at 15 to running her own nights.",
    reviews: [],
    facts: [
      { label: "Out", value: "25 September 2025" },
      { label: "Written by", value: "Jodie Harsh" },
      { label: "Published by", value: "Faber & Faber" },
      { label: "On the cover", value: "An odyssey through noughties London... one night at a time" },
      { label: "ISBN", value: "9780571392414" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "Jodie gives the date it comes out: 25 September.", source: "S05E02", episode: "s05e02", time: "00:02:24" },
      { when: "On the show", what: "Each chapter is a club she was going to, roughly a year each.", source: "S05E02", episode: "s05e02", time: "00:22:06" },
      { when: "On the show", what: "A literary agent wrote to her out of the blue; Jodie wrote a first chapter herself.", source: "S05E02", episode: "s05e02", time: "00:51:32" },
      { when: "On the show", what: "The proposal went to an eight-way auction between publishers.", source: "S05E02", episode: "s05e02", time: "00:53:04" },
    ],
    sources: ["The book's own cover and listing", "S05E02 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
};

/** One clip for a story that has no film of its own, shown as "Watch the clip" (Lisa, 24 Nov 2026: Blondie with Tish & Snooky -
 *  "use 1", the Hall of Fame thank-you; it is also in the S05E10 AFTERPARTY playlist). */
const CLIPS: Record<string, NonNullable<ItemStory["film"]>> = {
  blondie: { id: "6rkbvphNFtw", title: "Debbie Harry thanks Tish & Snooky at Blondie's induction into the Rock and Roll Hall of Fame, 2006", channel: "Manic Panic",
    note: "At Blondie's induction in 2006, Debbie Harry thanks Tish & Snooky, the backing singers in Blondie's first line-up." },
};

const MERGED: Record<string, ItemStory> = { ...(AUTO as Record<string, ItemStory>), ...HAND };
for (const [slug, film] of Object.entries(CLIPS)) if (MERGED[slug] && !MERGED[slug]!.film) MERGED[slug] = { ...MERGED[slug]!, film };
export const ITEM_STORIES: Record<string, ItemStory> = MERGED;
