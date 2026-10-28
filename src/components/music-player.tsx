import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jukebox, listenLinks } from "@/data/collections";

// Every song, record, band and artist card in Everything A–Z gets a player: Spotify's own embed, loaded only after the
// visitor presses play (nothing from Spotify loads before that - same as the Jukebox). Cards without a real Spotify id
// (ids are never guessed) get Spotify and YouTube search links instead.
const bySlug = new Map(jukebox.map((j) => [j.slug, j]));
const PLAYABLE_SHELVES = new Set(["songs", "artists", "stage"]);
export function MusicPlayer({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const j = bySlug.get(slug);
  if (!j || !PLAYABLE_SHELVES.has(j.shelf)) return null;
  const [, kind, id] = j.spotify?.split(":") ?? [];
  const search = listenLinks(j.name);
  const btn = "rounded-full border border-gold/60 px-4 py-1.5 text-sm font-semibold text-gold transition hover:border-pink hover:text-pink";
  return (
    <section aria-label={`Listen to ${j.name}`} className="rounded-2xl border border-pink/40 bg-card p-5 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Listen</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {kind && id && !open && (
          <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-pink px-5 py-2 text-sm font-semibold text-pink-foreground hover:opacity-90">
            ▶ Play {kind === "artist" ? "their music" : "it"} here
          </button>
        )}
        {kind && id ? (
          <a href={`https://open.spotify.com/${kind}/${id}`} target="_blank" rel="noopener noreferrer" className={btn}>
            Open on Spotify ↗
          </a>
        ) : (
          <>
            <a href={search.spotify} target="_blank" rel="noopener noreferrer" className={btn}>
              Find it on Spotify ↗
            </a>
            <a href={search.youtube} target="_blank" rel="noopener noreferrer" className={btn}>
              Find it on YouTube ↗
            </a>
          </>
        )}
        <Link to="/jukebox" className="text-sm text-gold underline underline-offset-2 hover:text-pink">
          Play the whole Jukebox →
        </Link>
      </div>
      {open && kind && id && (
        <iframe
          title={`${j.name} on Spotify`}
          src={`https://open.spotify.com/embed/${kind}/${id}?theme=0`}
          className={`mt-4 w-full rounded-xl border-0 ${kind === "track" ? "h-[152px]" : "h-[352px]"}`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      )}
      <p className="mt-3 text-[11px] leading-snug text-muted-foreground/80">
        {kind && id
          ? "Plays through Spotify's own player, which only loads when you press play. Not logged in to Spotify? You'll hear 30-second previews."
          : "Not on Spotify that I could find - these search links might turn it up."}
      </p>
    </section>
  );
}
