import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityText } from "@/components/entity-text";
import { VideoScreen } from "@/components/video-screen";
import { FanSuggestions } from "@/components/fan-suggestions";
import { episodePath } from "@/data/episodes";
import { linkToSlug, useLinks } from "@/lib/link-index";
import type { LibraryItemView, Trailer } from "@/lib/library-item";

// Library item pages (Lisa, 21 Nov 2026 - "yes to everything"): the extra boxes a book, magazine, newspaper, column, diary,
// film or TV card gets under its header - who dropped it (their polaroids), what the guests said about it, the trailer
// Jukebox, its connections, "Find me, borrow me" (WorldCat, Libris, our own Stockholm check), "Find me, buy me" and the other
// Library items from the same Afterparties. The cover and the facts sit in the header (src/routes/explore.$slug.tsx).
// Outside links: only the find/borrow/buy boxes link out (Lisa asked for them), each says where it goes (↗).

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

/** Who dropped it: each Afterparty that names it - the guest's polaroid, what was said and the moment to play. It replaces the
 *  card's plain "In the episodes" list on Library item pages (Lisa, 21 Nov 2026: one lonely polaroid looked too messy). */
const DROPPED_SHOWN = 6;
// Lisa, 21 Nov 2026 ("if we have situations like this - merge the box, do it for all library pages"): a guest who dropped it
// and is also quoted gets one box - their quote sits inside their "Who dropped it" box, not on a separate quote wall.
// Guests with a quote come first, so their words are above the fold.
const quotesOf = (v: LibraryItemView, episodeId: string) => v.quotes.filter((q) => q.episodeId === episodeId);
function DroppedBy({ v, name }: { v: LibraryItemView; name: string }) {
  const [all, setAll] = useState(false);
  if (v.dropped.length === 0) return null;
  const ordered = [...v.dropped].sort((a, b) => Number(quotesOf(v, b.episodeId).length > 0) - Number(quotesOf(v, a.episodeId).length > 0));
  const shown = all ? ordered : ordered.slice(0, DROPPED_SHOWN);
  return (
    <section aria-labelledby="dropped-by">
      <h2 id="dropped-by" className={h}>Who dropped it</h2>
      <ul className={`lit-dropped mt-5${v.dropped.length > 1 ? " lit-dropped-2" : ""}`}>
        {shown.map((d) => (
          <li key={d.episodeId} className="lit-drop">
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
      {v.dropped.length > DROPPED_SHOWN && (
        <button type="button" className="lit-more" onClick={() => setAll((a) => !a)} aria-expanded={all}>
          {all ? "Show fewer" : `Show all ${v.dropped.length} Afterparties`}
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
  const p = v.press;
  return !!p && (!!p.founded || p.by.length > 0 || p.team.length > 0);
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
    if (p.by.length) rows.push({ key: "by", role: "Founded by", body: <span className="lit-chips">{p.by.map(chip)}{p.founded && <span className="text-muted-foreground">{p.founded}</span>}</span> });
    else if (p.founded) rows.push({ key: "founded", role: "First out", body: p.founded });
    if (p.ran) rows.push({ key: "ran", role: "Ran", body: p.ran });
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
          : <>Founders from its own history; the rest in the guests&rsquo; own words on the show. Worked there yourself? Tell me in &ldquo;Got a copy?&rdquo; below.</>}
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

/** The trailer Jukebox: a little jukebox cabinet that plays the trailers from our AFTERPARTY YouTube playlists. Only shows
 *  when there is a trailer; nothing loads from YouTube until a visitor presses play. */
function TrailerJukebox({ trailers, name }: { trailers: Trailer[]; name: string }) {
  const [now, setNow] = useState<Trailer | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const list = trailers.filter((t) => !failed.includes(t.id));
  if (list.length === 0) return null;
  const pick = list[0]!;
  const guestBox = list.every((t) => t.kind === "guest");
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
      <h2 id="trailer-jukebox" className={h}>{filmBox ? "On film" : guestBox ? "From the guest's Jukebox" : clipBox ? "Watch the clip" : "Watch the trailer"}</h2>
      <div className="lit-jbx mt-6">
        <p className="lit-jbx-kicker">The Night Fever</p>
        <p className="lit-jbx-title">{filmBox ? <>On fil<b>m</b></> : guestBox ? <>Juke<b>box</b></> : clipBox ? <>Cl<b>ip</b></> : <>Trail<b>er</b></>}</p>
        <div className="lit-jbx-screen">
          {now ? (
            <VideoScreen vid={now.id} title={now.title} onEnd={() => next(now)} onFail={() => { setFailed((f) => [...f, now.id]); next(now); }} />
          ) : (
            <button type="button" className="lit-jbx-press" onClick={() => setNow(pick)} aria-label={`Play ${pick.kind === "guest" || pick.kind === "about" ? "the video" : pick.kind === "clip" ? "the clip" : "the trailer"}: ${pick.title}`}>
              <span className="lit-jbx-k">{pick.kind === "guest" ? `${pick.short} · who dropped it` : pick.kind === "about" ? "Watch first" : pick.kind === "clip" ? "The clip" : pick.label === name ? "The trailer" : "From page to screen"}</span>
              <span className="lit-jbx-play" aria-hidden>▶</span>
              <span className="lit-jbx-nm">{pick.kind === "about" ? pick.title : pick.label}</span>
              <span className="lit-jbx-sm">From our {pick.short} AFTERPARTY playlist</span>
            </button>
          )}
        </div>
        {list.length > 1 && (
          <ol className="lit-jbx-sel">
            {list.map((t, i) => (
              <li key={t.id}>
                <button type="button" aria-pressed={showing.id === t.id && !!now} onClick={() => setNow(t)}>
                  <i>A{i + 1}</i>
                  <span>{t.kind === "guest" ? `${t.label}: ${t.title}` : t.title}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
        <p className="lit-jbx-fine">Plays from YouTube, loaded only when you press ▶ - same as the Jukebox.</p>
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
export function LibraryItemSections({ v, name }: { v: LibraryItemView; name: string }) {
  const [here, nearMe] = usePlace();
  // Each box goes to the shorter column, by a rough height (the Jukebox grows with its track list).
  const cols2: [React.ReactNode[], React.ReactNode[]] = [[], []];
  const tall: [number, number] = [0, 0];
  const put = (node: React.ReactNode, height: number, side?: 0 | 1) => {
    const i = side ?? (tall[0] <= tall[1] ? 0 : 1);
    cols2[i].push(node);
    tall[i] += height + 1;
  };
  if (v.trailers.length > 0) put(<TrailerJukebox key="jbx" trailers={v.trailers} name={name} />, 9 + (v.trailers.length > 1 ? v.trailers.length * 1.2 : 0), 0);
  if (hasWhoMadeMe(v)) put(<WhoMadeMe key="who" v={v} name={name} />, 3 + (v.shelf === "books" ? 3 : (v.press?.team.length ?? 0) * 1.6 + 1), 1);
  // The taller box first, so the shorter one evens the columns out.
  if (v.find) put(<FindBorrow key="borrow" v={v} here={here} onAsk={nearMe} />, 8);
  if (v.find || v.press?.buy) put(<BuyMe key="buy" v={v} here={here} onAsk={nearMe} />, 6);
  if (v.connections.length > 0) put(<Connections key="conn" v={v} />, 2 + v.connections.length * 1.3);
  const [left, right] = cols2;
  // Nothing on one side: let the other side's boxes sit next to each other instead.
  const cols = left.length && right.length ? [left, right] : (left.length ? left : right).map((b) => [b]);
  return (
    <>
      <MadeSince v={v} name={name} />
      <DroppedBy v={v} name={name} />
      <GuestQuotes v={v} />
      <IssueShelf v={v} name={name} />
      {cols.length > 0 && (
        <div className="lit-cols">
          {cols.map((c, i) => <div key={i} className="lit-stack">{c}</div>)}
        </div>
      )}
      <ShelfMates v={v} />
      {v.shelf !== "film" && v.shelf !== "tv" && <FanSuggestions box="copies" about={name} variant="inset" className="lit-copy" />}
    </>
  );
}
