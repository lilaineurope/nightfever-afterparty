// Magazines and newspapers on their Library item pages (Lisa, 21 Nov 2026: "publications - add a box where you can buy it?
// what else can we do with publications" - she picked: a back-issues "Find me, buy me", the issues the guests talk about,
// and the masthead in "Who made me").
// - founded / by: from the publication's own published history (only well-documented founders, nothing guessed).
// - team: the guests and people on the site who worked there, in the guest's own words on the show (episode + time).
// - issues: the actual issues and covers a guest talks about on the show. `date` only where the issue is documented.
// Keyed by A–Z card slug (tested in src/data/item-quotes.test.ts).

export type PressPerson = {
  role: string;
  name: string;
  /** What they did there, short. */
  note?: string;
  /** The moment on the show that says so. */
  episode?: string;
  time?: string;
};

export type PressIssue = {
  /** The cover line: what was on it, in the guest's words. */
  what: string;
  date?: string;
  episode: string;
  time: string;
  /** Search words for that exact issue on eBay (title + date or cover star). */
  search: string;
  /** Its own issue page (src/data/issues.ts, /issues/<page>): the typed cover links there. */
  page?: string;
};

export type PressFacts = {
  founded?: string;
  by?: string[];
  /** Years it ran, when it has stopped. */
  ran?: string;
  /** A website, not a printed paper: no back issues to buy. */
  online?: boolean;
  /** Search words for back issues when the name alone is too loose. */
  query?: string;
  team?: PressPerson[];
  issues?: PressIssue[];
};

