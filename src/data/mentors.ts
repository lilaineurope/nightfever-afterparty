// Mentors (Lisa, 28 Oct 2026): who took whom under their wing on the scene, as the guests tell it.
// One line per mentor -> mentee link, with the episode and the moment it is said. The home page's Hall of Fame ranks the mentors
// by how many people they mentored (links), then by how often they are mentioned across all Afterparties (mentions).
// EVERY new Afterparty: read `npx tsx scripts/check-episode.ts <id> <transcript>` section MENTORS (mentor, under his wing,
// discovered, first job, taught, showed him how, introduced her to...) and add the real ones here - names exactly as their A–Z cards.
// Michael Alig is left out of the Hall of Fame (Lisa, 28 Oct 2026: a controversial name - no extra space), though his links are kept.

export type MentorLink = { mentor: string; mentee: string; episode: string; time: string; line: string };

export const MENTOR_LINKS: MentorLink[] = [
  { mentor: "Michael Musto", mentee: "James St. James", episode: "s06e01", time: "00:18:30", line: "James's early mentor and plus-one" },
  { mentor: "Michael Musto", mentee: "Larry Tee", episode: "s03e08", time: "00:18:35", line: "Got Larry and friends into Keith Haring's parties and Warhol's book signings" },
  { mentor: "Sylvia Miles", mentee: "Michael Musto", episode: "s01e02", time: "00:07:15", line: "An early mentor who taught Musto the social game" },
  { mentor: "Stephen Saban", mentee: "Michael Musto", episode: "s01e02", time: "00:08:36", line: "Musto calls him a mentor" },
  { mentor: "Stephen Saban", mentee: "Eric Goode", episode: "s03e06", time: "00:11:10", line: "Championed Eric and wrote up the Club with No Name" },
  { mentor: "Michelangelo Signorile", mentee: "Michael Musto", episode: "s01e02", time: "00:21:25", line: "Mentored Musto's political turn" },
  { mentor: "Jojo Americo", mentee: "Waltpaper", episode: "s01e06", time: "00:27:53", line: "Took Walt under his wing" },
  { mentor: "Linda Simpson", mentee: "Waltpaper", episode: "s01e06", time: "00:18:32", line: "Discovered Walt and gave him his first job" },
  { mentor: "Bo Allen (as heard)", mentee: "Joey Arias", episode: "s01e10", time: "00:09:05", line: "Joey's mentor in LA" },
  { mentor: "Waltpaper", mentee: "Jenny Dembrow aka Jenny Talia", episode: "s02e07", time: "00:03:38", line: "Took Jenny under his wing" },
  { mentor: "Patricia Field", mentee: "Jenny Dembrow aka Jenny Talia", episode: "s02e07", time: "00:05:12", line: "Jenny worked at Pat Field's at 16" },
  { mentor: "Victoria Bartlett (Sticky Vicky)", mentee: "Zaldy", episode: "s04e04", time: "00:19:10", line: "Pushed Zaldy into modelling and introduced him to Steven Klein" },
  { mentor: "James St. James", mentee: "Richie Rich", episode: "s04e08", time: "00:00:10", line: "Spotted Richie in FAD Magazine and put him on the Project X list" },
  { mentor: "Susanne Bartsch", mentee: "Richie Rich", episode: "s04e08", time: "00:41:13", line: "Booked Richie for her parties and made him her assistant" },
  { mentor: "Luciano Anselmino", mentee: "Christopher Makos", episode: "s05e06", time: "00:22:53", line: "Took Makos under his wing" },
  { mentor: "Anita Sarko", mentee: "Chi Chi Valenti & Johnny Dynell", episode: "s06e03", time: "00:05:41", line: "Showed Johnny how to DJ for his first Saturday night" },
  { mentor: "Keni Valenti", mentee: "Chi Chi Valenti & Johnny Dynell", episode: "s06e03", time: "00:15:36", line: "Helped Chi Chi sew and cut her first looks" },
  { mentor: "Nelson Sullivan", mentee: "Larry Tee", episode: "s03e08", time: "00:11:12", line: "Larry and friends lived with him; he got them in everywhere" },
  { mentor: "Edit deAk", mentee: "Sally Randall", episode: "s06e07", time: "00:17:54", line: "Sally's teacher at SVA, who took her to her first club" },
  { mentor: "Haoui Montaug", mentee: "Michael Schmidt", episode: "s02e06", time: "00:03:45", line: "Introduced Michael to Vicki Sarge and the Erickson Beamon crowd" },
  { mentor: "Sally Randall", mentee: "Lady Miss Kier", episode: "s06e07", time: "00:45:58", line: "Encouraged Kier to sing" },
  { mentor: "James Russo", mentee: "Ann Magnuson", episode: "s04e10", time: "00:52:51", line: "Introduced Ann to casting director Mary Goldberg" },
  { mentor: "Bob Holman", mentee: "Ann Magnuson", episode: "s04e10", time: "00:23:36", line: "Introduced Ann to Tom Scully at CBGB" },
  { mentor: "Holland Taylor", mentee: "William Norwich", episode: "s06e08", time: "00:11:49", line: "Introduced Billy to Liz Smith" },
  { mentor: "Michael Alig", mentee: "Waltpaper", episode: "s01e06", time: "00:16:33", line: "Walt's mentor once they bonded at the Limelight" },
  { mentor: "Michael Alig", mentee: "Jenny Dembrow aka Jenny Talia", episode: "s02e07", time: "00:02:04", line: "Took Jenny into his band of revelers" },
  { mentor: "Michael Alig", mentee: "Richie Rich", episode: "s04e08", time: "00:06:37", line: "Took Richie under his wing" },
];

/** Names kept out of the Hall of Fame (their links stay in the data). */
export const NOT_IN_HALL_OF_FAME = new Set(["Michael Alig"]);
