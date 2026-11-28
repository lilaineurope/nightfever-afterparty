import { useState } from "react";
import { VideoScreen } from "@/components/video-screen";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";

/** "On film" on person pages (Lisa, 27 Nov 2026, Clara the Carefree Chicken: "make a playlist on youtube and put a video
 *  box on the page"): the same jukebox cabinet as the Library's trailer box - screen on the left, the videos on the right,
 *  nothing loads from YouTube until a visitor presses play. Opens our AFTERPARTY playlist on YouTube when there is one. */
export function ProfileVideos({ videos, playlist, first }: { videos: { id: string; title: string }[]; playlist?: string | undefined; first: string }) {
  const [now, setNow] = useState<{ id: string; title: string } | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const list = videos.filter((v) => !failed.includes(v.id));
  if (list.length === 0) return null;
  const pick = list[0]!;
  const next = (from: { id: string }) => {
    const i = list.findIndex((v) => v.id === from.id);
    setNow(list[i + 1] ?? null);
  };
  return (
    <section aria-labelledby="on-film">
      <h2 id="on-film" className={`${h} text-center`}>{first} on film</h2>
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
                <span className="lit-jbx-sm">{list.length} {list.length === 1 ? "video" : "videos"} about {first}</span>
              </button>
            )}
          </div>
        </div>
        <div className="lit-jbx-r">
          {list.length > 1 && (
            <ol className="lit-jbx-sel">
              {list.map((v, i) => (
                <li key={v.id}>
                  <button type="button" aria-pressed={now?.id === v.id} onClick={() => setNow(v)}>
                    <i aria-hidden>{now?.id === v.id ? "♫" : "▶"}</i>
                    <span>{v.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
          {playlist && (
            <a href={playlist} target="_blank" rel="noopener noreferrer" className="lit-jbx-open">
              The whole playlist on YouTube ↗
            </a>
          )}
          <p className="lit-jbx-fine">Plays from YouTube, loaded only when you press ▶ - same as the Jukebox.</p>
        </div>
        <div className="lit-jbx-grille" aria-hidden />
      </div>
    </section>
  );
}
