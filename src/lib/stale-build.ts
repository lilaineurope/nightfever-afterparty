// After every publish, Lovable removes the previous build's /assets/*.js files at once (checked 16 Nov 2026:
// all old chunk names answered 404 within minutes of the tagline deploy). A visitor who had a page open before
// the publish then taps a link, the browser asks for a file that no longer exists, and the page breaks with
// 404s in the console and "Oops - this page didn't load". Loading the address again fetches the new build.

const KEY = "nf-stale-build-reload";
const STALE =
  /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS|Loading (CSS )?chunk .* failed/i;

/** True when an error comes from a code file of an older build that is gone. */
export function isStaleBuildError(error: unknown): boolean {
  const msg = error instanceof Error ? `${error.name}: ${error.message}` : String(error ?? "");
  return STALE.test(msg);
}

/** Reload the page once to pick up the new build; returns false if it already tried in the last 30 s (no reload loop). */
export function reloadForNewBuild(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const last = Number(window.sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last < 30_000) return false;
    window.sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // storage blocked (private mode): reload anyway, the 30 s guard just isn't kept
  }
  window.location.reload();
  return true;
}

/** Vite fires vite:preloadError when a lazy page file fails to load; reload instead of breaking the page. */
export function watchForNewBuild(): () => void {
  const onPreloadError = (event: Event) => {
    if (reloadForNewBuild()) event.preventDefault();
  };
  window.addEventListener("vite:preloadError", onPreloadError);
  return () => window.removeEventListener("vite:preloadError", onPreloadError);
}
