import outweek38 from "@/assets/issues/outweek-no-38.webp";

// Issue pages (Lisa, 22 Nov 2026 - "can we make this a page and make something with it?", picked mockup A "the cover story"):
// a real issue a guest talks about on the show gets its own page at /issues/<slug> - the cover, the facts from the issue
// itself, the story in the guests' own words (episode + time), how the story travelled, what else was in the issue and who
// is in it. The typed card in "The issues they talk about" on the publication's Library page links here (PressIssue.page in
// src/data/publication-facts.ts). One shared page: a new issue is one more entry below, nothing else.
// - Facts come from the issue itself (cover, contents page, captions), never from memory on the show. Where a guest
//   remembers it differently, the page uses the issue (e.g. James's "three days" between Haring and Forbes: it was eight).
// - Covers are shown with their credit, like the other Library covers; no licence fees.
// - Outside links: only the eBay search (Find this issue) and the free scan (like the column pages' "Read the scan").

export type IssueQuote = {
  who: string;
  episode: string;
  time: string;
  quote: string;
  host?: "fenton-bailey" | "randy-barbato";
};

export type Issue = {
  slug: string;
  /** A–Z card slug of the publication (its Library page). */
  publication: string;
  mast: string;
  number: string;
  date: string;
  place: string;
  cover: string;
  coverAlt: string;
  coverCredit: string;
  /** The title on the page, in the guest's words. */
  title: string;
  /** One short paragraph: what happened, fair to everyone in it. */
  intro: string;
  facts: { label: string; value: string }[];
  dropped: { episode: string; time: string; guest: string };
  quotes: IssueQuote[];
  travelled?: {
    steps: { mast: string; text: string; kind?: "first" | "dropped" }[];
    episode: string;
    time: string;
    who: string;
  };
  inside?: {
    title: string;
    text: string;
    episode?: string;
    time?: string;
    card?: string;
    cardLabel?: string;
  }[];
  /** Something the issue itself shows that a guest remembered. */
  note?: string;
  /** People in the issue: their A–Z card, or their AFTERPARTY for a guest who has one. */
  people: { name: string; card?: string; episode?: string }[];
  /** The free scan of the whole issue. */
  scan?: string;
  /** eBay search words for this exact issue. */
  search: string;
  /** One-line share/search description. */
  description: string;
};

export const ISSUES: Issue[] = [
  {
    slug: "outweek-no-38",
    publication: "outweek",
    mast: "OutWeek",
    number: "No. 38",
    date: "18 March 1990",
    place: "New York",
    cover: outweek38,
    coverAlt:
      'OutWeek No. 38 cover: Malcolm Forbes in a motorcycle helmet, "The Secret Gay Life of Malcolm Forbes"',
    coverCredit:
      "OutWeek No. 38, 18 March 1990. Cover photo: Marina Garnier. Scan via the OutWeek archive (outweek.net).",
    title: "The cover that made headlines",
    intro:
      'Malcolm Forbes died on 24 February 1990. Three weeks later he was on the cover of OutWeek. Michelangelo Signorile wrote the story, and the fight over "outing" began. On the show he tells why he did it, James tells why it made him furious, and Fenton explains why it was such a shock back then.',
    facts: [
      { label: "Issue", value: "OutWeek No. 38 · 18 March 1990 · New York" },
      { label: "On the cover", value: "The Secret Gay Life of Malcolm Forbes" },
      { label: "Inside, p. 40", value: '"The Other Side of Malcolm" by Michelangelo Signorile' },
      { label: "Also on it", value: "Keith Haring remembered · NY State vetoes phone sex ban" },
    ],
    dropped: { episode: "s02e08", time: "00:46:01", guest: "Michelangelo Signorile" },
    quotes: [
      {
        who: "Michelangelo Signorile",
        episode: "s02e08",
        time: "00:50:41",
        quote:
          "What really enraged me was, after he died, he was being held up by William F. Buckley Jr. and these other conservatives as this icon of capitalism and conservatism.",
      },
      {
        who: "James St. James",
        episode: "s02e08",
        time: "00:46:37",
        quote:
          "I wrote a letter to the editor, to you and Gabriel, saying this shall not stand. How dare you? And you guys thought it was so funny that you called and said, why don't you write for the magazine?",
      },
      {
        who: "Fenton Bailey",
        episode: "s02e08",
        time: "00:47:20",
        host: "fenton-bailey",
        quote:
          "It's important, and hard, to remember the cultural atmosphere then: the idea that it would be scandalous to say that someone was gay after they die.",
      },
      {
        who: "Michelangelo Signorile",
        episode: "s02e08",
        time: "00:49:00",
        quote:
          "When I was back at Mike Hall, we would write about Malcolm Forbes with Elizabeth Taylor as his girlfriend, when we knew that wasn't true.",
      },
      {
        who: "Michelangelo Signorile",
        episode: "s02e08",
        time: "00:52:46",
        quote:
          "Gabriel had said we need to use the term equalizing, because what we're trying to do is equalize the treatment of homosexuality and heterosexuality in the media.",
      },
      {
        who: "Randy Barbato",
        episode: "s02e08",
        time: "00:48:24",
        host: "randy-barbato",
        quote: "I feel that you invented shouty caps.",
      },
    ],
    travelled: {
      steps: [
        {
          mast: "OutWeek",
          kind: "first",
          text: 'Runs the story. A small magazine "you had to buy on a newsstand".',
        },
        {
          mast: "Daily News",
          kind: "dropped",
          text: "Asked for the exclusive, then dropped it at the last minute.",
        },
        { mast: "LA Times", text: "Runs a story about outing. It goes round the country." },
        { mast: "SF Chronicle", text: "Picks it up next." },
        {
          mast: "New York Times",
          text: 'Weeks later: "a recently deceased businessman". No name.',
        },
      ],
      who: "Michelangelo",
      episode: "s02e08",
      time: "00:54:22",
    },
    inside: [
      {
        title: "Keith Haring remembered",
        text: "Keith died on 16 February 1990, eight days before Forbes. The same issue carries the big story on him.",
        episode: "s02e08",
        time: "00:50:06",
      },
      {
        title: "Gossip Watch",
        text: "Michelangelo's own column, p. 49 of this issue: where OutWeek's outing started.",
      },
      {
        title: "Diary of a Mad Queen",
        text: "James's furious letter got him a column. It ran from No. 77 to the last issue, No. 105.",
        card: "diary-of-a-mad-queen",
        cardLabel: "Read the columns",
      },
    ],
    note: "James remembered it right: the story's opening photo shows Forbes at a party with Michael Alig and other nightlifers (photo caption, p. 41).",
    people: [
      { name: "Malcolm Forbes", card: "malcolm-forbes" },
      { name: "Michelangelo Signorile", episode: "s02e08" },
      { name: "Gabriel Rotello", card: "gabriel-rotello" },
      { name: "Keith Haring", card: "keith-haring" },
      { name: "James St. James", episode: "s06e01" },
    ],
    scan: "http://outweek.net/pdfs/ow_38.pdf",
    search: "OutWeek Malcolm Forbes 1990",
    description:
      "OutWeek No. 38, 18 March 1990: the Malcolm Forbes cover that started the fight over outing, told by Michelangelo Signorile, James St. James and Fenton Bailey on Night Fever.",
  },
];

export const issueBySlug = (slug: string) => ISSUES.find((i) => i.slug === slug);
