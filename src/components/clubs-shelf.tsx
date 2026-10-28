import { Link } from "@tanstack/react-router";
import { CLUB_NIGHTS, playlistUrl } from "@/data/club-nights";
import { clubsMentioned } from "@/data/collections";

/** The three club playlists and every club mentioned on Night Fever (Clubkid Culture page; moved from the Jukebox, Lisa 29 Oct 2026). */
export function ClubsShelf() {
  const chosen = new Set(CLUB_NIGHTS.map((c) => c.slug));
  return (
    <div className="jbx-clubs">
      <ul className="jbx-clubcards">
        {CLUB_NIGHTS.map((c) => (
          <li key={c.slug}>
            <p className="jbx-np">CLUB PLAYLIST · {c.songs.length} SONGS</p>
            <Link to="/explore/$slug" params={{ slug: c.slug }} className="jbx-clubname">{c.club}</Link>
            <ul>
              {c.songs.slice(0, 4).map((s) => (
                <li key={s.spotify ?? s.title}>
                  {s.title} <span>· {s.artist}</span>
                </li>
              ))}
              <li><span>+ {c.songs.length - 4} more</span></li>
            </ul>
            <div className="jbx-clublinks">
              <Link to="/explore/$slug" params={{ slug: c.slug }}>Songs &amp; sources →</Link>
              {c.playlistId && (
                <a href={playlistUrl(c.playlistId)} target="_blank" rel="noopener noreferrer">Spotify ↗</a>
              )}
              {c.youtubePlaylist && (
                <a href={c.youtubePlaylist} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
              )}
            </div>
          </li>
        ))}
      </ul>
      <h2 className="jbx-h2">Every club mentioned on Night Fever <small>{clubsMentioned.length}</small></h2>
      <ol className="jbx-clublist">
        {clubsMentioned.map((c) => (
          <li key={c.slug} className={chosen.has(c.slug) ? "chosen" : ""}>
            <Link to="/explore/$slug" params={{ slug: c.slug }}>{c.name}</Link>
            <small>
              {c.episodes > 1 ? `${c.episodes} episodes` : "1 episode"}
              {c.mentions > 0 ? ` · ${c.mentions}×` : ""}
            </small>
          </li>
        ))}
      </ol>
    </div>
  );
}
