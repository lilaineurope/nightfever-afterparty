import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import refsRaw from "../data/s06e01.json";
import { guests } from "../data/guests";
import { sceneEvents } from "../data/scene";

type Ref = {
  rank: number;
  mentions: number;
  category: string;
  name: string;
  heard: string;
  time: string;
  context: string;
  link: string;
  status: string;
};

const refs = refsRaw as Ref[];
const EPISODE_URL = "https://open.spotify.com/episode/2WEQu8LV4uIufb9Wb6Fye4";

export const Route = createFileRoute("/episodes/s06e01")({
  component: EpisodePage,
  head: () => ({
    meta: [
      { title: "James St. James — Night Fever S6 E1 Reference Index" },
      {
        name: "description",
        content:
          "Every person, club, book, song and event mentioned in Night Fever Season 6 Episode 1 with James St. James, with timestamps and links.",
      },
      { property: "og:title", content: "James St. James — Night Fever S6 E1 Reference Index" },
      {
        property: "og:description",
        content: "All 109 names, places and works dropped in the James St. James episode, timestamped and linked.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/episodes/s06e01" }],
  }),
});

const toSec = (t: string) => t.split(":").reduce((a, b) => a * 60 + Number(b), 0);
const spotifyAt = (t: string) => `${EPISODE_URL}?t=${toSec(t)}`;

// How often a name comes up across the rest of the show (guests + scene timeline)
function crossLinks(name: string) {
  const n = name.toLowerCase();
  const guest = guests.find((g) => g.name.toLowerCase() === n);
  const events = sceneEvents.filter(
    (e) =>
      e.figures.some((f) => f.toLowerCase() === n) ||
      (guest && e.people.includes(guest.slug)) ||
      e.place.toLowerCase().includes(n),
  );
  return { guest, events };
}

type Sort = "mentions" | "time";

function EpisodePage() {
  const [sort, setSort] = useState<Sort>("mentions");
  const [cat, setCat] = useState("All");

  const enriched = useMemo(() => {
    const counts: Record<string, number> = {};
    refs.forEach((r) => (counts[r.name] = (counts[r.name] ?? 0) + 1));
    return refs.map((r) => {
      const x = crossLinks(r.name);
      return { ...r, ...x, mentions: counts[r.name]! + x.events.length + (x.guest ? 1 : 0) };
    });
  }, []);

  const cats = ["All", ...Array.from(new Set(refs.map((r) => r.category)))];
  const list = enriched
    .filter((r) => cat === "All" || r.category === cat)
    .sort((a, b) =>
      sort === "time"
        ? toSec(a.time) - toSec(b.time)
        : b.mentions - a.mentions || toSec(a.time) - toSec(b.time),
    );

  const btn = (on: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition ${
      on ? "border-gold bg-gold text-gold-foreground" : "border-border text-muted-foreground hover:border-pink hover:text-pink"
    }`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-12 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link to="/guests" className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-pink">
            &larr; All guests
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-pink">Season 6 · Episode 1</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">James St. James</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Every name, club, book, song and night dropped in the interview &mdash; {refs.length} references, each
            with the moment it comes up. Click a timestamp to jump there in Spotify.
          </p>
          <a href={EPISODE_URL} target="_blank" rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-pink px-6 py-3 font-semibold text-pink-foreground hover:opacity-90">
            Listen to the episode
          </a>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex gap-2">
              <span className="self-center text-sm text-muted-foreground">Sort:</span>
              <button className={btn(sort === "mentions")} onClick={() => setSort("mentions")}>Most mentioned</button>
              <button className={btn(sort === "time")} onClick={() => setSort("time")}>Timestamp</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button key={c} className={btn(cat === c)} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          </div>

          <ul className="mt-6 divide-y divide-border">
            {list.map((r, i) => (
              <li key={r.name + i} className="grid gap-3 py-5 sm:grid-cols-[90px_1fr_auto]">
                <a href={spotifyAt(r.time)} target="_blank" rel="noreferrer"
                  className="font-mono text-sm text-gold hover:text-pink">{r.time}</a>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    {r.link ? (
                      <a href={r.link} target="_blank" rel="noreferrer"
                        className="text-lg font-semibold text-cream underline decoration-border underline-offset-4 hover:text-pink">{r.name}</a>
                    ) : (
                      <span className="text-lg font-semibold text-cream">{r.name}</span>
                    )}
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{r.category}</span>
                    {r.status !== "Confirmed" && (
                      <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-xs text-gold">{r.status}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.context}</p>
                  {r.heard && r.heard !== r.name && (
                    <p className="mt-1 text-xs italic text-muted-foreground/70">Heard as &ldquo;{r.heard}&rdquo;</p>
                  )}
                  {(r.guest || r.events.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {r.guest && (
                        <Link to="/guests" hash={r.guest.slug} className="rounded-full border border-pink/50 px-2.5 py-0.5 text-pink hover:bg-pink hover:text-pink-foreground">
                          Night Fever guest &rarr;
                        </Link>
                      )}
                      {r.events.slice(0, 3).map((e) => (
                        <Link key={e.id} to="/timeline" className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground hover:text-gold">
                          {e.year}: {e.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right text-sm text-muted-foreground sm:w-20">
                  <span className="text-2xl font-bold text-cream">{r.mentions}</span>
                  <div className="text-xs">mention{r.mentions === 1 ? "" : "s"}</div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-muted-foreground">
            Mentions = this episode plus appearances across other Night Fever guests and the scene timeline.
            Timestamps are first mention. <Link to="/connections" className="text-gold hover:text-pink">See the connection web &rarr;</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
