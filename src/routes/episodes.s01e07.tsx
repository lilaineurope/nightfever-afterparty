import { Timestamp, useEpisodePlayer } from "@/components/episode-player";
import { linkPlace } from "@/lib/link-label";
import { episodeHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import refsRaw from "../data/s01e07.json";
import { guests } from "../data/guests";
import { sceneEvents } from "../data/scene";
import { Button } from "@/components/ui/button";
import { EntityLink } from "../components/entity-link";
import { EntityText } from "../components/entity-text";
import { namedOnCount } from "@/lib/name-links";
import { LegalNote } from "../components/legal-links";
import { entityFor, totalMentions } from "../data/entities";
import { episodeById } from "../data/episodes";
import { MoodSpectrum } from "../components/mood-spectrum";
import { SiteFooter } from "@/components/site-footer";

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
  colours?: string[];
};

const refs = refsRaw as Ref[];
// Watch on WOW Presents Plus, hear on Spotify — both come from the shared episode list.
const thisEpisode = episodeById("s01e07");

export const Route = createFileRoute("/episodes/s01e07")({
  staticData: { sitemap: true },
  component: EpisodePage,
  head: () => episodeHead("s01e07", refs.length),
});

const toSec = (t: string) => t.split(":").reduce((a, b) => a * 60 + Number(b), 0);

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
  useEpisodePlayer("s01e07");
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
      <section className="relative px-6 pb-12 pt-14">
        <div className="relative z-10 mx-auto max-w-4xl border-2 border-gold bg-card/92 px-6 py-8 text-center shadow-[6px_8px_0_var(--color-gold)] sm:px-10">
          <Link to="/guests" className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-pink">
            &larr; Meet all the guests
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-pink">Season 1 · Episode 7</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">Rudolf Piper</h1>
          <p className="mt-4 text-gold">Club owner and promoter · Danceteria, the Tunnel, Mars · club designer in São Paulo</p>
          <p className="mt-2 text-sm text-muted-foreground">Released 11 Oct 2021 · 1:10:35 as a podcast</p>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Every name, club, book, song, night and look from the interview - {refs.length} references
            and {refs.reduce((total, r) => total + r.mentions, 0)} mentions in this episode. From a 24-hour club six floors under a Berlin bunker and the one-night Pravda to Danceteria's floors, Madonna's first shows, Keith Haring's black-and-white floor, the Club Kids' basement at the Tunnel and a Liberace party with white pianos everywhere. Wow!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={thisEpisode.watchUrl} target="_blank" rel="noreferrer"
              className="inline-block rounded-full bg-pink px-6 py-3 font-semibold text-pink-foreground hover:opacity-90">
              Watch the episode
            </a>
            <a href={thisEpisode.listenUrl} target="_blank" rel="noreferrer"
              className="inline-block rounded-full border border-gold px-6 py-3 font-semibold text-gold hover:bg-gold hover:text-gold-foreground">
              Listen to the episode
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="episode-mood" className="px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <h2 id="episode-mood" className="text-3xl font-bold text-cream">Mood of the episode</h2>
        </div>
        <MoodSpectrum episodeId="s01e07" swatchFor={swatchFor} nested moods={moods.filter((m) => m.time === "On camera")} id="presenter-looks" title="On screen" />
        <MoodSpectrum episodeId="s01e07" swatchFor={swatchFor} nested moods={moods.filter((m) => m.time !== "On camera")} id="story-looks" title="In the stories" />
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex flex-wrap gap-2">
              <span className="self-center text-sm text-muted-foreground">Sort by:</span>
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
                  <Timestamp episodeId="s01e07" time={r.time} className="text-sm" />
                )}
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    {r.link ? (
                      <EntityLink name={r.name}
                        className="text-lg font-semibold text-cream underline decoration-border underline-offset-4 hover:text-pink" />
                    ) : (
                      <span className="text-lg font-semibold text-cream">{r.name}</span>
                    )}
                    {r.link && (
                      <a href={r.link} target="_blank" rel="noreferrer" aria-label={`Read about ${r.name} ${linkPlace(r.link)}`} title={`Read more ${linkPlace(r.link)}`}
                        className="text-xs text-muted-foreground hover:text-gold">↗</a>
                    )}
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">{r.category}</span>
                    {r.status !== "Confirmed" && (
                      <span className="rounded-full border border-gold/40 px-2.5 py-0.5 text-xs text-gold">{r.status}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground"><EntityText text={r.context} self={r.name} /></p>
                  {r.fashion && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="mr-2 text-xs font-medium uppercase text-gold">Fashion</span><EntityText text={r.fashion} self={r.name} />
                    </p>
                  )}
                  {r.heard && r.heard !== r.name && r.heard !== "—" && (
                    <p className="mt-1 text-xs italic text-muted-foreground/70">Heard as &ldquo;{r.heard}&rdquo;</p>
                  )}
                  {(r.guest || r.events.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {r.guest && (
                        <Link to="/explore/$slug" params={{ slug: r.guest.slug }} className="rounded-full border border-pink/50 px-2.5 py-0.5 text-pink hover:bg-pink hover:text-pink-foreground">
                          A Night Fever guest &rarr;
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
                    <div className="mt-1 text-xs text-muted-foreground/70">{namedOnCount(r.name) > 0 ? `only counted here · named on ${namedOnCount(r.name)} more card${namedOnCount(r.name) > 1 ? "s" : ""}` : "this episode only"}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-muted-foreground">
            The big number counts mentions in this episode. The gold number counts the same name across all
            episodes on the site. Timestamps mark the first mention. Spot something wrong? Tell me!{" "}
            <Link to="/network" className="text-gold hover:text-pink">Dive into the Network &rarr;</Link>
          </p>
        </div>
      </section>
          <SiteFooter />
</main>
  );
}

// Every look in this episode carries its own supplied `colours`, so this fallback is never shown.
const swatchFor = (_name: string) => ({
  colors: ["var(--mood-swatch-12)", "var(--mood-swatch-13)", "var(--mood-swatch-14)"] as [string, string, string],
  label: "Story palette · unspecified colours",
});
