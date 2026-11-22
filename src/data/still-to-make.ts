// "Still to be made" (Lisa, 4 Nov 2026): every book and film the guests and hosts say on air should be written or
// made, with the episode and the moment it was said, and whether it has been made since (checked 4 Nov 2026; every transcript read in full 5 Nov 2026;
// every item checked online again 19 Nov 2026, the books once more on 20 Nov 2026). Shown as a box on the Library page (src/components/still-to-make.tsx); items marked "made" leave
// the Books and Films tabs and sit in the "Made since" tab (Lisa, 19 Nov 2026). A monthly check looks for newly made ones. Times from a full transcript are exact; the
// rest come from the episode index and point to where the subject comes up. Check every new Afterparty for new ones.

export type MadeYet = "not yet" | "in the works" | "partly" | "lost" | "made";

export type StillToMake = {
  /** What should be written or made */
  title: string;
  /** One line: who said it and what, in our own words */
  why: string;
  episodeId: string;
  /** Playable moment; left out when it hasn't been pinned to the transcript yet */
  time?: string;
  made: MadeYet;
  /** One line on what exists today */
  status: string;
  /** Where the status comes from (href: kept for the monthly check, never shown - no outside links), or the book's A–Z card */
  source?: { label: string; href?: string; card?: string };
  /** Made books and films: the exact Library (A–Z) name, so the "Made since" tab shows the cover and links to its page */
  library?: string;
  /** Made since: the year it came out */
  year?: number;
  /** Made since: what it was made as (the real title) */
  madeAs?: string;
  /** Our own idea, sent in through the box rather than said on air: shows an "AFTERPARTY idea" tag, and the episode line reads
   * "The story starts in" instead of "Said in" (Lisa, 21 Nov 2026) */
  idea?: true;
};

