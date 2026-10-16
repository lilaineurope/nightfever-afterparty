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
  if (host.endsWith("imdb.com")) return "on IMDb";
  if (host.startsWith("google.") && url.includes("/search")) return "on Google";
  return "elsewhere";
}
