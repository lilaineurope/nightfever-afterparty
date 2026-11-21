import { episodePeople } from "@/data/episode-connections";

// Top 100 great connectors (Lisa, 21 Nov 2026 - the pink badge): the people dropped in the most AFTERPARTIES, then by
// mentions - the same order as the Network's Great Connectors (src/routes/network.tsx). Loads the A–Z: server, episode pages.
export const CONNECTOR_BADGE_SIZE = 100;

const ranked = episodePeople
  .filter((p) => p.episodeIds.length > 1)
  .sort((a, b) => b.episodeIds.length - a.episodeIds.length || b.mentions - a.mentions);

/** 1-based rank among the great connectors, or null outside the top 100. */
export function connectorRank(slug: string): number | null {
  const i = ranked.findIndex((p) => p.slug === slug);
  return i >= 0 && i < CONNECTOR_BADGE_SIZE ? i + 1 : null;
}
