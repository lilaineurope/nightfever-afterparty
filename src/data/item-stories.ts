// "The story" on Library item pages (Lisa, 23 Nov 2026, Creative Vandal as the test: "create a page for each item ... do
// research on anything [the guest] said on his interview about it, then check all his interviews and comments on youtube
// and then online"). What the item is, who made it and who is in it, what is inside it, what happened to it since, and
// what people said about it outside the show. Keyed by A–Z card slug; shown by src/components/item-story.tsx.
//
// Facts come from the work itself (its credits, its own description) or a named source - no guesses. A name or work with
// an A–Z card links to it. Viewers' comments are quoted without their handles.

export type StoryFact = { label: string; value: string };
/** A part of a film, with its time code in the film. `card` is the A–Z name of a work or person it is about. */
export type StoryChapter = { at: string; title: string; card?: string };
export type StoryNote = { when: string; what: string; source: string };

export type ItemStory = {
  /** One or two sentences: what it is. */
  intro: string;
  /** The film itself on YouTube, played from its chapters (loaded only when a chapter is pressed). */
  film?: { id: string; title: string; channel: string };
  facts: StoryFact[];
  /** People in it, as the credits name them; `note` is who they are. */
  inIt: { name: string; note?: string }[];
  chapters?: StoryChapter[];
  /** Since it came out: awards, screenings, interviews about it. */
  since: StoryNote[];
  /** What viewers said about it (no handles), with where and when. */
  viewers?: { quote: string; where: string }[];
  sources: string[];
};

export const ITEM_STORIES: Record<string, ItemStory> = {
  "creative-vandal": {
    intro:
      "An hour-long documentary about Nick Egan: from a working-class art-school punk making T-shirts for the Ramones to the sleeves for The Clash, Bow Wow Wow, INXS and Duran Duran, and the music videos that followed.",
    film: { id: "ysToqInTSQ8", title: "Creative Vandal - full documentary", channel: "DOGMA85" },
    facts: [
      { label: "Out", value: "14 September 2024, free on YouTube" },
      { label: "Length", value: "1 hour 1 minute" },
      { label: "Directed and edited by", value: "Peter Pahor" },
      { label: "Made by", value: "DOGMA85, a London channel of films about artists" },
      { label: "Cinematography", value: "Ava Egan and Angel Andres Martinez" },
      { label: "Music", value: "Chris Campanaro" },
      { label: "Award", value: "Winner, LA Fashion Film Festival 2024 (documentary)" },
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
      { when: "14 Sep 2024", what: "Out in full and free on DOGMA85's YouTube channel, with short clips from it (Duck Rock in New York, the Ramones T-shirts) posted as Shorts.", source: "YouTube" },
      { when: "2024", what: "Winner at the LA Fashion Film Festival, in the documentary entries.", source: "LA Fashion Film Festival archive" },
      { when: "8 Nov 2024", what: "The director, Peter Pahor, tells how the film was made on INXS: Access All Areas, the fan podcast Nick mentors (episode 201).", source: "INXS: Access All Areas" },
      { when: "On the show", what: "James introduces Nick with it and says it won a California Music Video Award for best feature music film or documentary - we haven't found that award online yet.", source: "S05E04, 00:00:49" },
    ],
    viewers: [
      { quote: "We all knew your work but didn't get to know you until now.", where: "YouTube comment, 2024" },
      { quote: "It's fascinating to see how you were there by chance at the apex of two cultural movements of young, urban youth either side of the Atlantic.", where: "YouTube comment, 2024" },
      { quote: "I've got a Bears single - I never thought I'd see them referenced in a documentary.", where: "YouTube comment, 2024" },
    ],
    sources: ["The film's own credits and chapters on YouTube", "IMDb (tt33380973)", "LA Fashion Film Festival archive", "INXS: Access All Areas, episode 201", "S05E04 transcript"],
  },
};
