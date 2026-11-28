import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useMemo, useState, type CSSProperties } from "react";
import { MomentsBox } from "@/components/moments-box";
import { StillToMakeBox } from "@/components/still-to-make";
import { SiteFooter } from "@/components/site-footer";
import stacks from "@/assets/library-stacks.webp";
import stacksPhone from "@/assets/library-stacks-phone.webp";
import { type CollectionItem } from "@/data/collections";
import {
  DEFAULT_CATEGORY,
  LIBRARY_CATEGORIES,
  categoryOf,
  droppedInAfterparty,
  firstTimeIn,
  inEpisode,
} from "@/data/library-categories";
import { afterpartyNumber, episodeById, episodePath, episodes, stageName } from "@/data/episodes";
import { episodeShort } from "@/data/entities";
import { polaroidThumb } from "@/lib/polaroids";
import { coverFor } from "@/data/library-covers";
import { CoverCard } from "@/components/library-cover";
import { FashionNote } from "@/components/fashion-cover";
import { isFashionItem } from "@/data/library-fashion";
import { isScreenItem } from "@/data/moving-images";
import { abs, jsonLd, pageHead } from "@/lib/seo";

// The Library (Lisa, 29 Oct 2026 - was the Book Club at /book-club, which now redirects here): every book, magazine,
// newspaper and column the guests drop, pinned up like a downtown newsstand. Real covers where we have them
// (src/data/library-covers.ts), typed photocopy covers for the rest. Tap a cover for every moment it comes up.
// Since 24 Nov 2026 the Library has categories (src/data/library-categories.ts): Publications first, then Cover art & posters.

// ?view=afterparty shows only what the guests dropped; ?ep=<id> one AFTERPARTY (Lisa, 28 Nov 2026).
type Search = { cat?: string; view?: "afterparty"; ep?: string };
const EPISODE_IDS = new Set(episodes.map((e) => e.id));

export const Route = createFileRoute("/library")({
  staticData: { sitemap: true },
  // /library?cat=<key> opens on that category (Publications when there is none).
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s["cat"] === "string" && s["cat"] !== DEFAULT_CATEGORY ? { cat: s["cat"] } : {}),
    ...(s["view"] === "afterparty" ? { view: "afterparty" as const } : {}),
    ...(typeof s["ep"] === "string" && EPISODE_IDS.has(s["ep"]) ? { ep: s["ep"] } : {}),
  }),
  // The shelf data loads with the Library (page weight, 16 Nov 2026); the head only needs the counts and the first 50 items.
  loader: async () => {
    const [{ bookClub }, { coverArt }, { cardPath }] = await Promise.all([
      import("@/data/collections"),
      import("@/data/cover-art"),
      import("@/lib/card-link"),
    ]);
    const books = bookClub.filter((b) => b.shelf === "books").length;
    return {
      books,
      press: bookClub.length - books,
      art: coverArt.length,
      total: bookClub.length + coverArt.length,
      first: bookClub
        .slice(0, 50)
        .map((b) => ({
          type:
            b.shelf === "books" || b.shelf === "diaries"
              ? "Book"
              : b.shelf === "columns"
                ? "Article"
                : "Periodical",
          name: b.name,
          url: abs(cardPath(b.slug)),
        })),
    };
  },
  head: ({ loaderData }) => {
    const d = loaderData ?? { books: 0, press: 0, art: 0, total: 0, first: [] };
    const description = `Every book, magazine and column the Night Fever guests mention - ${d.books} books, ${d.press} papers and magazines and ${d.art} sleeves, posters and flyers, pinned up like a newsstand. Grab one!`;
    return {
      ...pageHead({
        path: "/library",
        title: "Night Fever Library – every book & magazine the guests mention",
        description,
        image: "/og/library.jpg",
      }),
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Night Fever Library",
          url: abs("/library"),
          numberOfItems: d.total,
          itemListElement: d.first.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": b.type, name: b.name, url: b.url },
          })),
        }),
      ],
    };
  },
  component: LibraryPage,
});

