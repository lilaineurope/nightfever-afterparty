import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fragment, useMemo, useState, type CSSProperties } from "react";
import { MomentsBox } from "@/components/moments-box";
import { StillToMakeBox } from "@/components/still-to-make";
import { SiteFooter } from "@/components/site-footer";
import stacks from "@/assets/library-stacks.webp";
import stacksPhone from "@/assets/library-stacks-phone.webp";
import { type CollectionItem } from "@/data/collections";
import { DEFAULT_CATEGORY, LIBRARY_CATEGORIES, categoryOf } from "@/data/library-categories";
import { coverFor } from "@/data/library-covers";
import { CoverCard } from "@/components/library-cover";
import { FashionNote } from "@/components/fashion-cover";
import { isFashionItem } from "@/data/library-fashion";
import { abs, jsonLd, pageHead } from "@/lib/seo";

// The Library (Lisa, 29 Oct 2026 - was the Book Club at /book-club, which now redirects here): every book, magazine,
// newspaper and column the guests drop, pinned up like a downtown newsstand. Real covers where we have them
// (src/data/library-covers.ts), typed photocopy covers for the rest. Tap a cover for every moment it comes up.
// Since 24 Nov 2026 the Library has categories (src/data/library-categories.ts): Publications first, then Cover art & posters.

type Search = { cat?: string };

export const Route = createFileRoute("/library")({
  staticData: { sitemap: true },
  // /library?cat=<key> opens on that category (Publications when there is none).
  validateSearch: (s: Record<string, unknown>): Search =>
    typeof s["cat"] === "string" && s["cat"] !== DEFAULT_CATEGORY ? { cat: s["cat"] } : {},
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
const sortName = (s: string) => s.replace(/^['‘"“]|^the\s+/i, "");
// Per-Afterparty sorting and views were tried and parked (Lisa, 29 Oct 2026: "no to afterparty category for library yet").
// A club can hang two pieces on the Cover art shelf (its Clubs ticket and its Jukebox picture), so those are told apart by picture.
const keyOf = (it: CollectionItem) => (it.art ? `${it.slug}#${it.art.src}` : it.slug);

function LibraryPage() {
  const { cat: catKey } = Route.useSearch();
  const navigate = useNavigate({ from: "/library" });
  const cat = categoryOf(catKey);
  const [shelf, setShelf] = useState("all");
  const [sort, setSort] = useState<"mentions" | "az">("mentions");
  const [open, setOpen] = useState<string | null>(null);
  const pickCategory = (key: string) => {
    setShelf("all");
    setOpen(null);
    void navigate({
      search: key === DEFAULT_CATEGORY ? {} : { cat: key },
      replace: true,
      resetScroll: false,
    });
  };
  const counts = useMemo(
    () =>
      Object.fromEntries(
        cat.shelves.map((s) => [s.key, cat.items.filter((i) => i.shelf === s.key).length]),
      ),
    [cat],
  );
  const sorted = useMemo(
    () =>
      sort === "az"
        ? [...cat.items].sort((a, b) => sortName(a.name).localeCompare(sortName(b.name)))
        : cat.items,
    [sort, cat],
  );
  const sections = cat.shelves
    .filter((s) => shelf === "all" || s.key === shelf)
    .map((s) => ({ ...s, items: sorted.filter((i) => i.shelf === s.key) }));
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
              {c.label} <span className="lib-cat-n">{c.items.length}</span>
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
              <span className="ml-1 text-pink">{cat.items.length}</span>
            </button>
            {cat.shelves.map((s) => (
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
            <span>Most dropped first ·</span>
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
