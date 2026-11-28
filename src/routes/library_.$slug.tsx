import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, type CSSProperties } from "react";
import { SiteFooter } from "@/components/site-footer";
import { CoverCard } from "@/components/library-cover";
import { Cover } from "@/components/their-work";
import stacks from "@/assets/library-stacks.webp";
import stacksPhone from "@/assets/library-stacks-phone.webp";
import { bookClub } from "@/data/collections";
import { coverFor } from "@/data/library-covers";
import { entityBySlug } from "@/data/entities";
import { episodeById, episodePath, stageName } from "@/data/episodes";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { polaroidThumb } from "@/lib/polaroids";
import { libraryOf, type PersonWork } from "@/lib/works";
import { pageHead } from "@/lib/seo";
import { Item as IdeaItem } from "@/components/still-to-make";
import { Timestamp } from "@/components/episode-player";
import { entityFor } from "@/data/entities";

// A guest's own Library (Lisa, 22 Nov 2026: "visit Lauren's library and then show the library page with her selections",
// option B): the "Visit <name>'s Library" button in the AFTERPARTY header opens this page. First shelf: what they made
// (src/lib/works.ts). Second shelf: the books, magazines and columns dropped on their AFTERPARTY. Same newsstand covers as
// the Library; every cover opens its own page.

export const Route = createFileRoute("/library_/$slug")({
  staticData: { sitemap: false },
  loader: ({ params }) => {
    const e = entityBySlug[params.slug];
    if (!e || e.category !== "Person") throw notFound();
    const { works, picks, ideas, tips } = libraryOf(e.slug);
    if (!works.length && !picks.length && !ideas.length && !tips.length) throw notFound();
    return { slug: e.slug, name: e.name, made: works.length, picks: picks.length };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const d = loaderData;
    return pageHead({
      path: `/library/${d.slug}`,
      title: `${d.name}'s Library | Night Fever AFTERPARTY`,
      description: `What ${d.name} made${d.picks ? `, and the ${d.picks} books and magazines dropped on their AFTERPARTY` : ""} - pinned up like a downtown newsstand.`,
      image: "/og/library.jpg",
    });
  },
  component: GuestLibrary,
});

const libraryBySlug = new Map(bookClub.map((b) => [b.slug, b]));
const H2 = "mt-12 border-b-[3px] border-gold pb-1 text-3xl font-bold uppercase text-cream";

function Tile({ w }: { w: PersonWork }) {
  const lib = w.slug ? libraryBySlug.get(w.slug) : undefined;
  if (w.offShow || !w.slug)
    return (
      <li className="lib-item their-work-off">
        <Cover w={w} />
      </li>
    );
  return (
    <li className="lib-item">
      <Link to="/explore/$slug" params={{ slug: w.slug }} className="lib-hit">
        {lib ? <CoverCard item={lib} tint={0} /> : <Cover w={w} />}
      </Link>
    </li>
  );
}

