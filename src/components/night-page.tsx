import { Link } from "@tanstack/react-router";
import { ProfileVideos } from "@/components/profile-videos";
import { SaidWall } from "@/components/said-wall";
import { ClubLibrary } from "@/components/club-library";
import { linkToSlug, useLinks } from "@/lib/link-index";
import type { NightPageView } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

/** A club night, theme night or party on its own page (Lisa, 27 Nov 2026: "club night and theme nights need their own
 *  pages, eg closing weekend at paradise", then all 78). Under the club's header (the night box went, Lisa 28 Nov): what
 *  the guests said, what was played and filmed there, then the episode lines (CardSections) and the club's other nights. */
export function NightPageSections({ v, name }: { v: NightPageView; name: string }) {
  return (
    <>
      <SaidWall items={v.said} name={name} id="night-said" />

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