const CHIP = "season-chip rounded-full";
// The AFTERPARTY switch and picker look like the Map's AFTERPARTY picker.
const apChip = (on: boolean) =>
  `rounded-full border-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
    on
      ? "border-[#111] bg-[#111] text-[#f6f0ea]"
      : "border-[#111] bg-[#f6f0ea] text-[#111] hover:bg-pink hover:text-pink-foreground"
  }`;
const sortName = (s: string) => s.replace(/^['‘"“]|^the\s+/i, "");
// Per-Afterparty views were parked on 29 Oct 2026 and asked for on 28 Nov 2026 (Lisa: "sort on afterparty only and select
// per episode"): an AFTERPARTY only switch and an episode picker that filter every category.
// A club can hang two pieces on the Cover art shelf (its Clubs ticket and its Jukebox picture), so those are told apart by picture.
const keyOf = (it: CollectionItem) => (it.art ? `${it.slug}#${it.art.src}` : it.slug);

function LibraryPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/library" });
  const cat = categoryOf(search.cat);
  const ep = search.ep;
  const only = !!ep || search.view === "afterparty";
  const [shelf, setShelf] = useState("all");
  const [sort, setSort] = useState<"mentions" | "az">("mentions");
  const [open, setOpen] = useState<string | null>(null);
  const go = (next: Search) => {
    setShelf("all");
    setOpen(null);
    void navigate({ search: next, replace: true, resetScroll: false });
  };
  const catSearch = cat.key === DEFAULT_CATEGORY ? {} : { cat: cat.key };
  const pickCategory = (key: string) =>
    go({
      ...(key === DEFAULT_CATEGORY ? {} : { cat: key }),
      ...(ep ? { ep } : only ? { view: "afterparty" as const } : {}),
    });
  const pickView = (afterparty: boolean) =>
    go({ ...catSearch, ...(afterparty ? { view: "afterparty" as const } : {}) });
  const pickEpisode = (id: string) =>
    go({ ...catSearch, ...(id ? { ep: id } : only ? { view: "afterparty" as const } : {}) });
  // What the switch and the picker let through, in every category (for the category counts too).
  const keep = useMemo(
    () => (it: CollectionItem) => (ep ? inEpisode(it, ep) : only ? droppedInAfterparty(it) : true),
    [ep, only],
  );
  const shown = useMemo(() => cat.items.filter(keep), [cat, keep]);
  const counts = useMemo(
    () =>
      Object.fromEntries(
        cat.shelves.map((s) => [s.key, shown.filter((i) => i.shelf === s.key).length]),
      ),
    [cat, shown],
  );
  // One AFTERPARTY: in the order things come up in the episode; otherwise most dropped first.
  const sorted = useMemo(
    () =>
      sort === "az"
        ? [...shown].sort((a, b) => sortName(a.name).localeCompare(sortName(b.name)))
        : ep
          ? [...shown].sort((a, b) => firstTimeIn(a, ep) - firstTimeIn(b, ep))
          : shown,
    [sort, shown, ep],
  );
  const sections = cat.shelves
    .filter((s) => shelf === "all" || s.key === shelf)
    .map((s) => ({ ...s, items: sorted.filter((i) => i.shelf === s.key) }))
    .filter((s) => !only || s.items.length > 0);
  const guest = ep ? stageName(episodeById(ep).guest) : "";
  const toggle = (key: string) => setOpen((o) => (o === key ? null : key));

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
        <p className="timeline-tag">
          Every book, magazine, sleeve and poster the guests drop. Tap one for every moment.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* "Still to be made" (Lisa, 4 Nov 2026): the books and films the guests say should exist, as a box above the shelves. */}
        <StillToMakeBox className="mb-14 mt-10" />
        {/* AFTERPARTY switch + picker (Lisa, 28 Nov 2026): the whole Library, only what the guests dropped, or one
            AFTERPARTY - across every category, kept in the address (?view=afterparty, ?ep=<id>). */}
        <div className="lib-ap" role="group" aria-label="AFTERPARTY filter">
          <span className="lib-ap-label">Show</span>
          <button type="button" className={apChip(!only)} aria-pressed={!only} onClick={() => pickView(false)}>
            Whole Library
          </button>
          <button
            type="button"
            className={apChip(only && !ep)}
            aria-pressed={only && !ep}
            onClick={() => pickView(true)}
          >
            AFTERPARTY only
          </button>
          <span className="relative inline-block max-w-full">
            <label htmlFor="lib-ap-pick" className="sr-only">
              Pick an AFTERPARTY
            </label>
            <select
              id="lib-ap-pick"
              value={ep ?? ""}
              onChange={(e) => pickEpisode(e.target.value)}
              className={`${apChip(!!ep)} max-w-full cursor-pointer appearance-none pr-8`}
            >
              <option value="">Pick an AFTERPARTY</option>
              {episodes.map((x) => (
                <option key={x.id} value={x.id}>
                  {episodeShort(x.id)} · {stageName(x.guest)} · #{afterpartyNumber(x.id)}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs ${ep ? "text-[#f6f0ea]" : "text-[#111]"}`}
            >
              &#9662;
            </span>
          </span>
        </div>
        {ep && (
          <div className="lib-ap-ep">
            {polaroidThumb(ep, 240) && (
              <img src={polaroidThumb(ep, 240)} alt={`${guest}'s polaroid`} width={72} height={86} loading="lazy" />
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">
                {episodeShort(ep)} · AFTERPARTY #{afterpartyNumber(ep)}
              </p>
              <Link to={episodePath(ep as never)} className="lib-ap-name">
                {guest}&rsquo;s AFTERPARTY
              </Link>
              <p className="text-sm text-muted-foreground">
                {LIBRARY_CATEGORIES.map((c) => ({ c, n: c.items.filter(keep).length }))
                  .filter((x) => x.n > 0)
                  .map((x) => `${x.n} ${x.c.label.toLowerCase()}`)
                  .join(" · ")}{" "}
                - in the order they come up.
              </p>
            </div>
            <button type="button" className="lib-ap-x" onClick={() => pickEpisode("")} aria-label="Show every AFTERPARTY">
              &times;
            </button>
          </div>
        )}
        {/* Library categories (Lisa, 24 Nov 2026): flyer strips above the shelf chips; the chosen one is pink. */}
        <nav aria-label="Library categories" className="lib-cats">
          {LIBRARY_CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className="lib-cat"
              aria-pressed={c.key === cat.key}
              onClick={() => pickCategory(c.key)}
            >
              {c.label} <span className="lib-cat-n">{only ? c.items.filter(keep).length : c.items.length}</span>
            </button>
          ))}
        </nav>
        <p className="mt-3 text-sm text-muted-foreground">{cat.blurb}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b-2 border-gold pb-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={CHIP}
              aria-pressed={shelf === "all"}
              onClick={() => setShelf("all")}
            >
              <span className="uppercase">Everything</span>{" "}
              <span className="ml-1 text-pink">{shown.length}</span>
            </button>
            {cat.shelves.filter((s) => !only || counts[s.key]).map((s) => (
              <button
                key={s.key}
                type="button"
                className={CHIP}
                aria-pressed={shelf === s.key}
                onClick={() => setShelf(s.key)}
              >
                {s.label} <span className="ml-1 opacity-70">{counts[s.key]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{ep ? "In the order they come up" : "Most dropped first"} ·</span>
            <button
              type="button"
              className={CHIP}
              aria-pressed={sort === "az"}
              onClick={() => setSort(sort === "az" ? "mentions" : "az")}
            >
              A–Z
            </button>
          </div>
        </div>

        {only && shown.length === 0 && (
          <p className="mt-10 text-muted-foreground">
            {ep ? `${guest} drops no ${cat.label.toLowerCase()} in this AFTERPARTY.` : "Nothing here yet."} Try another category above.
          </p>
        )}
        {sections.map((s) => (
          <section key={s.key} aria-labelledby={`shelf-${s.key}`}>
            <h2
              id={`shelf-${s.key}`}
              className="mt-12 border-b-[3px] border-gold pb-1 text-3xl font-bold uppercase text-cream"
            >
              {s.label} <span className="text-pink">{s.items.length}</span>
            </h2>
            <Grid items={s.items} open={open} toggle={toggle} close={() => setOpen(null)} />
          </section>
        ))}

        <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
          The Library fills itself from my episode indexes, so every new Afterparty adds its
          reading. The Cover art &amp; posters shelf hangs the sleeves (Cover Art Archive), film
          posters and TV title cards (Wikipedia and Wikimedia Commons) and the real club flyers,
          tickets and invitations (Gallery 98 and 1stDibs) of the works the guests drop, each
          credited on its card, with the designer named where the sleeve or poster credits them.
          Book covers come from Open Library, the other covers and article scans from archives,
          galleries, booksellers and dealer listings (each credited on its card), and all stay their
          publishers&rsquo; work - shown small, only so you can spot the book; the magazine and
          newspaper mastheads are public-domain logos from Wikimedia Commons, printed in our
          photocopy colours. All pictures are kept on this site, so opening the Library never
          contacts another service. Covers without a picture are typed, the downtown way.
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}

function Grid({
  items,
  open,
  toggle,
  close,
}: {
  items: CollectionItem[];
  open: string | null;
  toggle: (k: string) => void;
  close: () => void;
}) {
  return (
    <ul className="lib-grid">
      {items.map((it, i) => {
        const k = keyOf(it);
        return (
          <Fragment key={k}>
            <li className="lib-item">
              <button
                type="button"
                className="lib-hit"
                aria-expanded={open === k}
                onClick={() => toggle(k)}
              >
                <CoverCard item={it} tint={i} />
              </button>
            </li>
            {open === k && (
              <li className="lib-detail">
                <Detail item={it} onClose={close} />
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}

function Detail({ item, onClose }: { item: CollectionItem; onClose: () => void }) {
  const cover = coverFor(item.name);
  const art = item.art;
  const note = art ? (
    <>
      {art.designers.length > 0 && <>Cover by {art.designers.join(" and ")} · </>}
      {art.credit}
    </>
  ) : isFashionItem(item) ? (
    <FashionNote item={item} />
  ) : (
    cover?.credit
  );
  return (
    <MomentsBox
      name={item.name}
      slug={item.slug}
      mentions={item.mentions}
      moments={item.moments}
      link={item.link || undefined}
      note={note}
      extra={
        art ? (
          // Its own page (Lisa, 24 Nov 2026): the artwork big, who made it, everyone credited, the guests' words, its video.
          <Link to="/library/art/$slug" params={{ slug: art.page }} className="font-semibold text-pink hover:text-foreground">
            The {art.piece.toLowerCase().startsWith("sleeve") || art.piece.length > 20 ? "artwork" : art.piece.toLowerCase()}&rsquo;s own page &rarr;
          </Link>
        ) : isFashionItem(item) && item.fashion.look && item.shelf !== "rooms" ? (
          // A look's own page (Lisa, 24 Nov 2026): the mannequin, what was worn, whose look, the moment.
          <Link to="/library/look/$slug" params={{ slug: item.slug }} className="font-semibold text-pink hover:text-foreground">
            The look&rsquo;s own page &rarr;
          </Link>
        ) : isFashionItem(item) && (item.shelf === "designers" || item.shelf === "shops") ? (
          // A designer's, label's or shop's own page (Lisa, 27 Nov 2026): the polaroid or the shop's photo, the looks, the map.
          <Link
            to={item.shelf === "shops" ? "/library/shop/$slug" : "/library/designer/$slug"}
            params={{ slug: item.slug }}
            className="font-semibold text-pink hover:text-foreground"
          >
            {item.shelf === "shops" ? "The shop\u2019s own page" : item.fashion.tag === "Label" ? "The label\u2019s own page" : "The designer\u2019s own page"} &rarr;
          </Link>
        ) : isScreenItem(item) ? (
          // Its own page (Lisa, 24 Nov 2026): the Jukebox video big, everyone who was involved, the guests' words.
          <Link to="/library/moving-images/$slug" params={{ slug: item.slug }} className="font-semibold text-pink hover:text-foreground">
            The {item.shelf === "tv-shows" ? "show" : item.shelf === "music-videos" ? "video" : "film"}&rsquo;s own page &rarr;
          </Link>
        ) : undefined
      }
      summary={
        item.by ? (
          <>Not dropped in an episode yet · by {item.by.name}</>
        ) : isFashionItem(item) && item.shelf === "on-camera" ? (
          <>
            On camera · <FashionNote item={item} />
          </>
        ) : undefined
      }
      onClose={onClose}
    />
  );
}
