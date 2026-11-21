// Column pages (Lisa, 21 Nov 2026: "find all the articles they published and list them in the column pages").
// Every column on the Library's Columns & articles shelf that has a page of its own lists the pieces that ran under it,
// in order: date, issue and page where known, and the headline - or, where the column ran without headlines, a one-line
// subject of our own taken from the opening paragraph (marked `ours`).
// Sources, researched 21 Nov 2026. Each line links to where the piece can be read (Lisa's exception to the outside-links rule):
// - Diary of a Mad Queen: every OutWeek issue 36-105 read from the scanned run at outweek.net/pdfs/ow_N.pdf (contents page
//   + the column itself). It ran every other week, taking turns with "Out on the Town"; not in the 79/80 double issue or No. 99.
// - Fat and All That: Paper's own site (papermag.com tag "fat-and-all-that" and a search for the column's standfirst).
// - Lunch with Lauren and Ms. Lonely Hearts: Paper's 1990s print issues and the SoHo Weekly News are not online anywhere,
//   so their lists hold only what is known for sure and say so.

export type ColumnArticle = {
  /** As printed: "19 Dec 1990". */
  date?: string;
  /** "No. 77 · p. 47" */
  issue?: string;
  title: string;
  /** The column ran without headlines: the title is our one-line subject from the opening, not a printed headline. */
  ours?: boolean;
  note?: string;
  /** Where it can be read: the line opens it in a new tab. Lisa, 21 Nov 2026: "make each column clickable and connect to the
   *  article" - her exception to the outside-links rule, for these column lists only. */
  source?: string;
};

export type ColumnPage = {
  writer: string;
  publication: string;
  /** "Dec 1990 – Jul 1991" */
  ran: string;
  /** "every other week" */
  how: string;
  complete: boolean;
  /** One line under the list: how the list was made, or why it is short. */
  about: string;
  articles: ColumnArticle[];
  /** The kind the "Suggest a source" box stores this column under (fan_suggestions.kind, max 20 characters). */
  suggestKind: string;
};

// The scan opens straight at the column: the PDF page holding it, found from each scan's page tree (21 Nov 2026) - it can
// differ from the printed page number where a scan has extra pages (No. 105: printed p. 108 is PDF page 110).
const OW = (n: string, page: number) => `http://outweek.net/pdfs/ow_${n}.pdf#page=${page}`;
const PM = (s: string) => `https://www.papermag.com/${s}`;

