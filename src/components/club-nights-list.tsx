import { Link } from "@tanstack/react-router";
import { CLUB_NIGHTS, playlistUrl } from "@/data/club-nights";

/** The Jukebox's "Clubs" category: one card per club night, linking to the club's own card with every song and source. */
export function ClubNightsList() {
  return (
    <div>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        What the clubs the guests talk about actually played - built only from documented DJ lists, recorded sets,
        club albums and live shows, with every song's source on the club's page.
      </p>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {CLUB_NIGHTS.map((c) => (
          <li key={c.slug} className="flex flex-col rounded-2xl border border-pink/30 bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">{c.songs.length} songs</p>
            <Link to="/explore/$slug" params={{ slug: c.slug }} className="mt-1 text-lg font-semibold text-cream hover:text-pink">
              A night at {c.club}
            </Link>
            <ul className="mt-3 flex-1 space-y-1 text-sm text-muted-foreground">
              {c.songs.slice(0, 4).map((s) => (
                <li key={s.spotify ?? s.title}>{s.title} <span className="opacity-70">· {s.artist}</span></li>
              ))}
              <li className="opacity-70">+ {c.songs.length - 4} more</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link to="/explore/$slug" params={{ slug: c.slug }} className="font-semibold text-gold hover:text-pink">Songs &amp; sources &rarr;</Link>
              {c.playlistId && (
                <a href={playlistUrl(c.playlistId)} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:text-pink">Spotify ↗</a>
              )}
              {c.youtubePlaylist && (
                <a href={c.youtubePlaylist} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:text-pink">YouTube ↗</a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
