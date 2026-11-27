import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { EntityLink } from "@/components/entity-link";
import { NamePile } from "@/components/name-pile";
import { EntityText } from "@/components/entity-text";
import type { ClubProfile } from "@/data/club-profiles";
import { SaidWall } from "@/components/said-wall";
import type { SaidBox } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";

/** Club pages (Lisa, 13 Nov 2026): dates, story, "What the guests say", the club's story, its stage and the rooms around it.
 *  Built like the In memoriam sections and sits above the usual A–Z card sections. */
export function ClubProfileSections({ c, name, slug, night, wall, sound, parts, crowd, library, faces }: { c: ClubProfile; name: string; slug: string; night: boolean; wall?: SaidBox[] | null; sound?: ReactNode; parts?: ReactNode; crowd?: ReactNode; library?: ReactNode; faces?: Record<string, { src: string; framed?: boolean }> }) {
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

      {/* The club's theme nights and parties (Lisa, 22 Nov 2026, src/data/club-parts.ts) */}
      {parts}

      <section className="grid gap-8 rounded-2xl border-2 border-[#111] bg-card p-6 shadow-[6px_7px_0_#111] md:grid-cols-2">
        <div>
          <h2 className={h}>{name}'s story</h2>
          <ol className="mt-4 space-y-3 border-l border-gold/40 pl-5">
            {c.timeline.map(([y, t], i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold text-foreground">{y}</span> · <span className="text-card-foreground/80"><EntityText text={t} self={name} /></span>
              </li>
            ))}
          </ol>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {c.timelineEvent && (
              <Link to="/timeline" hash={`ev-${c.timelineEvent}`} className="text-gold hover:text-pink">On the Timeline &rarr;</Link>
            )}
            <Link to="/map" search={{ at: slug }} className="text-gold hover:text-pink">On the map &rarr;</Link>
          </p>
        </div>
        <div>
          {c.stage.length > 0 && (
            <>
              <h2 className={h}>On {name}'s stage</h2>
              <NamePile names={c.stage} faces={faces} />
            </>
          )}
          {c.rooms.length > 0 && (
            <>
              <h2 className={`${h} mt-6`}>The rooms around it</h2>
              <NamePile names={c.rooms} faces={faces} />
            </>
          )}
          {c.also && c.also.names.length > 0 && (
            <>
              <h2 className={`${h} mt-6`}>{c.also.heading}</h2>
              <NamePile names={c.also.names} faces={faces} />
            </>
          )}
        </div>
      </section>

      {/* "Who else was there" and "The poster + read about it", under the story box (Lisa, 27 Nov 2026, W1 + L2). */}
      {crowd}
      {library}
    </>
  );
}
