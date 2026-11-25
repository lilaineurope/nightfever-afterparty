import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { VideoScreen } from "@/components/video-screen";
import { FanSuggestions } from "@/components/fan-suggestions";
import { episodePath } from "@/data/episodes";
import { linkToSlug, useLinks } from "@/lib/link-index";
import type { StoryView, DroppedBy as DroppedByT, LibraryItemView, Trailer } from "@/lib/library-item";

// Library item pages (Lisa, 21 Nov 2026 - "yes to everything"): the extra boxes a book, magazine, newspaper, column, diary,
// film or TV card gets under its header - who dropped it (their polaroids), what the guests said about it, the trailer
// Jukebox, its connections, "Find me, borrow me" (WorldCat, Libris, our own Stockholm check), "Find me, buy me" and the other
// Library items from the same Afterparties. The cover and the facts sit in the header (src/routes/explore.$slug.tsx).
// Outside links: only the find/borrow/buy boxes link out (Lisa asked for them), each says where it goes (↗).

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

/** Who dropped it: each Afterparty that names it - the guest's polaroid, what was said and the moment to play. It replaces the
 *  card's plain "In the episodes" list on Library item pages (Lisa, 21 Nov 2026: one lonely polaroid looked too messy). */
// Front page (Lisa, 22 Nov 2026, mockup A): the boxes are dealt into up to three columns that end about level, with a rule
// between them like a newspaper front page - nine show before "Show all".
const DROPPED_SHOWN = 9;
// Lisa, 21 Nov 2026 ("if we have situations like this - merge the box, do it for all library pages"): a guest who dropped it
// and is also quoted gets one box - their quote sits inside their "Who dropped it" box, not on a separate quote wall.
// Guests with a quote come first, so their words are above the fold.
const quotesOf = (v: LibraryItemView, episodeId: string) => v.quotes.filter((q) => q.episodeId === episodeId);
/** Deal the boxes into columns by a rough height (lines of text at a column's width), so the columns end about level. Each
 *  box keeps its place in the list (`at`), so a phone - one column - shows them in the original order. */
