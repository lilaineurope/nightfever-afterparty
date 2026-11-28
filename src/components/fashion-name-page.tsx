import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { SiteFooter } from "@/components/site-footer";
import { Timestamp } from "@/components/episode-player";
import { Mannequin } from "@/components/mannequin";
import { AroundTheBlock } from "@/components/map-sections";
import { episodePath } from "@/data/episodes";
import type { FashionPageView } from "@/lib/fashion-page.server";
import type { LookNamed } from "@/lib/look-page.server";

// A designer's, label's or shop's own page on the Library's Fashion & outfits shelves (Lisa, 27 Nov 2026: "shops and
// boutiques need pictures and we need to setup pages for it" ... "designers needs pages and polaroids"). Same build as a
// look's page: the picture big on the side (the polaroid, the shop's photo, or the typed cover / carrier bag), then what
// it is, where and when, the looks on the shelf that go with it on the mannequin, the moments it comes up, and the map.
// Data: src/lib/fashion-page.server.ts.

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

const afterparties = (n: number) => `${n} ${n === 1 ? "Afterparty" : "Afterparties"}`;

/** The big picture: the shop's photo, the polaroid, or the shelf cover drawn big. */
function Picture({ v }: { v: FashionPageView }) {
  if (v.photo)
    return (
      <figure className="look-photo">
        <div className="art-frame">
          <img src={v.photo.src} alt={v.photo.alt} decoding="async" />
        </div>
        <figcaption>
          {v.photo.note}{" "}
          {v.photo.source ? (
            <a href={v.photo.source} className="art-name" rel="noreferrer">
              {v.photo.credit}
            </a>
          ) : (
            <>
              {v.photo.credit} Got a photo of it, or know who took one? Tell me in the box at the bottom of the page.
            </>
          )}
        </figcaption>
      </figure>
    );
  if (v.polaroid)
    return (
      <figure className="look-photo">
        <div className="art-frame fsh-page-polaroid">
          <img src={v.polaroid} alt={`${v.maker?.name ?? v.name} - polaroid`} decoding="async" />
        </div>
        <figcaption>
          {v.maker ? `${v.maker.name}, who made ${v.name}. ` : ""}
          {v.polaroidCredit}
        </figcaption>
      </figure>
    );
  return (
    <figure className="look-photo">
      <span className={`lib-cv lib-type fsh-page-cover ${v.kind === "shop" ? "fsh-bag" : "lib-ink fsh-label-cover"}`}>
        {v.kind === "shop" && <span className="fsh-handle" aria-hidden="true" />}
        <span className="lib-kind">{v.tag}</span>
        <span className="lib-mast">{v.name}</span>
        <span className="lib-foot">
          <b>{v.mentions}×</b>dropped in {afterparties(v.afterparties)}
        </span>
      </span>
      <figcaption>
        {v.kind === "shop"
          ? "No free photo of the shop yet. Got one, or know who took it? Tell me in the box at the bottom of the page."
          : "No polaroid yet - it is on its way."}
      </figcaption>
    </figure>
  );
}

