import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useMemo, useState, type CSSProperties } from "react";
import { Timestamp } from "@/components/episode-player";
import { EntityText } from "@/components/entity-text";
import { SiteFooter } from "@/components/site-footer";
import { linkPlace } from "@/lib/link-label";
import { episodePath, episodes, stageName } from "@/data/episodes";
import { episodePortraits } from "@/components/episode-block";
import stacks from "@/assets/library-stacks.webp";
import stacksPhone from "@/assets/library-stacks-phone.webp";
import { BOOK_SHELVES, bookClub, findBookLink, type CollectionItem } from "@/data/collections";
import { coverFor } from "@/data/library-covers";
import { abs, jsonLd, pageHead } from "@/lib/seo";

// The Library (Lisa, 29 Oct 2026 - was the Book Club at /book-club, which now redirects here): every book, magazine,
// newspaper and column the guests drop, pinned up like a downtown newsstand. Real covers where we have them
// (src/data/library-covers.ts), typed photocopy covers for the rest. Tap a cover for every moment it comes up.

const books = bookClub.filter((b) => b.shelf === "books").length;
const press = bookClub.length - books;
const description = `Every book, magazine, newspaper and column the Night Fever guests mention - ${books} books and ${press} papers and magazines, pinned up like a newsstand, each with the moment it comes up.`;

export const Route = createFileRoute("/library")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({ path: "/library", title: "Night Fever Library – every book & magazine the guests mention", description, image: "/og/library.jpg" }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Night Fever Library",
        url: abs("/library"),
        numberOfItems: bookClub.length,
        itemListElement: bookClub.slice(0, 50).map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": b.shelf === "books" ? "Book" : b.shelf === "columns" ? "Article" : "Periodical", name: b.name, url: abs(`/explore/${b.slug}`) },
        })),
      }),
    ],
  }),
  component: LibraryPage,
});

