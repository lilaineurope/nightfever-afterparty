import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { episodeById, episodePath } from "@/data/episodes";
import type { Ref } from "@/data/entities";
import type { ClubPartsView } from "@/lib/card-view";
import { linkToSlug, useLinks } from "@/lib/link-index";
import { CoverFace } from "@/components/cover-face";

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
  const links = useLinks();
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
          {/* Each night has its own page (Lisa, 27 Nov 2026), and its box is a Library-style cover (28 Nov 2026). */}
          <ul className="map-next-grid mt-6">
            {g.parts.map((x) => {
              const r = x.refs[0];
              const ep = r?.episode ? episodeById(r.episode) : undefined;
              return (
                <li key={x.title}>
                  <Link {...linkToSlug(links, x.slug)} className="lib-hit block" aria-label={x.title}>
                    <CoverFace d={x.design} />
                  </Link>
                  <Link {...linkToSlug(links, x.slug)} className="mt-3 block font-semibold leading-snug text-[#111] transition-colors hover:text-pink">
                    {x.title}
                  </Link>
                  {ep && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      S{ep.season}E{ep.episode}{ep.part} · {ep.guest}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
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