export const PRESS: Record<string, PressFacts> = {
  paper: {
    founded: "1984",
    by: ["Kim Hastreiter", "David Hershkovits"],
    query: "Paper magazine New York 1980s",
    team: [
      { role: "Employee number one", name: "Trey Speegle", note: "did the art for the first issue's giant fold-out", episode: "s04e07", time: "00:51:20" },
      { role: "Intern who never left", name: "Mickey Boardman", note: "came from Parsons, took over the phones and stayed", episode: "s04e02", time: "00:00:41" },
      { role: "Columnist", name: "Lauren Ezersky", note: "Lunch with Lauren, every month for eight or nine years", episode: "s04e06", time: "00:07:14" },
    ],
    issues: [{ what: "The first issue, with Trey's giant fold-out", date: "1984", episode: "s04e07", time: "00:51:20", search: "Paper magazine first issue 1984" }],
  },
  "vogue-magazine": {
    founded: "1892",
    by: ["Arthur Baldwin Turnure"],
    query: "Vogue magazine vintage",
    team: [
      { role: "Editor", name: "William Norwich", note: "while still writing his column", episode: "s06e08", time: "00:00:37" },
      { role: "Started there at 21", name: "Trey Speegle", note: "borrowed from the fashion closet, later fired", episode: "s04e07", time: "00:05:39" },
    ],
  },
  details: {
    founded: "1982",
    by: ["Annie Flanders"],
    query: "Details magazine Annie Flanders",
    team: [
      { role: "Writer from 1982", name: "Michael Musto", episode: "s01e02", time: "00:14:01" },
      { role: "Nightlife writer", name: "Stephen Saban", note: "wrote up Eric Goode and Brian Belovitch", episode: "s03e06", time: "00:11:10" },
      { role: "Writer", name: "Chi Chi Valenti", note: "her first big piece, Nations, late 1988", episode: "s06e03", time: "00:34:08" },
    ],
    issues: [{ what: "Michael Schmidt's chain-mail dress on the cover", episode: "s02e06", time: "00:08:47", search: "Details magazine Michael Schmidt chain mail cover" }],
  },
  "interview-magazine": {
    founded: "1969",
    by: ["Andy Warhol"],
    query: "Interview magazine Andy Warhol",
    team: [{ role: "Writer", name: "Michael Musto", note: "after meeting Bob Colacello", episode: "s01e02", time: "00:09:12" }],
  },
  "village-voice": {
    founded: "1955",
    by: ["Dan Wolf", "Ed Fancher", "Norman Mailer"],
    query: "Village Voice newspaper",
    team: [
      { role: "Columnist for decades", name: "Michael Musto", note: "La Dolce Musto", episode: "s01e02", time: "00:01:56" },
      { role: "Started in classified ads", name: "Lynn Yaeger", episode: "s04e02", time: "00:36:46" },
    ],
    issues: [{ what: "The relaunch's first issue as a quarterly, with Musto writing", date: "2021", episode: "s01e02", time: "00:01:56", search: "Village Voice 2021 relaunch issue" }],
  },
  "vanity-fair": {
    founded: "1913, back in 1983",
    query: "Vanity Fair magazine",
    team: [{ role: "Trey's next job", name: "Trey Speegle", note: "his Polaroid of John Sex ran there; he wrote up the Pyramid", episode: "s04e07", time: "00:16:14" }],
    issues: [
      { what: "Leonardo DiCaprio on the cover, the month he came to the party", episode: "s04e08", time: "00:44:25", search: "Vanity Fair Leonardo DiCaprio cover" },
      { what: "Beyoncé in Zaldy's dress on the music-issue cover", episode: "s04e04", time: "00:25:29", search: "Vanity Fair music issue Beyonce cover" },
    ],
  },
  "new-york-post": {
    founded: "1801",
    by: ["Alexander Hamilton"],
    team: [{ role: "Columnist, two years", name: "William Norwich", episode: "s06e08", time: "00:06:09" }],
    issues: [
      { what: "Dianne Brill with the lotto numbers and no headline", episode: "s01e01", time: "00:39:42", search: "New York Post Dianne Brill cover" },
      { what: "\"Andy Warhol dead at 58\"", date: "23 Feb 1987", episode: "s04e07", time: "00:55:31", search: "New York Post February 23 1987 Warhol" },
      { what: "\"Bring On the Night\": Lincoln Palsgrove and Tony Senecal at the door", date: "1990", episode: "s06e06", time: "00:29:28", search: "New York Post 1990 Bring On the Night clubs" },
    ],
  },
  "new-york-daily-news": {
    founded: "1919",
    by: ["Joseph Medill Patterson"],
    team: [{ role: "Columnist, six years", name: "William Norwich", note: "the Uptown column, then his own", episode: "s06e08", time: "00:01:01" }],
  },
  "new-york-times": {
    founded: "1851",
    by: ["Henry Jarvis Raymond", "George Jones"],
    team: [{ role: "Writer", name: "William Norwich", note: "between his two stints at Vogue", episode: "s06e08", time: "00:00:37" }],
  },
  "women-s-wear-daily": {
    founded: "1910",
    by: ["Edmund Fairchild"],
    team: [{ role: "Photographer", name: "Dustin Pittman", note: "under John Fairchild", episode: "s04e05", time: "00:43:55" }],
  },
  "project-x": {
    query: "Project X magazine club kids",
    team: [
      { role: "Writer", name: "James St. James", note: "first interviewed Amanda Lepore for it", episode: "s05e03", time: "00:06:15" },
      { role: "Michael's man there", name: "Ernie Glam", note: "his representative at the magazine by day", episode: "s01e05", time: "00:14:58" },
    ],
    issues: [
      { what: "Larry Tee on the cover of the second issue", episode: "s03e08", time: "00:06:53", search: "Project X magazine Larry Tee" },
      { what: "Christopher Comp, cover boy", episode: "s05e07a", time: "00:01:26", search: "Project X magazine club kids cover" },
    ],
  },
  "new-york-magazine": {
    founded: "1968",
    by: ["Clay Felker", "Milton Glaser"],
    query: "New York magazine",
    issues: [{ what: "The fold-out drag cover with Linda Simpson on it", episode: "s02e09", time: "00:58:00", search: "New York magazine drag fold-out cover 1990s" }],
  },
  playboy: {
    founded: "1953",
    by: ["Hugh Hefner"],
    query: "Playboy magazine",
    issues: [{ what: "Bebe Buell, Playmate of the Month", date: "Nov 1974", episode: "s04e03", time: "00:00:36", search: "Playboy November 1974 Bebe Buell" }],
  },
  "my-comrade": {
    founded: "1987",
    by: ["Linda Simpson"],
    ran: "1987–1994, back in 2004",
    query: "My Comrade zine Linda Simpson",
    team: [{ role: "Founder and editor", name: "Linda Simpson", note: "about ten issues", episode: "s02e09", time: "00:00:40" }],
  },
  outweek: {
    founded: "1989",
    by: ["Gabriel Rotello", "Kendall Morrison"],
    ran: "1989–1991",
    query: "OutWeek magazine",
    team: [
      { role: "Helped found and edit it", name: "Michelangelo Signorile", episode: "s02e08", time: "00:41:35" },
      { role: "Columnist", name: "James St. James", episode: "s06e01", time: "00:33:23" },
    ],
    issues: [{ what: "The Malcolm Forbes cover that made headlines everywhere", date: "March 1990", episode: "s02e08", time: "00:46:01", search: "OutWeek Malcolm Forbes 1990", page: "outweek-no-38" }],
  },
  "rolling-stone": {
    founded: "1967",
    by: ["Jann Wenner", "Ralph J. Gleason"],
    query: "Rolling Stone magazine",
    issues: [
      { what: "Rihanna in Michael Schmidt's mesh Daisy Dukes", episode: "s02e06", time: "00:33:16", search: "Rolling Stone Rihanna cover" },
      { what: "Electroclash on the cover", episode: "s03e08", time: "00:50:50", search: "Rolling Stone electroclash" },
    ],
  },
  "soho-weekly-news": {
    founded: "1973",
    by: ["Michael Goldstein"],
    ran: "1973–1982",
    query: "SoHo Weekly News",
    team: [
      { role: "Where he started", name: "Michael Musto", episode: "s01e02", time: "00:06:12" },
      { role: "Nightlife writer", name: "Stephen Saban", episode: "s03e06", time: "00:11:10" },
    ],
  },
  "straight-to-hell": {
    by: ["Boyd McDonald"],
    query: "Straight to Hell Boyd McDonald",
    issues: [{ what: "A 19-year-old Trey Speegle, shirtless in a photo booth", episode: "s04e07", time: "00:17:47", search: "Straight to Hell Boyd McDonald magazine" }],
  },
  "melody-maker": {
    founded: "1926",
    query: "Melody Maker",
    issues: [{ what: "Jayne County on the cover", episode: "s02e02", time: "00:55:13", search: "Melody Maker Jayne County" }],
  },
  "new-york-talk": {
    team: [
      { role: "Nightlife columnist", name: "Sally Randall", episode: "s06e07", time: "00:30:56" },
      { role: "Took over her column", name: "James St. James", note: "his first try at writing", episode: "s06e07", time: "00:30:56" },
    ],
  },
  creem: {
    founded: "1969",
    by: ["Barry Kramer", "Tony Reay"],
    query: "Creem magazine",
    team: [{ role: "Wrote a column or two", name: "Cherry Vanilla", note: "from London", episode: "s03e05", time: "00:47:55" }],
  },
  circus: { query: "Circus magazine rock", team: [{ role: "Photo editor", name: "Christopher Makos", episode: "s05e06", time: "00:14:56" }] },
  "houston-city-magazine": { team: [{ role: "Art director at 19", name: "Trey Speegle", note: "started there at 17", episode: "s04e07", time: "00:04:50" }] },
  playgirl: { founded: "1973", query: "Playgirl magazine", team: [{ role: "Creative director of the relaunch", name: "Mickey Boardman", episode: "s04e02", time: "00:02:22" }] },
  "new-york-observer": {
    founded: "1987",
    by: ["Arthur L. Carter"],
    team: [
      { role: "Weekly writer", name: "William Norwich", episode: "s06e08", time: "00:51:13" },
      { role: "Sex and the City columnist", name: "Candace Bushnell", episode: "s04e09", time: "01:02:57" },
    ],
  },
  nightlife: { team: [{ role: "Gossip columnist", name: "Michelangelo Signorile", episode: "s02e08", time: "00:16:53" }] },
  "time-out-new-york": { founded: "1995", query: "Time Out New York", team: [{ role: "On staff in the late 90s", name: "Linda Simpson", note: "its glory years", episode: "s02e09", time: "00:36:29" }] },
  "wow-report": {
    online: true,
    team: [{ role: "Co-editors for ten years", name: "Trey Speegle", note: "with James St. James", episode: "s04e07", time: "00:00:50" }],
  },
  "tv-star-parade": { query: "TV Star Parade magazine", team: [{ role: "First job", name: "Michael Musto", episode: "s01e02", time: "00:07:26" }] },
  newsday: {
    founded: "1940",
    by: ["Alicia Patterson", "Harry Guggenheim"],
    team: [{ role: "Columnist", name: "James Revson", note: "his column broke Suzygate", episode: "s02e08", time: "00:28:05" }],
  },
  "hx-magazine": {
    query: "HX magazine New York",
    issues: [{ what: "Kevin Aviance's third HX Pride cover, a circus theme", date: "2006", episode: "s03e03", time: "00:28:54", search: "HX magazine Kevin Aviance cover" }],
  },
  face: {
    founded: "1980",
    by: ["Nick Logan"],
    query: "The Face magazine",
    issues: [{ what: "Chicks on Speed on the cover", episode: "s03e08", time: "00:49:38", search: "The Face magazine Chicks on Speed" }],
  },
  time: {
    founded: "1923",
    by: ["Briton Hadden", "Henry Luce"],
    query: "Time magazine",
    issues: [{ what: "Laverne Cox: \"The Transgender Tipping Point\"", date: "9 June 2014", episode: "s02e05", time: "00:36:26", search: "Time magazine June 9 2014 Laverne Cox" }],
  },
  "seattle-times": {
    founded: "1891",
    issues: [{ what: "Denise's cover story on the mailboxes, eight pages in the Sunday magazine", episode: "s05e07b", time: "00:59:04", search: "Seattle Times Sunday magazine mailboxes" }],
  },
  "i-d": { founded: "1980", by: ["Terry Jones"], query: "i-D magazine" },
  "dazed-and-confused": { founded: "1991", by: ["Jefferson Hack", "Rankin"], query: "Dazed & Confused magazine" },
  "punk-magazine": { founded: "1975", by: ["John Holmstrom", "Legs McNeil", "Ged Dunn"], query: "Punk magazine Holmstrom" },
  "east-village-eye": { founded: "1979", by: ["Leonard Abrams"], ran: "1979–1987", query: "East Village Eye" },
  visionaire: { founded: "1991", by: ["Stephen Gan", "Cecilia Dean", "James Kaliardos"], query: "Visionaire" },
  "w-magazine": { founded: "1972", by: ["John Fairchild"], query: "W magazine" },
  spy: { founded: "1986", by: ["Kurt Andersen", "Graydon Carter", "Thomas L. Phillips Jr."], query: "Spy magazine" },
  "wall-street-journal": { founded: "1889", by: ["Charles Dow", "Edward Jones", "Charles Bergstresser"] },
  gawker: { founded: "2002", by: ["Nick Denton"], online: true },
  gothamist: { founded: "2003", by: ["Jake Dobkin", "Jen Chung"], online: true },
  artnet: { online: true },
  "club-kid-cards": { query: "Club Kid trading cards" },
};

// Who publishes it (Lisa, 22 Nov 2026: every publication page gets its publisher, like the books). The publishing house or
// owner in the years the guests talk about, then today's where it changed ("Annie Flanders, then Condé Nast"). From each
// publication's own history (Wikipedia infobox and the publisher's site), checked 22 Nov 2026. Keyed by A–Z card slug.
export const PUBLISHERS: Record<string, string> = {};
