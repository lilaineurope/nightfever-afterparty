import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { episodeById, episodePath } from "@/data/episodes";
import type { DiaryLine, DiaryMoment } from "@/data/diaries";
import type { CardView } from "@/lib/card-view";

// Diary pages (Lisa, 21 Nov 2026): who kept it, then every moment the diary comes up on the show, in full with the talk
// around it. The words read straight out of the diary sit on a ruled diary page with a highlighter over them, and the
// moment carries a READ ALOUD stamp - so the readings jump out. Sits above the usual A–Z card sections.

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const isRead = (m: DiaryMoment) => m.lines.some((l) => l.read);
const anchor = (m: DiaryMoment) => `${m.episode}-${m.time.replace(/:/g, "")}`;
const codeOf = (id: string) => {
  const ep = episodeById(id);
  return `S${ep.season}E${ep.episode}${ep.part ?? ""}`;
};

function Line({ l, prev }: { l: DiaryLine; prev?: DiaryLine | undefined }) {
  const same = prev && prev.who === l.who && !prev.read;
  if (l.read)
    return (
      <div className="diary-page">
        <span className="diary-page-tag">{same ? "From the diary" : `${l.who}, from the diary`}</span>
        <p>
          <mark className="diary-mark">{l.text}</mark>
        </p>
      </div>
    );
  return (
    <p className="text-[15px] leading-relaxed text-card-foreground/85">
      {!same && <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-gold">{l.who}</span>}
      {l.text}
    </p>
  );
}

export function DiarySections({ d, name }: { d: NonNullable<CardView["diary"]>; name: string }) {
  const read = d.moments.filter(isRead);
  const eps = new Set(d.moments.map((m) => m.episode)).size;
  return (
    <>
      <div className="diary-intro">
        {d.polaroid && (
          <figure className="diary-keeper">
            <img src={d.polaroid} alt={`${d.keeper}, who kept ${name}`} loading="lazy" decoding="async" />
            <figcaption>Kept by {d.keeper}</figcaption>
          </figure>
        )}
        <div>
          <p className={h}>
            Kept by <EntityLink name={d.keeper} className="text-pink underline decoration-pink/40 underline-offset-4 hover:text-gold" />
            {d.years && <> · {d.years}</>}
          </p>
          <p className="mt-3 max-w-2xl text-card-foreground/85"><EntityText text={d.story} self={name} /></p>
          <p className="mt-4 text-sm text-muted-foreground">
            Comes up {d.moments.length === 1 ? "once" : `${d.moments.length} times`} in {eps === 1 ? "one episode" : `${eps} episodes`}
            {read.length > 0 && (
              <>
                {" "}· <mark className="diary-mark">read aloud {read.length === 1 ? "once" : `${read.length} times`}</mark>
              </>
            )}
          </p>
          {read.length > 1 && (
            <div className="mt-4">
              <p className={h}>Read aloud on the show</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {read.map((m) => (
                  <li key={anchor(m)}>
                    <a href={`#${anchor(m)}`} className="diary-chip">
                      {m.title} <span className="opacity-70">{codeOf(m.episode)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <section>
        <h2 className={h}>Everything said about it on the show</h2>
        {/* Two columns on a wide screen (Front page, Lisa 22 Nov 2026: no white space) - each moment stays whole. */}
        <ol className="diary-moments mt-5">
          {d.moments.map((m) => {
            const ep = episodeById(m.episode);
            const r = isRead(m);
            return (
              <li key={anchor(m)} id={anchor(m)} className={`diary-moment scroll-mt-24 ${r ? "diary-moment-read" : ""}`}>
                {r && <span className="diary-stamp">Read aloud</span>}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <Link to={episodePath(ep.id)} className="text-sm font-semibold text-gold hover:text-pink">
                    {codeOf(ep.id)} · {ep.guest}
                  </Link>
                  <Timestamp episodeId={ep.id} time={m.time} className="text-sm" />
                </div>
                <h3 className="mt-1 pr-24 text-lg font-semibold text-cream">{m.title}</h3>
                <div className="mt-4 space-y-3">
                  {m.lines.map((l, i) => (
                    <Line key={i} l={l} prev={m.lines[i - 1]} />
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
