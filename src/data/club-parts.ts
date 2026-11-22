// Everything about one club on ONE page (Lisa, 22 Nov 2026: "everything area should be all on one page"). The guests talk
// about a club's theme nights and parties as separate things, so the episode lists gave each its own A–Z card ("Area's
// Fashion theme", "Fellini party at Area"...). Here those cards are folded into the club: their rows join the club's card,
// the A–Z index shows only the club, the old card addresses forward to the club page (SAME_AS in entities.ts) and the
// club page shows them grouped (src/components/club-parts.tsx) instead of in the long "In the episodes" list.
// Names are the exact "name" of the rows in src/data/<episode>.json. Looks (Mood rows) keep their own cards because they
// feed the mood board with their colours; the club page links to them.
// Strings only - entities.ts loads this file.

export type ClubPart = {
  /** Shown on the tile, e.g. "Art" */
  title: string;
  /** Episode-row names whose cards fold into the club */
  names: string[];
};

export type ClubPartGroup = {
  heading: string;
  /** Rows about the group as a whole (e.g. "Area theme nights and invitations"), shown above the tiles */
  intro?: string[];
  parts: ClubPart[];
};

export type ClubParts = {
  groups: ClubPartGroup[];
  /** Mood rows about the club: they keep their own card (mood board), the club page links to them */
  looks?: string[];
};

export const CLUB_PARTS: Record<string, ClubParts> = {
  area: {
    groups: [
      {
        heading: "Theme nights",
        intro: ["Area theme nights and invitations"],
        parts: [
          { title: "Art", names: ["Area's Art theme", "Area Art invitation photo"] },
          { title: "Fashion", names: ["Area's Fashion theme"] },
          { title: "Obelisk", names: ["Area's Obelisk theme"] },
          { title: "Confinement", names: ["Area's Confinement theme"] },
          { title: "Disco", names: ["Area's Disco theme"] },
          { title: "Suburbia", names: ["Area's Suburbia theme"] },
          { title: "Natural History", names: ["Area's Natural History theme"] },
          { title: "Fairy Tales", names: ["Area's Fairy Tales theme"] },
        ],
      },
      {
        heading: "Parties",
        parts: [
          { title: "Malcolm McLaren's Fans party", names: ["Malcolm McLaren's Fans party at Area"] },
          { title: "Fellini party", names: ["Fellini party at Area"] },
          { title: "Bryan Ferry party", names: ["Bryan Ferry party at Area"] },
          { title: "World of Wonder's pitch", names: ["World of Wonder pitch to Area"] },
        ],
      },
    ],
    looks: ["Stephen Sprouse's window at Area", "Steve Rubell on a fire hydrant at Area", "Sleek Eurotrash and model crowd at Area"],
  },
};

/** Every row name that folds into a club -> the club's slug. */
export const PART_NAMES: [string, string][] = Object.entries(CLUB_PARTS).flatMap(([club, p]) =>
  p.groups.flatMap((g) => [...(g.intro ?? []), ...g.parts.flatMap((x) => x.names)].map((n) => [n, club] as [string, string])),
);
