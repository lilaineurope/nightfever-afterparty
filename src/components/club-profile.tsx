import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { polaroidThumb } from "@/components/episode-block";
import { episodeById, episodePath } from "@/data/episodes";
import type { ClubProfile } from "@/data/club-profiles";
import { clubNightFor } from "@/data/club-nights";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";
const TILT = [-2, 1.5, -1, 2, -1.5, 1];

/** Club pages (Lisa, 13 Nov 2026): dates, story, "What the guests say", the club's story, its stage and the rooms around it.
 *  Built like the In memoriam sections and sits above the usual A–Z card sections. */
export function ClubProfileSections({ c, name, slug }: { c: ClubProfile; name: string; slug: string }) {
  const night = clubNightFor(slug);
  return (
    <>
      <div className="pt-4 text-center">
        <p className="font-[family-name:var(--font-flyer)] text-4xl uppercase tracking-wide text-foreground md:text-5xl">
          {c.opened} – {c.closed}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{c.address}</p>
        <p className="mx-auto mt-3 max-w-2xl text-card-foreground/85">{c.story}</p>
      </div>

      {c.said.length > 0 && (
        <section>
          <h2 className={`${h} text-center`}>What the guests say</h2>
          <div className={c.said.length === 1 ? "mx-auto mt-10 grid max-w-sm gap-10" : c.said.length === 2 ? "mx-auto mt-10 grid max-w-3xl gap-10 sm:grid-cols-2" : "mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"}>
            {c.said.map((s, i) => {
              const ep = episodeById(s.episode);
              const code = `S${ep.season}E${ep.episode}`;
              const pol = polaroidThumb(s.episode, 240);
              return (
                <figure
                  key={`${s.episode}-${s.time}`}
                  className="relative border-2 border-[#111] bg-[#f6f0ea] p-5 pt-8 text-[#111] shadow-[5px_6px_0_#111]"
                  style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
                >
                  <span aria-hidden="true" className="absolute -top-4 left-1/2 h-7 w-24 -translate-x-1/2 rotate-3 bg-[rgba(240,230,200,.9)] shadow" />
                  {pol && (
                    <img src={pol} alt="" loading="lazy" className="absolute -right-4 -top-6 w-16 rotate-6 border-2 border-[#111] shadow-[3px_3px_0_#111]" />
                  )}
                  <blockquote className="font-[family-name:var(--font-type)] text-[15px] leading-relaxed">
                    {/* Pictures never sit on text (Lisa, 5 Nov 2026): the first lines wrap around the guest polaroid */}
                    {pol && <span aria-hidden="true" className="float-right -mr-2 ml-2 h-11 w-14" />}
                    &ldquo;{s.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-end justify-between gap-2 text-xs">
                    <span className="font-semibold">
                      {s.who}
                      <br />
                      <Link to={episodePath(ep.id)} className="font-normal text-[#555] hover:text-pink">
                        {s.who === ep.guest ? code : `${code} · ${ep.guest}`}
                      </Link>
                    </span>
                    <Timestamp episodeId={s.episode} time={s.time} />
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

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

      <section className="grid gap-8 rounded-2xl border-2 border-[#111] bg-card p-6 shadow-[6px_7px_0_#111] md:grid-cols-2">
        <div>
          <h2 className={h}>{name}'s story</h2>
          <ol className="mt-4 space-y-3 border-l border-gold/40 pl-5">
            {c.timeline.map(([y, t], i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold text-foreground">{y}</span> · <span className="text-card-foreground/80">{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {c.timelineEvent && (
              <Link to="/timeline" hash={`ev-${c.timelineEvent}`} className="text-gold hover:text-pink">On the Timeline &rarr;</Link>
            )}
            <Link to="/map" className="text-gold hover:text-pink">On the map &rarr;</Link>
          </p>
        </div>
        <div>
          {c.stage.length > 0 && (
            <>
              <h2 className={h}>On {name}'s stage</h2>
              <div className="mt-3 flex flex-wrap gap-2">{c.stage.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>
            </>
          )}
          {c.rooms.length > 0 && (
            <>
              <h2 className={`${h} mt-6`}>The rooms around it</h2>
              <div className="mt-3 flex flex-wrap gap-2">{c.rooms.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
