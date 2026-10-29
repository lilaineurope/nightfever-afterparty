import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { entityFor, totalMentions } from "@/data/entities";
import { MENTOR_LINKS, NOT_IN_HALL_OF_FAME } from "@/data/mentors";
import { episodeById, stageName } from "@/data/episodes";
import { MomentsBox, plainClick, type Moment } from "@/components/moments-box";

// Hall of Fame (Lisa, 28 Oct 2026; replaces "The names everyone drops"): the top 10 mentors of the scene - who took whom under
// their wing, as the guests tell it - ranked by how many people they mentored, then by how often they come up across every Afterparty.
const short = (n: string) => stageName(n).replace(/ \(as heard\)$/, "");

const mentors = (() => {
  const by = new Map<string, typeof MENTOR_LINKS>();
  for (const l of MENTOR_LINKS) {
    if (NOT_IN_HALL_OF_FAME.has(l.mentor)) continue;
    by.set(l.mentor, [...(by.get(l.mentor) ?? []), l]);
  }
  return [...by.entries()]
    .map(([name, links]) => {
      const e = entityFor(name);
      return { name, links, slug: e?.slug, link: e?.link, mentions: e ? totalMentions(e) : 0 };
    })
    .sort((a, b) => b.links.length - a.links.length || b.mentions - a.mentions || a.name.localeCompare(b.name))
    .slice(0, 10);
})();

// Tap a name and a box opens under the names, like the Library covers (Lisa, 29 Oct 2026): who they took under their wing,
// each moment with its episode and playable timestamp; the name stays a link to the A–Z card (cmd/ctrl-click opens it).
const momentsOfMentor = (links: typeof MENTOR_LINKS): Moment[] =>
  links.map((l) => {
    const ep = episodeById(l.episode);
    return { episodeId: ep.id, code: `S${ep.season}E${ep.episode}`, guest: ep.guest, time: l.time, context: `${short(l.mentee)}: ${l.line}` };
  });

export function HallOfFame() {
  const [open, setOpen] = useState<string | null>(null);
  const sel = mentors.find((m) => m.name === open);
  return (
    <section className="px-6 pb-16 pt-6" aria-labelledby="hall-of-fame">
      <div className="mx-auto max-w-6xl">
        <h2 id="hall-of-fame" className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">Hall of Fame</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          The top 10 mentors of the scene - the people who took the guests under their wing, as they tell it on the show. Tap a name to see who they took under their wing.
        </p>
        <p className="mt-5 font-[family-name:var(--font-flyer)] text-2xl uppercase leading-[1.5] sm:text-[30px]">
          {mentors.map((m, i) => (
            <span key={m.name} title={`Mentor to ${m.links.map((l) => short(l.mentee)).join(", ")}`}>
              {i > 0 && <span className="text-pink"> / </span>}
              {m.slug ? (
                <Link
                  to="/explore/$slug"
                  params={{ slug: m.slug }}
                  aria-expanded={open === m.name}
                  onClick={(ev) => {
                    if (!plainClick(ev)) return;
                    ev.preventDefault();
                    setOpen((o) => (o === m.name ? null : m.name));
                  }}
                  className={`transition hover:text-pink sm:whitespace-nowrap ${open === m.name ? "text-pink" : ""}`}
                >
                  {short(m.name)}
                </Link>
              ) : (
                <span className="sm:whitespace-nowrap">{short(m.name)}</span>
              )}
              <sup className="ml-1 font-[family-name:var(--font-mono-body)] text-[11px] normal-case tracking-normal text-pink">
                {m.links.length} {m.links.length === 1 ? "mentee" : "mentees"} · {m.mentions} {m.mentions === 1 ? "mention" : "mentions"}
              </sup>
            </span>
          ))}
        </p>
        {sel?.slug && (
          <div className="mt-6">
            <MomentsBox
              name={short(sel.name)}
              slug={sel.slug}
              mentions={sel.mentions}
              moments={momentsOfMentor(sel.links)}
              link={sel.link}
              note={<>Mentor to {sel.links.map((l) => short(l.mentee)).join(", ")}</>}
              onClose={() => setOpen(null)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
