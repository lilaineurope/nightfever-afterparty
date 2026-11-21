// Server side of /hall-of-fame-rules (Lisa, 21 Nov 2026): the top 10 with how each score adds up, and the worked example
// (Kim Hastreiter's family tree - the page that started the rework), with the link answers the page needs.
import { rankedMentors, treeData, HALL_OF_FAME_SIZE } from "@/lib/mentor-rank";
import { linkRecorder } from "@/lib/link-recorder.server";
import type { HallOfFameRulesView } from "@/lib/mentor-tree";

const EXAMPLE = "kim-hastreiter";

export function hallOfFameRulesView(): HallOfFameRulesView {
  const L = linkRecorder();
  const top = rankedMentors.slice(0, HALL_OF_FAME_SIZE).map((m) => {
    L.name(m.name.replace(/ \(as heard\)$/, ""));
    return { name: m.name, score: m.score, help: m.help, voices: m.voices.length, tree: m.tree, people: m.people.length };
  });
  const i = Math.max(0, rankedMentors.findIndex((m) => m.slug === EXAMPLE));
  const example = treeData(rankedMentors[i]!, i + 1);
  L.name(example.name);
  for (const k of example.kids) {
    L.name(k.name.replace(/ \(as heard\)$/, ""));
    for (const g of k.grand) L.name(g.name.replace(/ \(as heard\)$/, ""));
  }
  return { top, example, of: rankedMentors.length, links: L.data };
}
