import { cardTo } from "@/lib/card-link";
import { Link } from "@tanstack/react-router";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { entityFor, totalMentions } from "@/data/entities";
import { MENTOR_LINKS } from "@/data/mentors";
import { rankedMentors } from "@/lib/mentor-rank";
import { episodeById, stageName } from "@/data/episodes";
import { MomentsBox, plainClick, type Moment } from "@/components/moments-box";

// Hall of Fame (Lisa, 28 Oct 2026; replaces "The names everyone drops"): the top 10 mentors of the scene - who took whom under
// their wing, as the guests tell it - ranked by how many people they mentored, then by how often they come up across every Afterparty.
const short = (n: string) => stageName(n).replace(/ \(as heard\)$/, "");

const mentors = rankedMentors.slice(0, 10);

// Tap a name and a box opens under the names, like the Library covers (Lisa, 29 Oct 2026): who they took under their wing,
// each moment with its episode and playable timestamp; the name stays a link to the A–Z card (cmd/ctrl-click opens it).
const momentsOfMentor = (links: typeof MENTOR_LINKS): Moment[] =>
  links.map((l) => {
    const ep = episodeById(l.episode);
    return { episodeId: ep.id, code: `S${ep.season}E${ep.episode}`, guest: ep.guest, time: l.time, context: `${short(l.mentee)}: ${l.line}` };
  });

export function HallOfFame() {
  const [open, setOpen] = useState<string | null>(null);
  // The box opens right under the line of the tapped name, like a Library cover opens under its row (Lisa, 1 Nov 2026):
  // find the last name on that line (same top edge), and put the box straight after it.
  const items = useRef<(HTMLSpanElement | null)[]>([]);
  const [rowEnd, setRowEnd] = useState(-1);
  const openIdx = mentors.findIndex((m) => m.name === open);
  useLayoutEffect(() => {
    if (openIdx < 0) return setRowEnd(-1);
    const measure = () => {
      const top = items.current[openIdx]?.offsetTop ?? 0;
      let end = openIdx;
      while (end + 1 < mentors.length && (items.current[end + 1]?.offsetTop ?? -1) === top) end++;
      setRowEnd(end);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [openIdx]);
  const sel = openIdx >= 0 ? mentors[openIdx] : undefined;
  return (
    <section className="px-6 pb-16 pt-6" aria-labelledby="hall-of-fame">
      <div className="mx-auto max-w-6xl">
        <h2 id="hall-of-fame" className="border-b-[3px] border-gold pb-2 text-4xl sm:text-[44px]">Hall of Fame</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          The top 10 mentors of the scene - the people who took the guests under their wing, as they tell it on the show. Tap a name to see who they took under their wing.
        </p>
        <div className="mt-5 flex flex-wrap items-baseline font-[family-name:var(--font-flyer)] text-2xl uppercase leading-[1.5] sm:text-[30px]">
          {mentors.map((m, i) => (
            <Fragment key={m.name}>
              <span
                ref={(el) => {
                  items.current[i] = el;
                }}
                className="min-w-0"
                title={`Mentor to ${m.links.map((l) => short(l.mentee)).join(", ")}`}
              >
                {m.slug ? (
                  <Link
                    {...cardTo(m.slug)}
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
                {i < mentors.length - 1 && <span className="whitespace-pre text-pink"> / </span>}
              </span>
              {sel?.slug && i === rowEnd && (
                <div className="my-4 basis-full font-[family-name:var(--font-type)] text-base normal-case leading-normal tracking-normal">
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
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
