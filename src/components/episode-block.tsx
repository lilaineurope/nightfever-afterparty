import { formatDate } from "@/lib/time";
import { Link } from "@tanstack/react-router";
import { EntityLink } from "./entity-link";
import { afterpartyNumber, episodePath, stageName, type Episode } from "@/data/episodes";
import type { EpisodeStats } from "@/data/episode-stats";
import { guestLine } from "@/data/guest-lines";
import { episodeQuotes } from "@/data/quotes";
import { Timestamp } from "@/components/episode-player";
import "@fontsource/covered-by-your-grace/400.css";
import { episodePortraits, polaroidThumb } from "@/lib/polaroids";
import { QuoteName } from "@/components/quote-name";

export { episodePortraits, polaroidThumb };




// Quote note: the guest's line in pink pencil handwriting (an invented hand - never the guest's own), name typed underneath
function QuoteNote({ ep }: { ep: Episode }) {
  const q = episodeQuotes[ep.id];
  if (!q) return null;
  const n = q.quote.length;
  const size = n <= 50 ? "2.4rem" : n <= 85 ? "1.95rem" : "1.7rem";
  return (
    <figure className="mt-10 max-w-[480px] -rotate-1">
      <blockquote style={{ color: "#E2287F", fontFamily: "'Covered By Your Grace', cursive", fontSize: size, lineHeight: 1.25 }}>
        &ldquo;{q.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-4 font-type text-sm text-[#141414]">
        <span>- <QuoteName who={q.who ?? stageName(ep.guest)} episodeId={ep.id} /></span>
        <Timestamp episodeId={ep.id} time={q.time} />
      </figcaption>
    </figure>
  );
}

// The box totals come in as `stats` (episodeStats() on the Afterparty page, the server on the home page), so this file
// doesn't load every episode's rows (page weight, 17 Nov 2026).
export function EpisodeBlock({ ep, stats, showDates = false, headingLevel = 3 }: {
  ep: Episode;
  stats: EpisodeStats;
  showDates?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
              <article
                className="grid overflow-hidden rounded-3xl border border-gold/25 bg-card md:grid-cols-[1fr_1.3fr]"
              >
                <div className="flex items-center justify-center border-b border-border p-6 sm:p-10 md:border-b-0 md:border-r">
                  <Polaroid ep={ep} stats={stats} Heading={Heading} tilt={ep.episode % 2 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"} className="w-full max-w-[400px]" />
                </div>
                <div className="p-8">
                  {showDates && (
                    <div className="mb-5 text-xs leading-relaxed text-muted-foreground">
                      <p>On the Afterparty since {formatDate(ep.afterpartyPublished)}</p>
                      <p className="mt-1">First aired on WOW {formatDate(ep.released)}</p>
                    </div>
                  )}
                  <p className="text-base leading-relaxed text-card-foreground/85">
                    {ep.blurb}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {stats.top.map((t) => (
                      // Each name chip opens that name's A-Z card (Lisa, 23 Oct 2026)
                      <EntityLink
                        key={t.name}
                        name={t.name}
                        className="group rounded-full border border-gold/30 px-3 py-1 text-xs font-medium text-gold transition hover:border-pink hover:bg-pink hover:text-pink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                      >
                        {t.name}
                        <span className="ml-1.5 text-muted-foreground group-hover:text-pink-foreground">
                          {t.mentions}x
                        </span>
                      </EntityLink>
                    ))}
                  </div>
                  {/* Hover (Lisa, 23 Oct 2026): the fill turns to paper and the text stays readable in black ink */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={episodePath(ep.id)}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-pink bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-card hover:text-cream focus-visible:bg-card focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                    >
                      Afterparty &rarr;
                    </Link>
                    {/* Lisa, 28 Oct 2026: the Jukebox button replaces Watch on WOW / Listen on Spotify (both stay in the episode player bar). */}
                    <Link
                      to="/jukebox"
                      search={{ afterparty: ep.id }}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-cream bg-cream px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-card hover:text-cream focus-visible:bg-card focus-visible:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                    >
                      Turn on the AFTERPARTY JUKEBOX
                    </Link>
                  </div>
                  <QuoteNote ep={ep} />
                </div>
              </article>
  );
}

const CARD_TILT = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];

/** The polaroid (Lisa, 22 Oct 2026): the guest's polaroid photo on an instant-print card, with the season line, name,
 *  the guest's description line, and references (pink) and mentions (marker yellow) written in the white strip. */
function Polaroid({ ep, stats, Heading = "span", tilt = "", className = "" }: {
  ep: Episode;
  stats: EpisodeStats;
  Heading?: "h2" | "h3" | "span";
  tilt?: string;
  className?: string;
}) {
  const photo = polaroidThumb(ep.id, 512);
  const line = guestLine(ep.id);
  return (
    <div className={`polaroid ${tilt} ${className}`}>
      <span className="polaroid-photo">
        {photo && <img src={photo} alt={ep.guest} width={512} height={512} loading="lazy" />}
      </span>
      <span className="mt-3.5 flex items-baseline justify-between text-xs uppercase">
        <span>
          S{ep.season} · E{ep.episode}{ep.part}
        </span>
        {/* Afterparty number (Lisa, 23 Oct 2026): the order it went up on the fan page, James St. James = 1 -
            same font and size as the S · E line opposite */}
        <span aria-label={`Afterparty number ${afterpartyNumber(ep.id)}`}>
          {afterpartyNumber(ep.id)}
        </span>
      </span>
      <Heading className="mt-0.5 block font-[family-name:var(--font-flyer)] text-[26px] uppercase leading-tight">{ep.guest}</Heading>
      {line && <span className="mt-1.5 block text-[13.5px] leading-snug text-cream/75">{line}</span>}
      <span className="mt-2 block text-[13px]">
        <span className="bg-pink px-1 text-pink-foreground">{stats.references}</span> references ·{" "}
        <span className="bg-highlight px-1 text-cream">{stats.mentions}</span> mentions
      </span>
    </div>
  );
}

/** Home page "Latest Afterparties": the episode's polaroid; the whole card opens the episode. */
export function EpisodeCard({ ep, stats, index = 0 }: { ep: Episode; stats: EpisodeStats; index?: number }) {
  return (
    <Link
      to={episodePath(ep.id)}
      className={`polaroid-link block transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink ${CARD_TILT[index % CARD_TILT.length]}`}
    >
      <Polaroid ep={ep} stats={stats} />
    </Link>
  );
}
