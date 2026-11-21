// Server side of /hall-of-fame (Lisa, 21 Nov 2026: "create the hall of fame website with top 10 on top"): the Hall of Fame
// top 10 (src/lib/mentor-rank.ts) and places 11-100 (src/lib/connector-rank.ts), with the link answers the page needs.
import { rankedMentors, HALL_OF_FAME_SIZE } from "@/lib/mentor-rank";
import { hallConnectors } from "@/lib/connector-rank";
import { linkRecorder } from "@/lib/link-recorder.server";
import { stageName } from "@/data/episodes";
import type { HallOfFameView } from "@/lib/mentor-tree";

const plain = (n: string) => n.replace(/ \(as heard\)$/, "");

export function hallOfFameView(): HallOfFameView {
  const L = linkRecorder();
  const top = rankedMentors.slice(0, HALL_OF_FAME_SIZE).map((m, i) => {
    L.name(plain(m.name));
    return { rank: i + 1, name: plain(m.name), score: m.score, voices: m.voices.length, helped: m.people.map((p) => plain(stageName(p.name))) };
  });
  const rest = hallConnectors.map((p) => {
    L.name(p.name);
    return { rank: p.rank, name: p.name, episodes: p.episodeIds.length, mentions: p.mentions };
  });
  return { top, rest, of: rankedMentors.length, links: L.data };
}
