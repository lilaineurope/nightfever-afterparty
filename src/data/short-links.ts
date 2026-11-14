import { episodes, episodePath } from "./episodes";
import { CLUB_NIGHTS } from "./club-nights";

// Short addresses for platforms whose descriptions can't hold a clickable link (Spotify, Lisa 14 Nov 2026).
// nightfever-afterparty.com/spotify/s01e04 forwards to the episode page with UTM tags, so Plausible shows
// the visit under Sources > Campaigns. /spotify alone is the Jukebox; /spotify/<club slug> is that club's Jukebox.
export const SHORT_LINK_SOURCES = ["spotify"] as const;
export type ShortLinkSource = (typeof SHORT_LINK_SOURCES)[number];

export function shortLinkTarget(source: ShortLinkSource, rest: string): string {
  const key = rest.toLowerCase().replace(/^\/+|\/+$/g, "");
  const tag = (campaign: string) => `utm_source=${source}&utm_medium=playlist&utm_campaign=${campaign}`;
  if (key === "" || key === "jukebox") return `/jukebox?${tag("jukebox")}`;
  const ep = episodes.find((e) => e.id === key);
  if (ep) return `${episodePath(ep.id)}?${tag(ep.id)}`;
  const club = CLUB_NIGHTS.find((c) => c.slug === key || `club-${c.slug}` === key);
  if (club) return `/jukebox?club=${club.slug}&${tag(`club-${club.slug}`)}`;
  return `/?${tag("unknown")}`;
}
