import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { VideoScreen } from "@/components/video-screen";
import { episodePath } from "@/data/episodes";
import { getScreenPage } from "@/lib/screen-page.functions";
import type { Person, ScreenPageView, WatchRow } from "@/lib/screen-page.server";
import type { Trailer } from "@/lib/library-item";
import { pageHead } from "@/lib/seo";
import "@fontsource/covered-by-your-grace/400.css";
import { QuoteName } from "@/components/quote-name";

// One page per film or show on the Library's Moving Images shelves (Lisa, 24 Nov 2026: "do it like we did it with the
// artwork list and pages - and instead the poster it would be the jukebox video bigger. info box who was involved, find as
// many cast and team and support information as possible"). The Jukebox screen big on the side, everyone involved beside it,
// then what the guests said, how it came up on the show (▶ plays the moment) and more from the same shelf.
// Data: src/lib/screen-page.server.ts.

export const Route = createFileRoute("/library_/moving-images/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const v = await getScreenPage({ data: params.slug });
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const v = loaderData;
    return pageHead({
      path: `/library/moving-images/${v.slug}`,
      title: `${v.name} – ${v.kind.toLowerCase()} | Night Fever AFTERPARTY Library`,
      description: `${v.name} (${v.line}): everyone who was involved, cast and team, what the Night Fever guests said about it and its clip.`,
      image: "/og/library.jpg",
    });
  },
  component: ScreenPage,
});

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

function Name({ p }: { p: Person }) {
  return p.href ? (
    <a href={p.href} className={`art-name${p.ours ? " scr-ours" : ""}`}>
      {p.name}
    </a>
  ) : (
    <span className="art-name-plain">{p.name}</span>
  );
}

function People({ people }: { people: Person[] }) {
  return (
    <>
      {people.map((p, i) => (
        <span key={p.name}>
          {i > 0 && (i === people.length - 1 ? " and " : ", ")}
          {p.polaroid && <img src={p.polaroid} alt="" className="art-face" width={240} height={240} loading="lazy" />}
          <Name p={p} />
        </span>
      ))}
    </>
  );
}

/** One thing the big Jukebox can play: a clip or trailer from our playlists, or the whole work (src/data/screen-full.ts). */
type Play = Trailer & { full?: boolean; file?: string; note?: string };

function playsOf(v: ScreenPageView): Play[] {
  const f = v.full;
  if (!f) return v.videos;
  const whole: Play =
    f.kind === "youtube"
      ? { id: f.id, title: f.title, label: f.title, episodeId: "", short: "", kind: "clip", full: true, note: `${f.what} · ${f.minutes} min · official upload: ${f.channel}` }
      : { id: "file", title: f.title, label: f.title, episodeId: "", short: "", kind: "clip", full: true, file: f.src, note: `${f.what} · ${f.minutes} min · ${f.source}` };
  return [whole, ...v.videos.filter((t) => t.id !== whole.id)];
}

/** The Jukebox, big (Lisa: "instead the poster it would be the jukebox video bigger"): the whole work first when its owner
 *  put it up or it is public domain ("Watch it in full", 24 Nov 2026), then our playlist clips and trailers. Nothing loads
 *  until a visitor presses ▶. With nothing to play, the poster or title card fills the screen. */
