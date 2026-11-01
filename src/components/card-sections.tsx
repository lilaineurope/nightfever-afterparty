import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { EntityBox, plainClick } from "@/components/moments-box";
import { ClubNightPlaylist } from "@/components/club-night";
import { clubNightFor } from "@/data/club-nights";
import { MusicPlayer } from "@/components/music-player";
import { Timestamp } from "@/components/episode-player";
import { entityBySlug, entityFor, episodeShort, relatedTo, type Entity } from "@/data/entities";
import { namedOn } from "@/lib/name-links";
import { episodeById, episodePath } from "@/data/episodes";
import { cardTo } from "@/lib/card-link";
import { EntityText } from "@/components/entity-text";
import { EntityLink } from "@/components/entity-link";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chipOn = "rounded-full border border-pink bg-pink px-3 py-1 text-xs text-pink-foreground transition";
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

/** Everything an A–Z card shows under its header (/explore/<slug>). A guest with an AFTERPARTY gets GuestAboutBox on the
 *  episode page instead. */
export function CardSections({ e }: { e: Entity }) {
  const related = relatedTo(e);
  const refs = e.refs;
  const named = namedOn(e);

  return (
    <>
      <MusicPlayer slug={e.slug} />
      {clubNightFor(e.slug) && <ClubNightPlaylist night={clubNightFor(e.slug)!} />}
      <GuestBox e={e} />

      {refs.length > 0 && (
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

/** Rough year for sorting a guest timeline label ("1980s", "late 1970s", "2025"). */
const yearOf = (label: string) => {
  const m = label.match(/(\d{4})/);
  if (!m) return 9999;
  const y = Number(m[1]);
  return /late/i.test(label) ? y + 7 : /mid/i.test(label) ? y + 5 : /early/i.test(label) ? y + 2 : y;
};

/** A row of name chips where a plain tap opens the Library-style box underneath (cmd/ctrl-click still follows the link). */
function TapChips({ items, group, open, setOpen }: {
  items: { slug: string; label: ReactNode }[];
  group: string;
  open: string | null;
  setOpen: (v: string | null) => void;
}) {
  const opened = items.find((x) => open === `${group}:${x.slug}`);
  const entity = opened ? entityBySlug[opened.slug] : undefined;
  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((x) => {
          const key = `${group}:${x.slug}`;
          return entityBySlug[x.slug] ? (
            <Link key={key} {...cardTo(x.slug)} aria-expanded={open === key}
              onClick={(ev) => { if (!plainClick(ev)) return; ev.preventDefault(); setOpen(open === key ? null : key); }}
              className={open === key ? chipOn : chip}>
              {x.label}
            </Link>
          ) : (
            <span key={key} className={chip}>{x.label}</span>
          );
        })}
      </div>
      {entity && <div className="mt-4"><EntityBox entity={entity} onClose={() => setOpen(null)} /></div>}
    </>
  );
}

/** One page per guest (Lisa, 1 Nov 2026): everything from the guest's A–Z card in ONE box above the Mood of the episode -
 *  their timeline merged with the scene timeline, what they are doing now, scenes & rooms, connections, the other
 *  AFTERPARTIES that name them, the cards that name them and the gang. Every name chip opens the Library-style box
 *  underneath (tap-to-open, src/components/moments-box.tsx). */
export function GuestAboutBox({ e, episode }: { e: Entity; episode: string }) {
  const g = e.guest;
  const [open, setOpen] = useState<string | null>(null);
  if (!g) return null;
  const toChips = (slugs: string[]) =>
    [...new Set(slugs)].filter((s) => s && s !== e.slug).map((s) => ({ slug: s, label: entityBySlug[s]?.name ?? s }));
  const bySlug = (names: string[]) => names.map((n) => entityFor(n)?.slug ?? n);

  // The guest's own timeline lines are already scene events ("guest-<slug>-n"); show them once, then the other moments.
  type Row = { key: string; sort: number; when: string; title?: string; text: string; place?: string; chips: string[] };
  const rows: Row[] = [
    ...g.timeline.map((t, i) => ({ key: `t${i}`, sort: yearOf(t.year), when: t.year, text: t.text, chips: [] })),
    ...e.events
      .filter((ev) => !ev.id.startsWith(`guest-${g.slug}-`))
      .map((ev) => ({ key: ev.id, sort: ev.year, when: ev.when, title: ev.title, text: ev.text, place: ev.place, chips: [...ev.people, ...bySlug(ev.figures)] })),
  ].sort((a, b) => a.sort - b.sort);

  const others = e.refs.filter((r) => r.episode && r.episode !== episode);
  const named = namedOn(e);
  const rooms = toChips([...bySlug(g.scenes), ...relatedTo(e).map((x) => x.slug)]);

  return (
    <section className="grid gap-8 border-2 border-gold bg-card p-6 shadow-[6px_8px_0_var(--color-gold)] md:grid-cols-2">
      <div>
        <h3 className={h}>Timeline</h3>
        <ol className="mt-4 space-y-4 border-l border-gold/25 pl-5">
          {rows.map((r) => (
            <li key={r.key}>
              <p className="text-sm font-semibold text-gold">
                {r.when}
                {r.place && <span className="ml-2 text-xs font-normal uppercase tracking-wider text-pink">{r.place}</span>}
              </p>
              {r.title && <p className="mt-1 text-sm font-semibold text-card-foreground">{r.title}</p>}
              <p className="mt-1 text-sm text-card-foreground/80"><EntityText text={r.text} self={e.name} /></p>
              {r.chips.filter((s) => s !== e.slug).length > 0 && (
                <TapChips group={`tl-${r.key}`} items={toChips(r.chips)} open={open} setOpen={setOpen} />
              )}
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-6">
        {g.now && (
          <div>
            <h3 className={h}>What they are doing now</h3>
            <p className="mt-3 text-sm text-card-foreground/80"><EntityText text={g.now} /></p>
          </div>
        )}
        {rooms.length > 0 && (
          <div>
            {/* Scenes & rooms and the gang in one row (Lisa, 1 Nov 2026): her own scenes first, then everyone and everywhere around her. */}
            <h3 className={h}>Scenes, rooms &amp; the gang</h3>
            <TapChips group="rooms" items={rooms} open={open} setOpen={setOpen} />
          </div>
        )}
        {g.linkedTo.length > 0 && (
          <div>
            <h3 className={h}>Connected to</h3>
            <TapChips group="linked" items={toChips(g.linkedTo)} open={open} setOpen={setOpen} />
          </div>
        )}
        {others.length > 0 && (
          <div>
            <h3 className={h}>In the other AFTERPARTIES</h3>
            <ul className="mt-3 space-y-3">
              {others.map((r) => {
                const ep = episodeById(r.episode!);
                return (
                  <li key={`${r.episode}-${r.rank}`} className="text-sm text-muted-foreground">
                    <Link to={episodePath(ep.id)} className="font-semibold text-gold hover:text-pink">S{ep.season}E{ep.episode} · {ep.guest}</Link>
                    {r.time !== "On camera" && <>{" · "}<Timestamp episodeId={ep.id} time={r.time} className="text-xs" /></>}
                    {r.context && <>{" - "}<EntityText text={r.context} self={e.name} /></>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {named.length > 0 && (
          <div>
            <h3 className={h}>Also named in these episodes</h3>
            <TapChips group="named" items={[...new Map(named.map((x) => [x.entity.slug, x])).values()].map((x) => ({
              slug: x.entity.slug,
              label: <>{x.entity.name}{x.ref.episode && <span className="ml-1.5 opacity-70">{episodeShort(x.ref.episode)}</span>}</>,
            }))} open={open} setOpen={setOpen} />
          </div>
        )}
      </div>
    </section>
  );
}
