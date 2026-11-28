import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { CoverFace } from "@/components/cover-face";
import { Cover } from "@/components/their-work";
import stacks from "@/assets/library-stacks.webp";
import stacksPhone from "@/assets/library-stacks-phone.webp";
import { episodePath } from "@/data/episodes";
import { pageHead } from "@/lib/seo";
import { Item as IdeaItem } from "@/components/still-to-make";
import { Timestamp } from "@/components/episode-player";
import { getGuestLibrary } from "@/lib/guest-library.functions";
import type { GuestCategory, GuestTile, MadeTile, TileLink } from "@/lib/guest-library.server";

// A guest's own Library (Lisa, 22 Nov 2026: "visit Lauren's library and then show the library page with her selections",
// option B): the "Visit <name>'s Library" button in the AFTERPARTY header opens this page.
// Since 28 Nov 2026 (Lisa: "Guest's library pages should be a summary of all library categories (publications, cover art,
// fashion, moving image) and update every time when we add more items to the library") it is a summary of the whole
// Library: a row of every category with its count, then what they made, then each category - what is theirs (made,
// designed, worn, in the cast) and what was dropped on their AFTERPARTY - then the suggestions. All worked out on the
// server from LIBRARY_CATEGORIES (src/lib/guest-library.server.ts), so new Library items show up here by themselves.

export const Route = createFileRoute("/library_/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const v = await getGuestLibrary({ data: params.slug });
    if (!v) throw notFound();
    const n =
      v.made.length +
      v.categories.reduce((k, c) => k + c.own.length + c.dropped.length, 0) +
      v.ideas.length +
      v.tips.length;
    if (!n) throw notFound();
    return v;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const d = loaderData;
    const counts = d.categories
      .map((c) => ({ label: c.label, n: c.own.length + c.dropped.length }))
      .filter((c) => c.n > 0)
      .map((c) => `${c.n} ${c.label.toLowerCase()}`);
    return pageHead({
      path: `/library/${d.slug}`,
      title: `${d.name}'s Library | Night Fever AFTERPARTY`,
      description: `Everything in ${d.name}'s Library${d.made.length ? `: what they made` : ""}${counts.length ? `${d.made.length ? ", " : ": "}${counts.join(", ")}` : ""} - pinned up like a downtown newsstand.`,
      image: "/og/library.jpg",
    });
  },
  component: GuestLibrary,
});

const H2 =
  "mt-12 border-b-[3px] border-gold pb-1 text-3xl font-bold uppercase text-cream scroll-mt-24";

/** A tile's link: its own Library page (art, look, designer, shop, film) or its A–Z / item page. */
function TileLinkTo({
  link,
  className,
  children,
}: {
  link: TileLink;
  className: string;
  children: ReactNode;
}) {
  return (
    <Link to={link.to} params={{ slug: link.slug }} className={className}>
      {children}
    </Link>
  );
}

function MadeItem({ m }: { m: MadeTile }) {
  if (!m.link)
    return (
      <li className="lib-item their-work-off">
        <Cover w={m.work} />
      </li>
    );
  return (
    <li className="lib-item">
      <TileLinkTo link={m.link} className="lib-hit">
        {m.design ? <CoverFace d={m.design} /> : <Cover w={m.work} />}
      </TileLinkTo>
    </li>
  );
}

function Tiles({ tiles }: { tiles: GuestTile[] }) {
  return (
    <ul className="lib-grid">
      {tiles.map((t) => (
        <li key={t.key} className="lib-item">
          <TileLinkTo link={t.link} className="lib-hit">
            <CoverFace d={t.design} />
          </TileLinkTo>
          {t.why && <span className="guest-lib-why">{t.why}</span>}
        </li>
      ))}
    </ul>
  );
}

function CategoryShelf({ c, name }: { c: GuestCategory; name: string }) {
  const n = c.own.length + c.dropped.length;
  return (
    <section aria-labelledby={`shelf-${c.key}`}>
      <h2 id={`shelf-${c.key}`} className={H2}>
        {c.label} <span className="text-pink">{n}</span>
      </h2>
      {n === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Nothing on this shelf for {name} yet - it fills up by itself as the Library grows.
        </p>
      )}
      {c.own.length > 0 && (
        <>
          <h3 className="their-work-group">{name}&rsquo;s own</h3>
          <Tiles tiles={c.own} />
        </>
      )}
      {c.dropped.length > 0 && (
        <>
          <h3 className="their-work-group">Dropped on {name}&rsquo;s AFTERPARTY</h3>
          <Tiles tiles={c.dropped} />
        </>
      )}
    </section>
  );
}

function GuestLibrary() {
  const v = Route.useLoaderData();
  const { slug, name, episode, polaroid, made, categories, ideas, tips } = v;
  const onShow = made.filter((m) => !m.work.offShow);
  const off = made.filter((m) => m.work.offShow);
  const suggested = ideas.length + tips.length;
  // The summary row (Lisa, 28 Nov 2026): every category of the Library with how much of it is theirs.
  const summary = [
    { id: "shelf-made", label: `Made by ${name}`, n: made.length },
    ...categories.map((c) => ({
      id: `shelf-${c.key}`,
      label: c.label,
      n: c.own.length + c.dropped.length,
    })),
    { id: "shelf-ideas", label: "Suggested", n: suggested },
  ];
  const backTo = episode ? (
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
  );

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
          {name}&rsquo;s whole Library: what {name} made, and every publication, cover, look and
          film or show that is {name}&rsquo;s{episode ? " or was dropped on the AFTERPARTY" : ""}.
          Tap a cover for its page.
        </p>
        <p className="mt-4">{backTo}</p>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* Lisa, 28 Nov 2026: "the polaroid and name should be clickable and connect to his page" - their AFTERPARTY for a
            guest, else their own page. */}
        {polaroid && (
          <figure className="guest-lib-polaroid">
            {episode ? (
              <Link
                to={episodePath(episode as Parameters<typeof episodePath>[0])}
                className="guest-lib-polaroid-link"
              >
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
        <nav aria-label={`What is in ${name}'s Library`} className="guest-lib-sum">
          <p className="guest-lib-sum-h">In {name}&rsquo;s Library</p>
          <ul>
            {summary.map((s) => (
              <li key={s.id}>
                {s.n > 0 ? (
                  <a href={`#${s.id}`} className="lib-cat guest-lib-cat guest-lib-cat-on">
                    {s.label} <span className="lib-cat-n">{s.n}</span>
                  </a>
                ) : (
                  <span className="lib-cat guest-lib-cat guest-lib-cat-0">
                    {s.label} <span className="lib-cat-n">0</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {made.length > 0 && (
          <section aria-labelledby="shelf-made">
            <h2 id="shelf-made" className={H2}>
              Made by {name} <span className="text-pink">{made.length}</span>
            </h2>
            <ul className="lib-grid">
              {[...onShow, ...off].map((m) => (
                <MadeItem key={m.key} m={m} />
              ))}
            </ul>
          </section>
        )}
        {categories.map((c) => (
          <CategoryShelf key={c.key} c={c} name={name} />
        ))}
        {suggested > 0 && (
          <section aria-labelledby="shelf-ideas">
            <h2 id="shelf-ideas" className={H2}>
              Suggested on {name}'s AFTERPARTY <span className="text-pink">{suggested}</span>
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
                  {tips.map((t) => (
                    <li key={t.name + t.time}>
                      <p className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight text-cream">
                        {t.card ? (
                          <Link
                            to="/explore/$slug"
                            params={{ slug: t.card }}
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
                  ))}
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
