import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import refsRaw from "../data/s01e02.json";
import { guests } from "../data/guests";
import { sceneEvents } from "../data/scene";
import { Button } from "@/components/ui/button";
import { EntityLink } from "../components/entity-link";
import { EntityText } from "../components/entity-text";
import { LegalNote } from "../components/legal-links";
import { entityFor, totalMentions } from "../data/entities";
import { episodeById } from "../data/episodes";
import episodeBackground from "../assets/episode-michael-musto.jpg";

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
// Watch on WOW Presents Plus, hear on Spotify — both come from the shared episode list.
const thisEpisode = episodeById("s01e02");

export const Route = createFileRoute("/episodes/s01e02")({
  component: EpisodePage,
  head: () => ({
    meta: [
      { title: "Michael Musto — Night Fever S1 E2 Reference Index" },
      {
        name: "description",
        content: `All ${refs.length} references in Night Fever Season 1 Episode 2 with Michael Musto, with timestamps, links and fashion notes.`,
      },
      { property: "og:title", content: "Michael Musto — Night Fever S1 E2 Reference Index" },
      {
        property: "og:description",
        content: `All ${refs.length} names, places, works and looks from the Michael Musto episode, with timestamps, links and fashion notes.`,
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/episodes/s01e02" }],
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
          <img src={episodeBackground} alt="" width={1536} height={864} fetchPriority="high"
            className="h-full w-full object-cover object-[75%_center] sm:object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Link to="/timeline" className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-pink">
            &larr; Timeline &amp; guests
          </Link>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-pink">Season 1 · Episode 2</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">Michael Musto</h1>
          <p className="mt-4 text-gold">Village Voice nightlife columnist · La Dolce Musto</p>
          <p className="mt-2 text-sm text-muted-foreground">Released 6 Sep 2021 · 1:04:35</p>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Every name, club, book, song, night and look from the interview &mdash; {refs.length} references
            and {refs.reduce((total, r) => total + r.mentions, 0)} mentions in this episode.
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
        <MoodSpectrum moods={moods.filter((m) => m.time === "On camera")} id="presenter-looks" title="On screen" />
        <MoodSpectrum moods={moods.filter((m) => m.time !== "On camera")} id="story-looks" title="In the stories" />
      </section>

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

// Presenter colours follow the supplied descriptions; story palettes interpret materials and themes, not verified outfit colours.
const SWATCHES: { match: RegExp; colors: [string, string, string]; label: string }[] = [
  { match: /Michael's on-camera/i, colors: ["var(--mood-swatch-33)", "var(--mood-swatch-28)", "var(--mood-swatch-12)"], label: "Lavender-white, tortoiseshell & grey" },
  { match: /James's on-camera/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-11)", "var(--mood-swatch-25)"], label: "Black, white & pearl" },
  { match: /Randy's on-camera/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-20)", "var(--mood-swatch-12)"], label: "Black, red & grey" },
  { match: /Fenton's on-camera/i, colors: ["var(--mood-swatch-6)", "var(--mood-swatch-11)", "var(--mood-swatch-13)"], label: "Navy, white & translucent" },
  { match: /Bernard Zette's theme characters/i, colors: ["var(--mood-swatch-20)", "var(--mood-swatch-17)", "var(--mood-swatch-25)"], label: "Story palette · costume red, space blue & courtly pearl" },
  { match: /Young RuPaul's look/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-13)", "var(--mood-swatch-31)"], label: "Story palette · rubber black & metallic Mylar" },
  { match: /Young Musto's Studio 54 look/i, colors: ["var(--mood-swatch-31)", "var(--mood-swatch-12)", "var(--mood-swatch-6)"], label: "Story palette · wire silver, Brillo grey & midnight" },
  { match: /James's little girl's dress/i, colors: ["var(--mood-swatch-9)", "var(--mood-swatch-25)", "var(--mood-swatch-35)"], label: "Story palette · party pink, pinafore pearl & confetti yellow" },
  { match: /Rudolf and Dianne's comic-book glamour/i, colors: ["var(--mood-swatch-20)", "var(--mood-swatch-14)", "var(--mood-swatch-1)"], label: "Story palette · comic-book red, ink black & glamour gold" },
  { match: /Musto's roles in A Sound of Muzak/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-11)", "var(--mood-swatch-15)"], label: "Story palette · nun black, habit white & stage fuchsia" },
  { match: /John Sex's unicorn hairdo/i, colors: ["var(--mood-swatch-35)", "var(--mood-swatch-11)", "var(--mood-swatch-7)"], label: "Story palette · unicorn gold, white & electric pink" },
  { match: /Paulina Porizkova's new blonde hair/i, colors: ["var(--mood-swatch-35)", "var(--mood-swatch-30)", "var(--mood-swatch-36)"], label: "Story palette · blonde, pale gold & champagne" },
  { match: /Dean Johnson's six-foot-six bald drag/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-15)", "var(--mood-swatch-31)"], label: "Story palette · punk black, fuchsia & silver" },
  { match: /Dianne Brill's rubber dress/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-27)", "var(--mood-swatch-13)"], label: "Story palette · rubber black, water teal & rescue silver" },
  { match: /Deflated airplane balloon/i, colors: ["var(--mood-swatch-13)", "var(--mood-swatch-17)", "var(--mood-swatch-28)"], label: "Story palette · balloon silver, sky blue & rubber-band amber" },
  { match: /^Downtown dressing$/i, colors: ["var(--mood-swatch-15)", "var(--mood-swatch-22)", "var(--mood-swatch-14)"], label: "Story palette · DIY fuchsia, acid mint & street black" },
  { match: /Raquel Welch's Victor\/Victoria costume/i, colors: ["var(--mood-swatch-14)", "var(--mood-swatch-11)", "var(--mood-swatch-20)"], label: "Story palette · cabaret black, white & curtain red" },
  { match: /Peter Allen shirtless/i, colors: ["var(--mood-swatch-8)", "var(--mood-swatch-24)", "var(--mood-swatch-6)"], label: "Story palette · warm amber, dance-floor pink & midnight" },
  { match: /Lahoma hanging up the wig/i, colors: ["var(--mood-swatch-26)", "var(--mood-swatch-12)", "var(--mood-swatch-14)"], label: "Story palette · fading plum, grey & black" },
  { match: /Baroness Sherry gussied up/i, colors: ["var(--mood-swatch-26)", "var(--mood-swatch-25)", "var(--mood-swatch-1)"], label: "Story palette · evening plum, pearl & gold" },
  { match: /Citrus Hills's grapefruit headpiece/i, colors: ["var(--mood-swatch-9)", "var(--mood-swatch-4)", "var(--mood-swatch-5)"], label: "Story palette · grapefruit pink, citrus orange & peel green" },
  { match: /'Mop and Glow' shine/i, colors: ["var(--mood-swatch-11)", "var(--mood-swatch-13)", "var(--mood-swatch-22)"], label: "Story palette · glossy white, reflective silver & mint" },
  { match: /Dressed down in button-down shirts/i, colors: ["var(--mood-swatch-17)", "var(--mood-swatch-11)", "var(--mood-swatch-12)"], label: "Story palette · understated blue, white & grey" },
];
const swatchFor = (name: string) =>
  SWATCHES.find((s) => s.match.test(name)) ?? { colors: ["var(--mood-swatch-12)", "var(--mood-swatch-13)", "var(--mood-swatch-14)"] as [string, string, string], label: "Story palette · unspecified colours" };

function MoodSpectrum({ moods, id, title }: { moods: Ref[]; id: string; title: string }) {
  const [i, setI] = useState(0);
  if (moods.length === 0) return null;
  const active = moods[Math.min(i, moods.length - 1)];
  if (!active) return null;
  const sw = swatchFor(active.name);
  return (
    <section aria-labelledby={id} className="pt-8">
      <div className="mx-auto max-w-5xl">
        <h3 id={id} className="text-xl font-bold text-cream">{title}</h3>
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
            <h4 className="text-xl font-semibold text-cream">{active.name}</h4>
            {active.time === "On camera" ? (
              <span className="text-sm text-gold">On camera</span>
            ) : (
              <span className="font-mono text-sm text-gold">{active.time}</span>
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