function dealColumns(list: DroppedByT[], n: number, quoteLen: (id: string) => number): { d: DroppedByT; at: number }[][] {
  const cols: { d: DroppedByT; at: number }[][] = Array.from({ length: Math.min(n, list.length) }, () => []);
  const tall = cols.map(() => 0);
  const lines = (chars: number, perLine: number) => (chars ? Math.ceil(chars / perLine) : 0);
  list.forEach((d, at) => {
    const est = 110 + (d.guest.length > 16 ? 20 : 0) + lines(quoteLen(d.episodeId), 30) * 22 + d.said.reduce((t, m) => t + lines(m.text.length + 9, 38) * 18, 0);
    const i = tall.indexOf(Math.min(...tall));
    cols[i]!.push({ d, at });
    tall[i]! += Math.max(est, 140) + 22;
  });
  return cols;
}
function DroppedBy({ v, name }: { v: LibraryItemView; name: string }) {
  const [all, setAll] = useState(false);
  if (v.dropped.length === 0) return null;
  const ordered = [...v.dropped].sort((a, b) => Number(quotesOf(v, b.episodeId).length > 0) - Number(quotesOf(v, a.episodeId).length > 0));
  const shown = all ? ordered : ordered.slice(0, DROPPED_SHOWN);
  const cols = dealColumns(shown, 3, (id) => quotesOf(v, id).reduce((t, q) => t + q.quote.length + 9, 0));
  return (
    <section aria-labelledby="dropped-by">
      <h2 id="dropped-by" className={h}>Who dropped it</h2>
      <div className={`lit-wall lit-wall-${cols.length} mt-5`}>
        {cols.map((col, ci) => (
          <ul key={ci} className="lit-wall-col">
            {col.map(({ d, at }) => (
              <li key={d.episodeId} className="lit-drop" style={{ order: at }}>
                <Link to={episodePath(d.episodeId as never)} className="lit-pol" aria-label={`${d.guest}, ${d.short}`}>
                  {d.polaroid ? <img src={d.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" /> : <span className="lit-pol-blank">{d.short}</span>}
                </Link>
                <div className="min-w-0">
                  <Link to={episodePath(d.episodeId as never)} className="lit-drop-who">{d.guest}</Link>
                  <p className="lit-drop-line">
                    {d.short}
                    {d.mentions > 1 && <> · {d.mentions} mentions</>}
                  </p>
                  {quotesOf(v, d.episodeId).map((q) => (
                    <blockquote key={q.time} className="lit-drop-quote">
                      {q.quote} <Timestamp episodeId={q.episodeId} time={q.time} />
                    </blockquote>
                  ))}
                  {d.said.map((m, i) => (
                    <p key={i} className="lit-drop-said">
                      {m.time && m.time !== "On camera" && <><Timestamp episodeId={d.episodeId} time={m.time} />{" "}</>}
                      <EntityText text={m.text} self={name} />
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {v.dropped.length > DROPPED_SHOWN && (
        <button type="button" className="lit-more" onClick={() => setAll((a) => !a)} aria-expanded={all}>
          {all ? "Show fewer" : `Show all ${v.dropped.length} Afterparties`}
        </button>
      )}
    </section>
  );
}

/** A book no guest has dropped yet (src/data/written-by.ts, Lisa 22 Nov 2026): instead of "Who dropped it", where its writer
 *  comes up on the show - each line like every other "In the episodes" list: "S6E3 · Guest" opens the AFTERPARTY (black to
 *  pink), the yellow time plays the episode from that moment, what was said underneath. */
const WRITER_SHOWN = 9;
function WriterOnShow({ v }: { v: LibraryItemView }) {
  const [all, setAll] = useState(false);
  const w = v.writer;
  if (!w) return null;
  const shown = all ? w.moments : w.moments.slice(0, WRITER_SHOWN);
  const who = w.episodeId ? (
    <Link to={episodePath(w.episodeId as never)} className="lit-drop-who">{w.name}</Link>
  ) : w.slug ? (
    <Link to="/explore/$slug" params={{ slug: w.slug }} className="lit-drop-who">{w.name}</Link>
  ) : (
    <span className="lit-drop-who">{w.name}</span>
  );
  return (
    <section aria-labelledby="writer-on-show">
      <h2 id="writer-on-show" className={h}>Not dropped on the show yet</h2>
      <div className="lit-writer mt-5">
        {w.polaroid && <img src={w.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" className="lit-writer-pol" />}
        <div className="min-w-0">
          <p className="lit-drop-line">{w.role === "Photographs" ? "Photographed by" : "Written by"}</p>
          {who}
          <p className="lit-drop-line">
            {w.moments.length > 0
              ? <>comes up in {new Set(w.moments.map((m) => m.episodeId)).size} Afterpart{new Set(w.moments.map((m) => m.episodeId)).size === 1 ? "y" : "ies"}:</>
              : <>No guest has talked about this book or its writer yet.</>}
          </p>
        </div>
      </div>
      {shown.length > 0 && (
        <ul className="lit-writer-lines mt-4">
          {shown.map((m) => (
            <li key={m.episodeId + m.time}>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <Link to={episodePath(m.episodeId as never)} className="font-semibold text-[#111] transition-colors hover:text-pink focus-visible:text-pink">
                  {m.short} · {m.guest}
                </Link>
                {m.time && m.time !== "On camera" && <Timestamp episodeId={m.episodeId} time={m.time} className="text-xs" />}
              </div>
              {m.context && <p className="mt-0.5"><EntityText text={m.context} /></p>}
            </li>
          ))}
        </ul>
      )}
      {w.moments.length > WRITER_SHOWN && (
        <button type="button" className="lit-more" onClick={() => setAll((a) => !a)} aria-expanded={all}>
          {all ? "Show fewer" : `Show all ${w.moments.length} moments`}
        </button>
      )}
    </section>
  );
}

/** What the guests said about it: their own words, each with their polaroid and the moment (src/data/item-quotes.ts). */
function GuestQuotes({ v }: { v: LibraryItemView }) {
  // Quotes from a guest who dropped it already sit in their "Who dropped it" box.
  const dropped = new Set(v.dropped.map((d) => d.episodeId));
  const quotes = v.quotes.filter((q) => !dropped.has(q.episodeId));
  if (quotes.length === 0) return null;
  return (
    <section aria-labelledby="guest-quotes">
      <h2 id="guest-quotes" className={h}>What the guests said about it</h2>
      <ul className="lit-quotes mt-5">
        {quotes.map((q) => (
          <li key={q.episodeId + q.time} className="lit-quote">
            <blockquote>{q.quote}</blockquote>
            <p className="lit-quote-who">
              {q.polaroid && <img src={q.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" />}
              <span>
                <Link to={episodePath(q.episodeId as never)} className="font-semibold text-gold hover:text-pink">{q.who}</Link>
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

/** "Who made me" (Lisa, 21 Nov 2026): the publishing team behind a book - author and publisher from the stocktake, and the
 *  other roles (editor, photographer, foreword, designer, distributor...) only where src/data/book-credits.ts confirms them.
 *  For a magazine or newspaper it is the masthead: who founded it, and the guests and people on the site who worked there,
 *  in their own words on the show (src/data/publication-facts.ts). */
function hasWhoMadeMe(v: LibraryItemView): boolean {
  if (v.shelf === "books") return !!v.facts || v.credits.length > 0;
  return (v.press?.team.length ?? 0) > 0;
}
function WhoMadeMe({ v, name }: { v: LibraryItemView; name: string }) {
  const links = useLinks();
  if (!hasWhoMadeMe(v)) return null;
  const chip = (n: { name: string; slug?: string | undefined }) =>
    n.slug ? <Link key={n.name} {...linkToSlug(links, n.slug)} className="diary-chip">{n.name} →</Link> : <span key={n.name}>{n.name}</span>;
  const rows: { role: string; body: React.ReactNode; key: string }[] = [];
  const f = v.facts;
  const p = v.press;
  if (v.shelf === "books") {
    if (f?.author) rows.push({ key: "author", role: "Written by", body: <EntityText text={f.author} self={name} /> });
    if (f?.publisher) rows.push({ key: "publisher", role: "Published by", body: <>{f.publisher}{f.year ? <span className="text-muted-foreground"> · {f.year}</span> : null}</> });
    for (const c of v.credits) rows.push({ key: c.role + c.name, role: c.role, body: chip(c) });
    if (f?.isbn) rows.push({ key: "isbn", role: "ISBN", body: <span className="font-mono text-xs">{f.isbn}</span> });
  } else if (p) {
    // Who founded it and when sit on the name card in the header (src/routes/explore.$slug.tsx) - here only the people.
    for (const t of p.team)
      rows.push({
        key: t.role + t.name,
        role: t.role,
        body: (
          <>
            {chip(t)}
            {(t.note || t.short) && (
              <span className="lit-credit-note">
                {t.note}
                {t.note && t.short ? " · " : ""}
                {t.short && t.episodeId && <>{t.short}{t.time && <> <Timestamp episodeId={t.episodeId} time={t.time} /></>}</>}
              </span>
            )}
          </>
        ),
      });
  }
  return (
    <section className="lit-box lit-made-by" aria-labelledby="who-made-me">
      <h2 id="who-made-me" className={h}>Who made me</h2>
      <dl className="lit-credits mt-4">
        {rows.map((r) => (
          <div key={r.key}>
            <dt>{r.role}</dt>
            <dd>{r.body}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        {v.shelf === "books"
          ? <>Only the names we could confirm from the book and its library records. Know who else worked on it - the editor, the photographer, the designer? Tell me in &ldquo;Got a copy?&rdquo; below.</>
          : <>In the guests&rsquo; own words on the show. Worked there yourself? Tell me in &ldquo;Got a copy?&rdquo; below.</>}
      </p>
    </section>
  );
}

/** The issues they talk about (Lisa, 21 Nov 2026): every real issue or cover a guest names on the show, as a typed cover with
 *  its cover line, the guest who told it and a search for that exact issue. */
function IssueShelf({ v, name }: { v: LibraryItemView; name: string }) {
  const issues = v.press?.issues ?? [];
  if (issues.length === 0) return null;
  const mast = name.replace(/\s*\(.*\)$/, "").replace(/\s+magazine$/i, "");
  return (
    <section aria-labelledby="issues">
      <h2 id="issues" className={h}>The issues they talk about</h2>
      <ul className="lit-issues mt-5">
        {issues.map((i) => (
          <li key={i.what} className="lit-issue">
            {i.page ? (
              // Its own issue page (Lisa, 22 Nov 2026): the real cover there, the typed card links to it.
              <Link to="/issues/$slug" params={{ slug: i.page }} className={`lit-issue-cover lit-typed-${v.shelf} lit-issue-link`} aria-label={`${mast}, ${i.date ?? ""}: ${i.what} - its own page`}>
                <span className="lit-issue-mast">{mast}</span>
                {i.date && <span className="lit-issue-date">{i.date}</span>}
                <span className="lit-issue-line">{i.what}</span>
                <span className="lit-issue-open">The whole story &rarr;</span>
              </Link>
            ) : (
              <div className={`lit-issue-cover lit-typed-${v.shelf}`}>
                <span className="lit-issue-mast">{mast}</span>
                {i.date && <span className="lit-issue-date">{i.date}</span>}
                <span className="lit-issue-line">{i.what}</span>
              </div>
            )}
            <p className="lit-issue-who">
              {i.polaroid && <img src={i.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" />}
              <span>
                <Link to={episodePath(i.episodeId as never)} className="font-semibold text-gold hover:text-pink">{i.guest}</Link>
                <br />
                {i.short} <Timestamp episodeId={i.episodeId} time={i.time} />
              </span>
            </p>
            {v.press?.buy && <a {...out} className="lit-issue-find" href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(i.search)}`}>Find this issue on eBay ↗</a>}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The trailer Jukebox: a jukebox cabinet that plays the trailers from our AFTERPARTY YouTube playlists - screen on the left,
 *  the track list on the right, the full width of the page (Front page, 22 Nov 2026). Only shows when there is a trailer;
 *  nothing loads from YouTube until a visitor presses play. */
export function TrailerJukebox({ trailers, name }: { trailers: Trailer[]; name: string }) {
  const [now, setNow] = useState<Trailer | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const list = trailers.filter((t) => !failed.includes(t.id));
  if (list.length === 0) return null;
  const pick = list[0]!;
  const writerBox = list.every((t) => t.kind === "writer");
  const guestBox = writerBox || list.every((t) => t.kind === "guest");
  // No trailer, but the show's own clip (Lisa, 22 Nov 2026: Candied Camera): "Watch the clip".
  const clipBox = !guestBox && list.every((t) => t.kind === "clip" || t.kind === "guest");
  // A film about the book or magazine plays first (Lisa, 22 Nov 2026: Edie: Girl on Fire on the Edie page): "On film".
  const filmBox = pick.kind === "about";
  const showing = now ?? pick;
  const next = (from: Trailer) => {
    const i = list.findIndex((t) => t.id === from.id);
    setNow(list[i + 1] ?? null);
  };
  return (
    <section aria-labelledby="trailer-jukebox">
      <h2 id="trailer-jukebox" className={h}>{filmBox ? "On film" : writerBox ? "From the writer's Jukebox" : guestBox ? "From the guest's Jukebox" : clipBox ? "Watch the clip" : "Watch the trailer"}</h2>
      <div className="lit-jbx mt-6">
        <div className="lit-jbx-l">
        <p className="lit-jbx-kicker">The Night Fever</p>
        <p className="lit-jbx-title">{filmBox ? <>On fil<b>m</b></> : guestBox ? <>Juke<b>box</b></> : clipBox ? <>Cl<b>ip</b></> : <>Trail<b>er</b></>}</p>
        <div className="lit-jbx-screen">
          {now ? (
            <VideoScreen vid={now.id} title={now.title} onEnd={() => next(now)} onFail={() => { setFailed((f) => [...f, now.id]); next(now); }} />
          ) : (
            <button type="button" className="lit-jbx-press" onClick={() => setNow(pick)} aria-label={`Play ${pick.kind === "guest" || pick.kind === "writer" || pick.kind === "about" ? "the video" : pick.kind === "clip" ? "the clip" : "the trailer"}: ${pick.title}`}>
              <span className="lit-jbx-k">{pick.kind === "writer" ? "The writer" : pick.kind === "guest" ? `${pick.short} · who dropped it` : pick.kind === "about" ? "Watch first" : pick.kind === "clip" ? "The clip" : pick.label === name ? "The trailer" : "From page to screen"}</span>
              <span className="lit-jbx-play" aria-hidden>▶</span>
              <span className="lit-jbx-nm">{pick.kind === "about" ? pick.title : pick.label}</span>
              <span className="lit-jbx-sm">From our {pick.short} AFTERPARTY playlist</span>
            </button>
          )}
        </div>
        </div>
        <div className="lit-jbx-r">
        {list.length > 1 && (
          <ol className="lit-jbx-sel">
            {list.map((t, i) => (
              <li key={t.id}>
                <button type="button" aria-pressed={showing.id === t.id && !!now} onClick={() => setNow(t)}>
                  <i>A{i + 1}</i>
                  <span>{t.kind === "guest" || t.kind === "writer" ? `${t.label}: ${t.title}` : t.title}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
        {list.length === 1 && (
          // One video: the right side says what is on and opens that Afterparty's whole Jukebox.
          <div className="lit-jbx-info">
            <p className="lit-jbx-k">{pick.kind === "guest" ? "From the guest's Jukebox" : pick.kind === "clip" ? "The clip" : pick.kind === "about" ? "On film" : "The trailer"}</p>
            <p className="lit-jbx-info-nm">{pick.title}</p>
            <p className="lit-jbx-sm">From our {pick.short} AFTERPARTY playlist</p>
            <Link to="/jukebox" search={{ afterparty: pick.episodeId }} className="lit-jbx-open">Turn on the {pick.short} AFTERPARTY Jukebox &rarr;</Link>
          </div>
        )}
        <p className="lit-jbx-fine">Plays from YouTube, loaded only when you press ▶ - same as the Jukebox.</p>
        </div>
        <div className="lit-jbx-grille" aria-hidden />
      </div>
    </section>
  );
}

function Connections({ v }: { v: LibraryItemView }) {
  const links = useLinks();
  if (v.connections.length === 0) return null;
  return (
    <section className="lit-box" aria-labelledby="connections">
      <h2 id="connections" className={h}>{v.connections.some((c) => c.label === "On screen" || c.label === "The book") ? "From page to screen" : "Connections"}</h2>
      <ul className="mt-4 space-y-3">
        {v.connections.map((c) => (
          <li key={c.slug} className="flex items-center gap-3">
            {c.cover ? <img src={c.cover} alt="" className="lit-conn-cover" loading="lazy" decoding="async" /> : null}
            <span className="text-sm">
              <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
              <Link {...linkToSlug(links, c.slug)} className="diary-chip">{c.name} →</Link>
              {c.note && <span className="mt-1 block text-xs text-muted-foreground">{c.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---- Where the visitor is (Lisa, 21 Nov 2026: "can we just do a near me and then get the location from the browser?" - for
// both find boxes). Before anyone presses anything: a quiet guess from the browser's own clock and language. "Near me" asks
// the browser for its location; the position is only used right here, in the visitor's browser, to work out the country
// (rough outlines below) - it is never sent anywhere or stored. Only the country is remembered (localStorage "nf-place";
// Privacy Policy). ----
type Place = "se" | "uk" | "us" | "world";
const PLACE_LABEL: Record<Place, string> = { se: "Sweden", uk: "the UK", us: "the USA", world: "worldwide" };
function guessPlace(): Place {
  try {
    const saved = window.localStorage.getItem("nf-place");
    if (saved && saved in PLACE_LABEL) return saved as Place;
  } catch {
    /* storage blocked: guess again */
  }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  if (tz === "Europe/Stockholm") return "se";
  if (tz === "Europe/London") return "uk";
  if (tz.startsWith("America/") && /-US$/i.test(navigator.language)) return "us";
  return "world";
}
// Rough country outlines as [lat, lon] corners - good enough to pick a shop list, never shown or sent.
const OUTLINES: [Place, [number, number][]][] = [
  ["se", [[55.3, 12.9], [56.2, 12.4], [57.7, 11.7], [59.1, 11.1], [61.0, 12.3], [63.9, 12.0], [65.6, 14.5], [68.4, 17.8], [69.1, 20.6], [68.5, 22.4], [65.9, 24.2], [63.5, 20.0], [62.0, 17.6], [60.6, 17.6], [59.9, 19.2], [57.9, 19.3], [56.1, 16.6], [55.3, 14.4]]],
  ["uk", [[49.9, -5.8], [50.6, 1.4], [51.4, 1.8], [53.0, 1.8], [55.8, -1.6], [58.7, -2.8], [60.9, -0.8], [58.7, -7.6], [55.3, -8.2], [54.0, -8.2], [54.2, -5.4], [51.6, -5.3]]],
  ["us", [[48.9, -124.8], [42.0, -124.4], [32.5, -117.1], [31.3, -111.0], [31.8, -106.5], [29.6, -104.4], [25.9, -97.1], [29.1, -89.2], [30.2, -85.0], [24.5, -81.8], [25.2, -80.1], [26.9, -79.9], [35.2, -75.5], [41.2, -69.9], [44.8, -66.9], [47.4, -68.2], [45.0, -71.5], [45.0, -74.7], [43.6, -79.2], [42.3, -83.1], [46.5, -84.4], [48.0, -89.6], [49.0, -95.2], [49.0, -123.0]]],
  ["us", [[71.4, -156.8], [69.6, -141.0], [60.0, -141.0], [54.6, -130.0], [51.2, -179.0], [65.6, -168.1]]],
  ["us", [[22.3, -160.3], [22.3, -154.6], [18.8, -154.6], [18.8, -160.3]]],
];
function inside(lat: number, lon: number, poly: [number, number][]): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [ai, oi] = poly[i]!;
    const [aj, oj] = poly[j]!;
    if (oi > lon !== oj > lon && lat < ((aj - ai) * (lon - oi)) / (oj - oi) + ai) hit = !hit;
  }
  return hit;
}
const placeAt = (lat: number, lon: number): Place => OUTLINES.find(([, poly]) => inside(lat, lon, poly))?.[0] ?? "world";

type Here = { place: Place; state: "guess" | "asking" | "found" | "no" };
function usePlace(): [Here, () => void] {
  const [here, setHere] = useState<Here>({ place: "world", state: "guess" });
  useEffect(() => setHere({ place: guessPlace(), state: "guess" }), []);
  const nearMe = () => {
    if (!("geolocation" in navigator)) return setHere((h) => ({ ...h, state: "no" }));
    setHere((h) => ({ ...h, state: "asking" }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const place = placeAt(pos.coords.latitude, pos.coords.longitude);
        setHere({ place, state: "found" });
        try {
          window.localStorage.setItem("nf-place", place);
        } catch {
          /* not remembered */
        }
      },
      () => setHere((h) => ({ ...h, state: "no" })),
      { enableHighAccuracy: false, maximumAge: 86_400_000, timeout: 15_000 },
    );
  };
  return [here, nearMe];
}
/** The "Near me" button both find boxes share. */
function NearMe({ here, onAsk }: { here: Here; onAsk: () => void }) {
  return (
    <div className="lit-near">
      <button type="button" onClick={onAsk} className="lit-near-btn" disabled={here.state === "asking"}>
        <span aria-hidden>📍</span> {here.state === "asking" ? "Finding you…" : "Near me"}
      </button>
      <span className="lit-near-now" aria-live="polite">
        {here.state === "found"
          ? here.place === "world" ? <>Found you - showing worldwide</> : <>Found you in {PLACE_LABEL[here.place]}</>
          : <>{here.state === "no" ? "No location - showing " : "Showing "}{here.place === "world" ? "worldwide" : `for ${PLACE_LABEL[here.place]}`}</>}
      </span>
    </div>
  );
}
const out = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Find me, borrow me (Lisa, 21 Nov 2026): WorldCat's libraries near you, every Swedish library through Libris, and our own Stockholm check. */
function FindBorrow({ v, here, onAsk }: { v: LibraryItemView; here: Here; onAsk: () => void }) {
  const f = v.find;
  if (!f) return null;
  const q = f.isbn ?? f.query;
  const s = v.facts?.stockholm;
  const place = here.place;
  return (
    <section className="lit-box" aria-labelledby="find-borrow">
      <h2 id="find-borrow" className={h}>Find me, borrow me</h2>
      <NearMe here={here} onAsk={onAsk} />
      <a {...out} className="lit-btn lit-btn-pink" href={`https://search.worldcat.org/search?q=${encodeURIComponent(f.isbn ? `bn:${f.isbn}` : f.query)}`}>Find it in a library near you ↗</a>
      {place === "se" && <a {...out} className="lit-btn" href={`https://libris.kb.se/find?_q=${encodeURIComponent(q)}`}>Search all Swedish libraries (Libris) ↗</a>}
      {place === "se" && s && (
        <>
          <h3 className="lit-sub">Checked in Stockholm</h3>
          <dl className="lit-libs">
            <dt>Kulturhuset (Kulturbiblioteket)</dt><dd className={s.kulturhuset ? "lit-yes" : undefined}>{s.kulturhuset ? "on the shelf" : "not yet"}</dd>
            <dt>Dieselverkstaden</dt><dd className={s.dieselverkstaden ? "lit-yes" : undefined}>{s.dieselverkstaden ? "on the shelf" : "not yet"}</dd>
            <dt>Rest of Stockholm county</dt><dd className={s.other ? "lit-yes" : undefined}>{s.other ?? "none found"}</dd>
          </dl>
          <p className="lit-note">
            {s.asked && <>The AFTERPARTY has asked a Stockholm library to buy it. </>}
            {v.facts?.checked && <>Checked {new Date(v.facts.checked).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}.</>}
          </p>
        </>
      )}
      <p className="lit-thanks">♥ Thank you to WorldCat, the world&rsquo;s library catalogue, for finding the libraries near you.</p>
    </section>
  );
}

/** Find me, buy me: bookshops for where you are (Bookshop.org supports local bookshops in the US and UK), and secondhand
 *  copies. For a magazine or newspaper: back issues - eBay (the local eBay), Tradera in Sweden, AbeBooks and Etsy. */
function BuyMe({ v, here, onAsk }: { v: LibraryItemView; here: Here; onAsk: () => void }) {
  const f = v.find;
  const back = v.press?.buy;
  if (!f && !back) return null;
  const place = here.place;
  const shops: { name: string; note: string; href: string }[] = [];
  if (f) {
    const q = encodeURIComponent(f.isbn ?? f.query);
    if (f.inPrint !== false) {
      if (place === "se") {
        shops.push({ name: "Adlibris", note: "new", href: `https://www.adlibris.com/se/sok?q=${q}` });
        shops.push({ name: "Bokus", note: "new", href: `https://www.bokus.com/cgi-bin/product_search.cgi?search_word=${q}` });
      } else if (place === "uk") shops.push({ name: "Bookshop.org", note: "new, supports local bookshops", href: `https://uk.bookshop.org/search?keywords=${q}` });
      else shops.push({ name: "Bookshop.org", note: place === "us" ? "new, supports local bookshops" : "new, ships from the US and UK", href: `https://bookshop.org/search?keywords=${q}` });
    }
    shops.push({ name: "AbeBooks", note: f.inPrint === false ? "out of print - secondhand copies" : "secondhand and first editions", href: f.isbn ? `https://www.abebooks.com/servlet/SearchResults?isbn=${f.isbn}` : `https://www.abebooks.com/servlet/SearchResults?kw=${q}` });
  } else if (back) {
    const q = encodeURIComponent(back.query);
    if (place === "se") shops.push({ name: "Tradera", note: "secondhand in Sweden", href: `https://www.tradera.com/search?q=${q}` });
    shops.push({ name: place === "uk" ? "eBay UK" : "eBay", note: "back issues", href: `https://www.ebay.${place === "uk" ? "co.uk" : "com"}/sch/i.html?_nkw=${q}` });
    shops.push({ name: "AbeBooks", note: "back issues from booksellers", href: `https://www.abebooks.com/servlet/SearchResults?kw=${q}` });
    shops.push({ name: "Etsy", note: "vintage issues", href: `https://www.etsy.com/search?q=${q}` });
  }
  return (
    <section className="lit-box lit-buy" aria-labelledby="buy-me">
      <h2 id="buy-me" className={h}>Find me, buy me</h2>
      <NearMe here={here} onAsk={onAsk} />
      {shops.map((s) => (
        <a key={s.name} {...out} className="lit-btn" href={s.href}>
          {s.name} <small>· {s.note}</small> ↗
        </a>
      ))}
      {v.facts?.status && v.facts.status !== "In print" && v.facts.status !== "Out of print" && <p className="lit-note">{v.facts.status}.</p>}
      <p className="lit-note">Your location stays in your browser - it only picks the shops. No affiliate links - the AFTERPARTY earns nothing from these.</p>
    </section>
  );
}

function ShelfMates({ v }: { v: LibraryItemView }) {
  const links = useLinks();
  if (v.shelfMates.length === 0) return null;
  return (
    <section aria-labelledby="shelf-mates">
      <h2 id="shelf-mates" className={h}>Also on the shelf in these Afterparties</h2>
      <ul className="lit-shelf mt-5">
        {v.shelfMates.map((m) => (
          <li key={m.slug}>
            <Link {...linkToSlug(links, m.slug)} className="block">
              {m.cover ? <img src={m.cover} alt={`Cover of ${m.name}`} loading="lazy" decoding="async" /> : <span className={`lit-typed lit-typed-${m.shelf}`}>{m.name}</span>}
              <span className="lit-shelf-nm">{m.name}</span>
            </Link>
            <span className="lit-shelf-eps">{m.eps.join(", ")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "The story" (Lisa, 23 Nov 2026, tested on Creative Vandal): what it is and who made it, then the film itself with its
 *  chapters (each chapter plays the film from that moment; a chapter about a work on the site links to it, with its cover),
 *  then what happened since and what the press on our Library shelves said. From src/data/item-stories.ts. */
export function Story({ st, name: self }: { st: StoryView | null; name: string }) {
  const links = useLinks();
  const [at, setAt] = useState<number | null>(null);
  if (!st) return null;
  const film = st.film;
  const name = (n: { name: string; slug?: string | undefined }) =>
    n.slug ? <Link {...linkToSlug(links, n.slug)} className="lit-story-link">{n.name}</Link> : <span>{n.name}</span>;
  return (
    <>
      <section aria-labelledby="the-story">
        <h2 id="the-story" className={h}>The story</h2>
        <div className="lit-story mt-5">
          <p className="lit-story-intro">{st.intro}</p>
          <dl className="lit-story-facts">
            {st.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          {st.inIt.length > 0 && (
            <div className="lit-story-in">
              <p className="lit-story-k">{st.inItLabel}</p>
              <ul>
                {st.inIt.map((p) => (
                  <li key={p.name}>
                    {name(p)}
                    {p.note && <span className="lit-story-note"> · {p.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      {film && st.chapters.length > 0 && (
        <section aria-labelledby="inside-the-film">
          <h2 id="inside-the-film" className={h}>Inside the film</h2>
          <div className="lit-jbx lit-story-film mt-6">
            <div className="lit-jbx-l">
              <p className="lit-jbx-kicker">The Night Fever</p>
              <p className="lit-jbx-title">On fil<b>m</b></p>
              <div className="lit-jbx-screen">
                {at !== null ? (
                  <VideoScreen key={at} vid={film.id} title={film.title} start={at} onEnd={() => setAt(null)} onFail={() => setAt(null)} />
                ) : (
                  <button type="button" className="lit-jbx-press" onClick={() => setAt(0)} aria-label={`Play the film: ${film.title}`}>
                    <span className="lit-jbx-k">The whole film</span>
                    <span className="lit-jbx-play" aria-hidden>▶</span>
                    <span className="lit-jbx-nm">{film.title}</span>
                    <span className="lit-jbx-sm">Or pick a chapter</span>
                  </button>
                )}
              </div>
            </div>
            <div className="lit-jbx-r">
              <ol className="lit-story-ch">
                {st.chapters.map((c) => (
                  <li key={c.at} aria-current={at === c.secs || undefined}>
                    <button type="button" className="lit-story-at" onClick={() => setAt(c.secs)} aria-label={`Play from ${c.at}: ${c.title}`}>
                      ▶ {c.at}
                    </button>
                    {c.cover ? <img src={c.cover} alt="" className="lit-story-cv" loading="lazy" decoding="async" /> : <span className="lit-story-cv lit-story-cv-none" aria-hidden />}
                    {c.slug ? <Link {...linkToSlug(links, c.slug)} className="lit-story-ch-nm">{c.title}</Link> : <span className="lit-story-ch-nm">{c.title}</span>}
                  </li>
                ))}
              </ol>
              <p className="lit-jbx-fine">Plays from {film.channel} on YouTube, loaded only when you press ▶ - same as the Jukebox.</p>
            </div>
            <div className="lit-jbx-grille" aria-hidden />
          </div>
        </section>
      )}
      {film && st.chapters.length === 0 && (
        <section aria-labelledby="watch-the-clip">
          <h2 id="watch-the-clip" className={h}>Watch the clip</h2>
          <div className="lit-jbx lit-story-film mt-6">
            <div className="lit-jbx-l">
              <p className="lit-jbx-kicker">The Night Fever</p>
              <p className="lit-jbx-title">Cl<b>ip</b></p>
              <div className="lit-jbx-screen">
                {at !== null ? (
                  <VideoScreen key={at} vid={film.id} title={film.title} start={at} onEnd={() => setAt(null)} onFail={() => setAt(null)} />
                ) : (
                  <button type="button" className="lit-jbx-press" onClick={() => setAt(0)} aria-label={`Play the clip: ${film.title}`}>
                    <span className="lit-jbx-k">The clip</span>
                    <span className="lit-jbx-play" aria-hidden>▶</span>
                    <span className="lit-jbx-nm">{film.title}</span>
                  </button>
                )}
              </div>
            </div>
            <div className="lit-jbx-r">
              {film.note && <p className="lit-story-clip-note"><EntityText text={film.note} self={self} /></p>}
              <p className="lit-jbx-fine">Plays from {film.channel} on YouTube, loaded only when you press ▶ - same as the Jukebox.</p>
            </div>
            <div className="lit-jbx-grille" aria-hidden />
          </div>
        </section>
      )}
      {(st.since.length > 0 || st.reviews.length > 0) && (
        <div className={`lit-row lit-row-${st.reviews.length ? 2 : 1}`}>
          {st.since.length > 0 && (
            <section className="lit-box" aria-labelledby="since">
              <h2 id="since" className={h}>Since it came out</h2>
              <ol className="lit-story-since mt-4">
                {st.since.map((n) => (
                  <li key={`${n.source}-${n.time ?? n.what}`}>
                    <span className="lit-story-when">{n.when}</span>
                    <p><EntityText text={n.what} self={self} /></p>
                    <span className="lit-story-src">
                      {n.episode ? <Link to={episodePath(n.episode as never)} className="lit-story-link">{n.source}</Link> : n.source}
                      {n.episode && n.time && <> <Timestamp episodeId={n.episode} time={n.time} /></>}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}
          {st.reviews.length > 0 && (
            <section className="lit-box" aria-labelledby="press-said">
              <h2 id="press-said" className={h}>What the press said</h2>
              <ul className="lit-story-viewers mt-4">
                {st.reviews.map((r) => {
                  const mast = r.mast ? <img src={r.mast} alt={r.publication} className="lit-story-mast" loading="lazy" decoding="async" /> : <b>{r.publication}</b>;
                  return (
                    <li key={r.publication + r.date}>
                      {r.slug ? <Link {...linkToSlug(links, r.slug)} className="lit-story-link">{mast}</Link> : mast}
                      <blockquote>{r.quote}</blockquote>
                      <span className="lit-story-src">{[r.by, r.publication, r.date].filter(Boolean).join(", ")}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      )}
      <p className="lit-story-sources">Sources: {st.sources.join(" · ")}</p>
    </>
  );
}

/** "Wished for on air - and made since" (Publish this): shown under the header of a book a guest asked for. */
function MadeSince({ v, name }: { v: LibraryItemView; name: string }) {
  const m = v.madeSince;
  if (!m) return null;
  return (
    <section className="lit-made" aria-label="Made since">
      <span className="az-st az-s2 az-pink">Made since!</span>
      <p className="mt-2 text-sm">
        Wished for on the show in <Link to={episodePath(m.episodeId as never)} className="font-semibold text-gold hover:text-pink">{m.short}</Link>
        {m.time && <> (<Timestamp episodeId={m.episodeId} time={m.time} />)</>}: <EntityText text={m.why} self={name} />
        {m.year && <> It came out in {m.year}.</>}{" "}
        <Link to="/library" hash="still-to-make" className="font-semibold text-gold hover:text-pink">Publish this →</Link>
      </p>
    </section>
  );
}

/** The page under the header (Lisa, 21 Nov 2026: "too messy and empty spaces"): full-width rows for who dropped it, the quotes
 *  and the issues, then two columns that each stack their own boxes, so a short box never leaves a hole next to a tall one. */
const SHELF_LABEL: Record<string, string> = { books: "Book", magazines: "Magazine", newspapers: "Newspaper", columns: "Column", diaries: "Diary", film: "Film", tv: "TV show" };

/** The front-page dateline under the header: what it is, when it started, and how much the show talks about it. */
function Dateline({ v }: { v: LibraryItemView }) {
  const mentions = v.dropped.reduce((n, d) => n + d.mentions, 0);
  const year = v.press?.founded ? `Est. ${v.press.founded}` : v.facts?.year ? `First out ${v.facts.year}` : null;
  const bits = [
    SHELF_LABEL[v.shelf] ?? null,
    year,
    mentions ? `${mentions} mention${mentions === 1 ? "" : "s"} on the show` : null,
    v.dropped.length ? `${v.dropped.length} Afterpart${v.dropped.length === 1 ? "y" : "ies"}` : null,
    v.writer ? "Not dropped on the show yet" : null,
    v.trailers.length ? `${v.trailers.length} video${v.trailers.length === 1 ? "" : "s"}` : null,
  ].filter((b): b is string => !!b);
  if (bits.length < 2) return null;
  return (
    <p className="lit-dateline">
      {bits.map((b) => <span key={b}>{b}</span>)}
    </p>
  );
}

/** "Also on the site" (Lisa, 23 Nov 2026, on Creative Vandal: the three chip boxes "don't make sense"). One list in place of
 *  "Also named on these cards", "Pops up in the guests' stories" and "In the same rooms": each card says why it is here and
 *  where on the show, like every episode mention. Nothing that is already higher on the page; no box when nothing is left. */
function AlsoOnSite({ v, name }: { v: LibraryItemView; name: string }) {
  const [all, setAll] = useState(false);
  if (v.alsoOn.length === 0) return null;
  // Like the quote walls: 9 first, the rest one press away.
  const list = all ? v.alsoOn : v.alsoOn.slice(0, 9);
  return (
    <section className="lit-box" aria-labelledby="also-on">
      <h2 id="also-on" className={h}>Also on the site</h2>
      <ul className="lit-also mt-4">
        {list.map((a) => (
          <li key={`${a.slug}-${a.episodeId ?? ""}`}>
            <EntityLink name={a.slug} className="lit-also-name">{a.name}</EntityLink>
            {a.why && <p><EntityText text={a.why} self={name} /></p>}
            {a.episodeId && (
              <span className="lit-story-src">
                <Link to={episodePath(a.episodeId as never)} className="lit-story-link">{a.short}</Link>
                {a.time && <> <Timestamp episodeId={a.episodeId} time={a.time} /></>}
              </span>
            )}
          </li>
        ))}
      </ul>
      {v.alsoOn.length > 9 && (
        <button type="button" className="lit-also-more" onClick={() => setAll(!all)}>
          {all ? "Show fewer" : `Show all ${v.alsoOn.length}`}
        </button>
      )}
    </section>
  );
}

/** The page under the header - the Front page (Lisa, 22 Nov 2026: "not organized enough and white space" - she picked mockup
 *  A, "apply it to all pages"). Full-width bands, so a short box never leaves a hole next to a tall one: the dateline, who
 *  dropped it in level columns, the wide Jukebox, the small boxes side by side in one row (all the same height), the shelves
 *  and "Got a copy?". With fewer than three small boxes "Got a copy?" joins their row; one or two issues sit next to the shelf. */
export function LibraryItemSections({ v, name }: { v: LibraryItemView; name: string }) {
  const [here, nearMe] = usePlace();
  const boxes = [
    hasWhoMadeMe(v) ? <WhoMadeMe key="who" v={v} name={name} /> : null,
    v.find || v.press?.buy ? <BuyMe key="buy" v={v} here={here} onAsk={nearMe} /> : null,
    v.find ? <FindBorrow key="borrow" v={v} here={here} onAsk={nearMe} /> : null,
    v.connections.length > 0 ? <Connections key="conn" v={v} /> : null,
    v.alsoOn.length > 0 ? <AlsoOnSite key="also" v={v} name={name} /> : null,
  ].filter(Boolean);
  const copy = v.shelf !== "film" && v.shelf !== "tv" ? <FanSuggestions box="copies" about={name} variant="inset" className="lit-copy" /> : null;
  const copyInRow = !!copy && boxes.length < 3;
  // Lisa, 25 Nov 2026 (Jailbait vs Golden Age): at most four boxes side by side - a fifth ("Also on the site") gets its
  // own full-width band under the row, so the row never falls back to one stacked column.
  const all = copyInRow ? [...boxes, <div key="copy" className="lit-box lit-copy-box">{copy}</div>] : boxes;
  const row = all.slice(0, 4);
  const extra = all.slice(4);
  const issues = v.press?.issues.length ?? 0;
  const fewIssues = issues > 0 && issues <= 2 && v.shelfMates.length > 0;
  return (
    <div className="lit-front">
      <Dateline v={v} />
      <MadeSince v={v} name={name} />
      <DroppedBy v={v} name={name} />
      <Story st={v.story} name={name} />
      <WriterOnShow v={v} />
      <GuestQuotes v={v} />
      {!fewIssues && <IssueShelf v={v} name={name} />}
      {v.trailers.length > 0 && <TrailerJukebox trailers={v.trailers} name={name} />}
      {row.length > 0 && <div className={`lit-row lit-row-${row.length}`}>{row}</div>}
      {extra.length > 0 && <div className={`lit-row lit-row-${extra.length} lit-row-extra`}>{extra}</div>}
      {fewIssues ? (
        <div className="lit-shelves">
          <IssueShelf v={v} name={name} />
          <ShelfMates v={v} />
        </div>
      ) : (
        <ShelfMates v={v} />
      )}
      {copy && !copyInRow && <div className="lit-copy-band">{copy}</div>}
    </div>
  );
}
