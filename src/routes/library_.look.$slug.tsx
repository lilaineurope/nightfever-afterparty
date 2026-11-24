import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { Mannequin } from "@/components/mannequin";
import { episodePath } from "@/data/episodes";
import { getLookPage } from "@/lib/look-page.functions";
import type { LookNamed, LookPageView } from "@/lib/look-page.server";
import { pageHead } from "@/lib/seo";

// One page per look and outfit on the Library's Fashion & outfits shelf (Lisa, 24 Nov 2026): the look dressed on the
// Wardrobe's mannequin, big on the side, in its own colours - with the real photo next to it when a free one exists -
// then what was worn, whose look it is, the pieces rail by rail, the designers, and the moment it comes up.
// Data: src/lib/look-page.server.ts.

export const Route = createFileRoute("/library_/look/$slug")({
  staticData: { sitemap: false },
  loader: async ({ params }) => {
    const v = await getLookPage({ data: params.slug });
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const v = loaderData;
    return pageHead({
      path: `/library/look/${v.slug}`,
      title: `${v.name} – ${v.tag === "On camera" ? "on-camera look" : "look"} | Night Fever AFTERPARTY Library`,
      description: `${v.worn}${v.who ? ` - ${v.who.name}` : ""}, ${v.code}. Dressed on the mannequin in its own colours, with the moment it comes up on Night Fever.`,
      image: "/og/library.jpg",
    });
  },
  component: LookPage,
});

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

function Name({ n }: { n: LookNamed }) {
  return n.href ? (
    <a href={n.href} className="art-name">
      {n.name}
    </a>
  ) : (
    <span className="art-name-plain">{n.name}</span>
  );
}

function Stripes({ palette }: { palette: string[] }) {
  return (
    <span className="look-stripes" aria-hidden="true">
      {(palette.length ? palette : ["#e8dfc3"]).map((hex, i) => (
        <span key={i} style={{ "--c": hex } as CSSProperties} />
      ))}
    </span>
  );
}

function LookPage() {
  const v = Route.useLoaderData() as LookPageView;
  const title = v.tag === "On camera" && v.who ? `${v.who.name} on camera` : v.name;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        <nav className="art-crumbs" aria-label="Where you are">
          <Link to="/library" className="art-name">
            Library
          </Link>{" "}
          ·{" "}
          <Link to="/library" search={{ cat: "fashion" }} className="art-name">
            Fashion &amp; outfits
          </Link>{" "}
          · <span>{v.tag === "On camera" ? "On camera" : "Looks & outfits"}</span>
        </nav>

        <div className="art-page">
          <div className={`look-big${v.photo ? " look-big-2" : ""}`}>
            {v.photo && (
              <figure className="look-photo">
                <div className="art-frame">
                  <img src={v.photo.src} alt={v.photo.alt} decoding="async" />
                </div>
                <figcaption>
                  {v.photo.note}{" "}
                  <a href={v.photo.source} className="art-name" rel="noreferrer">
                    {v.photo.credit}
                  </a>
                </figcaption>
              </figure>
            )}
            <figure className="look-form">
              <div className="look-frame">
                <Stripes palette={v.palette} />
                <Mannequin outfit={v.outfit} className="look-mq" label={`${v.name}, dressed on the mannequin`} />
              </div>
              <figcaption>Dressed from the words and the colours in the episode - the Wardrobe&rsquo;s mannequin.</figcaption>
            </figure>
          </div>

          <div className="art-text">
            <p className="art-tag">
              {v.tag} · {v.code}
            </p>
            <h1 className={`art-title${title.length > 28 ? " art-title-long" : ""}`}>{title}</h1>
            <p className="art-for">{v.worn.charAt(0).toUpperCase() + v.worn.slice(1)}</p>
            {v.palette.length > 0 && (
              <p className="look-chips" aria-label="Its colours">
                {v.palette.map((hex) => (
                  <span key={hex} style={{ background: hex }} title={hex} />
                ))}
              </p>
            )}

            {v.who && (
              <section className="art-box mt-8" aria-labelledby="look-who">
                <h2 id="look-who" className={h}>
                  Whose look
                </h2>
                <p className="look-who mt-3">
                  {v.who.polaroid && <img src={v.who.polaroid} alt="" className="art-face" width={240} height={240} loading="lazy" />}
                  <Name n={v.who} />
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    · {v.tag === "On camera" ? "on camera in" : "told in"}{" "}
                    <Link to={episodePath(v.episodeId as never)} className="art-name">
                      {v.code} · {v.episodeGuest}
                    </Link>
                  </span>
                </p>
              </section>
            )}

            {v.pieces.length > 0 && (
              <section className="art-box mt-6" aria-labelledby="look-pieces">
                <h2 id="look-pieces" className={h}>
                  On the mannequin
                </h2>
                <dl className="art-credits mt-4">
                  {v.pieces.map((p) => (
                    <div key={p.rail}>
                      <dt>{p.rail}</dt>
                      <dd>
                        <span className="look-dot" style={{ background: p.hex }} aria-hidden="true" />
                        {p.label.charAt(0).toUpperCase() + p.label.slice(1)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {(v.designers.length > 0 || v.tags.length > 0) && (
              <section className="art-box mt-6" aria-labelledby="look-names">
                <h2 id="look-names" className={h}>
                  {v.designers.length ? "Who made it, and who's in the story" : "Who's in the story"}
                </h2>
                <dl className="art-credits mt-4">
                  {v.designers.length > 0 && (
                    <div>
                      <dt>Designer</dt>
                      <dd>
                        {v.designers.map((d, i) => (
                          <span key={d.name}>
                            {i > 0 && " & "}
                            <Name n={d} />
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                  {v.tags.length > 0 && (
                    <div>
                      <dt>Also named</dt>
                      <dd>
                        {v.tags.map((t, i) => (
                          <span key={t.name}>
                            {i > 0 && ", "}
                            <Name n={t} />
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}
          </div>
        </div>

        {v.moments.length > 0 && (
          <section className="mt-14" aria-labelledby="look-came-up">
            <h2 id="look-came-up" className={h}>
              {v.tag === "On camera" ? "Where it was worn" : "How it came up on the show"}
            </h2>
            <ul className="art-moments mt-4">
              {v.moments.map((m) => (
                <li key={m.episodeId + m.time}>
                  {m.polaroid && <img src={m.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" className="art-face" />}
                  <div>
                    <Link to={episodePath(m.episodeId as never)} className="art-name font-semibold">
                      {m.short} · {m.guest}
                    </Link>{" "}
                    {/^\d/.test(m.time) ? <Timestamp episodeId={m.episodeId} time={m.time} /> : <span className="text-xs uppercase tracking-widest text-muted-foreground">{m.time}</span>}
                    <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{m.context}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!v.photo && (
          <p className="mt-10 text-sm text-muted-foreground">
            No free photo of the real thing yet. Got one, or know who took it? Tell me in the box at the bottom of the page.
          </p>
        )}

        {v.more.length > 0 && (
          <section className="mt-14" aria-labelledby="look-more">
            <h2 id="look-more" className={h}>
              More looks from {v.code}
            </h2>
            <ul className="art-more mt-5">
              {v.more.map((m) => (
                <li key={m.slug}>
                  <Link to="/library/look/$slug" params={{ slug: m.slug }} className="art-more-hit">
                    <span className="look-more-pic">
                      <Stripes palette={m.palette} />
                      <Mannequin outfit={m.outfit} className="look-mq" label={m.name} />
                    </span>
                    <span className="art-name">{m.who && /on-camera look/.test(m.name) ? m.who : m.name}</span>
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
