import { Link } from "@tanstack/react-router";
import { jukebox } from "@/data/collections";
import { entities } from "@/data/entities";
import { sceneEvents } from "@/data/scene";

// Home page "More to explore" (Lisa, 29 Oct 2026): three tiles - A–Z, Jukebox, Timeline - with live counts from the same data the pages use.
const CARDS = [
  { to: "/explore", key: "explore", title: "A–Z", count: `${entities.length} Names` },
  { to: "/jukebox", key: "jukebox", title: "Jukebox", count: `${jukebox.length} Songs & Acts` },
  { to: "/timeline", key: "timeline", title: "Timeline", count: `${sceneEvents.length} Moments` },
];

// Xerox Flyer tiles: a heavy black-ruled grid of type-only tiles, flooded pink, black or paper.
const FILL: Record<string, string> = {
  explore: "bg-pink text-pink-foreground",
  jukebox: "bg-gold text-gold-foreground",
};

export function ExplorePages() {
  return (
    <section aria-labelledby="explore-pages" className="mt-16">
      <h2 id="explore-pages" className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">
        More to explore
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-[3px] border-[3px] border-gold bg-gold sm:grid-cols-3">
        {CARDS.map((c) => (
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
