import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { polaroidThumb } from "@/components/episode-block";
import { episodeById, episodePath } from "@/data/episodes";
import type { Memoriam } from "@/data/memoriam";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";
const TILT = [-2, 1.5, -1, 2, -1.5, 1];

/** In memoriam (Lisa, 4 Nov 2026, option C): dates, story, "Remembered by the guests" wall, and their story box.
 *  Sits above the usual A–Z card sections. */
export function MemoriamSections({ m, name }: { m: Memoriam; name: string }) {
  const first = m.first ?? name.split(" ")[0];
  return (
    <>
      <div className="pt-4 text-center">
        <p className="font-[family-name:var(--font-flyer)] text-4xl uppercase tracking-wide text-foreground md:text-5xl">
          {m.born} – {m.died}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-card-foreground/85">{m.story}</p>
      </div>

      {m.said.length > 0 && (
        <section>
          <h2 className={`${h} text-center`}>Remembered by the guests</h2>
          <div className={m.said.length === 1 ? "mx-auto mt-10 grid max-w-sm gap-10" : m.said.length === 2 ? "mx-auto mt-10 grid max-w-3xl gap-10 sm:grid-cols-2" : "mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"}>
            {m.said.map((s, i) => {
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
                    {/* Lisa, 5 Nov 2026: pictures must never sit on text - the first lines wrap around the guest polaroid */}
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

      <section className="grid gap-8 rounded-2xl border-2 border-[#111] bg-card p-6 shadow-[6px_7px_0_#111] md:grid-cols-2">
        <div>
          <h2 className={h}>{first}'s story</h2>
          <ol className="mt-4 space-y-3 border-l border-gold/40 pl-5">
            {m.timeline.map(([y, t], i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold text-foreground">{y}</span> · <span className="text-card-foreground/80">{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          {m.liftedUp.length > 0 && (
            <>
              <h2 className={h}>Who {first} lifted up</h2>
              <div className="mt-3 flex flex-wrap gap-2">{m.liftedUp.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>
            </>
          )}
          {m.rooms.length > 0 && (
            <>
              <h2 className={`${h} mt-6`}>{first}'s rooms</h2>
              <div className="mt-3 flex flex-wrap gap-2">{m.rooms.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>
            </>
          )}
          <h2 className={`${h} mt-6`}>Leave a note</h2>
          <p className="mt-3 text-sm text-card-foreground/80">
            <Link to="/guestbook" className="text-pink underline hover:text-gold">Sign the AFTERPARTY Guestbook</Link> for {first}
            {m.memorial && (
              <>
                , or visit the memorial guestbook at{" "}
                <a href={m.memorial.href} target="_blank" rel="noopener noreferrer" className="text-pink underline hover:text-gold">
                  {m.memorial.label}
                </a>
              </>
            )}
            .
          </p>
          <p className="mt-4 text-xs text-muted-foreground">{m.diedLine}.</p>
        </div>
      </section>
    </>
  );
}
