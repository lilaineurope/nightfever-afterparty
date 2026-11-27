import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { ProfileVideos } from "@/components/profile-videos";
import { QuoteName } from "@/components/quote-name";
import { EntityText } from "@/components/entity-text";
import { ClubLibrary } from "@/components/club-library";
import { polaroidThumb } from "@/lib/polaroids";
import { episodeById, episodePath } from "@/data/episodes";
import { linkToSlug, useLinks } from "@/lib/link-index";
import type { NightPageView } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const TILT = [-1.2, 0.8, -0.5, 1.1];

/** A club night, theme night or party on its own page (Lisa, 27 Nov 2026: "club night and theme nights need their own
 *  pages, eg closing weekend at paradise", then all 78). Under the club's header (the night box went, Lisa 28 Nov): what
 *  the guests said, what was played and filmed there, then the episode lines (CardSections) and the club's other nights. */
export function NightPageSections({ v, name }: { v: NightPageView; name: string }) {
  return (
    <>
      {v.said.length > 0 && (
        <section aria-labelledby="night-said">
          <h2 id="night-said" className={`${h} text-center`}>
            What the guests say
          </h2>
          <div
            className={`mt-10 grid gap-x-8 gap-y-12 ${v.said.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-2xl"}`}
          >
            {v.said.map((q, i) => {
              const ep = episodeById(q.episode);
              const pol = polaroidThumb(q.episode, 240);
              return (
                <figure
                  key={`${q.episode}-${q.time}-${i}`}
                  className="relative border-2 border-[#111] bg-[#f6f0ea] p-5 pt-8 text-[#111] shadow-[5px_6px_0_#111]"
                  style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 left-1/2 h-7 w-24 -translate-x-1/2 rotate-3 bg-[rgba(240,230,200,.9)] shadow"
                  />
                  {pol && (
                    <img
                      src={pol}
                      alt=""
                      loading="lazy"
                      className="absolute -right-4 -top-6 w-16 rotate-6 border-2 border-[#111] shadow-[3px_3px_0_#111]"
                    />
                  )}
                  <blockquote className="font-[family-name:var(--font-type)] text-[15px] leading-relaxed">
                    {/* Pictures never sit on text (Lisa, 5 Nov 2026): the first lines wrap around the guest polaroid */}
                    {pol && (
                      <span aria-hidden="true" className="float-right -mr-2 ml-2 h-11 w-14" />
                    )}
                    {q.quote ? (
                      <>&ldquo;{q.quote}&rdquo;</>
                    ) : (
                      <>
                        <span className="mb-2 block font-[family-name:var(--font-mono-body)] text-[11px] uppercase leading-snug tracking-wide text-[#6b6460]">
                          On the show
                          {q.mentions && q.mentions > 1 ? ` · ${q.mentions} mentions` : ""}
                        </span>
                        <EntityText text={q.context ?? ""} self={name} />
                      </>
                    )}
                  </blockquote>
                  <figcaption className="mt-4 flex items-end justify-between gap-2 text-xs">
                    <span className="font-semibold">
                      <QuoteName who={q.who} episodeId={q.episode} />
                      <br />
                      <Link
                        to={episodePath(ep.id)}
                        className="font-normal text-[#555] hover:text-pink"
                      >
                        {q.who === ep.guest ? q.code : `${q.code} · ${ep.guest}`}
                      </Link>
                    </span>
                    {q.time && q.time !== "On camera" && (
                      <Timestamp episodeId={q.episode} time={q.time} />
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {v.songs.length > 0 && (
        <section aria-labelledby="night-played" className="jbx" style={{ maxWidth: "none" }}>
          <h2 id="night-played" className={`${h} text-center`}>
            Played that night · {v.songs.length} song{v.songs.length === 1 ? "" : "s"}
          </h2>
          <ol className="mx-auto mt-6 grid max-w-3xl gap-2">
            {v.songs.map((s) => (
              <li key={s.title} className="jbx-strip">
                <Link
                  to="/jukebox"
                  search={{ club: v.club }}
                  className="jbx-big"
                  aria-label={`Play ${s.title} in the Jukebox`}
                  title="Play it in the Jukebox"
                >
                  <span aria-hidden="true">▶</span>
                </Link>
                <div className="jbx-tt min-w-0">
                  <span className="jbx-name jbx-clubtitle">{s.title}</span>
                  <span className="block text-xs text-[#555]">
                    {s.artist} ({s.year}) · {s.why}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-center text-sm">
            <Link
              to="/jukebox"
              search={{ club: v.club }}
              className="font-semibold text-gold hover:text-pink"
            >
              The whole {v.clubName} night in the Jukebox &rarr;
            </Link>
          </p>
        </section>
      )}

      {v.films.length > 0 && <ProfileVideos videos={v.films} playlist={v.playlist} first={name} />}
    </>
  );
}

/** The foot of a night's page: the club in the Library (Lisa, 27 Nov 2026: "can we add library in the bottom"), then the
 *  club's other nights. */
export function NightPageOthers({ v }: { v: NightPageView }) {
  const links = useLinks();
  return (
    <>
      {v.lib && (
        <div>
          <p className={`${h} mb-6 text-center`}>{v.clubName} in the Library</p>
          <ClubLibrary v={v.lib} name={v.clubName} />
        </div>
      )}
      {v.others.length > 0 && (
        <section className="border-2 border-[#111] bg-[#fbf8f1] p-6 text-[#111] shadow-[5px_6px_0_#111]">
          <h2 className={h}>More nights at {v.clubName}</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {v.others.map((o) => (
              <li key={o.slug} className="border-l-4 border-pink pl-3">
                <Link
                  {...linkToSlug(links, o.slug)}
                  className="font-[family-name:var(--font-flyer)] text-lg uppercase leading-tight hover:text-pink"
                >
                  {o.title}
                </Link>
                <span className="ml-2 text-xs text-[#6b6460]">{o.kind}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm">
            <Link
              to="/explore/$slug"
              params={{ slug: v.club }}
              className="font-semibold text-gold hover:text-pink"
            >
              Back to {v.clubName} &rarr;
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
