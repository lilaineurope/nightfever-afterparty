import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";

// Games - the ideas board for turning the fan page into a game (Lisa, 24 Oct 2026).
// Unlinked for now: not in the menu, search or sitemap, and noindex. See UNLINKED_PAGES in src/lib/pages.ts.
export const Route = createFileRoute("/games")({
  staticData: { sitemap: false }, // unlinked for now (Lisa, 24 Oct 2026) - see UNLINKED_PAGES in src/lib/pages.ts
  component: GamesPage,
  head: () =>
    pageHead({
      path: "/games",
      title: "Games – the Night Fever Afterparty game ideas | Night Fever fan page",
      description: "Ideas for turning the Night Fever fan page into a game: The Door, Six Degrees, Club Crawl, Dress for the Door and Name That Night.",
      image: "/og/home.jpg",
      noindex: true,
    }),
});

type Status = "Next up" | "Idea" | "Later";

type Game = {
  name: string;
  status: Status;
  pitch: string;
  play: string[];
  uses: string[];
  needs: string[];
};

const GAMES: Game[] = [
  {
    name: "The Door",
    status: "Next up",
    pitch:
      "You're in the queue outside a club - think Sally Randall on the Palladium door. Tonight's door person asks you questions from one episode. Get them right and you're in.",
    play: [
      "One door a night, like Wordle - the same door for everyone that day.",
      "3 to 5 questions from one episode: who said it, which club, what year, finish the quote.",
      "Get in and you win that guest's polaroid for your collection, and their episode opens up.",
      "A result to share: \"Got into Celebrity Club on the first try 🪩\".",
    ],
    uses: ["Episode references and timestamps", "Afterparty quotes", "Polaroids", "Pub Quiz question logic"],
    needs: ["Question picker per episode", "Daily door schedule", "Progress saved in the visitor's browser", "Share card"],
  },
  {
    name: "Six Degrees of Night Fever",
    status: "Idea",
    pitch: "Get from one name to another in as few hops as you can - every hop a real connection from the episodes.",
    play: [
      "\"Get from Joey Arias to Donald Trump.\"",
      "Each hop is two names mentioned together in an episode.",
      "Fewest hops wins; the shortest path is revealed at the end with the stories behind each hop.",
    ],
    uses: ["Network graph", "Everything A–Z cards"],
    needs: ["Pairs of names that make a fair puzzle", "Shortest-path check"],
  },
  {
    name: "Club Crawl",
    status: "Idea",
    pitch: "The Map becomes the game board. Start in 1978 with $20 and work your way through the city's clubs.",
    play: [
      "Move from club to club; the Timeline moves forward as you go.",
      "Each club unlocks its stories, its songs and the people you meet there.",
      "Clubs close and new ones open as the years pass.",
    ],
    uses: ["Map pins", "Timeline", "Jukebox", "Club cards"],
    needs: ["Opening and closing years per club", "Simple money and night counter", "Game map view"],
  },
  {
    name: "Dress for the Door",
    status: "Idea",
    pitch: "Put together an outfit from the looks in the stories. The door person judges it against what was really worn in that era.",
    play: [
      "Pick a club and a year, then dress from the looks the guests describe.",
      "The door says yes, no, or \"go home and change\".",
    ],
    uses: ["Wardrobe (unlinked)", "Mood boards", "On-camera looks"],
    needs: ["Era and club tags on looks", "Door verdict rules"],
  },
  {
    name: "Name That Night",
    status: "Idea",
    pitch: "A song from the Jukebox, or a quote in pink handwriting - guess the guest or the club.",
    play: ["Hear a few seconds or read a quote.", "Guess the guest, the club or the episode.", "Streaks for right answers in a row."],
    uses: ["Jukebox and Spotify playlist", "Afterparty quotes", "Episode player timestamps"],
    needs: ["Clip and quote picker", "Guess input with name matching"],
  },
];

const STATUS_STYLE: Record<Status, string> = {
  "Next up": "bg-pink text-pink-foreground",
  Idea: "bg-gold/20 text-gold",
  Later: "bg-muted text-muted-foreground",
};

function GamesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link to="/" className="text-xs font-medium uppercase tracking-[0.2em] text-gold transition hover:text-pink">
            &larr; Night Fever fan page
          </Link>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Game <span className="text-pink text-glow-pink">ideas</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Ideas for turning the whole fan page into a game. Not linked anywhere yet - this page keeps track of them.
          </p>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gold/40 bg-card p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">The big idea</h2>
          <p className="mt-3 leading-relaxed">
            The site already has the pieces: a polaroid for every guest, thousands of names with timestamps, the Map, the Timeline, the
            Network and the Pub Quiz. A game just needs a reason to move through them and something to win.{" "}
            <strong className="text-cream">Every game feeds one Polaroid Passport</strong> - the collection of guests you've unlocked.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Suggested order: build The Door first as one page. Everything it needs is already in the data, and progress can be saved in the
            visitor's browser, so no accounts are needed. The other games come later and add to the same passport.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <ol className="mx-auto grid max-w-4xl gap-6">
          {GAMES.map((g, i) => (
            <li key={g.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-2xl font-bold tracking-tight text-cream">{g.name}</h2>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${STATUS_STYLE[g.status]}`}>
                  {g.status}
                </span>
              </div>
              <p className="mt-3 leading-relaxed">{g.pitch}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">How it plays</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                    {g.play.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Uses what's there</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {g.uses.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Still to build</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {g.needs.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}
