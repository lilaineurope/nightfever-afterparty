import { useCallback, useEffect, useRef, useState } from "react";
import { SPOTIFY_PLAYLIST_URL, type CollectionItem } from "@/data/collections";

// Spotify's own embed player, loaded only after a visitor presses play (nothing from Spotify loads before that).
// Spotify plays 30-second previews to visitors who aren't logged in to Spotify, full songs to those who are.
// When a song ends, the jukebox moves on to the next one, like a real jukebox.

type Controller = {
  loadUri: (uri: string) => void;
  play: () => void;
  addListener: (ev: string, cb: (e: { data: { isPaused: boolean; position: number; duration: number } }) => void) => void;
};
type IFrameAPI = { createController: (el: HTMLElement, opts: Record<string, unknown>, cb: (c: Controller) => void) => void };

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

let apiPromise: Promise<IFrameAPI> | null = null;
export function loadApi(): Promise<IFrameAPI> {
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      window.onSpotifyIframeApiReady = (api) => resolve(api);
      const s = document.createElement("script");
      s.src = "https://open.spotify.com/embed/iframe-api/v1";
      s.async = true;
      document.body.appendChild(s);
    });
  }
  return apiPromise;
}

export function useJukebox(playlist: CollectionItem[]) {
  const [current, setCurrent] = useState<number | null>(null);
  const ctrl = useRef<Controller | null>(null);
  const holder = useRef<HTMLDivElement>(null);
  const ending = useRef(false);
  const listRef = useRef(playlist);
  listRef.current = playlist;
  const curRef = useRef<number | null>(null);

  const playIndex = useCallback(async (i: number) => {
    const item = listRef.current[i];
    if (!item?.spotify) return;
    setCurrent(i);
    curRef.current = i;
    ending.current = false;
    if (ctrl.current) {
      ctrl.current.loadUri(item.spotify);
      ctrl.current.play();
      return;
    }
    const api = await loadApi();
    const el = document.createElement("div");
    holder.current?.replaceChildren(el);
    api.createController(el, { uri: item.spotify, width: "100%", height: 152 }, (c) => {
      ctrl.current = c;
      c.addListener("ready", () => c.play());
      c.addListener("playback_update", (e) => {
        const { position, duration, isPaused } = e.data;
        if (!ending.current && duration > 0 && position >= duration - 800 && !isPaused) {
          ending.current = true;
          const next = listRef.current.findIndex((x, k) => k > (curRef.current ?? -1) && x.spotify);
          if (next >= 0) setTimeout(() => void playIndexRef.current(next), 900);
        }
      });
    });
  }, []);
  const playIndexRef = useRef(playIndex);
  playIndexRef.current = playIndex;

  const step = (dir: 1 | -1) => {
    const from = curRef.current ?? -1;
    const list = listRef.current;
    for (let k = from + dir; k >= 0 && k < list.length; k += dir) {
      if (list[k]?.spotify) return void playIndex(k);
    }
  };

  useEffect(() => () => holder.current?.replaceChildren(), []);
  return { current, playIndex, step, holder };
}

export function JukeboxPlayer({
  playlist,
  current,
  onPlayFirst,
  step,
  holder,
}: {
  playlist: CollectionItem[];
  current: number | null;
  onPlayFirst: () => void;
  step: (d: 1 | -1) => void;
  holder: React.RefObject<HTMLDivElement | null>;
}) {
  const playable = playlist.filter((p) => p.spotify).length;
  const now = current !== null ? playlist[current] : null;
  return (
    <section aria-label="Jukebox player" className="rounded-2xl border border-pink/40 bg-card p-5 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pink">Now playing</p>
          <p className="mt-1 text-lg font-semibold text-cream">{now ? now.name : `${playable} songs and artists ready to play`}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => step(-1)} disabled={current === null} className="rounded-full border border-border px-3 py-1.5 text-sm text-cream disabled:opacity-40 hover:border-pink hover:text-pink" aria-label="Previous">⏮</button>
          {current === null ? (
            <button type="button" onClick={onPlayFirst} className="rounded-full bg-pink px-5 py-2 text-sm font-semibold text-pink-foreground hover:opacity-90">▶ Play the jukebox</button>
          ) : null}
          <button type="button" onClick={() => step(1)} disabled={current === null} className="rounded-full border border-border px-3 py-1.5 text-sm text-cream disabled:opacity-40 hover:border-pink hover:text-pink" aria-label="Next">⏭</button>
        </div>
      </div>
      <div ref={holder} className={current === null ? "hidden" : "mt-4 overflow-hidden rounded-xl"} />
      <a
        href={SPOTIFY_PLAYLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/60 px-4 py-1.5 text-sm font-semibold text-gold transition hover:border-pink hover:text-pink"
      >
        Follow the playlist on Spotify ↗
      </a>
      <p className="mt-3 text-[11px] leading-snug text-muted-foreground/80">
        Plays through Spotify's own player, which only loads when you press play. Not logged in to Spotify? You'll hear 30-second previews - log in for full songs. The jukebox moves on to the next song by itself.
      </p>
    </section>
  );
}
