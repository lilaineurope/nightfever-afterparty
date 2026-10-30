import { Link } from "@tanstack/react-router";
import { KIND_LABEL, playlistUrl, type ClubNight } from "@/data/club-nights";

/** "A night at <club> sounded like this" on the club's A–Z card (Lisa, 30 Oct 2026): a taster - the club night itself lives in the
 *  Jukebox (/jukebox?club=<slug>), where every song plays with why it is here and its sources. */
export function ClubNightPlaylist({ night }: { night: ClubNight }) {
  const first = night.songs.slice(0, 5);
  return (
    <section aria-labelledby="club-night" className="border-2 border-gold bg-card p-6 shadow-[6px_6px_0_var(--color-pink)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Club night · {night.songs.length} songs · {night.sources.length} sources</p>
      <h2 id="club-night" className="mt-2 text-2xl font-bold tracking-tight text-cream sm:text-3xl">
        A night at {night.club} sounded like this
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{night.note}</p>
      <ol className="mt-5 space-y-1.5 text-sm">
        {first.map((s) => (
          <li key={`${s.title}-${s.artist}`}>
            <b className="text-cream">{s.title}</b> <span className="text-muted-foreground">· {s.artist} ({s.year}) · {KIND_LABEL[s.kind]}</span>
          </li>
        ))}
        {night.songs.length > first.length && <li className="text-muted-foreground">+ {night.songs.length - first.length} more</li>}
      </ol>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link to="/jukebox" search={{ club: night.slug }} className="rounded-full bg-pink px-5 py-2 text-sm font-semibold text-pink-foreground transition hover:bg-cream hover:text-background">
          ▶ Turn on the AFTERPARTY JUKEBOX - every song with its sources
        </Link>
        {night.playlistId && (
          <a href={playlistUrl(night.playlistId)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/60 px-4 py-1.5 text-sm font-semibold text-gold transition hover:border-pink hover:bg-pink hover:text-pink-foreground">
            Spotify ↗
          </a>
        )}
        {night.youtubePlaylist && (
          <a href={night.youtubePlaylist} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/60 px-4 py-1.5 text-sm font-semibold text-gold transition hover:border-pink hover:bg-pink hover:text-pink-foreground">
            YouTube ↗
          </a>
        )}
      </div>
    </section>
  );
}
