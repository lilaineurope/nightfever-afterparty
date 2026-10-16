import { useEffect, useRef, useState } from "react";

// Spotify's official embedded player (iFrame API). Plays stay with the show on
// Spotify; the site hosts no audio. Timestamp links call playAt() to jump there.

type Controller = {
  loadUri: (uri: string, preferVideo?: boolean, startAt?: number) => void;
  play: () => void;
  seek: (seconds: number) => void;
  addListener: (event: string, cb: (e: { data: { isPaused?: boolean; position?: number } }) => void) => void;
};
type IFrameAPI = {
  createController: (el: HTMLElement, opts: Record<string, unknown>, cb: (c: Controller) => void) => void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
    __spotifyApi?: IFrameAPI;
  }
}

let controller: Controller | null = null;
let currentUri = "";
let started = false;
const listeners = new Set<(open: boolean) => void>();

/** Jump the page's Spotify player to a moment. Returns false if the player isn't ready. */
export function playAt(seconds: number): boolean {
  if (!controller) return false;
  listeners.forEach((l) => l(true));
  if (!started) {
    controller.loadUri(currentUri, false, seconds);
    controller.play();
    started = true;
  } else {
    controller.seek(seconds);
    controller.play();
  }
  return true;
}

export const toSeconds = (t: string) => t.split(":").reduce((a, b) => a * 60 + Number(b), 0);

export function SpotifyPlayer({ episodeId, label }: { episodeId: string; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const l = (o: boolean) => setOpen(o);
    listeners.add(l);
    currentUri = `spotify:episode:${episodeId}`;
    const make = (api: IFrameAPI) => {
      if (!box.current) return;
      api.createController(box.current, { uri: currentUri, width: "100%", height: 80 }, (c) => {
        controller = c;
        started = false;
      });
    };
    if (window.__spotifyApi) make(window.__spotifyApi);
    else {
      window.onSpotifyIframeApiReady = (api) => {
        window.__spotifyApi = api;
        make(api);
      };
      if (!document.getElementById("spotify-iframe-api")) {
        const s = document.createElement("script");
        s.id = "spotify-iframe-api";
        s.src = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.body.appendChild(s);
      }
    }
    return () => {
      listeners.delete(l);
      controller = null;
    };
  }, [episodeId]);

  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-background/95 backdrop-blur transition-transform ${open ? "" : "translate-y-[calc(100%-2.25rem)]"}`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-1.5 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-pink">{label}</span> - tap any timestamp to jump right to that moment
        </span>
        <button type="button" onClick={() => setOpen(!open)} className="rounded px-2 py-0.5 text-gold hover:text-pink" aria-expanded={open}>
          {open ? "Hide player" : "Show player"}
        </button>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-2 pt-1">
        <div ref={box} />
      </div>
    </div>
  );
}
