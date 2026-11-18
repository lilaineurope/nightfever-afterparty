// Server side of the home page (page weight, 17 Nov 2026): works out the few things the home page shows from the whole
// A–Z - the latest AFTERPARTIES' totals, the Hall of Fame, the interview tips' boxes and the "More to explore" counts -
// with every name -> card answer their links need. Only the server and home-view.functions.ts load this file.
import { entityFor, totalMentions, entities, type Entity } from "@/data/entities";
import { episodes } from "@/data/episodes";
import { episodeStats } from "@/data/episode-stats";
import { rankedMentors } from "@/lib/mentor-rank";
import { INTERVIEW_PEOPLE } from "@/data/interview-next";
import { interviewedOn, type Interviewed } from "@/lib/interviewed.server";
import { bookClub, clubsMentioned, jukebox } from "@/data/collections";
import { sceneEvents } from "@/data/scene";
import { momentsOf } from "@/components/moments-box";
import { linkRecorder } from "@/lib/link-recorder.server";
import type { BoxData, HomeView } from "@/lib/home-view";

/** EntityBox's contents (src/components/entity-box.tsx). */
export const boxOf = (e: Entity): BoxData => ({
  name: e.name,
  slug: e.slug,
  mentions: totalMentions(e),
  moments: momentsOf(e),
  link: e.link,
  note: e.guest ? "Night Fever guest" : e.category,
});

/** The three newest AFTERPARTIES, as the home page lists them. */
export const latestAfterparties = () =>
  [...episodes]
    .sort((a, b) => b.afterpartyPublished.localeCompare(a.afterpartyPublished) || b.season - a.season || b.episode - a.episode)
    .slice(0, 3);

export function homeView(): HomeView {
  const L = linkRecorder();
  const stats = Object.fromEntries(latestAfterparties().map((ep) => [ep.id, episodeStats(ep.id)]));
  const mentors = rankedMentors.slice(0, 10);
  for (const m of mentors) if (m.slug) L.card(m.slug);
  const boxes: Record<string, BoxData> = {};
  const interviewed: Record<string, Interviewed> = {};
  for (const p of [...INTERVIEW_PEOPLE.newFaces, ...INTERVIEW_PEOPLE.comeBack]) {
    L.name(p.name);
    const e = entityFor(p.name);
    if (e) boxes[p.name] = boxOf(e);
    const done = p.list === "new" ? interviewedOn(p.name) : undefined;
    if (done) interviewed[p.key] = done;
  }
  return {
    counts: { timeline: sceneEvents.length, jukebox: jukebox.length, clubs: clubsMentioned.length, library: bookClub.length, explore: entities.length },
    stats,
    mentors,
    boxes,
    interviewed,
    links: L.data,
  };
}
