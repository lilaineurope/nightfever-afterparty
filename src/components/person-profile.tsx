import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { NamePile } from "@/components/name-pile";
import { EntityText } from "@/components/entity-text";
import { polaroidThumb } from "@/lib/polaroids";
import { episodeById, episodePath } from "@/data/episodes";
import type { PersonProfile } from "@/data/person-profiles";
import type { SaidBox } from "@/lib/card-view";
import { QuoteName } from "@/components/quote-name";
import { ProfileVideos } from "@/components/profile-videos";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";
const TILT = [-2, 1.5, -1, 2, -1.5, 1];
/** At most nine boxes on the wall (Lisa's quote-wall rule); a More button opens the rest. */
const SHOW = 9;

/** The quote wall's columns, worked out here instead of CSS columns: Safari cut the boxes off at the top
 *  when they sat in CSS columns (Lisa, 21 Nov 2026). Quotes stay in reading order, top to bottom, column by
 *  column, split where the columns come out most even (a box counts as its text plus about 220 letters).
 *  Below lg the column wrappers are display: contents, so phones and tablets get one column in order. */
function columnsOf<T extends { quote?: string | undefined; context?: string | undefined }>(said: T[], n: number): { s: T; i: number }[][] {
  const items = said.map((s, i) => ({ s, i }));
  if (n <= 1 || said.length <= n) return n <= 1 ? [items] : items.map((x) => [x]);
  const w = said.map((s) => (s.quote ?? s.context ?? "").length + 220);
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

/** Person pages (Lisa, 20 Nov 2026, Kim Hastreiter first): story, "What the guests say" wall, and their story box -
 *  the In memoriam layout for people who are still with us. Sits above the usual A–Z card sections. */
export function PersonProfileSections({ m, name, faces, more = [] }: { m: PersonProfile; name: string; faces?: Record<string, { src: string; framed?: boolean; mast?: "light" | "dark" }>; more?: SaidBox[] }) {
  const first = m.first ?? name.split(" ")[0];
  // Every episode that talks about them is a box (Lisa, 28 Nov 2026): their quotes first, then each other mention with
  // what was said, labelled "On the show" like the club and event walls.
  const said: { episode: string; who: string; time: string; quote?: string | undefined; context?: string | undefined; mentions?: number | undefined; onShow?: boolean }[] = [
    ...m.said,
    ...more.map((b) => ({ episode: b.episode, who: b.who, time: b.time, context: b.context, mentions: b.mentions, onShow: true })),
  ];
  const [all, setAll] = useState(false);
  const shown = all ? said : said.slice(0, SHOW);
  return (
    <>
      <div className="pt-4 text-center">
        <p className="mx-auto max-w-2xl text-card-foreground/85"><EntityText text={m.story} self={name} /></p>
      </div>

      {said.length > 0 && (
        <section>
          <h2 className={`${h} text-center`}>What the guests say</h2>
          <div className={said.length === 1 ? "mx-auto mt-10 grid max-w-sm gap-10" : said.length === 2 ? "mx-auto mt-10 grid max-w-3xl gap-10 sm:grid-cols-2" : "mx-auto mt-10 flex max-w-xl flex-col gap-12 lg:max-w-none lg:flex-row lg:items-start lg:gap-10"}>
            {columnsOf(shown, said.length > 2 ? 3 : 1).map((col, c) => (
            <div key={c} className={said.length > 2 ? "contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-12" : "contents"}>
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
                    {s.onShow ? (
                      <>
                        <span className="mb-2 block font-[family-name:var(--font-mono-body)] text-[11px] uppercase leading-snug tracking-wide text-[#6b6460]">
                          On the show{s.mentions && s.mentions > 1 ? ` · ${s.mentions} mentions` : ""}
                        </span>
                        <EntityText text={s.context ?? ""} self={name} />
                      </>
                    ) : (
                      <>
                        {s.context && <span className="mb-2 block font-[family-name:var(--font-mono-body)] text-[11px] uppercase leading-snug tracking-wide text-[#6b6460]">{s.context}</span>}
                        &ldquo;{s.quote}&rdquo;
                      </>
                    )}
                  </blockquote>
                  <figcaption className="mt-4 flex items-end justify-between gap-2 text-xs">
                    <span className="font-semibold">
                      <QuoteName who={s.who} episodeId={s.episode} />
                      <br />
                      <Link to={episodePath(ep.id)} className="font-normal text-[#555] hover:text-pink">
                        {s.who === ep.guest ? code : `${code} · ${ep.guest}`}
                      </Link>
                    </span>
                    {s.time && s.time !== "On camera" && <Timestamp episodeId={s.episode} time={s.time} />}
                  </figcaption>
                </figure>
              );
            })}
            </div>
            ))}
          </div>
          {said.length > SHOW && (
            // More than 9 (Xenon as the blueprint, Lisa 28 Nov 2026): a More button under the wall opens the rest as boxes.
            <p className="mt-12 text-center">
              <button type="button" className="map-btn" aria-expanded={all} onClick={() => setAll(!all)}>
                {all ? "Fewer quotes \u2191" : `${said.length - SHOW} more quotes \u2193`}
              </button>
            </p>
          )}
        </section>
      )}

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
              <NamePile names={m.liftedUp} faces={faces} />
            </>
          )}
          {m.rooms.length > 0 && (
            <>
              <h2 className={`${h} mt-6`}>{first}'s rooms</h2>
              <NamePile names={m.rooms} faces={faces} />
            </>
          )}
          {m.also && m.also.names.length > 0 && (
            <>
              <h2 className={`${h} mt-6`}>{m.also.heading}</h2>
              <NamePile names={m.also.names} faces={faces} />
            </>
          )}
        </div>
      </section>

      {m.videos && m.videos.length > 0 && <ProfileVideos videos={m.videos} playlist={m.playlist} first={first!} />}
      {m.jukebox && <ProfileJukebox episode={m.jukebox} first={first!} />}
    </>
  );
}

/** The page's Jukebox (PersonProfile.jukebox): the songs from the AFTERPARTY the story comes from. */
function ProfileJukebox({ episode, first }: { episode: string; first: string }) {
  const ep = episodeById(episode);
  return (
    <section aria-labelledby="profile-jukebox" className="border-2 border-gold bg-card p-6 text-center shadow-[6px_6px_0_var(--color-pink)] sm:p-8">
      <h2 id="profile-jukebox" className={h}>Jukebox</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        No film of {first} has turned up yet. Its story comes from{" "}
        <Link to={episodePath(ep.id)} className="font-semibold text-cream hover:text-pink">{ep.guest}'s AFTERPARTY</Link>, so play the songs from that episode.
      </p>
      <Link to="/jukebox" search={{ afterparty: ep.id }}
        className="mt-5 inline-block rounded-full border-2 border-pink bg-pink px-6 py-3 font-semibold text-pink-foreground transition hover:border-cream hover:bg-card hover:text-cream">
        Turn on {ep.guest}'s AFTERPARTY JUKEBOX
      </Link>
    </section>
  );
}
