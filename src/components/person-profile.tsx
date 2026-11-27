import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { VideoScreen } from "@/components/video-screen";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { polaroidThumb } from "@/lib/polaroids";
import { episodeById, episodePath } from "@/data/episodes";
import type { PersonProfile } from "@/data/person-profiles";
import { QuoteName } from "@/components/quote-name";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";
const TILT = [-2, 1.5, -1, 2, -1.5, 1];

/** The quote wall's columns, worked out here instead of CSS columns: Safari cut the boxes off at the top
 *  when they sat in CSS columns (Lisa, 21 Nov 2026). Quotes stay in reading order, top to bottom, column by
 *  column, split where the columns come out most even (a box counts as its text plus about 220 letters).
 *  Below lg the column wrappers are display: contents, so phones and tablets get one column in order. */
function columnsOf<T extends { quote: string }>(said: T[], n: number): { s: T; i: number }[][] {
  const items = said.map((s, i) => ({ s, i }));
  if (n <= 1 || said.length <= n) return n <= 1 ? [items] : items.map((x) => [x]);
  const w = said.map((s) => s.quote.length + 220);
  let best: number[] = [];
  let bestMax = Infinity;
  const walk = (start: number, left: number, cuts: number[]) => {
    if (left === 1) {
      const all = [...cuts, said.length];
      let prev = 0, max = 0;
      for (const end of all) { max = Math.max(max, w.slice(prev, end).reduce((a, b) => a + b, 0)); prev = end; }
      if (max < bestMax) { bestMax = max; best = all; }
      return;
    }
    for (let end = start + 1; end <= said.length - (left - 1); end++) walk(end, left - 1, [...cuts, end]);
  };
  walk(0, n, []);
  let prev = 0;
  return best.map((end) => { const col = items.slice(prev, end); prev = end; return col; });
}


/** The video box (Lisa, 27 Nov 2026, Clara): the Library's trailer Jukebox cabinet (.lit-jbx styles) with the person's videos -
 *  screen on the left, the list on the right. Nothing loads from YouTube until a visitor presses play. */
function VideoBox({ v, first }: { v: NonNullable<PersonProfile["videos"]>; first: string }) {
  const [now, setNow] = useState<{ id: string; title: string } | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const list = v.list.filter((x) => !failed.includes(x.id));
  if (list.length === 0) return null;
  const pick = list[0]!;
  const next = (from: { id: string }) => setNow(list[list.findIndex((x) => x.id === from.id) + 1] ?? null);
  return (
    <section aria-labelledby="person-videos">
      <h2 id="person-videos" className={`${h} text-center`}>Watch {first}</h2>
      <div className="lit-jbx mt-6">
        <div className="lit-jbx-l">
          <p className="lit-jbx-kicker">The Night Fever</p>
          <p className="lit-jbx-title">On fil<b>m</b></p>
          <div className="lit-jbx-screen">
            {now ? (
              <VideoScreen vid={now.id} title={now.title} onEnd={() => next(now)} onFail={() => { setFailed((f) => [...f, now.id]); next(now); }} />
            ) : (
              <button type="button" className="lit-jbx-press" onClick={() => setNow(pick)} aria-label={`Play the video: ${pick.title}`}>
                <span className="lit-jbx-k">Watch first</span>
                <span className="lit-jbx-play" aria-hidden>▶</span>
                <span className="lit-jbx-nm">{pick.title}</span>
                <span className="lit-jbx-sm">From {first}'s AFTERPARTY playlist</span>
              </button>
            )}
          </div>
        </div>
        <div className="lit-jbx-r">
          {list.length > 1 && (
            <ol className="lit-jbx-sel">
              {list.map((x, i) => (
                <li key={x.id}>
                  <button type="button" aria-pressed={(now ?? pick).id === x.id && !!now} onClick={() => setNow(x)}>
                    <i>A{i + 1}</i>
                    <span>{x.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
          {v.playlist && (
            <a href={v.playlist} target="_blank" rel="noopener noreferrer" className="lit-jbx-open">The whole playlist on YouTube ↗</a>
          )}
          <p className="lit-jbx-fine">Plays from YouTube, loaded only when you press ▶ - same as the Jukebox.</p>
        </div>
        <div className="lit-jbx-grille" aria-hidden />
      </div>
    </section>
  );
}

/** Person pages (Lisa, 20 Nov 2026, Kim Hastreiter first): story, "What the guests say" wall, and their story box -
 *  the In memoriam layout for people who are still with us. Sits above the usual A–Z card sections. */
export function PersonProfileSections({ m, name }: { m: PersonProfile; name: string }) {
  const first = m.first ?? name.split(" ")[0];
  return (
    <>
      <div className="pt-4 text-center">
        <p className="mx-auto max-w-2xl text-card-foreground/85"><EntityText text={m.story} self={name} /></p>
      </div>

      {m.said.length > 0 && (
        <section>
          <h2 className={`${h} text-center`}>What the guests say</h2>
          <div className={m.said.length === 1 ? "mx-auto mt-10 grid max-w-sm gap-10" : m.said.length === 2 ? "mx-auto mt-10 grid max-w-3xl gap-10 sm:grid-cols-2" : "mx-auto mt-10 flex max-w-xl flex-col gap-12 lg:max-w-none lg:flex-row lg:items-start lg:gap-10"}>
            {columnsOf(m.said, m.said.length > 2 ? 3 : 1).map((col, c) => (
            <div key={c} className={m.said.length > 2 ? "contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-12" : "contents"}>
            {col.map(({ s, i }) => {
              const ep = episodeById(s.episode);
              const code = `S${ep.season}E${ep.episode}${ep.part ?? ""}`;
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
                      <QuoteName who={s.who} episodeId={s.episode} />
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
            ))}
          </div>
        </section>
      )}

      {m.videos && m.videos.list.length > 0 && <VideoBox v={m.videos} first={first ?? name} />}

      <section className="grid gap-8 rounded-2xl border-2 border-[#111] bg-card p-6 shadow-[6px_7px_0_#111] md:grid-cols-2">
        <div>
          <h2 className={h}>{first}'s story</h2>
          <ol className="mt-4 space-y-3 border-l border-gold/40 pl-5">
            {m.timeline.map(([y, t, url], i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold text-foreground">{y}</span> ·{" "}
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-card-foreground/80 transition-colors hover:text-pink">
                    {t} ↗
                  </a>
                ) : (
                  <span className="text-card-foreground/80"><EntityText text={t} self={name} /></span>
                )}
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
          {m.also && m.also.names.length > 0 && (
            <>
              <h2 className={`${h} mt-6`}>{m.also.heading}</h2>
              <div className="mt-3 flex flex-wrap gap-2">{m.also.names.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
