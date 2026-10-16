import { Timestamp, useEpisodePlayer } from "@/components/episode-player";
import { linkPlace } from "@/lib/link-label";
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
import episodeBackground from "../assets/episode-james-st-james.jpg";
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
};

const refs = refsRaw as Ref[];
const EPISODE_URL = latestEpisode.listenUrl;

export const Route = createFileRoute("/episodes/s06e01")({
  staticData: { sitemap: true },
  component: EpisodePage,
  head: () => ({
    meta: [
      { title: "James St. James - Night Fever S6 E1 Reference Index | Night Fever fan page" },
      {
        name: "description",
        content:
           `All ${refs.length} references in Night Fever Season 6 Episode 1 with James St. James - timestamps, links and fashion notes included. Dive in!`,
      },
      { property: "og:title", content: "James St. James - Night Fever S6 E1 Reference Index | Night Fever fan page" },
      {
        property: "og:description",
         content: `All ${refs.length} names, places, works and looks from the James St. James episode - timestamped and linked. Grab a drink and dive in!`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/episodes/s06e01" }],
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
  useEpisodePlayer("s06e01");
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
          <img src={episodeBackground} alt="" width={1536} height={864} fetchPriority="high"
            className="h-full w-full object-cover object-[75%_center] sm:object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Link to="/guests" className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-pink">
            &larr; Meet all the guests
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-pink">Season 6 · Episode 1</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">James St. James</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Every name, club, book, song, night and look from the interview - {refs.length} references
            and {refs.reduce((total, r) => total + r.mentions, 0)} mentions in this episode. So exciting!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={latestEpisode.watchUrl} target="_blank" rel="noreferrer"
              className="inline-block rounded-full bg-pink px-6 py-3 font-semibold text-pink-foreground hover:opacity-90">
              Watch the episode
            </a>
            <a href={latestEpisode.listenUrl} target="_blank" rel="noreferrer"
              className="inline-block rounded-full border border-gold px-6 py-3 font-semibold text-gold hover:bg-gold hover:text-gold-foreground">
              Listen to the episode
            </a>
          </div>
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
        title="The presenters’ on-camera looks"
      />


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
                  <Timestamp episodeId="s06e01" time={r.time} className="text-sm" />
                )}
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <EntityLink name={r.name}
                      className="text-lg font-semibold text-cream underline decoration-border underline-offset-4 hover:text-pink" />
                    {r.link && (
                      <a href={r.link} target="_blank" rel="noreferrer" aria-label={`Read about ${r.name} ${linkPlace(r.link)}`} title={`Read more ${linkPlace(r.link)}`}
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

// Swatch colors per look, matched by keywords in the entry name (data stays in the JSON).
const SWATCHES: { match: RegExp; colors: [string, string, string]; label: string }[] = [
  { match: /James's on-camera/i, colors: ["var(--mood-swatch-1)", "var(--mood-swatch-2)", "var(--mood-swatch-32)"], label: "Champagne, amber & burgundy" },
  { match: /Fenton's on-camera/i, colors: ["var(--mood-swatch-3)", "var(--mood-swatch-34)", "var(--mood-swatch-35)"], label: "Cobalt, orange & wallpaper yellow" },
  { match: /Randy's on-camera/i, colors: ["var(--mood-swatch-6)", "var(--mood-swatch-5)", "var(--mood-swatch-36)"], label: "Navy, kelly green & plaid cream" },
  { match: /film-school/i, colors: ["var(--mood-swatch-7)", "var(--mood-swatch-8)", "var(--mood-swatch-15)"], label: "Neon pink, leopard & magenta" },
  { match: /Converse/i, colors: ["var(--mood-swatch-9)", "var(--mood-swatch-10)", "var(--mood-swatch-12)"], label: "Pink, cream & sole grey" },
  { match: /paper/i, colors: ["var(--mood-swatch-11)", "var(--mood-swatch-25)", "var(--mood-swatch-13)"], label: "Paper white, silver & grey" },
  { match: /Warhol/i, colors: ["var(--mood-swatch-25)", "var(--mood-swatch-14)", "var(--mood-swatch-10)"], label: "Silver, black & flash white" },
  { match: /Drag/i, colors: ["var(--mood-swatch-15)", "var(--mood-swatch-16)", "var(--mood-swatch-7)"], label: "Magenta, gold & hot pink" },
  { match: /Rhoda|Bad Seed/i, colors: ["var(--mood-swatch-17)", "var(--mood-swatch-30)", "var(--mood-swatch-32)"], label: "Powder blue, lace cream & burgundy" },
  { match: /Ball gowns/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-20)", "var(--mood-swatch-8)"], label: "Velvet black, crimson & gold" },
  { match: /outfits/i, colors: ["var(--mood-swatch-15)", "var(--mood-swatch-8)", "var(--mood-swatch-5)"], label: "Magenta, gold & green" },
];
const swatchFor = (name: string) =>
  SWATCHES.find((s) => s.match.test(name)) ?? { colors: ["var(--mood-swatch-23)", "var(--mood-swatch-33)", "var(--mood-swatch-24)"] as [string, string, string], label: "Mood" };

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
                style={{ background: `linear-gradient(135deg, ${s.colors[0]} 0 33.333%, ${s.colors[1]} 33.333% 66.666%, ${s.colors[2]} 66.666% 100%)` }} />
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
              <Timestamp episodeId="s06e01" time={active.time} className="text-sm" />
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