function BigJukebox({ v }: { v: ScreenPageView }) {
  const [now, setNow] = useState<Play | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const list = playsOf(v).filter((t) => !failed.includes(t.id));
  const pick = list[0];
  const next = (from: Play) => {
    const i = list.findIndex((t) => t.id === from.id);
    setNow(list[i + 1] ?? null);
  };
  const word = (t: Play) => (t.full ? "Watch it in full" : t.kind === "clip" ? "The clip" : t.kind === "about" ? "On film" : "The trailer");
  const from = (t: Play) => t.note ?? `From our ${t.short} AFTERPARTY playlist`;
  return (
    <figure className="scr-big">
      <div className="lit-jbx scr-jbx">
        <div>
          <p className="lit-jbx-kicker">The Night Fever</p>
          <p className="lit-jbx-title">
            {pick ? (
              <>
                Juke<b>box</b>
              </>
            ) : (
              <>
                On scre<b>en</b>
              </>
            )}
          </p>
          <div className="lit-jbx-screen scr-screen">
            {now?.file ? (
              // A public-domain film from Wikimedia Commons, in the browser's own player.
              <video src={now.file} controls autoPlay className="scr-file" onEnded={() => next(now)} />
            ) : now ? (
              <VideoScreen
                vid={now.id}
                title={now.title}
                onEnd={() => next(now)}
                onFail={() => {
                  setFailed((f) => [...f, now.id]);
                  next(now);
                }}
              />
            ) : pick ? (
              <button type="button" className="lit-jbx-press" onClick={() => setNow(pick)} aria-label={`Play ${word(pick).toLowerCase()}: ${pick.title}`}>
                {v.poster && <img src={v.poster.src} alt="" className="scr-glow" aria-hidden />}
                <span className={`lit-jbx-k${pick.full ? " scr-full-k" : ""}`}>{word(pick)}</span>
                <span className="lit-jbx-play scr-play" aria-hidden>
                  ▶
                </span>
                <span className="lit-jbx-nm">{pick.title}</span>
                <span className="lit-jbx-sm">{from(pick)}</span>
              </button>
            ) : v.poster ? (
              <img src={v.poster.src} alt={`${v.kind === "TV show" ? "Title card" : "Poster"} - ${v.name}`} className="scr-poster" />
            ) : (
              <span className="scr-test" aria-hidden>
                <span>{v.name}</span>
              </span>
            )}
          </div>
        </div>
        {list.length > 1 && (
          <ol className="lit-jbx-sel scr-sel">
            {list.map((t, i) => (
              <li key={t.id}>
                <button type="button" aria-pressed={now?.id === t.id} onClick={() => setNow(t)}>
                  <i>{t.full ? "▶" : `A${i + 1}`}</i>
                  <span>
                    {t.full ? <b>In full: </b> : null}
                    {t.title} {t.short && <small>· {t.short}</small>}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}
        <p className="lit-jbx-fine">
          {!pick
            ? "No clip of it in our AFTERPARTY playlists yet."
            : pick.file
              ? "Plays from Wikimedia Commons (public domain), loaded only when you press ▶."
              : "Plays from YouTube, loaded only when you press ▶ - same as the Jukebox."}
        </p>
        <div className="lit-jbx-grille" aria-hidden />
      </div>
      {v.poster && <figcaption>{v.poster.credit}</figcaption>}
    </figure>
  );
}

// ---- Where to watch (Lisa, 24 Nov 2026: "an option to check where to watch it, somewhere the user is connected to, like Plex
// does it"). The offers come from TMDB, whose data is JustWatch's - both credited. The country is picked here in the
// visitor's browser (their saved "nf-place", else the clock's time zone); nothing is sent anywhere. ----
const COUNTRY: Record<string, string> = {
  SE: "Sweden", GB: "the UK", US: "the USA", DE: "Germany", FR: "France", NL: "the Netherlands", DK: "Denmark", NO: "Norway",
  FI: "Finland", ES: "Spain", IT: "Italy", IE: "Ireland", CA: "Canada", AU: "Australia", BR: "Brazil", MX: "Mexico", JP: "Japan",
};
const TZ: [RegExp, string][] = [
  [/Stockholm/, "SE"], [/London/, "GB"], [/Berlin/, "DE"], [/Paris/, "FR"], [/Amsterdam/, "NL"], [/Copenhagen/, "DK"],
  [/Oslo/, "NO"], [/Helsinki/, "FI"], [/Madrid/, "ES"], [/Rome/, "IT"], [/Dublin/, "IE"], [/Toronto|Vancouver|Montreal/, "CA"],
  [/Australia/, "AU"], [/Sao_Paulo/, "BR"], [/Mexico/, "MX"], [/Tokyo/, "JP"], [/^America\//, "US"],
];
function homeCountry(): string {
  let c = "";
  try {
    const saved = window.localStorage.getItem("nf-place");
    c = saved === "se" ? "SE" : saved === "uk" ? "GB" : saved === "us" ? "US" : "";
  } catch {
    /* storage blocked */
  }
  if (!c) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    c = TZ.find(([re]) => re.test(tz))?.[1] ?? "";
  }
  return c;
}
function guessCountry(have: string[]): string {
  const c = homeCountry();
  return have.includes(c) ? c : have.includes("US") ? "US" : (have[0] ?? "US");
}
const OFFER: [keyof Omit<WatchRow, "link">, string][] = [
  ["stream", "Stream"],
  ["free", "Free"],
  ["ads", "Free with ads"],
  ["rent", "Rent"],
  ["buy", "Buy"],
];

function WhereToWatch({ v }: { v: ScreenPageView }) {
  const have = v.watch ? Object.keys(v.watch.countries) : [];
  const [c, setC] = useState<string>(have.includes("US") ? "US" : (have[0] ?? "US"));
  const [home, setHome] = useState("");
  useEffect(() => {
    setC(guessCountry(have));
    setHome(homeCountry());
  }, [v.slug]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!v.watch || have.length === 0) return null;
  const row = v.watch.countries[c];
  return (
    <section className="art-box scr-box scr-watch" aria-labelledby="scr-watch">
      <div className="scr-watch-head">
        <h2 id="scr-watch" className={h}>
          Where to watch it
        </h2>
        <label className="scr-watch-where">
          in{" "}
          <select value={c} onChange={(e) => setC(e.target.value)} aria-label="Country">
            {have.map((k) => (
              <option key={k} value={k}>
                {COUNTRY[k] ?? k}
              </option>
            ))}
          </select>
        </label>
      </div>
      {home && COUNTRY[home] && !have.includes(home) && (
        <p className="mt-1 text-sm text-muted-foreground">
          No service offers it in {COUNTRY[home]} right now, so here is {COUNTRY[c] ?? c}.
        </p>
      )}
      {row ? (
        <dl className="scr-watch-rows">
          {OFFER.filter(([k]) => row[k]?.length).map(([k, label]) => (
            <div key={k}>
              <dt>{label}</dt>
              <dd>
                {row[k]!.map((p) => (
                  <span key={p} className="scr-chip">
                    {p}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">Not on any service there right now.</p>
      )}
      <p className="scr-src">
        {row?.link && (
          <>
            <a href={row.link} target="_blank" rel="noreferrer" className="scr-ep">
              See every offer &rarr;
            </a>{" "}
            ·{" "}
          </>
        )}
        Streaming data from JustWatch, via TMDB. Offers change - checked now and then.
      </p>
    </section>
  );
}

function Rows({ rows }: { rows: { role: string; people: Person[] }[] }) {
  return (
    <dl className="art-credits mt-3">
      {rows.map((r) => (
        <div key={r.role}>
          <dt>{r.role}</dt>
          <dd>
            <People people={r.people} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Cast({ v }: { v: ScreenPageView }) {
  const [all, setAll] = useState(false);
  const FOLD = 24;
  const shown = all ? v.cast : v.cast.slice(0, FOLD);
  return (
    <ul className="scr-cast mt-3">
      {shown.map((p, i) => (
        <li key={p.name} className={i < v.leads ? "scr-lead" : undefined}>
          {p.polaroid && <img src={p.polaroid} alt="" className="art-face" width={240} height={240} loading="lazy" />}
          <span>
            <Name p={p} />
            {p.as && <span className="scr-as"> as {p.as}</span>}
          </span>
        </li>
      ))}
      {v.cast.length > FOLD && !all && (
        <li>
          <button type="button" className="scr-more" onClick={() => setAll(true)}>
            Show all {v.cast.length} &rarr;
          </button>
        </li>
      )}
    </ul>
  );
}

function Head({ v, wide }: { v: ScreenPageView; wide?: boolean }) {
  return (
    <div className={wide ? "scr-head-wide" : undefined}>
      <div>
        <p className="art-tag">{v.kind}</p>
        {v.full && <p className="art-tag scr-full-tag">▶ Watch it in full</p>}
        <h1 className={`art-title${v.name.length > 28 ? " art-title-long" : ""}`}>
          <a href={v.href} className="art-name">
            {v.name}
          </a>
        </h1>
        <p className="art-for">{v.line}</p>
        {v.intro && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.intro}</p>}
      </div>
      <Facts v={v} />
    </div>
  );
}

function Facts({ v }: { v: ScreenPageView }) {
  if (v.facts.length === 0) return null;
  return (
    <dl className="scr-facts">
      {v.facts.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Team({ v }: { v: ScreenPageView }) {
  if (v.team.length === 0) return null;
  return (
    <>
      <h3 className="scr-sub">The team</h3>
      <Rows rows={v.team} />
    </>
  );
}
function CastPart({ v }: { v: ScreenPageView }) {
  if (v.cast.length === 0) return null;
  return (
    <>
      <h3 className="scr-sub">
        {v.kind === "TV show" ? "On screen" : "The cast"} <span>{v.cast.length}</span>
      </h3>
      <Cast v={v} />
    </>
  );
}
function Support({ v }: { v: ScreenPageView }) {
  if (v.support.length === 0) return null;
  return (
    <>
      <h3 className="scr-sub">Support</h3>
      <Rows rows={v.support} />
    </>
  );
}
function Awards({ v }: { v: ScreenPageView }) {
  if (v.awards.length === 0 && v.nominations === 0) return null;
  return (
    <>
      <h3 className="scr-sub">Awards</h3>
      <ul className="scr-awards mt-3">
        {v.awards.map((a) => (
          <li key={a.name + (a.year ?? "") + (a.for ?? "")}>
            <b>★</b> {a.name}
            {a.for ? ` (${a.for})` : ""}
            {a.year ? ` · ${a.year}` : ""}
          </li>
        ))}
        {v.nominations > 0 && (
          <li className="text-muted-foreground">
            and {v.nominations} nomination{v.nominations === 1 ? "" : "s"}
          </li>
        )}
      </ul>
    </>
  );
}
function SourceNote({ v }: { v: ScreenPageView }) {
  return <p className="scr-src">From {v.sources.join(", ")}. Pink names have a page on the site.</p>;
}
const nobody = (v: ScreenPageView) => v.team.length + v.cast.length + v.support.length === 0;
function Nobody() {
  return (
    <p className="mt-3 text-sm text-muted-foreground">
      Nothing we can check names who made it yet. Know who did? Tell me in the box at the bottom of the page.
    </p>
  );
}

function Said({ v, className = "" }: { v: ScreenPageView; className?: string }) {
  if (v.quotes.length === 0) return null;
  return (
    <section className={className} aria-labelledby="scr-said">
      <h2 id="scr-said" className={h}>
        What the guests said
      </h2>
      <ul className="lit-quotes scr-quotes mt-4">
        {v.quotes.map((q) => (
          <li key={q.episodeId + q.time} className="lit-quote">
            <blockquote>{q.quote}</blockquote>
            <p className="lit-quote-who">
              {q.polaroid && <img src={q.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" />}
              <span>
                <QuoteName who={q.who} episodeId={q.episodeId} className="art-name font-semibold" />
                <br />
                {q.short} · <Timestamp episodeId={q.episodeId} time={q.time} />
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Episode mentions: pink title link + yellow ▶ time code + what was said underneath (Lisa, 22 Nov 2026). */
function CameUp({ v, className = "", one = false }: { v: ScreenPageView; className?: string; one?: boolean }) {
  if (v.moments.length === 0) return null;
  return (
    <section className={className} aria-labelledby="scr-came-up">
      <h2 id="scr-came-up" className={h}>
        How it came up on the show
      </h2>
      <ul className={`art-moments mt-3${one ? " scr-moments-one" : ""}`}>
        {v.moments.map((m) => (
          <li key={m.episodeId + m.time}>
            {m.polaroid && (
              <img src={m.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" className="art-face" />
            )}
            <div>
              <Link to={episodePath(m.episodeId as never)} className="scr-ep">
                {m.short} · {m.guest}
              </Link>{" "}
              <Timestamp episodeId={m.episodeId} time={m.time} />
              <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{m.context}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function More({ v }: { v: ScreenPageView }) {
  if (v.more.length === 0) return null;
  return (
    <section className="scr-more-row" aria-labelledby="scr-more">
      <h2 id="scr-more" className={h}>
        More {v.group.toLowerCase()}
      </h2>
      <ul className="art-more scr-more-strip mt-4">
        {v.more.map((m) => (
          <li key={m.slug}>
            <Link to="/library/moving-images/$slug" params={{ slug: m.slug }} className="art-more-hit">
              <span className="art-more-pic">
                {m.src ? (
                  <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                ) : (
                  <span className="scr-more-type">{m.name}</span>
                )}
              </span>
              <span className="art-name">{m.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ScreenPage() {
  const v = Route.useLoaderData() as ScreenPageView;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6">
        <nav className="art-crumbs" aria-label="Where you are">
          <Link to="/library" className="art-name">
            Library
          </Link>{" "}
          ·{" "}
          <Link to="/library" search={{ cat: "moving-images" }} className="art-name">
            Moving Images
          </Link>{" "}
          · <span>{v.group}</span>
        </nav>

        {/* Front page rows (Lisa picked C, 24 Nov 2026: "too much white space around the boxes"): the title across the top,
            the Jukebox and the team box level beside it, the cast across, then the guests' words and the moments. */}
        <div className="scr-c">
          <Head v={v} wide />
          <div className="scr-c-row">
            <BigJukebox v={v} />
            <section className="art-box scr-box" aria-labelledby="scr-involved">
              <h2 id="scr-involved" className={h}>
                Who was involved
              </h2>
              {nobody(v) && <Nobody />}
              <Team v={v} />
              <Support v={v} />
              <Awards v={v} />
              {v.cast.length === 0 && <SourceNote v={v} />}
            </section>
          </div>
          {v.cast.length > 0 && (
            <section className="art-box scr-box scr-c-cast">
              <CastPart v={v} />
              <SourceNote v={v} />
            </section>
          )}
          <WhereToWatch v={v} />
          <div className="scr-pair">
            <Said v={v} />
            <CameUp v={v} one={v.quotes.length > 0} />
          </div>
        </div>

        <More v={v} />
      </div>
      <SiteFooter />
    </main>
  );
}