function GuestLibrary() {
  const { slug } = Route.useLoaderData();
  const e = entityBySlug[slug]!;
  const { works, picks, ideas, tips, episode } = useMemo(
    () => {
      const lib = libraryOf(slug, (n) => (coverFor(n)?.kind === "book" ? coverFor(n)!.src : undefined));
      // Masthead logos on the typed covers (Lisa, 28 Nov 2026: "cover designs or logos"), as on the A–Z pages.
      for (const w of lib.works) if (!w.cover && w.slug) { const c = coverFor(w.coverName ?? w.name); if (c?.kind === "mast") w.logo = c.src; }
      return lib;
    },
    [slug],
  );
  const name = episode ? stageName(episodeById(episode).guest) : e.name;
  const polaroid = episode ? polaroidThumb(episode, 512) : PERSON_PORTRAITS[slug]?.polaroid;
  const onShow = works.filter((w) => !w.offShow);
  const off = works.filter((w) => w.offShow);

  return (
    <main
      className="page-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${stacks})`, "--sky-phone": `url(${stacksPhone})` } as CSSProperties}
    >
      <section className="page-head px-4 text-center">
        <h1 className="timeline-title">
          <span className="timeline-strip timeline-strip-ink">{name}'s</span>
          <br />
          <span className="timeline-strip timeline-strip-pink">Library</span>
        </h1>
        <p className="timeline-tag">
          What {name} made{picks.length ? ", what was dropped on the AFTERPARTY" : ""}
          {ideas.length + tips.length ? " and what it says should come next" : ""}. Tap a cover for
          its page.
        </p>
        <p className="mt-4">
          {episode ? (
            <Link
              to={episodePath(episode as Parameters<typeof episodePath>[0])}
              className="guest-lib-back timeline-strip timeline-strip-ink"
            >
              &larr; Back to {name}'s AFTERPARTY
            </Link>
          ) : (
            <Link
              to="/explore/$slug"
              params={{ slug }}
              className="guest-lib-back timeline-strip timeline-strip-ink"
            >
              &larr; Back to {name}'s page
            </Link>
          )}
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* Lisa, 28 Nov 2026: "the polaroid and name should be clickable and connect to his page" - their AFTERPARTY for a
            guest, else their own page. */}
        {polaroid && (
          <figure className="guest-lib-polaroid">
            {episode ? (
              <Link to={episodePath(episode as Parameters<typeof episodePath>[0])} className="guest-lib-polaroid-link">
                <img src={polaroid} alt={`${name} polaroid`} loading="lazy" decoding="async" />
                <figcaption>{name}</figcaption>
              </Link>
            ) : (
              <Link to="/explore/$slug" params={{ slug }} className="guest-lib-polaroid-link">
                <img src={polaroid} alt={`${name} polaroid`} loading="lazy" decoding="async" />
                <figcaption>{name}</figcaption>
              </Link>
            )}
          </figure>
        )}
        {works.length > 0 && (
          <section aria-labelledby="shelf-made">
            <h2 id="shelf-made" className={H2}>
              Made by {name} <span className="text-pink">{works.length}</span>
            </h2>
            <ul className="lib-grid">
              {onShow.map((w) => (
                <Tile key={w.slug ?? w.name} w={w} />
              ))}
              {off.map((w) => (
                <Tile key={w.name} w={w} />
              ))}
            </ul>
          </section>
        )}
        {picks.length > 0 && (
          <section aria-labelledby="shelf-picks">
            <h2 id="shelf-picks" className={H2}>
              Dropped on {name}'s AFTERPARTY <span className="text-pink">{picks.length}</span>
            </h2>
            <ul className="lib-grid">
              {picks.map((it, i) => (
                <li key={it.slug} className="lib-item">
                  <Link
                    to="/explore/$slug"
                    params={{ slug: it.slug }}
                    className="lib-hit"
                  >
                    <CoverCard item={it} tint={i} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {ideas.length + tips.length > 0 && (
          <section aria-labelledby="shelf-ideas">
            <h2 id="shelf-ideas" className={H2}>
              Suggested on {name}'s AFTERPARTY{" "}
              <span className="text-pink">{ideas.length + tips.length}</span>
            </h2>
            {ideas.length > 0 && (
              <>
                <h3 className="their-work-group">Still to be written or made</h3>
                <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                  {ideas.map((it) => (
                    <IdeaItem key={it.title} it={it} kind={it.kind} />
                  ))}
                </ul>
              </>
            )}
            {tips.length > 0 && (
              <>
                <h3 className="their-work-group">Who to interview next</h3>
                <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                  {tips.map((t) => {
                    const card = entityFor(t.name);
                    return (
                      <li key={t.name + t.time}>
                        <p className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream">
                          {card ? (
                            <Link
                              to="/explore/$slug"
                              params={{ slug: card.slug }}
                              className="transition-colors hover:text-pink"
                            >
                              {t.name}
                            </Link>
                          ) : (
                            t.name
                          )}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-card-foreground/85">
                          {t.why}
                        </p>
                        {episode && (
                          <Timestamp episodeId={episode} time={t.time} className="mt-1 text-xs" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </section>
        )}
        <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
          {off.length > 0 && (
            <>Dashed covers are things {name} made that no guest has dropped on the show yet. </>
          )}
          <Link to="/library" className="text-cream hover:text-pink">
            The whole Library &rarr;
          </Link>
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}
