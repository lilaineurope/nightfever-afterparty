// Library item pages (Lisa, 21 Nov 2026: "for everything in the library, is there anything else we can add to the items'
// individual pages?" - yes to all of it): what a book, magazine, newspaper, column, diary, film or TV card shows on top of
// the usual card. Worked out on the server (src/lib/library-item.server.ts), drawn by src/components/library-item.tsx.
// Types only - this file loads nothing.
import type { BookFacts } from "@/data/library-facts";

export type DroppedBy = { episodeId: string; short: string; guest: string; polaroid?: string | undefined; time: string; mentions: number; said: { time: string; text: string }[] };
export type WriterView = {
  name: string;
  slug?: string | undefined;
  /** Their own AFTERPARTY, when they are a guest with one. */
  episodeId?: string | undefined;
  polaroid?: string | undefined;
  role?: string | undefined;
  moments: { episodeId: string; short: string; guest: string; time: string; context: string; mentions: number }[];
};
export type ShelfMate = { slug: string; name: string; cover?: string | undefined; shelf: string; eps: string[] };
/** A trailer of the item, (kind "clip") a film or TV show's own clip from our playlists, (kind "about") a film or video
 *  about a book or magazine from our playlists - it plays first, or (kind "guest") a video from the Jukebox of a guest who
 *  dropped it, when there is no trailer, or (kind "writer") a video of the writer of a book no guest has dropped yet. */
export type Trailer = { id: string; title: string; label: string; episodeId: string; short: string; kind?: "guest" | "clip" | "about" | "writer" | undefined };
export type Connection = { label: string; slug: string; name: string; note?: string | undefined; cover?: string | undefined };
export type ItemQuote = { episodeId: string; short: string; who: string; time: string; quote: string; polaroid?: string | undefined };

export type LibraryItemView = {
  /** books | magazines | newspapers | columns | diaries | film | tv */
  shelf: string;
  /** The real cover (photo) or masthead, taped into the header. */
  cover: { src: string; credit: string; mast: boolean } | null;
  facts: (Omit<BookFacts, "stockholm"> & { stockholm: BookFacts["stockholm"] | null } & { authorGuest?: { name: string; episodeId: string; short: string; polaroid?: string | undefined } | undefined }) | null;
  /** A book a guest wished for on air that came out since (Publish this, src/data/still-to-make.ts). */
  madeSince: { episodeId: string; short: string; time?: string | undefined; why: string; year?: number | undefined } | null;
  dropped: DroppedBy[];
  /** A book no guest has dropped yet (src/data/written-by.ts): its writer and where they come up on the show. */
  writer: WriterView | null;
  quotes: ItemQuote[];
  connections: Connection[];
  shelfMates: ShelfMate[];
  trailers: Trailer[];
  /** Books only: "Who made me" - the publishing team beyond author and publisher (src/data/book-credits.ts). */
  credits: { role: string; name: string; slug?: string | undefined }[];
  /** Books only: what the "Find me, borrow me" and "Find me, buy me" boxes search for. */
  find: { isbn: string | null; query: string; inPrint: boolean | null } | null;
  /** Magazines and newspapers (src/data/publication-facts.ts): masthead, the issues the guests talk about, back issues to buy. */
  press: PressView | null;
};

export type PressView = {
  founded: string | null;
  /** The publishing house or owner (PUBLISHERS in src/data/publication-facts.ts). */
  publisher: string | null;
  by: { name: string; slug?: string | undefined }[];
  ran: string | null;
  team: { role: string; name: string; slug?: string | undefined; note?: string | undefined; episodeId?: string | undefined; short?: string | undefined; time?: string | undefined }[];
  issues: { what: string; date?: string | undefined; episodeId: string; short: string; guest: string; polaroid?: string | undefined; time: string; search: string; page?: string | undefined }[];
  /** Back issues: what the "Find me, buy me" box searches for. null for a website. */
  buy: { query: string } | null;
};
