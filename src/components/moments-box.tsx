import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Timestamp } from "@/components/episode-player";
import { EntityText } from "@/components/entity-text";
import { linkPlace } from "@/lib/link-label";
import { episodeById, episodePath } from "@/data/episodes";
import { totalMentions, type Entity } from "@/data/entities";

// The "tap it and a box opens underneath" panel (Lisa, 29 Oct 2026): first made for the Library covers, now shared by the
// Library, Everything A–Z and the Jukebox strips - the name, how often it's dropped, every moment it comes up (episode,
// playable timestamp, the line) and the links to its A–Z card and the outside page.

export type Moment = { episodeId: string; code: string; guest: string; time: string; context: string };

/** Every timestamped moment a name comes up in the Afterparties, in episode order of the index. */
export function momentsOf(e: Entity): Moment[] {
  return e.refs
    .filter((r) => r.episode)
    .map((r) => {
      const ep = episodeById(r.episode as string);
      return { episodeId: ep.id, code: `S${ep.season}E${ep.episode}`, guest: ep.guest, time: r.time, context: r.context };
    });
}

const afterparties = (n: number) => `${n} ${n === 1 ? "Afterparty" : "Afterparties"}`;

export function MomentsBox({
  name,
  slug,
  mentions,
  moments,
  link,
  note,
  extra,
  onClose,
}: {
  name: string;
  slug: string;
  mentions: number;
  moments: Moment[];
  link?: string | undefined;
  /** Small extra words for the line under the name (e.g. a cover credit, "Night Fever guest"). */
  note?: ReactNode | undefined;
  /** Extra links at the bottom (e.g. "Find a copy on Open Library"). */
  extra?: ReactNode | undefined;
  onClose: () => void;
}) {
  const eps = new Set(moments.map((m) => m.episodeId)).size;
  return (
    <div className="moments-box border-2 border-gold bg-card p-5 text-left shadow-[6px_6px_0_var(--color-gold)] sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-2xl font-bold uppercase text-cream">
          <Link to="/explore/$slug" params={{ slug }} className="hover:text-pink">{name}</Link>
        </h3>
        <button type="button" onClick={onClose} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-pink">Close ✕</button>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {mentions > 0 ? `${mentions} mention${mentions === 1 ? "" : "s"}` : "implied"} · {afterparties(eps)}
        {note && <> · {note}</>}
      </p>
      {moments.length > 0 && (
        <ul className="mt-4 space-y-2">
          {moments.map((m) => (
            <li key={m.episodeId + m.time + m.context.slice(0, 12)} className="text-sm text-muted-foreground">
              <Link to={episodePath(m.episodeId as never)} className="font-medium text-gold hover:text-pink">{m.code} · {m.guest}</Link>
              {m.time && m.time !== "On camera" && <>{" · "}<Timestamp episodeId={m.episodeId} time={m.time} className="text-xs" /></>}
              {m.context && <>{" - "}<EntityText text={m.context} /></>}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <Link to="/explore/$slug" params={{ slug }} className="text-gold hover:text-pink">Its A–Z card →</Link>
        {link && <a href={link} target="_blank" rel="noreferrer" className="text-gold hover:text-pink">Read more {linkPlace(link)} ↗</a>}
        {extra}
      </div>
    </div>
  );
}

/** The same box for any A–Z entity (Everything A–Z, Jukebox strips). */
export function EntityBox({ entity, onClose }: { entity: Entity; onClose: () => void }) {
  const guest = entity.guest;
  return (
    <MomentsBox
      name={entity.name}
      slug={entity.slug}
      mentions={totalMentions(entity)}
      moments={momentsOf(entity)}
      link={entity.link}
      note={guest ? "Night Fever guest" : entity.category}
      onClose={onClose}
    />
  );
}

/** A plain click opens the box; cmd/ctrl/shift/middle clicks still follow the link to the card. */
export const plainClick = (e: { metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; button: number }) =>
  !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0;
