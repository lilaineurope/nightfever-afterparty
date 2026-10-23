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
];

/** Guests the hosts want back for a part two */
export const COME_BACK: InterviewTip[] = [
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
    name: "Chi Chi Valenti",
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
];
