// Connections on Library item pages (Lisa, 21 Nov 2026): what a book became on screen, and which paper a column ran in.
// Keyed by the exact A–Z names. Only real links: a film counts as "made from the book" only when it is based on it.

/** Book -> films and TV made from it (or telling the same story), shown under "From page to screen"; the film's page links back. */
export const ON_SCREEN: Record<string, { name: string; note: string }[]> = {
  "Disco Bloodbath / Party Monster (James St. James)": [
    { name: "Party Monster (2003)", note: "World of Wonder's 2003 film of the book" },
    { name: "Party Monster: The Shockumentary", note: "World of Wonder's 1998 documentary of the same story" },
  ],
};

/** Column -> the paper or magazine it ran in (its Library card). Columns named "(… column)" or "(Writer, Paper)" are matched by
 *  name in src/lib/library-item.server.ts; these are the ones whose name doesn't say it. */
export const COLUMN_PAPER: Record<string, string> = {
  "Lunch with Lauren (Paper column)": "Paper",
  "Fat and All That (Paper column)": "Paper",
  "'Diary of a Mad Queen' (column)": "OutWeek",
  "Ms. Lonely Hearts": "SoHo Weekly News",
  "Page Six (New York Post)": "New York Post",
  "Uptown, Downtown (Daily News column)": "New York Daily News",
  "Nations (Chi Chi Valenti, Details)": "Details",
  "New York magazine – 'Club Kids'": "New York magazine",
  "Out magazine – 'The Glass Closet'": "Out (magazine)",
  "'Bring On the Night' (New York Post, 1990)": "New York Post",
  "Venus Envy (Donald Suggs, Village Voice)": "Village Voice",
};
