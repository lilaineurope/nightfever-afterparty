import { Link } from "@tanstack/react-router";
import type { Guest } from "../data/guests";
import { episodePath, episodes } from "../data/episodes";

/**
 * The guest's episode buttons, shared by the Guests list and the guest's own card:
 * Timestamp (as soon as their Afterparty index is published), Watch and Listen.
 */
export function GuestEpisodeLinks({ guest, className = "" }: { guest: Guest; className?: string }) {
  const indexed = episodes.find((episode) => episode.guest === guest.name);
  const season = guest.episode.match(/Season (\d+)/)?.[1];
  const onWow = guest.episodeUrl.includes("wowpresentsplus");
  const onSpotify = guest.episodeUrl.includes("spotify.com");
  const watch =
    indexed?.watchUrl ??
    (onWow ? guest.episodeUrl : `https://www.wowpresentsplus.com/night-fever${season ? `/season:${season}` : ""}`);
  const listen =
    indexed?.listenUrl ??
    (onSpotify ? guest.episodeUrl : `https://open.spotify.com/search/${encodeURIComponent(`Night Fever ${guest.name}`)}/episodes`);
  return (
    <div className={className.includes("contents") ? className : `flex flex-wrap gap-3 ${className}`}>
      {indexed && (
        <Link
          to={episodePath(indexed.id)}
          className="inline-flex items-center gap-2 rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
        >
          Timestamp &rarr;
        </Link>
      )}
      <a
        href={watch}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-pink/50 px-5 py-2.5 text-sm font-semibold text-pink transition hover:bg-pink hover:text-pink-foreground"
      >
        Watch the episode
      </a>
      <a
        href={listen}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
      >
        Listen to the episode
      </a>
    </div>
  );
}
