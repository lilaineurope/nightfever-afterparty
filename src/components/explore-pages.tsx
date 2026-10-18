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

// Home page "more to explore" grid: one card per page, with live counts from the same data the pages use.
const CARDS = [
  { to: "/timeline", title: "Timeline", img: timelineImg, line: "New York nightlife decade by decade, with the guests in every scene.", count: `${sceneEvents.length} moments` },
  { to: "/connections", title: "Connections", img: connectionsImg, line: "Who turns up with who - every name dropped, tied to the episodes they share.", count: "the web of names" },
  { to: "/jukebox", title: "Jukebox", img: jukeboxImg, line: "Every song, band and sound the guests mention - press play.", count: `${jukebox.length} songs & acts` },
  { to: "/book-club", title: "Book Club", img: bookClubImg, line: "The diaries, novels, magazines and gossip columns from the stories.", count: `${bookClub.length} books & magazines` },
  { to: "/map", title: "Map", img: mapImg, line: "Every club, street and city on one map - and the ones still lost.", count: `${LOCATIONS.length} places` },
  { to: "/quiz", title: "Pub Quiz", img: quizImg, line: "Ten fresh nightlife questions every time, answers and timestamps included.", count: "new quiz every time" },
] as const;

export function ExplorePages() {
  return (
    <section aria-labelledby="explore-pages" className="mt-20">
      <h3 id="explore-pages" className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        More to explore
      </h3>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {CARDS.map((c) => (
          <li key={c.to}>
            <Link
              to={c.to}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-pink"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                <span className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-gold sm:left-3 sm:px-2.5 sm:text-[11px]">{c.count}</span>
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <span className="text-base font-semibold text-cream group-hover:text-pink sm:text-lg">{c.title}</span>
                <span className="mt-1 hidden flex-1 text-sm text-muted-foreground sm:block">{c.line}</span>
                <span className="mt-auto pt-2 text-xs font-semibold sm:pt-3 text-gold group-hover:text-pink">Open &rarr;</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/guestbook"
        className="group relative mt-4 flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border px-5 py-5 transition hover:border-pink sm:mt-5 sm:px-7"
      >
        <img src={guestbookImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/30" />
        <span className="relative">
          <span className="block text-lg font-semibold text-cream group-hover:text-pink">Sign the guestbook</span>
          <span className="block text-sm text-muted-foreground">Leave a note for the Afterparty - your episode, your club, your night.</span>
        </span>
        <span className="relative shrink-0 rounded-full bg-pink px-4 py-2 text-sm font-semibold text-pink-foreground">Sign it &rarr;</span>
      </Link>
    </section>
  );
}
