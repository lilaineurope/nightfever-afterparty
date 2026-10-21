import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { episodes } from "@/data/episodes";

/*
 * One episode player for the whole site. It plays the show's own public podcast audio
 * (the file every podcast app plays, streamed from the show's podcast host - the site
 * stores no audio), so every play reaches the show and its ads. Any <Timestamp> on any
 * page calls playEpisodeAt() to jump straight to that moment.
 */

type State = { episodeId: string | null; open: boolean };
let state: State = { episodeId: null, open: false };
const subs = new Set<() => void>();
const set = (s: Partial<State>) => {
  state = { ...state, ...s };
  subs.forEach((f) => f());
};
let audio: HTMLAudioElement | null = null;

export const toSeconds = (t: string) => t.split(":").reduce((a, b) => a * 60 + Number(b), 0);

/** Play an episode from a given second. Runs synchronously inside the click, so phones allow it. */
export function playEpisodeAt(episodeId: string, seconds: number) {
  const ep = episodes.find((e) => e.id === episodeId);
  const a = audio;
  if (!ep?.audioUrl || !a) return false;
  if (a.dataset["ep"] !== episodeId) {
    a.dataset["ep"] = episodeId;
    a.src = ep.audioUrl;
  }
  set({ episodeId, open: true });
  const fix = () => {
    if (Math.abs(a.currentTime - seconds) > 2) a.currentTime = seconds;
  };
  try {
    a.currentTime = seconds;
  } catch {
    /* not seekable yet - fixed on loadedmetadata */
  }
  if (a.readyState < 1) a.addEventListener("loadedmetadata", fix, { once: true });
  void a.play().then(fix, () => {});
  return true;
}

/** Episode pages show their own episode in the player straight away (paused). */
export function useEpisodePlayer(episodeId: string) {
  useEffect(() => {
    if (state.episodeId !== episodeId && !(audio && !audio.paused)) set({ episodeId, open: true });
  }, [episodeId]);
}

// Timestamps (Lisa, 21 Oct): no yellow box - the time itself in bold marker yellow, with a thin ink drop shadow so it
// stays readable on the paper background; pink on hover.
const TS = "font-mono font-bold text-[#e3b300] [text-shadow:1px_1px_0_var(--color-cream)]";

/** A clickable "▶ 00:12:34" that jumps the player to that moment. */
export function Timestamp({ episodeId, time, className = "" }: { episodeId: string; time: string; className?: string }) {
  if (!time || time === "On camera") return <span className={className}>{time}</span>;
  const ep = episodes.find((e) => e.id === episodeId);
  if (!ep?.audioUrl) return <span className={`${TS} ${className}`}>{time}</span>;
  return (
    <button
      type="button"
      onClick={() => playEpisodeAt(episodeId, toSeconds(time))}
      title={`Play S${ep.season}E${ep.episode} from ${time}`}
      className={`inline-flex items-center gap-1 self-start ${TS} transition hover:text-pink ${className}`}
    >
      <span aria-hidden="true" className="text-[0.75em]">&#9654;</span>
      <span className="sr-only">Play from </span>
      {time}
    </button>
  );
}

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "--:--";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = Math.floor(s % 60);
  return `${h ? `${h}:` : ""}${String(m).padStart(h ? 2 : 1, "0")}:${String(x).padStart(2, "0")}`;
};

const SPOTIFY_SHOW = "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW";

/** Rendered once in __root. Hidden until an episode page or a timestamp opens it. */
export function EpisodePlayer() {
  const s = useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => state,
    () => state,
  );
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(NaN);
  const [min, setMin] = useState(false);
  const ep = episodes.find((e) => e.id === s.episodeId);

  useEffect(() => {
    audio = ref.current;
    return () => {
      audio = null;
    };
  }, []);
  useEffect(() => {
    // An episode page opened the player: load its audio (nothing downloads until play).
    const a = ref.current;
    if (a && ep?.audioUrl && a.dataset["ep"] !== ep.id) {
      a.dataset["ep"] = ep.id;
      a.src = ep.audioUrl;
      setT(0);
      setDur(NaN);
    }
  }, [ep]);
  useEffect(() => {
    if (s.open) setMin(false);
  }, [s.open, s.episodeId]);

  const show = !!ep?.audioUrl && s.open;
  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  };
  const skip = (d: number) => {
    const a = ref.current;
    if (a) a.currentTime = Math.max(0, a.currentTime + d);
  };

  const audioEl = (
    <audio
      ref={ref}
      preload="none"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
      onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      onEmptied={() => {
        setT(0);
        setDur(NaN);
      }}
    />
  );
  return (
    <>
      {audioEl}
      {show && ep && (<>
      <div className={min ? "h-10" : "h-32"} aria-hidden="true" />
      <div
        role="region"
        aria-label="Episode player"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-background/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 pt-1.5 text-xs text-muted-foreground">
          <span className="truncate">
            <span className="font-semibold text-pink">
              S{ep.season}E{ep.episode} · {ep.guest}
            </span>
            <span className="hidden sm:inline"> - tap any &#9654; timestamp to jump right to that moment</span>
          </span>
          <span className="flex shrink-0 items-center gap-3">
            <a href={ep.watchUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-2 hover:text-pink hover:underline">
              Watch on WOW Presents Plus
            </a>
            <a href={SPOTIFY_SHOW} target="_blank" rel="noopener noreferrer" className="hidden text-gold underline-offset-2 hover:text-pink hover:underline sm:inline">
              Follow on Spotify
            </a>
            <button type="button" onClick={() => setMin(!min)} className="text-muted-foreground hover:text-pink" aria-expanded={!min}>
              {min ? "Show" : "Hide"}
            </button>
          </span>
        </div>
        {!min && (
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 pb-3 pt-2">
            <button type="button" onClick={() => skip(-15)} className="hidden px-1 text-xs text-gold hover:text-pink sm:block" aria-label="Back 15 seconds">
              -15
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink text-lg text-pink-foreground shadow-[0_0_18px_rgba(236,72,153,0.45)] hover:bg-pink/90"
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button type="button" onClick={() => skip(15)} className="hidden px-1 text-xs text-gold hover:text-pink sm:block" aria-label="Forward 15 seconds">
              +15
            </button>
            <span className="w-14 shrink-0 text-right font-mono text-xs text-cream">{fmt(t)}</span>
            <input
              type="range"
              min={0}
              max={Number.isFinite(dur) ? dur : 0}
              step={1}
              value={t}
              onChange={(e) => {
                const a = ref.current;
                if (a) a.currentTime = Number(e.currentTarget.value);
              }}
              aria-label="Position in the episode"
              className="h-1 flex-1 cursor-pointer accent-pink"
            />
            <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground">{fmt(dur)}</span>
          </div>
        )}
        {!min && (
          <p className="mx-auto max-w-5xl px-4 pb-2 text-[11px] leading-snug text-muted-foreground/80">
            This fan site doesn't host any audio - the player streams each episode straight from the show's own podcast feed.
          </p>
        )}
      </div>
      </>)}
    </>
  );
}
