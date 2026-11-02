import { entityFor, totalMentions } from "@/data/entities";
import { MENTOR_LINKS, NOT_IN_HALL_OF_FAME, type MentorLink } from "@/data/mentors";

/** Every mentor ranked the Hall of Fame way (Lisa, 28 Oct 2026): by how many people they took under their wing, then by
 *  mentions across every AFTERPARTY. Shared by the home Hall of Fame (top 10) and the guest's mentor score. */
export const rankedMentors: { name: string; links: MentorLink[]; slug: string | undefined; link: string | undefined; mentions: number }[] = (() => {
  const by = new Map<string, MentorLink[]>();
  for (const l of MENTOR_LINKS) {
    if (NOT_IN_HALL_OF_FAME.has(l.mentor)) continue;
    by.set(l.mentor, [...(by.get(l.mentor) ?? []), l]);
  }
  return [...by.entries()]
    .map(([name, links]) => {
      const e = entityFor(name);
      return { name, links, slug: e?.slug, link: e?.link, mentions: e ? totalMentions(e) : 0 };
    })
    .sort((a, b) => b.links.length - a.links.length || b.mentions - a.mentions || a.name.localeCompare(b.name));
})();
