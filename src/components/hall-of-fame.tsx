import { linkToSlug, useLinks } from "@/lib/link-index";
import type { HomeView } from "@/lib/home-view";
import { Link } from "@tanstack/react-router";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import type { MentorLink } from "@/data/mentors";
import { episodeById, stageName } from "@/data/episodes";
import { MomentsBox, plainClick, type Moment } from "@/components/moments-box";
import { KIND_LABEL, points } from "@/lib/mentor-tree";

// Hall of Fame (Lisa, 28 Oct 2026; replaces "The names everyone drops"): the top 10 mentors of the scene, as the guests tell it.
// Scored since 21 Nov 2026 (Lisa) by the people they lifted, stood by and opened doors for, the voices who tell it and their
// family tree - src/lib/mentor-rank.ts; the rules are explained on /hall-of-fame-rules ("How this is calculated").
const short = (n: string) => stageName(n).replace(/ \(as heard\)$/, "");

// Tap a name and a box opens under the names, like the Library covers (Lisa, 29 Oct 2026): who they took under their wing,
// each moment with its episode and playable timestamp; the name stays a link to the A–Z card (cmd/ctrl-click opens it).
const momentsOfMentor = (links: MentorLink[]): Moment[] =>
  links.map((l) => {
    const ep = episodeById(l.episode);
    return { episodeId: ep.id, code: `S${ep.season}E${ep.episode}${ep.part ?? ""}`, guest: ep.guest, time: l.time, context: `${KIND_LABEL[l.kind ?? "lifted"]} ${short(l.mentee)}: ${l.line}` };
  });

// The top 10 come from the server with the home page (src/lib/home-view.server.ts, page weight 17 Nov 2026).
export function HallOfFame({ mentors }: { mentors: HomeView["mentors"] }) {
  const links = useLinks();
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
          The top 10 mentors of the scene - the people who lifted others, stood by them and opened doors for them, as the guests tell it on the show. Tap a name to see who they helped.{" "}
          <Link to="/hall-of-fame-rules" className="whitespace-nowrap font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:text-pink">How this is calculated →</Link>
        </p>
        <div className="mt-5 flex flex-wrap items-baseline font-[family-name:var(--font-flyer)] text-2xl uppercase leading-[1.5] sm:text-[30px]">
          {mentors.map((m, i) => (
            <Fragment key={m.name}>
              <span
                ref={(el) => {
                  items.current[i] = el;
                }}
                className="min-w-0"
                title={`Helped ${m.people.map((p) => short(p.name)).join(", ")}`}
              >
                {m.slug ? (
                  <Link
                    {...linkToSlug(links, m.slug)}
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
                  {points(m.score)} points · {m.people.length} helped
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
                    note={<>{points(sel.score)} points · helped {sel.people.map((p) => short(p.name)).join(", ")}</>}
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
