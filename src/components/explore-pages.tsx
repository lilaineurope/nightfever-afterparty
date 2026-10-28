import { Link } from "@tanstack/react-router";
import { bookClub, clubsMentioned, jukebox } from "@/data/collections";
import { entities } from "@/data/entities";
import { sceneEvents } from "@/data/scene";
import { COME_BACK, NEW_FACES } from "@/data/interview-next";

// Home page "more to explore" grid (Lisa, 28 Oct 2026): Timeline, Book Club, Jukebox, A–Z, Guestbook, Clubs (-> the Jukebox's Clubs button),
// with live counts from the same data the pages use.
const CARDS = [
  { to: "/timeline", search: undefined, key: "timeline", title: "Timeline", count: `${sceneEvents.length} Moments` },
  { to: "/book-club", search: undefined, key: "book-club", title: "Book Club", count: `${bookClub.length} Books & Magazines` },
  { to: "/jukebox", search: undefined, key: "jukebox", title: "Jukebox", count: `${jukebox.length} Songs & Acts` },
  { to: "/explore", search: undefined, key: "explore", title: "A–Z", count: `${entities.length} Names` },
  { to: "/guestbook", search: undefined, key: "guestbook", title: "Guestbook", count: "Sign it!" },
  { to: "/jukebox", search: { show: "clubs" as const }, key: "clubs", title: "Clubs", count: `${clubsMentioned.length} Clubs` },
  // Lisa, 28 Oct 2026: a full-width tile down to the "Who to interview next" list on this page.
  { to: "/", search: undefined, hash: "interview-next", key: "interview", title: "Who to interview next", count: `${NEW_FACES.length + COME_BACK.length} Names - and your pick` },
];

// Xerox Flyer tiles (exactly as the design): a heavy black-ruled grid of type-only tiles, some flooded pink or black.
const FILL: Record<string, string> = {
  "book-club": "bg-gold text-gold-foreground",
  explore: "bg-pink text-pink-foreground",
  clubs: "bg-gold text-gold-foreground",
  guestbook: "bg-pink text-pink-foreground",
  interview: "bg-background text-cream",
};

export function ExplorePages() {
  return (
    <section aria-labelledby="explore-pages" className="mt-16">
      <h2 id="explore-pages" className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">
        More to explore
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-[3px] border-[3px] border-gold bg-gold sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <li key={c.key} className={`flex${c.key === "interview" ? " sm:col-span-2 lg:col-span-3" : ""}`}>
            <Link
              to={c.to}
              {...(c.search ? { search: c.search } : {})}
              {...("hash" in c && c.hash ? { hash: c.hash } : {})}
              className={`group block w-full p-5 transition hover:bg-highlight hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink ${FILL[c.key] ?? "bg-background text-cream"}`}
            >
              <span className="block font-[family-name:var(--font-flyer)] text-[30px] uppercase leading-tight">{c.title}</span>
              <span className="mt-1 block text-[13px]">{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
