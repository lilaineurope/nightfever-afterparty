// Server side of the home page (page weight, 17 Nov 2026): works out the few things the home page shows from the whole
// A–Z - the Daily pick AFTERPARTIES and their totals, the Hall of Fame, the interview tips' boxes and the "More to explore" counts -
// with every name -> card answer their links need. Only the server and home-view.functions.ts load this file.
import { entityFor, totalMentions, entities, type Entity } from "@/data/entities";
import { episodes } from "@/data/episodes";
import { seededRandom } from "@/lib/random";
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

/** Daily pick (Lisa, 28 Nov 2026: "turn it into 'daily pick' and then shuffle 3 episodes daily"): three AFTERPARTIES,
 *  the same for everyone all day (Stockholm date), new ones at midnight. The days walk through a shuffled order of every
 *  AFTERPARTY, three at a time, so each one gets its day before any comes back (like the quote of the day). */
export function dailyPick(now = new Date()) {
  const day = now.toLocaleDateString("sv-SE", { timeZone: "Europe/Stockholm" }); // YYYY-MM-DD
  const days = Math.floor(Date.parse(`${day}T00:00:00Z`) / 86_400_000);
  const pool = [...episodes].sort((a, b) => a.id.localeCompare(b.id));
  const perRound = Math.floor(pool.length / 3);
  const round = Math.floor(days / perRound);
  const rand = seededRandom(round * 7919 + pool.length);
  const order = pool.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  const start = (days % perRound) * 3;
  return order.slice(start, start + 3).map((i) => pool[i]!.id);
}

export function homeView(): HomeView {
  const L = linkRecorder();
  const pick = dailyPick();
  const stats = Object.fromEntries(pick.map((id) => [id, episodeStats(id)]));
  const mentors = rankedMentors.slice(0, 10);
  for (const m of mentors) if (m.slug) L.card(m.slug);
  const boxes: Record<string, BoxData> = {};
  const interviewed: Record<string, Interviewed> = {};
  for (const p of [...INTERVIEW_PEOPLE.newFaces, ...INTERVIEW_PEOPLE.comeBack]) {
    L.name(p.name);
    const e = entityFor(p.name);
    if (e) boxes[p.name] = boxOf(e);
    const done = p.suggested ? interviewedOn(p.name) : undefined;
    if (done) interviewed[p.key] = done;
  }
  return {
    counts: { timeline: sceneEvents.length, jukebox: jukebox.length, clubs: clubsMentioned.length, library: bookClub.length, explore: entities.length },
    dailyPick: pick,
    stats,
    mentors,
    boxes,
    interviewed,
    links: L.data,
  };
}
