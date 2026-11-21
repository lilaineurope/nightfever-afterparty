import type { EpisodeStats } from "@/data/episode-stats";
import type { RankedMentor } from "@/lib/mentor-rank";
import type { Moment } from "@/components/moments-box";
import type { LinkData } from "@/lib/link-index";
import type { Interviewed } from "@/lib/interviewed.server";

/** A MomentsBox's contents worked out on the server (an A–Z entity's box: EntityBox). */
export type BoxData = { name: string; slug: string; mentions: number; moments: Moment[]; link?: string | undefined; note: string };

/** What the home page shows from the A–Z, worked out on the server (src/lib/home-view.server.ts) so the landing page
 *  doesn't download the whole A–Z (page weight, 17 Nov 2026). Types only - this file loads nothing. */
export type HomeView = {
  /** "More to explore" counts */
  counts: { timeline: number; jukebox: number; clubs: number; library: number; explore: number };
  /** Box totals of the latest AFTERPARTIES */
  stats: Record<string, EpisodeStats>;
  /** Hall of Fame: the top 10 mentors */
  mentors: RankedMentor[];
  /** "Who to interview next": each tip name's box */
  boxes: Record<string, BoxData>;
  /** "Who to interview next": people suggested on the show who have since been interviewed, by person key (18 Nov 2026) */
  interviewed: Record<string, Interviewed>;
  links: LinkData;
};
