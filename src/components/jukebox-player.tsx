// Spotify's own embed player, loaded only after a visitor presses play (nothing from Spotify loads before that).
// Spotify plays 30-second previews to visitors who aren't logged in to Spotify, full songs to those who are.
// Used by the Jukebox (src/components/jukebox-machine.tsx) for its "Sound only" songs.

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
