import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { TrailerJukebox } from "@/components/library-item";
import { episodePath } from "@/data/episodes";
import { getArtPage } from "@/lib/art-page.functions";
import type { ArtPageView, Named } from "@/lib/art-page.server";
import { pageHead } from "@/lib/seo";
import "@fontsource/covered-by-your-grace/400.css";

// One page per piece on the Library's Cover art & posters shelf (Lisa, 24 Nov 2026): the artwork big on the side, then
// what it was made for, who made the art, everyone else credited, what the guests said about it and its video.
// Data: src/lib/art-page.server.ts.

export const Route = createFileRoute("/library_/art/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const v = await getArtPage({ data: params.slug });
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const v = loaderData;
    return pageHead({
      path: `/library/art/${v.page}`,
      title: `${v.name} – ${v.kind.toLowerCase()} | Night Fever AFTERPARTY Library`,
      description: `${v.forWhat} Who made it, everyone credited on it and what the Night Fever guests said about it.`,
      image: "/og/library.jpg",
    });
  },
  component: ArtPage,
});

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

function Name({ n }: { n: Named }) {
  return n.href ? (
    <a href={n.href} className="art-name">
      {n.name}
    </a>
  ) : (
    <span className="art-name-plain">{n.name}</span>
  );
}

function People({ people }: { people: Named[] }) {
  return (
    <>
      {people.map((p, i) => (
        <span key={p.name}>
          {i > 0 && (i === people.length - 1 ? " and " : ", ")}
          <Name n={p} />
        </span>
      ))}
    </>
  );
}

function ArtPage() {
  const v = Route.useLoaderData() as ArtPageView;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <nav className="art-crumbs" aria-label="Where you are">
          <Link to="/library" className="art-name">
            Library
          </Link>{" "}
          ·{" "}
          <Link to="/library" search={{ cat: "art" }} className="art-name">
            Cover art &amp; posters
          </Link>{" "}
          · <span>{v.group}</span>
        </nav>

        <div className="art-page">
          {/* The artwork itself, big, on the side (Lisa, 24 Nov 2026) - whole, never cropped, with its credit. */}
          <figure className="art-big">
            <div className="art-frame">
              <img src={v.src} alt={v.alt} width={v.w} height={v.h} decoding="async" />
            </div>
            <figcaption>{v.credit}</figcaption>
          </figure>

          <div className="art-text">
            <p className="art-tag">
              {v.kind}
              {v.date ? ` · ${v.date}` : ""}
            </p>
            <h1
              className={`art-title${(v.kind.startsWith("Club") ? v.piece : v.name).length > 28 ? " art-title-long" : ""}`}
            >
              {v.piece !== v.name && v.kind.startsWith("Club") ? (
                <>
                  {v.piece}
                  <span className="art-title-sub">
                    at{" "}
                    <a href={v.href} className="art-name">
                      {v.name}
                    </a>
                  </span>
                </>
              ) : (
                <a href={v.href} className="art-name">
                  {v.name}
                </a>
              )}
            </h1>
            <p className="art-for">{v.forWhat}</p>
            {v.intro && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.intro}</p>
            )}

            <section className="art-box mt-8" aria-labelledby="art-made">
              <h2 id="art-made" className={h}>
                Who made the art
              </h2>
              {v.art.length ? (
                <dl className="art-credits mt-4">
                  {v.art.map((r) => (
                    <div key={r.role}>
                      <dt>{r.role}</dt>
                      <dd>
                        {r.people.map(
                          (p) =>
                            p.polaroid && (
                              <img
                                key={p.name}
                                src={p.polaroid}
                                alt=""
                                className="art-face"
                                width={240}
                                height={240}
                                loading="lazy"
                              />
                            ),
                        )}
                        <People people={r.people} />
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  The {v.kind.toLowerCase()} doesn&rsquo;t name its designer, and neither does
                  anything we can check. Know who made it? Tell me in the box at the bottom of the
                  page.
                </p>
              )}
            </section>

            {(v.credited.length > 0 || v.onIt.length > 0) && (
              <section className="art-box mt-6" aria-labelledby="art-credited">
                <h2 id="art-credited" className={h}>
                  {v.onIt.length ? "Who's on it" : "Everyone credited"}
                </h2>
                {v.onIt.length > 0 && (
                  <p className="art-on-it mt-4">
                    <People people={v.onIt} />
                  </p>
                )}
                {v.credited.length > 0 && (
                  <dl className="art-credits mt-4">
                    {v.credited.map((r) => (
                      <div key={r.role}>
                        <dt>{r.role}</dt>
                        <dd>
                          <People people={r.people} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="mt-4 text-xs text-muted-foreground">
                  From the{" "}
                  {v.kind.startsWith("Club")
                    ? "piece itself and its archive listing"
                    : "work's own credits"}{" "}
                  - names with a page on the site link to it.
                </p>
              </section>
            )}
          </div>
        </div>

        {v.quotes.length > 0 && (
          <section className="mt-14" aria-labelledby="art-said">
            <h2 id="art-said" className={h}>
              What the guests said{v.kind.startsWith("Club") ? ` about ${v.name}` : ""}
            </h2>
            <ul className="lit-quotes mt-5">
              {v.quotes.map((q) => (
                <li key={q.episodeId + q.time} className="lit-quote">
                  <blockquote>{q.quote}</blockquote>
                  <p className="lit-quote-who">
                    {q.polaroid && (
                      <img
                        src={q.polaroid}
                        alt=""
                        width={240}
                        height={240}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <span>
                      <Link
                        to={episodePath(q.episodeId as never)}
                        className="art-name font-semibold"
                      >
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
        )}

        {/* Guests who name it without a quote yet: how it came up, with the moment to play (episode mention lines rule). */}
        {v.moments.length > 0 && (
          <section className="mt-12" aria-labelledby="art-came-up">
            <h2 id="art-came-up" className={h}>
              How it came up on the show
            </h2>
            <ul className="art-moments mt-4">
              {v.moments.map((m) => (
                <li key={m.episodeId + m.time}>
                  {m.polaroid && (
                    <img
                      src={m.polaroid}
                      alt=""
                      width={240}
                      height={240}
                      loading="lazy"
                      decoding="async"
                      className="art-face"
                    />
                  )}
                  <div>
                    <Link to={episodePath(m.episodeId as never)} className="art-name font-semibold">
                      {m.short} · {m.guest}
                    </Link>{" "}
                    <Timestamp episodeId={m.episodeId} time={m.time} />
                    <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                      {m.context}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {v.videos.length > 0 && (
          <div className="mt-12">
            <TrailerJukebox trailers={v.videos} name={v.name} />
          </div>
        )}

        {v.more.length > 0 && (
          <section className="mt-14" aria-labelledby="art-more">
            <h2 id="art-more" className={h}>
              More {v.kind.toLowerCase()}s
            </h2>
            <ul className="art-more mt-5">
              {v.more.map((m) => (
                <li key={m.page}>
                  <Link to="/library/art/$slug" params={{ slug: m.page }} className="art-more-hit">
                    <span className="art-more-pic">
                      <img
                        src={m.src}
                        alt={`${m.piece} - ${m.name}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="art-name">{m.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
