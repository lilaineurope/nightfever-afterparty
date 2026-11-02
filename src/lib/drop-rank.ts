import { guestOfEpisode, type Entity } from "@/data/entities";
import { episodes } from "@/data/episodes";
import { namedOn } from "@/lib/name-links";

/** James St. James hosts every episode, so he is shown as the host and left out of the ranking (Lisa's open call,
 *  2 Nov 2026 - recommended option). */
export const DROP_HOST = "james-st-james";

/** Top of the drop for one guest (Lisa, 2 Nov 2026): a drop = one mention of the guest in ANOTHER guest's AFTERPARTY
 *  (their own episode doesn't count); `afterparties` = how many other AFTERPARTIES drop them (by mention or by name
 *  in another card's line). */
export function dropsOf(e: Entity, episode: string) {
  const own = e.refs.filter((r) => r.episode && r.episode !== episode);
  const eps = new Set([
    ...own.map((r) => r.episode!),
    ...namedOn(e).filter((x) => x.ref.episode && x.ref.episode !== episode).map((x) => x.ref.episode!),
  ]);
  return { drops: own.reduce((n, r) => n + r.mentions, 0), afterparties: eps.size };
}

/** Every guest with an AFTERPARTY ranked by drops, then by AFTERPARTIES, then by name; the host is not ranked. */
export const rankedDrops: { slug: string; name: string; episode: string; drops: number; afterparties: number }[] = episodes
  .map((ep) => ({ ep, e: guestOfEpisode(ep.id) }))
  .filter((x): x is { ep: (typeof episodes)[number]; e: Entity } => !!x.e?.guest && x.e.slug !== DROP_HOST)
  .map(({ ep, e }) => ({ slug: e.slug, name: e.name, episode: ep.id, ...dropsOf(e, ep.id) }))
  .sort((a, b) => b.drops - a.drops || b.afterparties - a.afterparties || a.name.localeCompare(b.name));

/** "#2 of 28 guests" for a guest's page, or undefined for the host or anyone without an AFTERPARTY. */
export function dropRank(slug: string): { rank: number; of: number } | undefined {
  const i = rankedDrops.findIndex((x) => x.slug === slug);
  return i < 0 ? undefined : { rank: i + 1, of: rankedDrops.length };
}
