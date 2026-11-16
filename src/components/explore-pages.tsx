import { Link } from "@tanstack/react-router";
import type { HomeView } from "@/lib/home-view";

// Home page "More to explore" (Lisa, 4 Nov 2026): six tiles in this order - Timeline, Jukebox, Clubs, Library, A–Z, Guestbook -
// with live counts from the same data the pages use. Three across on desktop, so the grid is an even 3 x 2.
// The counts come from the server with the home page (src/lib/home-view.server.ts, page weight 17 Nov 2026).
const cardsFor = (n: HomeView["counts"]) => [
  { to: "/timeline", key: "timeline", title: "Timeline", count: `${n.timeline} Moments` },
  { to: "/jukebox", key: "jukebox", title: "Jukebox", count: `${n.jukebox} Songs & Acts` },
  { to: "/inside-the-clubs", key: "clubs", title: "Clubs", count: `${n.clubs} Clubs` },
  { to: "/library", key: "library", title: "Library", count: `${n.library} Books & Magazines` },
  { to: "/explore", key: "explore", title: "A–Z", count: `${n.explore} Names` },
  { to: "/guestbook", key: "guestbook", title: "Guestbook", count: "Sign it!" },
];

// Xerox Flyer tiles: a heavy black-ruled grid of type-only tiles, flooded pink, black or paper. The fills are set so no two
// tiles of the same colour touch - side by side, above each other, or one after another when the tiles stack on phones.
const FILL: Record<string, string> = {
  jukebox: "bg-gold text-gold-foreground",
  clubs: "bg-pink text-pink-foreground",
  library: "bg-gold text-gold-foreground",
  explore: "bg-pink text-pink-foreground",
};

export function ExplorePages({ counts }: { counts: HomeView["counts"] }) {
  return (
    <section aria-labelledby="explore-pages" className="mt-16">
      <h2 id="explore-pages" className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">
        More to explore
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-[3px] border-[3px] border-gold bg-gold sm:grid-cols-3">
        {cardsFor(counts).map((c) => (
          <li key={c.key} className="flex">
            <Link
              to={c.to}
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
