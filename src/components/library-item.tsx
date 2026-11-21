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

/** Who dropped it: the polaroid of every Afterparty that names it, with the first moment to play. */
function DroppedBy({ v }: { v: LibraryItemView }) {
  if (v.dropped.length === 0) return null;
  return (
    <section aria-labelledby="dropped-by">
      <h2 id="dropped-by" className={h}>Who dropped it</h2>
      <ul className="lit-dropped mt-5">
        {v.dropped.map((d) => (
          <li key={d.episodeId} className="lit-pol">
            <Link to={episodePath(d.episodeId as never)} className="block">
              {d.polaroid ? <img src={d.polaroid} alt={`${d.guest} polaroid`} width={240} height={240} loading="lazy" decoding="async" /> : <span className="lit-pol-blank">{d.short}</span>}
              <b>{d.guest}</b>
            </Link>
            <span className="lit-pol-line">
              {d.short}
              {d.mentions > 1 && <> · {d.mentions}×</>}
              {d.time && d.time !== "On camera" && <> · <Timestamp episodeId={d.episodeId} time={d.time} /></>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** What the guests said about it: their own words, each with their polaroid and the moment (src/data/item-quotes.ts). */
function GuestQuotes({ v }: { v: LibraryItemView }) {
  if (v.quotes.length === 0) return null;
  return (
    <section aria-labelledby="guest-quotes">
      <h2 id="guest-quotes" className={h}>What the guests said about it</h2>
      <ul className="lit-quotes mt-5">
        {v.quotes.map((q) => (
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
 *  Sits next to the trailer Jukebox. */
function WhoMadeMe({ v, name }: { v: LibraryItemView; name: string }) {
  const links = useLinks();
  const f = v.facts;
  if (v.shelf !== "books" || (!f && v.credits.length === 0)) return null;
  const rows: { role: string; body: React.ReactNode; key: string }[] = [];
  if (f?.author) rows.push({ key: "author", role: "Written by", body: <EntityText text={f.author} self={name} /> });
  if (f?.publisher) rows.push({ key: "publisher", role: "Published by", body: <>{f.publisher}{f.year ? <span className="text-muted-foreground"> · {f.year}</span> : null}</> });
  for (const c of v.credits)
    rows.push({ key: c.role + c.name, role: c.role, body: c.slug ? <Link {...linkToSlug(links, c.slug)} className="diary-chip">{c.name} →</Link> : c.name });
  if (f?.isbn) rows.push({ key: "isbn", role: "ISBN", body: <span className="font-mono text-xs">{f.isbn}</span> });
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
        Only the names we could confirm from the book and its library records. Know who else worked on it - the editor, the
        photographer, the designer? Tell me in &ldquo;Got a copy?&rdquo; below.
      </p>
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
  const showing = now ?? pick;
  const next = (from: Trailer) => {
    const i = list.findIndex((t) => t.id === from.id);
    setNow(list[i + 1] ?? null);
  };
  return (
    <section aria-labelledby="trailer-jukebox">
      <h2 id="trailer-jukebox" className={h}>{guestBox ? "From the guest's Jukebox" : "Watch the trailer"}</h2>
      <div className="lit-jbx mt-6">
        <p className="lit-jbx-kicker">The Night Fever</p>
        <p className="lit-jbx-title">{guestBox ? <>Juke<b>box</b></> : <>Trail<b>er</b></>}</p>
        <div className="lit-jbx-screen">
          {now ? (
            <VideoScreen vid={now.id} title={now.title} onEnd={() => next(now)} onFail={() => { setFailed((f) => [...f, now.id]); next(now); }} />
          ) : (
            <button type="button" className="lit-jbx-press" onClick={() => setNow(pick)} aria-label={`Play the trailer: ${pick.title}`}>
              <span className="lit-jbx-k">{pick.kind === "guest" ? `${pick.short} · who dropped it` : pick.label === name ? "The trailer" : "From page to screen"}</span>
              <span className="lit-jbx-play" aria-hidden>▶</span>
              <span className="lit-jbx-nm">{pick.label}</span>
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

// ---- Where the visitor is: a guess from the browser's own clock and language, never sent anywhere; they can change it,
// and the choice is remembered in their browser (localStorage "nf-place"; Privacy Policy). ----
type Place = "se" | "uk" | "us" | "world";
const PLACES: { key: Place; label: string }[] = [
  { key: "se", label: "Sweden" },
  { key: "uk", label: "UK" },
  { key: "us", label: "USA" },
  { key: "world", label: "Elsewhere" },
];
function guessPlace(): Place {
  try {
    const saved = window.localStorage.getItem("nf-place");
    if (saved && PLACES.some((p) => p.key === saved)) return saved as Place;
  } catch {
    /* storage blocked: guess again */
  }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  if (tz === "Europe/Stockholm") return "se";
  if (tz === "Europe/London") return "uk";
  if (tz.startsWith("America/") && /-US$/i.test(navigator.language)) return "us";
  return "world";
}
function usePlace(): [Place, (p: Place) => void] {
  const [place, setPlace] = useState<Place>("world");
  useEffect(() => setPlace(guessPlace()), []);
  const choose = (p: Place) => {
    setPlace(p);
    try {
      window.localStorage.setItem("nf-place", p);
    } catch {
      /* not remembered */
    }
  };
  return [place, choose];
}
function PlacePicker({ place, onPick }: { place: Place; onPick: (p: Place) => void }) {
  return (
    <label className="lit-place">
      <span aria-hidden>📍</span>
      <span className="sr-only">Where are you?</span>
      <select value={place} onChange={(e) => onPick(e.target.value as Place)}>
        {PLACES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
      </select>
    </label>
  );
}
const out = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Find me, borrow me (Lisa, 21 Nov 2026): WorldCat's libraries near you, every Swedish library through Libris, and our own Stockholm check. */
function FindBorrow({ v, place, onPick }: { v: LibraryItemView; place: Place; onPick: (p: Place) => void }) {
  const f = v.find;
  if (!f) return null;
  const q = f.isbn ?? f.query;
  const s = v.facts?.stockholm;
  return (
    <section className="lit-box" aria-labelledby="find-borrow">
      <h2 id="find-borrow" className={h}>Find me, borrow me</h2>
      <div className="mt-3"><PlacePicker place={place} onPick={onPick} /></div>
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

/** Find me, buy me: bookshops for where you are (Bookshop.org supports local bookshops in the US and UK), and secondhand copies. */
function BuyMe({ v, place, onPick }: { v: LibraryItemView; place: Place; onPick: (p: Place) => void }) {
  const f = v.find;
  if (!f) return null;
  const q = encodeURIComponent(f.isbn ?? f.query);
  const shops: { name: string; note: string; href: string }[] = [];
  if (f.inPrint !== false) {
    if (place === "se") {
      shops.push({ name: "Adlibris", note: "new", href: `https://www.adlibris.com/se/sok?q=${q}` });
      shops.push({ name: "Bokus", note: "new", href: `https://www.bokus.com/cgi-bin/product_search.cgi?search_word=${q}` });
    } else if (place === "uk") shops.push({ name: "Bookshop.org", note: "new, supports local bookshops", href: `https://uk.bookshop.org/search?keywords=${q}` });
    else shops.push({ name: "Bookshop.org", note: place === "us" ? "new, supports local bookshops" : "new, ships from the US and UK", href: `https://bookshop.org/search?keywords=${q}` });
  }
  shops.push({ name: "AbeBooks", note: f.inPrint === false ? "out of print - secondhand copies" : "secondhand and first editions", href: f.isbn ? `https://www.abebooks.com/servlet/SearchResults?isbn=${f.isbn}` : `https://www.abebooks.com/servlet/SearchResults?kw=${q}` });
  return (
    <section className="lit-box lit-buy" aria-labelledby="buy-me">
      <h2 id="buy-me" className={h}>Find me, buy me</h2>
      <div className="mt-3"><PlacePicker place={place} onPick={onPick} /></div>
      {shops.map((s) => (
        <a key={s.name} {...out} className="lit-btn" href={s.href}>
          {s.name} <small>· {s.note}</small> ↗
        </a>
      ))}
      {v.facts?.status && v.facts.status !== "In print" && v.facts.status !== "Out of print" && <p className="lit-note">{v.facts.status}.</p>}
      <p className="lit-note">Your country is guessed from your browser&rsquo;s clock and never sent anywhere. No affiliate links - the AFTERPARTY earns nothing from these.</p>
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

export function LibraryItemSections({ v, name }: { v: LibraryItemView; name: string }) {
  const [place, setPlace] = usePlace();
  return (
    <>
      <MadeSince v={v} name={name} />
      <DroppedBy v={v} />
      <GuestQuotes v={v} />
      {v.trailers.length > 0 || v.shelf === "books" ? (
        <div className="lit-two lit-two-jbx">
          <TrailerJukebox trailers={v.trailers} name={name} />
          <WhoMadeMe v={v} name={name} />
        </div>
      ) : null}
      {(v.connections.length > 0 || v.find) && (
        <div className="lit-two">
          <div className="lit-stack">
            <Connections v={v} />
            <BuyMe v={v} place={place} onPick={setPlace} />
          </div>
          <FindBorrow v={v} place={place} onPick={setPlace} />
        </div>
      )}
      <ShelfMates v={v} />
      {v.shelf !== "film" && v.shelf !== "tv" && <FanSuggestions box="copies" about={name} variant="inset" className="lit-copy" />}
    </>
  );
}
