// "What the guests said about it" on Library item pages (Lisa, 21 Nov 2026: "a row of quotes from guests"): the guests' own
// words about a book, magazine, column, diary or film, taken from the episode transcripts (kept on Lisa's Mac, never
// published) and checked against the episode audio. Keyed by A–Z card slug. Same rule as the club quote walls: at most 9,
// as many different guests as possible, never more than 2 from the same guest (src/data/cards.test.ts checks).
// Guests only - not the hosts (James, Fenton, Randy), unless the host is the episode's own guest (S06E01).

export type GuestQuote = { episode: string; who: string; time: string; quote: string };

export const ITEM_QUOTES: Record<string, GuestQuote[]> = {};
