import { Link } from "@tanstack/react-router";
import { Timestamp } from "@/components/episode-player";
import { EntityLink } from "@/components/entity-link";
import { EntityText } from "@/components/entity-text";
import { episodeById, episodePath } from "@/data/episodes";
import type { Ref } from "@/data/entities";
import type { ClubPartsView } from "@/lib/card-view";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";
const TILT = [-1.5, 1, -0.5, 1.5, -1, 0.5];

/** Which layout the club page uses for its theme nights and parties (mockups for Lisa, 22 Nov 2026). */
export const PARTS_LAYOUT: "tiles" | "list" = "tiles";

function Said({ r, name, dark }: { r: Ref; name: string; dark?: boolean }) {
  const ep = episodeById(r.episode ?? "s06e01");
  const code = `S${ep.season}E${ep.episode}${ep.part ?? ""}`;
  return (
    <div className="text-sm">
      <p className={dark ? "text-[#111]" : "text-card-foreground/85"}>
        <EntityText text={r.context} self={name} {...(dark ? { className: "font-semibold underline decoration-dotted underline-offset-2 hover:text-pink" } : {})} />
      </p>
      <p className={`mt-1 flex flex-wrap items-center gap-x-2 text-xs ${dark ? "text-[#555]" : "text-muted-foreground"}`}>
        <Link to={episodePath(ep.id)} className="font-semibold hover:text-pink">
          {code} · {ep.guest}
        </Link>
        {r.time && r.time !== "On camera" && <Timestamp episodeId={ep.id} time={r.time} />}
      </p>
    </div>
  );
}

/** A club's theme nights and parties on its own page (Lisa, 22 Nov 2026: "everything area should be all on one page"). */
export function ClubPartsSections({ p, name }: { p: ClubPartsView; name: string }) {
  return (
    <>
      {p.groups.map((g) =>
        PARTS_LAYOUT === "tiles" ? (
          <section key={g.heading}>
            <h2 className={`${h} text-center`}>{name}'s {g.heading.toLowerCase()}</h2>
            {g.intro.length > 0 && (
              <div className="mx-auto mt-4 max-w-2xl space-y-3 text-center">
                {g.intro.map((r) => <Said key={`${r.episode}-${r.rank}`} r={r} name={name} />)}
              </div>
            )}
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {g.parts.map((x, i) => (
                <article
                  key={x.title}
                  className="relative border-2 border-[#111] bg-[#f6f0ea] p-5 pt-7 text-[#111] shadow-[5px_6px_0_#111]"
                  style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
                >
                  <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-[rgba(240,230,200,.9)] shadow" />
                  <h3 className="-mx-5 bg-pink px-5 py-1 break-words font-[family-name:var(--font-flyer)] text-xl uppercase leading-tight text-pink-foreground">{x.title}</h3>
                  <div className="mt-3 space-y-3">
                    {x.refs.map((r) => <Said key={`${r.episode}-${r.rank}`} r={r} name={name} dark />)}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
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
                  <dt className="font-[family-name:var(--font-flyer)] text-xl uppercase text-foreground">{x.title}</dt>
                  <dd className="mt-2 space-y-3">
                    {x.refs.map((r) => <Said key={`${r.episode}-${r.rank}`} r={r} name={name} />)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ),
      )}
      {p.looks.length > 0 && (
        <section className="text-center">
          <h2 className={h}>Looks at {name}</h2>
          <div className="mt-3 flex flex-wrap justify-center gap-2">{p.looks.map((x) => <EntityLink key={x} name={x} className={chip} />)}</div>
        </section>
      )}
    </>
  );
}
