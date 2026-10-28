import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { KIND_LABEL, playlistUrl, trackUrl, type ClubNight } from "@/data/club-nights";
import { TEXT_LINK } from "@/lib/styles";


/** "A night at <club> sounded like this" on the club's A–Z card: every song, why it is here and its sources.
 *  Spotify's player loads only after "Play it here" is pressed (and only once the playlist exists). */
export function ClubNightPlaylist({ night }: { night: ClubNight }) {
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);
  const byKey = Object.fromEntries(night.sources.map((s) => [s.key, s]));
  const kinds = [...new Set(night.songs.map((s) => s.kind))];
  const shown = all ? night.songs : night.songs.slice(0, 10);

  return (
    <section aria-labelledby="club-night" className="rounded-2xl border border-pink/40 bg-card p-6 shadow-[0_0_30px_rgba(236,72,153,0.12)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Club night · {night.songs.length} songs</p>
      <h2 id="club-night" className="mt-2 text-2xl font-bold tracking-tight text-cream sm:text-3xl">
        A night at {night.club} sounded like this
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{night.note}</p>

      {(night.playlistId || night.youtubePlaylist) && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {night.playlistId && !open && (
            <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-pink px-4 py-1.5 text-sm font-semibold text-pink-foreground hover:opacity-90">
              ▶ Play it here
            </button>
          )}
          {night.playlistId && (
            <a href={playlistUrl(night.playlistId)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/60 px-4 py-1.5 text-sm font-semibold text-gold transition hover:border-pink hover:text-pink">
              Follow the playlist on Spotify ↗
            </a>
          )}
          {night.youtubePlaylist && (
            <a href={night.youtubePlaylist} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/60 px-4 py-1.5 text-sm font-semibold text-gold transition hover:border-pink hover:text-pink">
              The AFTERPARTY playlist on YouTube ↗
            </a>
          )}
        </div>
      )}
      {open && night.playlistId && (
        <iframe
          title={`A night at ${night.club} - Spotify playlist`}
          src={`https://open.spotify.com/embed/playlist/${night.playlistId}?theme=0`}
          className="mt-4 h-[352px] w-full rounded-xl border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}

      <ol className="mt-6 divide-y divide-border/60 border-y border-border/60">
        {shown.map((s, i) => (
          <li key={s.spotify ?? s.title} className="grid grid-cols-[2rem_1fr] gap-x-2 py-3 sm:grid-cols-[2rem_1fr_auto]">
            <span className="pt-0.5 text-right font-mono text-xs text-gold/70">{i + 1}</span>
            <div>
              <a href={s.spotify ? trackUrl(s.spotify) : s.youtube} target="_blank" rel="noopener noreferrer" className="font-semibold text-cream hover:text-pink">
                {s.title}
              </a>
              <span className="text-sm text-muted-foreground"> · {s.artist} ({s.year})</span>
              {s.why && <p className="mt-0.5 text-xs text-card-foreground/70">{s.why}</p>}
              {s.guest && (
                <Link to="/explore/$slug" params={{ slug: s.guest.slug }} className="mt-1 inline-block rounded-full border border-pink/50 px-2 py-0.5 text-[11px] font-semibold text-pink hover:bg-pink/10">
                  Night Fever guest: {s.guest.label} &rarr;
                </Link>
              )}
            </div>
            <div className="col-start-2 mt-1 flex flex-wrap items-center gap-1.5 sm:col-start-3 sm:mt-0 sm:justify-end">
              {kinds.length > 1 && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">{KIND_LABEL[s.kind]}</span>
              )}
              {s.sources.map((k) => (
                <a key={k} href={byKey[k]?.href} target="_blank" rel="noopener noreferrer" title={byKey[k]?.label} className="rounded-full border border-gold/40 px-1.5 py-0.5 font-mono text-[11px] text-gold hover:border-pink hover:text-pink">
                  {k}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ol>
      {night.songs.length > 10 && (
        <button type="button" onClick={() => setAll((v) => !v)} className="mt-3 text-sm font-semibold text-gold hover:text-pink">
          {all ? "Show fewer" : `Show all ${night.songs.length} songs`}
        </button>
      )}

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Sources</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {night.sources.map((s) => (
            <li key={s.key} className="text-muted-foreground">
              <span className="mr-2 inline-block w-5 rounded-full border border-gold/40 text-center font-mono text-[11px] text-gold">{s.key}</span>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
