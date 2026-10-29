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
  // Library scans (Lisa, 29 Oct 2026): the University of Michigan "Stand Up and Be Counted" ballroom archive
  if (host === "umsi580.lsait.lsa.umich.edu") return "in the University of Michigan archive";
  if (host.startsWith("google.") && url.includes("/search")) return "on Google";
  return "elsewhere";
}
