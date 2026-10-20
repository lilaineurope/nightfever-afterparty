import { Link } from "@tanstack/react-router";
import { bookClub, jukebox } from "@/data/collections";
import { LOCATIONS } from "@/data/locations";
import { sceneEvents } from "@/data/scene";
import timelineImg from "@/assets/cards/timeline.jpg";
import connectionsImg from "@/assets/cards/connections.jpg";
import jukeboxImg from "@/assets/cards/jukebox.jpg";
import bookClubImg from "@/assets/cards/book-club.jpg";
import mapImg from "@/assets/cards/map.jpg";
import quizImg from "@/assets/cards/quiz.jpg";
import guestbookImg from "@/assets/cards/guestbook.jpg";
import wardrobeImg from "@/assets/cards/wardrobe.jpg";
import { PIECES } from "@/data/closet";

// Home page "more to explore" grid: one card per page, with live counts from the same data the pages use.
const CARDS = [
  { to: "/timeline", title: "Timeline", img: timelineImg, line: "New York nightlife decade by decade, with the guests in every scene.", count: `${sceneEvents.length} Moments` },
  { to: "/network", title: "Network", img: connectionsImg, line: "Who turns up with who - every name dropped, tied to the episodes they share.", count: "The web of names" },
  { to: "/jukebox", title: "Jukebox", img: jukeboxImg, line: "Every song, band and sound the guests mention - press play.", count: `${jukebox.length} Songs & Acts` },
  { to: "/book-club", title: "Book Club", img: bookClubImg, line: "The diaries, novels, magazines and gossip columns from the stories.", count: `${bookClub.length} Books & Magazines` },
  { to: "/map", title: "Map", img: mapImg, line: "Every club, street and city on one map - and the ones still lost.", count: `${LOCATIONS.length} Places` },
  { to: "/wardrobe", title: "Wardrobe", img: wardrobeImg, line: "Dress yourself from the guests' looks - by episode, designer, club or colour.", count: `${PIECES.length} Pieces` },
  { to: "/quiz", title: "Pub Quiz", img: quizImg, line: "Ten fresh nightlife questions every time, answers and timestamps included.", count: "New quiz every time" },
  { to: "/guestbook", title: "Guestbook", img: guestbookImg, line: "Leave a note for the Afterparty - your episode, your club, your night.", count: "Sign it!" },
] as const;

// Xerox Flyer tiles (exactly as the design): a heavy black-ruled grid of type-only tiles, some flooded pink or black.
const FILL: Record<string, string> = {
  "/network": "bg-pink text-pink-foreground",
  "/book-club": "bg-gold text-gold-foreground",
  "/wardrobe": "bg-gold text-gold-foreground",
  "/guestbook": "bg-pink text-pink-foreground",
};

export function ExplorePages() {
  return (
    <section aria-labelledby="explore-pages" className="mt-16">
      <h2 id="explore-pages" className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">
        More to explore
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-[3px] border-[3px] border-gold bg-gold sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <li key={c.to} className="flex">
            <Link
              to={c.to}
              className={`group block w-full p-5 transition hover:bg-highlight hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink ${FILL[c.to] ?? "bg-background text-cream"}`}
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
