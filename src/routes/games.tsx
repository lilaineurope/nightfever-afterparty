import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { episodePortraits } from "@/components/episode-block";
import { episodes, episodePath, episodeCode } from "@/data/episodes";
import { entityFor } from "@/data/entities";
import { useMemo } from "react";

// Games - the ideas board for turning the fan page into a game (Lisa, 24 Oct 2026).
// Unlinked for now: not in the menu, search or sitemap, and noindex. See UNLINKED_PAGES in src/lib/pages.ts.
export const Route = createFileRoute("/games")({
  staticData: { sitemap: false }, // unlinked for now (Lisa, 24 Oct 2026) - see UNLINKED_PAGES in src/lib/pages.ts
  component: GamesPage,
  head: () =>
    pageHead({
      path: "/games",
      title: "Games – the Night Fever Afterparty game ideas | Night Fever fan page",
      description: "Ideas for turning the Night Fever fan page into a game: The Door, Follow the Names, James's Games, Six Degrees, Club Crawl, Dress for the Door and Name That Night.",
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
  /** Moments on the show this game comes from - tap to hear them. */
  moments?: { id: string; time: string; label: string }[];
  /** A playable draft, if there is one. */
  draft?: "/trail";
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
    name: "Follow the Names",
    status: "Next up",
    draft: "/trail",
    pitch:
      "A discovery journey that replays how this site was made. You start with one episode - James St. James - and the only way forward is a name someone drops. Every guest who gets name-dropped becomes a door you can open next.",
    play: [
      "Start at S6 E1. The guests James name-drops light up as your next doors.",
      "Tap a name-drop to hear the exact moment it was said, then open that guest's episode.",
      "Each episode you open adds its own name-drops, so the map branches out - everyone's journey is different.",
      "Collect each guest's polaroid in the order you found them: your own Afterparty.",
      "No one dropped the name? Use a wildcard (like Chi Chi & Johnny on Lisa's trail).",
      "Play Lisa's trail as the guided route, or find your own.",
    ],
    uses: ["Name-drops in every episode (who, when, the context)", "Episode player timestamps", "Polaroids", "Network graph"],
    needs: ["Trail map that grows as you play", "Unlocked guests saved in the visitor's browser", "Wildcard rule", "Shareable trail picture"],
  },
  {
    name: "James's Games",
    status: "Idea",
    pitch:
      "James plays quick games with his guests on the show - 60 seconds on the clock, true or false, a lightning round. Play the same game yourself, then hear how the guest did.",
    play: [
      "Pick a game from the show. The clock starts, you type your answers.",
      "Answers count if they were accepted on the show - by the guest or the hosts piling in.",
      "Then compare: you got 12 original Tunnel kids, Larry got 3 before the hosts jumped in.",
      "Tap to hear the real moment from the episode.",
      "New games join whenever James plays one in a new Afterparty.",
    ],
    uses: ["Episode references (the names and themes said in each game)", "Episode player timestamps", "Pub Quiz question logic"],
    needs: ["Accepted-answer list per game (from the episode)", "60-second clock and typed answers with name matching", "True or false cards", "Score to share"],
    moments: [
      { id: "s03e08", time: "00:03:54", label: "Larry Tee: name 25 original Tunnel club kids in 60 seconds" },
      { id: "s04e08", time: "00:24:19", label: "Richie Rich: name 10 90s club kids and why they were fabulous" },
      { id: "s03e06", time: "00:14:07", label: "Eric Goode: 60 seconds to name Area's themes" },
      { id: "s01e07", time: "00:21:51", label: "Rudolf Piper: true or false - who really worked at Danceteria?" },
      { id: "s02e08", time: "00:01:44", label: "Michelangelo Signorile: lightning round through his first 20 years" },
      { id: "s01e04", time: "00:39:16", label: "Bonus: Peter Gatien on the game show the Tunnel staged, with RuPaul" },
    ],
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

type Step = { id: string; guest: string; date: string; by?: { id: string; guest: string; time: string; context: string } | undefined };

// Lisa's real trail: the Afterparties in the order she published them, each with the earlier episode that first dropped
// that guest's name. Built from the data, so it grows with every new Afterparty.
function useTrail(): Step[] {
  return useMemo(() => {
    const ordered = [...episodes].sort((a, b) => a.afterpartyPublished.localeCompare(b.afterpartyPublished));
    return ordered.map((e, i) => {
      const earlier = ordered.slice(0, i);
      const refs = entityFor(e.guest)?.refs ?? [];
      const prior = earlier.map((p) => ({ p, r: refs.find((r) => r.episode === p.id) })).find((x) => x.r);
      return {
        id: e.id,
        guest: e.guest,
        date: e.afterpartyPublished.slice(0, 10),
        by: prior ? { id: prior.p.id, guest: prior.p.guest, time: prior.r!.time, context: prior.r!.context } : undefined,
      };
    });
  }, []);
}


function LisasTrail() {
  const trail = useTrail();
  return (
    <section className="px-6 pb-12">
      <div className="mx-auto max-w-4xl rounded-2xl border border-pink/50 bg-card p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-pink">Lisa's trail - how the Afterparty order happened</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Every Afterparty in the order it was published, and the earlier episode that dropped the guest's name. Tap a time to hear
          the name-drop.
        </p>
        <ol className="mt-5 grid gap-3">
          {trail.map((s, i) => (
            <li key={s.id} className="flex items-start gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0">
              <span className="w-6 shrink-0 pt-1 text-right text-sm font-semibold text-gold">{i + 1}</span>
              {episodePortraits[s.id] ? (
                <img src={episodePortraits[s.id]} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-sm object-cover" />
              ) : (
                <span className="h-12 w-12 shrink-0 rounded-sm bg-muted" />
              )}
              <div className="min-w-0 text-sm leading-relaxed">
                <Link to={episodePath(s.id as never)} className="font-semibold text-cream hover:text-pink">
                  {s.guest}
                </Link>{" "}
                <span className="text-muted-foreground">· {episodeCode(s.id)}</span>
                {i === 0 ? (
                  <p className="text-muted-foreground">The starting point.</p>
                ) : s.by ? (
                  <p className="text-muted-foreground">
                    Name-dropped by <span className="text-foreground">{s.by.guest}</span> ({episodeCode(s.by.id)}){" "}
                    <Timestamp episodeId={s.by.id} time={s.by.time} className="text-xs" />
                    <span className="block text-xs">{s.by.context}</span>
                  </p>
                ) : (
                  <p className="text-muted-foreground">Wildcard - nobody on the trail had dropped the name yet.</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

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

      <LisasTrail />

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
              {g.draft && (
                <Link to={g.draft} className="mt-3 inline-block rounded-full bg-pink px-4 py-2 text-xs font-semibold uppercase tracking-wider text-pink-foreground hover:opacity-90">
                  Play the first draft &rarr;
                </Link>
              )}
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
              {g.moments && (
                <div className="mt-5 border-t border-border pt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">On the show</h3>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed">
                    {g.moments.map((m) => (
                      <li key={m.id + m.time} className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-muted-foreground">{episodeCode(m.id)}</span>
                        <span>{m.label}</span>
                        <Timestamp episodeId={m.id} time={m.time} className="text-xs" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}
