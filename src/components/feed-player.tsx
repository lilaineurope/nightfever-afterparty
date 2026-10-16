import { useEffect, useRef, useState } from "react";

// A small player for the show's own public podcast audio (the same file every podcast
// app plays, streamed from the show's podcast host - the site stores no audio).
// Timestamp links call playAt() to jump straight to that moment.

let audioEl: HTMLAudioElement | null = null;
const openers = new Set<() => void>();

/** Jump the page's player to a moment and play. Returns false if there is no player. */
export function playAt(seconds: number): boolean {
  const a = audioEl;
  if (!a) return false;
  openers.forEach((o) => o());
  const go = () => {
    a.currentTime = seconds;
    void a.play();
  };
  if (a.readyState >= 1) go();
  else {
    a.preload = "metadata";
    a.addEventListener("loadedmetadata", go, { once: true });
    a.load();
  }
  return true;
}

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "--:--";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = Math.floor(s % 60);
  return `${h ? `${h}:` : ""}${String(m).padStart(h ? 2 : 1, "0")}:${String(x).padStart(2, "0")}`;
};

export function FeedPlayer({ src, label, spotifyUrl }: { src: string; label: string; spotifyUrl?: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(NaN);

  useEffect(() => {
    audioEl = ref.current;
    const o = () => setOpen(true);
    openers.add(o);
    return () => {
      openers.delete(o);
      if (audioEl === ref.current) audioEl = null;
    };
  }, []);

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

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-background/95 backdrop-blur transition-transform ${open ? "" : "translate-y-[calc(100%-2.25rem)]"}`}>
      <audio
        ref={ref}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
      />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-1.5 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-pink">{label}</span> - tap any &#9654; timestamp to jump right to that moment
        </span>
        <button type="button" onClick={() => setOpen(!open)} className="rounded px-2 py-0.5 text-gold hover:text-pink" aria-expanded={open}>
          {open ? "Hide player" : "Show player"}
        </button>
      </div>
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 pb-3 pt-2">
        <button type="button" onClick={() => skip(-15)} className="hidden rounded-full px-2 py-1 text-xs text-gold hover:text-pink sm:block" aria-label="Back 15 seconds">-15</button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink text-lg text-pink-foreground shadow-[0_0_18px_rgba(236,72,153,0.45)] hover:bg-pink/90"
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <button type="button" onClick={() => skip(15)} className="hidden rounded-full px-2 py-1 text-xs text-gold hover:text-pink sm:block" aria-label="Forward 15 seconds">+15</button>
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
        {spotifyUrl && (
          <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="hidden shrink-0 text-xs text-gold underline underline-offset-2 hover:text-pink md:block">
            Open in Spotify
          </a>
        )}
      </div>
    </div>
  );
}