export function FashionNamePage({ v }: { v: FashionPageView }) {
  const shelf = v.kind === "shop" ? "Shops & boutiques" : "Designers & labels";
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
          · <span>{shelf}</span>
        </nav>

        <div className="art-page">
          <div className="look-big">
            <Picture v={v} />
          </div>

          <div className="art-text">
            <p className="art-tag">
              {v.tag} · {v.mentions}× in {afterparties(v.afterparties)}
            </p>
            <h1 className={`art-title${v.name.length > 28 ? " art-title-long" : ""}`}>{v.name}</h1>
            {v.note && <p className="art-for">{v.note.charAt(0).toUpperCase() + v.note.slice(1)}</p>}

            {(v.about || v.where || v.when || v.maker || v.card) && (
              <section className="art-box mt-8" aria-labelledby="fsh-what">
                <h2 id="fsh-what" className={h}>
                  {v.kind === "shop" ? "The shop" : v.tag === "Label" ? "The label" : "The designer"}
                </h2>
                {v.about && <p className="mt-3 text-[15px] leading-relaxed">{v.about}</p>}
                <dl className="art-credits mt-4">
                  {v.where && (
                    <div>
                      <dt>Where</dt>
                      <dd>{v.where}</dd>
                    </div>
                  )}
                  {v.when && (
                    <div>
                      <dt>When</dt>
                      <dd>{v.when}</dd>
                    </div>
                  )}
                  {v.maker && (
                    <div>
                      <dt>Whose label</dt>
                      <dd>
                        {v.maker.polaroid && <img src={v.maker.polaroid} alt="" className="art-face" width={240} height={240} loading="lazy" />}
                        <Name n={v.maker} />
                      </dd>
                    </div>
                  )}
                  {v.card && (
                    <div>
                      <dt>{v.kind === "shop" ? "Its card" : "Their page"}</dt>
                      <dd>
                        <Name n={v.card} />
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {v.tags.length > 0 && (
              <section className="art-box mt-6" aria-labelledby="fsh-names">
                <h2 id="fsh-names" className={h}>
                  Who&rsquo;s in the story
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed">
                  {v.tags.map((t, i) => (
                    <span key={t.name}>
                      {i > 0 && ", "}
                      <Name n={t} />
                    </span>
                  ))}
                </p>
              </section>
            )}
          </div>
        </div>

        {v.looks.length > 0 && (
          <section className="mt-14" aria-labelledby="fsh-looks">
            <h2 id="fsh-looks" className={h}>
              {v.kind === "shop" ? "Looks that came from here" : "Their looks in the episodes"}
            </h2>
            <ul className="art-more mt-5">
              {v.looks.map((m) => (
                <li key={m.slug}>
                  <Link to="/library/look/$slug" params={{ slug: m.slug }} className="art-more-hit">
                    <span className="look-more-pic">
                      <Stripes palette={m.palette} />
                      <Mannequin outfit={m.outfit} className="look-mq" label={m.name} />
                    </span>
                    <span className="art-name">{m.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {v.moments.length > 0 && (
          <section className="mt-14" aria-labelledby="fsh-came-up">
            <h2 id="fsh-came-up" className={h}>
              How it came up on the show
            </h2>
            <ul className="art-moments mt-4">
              {v.moments.map((m) => (
                <li key={m.episodeId + m.time}>
                  {m.polaroid && <img src={m.polaroid} alt="" width={240} height={240} loading="lazy" decoding="async" className="art-face" />}
                  <div>
                    <Link to={episodePath(m.episodeId as never)} className="art-name font-semibold">
                      {m.short} · {m.guest}
                    </Link>{" "}
                    {/^\d/.test(m.time) ? (
                      <Timestamp episodeId={m.episodeId} time={m.time} />
                    ) : (
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">{m.time}</span>
                    )}
                    <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{m.context}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {v.band && (
          <div className="mt-14">
            <AroundTheBlock b={v.band} slug={v.slug} />
          </div>
        )}

        {v.more.length > 0 && (
          <section className="mt-14" aria-labelledby="fsh-more">
            <h2 id="fsh-more" className={h}>
              More {v.kind === "shop" ? "shops & boutiques" : "designers & labels"}
            </h2>
            <ul className="art-more mt-5">
              {v.more.map((m) => (
                <li key={m.slug}>
                  <Link
                    to={v.kind === "shop" ? "/library/shop/$slug" : "/library/designer/$slug"}
                    params={{ slug: m.slug }}
                    className="art-more-hit"
                  >
                    <span className={`art-more-pic${!m.photo && !m.polaroid ? (v.kind === "shop" ? " fsh-more-bag" : " fsh-more-type") : ""}`}>
                      {m.photo || m.polaroid ? (
                        <img src={m.photo ?? m.polaroid} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span>{m.name}</span>
                      )}
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
