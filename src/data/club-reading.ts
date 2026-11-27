// "Read about it" on club pages (Lisa, 27 Nov 2026, "library connections ... books, magazines", option L2): the Library
// books, diaries, magazines and newspapers a guest ties to the club, each with the moment it comes up. Hand-checked, not
// matched by name: a book only goes here when the moment really connects it to the club (The Andy Warhol Diaries stay off
// the Mudd Club - James only compares Richard's book to them; Alice in Wonderland stays off Area - it is a theme night).
// name = the exact A–Z / Library name; episode + time = one of that item's own moments (src/data/club-reading.test.ts).

export type ClubRead = { name: string; episode: string; time: string };

export const CLUB_READING: Record<string, ClubRead[]> = {
  cbgb: [{ name: "Ann Magnuson's journals", episode: "s04e10", time: "00:07:37" }],
  "mudd-club": [
    { name: "The Mudd Club, the book (Richard Boch)", episode: "s02e11", time: "00:01:19" },
    { name: "Richard Boch's journals", episode: "s02e11", time: "00:03:00" },
    { name: "Nora Burns's diaries (1980)", episode: "s06e05", time: "00:03:10" },
  ],
  limelight: [{ name: "More 80s Polaroids (Trey Speegle)", episode: "s04e07", time: "00:54:43" }],
  danceteria: [
    { name: "New York Daily News", episode: "s01e07", time: "00:24:15" },
    { name: "New York Post", episode: "s01e07", time: "00:24:15" },
  ],
  "pyramid-club": [
    { name: "We Started a Nightclub (Pyramid book)", episode: "s05e08", time: "00:27:58" },
    { name: "80s Polaroids (Trey Speegle)", episode: "s04e07", time: "00:00:29" },
    { name: "Vanity Fair", episode: "s04e07", time: "00:16:14" },
    { name: "Miss Guy's journals (1989)", episode: "s03e10", time: "00:32:45" },
  ],
  palladium: [
    { name: "James St. James's diaries (1981–91)", episode: "s06e07", time: "00:02:04" },
    { name: "Vogue magazine", episode: "s06e07", time: "00:03:47" },
    { name: "Interview magazine", episode: "s06e06", time: "00:10:50" },
  ],
  "club-57": [
    { name: "Club 57: Film, Performance, and Art in the East Village", episode: "s05e08", time: "00:28:16" },
    { name: "Life As Art: The Club 57 Story", episode: "s04e10", time: "00:34:55" },
    { name: "We Started a Nightclub (Pyramid book)", episode: "s04e10", time: "00:23:16" },
  ],
  "paradise-garage": [{ name: "James St. James's diaries (1981–91)", episode: "s02e08", time: "00:17:02" }],
  roxy: [
    { name: "Nora Burns's diaries (1980)", episode: "s06e05", time: "00:03:10" },
    { name: "Miss Guy's journals (1989)", episode: "s03e10", time: "00:32:45" },
  ],
  mars: [
    { name: "Porcelain (Moby memoir)", episode: "s01e09", time: "00:09:17" },
    { name: "Interview magazine", episode: "s01e09", time: "00:18:15" },
  ],
  robots: [{ name: "James St. James's diaries (1981–91)", episode: "s06e06", time: "00:16:19" }],
  xenon: [{ name: "Nora Burns's diaries (1980)", episode: "s06e05", time: "00:03:10" }],
  building: [{ name: "Miss Guy's journals (1989)", episode: "s03e10", time: "00:32:45" }],
};
