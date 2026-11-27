// Everything about one club on ONE page (Lisa, 22 Nov 2026: "everything area should be all on one page", then
// "make sure it apply to other pages too"). The guests talk
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
  "sound-factory": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Grace Jones's Halloween concert", names: ["Grace Jones's Halloween concert at the Sound Factory"] },
        ],
      },
    ],
    looks: ["The police drive-by silence at the Sound Factory", "Bugged-out Sound Factory dance floor", "Grace Jones Sound Factory poster"],
  },
  "mudd-club": {
    groups: [
      {
        heading: "Theme nights and shows",
        intro: ["Mudd Club theme parties"],
        parts: [
          { title: "Opening night", names: ["Mudd Club opening night"] },
          { title: "Eric's Grecian grotto", names: ["Eric's Grecian grotto at the Mudd Club"] },
          { title: "Talking Heads", names: ["Talking Heads at the Mudd Club"] },
          { title: "Marianne Faithfull", names: ["Marianne Faithfull at the Mudd Club"] },
          { title: "X, June 1980", names: ["X at the Mudd Club (June 1980)"] },
          { title: "William Burroughs reading", names: ["William Burroughs reading at the Mudd Club"] },
          { title: "Victor Hugo's play", names: ["Victor Hugo's play at the Mudd Club"] },
        ],
      },
    ],
    looks: ["Matte black Mudd Club interior", "Leathery S&M at the Mudd Club", "Snooky's super-short Mudd Club dress", "Club 57 pop versus Mudd Club black"],
  },
  "studio-54": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Opening night", names: ["Studio 54 opening night"] },
          { title: "Fiorucci anniversary party", names: ["Fiorucci anniversary party at Studio 54"] },
          { title: "Kathy Hilton's 21st birthday", names: ["Kathy Hilton's 21st birthday at Studio 54"] },
          { title: "Lagerfeld party", names: ["Lagerfeld party at Studio 54"] },
          { title: "Bow Wow Wow", names: ["Bow Wow Wow at Studio 54"] },
          { title: "Nora's first night", names: ["Nora's first night at Studio 54"] },
        ],
      },
    ],
    looks: ["Studio 54's entranceway", "Studio 54's moon and spoon", "Man's trapeze look at Studio 54", "Young Musto's Studio 54 look", "Eric's homemade outfits for Studio 54", "Quaaludes at Studio 54"],
  },
  limelight: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Opening night", names: ["Limelight opening"] },
          { title: "The Jacksons' tour party", names: ["The Jacksons' tour party at the Limelight"] },
          { title: "Vivienne Westwood show", names: ["Vivienne Westwood show at the Limelight"] },
          { title: "The vodka cranberry in the Library", names: ["The vodka cranberry at the Limelight library"] },
        ],
      },
    ],
    looks: ["The crucifix carried into the Limelight", "Walt the dragonfly on the Limelight stage", "Nikki's yellow dress at the Limelight", "Paper fashion show at Limelight"],
  },
  danceteria: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Bad Boy nights", names: ["Bad Boy nights at Danceteria"] },
          { title: "Filthy Mouth Contest", names: ["Filthy Mouth Contest (Danceteria)"] },
          { title: "Andy and Edie Show", names: ["Andy and Edie Show at Danceteria"] },
          { title: "Moby's epiphany", names: ["Moby's Danceteria epiphany"] },
          { title: "Jesus Christ Superstar lip-sync opera", names: ["Jesus Christ Superstar lip-sync opera at Danceteria"] },
          { title: "The after-hours bust", names: ["Danceteria's after-hours bust"] },
          { title: "Andy Anderson's show", names: ["Andy Anderson's show at Danceteria"] },
          { title: "The Desperately Seeking Susan shoot", names: ["The Danceteria shoot for Desperately Seeking Susan"] },
        ],
      },
    ],
    looks: ["Danceteria's logo", "Keith Haring's black-and-white Danceteria floor"],
  },
  tunnel: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Sunday hip-hop night", names: ["Tunnel Sunday hip-hop night"] },
          { title: "Game show", names: ["Game show at the Tunnel"] },
          { title: "Fashion show", names: ["Fashion show at the Tunnel"] },
        ],
      },
    ],
    looks: ["Club Kids' Halloween costumes in the Tunnel basement", "Voguers with trophies at the Tunnel"],
  },
  "pyramid-club": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Straight to Hell night", names: ["Straight to Hell night at the Pyramid"] },
          { title: "Float at the Pride parade", names: ["Pyramid float at the Pride parade"] },
          { title: "Titus Andronicus", names: ["Titus Andronicus (Kestutis Nakas, Pyramid)"] },
          { title: "Book launch", names: ["Pyramid book launch"] },
        ],
      },
    ],
    looks: ["Pyramid drag: funny, not pretty", "Pyramid drag: trying to look like drag queens", "Trey's Pyramid drag: uptown pretty"],
  },
  palladium: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Opening night", names: ["Palladium opening night"] },
          { title: "Liberace party", names: ["Liberace party at the Palladium"] },
          { title: "Gaultier lookalike contest", names: ["Gaultier lookalike contest at the Palladium"] },
          { title: "Zigzag New Year's Eve", names: ["Zigzag New Year's Eve at the Palladium"] },
          { title: "Grace Jones party", names: ["Grace Jones party at the Palladium"] },
          { title: "Fabulous 500", names: ["Fabulous 500 (Jojo's birthday at the Palladium)"] },
          { title: "New Millionaires Club show", names: ["New Millionaires Club at the Palladium"] },
          { title: "Broadway Cares benefit", names: ["Broadway Cares benefit at the Palladium"] },
        ],
      },
    ],
    looks: ["Palladium generator room", "Palladium glass steps lit from below", "James's Norma Kamali gown at the Palladium opening"],
  },
  "boy-bar": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Miss Boy Bar pageant", names: ["Miss Boy Bar pageant"] },
          { title: "Thursday shows", names: ["Boy Bar shows"] },
        ],
      },
    ],
    looks: ["Boy Bar's supermodel drag", "Miss Guy's first Boy Bar look", "ACT UP's hot recruiting team at Boy Bar"],
  },
  "club-57": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Comedy night", names: ["Club 57 comedy night"] },
          { title: "At MoMA", names: ["Club 57 exhibition at MoMA"] },
        ],
      },
    ],
    looks: ["Atomic-age retro at Club 57", "Club 57's spaceship for the salute to NASA", "Club 57 pop versus Mudd Club black"],
  },
  "nell-s": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Ghost party", names: ["Ghost party at Nell's"] },
          { title: "AIDS benefit", names: ["AIDS benefit at Nell's"] },
        ],
      },
    ],
    looks: ["Old gentleman's club look at Nell's"],
  },
  "paradise-garage": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Closing weekend", names: ["Paradise Garage closing weekend"] },
        ],
      },
    ],
  },
  "club-usa": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Bump", names: ["Bump (Club USA)"] },
          { title: "Welcome video", names: ["Club USA's welcome video"] },
        ],
      },
    ],
    looks: ["Club USA's giant slide"],
  },
  roxy: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Locomotion Saturdays", names: ["Locomotion (Roxy Saturdays)"] },
          { title: "House of Field ball", names: ["House of Field ball at the Roxy"] },
        ],
      },
    ],
    looks: ["Roxy muscle queens, shirts off", "Peter Allen shirtless at the Roxy"],
  },
  world: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Opening night", names: ["The World's opening night"] },
          { title: "Steve Lewis's door rules", names: ["Steve Lewis's door rules at the World"] },
          { title: "Christina and Junior Take Over the World", names: ["Christina and Junior Take Over the World"] },
        ],
      },
    ],
    looks: ["Madonna in sweats at the World door", "James as 'boy James' at the World door"],
  },
  copacabana: {
    groups: [],
    looks: ["Copa glamour", "Copa Girls' pastel hair"],
  },
  "peppermint-lounge": {
    groups: [],
    looks: ["Bleach-blonde waterfall hairdos at the Peppermint Lounge"],
  },
  "jackie-60": {
    groups: [
      {
        heading: "Theme nights",
        parts: [
          { title: "Theme nights", names: ["Jackie 60 theme nights"] },
          { title: "Boys' nights", names: ["Jackie 60 boys' nights"] },
        ],
      },
    ],
  },
  "red-zone": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "The Anna Banana party", names: ["The Anna Banana party at Red Zone"] },
          { title: "House of Ecstasy ball", names: ["House of Ecstasy ball at Red Zone"] },
        ],
      },
    ],
    looks: ["Rebecca on a white horse at Red Zone"],
  },
  squeezebox: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Hedwig workshop", names: ["Squeezebox's Hedwig workshop"] },
        ],
      },
    ],
  },
  mars: {
    groups: [],
    looks: ["Voguing houses on the Mars first floor"],
  },
  xenon: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Kennedy party", names: ["Kennedy party at Xenon"] },
          { title: "Christmas party for orphans", names: ["Xenon Christmas party for orphans"] },
        ],
      },
    ],
  },
  "gilded-grape": {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Miss Gilded Grape pageant", names: ["Miss Gilded Grape pageant"] },
        ],
      },
    ],
  },
  quick: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Panty Girdle", names: ["Panty Girdle (Quick)"] },
        ],
      },
    ],
  },
  building: {
    groups: [
      {
        heading: "Nights and parties",
        parts: [
          { title: "Groove Thing", names: ["Groove Thing (The Building)"] },
          { title: "Topless Night", names: ["Topless Night at The Building"] },
        ],
      },
    ],
  },
  hurrah: {
    groups: [],
    looks: ["Saint Laurent fantasy look at Hurrah"],
  },
  "club-82": {
    groups: [],
    looks: ["Tomato dress at Club 82"],
  },
};

