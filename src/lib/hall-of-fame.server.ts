// Server side of /hall-of-fame (Lisa, 21 Nov 2026: "create the hall of fame website with top 10 on top"): the Hall of Fame
// top 10 (src/lib/mentor-rank.ts) and places 11-100 (src/lib/connector-rank.ts), with the link answers the page needs.
// "top 10 use the portrait in the boxes, make all names clickable ... expand to a box underneath like on library" (Lisa, 21 Nov):
// the top 10 bring their portrait and help moments along; a name from 11-100 fetches its moments when its box opens.
import { rankedMentors, HALL_OF_FAME_SIZE } from "@/lib/mentor-rank";
import { hallConnectors } from "@/lib/connector-rank";
import { linkRecorder } from "@/lib/link-recorder.server";
import { episodeById, stageName } from "@/data/episodes";
import { afterpartyOf, entityBySlug, totalMentions } from "@/data/entities";
import { PERSON_PORTRAITS } from "@/data/person-portraits";
import { polaroidThumb } from "@/lib/polaroids";
import { KIND_LABEL, type HallOfFameView, type HofMoment, type HofMomentsView } from "@/lib/mentor-tree";
import type { MentorLink } from "@/data/mentors";

const plain = (n: string) => n.replace(/ \(as heard\)$/, "");
const code = (id: string) => {
  const ep = episodeById(id);
  return { episodeId: ep.id, code: `S${ep.season}E${ep.episode}${ep.part ?? ""}`, guest: ep.guest };
};

function portraitOf(slug: string): string | null {
  const e = entityBySlug[slug];
  const ep = afterpartyOf(e);
  if (ep) return polaroidThumb(ep, 512) ?? null;
  return PERSON_PORTRAITS[slug]?.photo ?? null;
}

export function hallOfFameView(): HallOfFameView {
  const L = linkRecorder();
  const top = rankedMentors.slice(0, HALL_OF_FAME_SIZE).map((m, i) => {
    const name = plain(m.name);
    L.name(name);
    const slug = m.slug ?? "";
    if (slug) L.card(slug);
    const moments: HofMoment[] = m.links.map((l: MentorLink) => {
      const context = `${KIND_LABEL[l.kind ?? "lifted"]} ${plain(stageName(l.mentee))}: ${l.line}`;
      L.text(context, name);
      return { ...code(l.episode), time: l.time, context };
    });
    return {
      rank: i + 1, name, slug, score: m.score, voices: m.voices.length, mentions: m.mentions,
      helped: m.people.map((p) => plain(stageName(p.name))),
      pic: slug ? portraitOf(slug) : null,
      guest: !!afterpartyOf(entityBySlug[slug]),
      link: m.link,
      moments,
    };
  });
  const rest = hallConnectors.map((p) => {
    L.name(p.name);
    L.card(p.slug);
    return { rank: p.rank, name: p.name, slug: p.slug, episodes: p.episodeIds.length, mentions: p.mentions, guest: !!afterpartyOf(entityBySlug[p.slug]) };
  });
  return { top, rest, of: rankedMentors.length, links: L.data };
}

/** Every moment one name comes up in, for its box on /hall-of-fame. */
export function hallOfFameMoments(slug: string): HofMomentsView {
  const L = linkRecorder();
  const e = entityBySlug[slug];
  if (!e) return { moments: [], mentions: 0, link: undefined, links: L.data };
  L.card(slug);
  const moments: HofMoment[] = e.refs
    .filter((r) => r.episode)
    .map((r) => {
      L.text(r.context, e.name);
      return { ...code(r.episode as string), time: r.time, context: r.context };
    });
  return { moments, mentions: totalMentions(e), link: e.link, links: L.data };
}
