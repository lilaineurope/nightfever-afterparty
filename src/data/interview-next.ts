// "Who to interview next" (Lisa, 23 Oct 2026): every time a host or guest says on air who the show should have on
// (or have back), with the episode and the moment it was said. Checked by hand against the transcripts - add new
// ones whenever a new Afterparty is built. Neutral wording only (ATTRIBUTION RULE): who suggested it, nothing more.

export type InterviewTip = {
  /** Who to interview (the exact name of their A-Z card) */
  name: string;
  /** One line: who said it and why, in our own words */
  why: string;
  episodeId: string;
  time: string;
};

/** New faces the guests suggested */
export const NEW_FACES: InterviewTip[] = [
  {
    name: "Arthur Weinstein",
    why: "James, after Eric tells how Arthur wore a wire to bust corrupt cops, remembers reading a screenplay about it: 'We'll have to do a whole episode on it.'",
    episodeId: "s03e06",
    time: "00:14:07",
  },
  {
    name: "Colleen Weinstein",
    why: "Eric Goode, telling Arthur Weinstein stories: the show should definitely interview Colleen, Arthur's wife, who still lives at the Chelsea Hotel.",
    episodeId: "s03e06",
    time: "00:39:01",
  },
  {
    name: "Henny Garfunkel",
    why: "Johnny Dynell, remembering the Franklin Street loft they shared, wonders if the hosts have interviewed the photographer yet.",
    episodeId: "s06e03",
    time: "00:13:52",
  },
  {
    name: "DuPont twins",
    why: "James says he'd love to get the DuPont twins on the show - Nikki, who had them as interns, offers to work it out.",
    episodeId: "s02e04",
    time: "00:55:59",
  },
  {
    name: "Cornelia Guest",
    why: "James would love to have Cornelia on the show too, after watching her interview on The Nikki Haskell Show.",
    episodeId: "s02e04",
    time: "00:55:59",
  },
  {
    name: "House of Field",
    why: "James, talking about Walt's House of Field years, says it's a whole different podcast - he'd love to talk to them sometime.",
    episodeId: "s01e06",
    time: "00:41:20",
  },
  {
    name: "Kembra Pfahler",
    why: "Randy, when Kembra's name comes up among the New York bands, says they've got to get her on the show.",
    episodeId: "s03e10",
    time: "00:43:45",
  },
  {
    name: "Chi Chi Valenti & Johnny Dynell",
    why: "James, telling their Mudd Club love story: 'We have to get Chi Chi and Johnny on anyway.'",
    episodeId: "s02e11",
    time: "00:39:45",
  },
  {
    name: "Tony Zanetta",
    why: "James says Tony Zanetta's name comes up again and again; a co-host says they've got to do a show with him, and James promises to get his contact from Cherry.",
    episodeId: "s03e05",
    time: "00:57:52",
  },
  {
    name: "Christopher Amazing",
    why: "James, when Christopher says Christopher Amazing was his first New York roommate: 'We could do a whole episode about Christopher.'",
    episodeId: "s05e07a",
    time: "00:06:50",
  },
  {
    name: "Jenny Go-Getter (Jennifer Banash)",
    why: "James, after Really Denise says her old party partner (now Jenny Banash, a young-adult novelist) offered to edit her book: 'We'll have to have her on the show.'",
    episodeId: "s05e07b",
    time: "00:54:55",
  },
  {
    name: "Magenta",
    why: "James to Fenton, when Really Denise remembers the Tunnel kid: 'I think you wanted us to try and find Magenta.'",
    episodeId: "s05e07b",
    time: "00:55:27",
  },
  {
    name: "Chi Chi Valenti & Johnny Dynell",
    why: "Moby, remembering them living across the street from him on 14th Street: they still look fantastic - 'we're gonna have to get them on the show as well at some point.'",
    episodeId: "s01e09",
    time: "00:58:45",
  },
  {
    name: "Lauren Ezersky",
    why: "James, after Mickey tells how Lauren befriended Lynn at Fashion Week: they have to have both Lauren and Lynn on the show.",
    episodeId: "s04e02",
    time: "00:36:29",
  },
  {
    name: "Lynn Yaeger",
    why: "James: they have to have both Lauren and Lynn on the show.",
    episodeId: "s04e02",
    time: "00:36:29",
  },
  {
    name: "Lynn Yaeger",
    why: "Lauren: Lynn has been a real original since day one - 'you should have her on your show.'",
    episodeId: "s04e06",
    time: "00:12:18",
  },
  {
    name: "Erich Conrad",
    why: "Mickey adds Eric to James's list of people to have on.",
    episodeId: "s04e02",
    time: "00:36:34",
  },
  {
    name: "Kim Hastreiter",
    why: "Mickey: they could do a whole episode on Paper - get David and Kim on the show, and Drew as well, to talk about its ups and downs.",
    episodeId: "s04e02",
    time: "01:04:43",
  },
  {
    name: "David Hershkovits",
    why: "Same - Mickey wants Paper's co-founders David and Kim on the show.",
    episodeId: "s04e02",
    time: "01:04:43",
  },
  {
    name: "Drew Elliott",
    why: "Same - 'and Drew as well', Mickey adds.",
    episodeId: "s04e02",
    time: "01:04:43",
  },
  {
    name: "Tasty Tim",
    why: "James says he loves Tasty Tim to the end of time - part of the old Boy George and Marilyn crowd - and Jodie says the show should get Tasty Tim on; James asks Jodie to help track Tasty Tim down.",
    episodeId: "s05e02",
    time: "00:36:45",
  },
  {
    name: "DJ Fat Tony",
    why: "James closes the show: he will come to Jodie for Tasty Tim's and Fat Tony's contact details.",
    episodeId: "s05e02",
    time: "00:55:52",
  },  {
    name: "Katy K",
    why: "April, after telling how Katy K designed the Ta Ta's dresses: the show has to get Katy on - she's amazing and very funny.",
    episodeId: "s05e08",
    time: "00:25:17",
  },
];

