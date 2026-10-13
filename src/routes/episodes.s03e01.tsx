import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import refsRaw from "../data/s03e01.json";
import { guests } from "../data/guests";
import { sceneEvents } from "../data/scene";
import { Button } from "@/components/ui/button";
import { EntityLink } from "../components/entity-link";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { entityFor, totalMentions } from "../data/entities";
import { episodeById } from "../data/episodes";
import { MoodSpectrum } from "../components/mood-spectrum";
import episodeBackground from "../assets/episode-patricia-field-v2.jpg";
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
const thisEpisode = episodeById("s03e01");

export const Route = createFileRoute("/episodes/s03e01")({
  staticData: { sitemap: true },
  component: EpisodePage,
  head: () => ({
    meta: [
      { title: "Patricia Field - Night Fever S3 E1 Reference Index | Night Fever fan page" },
      {
        name: "description",
        content: `All ${refs.length} references in Night Fever Season 3 Episode 1 with Patricia Field - timestamps, links and fashion notes included. Dive in!`,
      },
      { property: "og:title", content: "Patricia Field - Night Fever S3 E1 Reference Index | Night Fever fan page" },
      {
        property: "og:description",
        content: `All ${refs.length} names, places, works and looks from the Patricia Field episode - timestamped and linked. Grab a drink and dive in!`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/episodes/s03e01" }],
  }),
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
      <section className="relative flex min-h-[480px] items-center overflow-hidden px-6 pb-12 pt-24 sm:min-h-[540px]">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={episodeBackground} alt="" width={1376} height={768} fetchPriority="high"
            className="h-full w-full object-cover object-[75%_center] sm:object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Link to="/guests" className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-pink">
            &larr; Meet all the guests
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-pink">Season 3 · Episode 1</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">Patricia Field</h1>
          <p className="mt-4 text-gold">Store owner, stylist and costume designer · Sex and the City, The Devil Wears Prada</p>
          <p className="mt-2 text-sm text-muted-foreground">Released 15 Jun 2023 · 51:54 on WOW, 52:18 as a podcast</p>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Every name, club, book, song, night and look from the interview - {refs.length} references
            and {refs.reduce((total, r) => total + r.mentions, 0)} mentions in this episode. Fenton was off on a secret assignment, so it's James and Randy in the chairs. So exciting!
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
        <MoodSpectrum swatchFor={swatchFor} nested moods={moods.filter((m) => m.time === "On camera")} id="presenter-looks" title="On screen" />
        <MoodSpectrum swatchFor={swatchFor} nested moods={moods.filter((m) => m.time !== "On camera")} id="story-looks" title="In the stories" />
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
                  <span className="font-mono text-sm text-gold">{r.time}</span>
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
                    <div className="mt-1 text-xs text-muted-foreground/70">this episode only</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-muted-foreground">
            The big number counts mentions in this episode. The gold number counts the same name across all
            episodes on the site. Timestamps mark the first mention. Spot something wrong? Tell me!{" "}
            <Link to="/connections" className="text-gold hover:text-pink">Dive into the connection web &rarr;</Link>
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
