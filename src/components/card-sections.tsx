import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { EntityBox, MomentsBox, plainClick } from "@/components/moments-box";
import { ClubNightPlaylist } from "@/components/club-night";
import { clubNightFor } from "@/data/club-nights";
import { MusicPlayer } from "@/components/music-player";
import { Timestamp } from "@/components/episode-player";
import { entityBySlug, entityFor, episodeShort, guestOfEpisode, relatedTo, type Entity } from "@/data/entities";
import { namedOn } from "@/lib/name-links";
import { episodeById, episodePath, episodes } from "@/data/episodes";
import { MENTOR_LINKS, NOT_IN_HALL_OF_FAME, type MentorLink } from "@/data/mentors";
import { rankedMentors } from "@/lib/mentor-rank";
import { cardTo } from "@/lib/card-link";
import { EntityText } from "@/components/entity-text";
import { EntityLink } from "@/components/entity-link";

const h = "text-xs font-semibold uppercase tracking-[0.2em] text-pink";
const chipOn = "rounded-full border border-pink bg-pink px-3 py-1 text-xs text-pink-foreground transition";
const chip = "rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition hover:border-pink hover:bg-pink hover:text-pink-foreground";

/** The guest's own box: their timeline, what they are doing now, scenes and connections. */
function GuestBox({ e }: { e: Entity }) {
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
  const [openRow, setOpenRow] = useState<string | null>(null);
  if (!g) return null;
  const toChips = (slugs: string[]) =>
    [...new Set(slugs)].filter((s) => s && s !== e.slug).map((s) => ({ slug: s, label: entityBySlug[s]?.name ?? s }));
  const bySlug = (names: string[]) => names.map((n) => entityFor(n)?.slug ?? n);

  // The guest's own timeline lines are already scene events ("guest-<slug>-n"); show them once, then the other moments.
  type Row = { key: string; event: string | undefined; sort: number; when: string; title?: string; text: string; place?: string; chips: string[] };
  const rows: Row[] = [
    ...g.timeline.map((t, i) => ({ key: `t${i}`, event: e.events.some((ev) => ev.id === `guest-${g.slug}-${i}`) ? `guest-${g.slug}-${i}` : undefined, sort: yearOf(t.year), when: t.year, text: t.text, chips: [] })),
    ...e.events
      .filter((ev) => !ev.id.startsWith(`guest-${g.slug}-`))
      .map((ev) => ({ key: ev.id, event: ev.id, sort: ev.year, when: ev.when, title: ev.title, text: ev.text, place: ev.place, chips: [...ev.people, ...bySlug(ev.figures)] })),
  ].sort((a, b) => a.sort - b.sort);

  const order = (id?: string) => episodes.findIndex((x) => x.id === id);
  const elsewhere = [
    ...e.refs.filter((r) => r.episode && r.episode !== episode).map((r) => ({ r, via: undefined as Entity | undefined })),
    ...namedOn(e).filter((x) => x.ref.episode && x.ref.episode !== episode).map((x) => ({ r: x.ref, via: x.entity })),
  ].sort((a, b) => order(a.r.episode) - order(b.r.episode) || (a.via ? 1 : 0) - (b.via ? 1 : 0));
  const byEpisode = [...new Set(elsewhere.map((x) => x.r.episode!))].map((id) => ({ id, rows: elsewhere.filter((x) => x.r.episode === id) }));
  const isMe = (n: string) => entityFor(n.replace(/ \(as heard\)$/, ""))?.slug === e.slug;
  const asMentor = rankedMentors.findIndex((m) => isMe(m.name));
  const mentees = asMentor >= 0 ? rankedMentors[asMentor]!.links : [];
  const mentors = MENTOR_LINKS.filter((l) => isMe(l.mentee) && !NOT_IN_HALL_OF_FAME.has(l.mentor));
  const mentor = mentees.length || mentors.length
    ? { rank: asMentor + 1, mentees, mentors, mentions: asMentor >= 0 ? rankedMentors[asMentor]!.mentions : 0 }
    : undefined;

  const timelineBlock = (
      <div>
        <h3 className={h}>Timeline</h3>
        {/* One line per moment (Lisa, 1 Nov 2026); tap it and the Library-style box opens underneath with the whole story,
            the names (each opens its own box) and the link to the Timeline. */}
        <ol className="mt-4 space-y-1.5 border-l border-gold/25 pl-5">
          {rows.map((r) => {
            const on = openRow === r.key;
            const line = r.title ?? r.text.replace(/\.$/, "");
            return (
              <li key={r.key} className="text-sm">
                <button type="button" aria-expanded={on} onClick={() => setOpenRow(on ? null : r.key)}
                  className={`text-left hover:text-pink ${on ? "text-pink" : "text-card-foreground"}`}>
                  <span className="font-semibold text-gold">{r.when}</span>{" · "}{line}
                </button>
                {on && (
                  <div className="moments-box mt-3 border-2 border-gold bg-card p-5 text-left shadow-[6px_6px_0_var(--color-gold)]">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h4 className="text-xl font-bold uppercase text-cream">{line}</h4>
                      <button type="button" onClick={() => setOpenRow(null)} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-pink">Close ✕</button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{r.when}{r.place && <> · {r.place}</>}</p>
                    {r.title && <p className="mt-3 text-sm text-card-foreground/80"><EntityText text={r.text} self={e.name} /></p>}
                    {r.chips.filter((c) => c !== e.slug).length > 0 && (
                      <TapChips group={`tl-${r.key}`} items={toChips(r.chips)} open={open} setOpen={setOpen} />
                    )}
                    {r.event && (
                      <p className="mt-4 text-xs">
                        <Link to="/timeline" hash={`ev-${r.event}`} className="text-gold hover:text-pink">On the Timeline →</Link>
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
  );
  // Mentor direction (Lisa, 2 Nov 2026): the mentor score belongs to the one who took someone under their wing. So a page
  // shows "Mentor score" only for people this guest mentored; the people who mentored this guest get their own heading,
  // "Under the wing of", and count towards THEIR score, never this guest's.
  const mentorRow = (l: MentorLink, who: string, label?: string) => {
    const ep = episodeById(l.episode);
    return (
      <p key={`${l.mentor}-${l.mentee}-${l.episode}`} className="mt-2 text-sm text-muted-foreground">
        {label && <><span className="text-xs uppercase tracking-wider text-gold">{label}</span>{" "}</>}
        <EntityLink name={who.replace(/ \(as heard\)$/, "")} className="font-semibold text-card-foreground hover:text-pink" />
        {" · "}<Link to={episodePath(ep.id)} className="text-gold hover:text-pink">S{ep.season}E{ep.episode}</Link>
        {" "}<Timestamp episodeId={ep.id} time={l.time} className="text-xs" />{" - "}{l.line}
      </p>
    );
  };
  const mentorBlock = mentor ? (
    <div className="space-y-6">
      {mentor.rank > 0 && (
        <div>
          {/* Mentor score (Lisa, 1 Nov 2026): the Hall of Fame count - people this guest took under their wing, and mentions -
              with the rank among all mentors. Michael Alig stays out (NOT_IN_HALL_OF_FAME). */}
          <h3 className={h}>Mentor score</h3>
          <p className="mt-3 text-sm text-card-foreground">
            <span className="font-semibold text-pink">{mentor.mentees.length} {mentor.mentees.length === 1 ? "mentee" : "mentees"}</span>
            {" · "}{mentor.mentions} {mentor.mentions === 1 ? "mention" : "mentions"}
            {" · "}{mentor.rank <= 10 ? <Link to="/" hash="hall-of-fame" className="text-gold hover:text-pink">Hall of Fame #{mentor.rank}</Link> : `#${mentor.rank} of ${rankedMentors.length} mentors`}
          </p>
          {mentor.mentees.map((l) => mentorRow(l, l.mentee, "Took under their wing"))}
        </div>
      )}
      {mentor.mentors.length > 0 && (
        <div>
          <h3 className={h}>Under the wing of</h3>
          {mentor.mentors.map((l) => mentorRow(l, l.mentor))}
        </div>
      )}
    </div>
  ) : null;
  const othersBlock = elsewhere.length > 0 ? (
    <div>
            {/* "In the other AFTERPARTIES" and "Also named in these episodes" in one list (Lisa, 1 Nov 2026), episode by episode:
                the guest's own rows, then the other cards whose line names them (tap the name for its box). */}
            <h3 className={h}>In the other AFTERPARTIES</h3>
            <ul className="mt-3 space-y-1.5">
              {byEpisode.map(({ id, rows }) => {
                const ep = episodeById(id);
                const key = `ep:${id}`;
                const host = guestOfEpisode(id);
                const mentions = rows.filter((x) => !x.via).reduce((n, x) => n + x.r.mentions, 0);
                return (
                  <li key={id} className="text-sm">
                    <Link to={episodePath(ep.id)} aria-expanded={open === key}
                      onClick={(ev) => { if (!plainClick(ev)) return; ev.preventDefault(); setOpen(open === key ? null : key); }}
                      className={`font-semibold hover:text-pink ${open === key ? "text-pink" : "text-gold"}`}>
                      S{ep.season}E{ep.episode} · {ep.guest}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {" · "}{mentions > 0 ? `${mentions} mention${mentions === 1 ? "" : "s"}` : "named"}
                      {rows.length > 1 && ` · ${rows.length} moments`}
                    </span>
                    {open === key && (
                      <div className="mt-3">
                        <MomentsBox
                          name={`S${ep.season}E${ep.episode} · ${ep.guest}`}
                          slug={host?.slug ?? e.slug}
                          mentions={mentions}
                          moments={rows.map(({ r, via }) => ({
                            episodeId: ep.id, code: `S${ep.season}E${ep.episode}`, guest: ep.guest, time: r.time,
                            context: via ? `${via.name}: ${r.context}` : r.context,
                          }))}
                          note={`${e.name} in this AFTERPARTY`}
                          onClose={() => setOpen(null)}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
    </div>
  ) : null;

  return <div className="space-y-6 text-left">{timelineBlock}{mentorBlock}{othersBlock}</div>;
}