export const COLUMN_PAGES: Record<string, ColumnPage> = {
  "diary-of-a-mad-queen": {
    suggestKind: "Mad Queen",
    writer: "James St. James",
    publication: "OutWeek",
    ran: "Dec 1990 – Jul 1991",
    how: "every other week, until OutWeek closed",
    complete: true,
    about:
      "Every OutWeek from No. 36 to the last issue, No. 105, checked page by page. The columns ran without headlines (No. 95 is the one exception), so each line here is the column's subject in a few words.",
    articles: [
      { date: "19 Dec 1990", issue: "No. 77 · p. 47", ours: true, title: "The first column: caught on video in a bathroom stall at Larry Tee's Mindbender. \"My name, by the way, is James St. James.\"", source: OW("77", 47) },
      { date: "16 Jan 1991", issue: "No. 81 · p. 46", ours: true, title: "A Special K trip that ends in hospital. \"Special K is the devil's candy.\"", source: OW("81", 44) },
      { date: "30 Jan 1991", issue: "No. 83 · p. 48", ours: true, title: "Taping The Joan Rivers Show's \"freaks\" episode with Leigh Bowery, Amanda and Ernie Glam, then a night in the Bronx", source: OW("83", 48) },
      { date: "13 Feb 1991", issue: "No. 85 · p. 59", ours: true, title: "\"Naked and hairless\" after the Epilady, and six years of stumbling through life drunk", source: OW("85", 59) },
      { date: "27 Feb 1991", issue: "No. 87 · p. 47", ours: true, title: "The club is pumping and the pretty boys run from the makeup: boredom, loneliness and the drug du jour", source: OW("87", 47) },
      { date: "13 Mar 1991", issue: "No. 89 · p. 51", ours: true, title: "Abdul the cab driver and the \"bloody Valentine look\"", source: OW("89", 51) },
      { date: "27 Mar 1991", issue: "No. 91 · p. 48", ours: true, title: "\"I have a confession to make\": blanking out, and a little boy who spoke in strange grown-up sentences", source: OW("91", 48) },
      { date: "10 Apr 1991", issue: "No. 93 · p. 54", ours: true, title: "Back down the rabbit hole: three days under the sink, dreaming of slumber parties at Pat Buckley's", source: OW("93", 54) },
      { date: "24 Apr 1991", issue: "No. 95 · p. 53", title: "Love Is a Stranger in an Open Car", note: "A wild night in Miami Beach", source: OW("95", 53) },
      { date: "8 May 1991", issue: "No. 97 · p. 50", ours: true, title: "Scraps of paper from his lunchboxes, and \"I've fallen in love\"", source: OW("97", 50) },
      { date: "5 Jun 1991", issue: "No. 101 · p. 50", ours: true, title: "His cat warns him never to fall for a straight man, so he turns himself into a girl", source: OW("101", 50) },
      { date: "19 Jun 1991", issue: "No. 103 · p. 51", ours: true, title: "A giggling TV newswoman, Trudi out of the closet, and the straight boy's Caesar haircut at the Building", source: OW("103", 53) },
      { date: "3 Jul 1991", issue: "No. 105 · p. 108", ours: true, title: "Cockroaches glued to a wig, a KFC bucket for a purse and a TriBeCa loft party", note: "OutWeek's last issue", source: OW("105", 110) },
    ],
  },
  "fat-and-all-that": {
    suggestKind: "Fat and All That",
    writer: "Mickey Boardman",
    publication: "Paper (online)",
    ran: "Aug 2018 – Jan 2020",
    how: "weekly on Paper's website",
    complete: true,
    about: "Every piece Paper ran under the column on its website. It was an online column, not in the printed magazine.",
    articles: [
      { date: "7 Aug 2018", title: "Why Do People Hate the F Word?", source: PM("fat-all-that-1") },
      { date: "14 Aug 2018", title: "In Defense of 'Insatiable'", source: PM("fat-all-that-insatiable") },
      { date: "11 Sep 2018", title: "Meet Amina Akhtar", source: PM("amina-akhtar-fashion-victim") },
      { date: "26 Sep 2018", title: "The Return to Weight Watchers", source: PM("mr-mickey-boardman-weight-watchers") },
      { date: "3 Oct 2018", title: "Is It Wrong to Love Your Obese Self?", source: PM("loving-your-obese-self-") },
      { date: "14 Dec 2018", title: "Talking With Body Positivity Queen Lizzo", source: PM("lizzo-fat-and-all-that") },
      { date: "12 Feb 2019", title: "Whitney Thore Loves Her Big Fat Fabulous Life", source: PM("whitney-thore-fat-fabulous-life") },
      { date: "6 May 2019", title: "Does Losing Weight Make Me Less Body Positive?", source: PM("my-weight-loss-body-positivity") },
      { date: "15 May 2019", title: "Falling in Love with My Gut and Double Chins", source: PM("fat-and-all-that-chins") },
      { date: "22 May 2019", title: "A Journey Through Yoga", source: PM("fat-and-all-that-mickeys-yoga-journey") },
      { date: "11 Jun 2019", title: "Activist Jameela Jamil Is Coming for Designers", source: PM("jameela-jamil-fat-and-all-that") },
      { date: "16 Aug 2019", title: "Beth Ditto Talks About Being Calvin Klein's Fat Underwear Model", source: PM("beth-ditto-calvin-klein") },
      { date: "12 Sep 2019", title: "@yrfatfriend Is the Fat Activist You Need to Follow", source: PM("fat-and-all-that-yrfatfriend") },
      { date: "8 Jan 2020", title: "Mickey Boardman's WW Journey", note: "Made with WW", source: PM("fat-and-all-that-ww") },
      { date: "8 Apr 2020", title: "Patrick Starrr Is Rewriting the Laws of Beauty", note: "Filed under the column by Paper", source: PM("patrick-starrr-beauty-influencer") },
    ],
  },
  "lunch-with-lauren": {
    suggestKind: "Lunch with Lauren",
    writer: "Lauren Ezersky",
    publication: "Paper",
    ran: "early 1990s, for about eight or nine years",
    how: "monthly",
    complete: false,
    about:
      "Paper's 1990s printed issues aren't online and no list of the columns has ever been published, so this is only what's known for sure so far. Lauren talks about these on the show. Got an old Paper with her column in it? Suggest it below.",
    articles: [
      { title: "Donna Karan", note: "The first one: Kim Hastreiter sent her" },
      { title: "Karl Lagerfeld" },
      { title: "Vivienne Westwood" },
    ],
  },
  "ms-lonely-hearts": {
    suggestKind: "Ms. Lonely Hearts",
    writer: "Cynthia Heimel (unsigned)",
    publication: "The SoHo Weekly News",
    ran: "1970s",
    how: "an advice column with no byline",
    complete: false,
    about:
      "The SoHo Weekly News (1973–1982) has never been put online and no list of the columns exists, so no single column can be dated yet. What we know comes from Michael Musto on the show: he wrote in as \"the Brooklyn Kid\", and that letter led to his first assignments. Got an old SoHo News? Suggest it below.",
    articles: [],
  },
};
