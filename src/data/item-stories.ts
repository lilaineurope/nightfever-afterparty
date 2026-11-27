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
  // S05E05 Brad Gooch (25 Nov 2026): his books, facts from their covers and listings, notes from the episode.
  "radiant": {
    intro:
      "Brad Gooch's biography of Keith Haring, from his childhood in Kutztown and art school in New York to the subway drawings, the Pop Shop, ACT UP and his last murals.",
    reviews: [],
    facts: [
      { label: "Out", value: "2024" },
      { label: "Full title", value: "Radiant: The Life and Line of Keith Haring" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "Harper" },
      { label: "ISBN", value: "9780062698285" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "James introduces it as Brad's latest book - which makes the episode a tribute to Keith.", source: "S05E05", episode: "s05e05", time: "00:01:06" },
      { when: "On the show", what: "The first third of the book is Keith growing up in Kutztown, as James puts it.", source: "S05E05", episode: "s05e05", time: "00:24:59" },
      { when: "On the show", what: "James begs everyone to go out and get a copy.", source: "S05E05", episode: "s05e05", time: "01:19:36" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "smash-cut": {
    intro:
      "Brad Gooch's memoir of his life with the filmmaker Howard Brookner and of downtown New York in the 70s and 80s.",
    reviews: [],
    facts: [
      { label: "Out", value: "2015" },
      { label: "Full title", value: "Smash Cut: A Memoir of Howard & Art & the '70s & the '80s" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "Harper" },
      { label: "ISBN", value: "9780062354969" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "Brad says one of Mapplethorpe's test shots of him, with a little scarf around his neck, is in the book.", source: "S05E05", episode: "s05e05", time: "00:16:54" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "city-poet": {
    intro:
      "Brad Gooch's biography of the New York School poet Frank O'Hara.",
    reviews: [],
    facts: [
      { label: "Out", value: "1993" },
      { label: "Full title", value: "City Poet: The Life and Times of Frank O'Hara" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "Knopf" },
      { label: "ISBN", value: "9780060976132" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "James names it in his introduction (he says John O'Hara).", source: "S05E05", episode: "s05e05", time: "00:00:48" },
      { when: "On the show", what: "Brad says he was more drawn to Frank O'Hara and the New York School poets than to the Burroughs crowd.", source: "S05E05", episode: "s05e05", time: "00:22:47" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "flannery": {
    intro:
      "Brad Gooch's biography of the Southern writer Flannery O'Connor.",
    reviews: [],
    facts: [
      { label: "Out", value: "2009" },
      { label: "Full title", value: "Flannery: A Life of Flannery O'Connor" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "Little, Brown and Company" },
      { label: "ISBN", value: "9780316000666" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "James names it in his introduction, among Brad's award-winning biographies.", source: "S05E05", episode: "s05e05", time: "00:00:49" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "rumi-s-secret": {
    intro:
      "Brad Gooch's biography of the 13th-century Persian poet and mystic Rumi.",
    reviews: [],
    facts: [
      { label: "Out", value: "2017" },
      { label: "Full title", value: "Rumi's Secret: The Life of the Sufi Poet of Love" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "Harper" },
      { label: "ISBN", value: "9780061999147" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "James names it in his introduction - Fenton says the line sounds like a Jeopardy question.", source: "S05E05", episode: "s05e05", time: "00:00:56" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "jailbait-and-other-stories": {
    intro:
      "Brad Gooch's first book of short stories, published by a small gay press, with a cover photograph by Robert Mapplethorpe.",
    reviews: [],
    facts: [
      { label: "Out", value: "1984" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "SeaHorse Press" },
      { label: "Cover photograph", value: "Robert Mapplethorpe" },
      { label: "ISBN", value: "9780933322172" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "Brad met Mapplethorpe the first week the Mineshaft opened; he went on to do the cover of this book.", source: "S05E05", episode: "s05e05", time: "00:10:20" },
      { when: "On the show", what: "Brad asked Robert to photograph his brother Edward for the cover.", source: "S05E05", episode: "s05e05", time: "00:18:28" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "scary-kisses": {
    intro:
      "Brad Gooch's novel about the world of male modelling.",
    reviews: [],
    facts: [
      { label: "Out", value: "1988" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "G. P. Putnam's Sons" },
      { label: "ISBN", value: "9780330307512" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "Brad says he wrote the novel out of his modelling years.", source: "S05E05", episode: "s05e05", time: "00:03:55" },
      { when: "On the show", what: "It was partly about the casualties of a rough industry, Brad says.", source: "S05E05", episode: "s05e05", time: "00:07:20" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "golden-age-of-promiscuity": {
    intro:
      "Brad Gooch's novel of gay downtown New York in the years before AIDS.",
    reviews: [],
    facts: [
      { label: "Out", value: "1996" },
      { label: "Written by", value: "Brad Gooch" },
      { label: "Published by", value: "Knopf" },
    ],
    inIt: [],
    since: [
      { when: "On the show", what: "James names it in his introduction.", source: "S05E05", episode: "s05e05", time: "00:00:43" },
    ],
    sources: ["The book's own cover and listing", "S05E05 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },

  // ---------- Dean Johnson's work (Lisa, 27 Nov 2026: "dean's work needs cover designs and each item needs a page") ----------
  // Facts: the records' own sleeves and labels (Discogs, MusicBrainz), the Velvet Mafia's own site and CD Baby page, the
  // film credits (TMDB, IMDb), the Dean Johnson Papers at NYU's Fales Library, and the flyers his sister Beth keeps.
  weenies: {
    intro:
      "Dean Johnson's band. He wrote the songs and sang them, often about the people in the room. They played the Pyramid, Area, Danceteria, the Cat Club, the Limelight and Wigstock, and were the house band at his Rock 'n' Roll Fag Bar at the World.",
    reviews: [],
    facts: [
      { label: "Records", value: "'Chicken' / 'F*ck You' (Radical Records, 1987), 'F*ck You' on CD (Great Jones, 1988), 'Conventions' (Great Jones, 1988)" },
      { label: "Produced by", value: "Keith Masco" },
      { label: "Songs only on film", value: "'Bourgeois Boys', 'Andy Warhol', 'Teri Toye', 'Attitude' and 'Do the Drag' - never put out on a record" },
      { label: "Last show", value: "A reunion set at Rock 'n' Roll Fag Bar 2008, the memorial concert for Dean, 30 May 2008" },
    ],
    inItLabel: "In the band (on the 1987 record)",
    inIt: [
      { name: "Dean Johnson", note: "lead vocals, songs" },
      { name: "Eunice Holland", note: "bass, vocals" },
      { name: "Rocko Mezias", note: "drums" },
      { name: "Luthur", note: "guitar" },
      { name: "Al Ludgate", note: "horns" },
      { name: "Stephen Amico", note: "keyboards, vocals" },
      { name: "Perry Masco", note: "mandolin, vocals" },
      { name: "Lloyd Goldberg", note: "sax" },
    ],
    since: [
      { when: "On the show", what: "Musto asked Dean for a song about him, like the ones he sang about Teri Toye and Dianne Brill.", source: "S01E02", episode: "s01e02", time: "00:12:51" },
      { when: "On the show", what: "James remembers Dean Johnson and the Weenies when they first started at the Pyramid.", source: "S04E07", episode: "s04e07", time: "00:36:23" },
    ],
    sources: ["The records' own sleeves and labels (Discogs, MusicBrainz)", "Nelson Sullivan's video archive", "The 2008 memorial concert page", "S01E02 and S04E07 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "dean-and-the-weenies-chicken": {
    intro:
      "Dean and the Weenies' first record: a 12-inch single with 'Chicken' on one side and 'F*ck You' on the other. The sleeve dedicates it to Tipper Gore and the PMRC, the parents' group that wanted warning stickers on records.",
    reviews: [],
    facts: [
      { label: "Out", value: "1987" },
      { label: "Label", value: "Radical Records (RAD 12)" },
      { label: "Format", value: "12-inch vinyl single, US" },
      { label: "Side A", value: "'Chicken' (3:00)" },
      { label: "Side B", value: "'F*ck You' (3:45)" },
      { label: "Written by", value: "Dean Johnson" },
      { label: "Produced by", value: "Keith Masco" },
      { label: "Engineer", value: "Fred Tenny" },
    ],
    inItLabel: "On it",
    inIt: [{ name: "The Weenies" }, { name: "Dean Johnson" }],
    since: [],
    sources: ["The record's own sleeve and label (Discogs)", "Our Library publications (no reviews or mentions yet)"],
  },
  "dean-and-the-weenies-f-ck-you": {
    intro:
      "Dean's best-known song. Dean and the Weenies sing it in the film Mondo New York, and Great Jones, a label of Island Records, put it out on CD from the soundtrack.",
    reviews: [],
    facts: [
      { label: "Out", value: "1988" },
      { label: "Label", value: "Great Jones (CCD 600)" },
      { label: "Format", value: "CD single in a gatefold card sleeve, US" },
      { label: "Length", value: "3:48" },
      { label: "Words and music", value: "Dean Johnson" },
      { label: "Produced by", value: "Keith Masco" },
      { label: "Also on", value: "The Mondo New York soundtrack (1988), This Is Offensive (1994) and Blacklips Bar: Androgyns and Deviants (2023); first out as the B-side of 'Chicken' (1987)" },
    ],
    inItLabel: "On it",
    inIt: [{ name: "The Weenies" }, { name: "Dean Johnson" }, { name: "Mondo New York" }],
    since: [],
    sources: ["The record's own sleeve and label (Discogs)", "Our Library publications (no reviews or mentions yet)"],
  },
  "dean-and-the-weenies-conventions": {
    intro: "A 12-inch dance single by Dean and the Weenies, with four mixes of 'Conventions'.",
    reviews: [],
    facts: [
      { label: "Out", value: "1988" },
      { label: "Label", value: "Great Jones (GJ-600)" },
      { label: "Format", value: "12-inch vinyl, 45 rpm" },
      { label: "Side A", value: "The Unconventional Mix, The Unconventional Radio Mix" },
      { label: "Side B", value: "Radio Mix, Bonus Beats" },
    ],
    inItLabel: "On it",
    inIt: [{ name: "The Weenies" }, { name: "Dean Johnson" }],
    since: [],
    sources: ["The record's own label (Discogs)", "Our Library publications (no reviews or mentions yet)"],
  },
  "velvet-mafia": {
    intro:
      "Dean Johnson's glam rock band, from the late 1990s until he died in 2007. On the cover of their CD Cheap But Not Free the band stands in a police line-up, with a Catholic schoolgirl on bass and a sax-playing nun.",
    reviews: [],
    facts: [
      { label: "Years", value: "About 1997 to 2007" },
      { label: "Records", value: "We Know Where You Live (1998), Cheap But Not Free (2004)" },
      { label: "Style", value: "Glam rock and power pop" },
      { label: "On film", value: "Freaks, Glam Gods and Rock Stars (2001)" },
    ],
    inItLabel: "In the band",
    inIt: [{ name: "Dean Johnson", note: "vocals, songs" }, { name: "Susanne Hassenstein" }],
    since: [],
    sources: ["The Velvet Mafia's own website and press list", "Our Library publications (no reviews or mentions yet)"],
  },
  "velvet-mafia-we-know-where-you-live": {
    intro: "The Velvet Mafia's first CD. Next Magazine reviewed it in 1998. No picture of it and no track list have turned up yet.",
    reviews: [],
    facts: [
      { label: "Out", value: "1998" },
      { label: "Format", value: "CD" },
    ],
    inItLabel: "On it",
    inIt: [{ name: "The Velvet Mafia" }, { name: "Dean Johnson" }],
    since: [],
    sources: ["The Velvet Mafia's own press list", "Our Library publications (no reviews or mentions yet)"],
  },
  "velvet-mafia-cheap-but-not-free": {
    intro:
      "The Velvet Mafia's second CD: ten glam rock songs. Song 7, 'The Big Johnson', later gave the documentary about Dean its title.",
    reviews: [],
    facts: [
      { label: "Out", value: "2004" },
      { label: "Label", value: "Hassenstein Music (the band's own)" },
      { label: "Format", value: "CD" },
      { label: "Songs", value: "The Girl From Planet Muff, Dharmageddon (Celebrity), The Pretty One, Coco Chanel, Testosterone, Make A Mess, The Big Johnson, Foot/Stool, Air Kisses For The Masses, This Stud's For You" },
    ],
    inItLabel: "On it",
    inIt: [{ name: "The Velvet Mafia" }, { name: "Dean Johnson" }],
    since: [],
    sources: ["The CD's own listing (CD Baby)", "The Velvet Mafia's own website", "Our Library publications (no reviews or mentions yet)"],
  },
  "freaks-glam-gods-and-rock-stars": {
    intro:
      "John T. Ryan's concert documentary of New York's underground drag, punk and performance scene. Dean Johnson and the Velvet Mafia are in it.",
    reviews: [],
    facts: [
      { label: "Out", value: "2001" },
      { label: "Length", value: "1 hour 26 minutes" },
      { label: "Directed by", value: "John T. Ryan" },
    ],
    inIt: [{ name: "Dean Johnson" }, { name: "The Velvet Mafia" }, { name: "Kevin Aviance" }, { name: "Donovan Leitch" }, { name: "Jason Nesmith" }],
    since: [],
    sources: ["The film's credits (IMDb, TCM)", "The Dean Johnson Papers, NYU Fales Library", "Our Library publications (no reviews or mentions yet)"],
  },
  "big-johnson": {
    intro:
      "Lola Rocknrolla's documentary about the wild life and mysterious death of Dean Johnson, named after a Velvet Mafia song. Dean's sister Beth is one of its producers.",
    reviews: [],
    facts: [
      { label: "First shown", value: "Slamdance Film Festival, 20 February 2025" },
      { label: "In cinemas", value: "Quad Cinema, New York, January 2026" },
      { label: "Online", value: "27 February 2026" },
      { label: "Written and directed by", value: "Lola Rocknrolla" },
      { label: "Made by", value: "Funtown Pictures" },
      { label: "Length", value: "1 hour 35 minutes" },
    ],
    inIt: [
      { name: "Dean Johnson" },
      { name: "Beth Johnson", note: "Dean's sister" },
      { name: "Lady Bunny" },
      { name: "Taylor Mac" },
      { name: "Kevin Aviance" },
      { name: "Jackie Beat" },
      { name: "Sherry Vine" },
      { name: "Michael Musto" },
      { name: "Penny Arcade" },
      { name: "Miss Guy" },
      { name: "World Famous *BOB*" },
    ],
    since: [
      { when: "On the show", what: "James had just seen the Dean Johnson documentary, and talked about it with Fenton on their radio show.", source: "S06E07", episode: "s06e07", time: "00:21:00" },
    ],
    sources: ["The film's credits (TMDB)", "Slamdance and the Quad Cinema", "S06E07 AFTERPARTY references", "Our Library publications (no reviews or mentions yet)"],
  },
  "rock-n-roll-fag-bar": {
    intro:
      "Dean Johnson's Tuesday night at the World on East 2nd Street, from 1987: gay rock and roll, go-go boys, and Dean and the Weenies on stage. Dean made it, promoted it and hosted it.",
    reviews: [],
    facts: [
      { label: "Started", value: "1987" },
      { label: "Where", value: "The World, 254 East 2nd Street - Tuesdays" },
      { label: "House band", value: "Dean and the Weenies" },
      { label: "Came back", value: "At Coney Island High in the 1990s, and as Rock 'n' Roll Fag Bar 2008, the memorial concert for Dean at Don Hill's on 30 May 2008" },
      { label: "The 2008 concert", value: "Made by Beth Johnson with Chi Chi Valenti, Joe Birdsong and Hattie Hathaway. Bebe Buell, Joey Arias, Kevin Aviance, Miss Guy, Justin Bond and World Famous *BOB* performed, and it raised $3,300 for Sylvia's Place" },
    ],
    inItLabel: "Who ran it",
    inIt: [{ name: "Dean Johnson" }, { name: "The Weenies", note: "the house band" }],
    since: [],
    sources: ["The night's own flyers (Beth Johnson's Dean Johnson fan page)", "OutWeek, 19 November 1989", "The 2008 memorial concert page", "Our Library publications (no reviews or mentions yet)"],
  },
  homocorps: {
    intro:
      "Dean Johnson's monthly showcase of gay, lesbian and trans rock bands at CBGB, which he produced and hosted from the late 1990s until about 2006.",
    reviews: [],
    facts: [
      { label: "Where", value: "CBGB, 315 Bowery" },
      { label: "When", value: "Monthly, late 1990s to about 2006" },
      { label: "Made and hosted by", value: "Dean Johnson" },
      { label: "Posters", value: "Three are kept in the Dean Johnson Papers at NYU's Fales Library" },
    ],
    inItLabel: "On stage",
    inIt: [
      { name: "Dean Johnson" },
      { name: "Rufus Wainwright", note: "in the first cast photo" },
      { name: "Michael Cavadias" },
      { name: "Jesse Adams" },
      { name: "Paxton" },
      { name: "Lisa Jackson" },
      { name: "Frederick Ford" },
      { name: "Formika" },
      { name: "Jonny McGovern" },
      { name: "Laura Branigan" },
    ],
    since: [],
    sources: ["The Dean Johnson Papers, NYU Fales Library", "The Velvet Mafia's own press list", "Our Library publications (no reviews or mentions yet)"],
  },
};

/** One clip for a story that has no film of its own, shown as "Watch the clip" (Lisa, 24 Nov 2026: Blondie with Tish & Snooky -
 *  "use 1", the Hall of Fame thank-you; it is also in the S05E10 AFTERPARTY playlist). */
const CLIPS: Record<string, NonNullable<ItemStory["film"]>> = {
  // Dean Johnson's work (Lisa, 27 Nov 2026): Nelson Sullivan's own tape, the Velvet Mafia's video, the film's trailer.
  weenies: { id: "BswrxwRpoz8", title: "Dean and the Weenies - Bourgeois Boys, Pyramid Club, 1985", channel: "Nelson Sullivan's video archive" },
  "velvet-mafia": { id: "iIUGQ8_6Jh0", title: "Dean Johnson - Velvet Mafia (music video)", channel: "RYANISLANDfilms" },
  "big-johnson": { id: "bwa1ttQbXJ8", title: "The Big Johnson - trailer", channel: "Freestyle Digital Media" },
  blondie: { id: "6rkbvphNFtw", title: "Debbie Harry thanks Tish & Snooky at Blondie's induction into the Rock and Roll Hall of Fame, 2006", channel: "Manic Panic",
    note: "At Blondie's induction in 2006, Debbie Harry thanks Tish & Snooky, the backing singers in Blondie's first line-up." },
};

const MERGED: Record<string, ItemStory> = { ...(AUTO as Record<string, ItemStory>), ...HAND };
for (const [slug, film] of Object.entries(CLIPS)) if (MERGED[slug] && !MERGED[slug]!.film) MERGED[slug] = { ...MERGED[slug]!, film };
export const ITEM_STORIES: Record<string, ItemStory> = MERGED;