const KIND: Record<string, string> = { books: "Books", magazines: "Magazines", newspapers: "Newspapers", columns: "Columns" };
const episodesOf = (it: CollectionItem) => new Set(it.moments.map((m) => m.episodeId)).size;
const afterparties = (n: number) => `${n} ${n === 1 ? "Afterparty" : "Afterparties"}`;
const CHIP = "rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition";
const sortName = (s: string) => s.replace(/^['‘"“]|^the\s+/i, "");
// "Newest Afterparty" (Lisa, 29 Oct 2026 - the old "Newest episode" sorted by broadcast date and barely moved anything):
// a title ranks by the newest Afterparty on this site that mentions it.
const apDate = Object.fromEntries(episodes.map((e) => [e.id, e.afterpartyPublished]));
const newestAp = (it: CollectionItem) => it.moments.reduce((d, m) => ((apDate[m.episodeId] ?? "") > d ? apDate[m.episodeId] ?? "" : d), "");
// Polaroid strip: every Afterparty with reading, newest first.
const libEpisodes = [...episodes]
  .filter((e) => bookClub.some((b) => b.moments.some((m) => m.episodeId === e.id)))
  .sort((a, b) => b.afterpartyPublished.localeCompare(a.afterpartyPublished));
type View = "shelves" | "afterparties";

function LibraryPage() {
  const [shelf, setShelf] = useState("all");
  const [sort, setSort] = useState<"mentions" | "az" | "episode">("mentions");
  const [open, setOpen] = useState<string | null>(null);
  const [ep, setEp] = useState<string | null>(null);
  const [view, setView] = useState<View>("shelves");
  const pool = useMemo(() => (ep ? bookClub.filter((b) => b.moments.some((m) => m.episodeId === ep)) : bookClub), [ep]);
  const counts = useMemo(() => Object.fromEntries(BOOK_SHELVES.map((s) => [s.key, pool.filter((i) => i.shelf === s.key).length])), [pool]);
  const sorted = useMemo(() => {
    if (sort === "az") return [...pool].sort((a, b) => sortName(a.name).localeCompare(sortName(b.name)));
    if (sort === "episode") return [...pool].sort((a, b) => newestAp(b).localeCompare(newestAp(a)) || b.mentions - a.mentions);
    return pool;
  }, [sort, pool]);
  const shelved = sorted.filter((i) => shelf === "all" || i.shelf === shelf);
  const sections =
    view === "afterparties" && !ep
      ? libEpisodes
          .map((e) => ({ key: e.id, label: `${stageName(e.guest)} · S${e.season}E${e.episode}`, items: shelved.filter((i) => i.moments.some((m) => m.episodeId === e.id)) }))
          .filter((s) => s.items.length)
      : BOOK_SHELVES.filter((s) => shelf === "all" || s.key === shelf).map((s) => ({ ...s, items: sorted.filter((i) => i.shelf === s.key) }));
  const toggle = (slug: string) => setOpen((o) => (o === slug ? null : slug));

  return (
    <main
      className="page-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${stacks})`, "--sky-phone": `url(${stacksPhone})` } as CSSProperties}
    >
      {/* Header (Lisa, 29 Oct 2026, "L2"): towering stacks of books, magazines and newspapers in the photocopy halftone, fading
          right after the tagline so the buttons read (scripts/page-headers/fade.py). */}
      <section className="page-head px-4 text-center">
        <h1 className="timeline-title">
          <span className="timeline-strip timeline-strip-ink">The Night Fever</span>
          <br />
          <span className="timeline-strip timeline-strip-pink">Library</span>
        </h1>
        <p className="timeline-tag">Every book, magazine and column the guests drop. Tap a cover for every moment.</p>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="jbx-pols lib-pols" role="group" aria-label="Show one Afterparty's reading">
          <button type="button" className={`jbx-pol lib-all${ep === null ? " on" : ""}`} aria-pressed={ep === null} onClick={() => setEp(null)}>
            <b>Every Afterparty</b>
            <span>{libEpisodes.length} Afterparties</span>
          </button>
          {libEpisodes.map((e) => (
            <button key={e.id} type="button" className={`jbx-pol${ep === e.id ? " on" : ""}`} aria-pressed={ep === e.id} onClick={() => setEp(ep === e.id ? null : e.id)} title={`The reading from ${stageName(e.guest)}'s Afterparty`}>
              {episodePortraits[e.id] && <img src={episodePortraits[e.id]} alt="" loading="lazy" />}
              <span>S{e.season}E{e.episode}</span>
              <b>{stageName(e.guest)}</b>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b-2 border-gold pb-5">
          <div className="flex flex-wrap gap-2">
            <button type="button" className={CHIP} aria-pressed={shelf === "all"} onClick={() => setShelf("all")}>
              <span className="uppercase">Everything</span> <span className="ml-1 text-pink">{pool.length}</span>
            </button>
            {BOOK_SHELVES.map((s) => (
              <button key={s.key} type="button" className={CHIP} aria-pressed={shelf === s.key} onClick={() => setShelf(s.key)}>
                {s.label} <span className="ml-1 opacity-70">{counts[s.key]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Sort:</span>
            <button type="button" className={CHIP} aria-pressed={sort === "mentions"} onClick={() => setSort("mentions")}>Most dropped</button>
            <button type="button" className={CHIP} aria-pressed={sort === "az"} onClick={() => setSort("az")}>A–Z</button>
            <button type="button" className={CHIP} aria-pressed={sort === "episode"} onClick={() => setSort("episode")}>Newest Afterparty</button>
            {!ep && (
              <>
                <span className="ml-2">Show:</span>
                <button type="button" className={CHIP} aria-pressed={view === "shelves"} onClick={() => setView("shelves")}>By shelf</button>
                <button type="button" className={CHIP} aria-pressed={view === "afterparties"} onClick={() => setView("afterparties")}>By Afterparty</button>
              </>
            )}
          </div>
        </div>

        {sections.map((s) => (
          <section key={s.key} aria-labelledby={`shelf-${s.key}`}>
            <h2 id={`shelf-${s.key}`} className="mt-12 border-b-[3px] border-gold pb-1 text-3xl font-bold uppercase text-cream">
              {s.label} <span className="text-pink">{s.items.length}</span>
            </h2>
            <ul className="lib-grid">
              {s.items.map((it, i) => (
                <Fragment key={it.slug}>
                  <li className="lib-item">
                    <button type="button" className="lib-hit" aria-expanded={open === it.slug} onClick={() => toggle(it.slug)}>
                      <CoverCard item={it} tint={i} />
                    </button>
                  </li>
                  {open === it.slug && (
                    <li className="lib-detail">
                      <Detail item={it} onClose={() => setOpen(null)} />
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
          The Library fills itself from my episode indexes, so every new Afterparty adds its reading. Book covers come from Open Library and stay
          their publishers&rsquo; work - shown small, only so you can spot the book; the magazine and newspaper mastheads are public-domain logos
          from Wikimedia Commons, printed in our photocopy colours. All pictures are kept on this site, so opening the Library never contacts
          another service. Covers without a picture are typed, the downtown way.
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}

function CoverCard({ item, tint }: { item: CollectionItem; tint: number }) {
  const cover = coverFor(item.name);
  const foot = (
    <span className="lib-foot">
      <b>{item.mentions > 0 ? `${item.mentions}×` : "–"}</b>dropped in {afterparties(episodesOf(item))}
    </span>
  );
  if (cover?.kind === "book")
    return (
      <span className="lib-cv lib-book">
        <img src={cover.src} alt={`Cover of ${item.name}`} loading="lazy" decoding="async" />
        <span className="lib-strip">
          <span className="lib-nm">{item.name}</span>
          {foot}
        </span>
      </span>
    );
  // Magazines alternate pink and black; newspapers are newsprint; columns are marker yellow; books without a cover are black.
  const colour = item.shelf === "newspapers" ? "lib-news" : item.shelf === "columns" ? "lib-col" : item.shelf === "books" ? "lib-ink" : tint % 2 ? "lib-ink" : "lib-pink";
  return (
    <span className={`lib-cv lib-type ${colour}`}>
      <span className="lib-kind">{KIND[item.shelf]}</span>
      {cover?.kind === "mast" ? (
        <>
          <img className="lib-logo" src={cover.src} alt={`${item.name} masthead`} loading="lazy" decoding="async" />
          <span className="lib-lines">The AFTERPARTY issue<br />{item.name}</span>
        </>
      ) : (
        <span className={`lib-mast${item.name.length > 44 ? " lib-mast-xl" : item.name.length > 24 ? " lib-mast-l" : ""}`}>{item.name}</span>
      )}
      {foot}
    </span>
  );
}

function Detail({ item, onClose }: { item: CollectionItem; onClose: () => void }) {
  const cover = coverFor(item.name);
  return (
    <div className="border-2 border-gold bg-card p-5 shadow-[6px_6px_0_var(--color-gold)] sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-2xl font-bold uppercase text-cream">
          <Link to="/explore/$slug" params={{ slug: item.slug }} className="hover:text-pink">{item.name}</Link>
        </h3>
        <button type="button" onClick={onClose} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-pink">Close ✕</button>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {item.mentions > 0 ? `${item.mentions} mention${item.mentions === 1 ? "" : "s"}` : "implied"} · {afterparties(episodesOf(item))}
        {cover && <> · {cover.credit}</>}
      </p>
      <ul className="mt-4 space-y-2">
        {item.moments.map((m) => (
          <li key={m.episodeId + m.time} className="text-sm text-muted-foreground">
            <Link to={episodePath(m.episodeId as never)} className="font-medium text-gold hover:text-pink">{m.code} · {m.guest}</Link>
            {m.time && m.time !== "On camera" && <>{" · "}<Timestamp episodeId={m.episodeId} time={m.time} className="text-xs" /></>}
            {" - "}<EntityText text={m.context} />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <Link to="/explore/$slug" params={{ slug: item.slug }} className="text-gold hover:text-pink">Its A–Z card →</Link>
        {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="text-gold hover:text-pink">Read more {linkPlace(item.link)} ↗</a>}
        {item.shelf === "books" && <a href={findBookLink(item.name)} target="_blank" rel="noreferrer" className="text-gold hover:text-pink">Find a copy on Open Library ↗</a>}
      </div>
    </div>
  );
}