/** Every row name that folds into a club -> the club's slug. */
/** Rows about a club's nights as a whole ("Area theme nights and invitations"): they still fold into the club's card. */
export const INTRO_NAMES: [string, string][] = Object.entries(CLUB_PARTS).flatMap(([club, p]) =>
  p.groups.flatMap((g) => (g.intro ?? []).map((n) => [n, club] as [string, string])),
);

/** Every night, theme night and party gets its own page again (Lisa, 27 Nov 2026: "club night and theme nights need
 *  their own pages, eg closing weekend at paradise", then "All 78 nights and parties"). One page per tile: the tile's
 *  first row names the page, its other rows join it, and the club page's tile links there. */
export type NightPart = { club: string; title: string; heading: string; names: string[] };
export const NIGHT_PARTS: NightPart[] = Object.entries(CLUB_PARTS).flatMap(([club, p]) =>
  p.groups.flatMap((g) => g.parts.map((x) => ({ club, title: x.title, heading: g.heading, names: x.names }))),
);

/** The sticker on a night's page header. */
export const nightKind = (heading: string, title: string): string =>
  /theme/i.test(heading) ? "Theme night" : heading === "Parties" || /party|benefit|ball|opening|closing/i.test(title) ? "Party" : "Club night";

export const PART_NAMES: [string, string][] = Object.entries(CLUB_PARTS).flatMap(([club, p]) =>
  p.groups.flatMap((g) => [...(g.intro ?? []), ...g.parts.flatMap((x) => x.names)].map((n) => [n, club] as [string, string])),
);
