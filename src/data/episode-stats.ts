import { refsOf } from "./episode-refs";

/** The three most mentioned names on an Afterparty box. Michael Alig is a controversial name (Lisa, 28 Oct 2026): his mentions
 * stay in every list, but the boxes and polaroids give his space to the next name in rank. */
const NOT_ON_THE_BOX = new Set(["Michael Alig"]);
const topNames = (refs: { name: string; mentions: number }[]) =>
  refs
    .filter((r) => !NOT_ON_THE_BOX.has(r.name))
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 3);

export type EpisodeStats = {
  /** How many names, places and works are tagged on the episode page */
  references: number;
  /** Total mentions across all tagged references */
  mentions: number;
  /** The most-mentioned names in the episode */
  top: { name: string; mentions: number }[];
};

const cache = new Map<string, EpisodeStats>();

/** An episode's box totals, always counted from its reference rows (never typed in). */
export function episodeStats(id: string): EpisodeStats {
  let s = cache.get(id);
  if (!s) {
    const refs = refsOf(id);
    s = {
      references: refs.length,
      mentions: refs.reduce((sum, ref) => sum + ref.mentions, 0),
      top: topNames(refs).map(({ name, mentions }) => ({ name, mentions })),
    };
    cache.set(id, s);
  }
  return s;
}
