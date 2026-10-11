import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import refsRaw from "../data/s06e01.json";
import { guests } from "../data/guests";
import { sceneEvents } from "../data/scene";
import { latestEpisode } from "../data/episodes";
import { Button } from "@/components/ui/button";
import { EntityLink } from "../components/entity-link";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { entityFor, totalMentions } from "../data/entities";

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
  fashion?: string;
};

const refs = refsRaw as Ref[];
const EPISODE_URL = latestEpisode.audioUrl;

export const Route = createFileRoute("/episodes/s06e01")({
  component: EpisodePage,
  head: () => ({
    meta: [
      { title: "James St. James — Night Fever S6 E1 Reference Index" },
      {
        name: "description",
        content:
           `All ${refs.length} references in Night Fever Season 6 Episode 1 with James St. James, with timestamps, links and fashion notes.`,
      },
      { property: "og:title", content: "James St. James — Night Fever S6 E1 Reference Index" },
      {
        property: "og:description",
         content: `All ${refs.length} names, places, works and looks from the James St. James episode, with timestamps, links and fashion notes.`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/episodes/s06e01" }],
  }),
});

const toSec = (t: string) => t.split(":").reduce((a, b) => a * 60 + Number(b), 0);
// Spotify timestamp links need the time in milliseconds (seconds are ignored).
const spotifyAt = (t: string) => `${EPISODE_URL}?t=${toSec(t) * 1000}`;

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

type Sort = "mentions" | "all" | "time";

function EpisodePage() {
  const [sort, setSort] = useState<Sort>("mentions");
  const [cat, setCat] = useState("All");

  const enriched = useMemo(
    () =>
      refs.map((r) => {
        const card = entityFor(r.name);
        return {
          ...r,
          ...crossLinks(r.name),
          everywhere: card ? totalMentions(card) : r.mentions,
        };
      }),
    [],
  );

  const cats = ["All", ...Array.from(new Set(refs.map((r) => r.category)))];
  const list = enriched
    .filter((r) => cat === "Fashion" ? r.fashion !== undefined : cat === "All" || r.category === cat)
    .sort((a, b) => {
      if (a.time === "On camera" || b.time === "On camera") {
        if (a.time === b.time) return a.rank - b.rank;
        return a.time === "On camera" ? 1 : -1;
      }
      if (sort === "time") return toSec(a.time) - toSec(b.time);
      if (sort === "all")
        return b.everywhere - a.everywhere || b.mentions - a.mentions;
      return b.mentions - a.mentions || toSec(a.time) - toSec(b.time);
    });
  const moods = refs.filter((r) => r.category === "Mood");

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
            Every name, club, book, song, night and look from the interview &mdash; {refs.length} references
            and {refs.reduce((total, r) => total + r.mentions, 0)} mentions in this episode.
          </p>
          <a href={EPISODE_URL} target="_blank" rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-pink px-6 py-3 font-semibold text-pink-foreground hover:opacity-90">
            Listen to the episode
          </a>
        </div>
      </section>

      <MoodSpectrum
        moods={moods.filter((m) => m.time !== "On camera")}
        id="episode-mood"
        title="Mood of the episode"
      />
      <MoodSpectrum
        moods={moods.filter((m) => m.time === "On camera")}
        id="presenter-looks"
        title="Presenters’ on-camera looks"
      />


      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex flex-wrap gap-2">
              <span className="self-center text-sm text-muted-foreground">Sort:</span>
              <Button variant="outline" aria-pressed={sort === "mentions"} className={btn(sort === "mentions")} onClick={() => setSort("mentions")}>Most mentioned here</Button>
              <Button variant="outline" aria-pressed={sort === "all"} className={btn(sort === "all")} onClick={() => setSort("all")}>Most mentioned across all</Button>
              <Button variant="outline" aria-pressed={sort === "time"} className={btn(sort === "time")} onClick={() => setSort("time")}>Timestamp</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...cats, "Fashion"].map((c) => (
                <Button variant="outline" aria-pressed={cat === c} key={c} className={btn(cat === c)} onClick={() => setCat(c)}>{c}</Button>
              ))}
            </div>
          </div>

          <ul aria-label="Episode references" className="mt-6 divide-y divide-border">
            {list.map((r, i) => (
              <li key={r.name + i} className="grid gap-3 py-5 sm:grid-cols-[90px_1fr_auto]">
                {r.time === "On camera" ? (
                  <span className="text-sm text-gold">On camera</span>
                ) : (
                  <a href={spotifyAt(r.time)} target="_blank" rel="noreferrer"
                    className="font-mono text-sm text-gold hover:text-pink">{r.time}</a>
                )}
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <EntityLink name={r.name}
                      className="text-lg font-semibold text-cream underline decoration-border underline-offset-4 hover:text-pink" />
                    {r.link && (
                      <a href={r.link} target="_blank" rel="noreferrer" aria-label={`Read about ${r.name} elsewhere`}
                        className="text-xs text-muted-foreground hover:text-gold">↗</a>
                    )}
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{r.category}</span>
                    {r.status !== "Confirmed" && (
                      <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-xs text-gold">{r.status}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground"><EntityText text={r.context} /></p>
                  {r.fashion && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="mr-2 text-xs font-medium uppercase text-gold">Fashion</span>{r.fashion}
                    </p>
                  )}
                  {r.heard && r.heard !== r.name && (
                    <p className="mt-1 text-xs italic text-muted-foreground/70">Heard as &ldquo;{r.heard}&rdquo;</p>
                  )}
                  {(r.guest || r.events.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {r.guest && (
                        <Link to="/explore/$slug" params={{ slug: r.guest.slug }} className="rounded-full border border-pink/50 px-2.5 py-0.5 text-pink hover:bg-pink hover:text-pink-foreground">
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
                <div className="text-right text-sm text-muted-foreground sm:w-28">
                  <span className="text-2xl font-bold text-cream">{r.mentions === 0 ? "—" : r.mentions}</span>
                  <div className="text-xs">in this episode</div>
                  {r.everywhere > 0 && r.everywhere !== r.mentions && (
                    <div className="mt-1 text-xs text-gold">{r.everywhere} across all</div>
                  )}
                  {r.everywhere > 0 && r.everywhere === r.mentions && (
                    <div className="mt-1 text-xs text-muted-foreground/70">this episode only</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-muted-foreground">
            The big number counts mentions in this episode; the gold number counts the same name across all
            episodes on the site. Timestamps mark the first mention.{" "}
            <Link to="/connections" className="text-gold hover:text-pink">See the connection web &rarr;</Link>
          </p>
        </div>
      </section>
          <footer className="border-t border-border px-6 py-10 text-center">
        <LegalNote />
      </footer>

</main>
  );
}

// Swatch colors per look, matched by keywords in the entry name (data stays in the JSON).
const SWATCHES: { match: RegExp; colors: [string, string]; label: string }[] = [
  { match: /James's on-camera/i, colors: ["var(--mood-swatch-1)", "var(--mood-swatch-2)"], label: "Champagne & amber" },
  { match: /Fenton's on-camera/i, colors: ["var(--mood-swatch-3)", "var(--mood-swatch-4)"], label: "Cobalt & orange" },
  { match: /Randy's on-camera/i, colors: ["var(--mood-swatch-5)", "var(--mood-swatch-6)"], label: "Kelly green & navy" },
  { match: /film-school/i, colors: ["var(--mood-swatch-7)", "var(--mood-swatch-8)"], label: "Neon pink & leopard" },
  { match: /Converse/i, colors: ["var(--mood-swatch-9)", "var(--mood-swatch-10)"], label: "Pink high tops" },
  { match: /paper/i, colors: ["var(--mood-swatch-11)", "var(--mood-swatch-12)"], label: "Paper white & silver" },
  { match: /Warhol/i, colors: ["var(--mood-swatch-13)", "var(--mood-swatch-14)"], label: "Silver & black" },
  { match: /Drag/i, colors: ["var(--mood-swatch-15)", "var(--mood-swatch-16)"], label: "Magenta & gold" },
  { match: /Rhoda|Bad Seed/i, colors: ["var(--mood-swatch-17)", "var(--mood-swatch-18)"], label: "Powder blue & lace" },
  { match: /Ball gowns/i, colors: ["var(--mood-swatch-19)", "var(--mood-swatch-20)"], label: "Velvet black & crimson" },
  { match: /outfits/i, colors: ["var(--mood-swatch-21)", "var(--mood-swatch-22)"], label: "Flamboyant mix" },
];
const swatchFor = (name: string) =>
  SWATCHES.find((s) => s.match.test(name)) ?? { colors: ["var(--mood-swatch-23)", "var(--mood-swatch-24)"] as [string, string], label: "Mood" };

function MoodSpectrum({ moods, id, title }: { moods: Ref[]; id: string; title: string }) {
  const [i, setI] = useState(0);
  if (moods.length === 0) return null;
  const active = moods[Math.min(i, moods.length - 1)];
  if (!active) return null;
  const sw = swatchFor(active.name);
  return (
    <section aria-labelledby={id} className="px-6 pb-12">
      <div className="mx-auto max-w-5xl">
        <h2 id={id} className="text-3xl font-bold text-cream">{title}</h2>
        <div className="mt-6 flex h-16 overflow-hidden rounded-lg border border-border" role="group" aria-label={`${title} colors`}>
          {moods.map((m, k) => {
            const s = swatchFor(m.name);
            return (
              <Button variant="ghost" key={m.rank} aria-pressed={k === i} aria-label={m.name} onClick={() => setI(k)}
                className={`h-full min-w-0 rounded-none p-0 flex-1 transition-all motion-reduce:transition-none ${k === i ? "flex-[2.5] ring-2 ring-inset ring-cream" : "opacity-80 hover:opacity-100"}`}
                style={{ background: `linear-gradient(135deg, ${s.colors[0]} 50%, ${s.colors[1]} 50%)` }} />
            );
          })}
        </div>
        <input type="range" min={0} max={moods.length - 1} value={i} onChange={(e) => setI(Number(e.target.value))}
          aria-label={`Choose a look: ${title}`} className="mt-3 w-full accent-[var(--gold)]" />
        <article className="mt-4 border-l-4 pl-5 py-2" style={{ borderLeftColor: sw.colors[0] }} aria-live="polite">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold text-cream">{active.name}</h3>
            {active.time === "On camera" ? (
              <span className="text-sm text-gold">On camera</span>
            ) : (
              <a href={spotifyAt(active.time)} target="_blank" rel="noreferrer" className="font-mono text-sm text-gold hover:text-pink">{active.time}</a>
            )}
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-pink">{sw.label}</p>
          {active.fashion && active.fashion !== "Worn or shown in the episode" && (
            <p className="mt-3 text-foreground">{active.fashion}</p>
          )}
          <p className="mt-3 text-sm text-muted-foreground"><EntityText text={active.context} /></p>
        </article>
      </div>
    </section>
  );
}
