import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { episodeById, episodePath } from "@/data/episodes";
import type { Ref } from "@/data/entities";
import type { ClubPartsView } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";

/** One episode row: what was said, then the episode and the play-from time in the site's usual style (as "In the episodes"). */
function Said({ r, name }: { r: Ref; name: string }) {
  const ep = episodeById(r.episode ?? "s06e01");
  return (
    <div className="text-sm">
      <p className="text-card-foreground/85">
        <EntityText text={r.context} self={name} />
      </p>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-xs">
        <Link to={episodePath(ep.id)} className="font-semibold text-gold hover:text-pink">
          S{ep.season}E{ep.episode}{ep.part} · {ep.guest}
        </Link>
        {r.time && r.time !== "On camera" && <Timestamp episodeId={ep.id} time={r.time} />}
      </p>
    </div>
  );
}

/** A club's theme nights and parties on its own page (Lisa, 22 Nov 2026: "everything area should be all on one page",
 *  for every club page). Layout B, one framed list per group with a pink line by each night (Lisa picked it, 22 Nov 2026). */
export function ClubPartsSections({ p, name }: { p: ClubPartsView; name: string }) {
  return (
    <>
      {p.groups.map((g) => (
        <section key={g.heading} className="rounded-2xl border-2 border-[#111] bg-card p-6 shadow-[6px_7px_0_#111]">
          <h2 className={h}>{name}'s {g.heading.toLowerCase()}</h2>
          {g.intro.length > 0 && (
            <div className="mt-3 space-y-3">
              {g.intro.map((r) => <Said key={`${r.episode}-${r.rank}`} r={r} name={name} />)}
            </div>
          )}
          <dl className="mt-5 grid gap-x-8 gap-y-5 md:grid-cols-2">
            {g.parts.map((x) => (
              <div key={x.title} className="border-l-4 border-pink pl-4">
                <dt className="font-[family-name:var(--font-flyer)] text-xl uppercase leading-tight text-foreground">{x.title}</dt>
                <dd className="mt-2 space-y-3">
                  {x.refs.map((r) => <Said key={`${r.episode}-${r.rank}`} r={r} name={name} />)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      {p.looks.length > 0 && (
        <section className="text-center">
          <h2 className={h}>Looks at {name}</h2>
          <div className="mt-3 flex flex-wrap justify-center gap-2">{p.looks.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>
        </section>
      )}
    </>
  );
}
