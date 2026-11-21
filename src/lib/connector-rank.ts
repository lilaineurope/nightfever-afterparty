import { episodePeople } from "@/data/episode-connections";
import { NOT_IN_HALL_OF_FAME } from "@/data/mentors";
import { rankedMentors, HALL_OF_FAME_SIZE } from "@/lib/mentor-rank";

// One Hall of Fame top 100 (Lisa, 21 Nov 2026: "you are either top 10 golden stamp and hence in the top 100 anyway ... or you
// are just in top 100 meaning from place 11 onwards"; "yes let's do it that way"):
//  - places 1-10: the Hall of Fame top 10 (src/lib/mentor-rank.ts) - gold badge;
//  - places 11-100: the great connectors - the people dropped in the most AFTERPARTIES, then by mentions, the same order as
//    the Network's Great Connectors (src/routes/network.tsx) - leaving out the top 10 and the names kept out of the
//    Hall of Fame - pink badge. One badge per person.
// Loads the A–Z: server, episode pages.
export const CONNECTOR_BADGE_SIZE = 100;

/** Names never in the Hall of Fame top 100 (Michael Alig, as in mentors.ts; Donald Trump - Lisa's "no go", like Alig; Angel Melendez and Rudy Giuliani - Lisa, 21 Nov 2026). */
const LEFT_OUT = new Set([...NOT_IN_HALL_OF_FAME, "Donald Trump", "Andre 'Angel' Melendez", "Rudy Giuliani"]);

const goldSlugs = new Set(rankedMentors.slice(0, HALL_OF_FAME_SIZE).map((m) => m.slug).filter(Boolean));

/** Places 11 to 100, in order. */
export const hallConnectors = episodePeople
  .filter((p) => p.episodeIds.length > 1 && !goldSlugs.has(p.slug) && !LEFT_OUT.has(p.name))
  .sort((a, b) => b.episodeIds.length - a.episodeIds.length || b.mentions - a.mentions)
  .slice(0, CONNECTOR_BADGE_SIZE - HALL_OF_FAME_SIZE)
  .map((p, i) => ({ ...p, rank: HALL_OF_FAME_SIZE + 1 + i }));

const rankBySlug = new Map(hallConnectors.map((p) => [p.slug, p.rank]));

/** Place 11-100 in the Hall of Fame top 100 (pink badge), or null (top 10 or outside the 100). */
export function connectorRank(slug: string): number | null {
  return rankBySlug.get(slug) ?? null;
}
