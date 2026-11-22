// Books on the Library shelves that the AFTERPARTY Library stocktake (library-facts.ts, generated - don't edit) has no row for
// yet, so their page had no author, year or publisher (publication pages audit, Lisa 22 Nov 2026). First edition, checked
// against Open Library on 22 Nov 2026. When the book gets its stocktake row, that row wins and the line here can go.
// Keyed by A–Z card slug. Loads nothing.

export type ExtraFacts = { title: string; author: string; year: number | null; publisher: string | null; isbn?: string };

export const BOOK_FACTS_EXTRA: Record<string, ExtraFacts> = {
  "how-to-murder-your-life": { title: "How to Murder Your Life", author: "Cat Marnell", year: 2017, publisher: "Simon & Schuster (US), Ebury Press (UK)" },
  "self-tanner-for-your-soul": { title: "Self-Tanner for Your Soul", author: "Cat Marnell", year: null, publisher: "Audible Original (audiobook)" },
  "marilyn-a-biography": { title: "Marilyn: A Biography", author: "Norman Mailer", year: 1973, publisher: "Grosset & Dunlap", isbn: "9780399514135" },
  "little-gloria-happy-at-last": { title: "Little Gloria... Happy at Last", author: "Barbara Goldsmith", year: 1980, publisher: "Knopf" },
  "duchess-of-windsor": { title: "The Duchess of Windsor", author: "Diana Mosley", year: 1980, publisher: "Sidgwick & Jackson", isbn: "9780283986284" },
  "pursuit-of-love": { title: "The Pursuit of Love", author: "Nancy Mitford", year: 1945, publisher: "Hamish Hamilton" },
  "love-in-a-cold-climate": { title: "Love in a Cold Climate", author: "Nancy Mitford", year: 1949, publisher: "Hamish Hamilton" },
  "hons-and-rebels": { title: "Hons and Rebels", author: "Jessica Mitford", year: 1960, publisher: "Victor Gollancz" },
  "rainbow-comes-and-goes": { title: "The Rainbow Comes and Goes", author: "Diana Cooper", year: 1958, publisher: "Rupert Hart-Davis", isbn: "9780712604529" },
  "nightbirds": { title: "Nightbirds: Photos of NYC's Dynamic Club Culture Personalities 1986–1995", author: "Michael Fazakerley", year: null, publisher: null },
};