/** Guests the hosts want back for a part two */
export const COME_BACK: InterviewTip[] = [
  {
    name: "Jayne County",
    why: "James closes: they have to have Jayne back for a part two - they only got as far as the 70s, with the 80s, 90s and 2000s still to go.",
    episodeId: "s02e02",
    time: "01:07:47",
  },
  {
    name: "Bebe Buell",
    why: "James closes: they could do a whole series with Bebe - and Elvis Costello, Liv and Todd would each take a whole podcast of their own.",
    episodeId: "s04e03",
    time: "01:13:38",
  },
  {
    name: "Lincoln Palsgrove IV",
    why: "James closes: they'll have to have Lincoln back on, as there were stories they didn't get to tell.",
    episodeId: "s06e06",
    time: "01:09:19",
  },
  {
    name: "Ernie Glam",
    why: "A co-host closes: they have to do another Night Fever with Ernie - and James promises a special 'Night Fever: the Joy' episode.",
    episodeId: "s01e05",
    time: "00:56:23",
  },
  {
    name: "Nell Campbell",
    why: "The hosts close by calling the episode just the trailer for 'Nell Campbell, the series' - and Nell says she says yes to everything.",
    episodeId: "s05e01",
    time: "00:49:39",
  },
  {
    name: "Waltpaper",
    why: "James closes: 'I'd like to have you back' - they could talk for another three hours.",
    episodeId: "s01e06",
    time: "00:53:06",
  },
  {
    name: "Sally Randall",
    why: "James wraps up: 'Sally, we love you. We'll have to have you back on and talk some more.'",
    episodeId: "s06e07",
    time: "01:01:15",
  },
  {
    name: "Michelle Visage",
    why: "James signs off: he can't wait for Michelle to come back and tell them more about her life.",
    episodeId: "s02e01",
    time: "01:00:44",
  },
  {
    name: "Dianne Brill",
    why: "The hosts hope to have her back - and offer her the co-host chair.",
    episodeId: "s01e01",
    time: "00:50:30",
  },
  {
    name: "Lisa Edelstein",
    why: "The hosts say they definitely have to have her back for a part two.",
    episodeId: "s01e03",
    time: "01:08:15",
  },
  {
    name: "Rudolf Piper",
    why: "Rudolf himself: \"We have to do this again.\"",
    episodeId: "s01e07",
    time: "00:31:54",
  },
  {
    name: "Ann Magnuson",
    why: "James signs off promising they'll probably do a part two.",
    episodeId: "s04e10",
    time: "01:06:34",
  },
  {
    name: "Amanda Lepore",
    why: "James still has pages of notes, so they'll have her back - and Randy wants the cameras rolling next time.",
    episodeId: "s05e03",
    time: "01:04:33",
  },
  {
    name: "Nick Egan",
    why: "James has five pages of notes left and wants him back for a part two.",
    episodeId: "s05e04",
    time: "01:00:44",
  },
  {
    name: "Chi Chi Valenti & Johnny Dynell",
    why: "Chi Chi and Johnny Dynell offer to come back and cover the 21st century next time.",
    episodeId: "s06e03",
    time: "01:01:44",
  },
  {
    name: "William Norwich",
    why: "The hosts say it feels like it should be a two-parter - there's still a lot of uptown, downtown to explore.",
    episodeId: "s06e08",
    time: "00:59:37",
  },
  {
    name: "Miss Guy",
    why: "Randy, as the hour runs out, says they could go on and on and will have to do a part two.",
    episodeId: "s03e10",
    time: "00:47:35",
  },
  {
    name: "Richard Boch",
    why: "Fenton closes hoping to have Richard back - he senses they just scratched the surface - and Richard says he'd be honoured.",
    episodeId: "s02e11",
    time: "01:04:44",
  },
  {
    name: 'Luis "Xtravaganza" Camacho',
    why: "James signs off saying they'll have to have Luis back, and Luis offers a post-90s wrap-up.",
    episodeId: "s01e08",
    time: "00:59:50",
  },
  {
    name: "Trey Speegle",
    why: "The hosts sign off saying they could do a part two, part three, part four - the Trey Speegle Chronicles.",
    episodeId: "s04e07",
    time: "01:02:01",
  },
  {
    name: "Tish & Snooky",
    why: "James signs off saying they only got halfway into the 90s, so they'll have to have the sisters back for the 90s to now.",
    episodeId: "s05e10",
    time: "00:51:21",
  },
  {
    name: "Cherry Vanilla",
    why: "James runs out of time with Vangelis and Rufus Wainwright still to come; a co-host says they need a whole season with her - they've only just started.",
    episodeId: "s03e05",
    time: "01:16:52",
  },
  {
    name: "Really Denise",
    why: "James closes Really Denise's interview: they're going to have to have her back on the show again.",
    episodeId: "s05e07b",
    time: "01:04:44",
  },
  {
    name: "Moby",
    why: "James closes: he has another 13 pages of questions to pepper Moby with sometime - and Moby says he would love to do it again and again.",
    episodeId: "s01e09",
    time: "01:03:39",
  },  {
    name: "Elyssa Maxx Goodman",
    why: "The hosts close: they have to have Elyssa back - they only covered the first four chapters of Glitter and Concrete.",
    episodeId: "s04e11",
    time: "01:05:33",
  },
];

