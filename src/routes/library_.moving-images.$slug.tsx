import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { VideoScreen } from "@/components/video-screen";
import { episodePath } from "@/data/episodes";
import { getScreenPage } from "@/lib/screen-page.functions";
import type { Person, ScreenPageView } from "@/lib/screen-page.server";
import type { Trailer } from "@/lib/library-item";
import { pageHead } from "@/lib/seo";
import "@fontsource/covered-by-your-grace/400.css";

// One page per film or show on the Library's Moving Images shelves (Lisa, 24 Nov 2026: "do it like we did it with the
// artwork list and pages - and instead the poster it would be the jukebox video bigger. info box who was involved, find as
// many cast and team and support information as possible"). The Jukebox screen big on the side, everyone involved beside it,
// then what the guests said, how it came up on the show (▶ plays the moment) and more from the same shelf.
// Data: src/lib/screen-page.server.ts.

export const Route = createFileRoute("/library_/moving-images/$slug")({
  staticData: { sitemap: false },
  // MOCK (layout options for Lisa, 24 Nov 2026) - remove once she picks one.
  validateSearch: (s: Record<string, unknown>): { layout?: string } =>
    typeof s["layout"] === "string" ? { layout: s["layout"] } : {},
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

/** The Jukebox, big (Lisa: "instead the poster it would be the jukebox video bigger"): our playlist clips and trailers. Nothing
 *  loads from YouTube until a visitor presses ▶. With no video in our playlists, the poster or title card fills the screen. */
function BigJukebox({ v }: { v: ScreenPageView }) {
  const [now, setNow] = useState<Trailer | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const list = v.videos.filter((t) => !failed.includes(t.id));
  const pick = list[0];
  const next = (from: Trailer) => {
    const i = list.findIndex((t) => t.id === from.id);
    setNow(list[i + 1] ?? null);
  };
  const word = (t: Trailer) => (t.kind === "clip" ? "The clip" : t.kind === "about" ? "On film" : "The trailer");
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
            {now ? (
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
                <span className="lit-jbx-k">{word(pick)}</span>
                <span className="lit-jbx-play scr-play" aria-hidden>
                  ▶
                </span>
                <span className="lit-jbx-nm">{pick.title}</span>
                <span className="lit-jbx-sm">From our {pick.short} AFTERPARTY playlist</span>
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
                  <i>A{i + 1}</i>
                  <span>
                    {t.title} <small>· {t.short}</small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}
        <p className="lit-jbx-fine">
          {pick
            ? "Plays from YouTube, loaded only when you press ▶ - same as the Jukebox."
            : "No clip of it in our AFTERPARTY playlists yet."}
        </p>
        <div className="lit-jbx-grille" aria-hidden />
      </div>
      {v.poster && <figcaption>{v.poster.credit}</figcaption>}
    </figure>
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

/** Who was involved, all in one box (Lisa: "info box who was involved, find as many cast and team and support information as possible"). */
function Involved({ v, className = "" }: { v: ScreenPageView; className?: string }) {
  return (
    <section className={`art-box scr-box ${className}`} aria-labelledby="scr-involved">
      <h2 id="scr-involved" className={h}>
        Who was involved
      </h2>
      {nobody(v) && <Nobody />}
      <Team v={v} />
      <CastPart v={v} />
      <Support v={v} />
      <Awards v={v} />
      <SourceNote v={v} />
    </section>
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
                <Link to={episodePath(q.episodeId as never)} className="art-name font-semibold">
                  {q.who}
                </Link>
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
  const { layout = "b" } = Route.useSearch();
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

        {layout === "a" ? (
          // A - Big screen on top: the title beside its facts, the Jukebox the full width, then the credits in three columns.
          <div className="scr-a">
            <Head v={v} wide />
            <BigJukebox v={v} />
            <section className="art-box scr-box scr-a-credits" aria-labelledby="scr-involved">
              <h2 id="scr-involved" className={h}>
                Who was involved
              </h2>
              {nobody(v) && <Nobody />}
              <div className="scr-a-cols">
                <div>
                  <Team v={v} />
                  <Support v={v} />
                  <Awards v={v} />
                </div>
                {v.cast.length > 0 && (
                  <div className="scr-a-cast">
                    <CastPart v={v} />
                  </div>
                )}
              </div>
              <SourceNote v={v} />
            </section>
            <div className="scr-pair">
              <Said v={v} />
              <CameUp v={v} one={v.quotes.length > 0} />
            </div>
          </div>
        ) : layout === "c" ? (
          // C - Front page: the title across the top, then rows of boxes the same height - screen | team, cast across, support | awards.
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
              </section>
            </div>
            {v.cast.length > 0 && (
              <section className="art-box scr-box scr-c-cast">
                <CastPart v={v} />
                <SourceNote v={v} />
              </section>
            )}
            <div className="scr-pair">
              <Said v={v} />
              <CameUp v={v} one={v.quotes.length > 0} />
            </div>
          </div>
        ) : (
          // B - Two full columns: the screen, the guests' words and the moments on the left; the title and who was involved on
          // the right. Both columns keep going, so nothing is left empty beside the other.
          <div className="scr-b">
            <div className="scr-b-l">
              <BigJukebox v={v} />
              <Said v={v} />
              <CameUp v={v} one />
            </div>
            <div className="scr-b-r">
              <Head v={v} />
              <Involved v={v} />
            </div>
          </div>
        )}

        <More v={v} />
      </div>
      <SiteFooter />
    </main>
  );
}
