/** Where an outside link goes, for "Read more ..." labels: "on Wikipedia", "on IMDb", ... */
export function linkPlace(url: string): string {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "elsewhere";
  }
  if (host.endsWith("wikipedia.org")) return "on Wikipedia";
  if (host.endsWith("wowpresentsplus.com")) return "on WOW Presents Plus";
  if (host.endsWith("worldofwonder.com") || host.endsWith("worldofwonder.net")) return "on World of Wonder";
  if (host.endsWith("imdb.com")) return "on IMDb";
  // Library scans (Lisa, 29 Oct 2026): the University of Michigan "Stand Up and Be Counted" ballroom archive
  if (host === "umsi580.lsait.lsa.umich.edu") return "in the University of Michigan archive";
  if (host.startsWith("google.") && url.includes("/search")) return "on Google";
  if (host === "open.spotify.com" && url.includes("/playlist/")) return "on Spotify";
  if (host.endsWith("youtube.com") && url.includes("/playlist")) return "on YouTube";
  return "elsewhere";
}

/** Keep visitors on the AFTERPARTY (Lisa, 21 Nov 2026): "Read more" links only show when they go to the show itself
 *  (WOW Presents Plus, World of Wonder) or to a playlist. Wikipedia, Google, IMDb, Open Library, articles and other
 *  sites stay in the data (Google still reads Wikipedia/IMDb as sameAs in the page markup) but get no visible link. */
export function showsReadMore(url: string | undefined): url is string {
  if (!url) return false;
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return false;
  }
  if (host.endsWith("wowpresentsplus.com") || host.endsWith("worldofwonder.com") || host.endsWith("worldofwonder.net")) return true;
  if (host === "open.spotify.com" && url.includes("/playlist/")) return true;
  if (host.endsWith("youtube.com") && url.includes("/playlist")) return true;
  return false;
}
