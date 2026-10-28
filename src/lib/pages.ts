// THE one list of the site's pages. The top menu, site search, the contact form's "What it's about" dropdown and the
// guestbook's "Favourite page" dropdown are all built from it, so a page added or renamed here shows up everywhere.
// src/data/pages.test.ts fails if a page route exists that isn't listed here.

/** The top menu, in order. */
export const PAGES = [
  { to: "/episodes", label: "Afterparty" },
  { to: "/timeline", label: "Timeline" },
  { to: "/jukebox", label: "Jukebox" },
  { to: "/book-club", label: "Book Club" },
  { to: "/explore", label: "A–Z" }, // back on the top menu (Lisa, 28 Oct 2026)
  { to: "/guestbook", label: "Guestbook" },
] as const;

/** Pages that exist but are not linked anywhere yet (Lisa, 22 Oct 2026: Wardrobe and Pub Quiz need more work).
 *  They stay reachable by URL, are left out of the menu, search, sitemap, home cards and both dropdowns
 *  (their routes say staticData.sitemap: false). Move them back into PAGES to relaunch them. */
export const UNLINKED_PAGES = [
  { to: "/wardrobe", label: "Wardrobe" },
  { to: "/quiz", label: "Pub Quiz" },
  { to: "/games", label: "Games" }, // ideas board (Lisa, 24 Oct 2026)
  { to: "/trail", label: "Follow the Names" }, // playable draft of the discovery game (Lisa, 24 Oct 2026)
] as const;

/** Pages outside the top menu (footer and elsewhere). */
export const OTHER_PAGES = [
  { to: "/network", label: "Network" }, // off the top menu until the mentor reset (Lisa, 27 Oct 2026) - still in search, sitemap and the home cards
  { to: "/map", label: "Map" }, // off the top menu while Lisa reworks it (27 Oct 2026) - still in search, sitemap and the home cards
  { to: "/guests", label: "Guests" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/under-the-hood", label: "Under the hood" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
] as const;

export type SitePage = { to: string; label: string };

/** Full name for a page in dropdowns ("A–Z" reads "Everything A–Z"). */
const longLabel = (p: SitePage) => (p.label === "A–Z" ? "Everything A–Z" : p.label);

/** Every page a visitor can pick: Home, the menu pages, then the rest - each with its full name. */
export const ALL_PAGES: SitePage[] = [{ to: "/", label: "Home" }, ...PAGES, ...OTHER_PAGES].map((p) => ({ to: p.to, label: longLabel(p) }));

/** Contact form: "What it's about". Every page except Contact itself, plus the Map's "Bring us home" call and a catch-all. */
export const CONTACT_TOPICS: string[] = [
  ...ALL_PAGES.filter((p) => p.to !== "/contact").map((p) => p.label),
  "Bring us home",
  "Something else",
];

/** Guestbook: "Favourite page" - the pages fans enjoy (not the contact form or the legal pages). */
export const GUESTBOOK_PAGES: SitePage[] = ALL_PAGES.filter(
  (p) => !["/contact", "/privacy", "/terms", "/under-the-hood", "/guestbook"].includes(p.to),
);

// Older guestbook entries may name an unlinked page - still show its name, just not as a choice.
export const guestbookPage = (to: string | null | undefined) =>
  GUESTBOOK_PAGES.find((p) => p.to === to) ?? (UNLINKED_PAGES as readonly SitePage[]).find((p) => p.to === to);