// One entry per person (Lisa, 18 Nov 2026): a name said in several episodes - or in both lists - used to show up once per
// row. Keep adding one row per moment above (same A–Z card name each time); interviewPeople() folds the rows into one
// entry per person, with every moment it was said. Anyone the hosts asked back goes under "Back for a part two" with
// their earlier "get them on" moments too. Whether a New face has already been on the show is worked out from the
// guest list (src/lib/interviewed.server.ts), so a new episode never needs a hand edit here.

/** Same person, whatever the spelling of quotes, dots, accents or spaces. */
export const nameKey = (name: string) =>
  name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/["'‘’“”.]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export type InterviewPerson = {
  /** The A–Z card name (from the person's first row) */
  name: string;
  key: string;
  list: "new" | "back";
  /** true when at least one moment is a "get them on" tip (a New-face row) - such a person can later be labelled
   *  "Suggested and interviewed" */
  suggested: boolean;
  /** Every moment the name was put forward, oldest episode first */
  said: InterviewTip[];
};

// Oldest episode first, so a story reads in order: suggested, suggested again, interviewed and asked back.
const byEpisode = (a: InterviewTip, b: InterviewTip) => a.episodeId.localeCompare(b.episodeId) || a.time.localeCompare(b.time);

function fold(): { newFaces: InterviewPerson[]; comeBack: InterviewPerson[] } {
  const back = new Set(COME_BACK.map((t) => nameKey(t.name)));
  const people = new Map<string, InterviewPerson>();
  // Come-back rows first, so a person keeps their place in that list; New-face rows in their own order after.
  for (const t of [...COME_BACK, ...NEW_FACES]) {
    const key = nameKey(t.name);
    const hit = people.get(key);
    const suggested = NEW_FACES.includes(t);
    if (hit) {
      hit.said.push(t);
      hit.suggested ||= suggested;
    } else people.set(key, { name: t.name, key, list: back.has(key) ? "back" : "new", suggested, said: [t] });
  }
  const all = [...people.values()];
  for (const p of all) p.said.sort(byEpisode);
  // New faces keep the order of their first row in NEW_FACES.
  const firstNew = (p: InterviewPerson) => NEW_FACES.findIndex((t) => nameKey(t.name) === p.key);
  return {
    newFaces: all.filter((p) => p.list === "new").sort((a, b) => firstNew(a) - firstNew(b)),
    comeBack: all.filter((p) => p.list === "back"),
  };
}

/** The two lists the home page shows: one entry per person. */
export const INTERVIEW_PEOPLE = fold();
