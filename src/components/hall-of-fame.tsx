import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { entityFor, totalMentions } from "@/data/entities";
import { episodeById } from "@/data/episodes";
import { MENTOR_LINKS, NOT_IN_HALL_OF_FAME } from "@/data/mentors";

// Hall of Fame (Lisa, 28 Oct 2026; replaces "The names everyone drops"): the top 10 mentors of the scene - who took whom under
// their wing, as the guests tell it - ranked by how many people they mentored, then by how often they come up across every Afterparty.
const short = (n: string) => n.replace(/ aka .*/, "").replace(/^Jenny Dembrow$/, "Jenny Talia").replace(/ \(as heard\)$/, "");

const mentors = (() => {
  const by = new Map<string, typeof MENTOR_LINKS>();
  for (const l of MENTOR_LINKS) {
    if (NOT_IN_HALL_OF_FAME.has(l.mentor)) continue;
    by.set(l.mentor, [...(by.get(l.mentor) ?? []), l]);
  }
  return [...by.entries()]
    .map(([name, links]) => {
      const e = entityFor(name);
      return { name, links, slug: e?.slug, mentions: e ? totalMentions(e) : 0 };
    })
    .sort((a, b) => b.links.length - a.links.length || b.mentions - a.mentions || a.name.localeCompare(b.name))
    .slice(0, 10);
})();

export function HallOfFame() {
  return (
    <section className="px-6 pb-16 pt-6" aria-labelledby="hall-of-fame">
      <div className="mx-auto max-w-6xl">
        <h2 id="hall-of-fame" className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">
          Hall of Fame
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          The mentors of the scene - the people who took the guests under their wing, as they tell it on the show. Ranked by how many
          people they mentored, then by how often they come up.
        </p>
        <ol className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {mentors.map((m, i) => (
            <li key={m.name} className="flex gap-4 border-b border-gold/30 pb-4">
              <span className="font-[family-name:var(--font-flyer)] text-3xl leading-none text-pink">{i + 1}</span>
              <div className="min-w-0">
                {m.slug ? (
                  <Link to="/explore/$slug" params={{ slug: m.slug }} className="font-[family-name:var(--font-flyer)] text-2xl uppercase leading-tight transition hover:text-pink">
                    {short(m.name)}
                  </Link>
                ) : (
                  <span className="font-[family-name:var(--font-flyer)] text-2xl uppercase leading-tight">{short(m.name)}</span>
                )}
                <sup className="ml-1 font-[family-name:var(--font-mono-body)] text-[11px] normal-case tracking-normal text-pink">
                  {m.links.length} {m.links.length === 1 ? "mentee" : "mentees"} · {m.mentions} {m.mentions === 1 ? "mention" : "mentions"}
                </sup>
                <ul className="mt-1 space-y-1 text-sm">
                  {m.links.map((l) => {
                    const ep = episodeById(l.episode);
                    return (
                      <li key={l.mentee + l.episode}>
                        mentor to <EntityLink name={l.mentee}>{short(l.mentee)}</EntityLink> - {l.line} · S{ep.season}E{ep.episode}{" "}
                        <Timestamp episodeId={l.episode} time={l.time} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
