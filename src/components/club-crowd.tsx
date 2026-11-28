import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { NamePile } from "@/components/name-pile";
import { episodePath } from "@/data/episodes";
import type { ClubCrowdView } from "@/lib/card-view";

const h4 =
  "mt-7 border-b border-[#111]/15 pb-1 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-pink";
const FIRST = 5;

/** "Who else was there" (Lisa, 27 Nov 2026, option W1 "the door list"): a clipboard guest list under the club's story box -
 *  the guests who told us about it (polaroid, episode, ▶ time code, what was said), its regulars and who is on its posters,
 *  every name ticked off and linked. Replaces the old A–Z chip lists at the foot of club pages. */
export function ClubCrowd({
  c,
  name,
  address,
  faces,
  story,
}: {
  c: ClubCrowdView;
  name: string;
  address: string;
  faces: Record<string, { src: string; framed?: boolean }>;
  /** The club's story and stage, on the left of the same clipboard (Lisa, 28 Nov 2026: "merge the story box with On the list"). */
  story?: ReactNode;
}) {
  const empty = c.told.length === 0 && c.regulars.length === 0 && c.posters.length === 0;
  if (empty && !story) return null;
  const row = (t: ClubCrowdView["told"][number]) => (
    <li
      key={t.episode}
      className="grid grid-cols-[18px_44px_minmax(0,1fr)] items-start gap-3 py-1.5"
    >
      <span aria-hidden="true" className="pt-1 font-sans text-lg font-bold leading-none text-pink">
        ✓
      </span>
      {t.pol ? (
        <img
          src={t.pol}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          decoding="async"
          className="w-11 border border-[#111]"
        />
      ) : (
        <span />
      )}
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-2 font-sans">
          <Link
            to={episodePath(t.episode as never)}
            className="text-sm font-bold text-[#111] hover:text-pink"
          >
            {t.guest}
          </Link>
          <span className="text-xs font-semibold text-[#111]/70">{t.code}</span>
          <Timestamp episodeId={t.episode} time={t.time} className="text-xs" />
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-[#333]">
          <EntityText text={t.context} self={name} />
        </span>
      </span>
    </li>
  );
  const body = (
    <>
      {c.told.length > 0 && (
        <>
          <h3 className={h4}>
            Told us about it · {c.told.length} {c.told.length === 1 ? "guest" : "guests"}
          </h3>
          <ul className="mt-2">{c.told.slice(0, FIRST).map(row)}</ul>
          {c.told.length > FIRST && (
            <details className="group">
              <summary className="cursor-pointer list-none font-sans text-xs font-semibold text-pink hover:text-[#111]">
                <span className="group-open:hidden">
                  + {c.told.length - FIRST} more:{" "}
                  {c.told
                    .slice(FIRST, FIRST + 3)
                    .map((t) => t.guest)
                    .join(", ")}
                  {c.told.length > FIRST + 3 ? "..." : ""}
                </span>
                <span className="hidden group-open:inline">Show fewer</span>
              </summary>
              <ul className="mt-1">{c.told.slice(FIRST).map(row)}</ul>
            </details>
          )}
        </>
      )}

      {c.regulars.length > 0 && (
        <>
          <h3 className={h4}>Regulars · {c.regulars.length}</h3>
          <p className="mt-1 font-sans text-[11px] text-[#6b6460]">
            Their own pages list {name} as one of their rooms.
          </p>
          <NamePile names={c.regulars} faces={faces} />
        </>
      )}

      {c.posters.length > 0 && (
        <>
          <h3 className={h4}>On the posters</h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm">
            {c.posters.map((p) => (
              <li key={p.name}>
                <EntityLink name={p.name} className="font-semibold text-[#111] hover:text-pink" />{" "}
                <span className="text-xs text-[#6b6460]">· {p.role.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
  return (
    <section
      aria-labelledby="who-else"
      className={`club-list mx-auto w-full ${story ? "max-w-5xl" : "max-w-3xl"}`}
    >
      <h2
        id="who-else"
        className="text-center font-[family-name:var(--font-flyer)] text-3xl uppercase tracking-wide text-[#111]"
      >
        On the list
      </h2>
      <p className="mt-1 text-center text-xs text-[#6b6460]">
        {name} · {address} · who else was there
      </p>

      {story ? (
        <div className="grid gap-x-12 md:grid-cols-2">
          <div>{story}</div>
          <div>{body}</div>
        </div>
      ) : (
        body
      )}
    </section>
  );
}
