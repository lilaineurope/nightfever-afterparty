import { useState } from "react";
import { playlistUrl, type ClubNight } from "@/data/club-nights";

/** The club's own playlist on its A–Z card. Spotify's player loads only after "Play it here" is pressed. */
export function ClubNightPlaylist({ night, compact = false }: { night: ClubNight; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-2xl border border-pink/40 bg-card p-6 shadow-[0_0_30px_rgba(236,72,153,0.12)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Club night</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-cream">
        A night at {night.club} sounded like this
      </h2>
      {!compact && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{night.note}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!open && (
          <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-pink px-4 py-1.5 text-sm font-semibold text-pink-foreground hover:opacity-90">
            ▶ Play it here
          </button>
        )}
        <a href={playlistUrl(night.playlistId)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/60 px-4 py-1.5 text-sm font-semibold text-gold transition hover:border-pink hover:text-pink">
          {night.songs} songs on Spotify ↗
        </a>
      </div>
      {open && (
        <iframe
          title={`A night at ${night.club} - Spotify playlist`}
          src={`https://open.spotify.com/embed/playlist/${night.playlistId}?utm_source=generator&theme=0`}
          className="mt-4 h-[352px] w-full rounded-xl border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
      {!compact && night.sources.length > 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          Sources:{" "}
          {night.sources.map((s, i) => (
            <span key={s.href}>
              {i > 0 && " · "}
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-gold underline decoration-gold/40 underline-offset-2 hover:text-pink">{s.label}</a>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}
