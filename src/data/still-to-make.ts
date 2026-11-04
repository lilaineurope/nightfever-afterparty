// "Still to be made" (Lisa, 4 Nov 2026): every book and film the guests and hosts say on air should be written or
// made, with the episode and the moment it was said, and whether it has been made since (checked 4 Nov 2026).
// Shown as a box on the Library page (src/components/still-to-make.tsx). Times from a full transcript are exact; the
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
  /** Where the status comes from, or the book's A–Z card */
  source?: { label: string; href?: string; card?: string };
};

export const BOOKS_TO_WRITE: StillToMake[] = [
  {
    title: "Trey Speegle's autobiography",
    why: "Randy: 'You need to write a book… the autobiography.' Trey would build it from his WOW Report pieces and his thick scrapbooks of invitations, Polaroids and tear sheets - 'the first draft of history'.",
    episodeId: "s04e07",
    time: "01:02:01",
    made: "not yet",
    status: "Not yet - his books so far are the two 80s Polaroids books.",
  },
  {
    title: "Ann Magnuson's memoir",
    why: "Randy can't wait for it.",
    episodeId: "s04e10",
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
    time: "00:05:59",
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
    status: "Signed with Rizzoli - no listing yet.",
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
    time: "00:01:26",
    made: "not yet",
    status: "No audiobook yet.",
  },
  {
    title: "Man Parrish's book",
    why: "James: 'You got to write a book.' Man tells his stories to camera instead.",
    episodeId: "s03e04",
    time: "01:09:00",
    made: "made",
    status: "Made: Man Parrish Stories – Volume One (2024).",
    source: { label: "In the Library", card: "man-parrish-stories-volume-one" },
  },
];

export const FILMS_TO_MAKE: StillToMake[] = [
  {
    title: "Michael Musto, the documentary",
    why: "The hosts picture a multi-part documentary about Musto's life, made for Netflix.",
    episodeId: "s01e02",
    time: "01:04:00",
    made: "not yet",
    status: "Not made - Musto wrote in 2025 that two film teams took it on and both dropped it.",
    source: {
      label: "Musto's column",
      href: "https://chelseacommunitynews.com/2025/01/27/you-should-be-a-documentary-heres-why-im-not/",
    },
  },
  {
    title: "Joey Arias's life story",
    why: "Joey's documentary of his life opens with a baby stolen near Area 51 - with Ruben Toledo as art director.",
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
    made: "not yet",
    status: "Not made.",
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
    time: "00:04:01",
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
];
