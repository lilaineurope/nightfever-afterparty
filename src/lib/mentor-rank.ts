import { entityFor, totalMentions } from "@/data/entities";
import { episodeById } from "@/data/episodes";
import { MENTOR_LINKS, NOT_IN_HALL_OF_FAME, type MentorKind, type MentorLink } from "@/data/mentors";
import type { MentorTreeData } from "@/lib/mentor-tree";

// The Hall of Fame score (Lisa, 21 Nov 2026 - "identify the one who mentored the most and who helped, elevated, supported
// the most"; replaces the 28 Oct count of mentor lines). The rules, also explained on /hall-of-fame-rules:
//  1. Each person helped counts once, by the biggest help they got from this mentor: lifted 3, stood by 2, opened a door 1
//     (MentorKind in src/data/mentors.ts; a link without a kind is "lifted").
//  2. Voices: +1 for every different person who tells of their help on the show. The mentor telling it themselves is no voice.
//  3. Family tree: +1/2 for every person their mentees went on to lift (one generation down, never through Michael Alig).
//  4. Ties: mentions across every AFTERPARTY. Michael Alig is left out of the ranking (NOT_IN_HALL_OF_FAME).
// Shared by the home Hall of Fame (top 10), the guest's Mentor score, the family trees and the rules page.

export const KIND_POINTS: Record<MentorKind, number> = { lifted: 3, stood: 2, door: 1 };
export const TREE_POINTS = 0.5;
const kindOf = (l: MentorLink): MentorKind => l.kind ?? "lifted";
const slugOf = (n: string) => entityFor(n.replace(/ \(as heard\)$/, ""))?.slug ?? n;
const same = (a: string, b: string) => slugOf(a) === slugOf(b);
/** Who tells the moment on the show: the link's `told`, else the guest of the episode. */
export const tellerOf = (l: MentorLink) => l.told ?? episodeById(l.episode).guest;

/** One person helped: their biggest help, every moment of it, and the people they went on to help. */
export type Helped = {
  name: string;
  kind: MentorKind;
  points: number;
  links: MentorLink[];
  /** People this person went on to help (one generation down); `counted` = lifted, so it scores for the mentor. */
  grand: { name: string; kind: MentorKind; counted: boolean; link: MentorLink }[];
};

export type RankedMentor = {
  name: string;
  links: MentorLink[];
  slug: string | undefined;
  link: string | undefined;
  mentions: number;
  people: Helped[];
  /** points for the people helped */
  help: number;
  /** different people (not the mentor) who tell of the help */
  voices: string[];
  /** points from the family tree */
  tree: number;
  score: number;
};

const byMentor = new Map<string, MentorLink[]>();
for (const l of MENTOR_LINKS) byMentor.set(l.mentor, [...(byMentor.get(l.mentor) ?? []), l]);

/** The people one mentor helped, each once, by the biggest help (moments in show order). */
function peopleOf(name: string): Omit<Helped, "grand">[] {
  const by = new Map<string, MentorLink[]>();
  for (const l of byMentor.get(name) ?? []) by.set(l.mentee, [...(by.get(l.mentee) ?? []), l]);
  return [...by.entries()].map(([mentee, links]) => {
    const kind = links.map(kindOf).sort((a, b) => KIND_POINTS[b] - KIND_POINTS[a])[0]!;
    return { name: mentee, kind, points: KIND_POINTS[kind], links };
  });
}

function score(name: string, links: MentorLink[]): RankedMentor {
  const direct = peopleOf(name);
  const seen = new Set([slugOf(name), ...direct.map((p) => slugOf(p.name))]);
  const people: Helped[] = direct
    .map((p) => {
      const grand: Helped["grand"] = [];
      if (!NOT_IN_HALL_OF_FAME.has(p.name)) {
        for (const g of peopleOf(p.name)) {
          if (seen.has(slugOf(g.name))) continue;
          seen.add(slugOf(g.name));
          grand.push({ name: g.name, kind: g.kind, counted: g.kind === "lifted", link: g.links[0]! });
        }
      }
      return { ...p, grand };
    })
    .sort((a, b) => b.points - a.points || b.grand.length - a.grand.length || a.name.localeCompare(b.name));
  const help = people.reduce((n, p) => n + p.points, 0);
  const voices = [...new Set(links.map(tellerOf).filter((t) => !same(t, name)))];
  const tree = people.reduce((n, p) => n + p.grand.filter((g) => g.counted).length, 0) * TREE_POINTS;
  const e = entityFor(name);
  return { name, links, slug: e?.slug, link: e?.link, mentions: e ? totalMentions(e) : 0, people, help, voices, tree, score: help + voices.length + tree };
}

/** Every mentor, ranked the Hall of Fame way. */
export const rankedMentors: RankedMentor[] = [...byMentor.entries()]
  .filter(([name]) => !NOT_IN_HALL_OF_FAME.has(name))
  .map(([name, links]) => score(name, links))
  .sort((a, b) => b.score - a.score || b.voices.length - a.voices.length || b.mentions - a.mentions || a.name.localeCompare(b.name));

/** How many get the Hall of Fame (and its gold badge and family tree on their page). */
export const HALL_OF_FAME_SIZE = 10;

/** The family tree a top-10 mentor gets on their page (plain data, so a light page can draw it). */
export function mentorTreeOf(slug: string): MentorTreeData | null {
  const i = rankedMentors.findIndex((m) => m.slug === slug);
  if (i < 0 || i >= HALL_OF_FAME_SIZE) return null;
  return treeData(rankedMentors[i]!, i + 1);
}

export function treeData(m: RankedMentor, rank: number): MentorTreeData {
  const code = (id: string) => {
    const ep = episodeById(id);
    return `S${ep.season}E${ep.episode}${ep.part ?? ""}`;
  };
  return {
    name: m.name,
    rank,
    of: rankedMentors.length,
    score: m.score,
    help: m.help,
    voices: m.voices.length,
    tree: m.tree,
    kids: m.people.map((p) => {
      const l = p.links.find((x) => kindOf(x) === p.kind) ?? p.links[0]!;
      const teller = tellerOf(l);
      return {
        name: p.name,
        kind: p.kind,
        points: p.points,
        episode: l.episode,
        code: code(l.episode),
        time: l.time,
        line: l.line,
        told: same(teller, m.name) ? null : teller,
        grand: p.grand.map((g) => ({ name: g.name, kind: g.kind, counted: g.counted, episode: g.link.episode, code: code(g.link.episode), line: g.link.line })),
      };
    }),
  };
}
