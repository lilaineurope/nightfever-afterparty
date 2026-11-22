import { Link } from "@tanstack/react-router";
import { ClubNightPlaylist } from "@/components/club-night";
import { MusicPlayer } from "@/components/music-player";
import { Timestamp } from "@/components/episode-player";
import { episodeById, episodePath } from "@/data/episodes";
import { guestBySlug, type Guest } from "@/data/guests";
import { linkToSlug, useLinks } from "@/lib/link-index";
import type { CardView } from "@/lib/card-view";
import { EntityText } from "@/components/entity-text";
import { EntityLink } from "@/components/entity-link";

// The A–Z card's sections, drawn from the CardView the server sends with the page (src/lib/card-view.server.ts) - the card
// page never loads the whole A–Z (page weight, 16 Nov 2026). The episode header's About box lives in guest-about.tsx.

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";

/** The guest's own box: their timeline, what they are doing now, scenes and connections. */
function GuestBox({ g }: { g: Guest | undefined }) {
  const links = useLinks();
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
            {g.linkedTo.map((s) => <EntityLink key={s} name={s} className={chip}>{links.cardForSlug(s)?.name ?? s}</EntityLink>)}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

/** Everything an A–Z card shows under its header (/explore/<slug>). A guest with an AFTERPARTY gets GuestAboutBox on the
 *  episode page instead. */
export function CardSections({ v, skipRefs = false, skipEvents = false }: { v: CardView; skipRefs?: boolean; skipEvents?: boolean }) {
  const links = useLinks();
  const related = v.related;
  // A club page shows its theme nights and parties in their own boxes above (club-parts.tsx), not again here.
  const refs = v.parts ? v.refs.filter((r) => !v.parts!.names.includes(r.name)) : v.refs;
  const named = v.named;

  return (
    <>
      <MusicPlayer item={v.music} />
      {v.night && <ClubNightPlaylist night={v.night} />}
      <GuestBox g={v.guest ? guestBySlug[v.guest] : undefined} />

      {/* A diary page shows every moment in full above (src/components/diary.tsx), so the short list would only repeat it -
          and a Library item page shows each moment in its "Who dropped it" box (Lisa, 21 Nov 2026: too messy twice). */}
      {refs.length > 0 && !v.diary && !skipRefs && (
        <section>
          {/* No per-episode count line under the heading (Lisa, 30 Oct 2026): each box below already says its mentions. */}
          <h2 className={h}>In the episodes</h2>
          <ul className="mt-4 space-y-3">
            {refs.map((r) => {
              const ep = episodeById(r.episode ?? "s06e01");
              return (
                <li key={`${r.episode}-${r.rank}`} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link to={episodePath(ep.id)} className="font-semibold text-gold hover:text-pink">
                      S{ep.season}E{ep.episode}{ep.part} · {ep.guest}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {r.time === "On camera" ? "On camera" : <Timestamp episodeId={ep.id} time={r.time} />}
                      {" · "}{r.mentions === 0 ? "—" : `${r.mentions} mention${r.mentions === 1 ? "" : "s"} in this episode`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground"><EntityText text={r.context} self={v.name} /></p>
                  {r.fashion && (
                    <p className="mt-2 text-sm text-muted-foreground"><span className="mr-2 text-xs font-medium uppercase text-gold">Fashion</span><EntityText text={r.fashion} self={v.name} /></p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {v.events.length > 0 && !skipEvents && (
        <section>
          <h2 className={h}>On the scene timeline</h2>
          <ol className="mt-4 space-y-5 border-l border-gold/25 pl-5">
            {v.events.map((ev) => (
              <li key={ev.id}>
                <p className="text-xs uppercase tracking-wider text-pink">
                  {ev.when} · <EntityLink name={ev.place.split(",")[0]!} className="hover:text-gold">{ev.place}</EntityLink>
                </p>
                <h3 className="mt-1 font-semibold text-gold">{ev.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground"><EntityText text={ev.text} /></p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ev.people.map((p) => <EntityLink key={p} name={p} className={chip}>{links.cardForSlug(p)?.name ?? p}</EntityLink>)}
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
              <Link key={`${x.slug}-${x.episode}`} {...linkToSlug(links, x.slug)} className={chip}>
                {x.name}
                {x.episode && <span className="ml-1.5 text-muted-foreground">{x.short}</span>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {v.inGuestStories.length > 0 && (
        <section>
          <h2 className={h}>Pops up in the guests' stories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {v.inGuestStories.map((x) => <EntityLink key={x.slug} name={x.slug} className={chip}>{x.name}</EntityLink>)}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className={h}>In the same rooms (aka the gang)</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((x) => (
              <Link key={x.slug} {...linkToSlug(links, x.slug)} className={chip}>{x.name}</Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
