import { Link } from "@tanstack/react-router";
import { ClubNightPlaylist } from "@/components/club-night";
import { clubNightFor } from "@/data/club-nights";
import { MusicPlayer } from "@/components/music-player";
import { Timestamp } from "@/components/episode-player";
import { entityBySlug, episodeShort, relatedTo, type Entity } from "@/data/entities";
import { namedOn } from "@/lib/name-links";
import { episodeById, episodePath } from "@/data/episodes";
import { cardTo } from "@/lib/card-link";
import { EntityText } from "@/components/entity-text";
import { EntityLink } from "@/components/entity-link";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";

/** The guest's own box: their timeline, what they are doing now, scenes and connections. */
export function GuestBox({ e }: { e: Entity }) {
  const g = e.guest;
  if (!g) return null;
  return (
    <section className="grid gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-2">
      <div>
        <h2 className={h}>Timeline</h2>
        <ol className="mt-4 space-y-4 border-l border-gold/25 pl-5">
          {g.timeline.map((t) => (
            <li key={t.year}>
              <p className="text-sm font-semibold text-gold">{t.year}</p>
              <p className="mt-1 text-sm text-card-foreground/80"><EntityText text={t.text} /></p>
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-6">
        {g.now && (
        <div>
          <h2 className={h}>What they are doing now</h2>
          <p className="mt-3 text-sm text-card-foreground/80"><EntityText text={g.now} /></p>
        </div>
        )}
        {g.scenes.length > 0 && (
        <div>
          <h2 className={h}>Scenes &amp; rooms</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {g.scenes.map((s) => <EntityLink key={s} name={s} className={chip} />)}
          </div>
        </div>
        )}
        {g.linkedTo.length > 0 && (
        <div>
          <h2 className={h}>Connected to</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {g.linkedTo.map((s) => <EntityLink key={s} name={s} className={chip}>{entityBySlug[s]?.name ?? s}</EntityLink>)}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

/** Everything an A–Z card shows under its header. Shared by /explore/<slug> and, for a guest, their AFTERPARTY page
 *  (one page per guest, Lisa 1 Nov 2026). On the episode page `episode` is that AFTERPARTY: its own rows are left out
 *  of "In the episodes" (the reference list above already has them) and the guest box is shown separately. */
export function CardSections({ e, episode }: { e: Entity; episode?: string }) {
  const related = relatedTo(e);
  const refs = episode ? e.refs.filter((r) => r.episode !== episode) : e.refs;
  const named = namedOn(e);

  return (
    <>
      <MusicPlayer slug={e.slug} />
      {clubNightFor(e.slug) && <ClubNightPlaylist night={clubNightFor(e.slug)!} />}
      {!episode && <GuestBox e={e} />}

      {refs.length > 0 && (
        <section>
          {/* No per-episode count line under the heading (Lisa, 30 Oct 2026): each box below already says its mentions. */}
          <h2 className={h}>{episode ? "In the other AFTERPARTIES" : "In the episodes"}</h2>
          <ul className="mt-4 space-y-3">
            {refs.map((r) => {
              const ep = episodeById(r.episode ?? "s06e01");
              return (
                <li key={`${r.episode}-${r.rank}`} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link to={episodePath(ep.id)} className="font-semibold text-gold hover:text-pink">
                      S{ep.season}E{ep.episode} · {ep.guest}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {r.time === "On camera" ? "On camera" : <Timestamp episodeId={ep.id} time={r.time} />}
                      {" · "}{r.mentions === 0 ? "—" : `${r.mentions} mention${r.mentions === 1 ? "" : "s"} in this episode`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground"><EntityText text={r.context} self={e.name} /></p>
                  {r.fashion && (
                    <p className="mt-2 text-sm text-muted-foreground"><span className="mr-2 text-xs font-medium uppercase text-gold">Fashion</span><EntityText text={r.fashion} self={e.name} /></p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {e.events.length > 0 && (
        <section>
          <h2 className={h}>On the scene timeline</h2>
          <ol className="mt-4 space-y-5 border-l border-gold/25 pl-5">
            {e.events.map((ev) => (
              <li key={ev.id}>
                <p className="text-xs uppercase tracking-wider text-pink">
                  {ev.when} · <EntityLink name={ev.place.split(",")[0]!} className="hover:text-gold">{ev.place}</EntityLink>
                </p>
                <h3 className="mt-1 font-semibold text-gold">{ev.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground"><EntityText text={ev.text} /></p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ev.people.map((p) => <EntityLink key={p} name={p} className={chip}>{entityBySlug[p]?.name ?? p}</EntityLink>)}
                  {ev.figures.map((f) => <EntityLink key={f} name={f} className={chip} />)}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {named.length > 0 && (
        <section>
          <h2 className={h}>Also named on these cards</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {named.map((x) => (
              <Link key={`${x.entity.slug}-${x.ref.episode}`} {...cardTo(x.entity.slug)} className={chip}>
                {x.entity.name}
                {x.ref.episode && <span className="ml-1.5 text-muted-foreground">{episodeShort(x.ref.episode)}</span>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {e.inGuestStories.length > 0 && (
        <section>
          <h2 className={h}>Pops up in the guests' stories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {e.inGuestStories.map((x) => <EntityLink key={x.slug} name={x.slug} className={chip}>{x.name}</EntityLink>)}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className={h}>In the same rooms (aka the gang)</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((x) => (
              <Link key={x.slug} {...cardTo(x.slug)} className={chip}>{x.name}</Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
