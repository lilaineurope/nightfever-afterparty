import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { EntityLink } from "@/components/entity-link";
import { NamePile } from "@/components/name-pile";
import { EntityText } from "@/components/entity-text";
import type { ClubProfile } from "@/data/club-profiles";
import { SaidWall } from "@/components/said-wall";
import { ClubCrowd } from "@/components/club-crowd";
import type { ClubCrowdView, SaidBox } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";

/** Club pages (Lisa, 13 Nov 2026): dates, story, "What the guests say", the club's story, its stage and the rooms around it.
 *  Built like the In memoriam sections and sits above the usual A–Z card sections. */
export function ClubProfileSections({ c, name, slug, night, wall, sound, parts, partsSide, crowd, library, faces }: { c: ClubProfile; name: string; slug: string; night: boolean; wall?: SaidBox[] | null; sound?: ReactNode; parts?: ReactNode; partsSide?: boolean; crowd?: ClubCrowdView | null; library?: ReactNode; faces?: Record<string, { src: string; framed?: boolean; mast?: "light" | "dark" }> }) {
  const story = (
    <>
      <h3 className={`${h} mt-7`}>{name}'s story</h3>
      <ol className="mt-4 space-y-3 border-l-2 border-pink/50 pl-5">
        {c.timeline.map(([y, t], i) => (
          <li key={i} className="text-sm">
            <span className="font-semibold">{y}</span> · <span className="text-[#333]"><EntityText text={t} self={name} /></span>
          </li>
        ))}
      </ol>
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm font-semibold">
        {c.timelineEvent && (
          <Link to="/timeline" hash={`ev-${c.timelineEvent}`} className="text-[#111] hover:text-pink">On the Timeline &rarr;</Link>
        )}
        <Link to="/map" search={{ at: slug }} className="text-[#111] hover:text-pink">On the map &rarr;</Link>
      </p>
    </>
  );
  const rooms =
    c.rooms.length > 0 || (c.also && c.also.names.length > 0) ? (
      <section className="rounded-2xl border-2 border-[#111] bg-card p-6 shadow-[6px_7px_0_#111]">
        {c.rooms.length > 0 && (
          <>
            <h2 className={h}>The rooms around it</h2>
            <NamePile names={c.rooms} faces={faces} />
          </>
        )}
        {c.also && c.also.names.length > 0 && (
          <>
            <h2 className={`${h} ${c.rooms.length > 0 ? "mt-6" : ""}`}>{c.also.heading}</h2>
            <NamePile names={c.also.names} faces={faces} />
          </>
        )}
      </section>
    ) : null;
  const beside = !!(partsSide && parts && rooms);
  return (
    <>
      <div className="pt-4 text-center">
        <p className="font-[family-name:var(--font-flyer)] text-4xl uppercase tracking-wide text-foreground md:text-5xl">
          {c.opened} – {c.closed}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{c.address}</p>
        <p className="mx-auto mt-3 max-w-2xl text-card-foreground/85"><EntityText text={c.story} self={name} /></p>
      </div>

      {/* Every quote and every other episode that talks about the club (Lisa, 28 Nov 2026: "show all quotes"). */}
      {wall && <SaidWall items={wall} name={name} id="club-said" />}

      {/* One club page standard (Lisa, 27 Nov 2026): the sound of the club right under the quotes - "sounded like this",
          On film, and a documentary about the club (CBGB's Listen box) - then its theme nights and parties. */}
      {sound}

      {c.listen?.approved && (
        <section className="mx-auto max-w-3xl border-2 border-[#111] bg-pink p-6 text-pink-foreground shadow-[6px_7px_0_#111]">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">Listen</h2>
          <p className="mt-3 font-[family-name:var(--font-flyer)] text-2xl uppercase leading-tight md:text-3xl">{c.listen.title}</p>
          <p className="mt-1 text-sm">an audio documentary by {c.listen.by}</p>
          <p className="mt-3 text-sm opacity-90">{c.listen.note}</p>
          <p className="mt-4">
            <a href={c.listen.href} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-[#111] bg-[#f6f0ea] px-4 py-2 text-sm font-semibold text-[#111] hover:bg-[#111] hover:text-[#f6f0ea]">
              Listen on YouTube &rarr;
            </a>
            {/* The documentary also plays in the club's Jukebox ("On film") and opens its YouTube playlist (Lisa, 13 Nov 2026) */}
            {night && (
              <Link to="/jukebox" search={{ club: slug }} className="ml-3 mt-2 inline-block border-2 border-[#111] bg-[#111] px-4 py-2 text-sm font-semibold text-[#f6f0ea] hover:bg-[#f6f0ea] hover:text-[#111]">
                Play it in the AFTERPARTY JUKEBOX &rarr;
              </Link>
            )}
          </p>
        </section>
      )}

      {/* The club's theme nights and parties (Lisa, 22 Nov 2026, src/data/club-parts.ts). With only a night or two, the rooms
          around it sit beside them (Lisa, 28 Nov 2026, Régine's: "move the rooms around it next to regine's nights and parties"). */}
      {beside ? (
        <div className="club-beside mx-auto grid w-full max-w-5xl items-start gap-8 md:grid-cols-2">
          {parts}
          {rooms}
        </div>
      ) : (
        parts
      )}

      {/* One clipboard (Lisa, 28 Nov 2026): the club's story beside On the list. */}
      {crowd ? (
        <ClubCrowd c={crowd} name={name} address={c.address} faces={faces ?? {}} story={story} />
      ) : (
        <section className="club-list mx-auto w-full max-w-3xl">{story}</section>
      )}

      {/* On the stage and the rooms around it, each in a box of its own, side by side (Lisa, 28 Nov 2026). */}
      {(c.stage.length > 0 || (rooms && !beside)) && (
        <div className={`mx-auto grid w-full max-w-5xl items-start gap-8 ${beside ? "" : "md:grid-cols-2"}`}>
          {c.stage.length > 0 && (
            <section className="rounded-2xl border-2 border-[#111] bg-card p-6 shadow-[6px_7px_0_#111]">
              <h2 className={h}>On {name}'s stage</h2>
              <NamePile names={c.stage} faces={faces} />
            </section>
          )}
          {!beside && rooms}
        </div>
      )}

      {/* "Who else was there" and "The poster + read about it", under the story box (Lisa, 27 Nov 2026, W1 + L2). */}
      {library}
    </>
  );
}
