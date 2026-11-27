import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { CoverFace } from "@/components/cover-face";
import { episodePath } from "@/data/episodes";
import { linkToSlug, useLinks } from "@/lib/link-index";
import type { ClubLibraryView } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

/** "The poster + read about it" (Lisa, 27 Nov 2026, option L2): the club's own flyer or ticket from the Library's Cover art &
 *  posters, taped up big with what it was for and who made it, and beside it the books, diaries and papers a guest ties to
 *  the club, each with its ▶ moment. Either half shows on its own when the other is empty. */
export function ClubLibrary({ v, name }: { v: ClubLibraryView; name: string }) {
  const links = useLinks();
  const [poster, ...more] = v.posters;
  return (
    <section
      aria-labelledby="club-library"
      className={
        poster && v.reads.length > 0
          ? "grid items-start gap-10 md:grid-cols-[5fr_7fr]"
          : "mx-auto w-full max-w-2xl"
      }
    >
      <h2 id="club-library" className="sr-only">
        {name} in the Library
      </h2>
      {poster && (
        <div>
          <p className={h}>The poster</p>
          <figure className="club-poster relative mt-5 border-2 border-[#111] bg-white p-3 shadow-[5px_6px_0_#111]">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/4 h-6 w-24 -rotate-3 bg-[rgba(240,230,200,.9)] shadow"
            />
            <Link to="/library/art/$slug" params={{ slug: poster.page }} className="block">
              <img
                src={poster.src}
                alt={poster.alt ?? poster.piece}
                width={poster.w}
                height={poster.h}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </Link>
            <figcaption className="mt-3 font-sans text-[13px] text-[#111]">
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1">
                {poster.forWhat && (
                  <>
                    <dt className="text-[#6b6460]">What</dt>
                    <dd className="font-semibold">{poster.forWhat}</dd>
                  </>
                )}
                {poster.madeBy.map((m) => (
                  <div key={m.name} className="contents">
                    <dt className="text-[#6b6460]">{m.role}</dt>
                    <dd className="font-semibold">
                      <EntityLink name={m.name} className="hover:text-pink" />
                    </dd>
                  </div>
                ))}
                {poster.onIt.length > 0 && (
                  <>
                    <dt className="text-[#6b6460]">On it</dt>
                    <dd className="font-semibold">
                      {poster.onIt.map((n, i) => (
                        <span key={n}>
                          {i > 0 && ", "}
                          <EntityLink name={n} className="hover:text-pink" />
                        </span>
                      ))}
                    </dd>
                  </>
                )}
              </dl>
              <span className="mt-2 block text-[11px] text-[#6b6460]">{poster.credit}</span>
              <Link
                to="/library/art/$slug"
                params={{ slug: poster.page }}
                className="mt-2 inline-block text-sm font-bold text-pink hover:text-[#111]"
              >
                See it in the Library &rarr;
              </Link>
            </figcaption>
          </figure>
          {more.map((m) => (
            <Link
              key={m.page}
              to="/library/art/$slug"
              params={{ slug: m.page }}
              className="group mt-5 flex items-center gap-3 font-sans text-xs text-[#6b6460]"
            >
              <img
                src={m.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-14 border border-[#111]"
              />
              <span>
                <b className="text-[#111] group-hover:text-pink">Also in the Library:</b> {m.piece}
                {m.date ? `, ${m.date}` : ""}
              </span>
            </Link>
          ))}
        </div>
      )}
      {v.reads.length > 0 && (
        <div>
          <p className={h}>Read about it</p>
          <ul className="mt-5 space-y-5">
            {v.reads.map((r) => (
              <li
                key={`${r.slug}-${r.episode}`}
                className="grid grid-cols-[96px_minmax(0,1fr)] items-start gap-4 border-b border-border pb-5"
              >
                <Link
                  {...linkToSlug(links, r.slug)}
                  className="club-read-cv lib-hit block"
                  aria-label={r.name}
                >
                  <CoverFace d={r.design} />
                </Link>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-pink">
                    {r.kind}
                  </span>
                  <Link
                    {...linkToSlug(links, r.slug)}
                    className="font-semibold text-gold hover:text-pink"
                  >
                    {r.name}
                  </Link>
                  <span className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-xs">
                    <Link
                      to={episodePath(r.episode as never)}
                      className="font-semibold text-gold hover:text-pink"
                    >
                      {r.code} · {r.guest}
                    </Link>
                    <Timestamp episodeId={r.episode} time={r.time} />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    <EntityText text={r.context} self={name} />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