export const BOOKS_TO_WRITE: StillToMake[] = [
  {
    title: "Mickey Boardman's memoir",
    why: "Mickey says the nurse's line at his birth would make a great start to a book, and James says his Salamanca life lesson should be the title of his autobiography.",
    episodeId: "s04e02",
    time: "00:10:13",
    made: "not yet",
    status: "Not written yet - his writing so far is his Paper columns.",
  },
  {
    title: "Trey Speegle's autobiography",
    why: "Randy: 'You need to write a book… the autobiography.' Trey would build it from his WOW Report pieces and his thick scrapbooks of invitations, Polaroids and tear sheets - 'the first draft of history'.",
    episodeId: "s04e07",
    time: "01:02:01",
    made: "not yet",
    status: "Not yet - his books so far are the two 80s Polaroids books and 20 Years of Prints (2025).",
  },
  {
    title: "Ann Magnuson's memoir",
    why: "Ann says she is slowly writing it, and Randy can't wait to read it.",
    episodeId: "s04e10",
    time: "00:54:55",
    made: "not yet",
    status: "Not published yet.",
  },
  {
    title: "Queen of the Mudd",
    why: "James heard that Tina L'Hotsky, the self-styled queen of the Mudd Club, was in California writing her memoir.",
    episodeId: "s02e11",
    time: "00:50:46",
    made: "lost",
    status: "Never published - Tina died in 2008.",
    source: { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Tina_L%27Hotsky" },
  },
  {
    title: "A book of Suzy's columns",
    why: "James dreams of editing a collection of Aileen Mehle's society columns.",
    episodeId: "s06e08",
    time: "00:17:24",
    made: "not yet",
    status: "No collection yet.",
  },
  {
    title: "The Pop Tarts Grow Up",
    why: "Sally would like a book about Fenton and Randy's band, the Fabulous Pop Tarts.",
    episodeId: "s06e07",
    time: "00:44:12",
    made: "not yet",
    status: "Not written yet.",
  },
  {
    title: "Nick Egan's Duck Rock book",
    why: "Nick has just signed with Rizzoli for a book on Malcolm McLaren's Duck Rock years.",
    episodeId: "s05e04",
    time: "00:21:03",
    made: "in the works",
    status: "In the works as Auteurist - The Influence of Malcolm McLaren (Rizzoli) - no release date yet.",
  },
  {
    title: "Super Freak",
    why: "James's early-90s manuscript, never published - parts of it went into Freak Show.",
    episodeId: "s06e01",
    time: "00:34:56",
    made: "not yet",
    status: "Still unpublished.",
  },
  {
    title: "I F*** the 80s",
    why: "Trey's title for Patrick McMullan's next book, the follow-up to So80s.",
    episodeId: "s04e07",
    time: "00:42:19",
    made: "not yet",
    status: "Not made - yet.",
  },
  {
    title: "Doll Parts, the audiobook",
    why: "Amanda has never read her own memoir, but says she will record the audiobook.",
    episodeId: "s05e03",
    time: "00:16:11",
    made: "not yet",
    status: "No audiobook yet.",
  },
  {
    title: "Rudolf Piper's night stories, in English",
    why: "Rudolf has finished a book of his night stories in Portuguese, The Rise and Fall of the Megadiscotheques. The hosts: 'we need to get that to a New York publisher.'",
    episodeId: "s01e07",
    time: "01:07:39",
    made: "not yet",
    status: "No English edition yet - his agency is offering it to publishers as After Hours: The Rise and Fall of the Nightclub.",
  },
  {
    title: "Connie Fleming's book",
    why: "Connie keeps one story back: 'I shall save that for my book.'",
    episodeId: "s02e05",
    time: "00:19:30",
    made: "not yet",
    status: "Not published yet.",
  },
  {
    title: "Connie's biography by David Glamamore",
    why: "Connie says David Glamamore is writing her biography.",
    episodeId: "s02e05",
    time: "00:14:22",
    made: "not yet",
    status: "Not published yet - nothing announced (checked 21 Nov 2026).",
    source: { label: "Connie's biography", card: "connie-s-biography" },
  },
  {
    title: "Man Parrish's book",
    why: "James: 'You got to write a book.' Man tells his stories to camera instead.",
    episodeId: "s03e04",
    time: "01:09:00",
    made: "made",
    status: "Made: Man Parrish Stories – Volume One (2024) - his YouTube stories, now in print.",
    source: { label: "In the Library", card: "man-parrish-stories-volume-one" },
    library: "Man Parrish Stories – Volume One (Man Parrish)",
    year: 2024,
    madeAs: "Man Parrish Stories – Volume One",
  },
  {
    title: "A My Comrade anthology",
    why: "James asks Linda whether she'd collect My Comrade the way Pansy Beat did; yes, she says, but edited and better printed, and Fenton calls it a great idea one day.",
    episodeId: "s02e09",
    time: "00:38:26",
    made: "made",
    status: "Made - The My Comrade Anthology, pages picked by Linda, came out from Boo-Hooray.",
    library: "The My Comrade Anthology",
    madeAs: "The My Comrade Anthology",
  },
  {
    title: "Meet Me at the Mailbox (Denise Stoughton)",
    why: "Really Denise is writing and self-publishing a book about Bainbridge Island's personalised mailboxes and the people behind them, raising the money as she goes - and Jenny Go-Getter offered to edit it for free.",
    episodeId: "s05e07b",
    time: "00:54:06",
    made: "in the works",
    status: "In the works - working title Meet Me at the Mailbox: The Fabulous Mailboxes of Bainbridge Island; no release announced yet.",
    source: { label: "Meet Me at the Mailbox", card: "meet-me-at-the-mailbox" },
  },
  {
    title: "Dustin Pittman's underground 70s pictures",
    why: "When Dustin talks about photographing the trucks in the Meatpacking District and the light in the old boathouses on the piers, the hosts say that is a whole other book - not his celebrity book.",
    episodeId: "s04e05",
    time: "00:34:24",
    made: "made",
    status: "Made since: Dustin Pittman: New York After Dark (Rizzoli, 2024) - his 70s and 80s pictures, from the piers and the Meatpacking District to the clubs.",
    source: { label: "In the Library", card: "dustin-pittman-new-york-after-dark" },
    library: "Dustin Pittman: New York After Dark",
    year: 2024,
    madeAs: "Dustin Pittman: New York After Dark",
  },
];

export const FILMS_TO_MAKE: StillToMake[] = [
  {
    title: "Behind the Velvet Ropes, the new version",
    why: "Lauren says people still ask her to put the show back on the air, and she still has to make a new version - just like the old one, running around talking to the new crew.",
    episodeId: "s04e06",
    time: "00:28:48",
    made: "not yet",
    status: "Not made yet - about 60 of the old episodes are on YouTube.",
    source: { label: "Behind the Velvet Ropes", card: "behind-the-velvet-ropes" },
  },
  {
    title: "Michael Musto, the documentary",
    why: "The hosts picture a multi-part documentary about Musto's life, made for Netflix.",
    episodeId: "s01e02",
    time: "01:03:53",
    made: "not yet",
    status: "Not made - Musto wrote in 2025 that two film teams took it on and both dropped it.",
    source: {
      label: "Musto's column",
      href: "https://chelseacommunitynews.com/2025/01/27/you-should-be-a-documentary-heres-why-im-not/",
    },
  },
  {
    title: "Joey Arias's life story",
    why: "Joey's documentary of his life opens with a baby stolen near Area 51 - with Ruben Toledo as art director. Asked about a book, Joey says: the movie will say it all.",
    episodeId: "s01e10",
    time: "00:26:26",
    made: "in the works",
    status: "Not out yet - only the older Arias with a Twist (2010) exists.",
  },
  {
    title: "David LaChapelle's film of Amanda Lepore's life",
    why: "Amanda says Mark Wahlberg was once lined up to play her husband.",
    episodeId: "s05e03",
    time: "01:05:23",
    made: "not yet",
    status: "Never made.",
  },
  {
    title: "Amanda's dominatrix stories, the series",
    why: "Randy says her stories play like a scripted anthology series.",
    episodeId: "s05e03",
    time: "01:04:59",
    made: "not yet",
    status: "Not made.",
  },
  {
    title: "Mr. Pearl, the documentary",
    why: "James: there needs to be a documentary about the corset-maker Mr. Pearl - or a biopic.",
    episodeId: "s02e03",
    time: "00:53:07",
    made: "not yet",
    status: "No film yet.",
  },
  {
    title: "Zaldy's archive",
    why: "James: Zaldy's archive needs a gallery or FIT show, a book or a documentary. Zaldy says SCAD has asked him for a one-man show.",
    episodeId: "s04e04",
    time: "00:33:34",
    made: "in the works",
    status: "A SCAD show was offered - no book or film yet.",
  },
  {
    title: "Early New York electro",
    why: "Man Parrish, on the Vanguard Studios crowd behind Planet Rock and Baby Talk: 'Randy, somebody's got to do a little documentary on it.'",
    episodeId: "s03e04",
    time: "00:23:46",
    made: "not yet",
    status: "No documentary yet.",
  },
  {
    title: "John Sex",
    why: "James: there needs to be a John Sex retrospective or documentary - 'he was the king of downtown'.",
    episodeId: "s04e07",
    time: "00:40:51",
    made: "not yet",
    status: "No full film - only a 1983 short, John Sex: The True Story.",
  },
  {
    title: "Mickey Ruskin's places",
    why: "James: a documentary or a book about all of Mickey's places needs to happen. Richard: Yvonne Sewall-Ruskin is trying to get a film off the ground, and One University Place 'is undocumented'.",
    episodeId: "s02e11",
    time: "00:54:16",
    made: "partly",
    status: "Partly - Max's Kansas City has a book and a film, Mickey's other places nothing.",
  },
  {
    title: "Arthur Weinstein wears a wire",
    why: "James once read a screenplay about Arthur wearing a wire to bust corrupt cops.",
    episodeId: "s03e06",
    time: "00:14:07",
    made: "not yet",
    status: "No film yet.",
  },
  {
    title: "The South Beach boardwalk, Staten Island",
    why: "Fenton wants to make a documentary about the boardwalk of Michelangelo's teenage years.",
    episodeId: "s02e08",
    time: "00:04:38",
    made: "not yet",
    status: "Not made.",
  },
  {
    title: "Save the Robots",
    why: "Randy: they need a whole show of Save the Robots stories.",
    episodeId: "s02e07",
    time: "00:17:41",
    made: "not yet",
    status: "Not made.",
  },
  {
    title: "Edelweiss and the Midtown trans scene",
    why: "When Linda brings up Edelweiss, James says they need a whole episode on it - and on the whole Midtown scene, which Linda says was barely photographed.",
    episodeId: "s02e09",
    time: "00:49:41",
    made: "made",
    status: "Made since: Playing With Dolls, Pearl Martin's documentary on the trans clubs of the old Times Square red-light district - Edelweiss, the Gilded Grape, Sally's Hideaway, the Barnum Room - premiered at The Center in November 2023.",
    library: "Playing With Dolls (Pearl Martin)",
    year: 2023,
    madeAs: "Playing With Dolls (Pearl Martin)",
  },
  {
    title: "Cherry Vanilla's story as a mini-series",
    why: "Cherry hopes someone makes a film that gets the whole New York of her day right, from Cousin Brucie and the Copa to Max's back room; Fenton says her story is too vast for one film - it's a mini-series - and she signs off: make it a Netflix series, an ongoing documentary.",
    episodeId: "s03e05",
    time: "00:34:41",
    made: "not yet",
    status: "Not yet - her life is told in her memoir Lick Me; no film or series has been released.",
    source: { label: "Lick Me", card: "lick-me-how-i-became-cherry-vanilla" },
  },
  {
    title: "David's Friend as a feature film",
    why: "Nora has more or less finished with her stage show about her best friend David Burns unless a producer comes along, and says there should be a feature film version - though she adds that films about the 80s and disco never quite translate.",
    episodeId: "s06e05",
    time: "00:40:41",
    made: "not yet",
    status: "Not yet - David's Friend has only been staged (in rep with The Village! and taped before the pandemic); no film announced.",
    source: { label: "David's Friend", card: "david-s-friend" },
  },
  {
    title: "Dustin Pittman's underground films and footage",
    why: "Fenton and Randy ask where they can see the improvised film Dustin shot with Taylor Mead in Bridgehampton - he says he still has it - and Randy says he should put his footage of Jackie Curtis going over her lines on YouTube.",
    episodeId: "s04e05",
    time: "00:29:09",
    made: "not yet",
    status: "Not online that we can find.",
  },
  {
    title: "Trans Figured, the movie",
    why: "James says Brian is working on a screenplay to turn his memoir into a film - after the book and the documentary, two or three more acts to go.",
    episodeId: "s02e10",
    time: "01:13:24",
    made: "in the works",
    status: "In the works as a screenplay; no film announced as of November 2026. The documentary I'm Gonna Make You Love Me already exists.",
    source: { label: "Trans Figured", card: "trans-figured-my-journey-from-boy-to-woman-to-man" },
  },
  {
    title: "The Gilded Grape, the sitcom",
    why: "Hearing about the trans apartment building above the Gilded Grape and the free buffet, one of the hosts says it's an HBO sitcom, and James offers to write it.",
    episodeId: "s02e10",
    time: "00:21:26",
    made: "not yet",
    status: "Not made yet as a sitcom - the club does appear in Pearl Martin's documentary Playing With Dolls (2023).",
    source: { label: "The Gilded Grape", card: "the-gilded-grape" },
  },
  {
    title: "Lucy Hicks Anderson, the documentary",
    why: "When Brian tells the story of Lucy Hicks Anderson, the 1940s trans woman who married a sailor and was tried for it, Fenton says that's another documentary right there.",
    episodeId: "s02e10",
    time: "00:45:45",
    made: "partly",
    status: "Partly - a short film by Rhys Ernst in his We've Been Around series (2016); no full-length documentary yet.",
    source: { label: "Essence: the story of Lucy Hicks Anderson", href: "https://www.essence.com/2016/03/01/learn-inspiring-true-story-black-trans-pioneer-lucy-hicks-anderson" },
  },
  {
    // Lisa's own suggestion through the Films box (19 Nov 2026), added 21 Nov 2026 on her word: "put that into the film tab".
    title: "The making of World of Wonder",
    why: "How Fenton and Randy - with James at their side since the club days - went from NYU film school and the Pop Tarts to a record label, Manhattan Cable, RuPaul and a whole media empire. In James's own episode the three tell the start of it.",
    episodeId: "s06e01",
    time: "00:44:20",
    made: "not yet",
    status: "Not made yet - WOW's story has only been told in interviews and profiles, never in a film of its own.",
    idea: true,
  },
];
