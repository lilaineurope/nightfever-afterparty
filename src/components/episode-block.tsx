import { formatDate } from "@/lib/time";
import { Link } from "@tanstack/react-router";
import { EntityLink } from "./entity-link";
import { afterpartyNumber, episodePath, type Episode } from "@/data/episodes";
import { guestLine } from "@/data/guest-lines";
import { episodeQuotes } from "@/data/quotes";
import { Timestamp } from "@/components/episode-player";
import "@fontsource/covered-by-your-grace/400.css";
import diannePortrait from "@/assets/polaroid-dianne-brill.jpg";
import mustoPortrait from "@/assets/polaroid-michael-musto.jpg";
import jamesPortrait from "@/assets/polaroid-james-st-james.jpg";
import fieldPortrait from "@/assets/polaroid-patricia-field.jpg";
import bartschPortrait from "@/assets/polaroid-susanne-bartsch.jpg";
import edelsteinPortrait from "@/assets/polaroid-lisa-edelstein.jpg";
import richiePortrait from "@/assets/polaroid-richie-rich.jpg";
import makosPortrait from "@/assets/polaroid-christopher-makos.jpg";
import goodePortrait from "@/assets/polaroid-eric-goode.jpg";
import piperPortrait from "@/assets/polaroid-rudolf-piper.jpg";
import valentiDynellPortrait from "@/assets/polaroid-chi-chi-valenti-johnny-dynell.jpg";
import eganPortrait from "@/assets/polaroid-nick-egan.jpg";
import magnusonPortrait from "@/assets/polaroid-ann-magnuson.jpg";
import signorilePortrait from "@/assets/polaroid-michelangelo-signorile.jpg";
import leporePortrait from "@/assets/polaroid-amanda-lepore.jpg";
import norwichPortrait from "@/assets/polaroid-william-norwich.jpg";
import schmidtPortrait from "@/assets/polaroid-michael-schmidt.jpg";
import gatienPortrait from "@/assets/polaroid-peter-gatien.jpg";
import haskellPortrait from "@/assets/polaroid-nikki-haskell.jpg";
import randallPortrait from "@/assets/polaroid-sally-randall.jpg";
import ariasPortrait from "@/assets/polaroid-joey-arias.jpg";
import teePortrait from "@/assets/polaroid-larry-tee.jpg";
import zaldyPortrait from "@/assets/polaroid-zaldy.jpg";
import visagePortrait from "@/assets/polaroid-michelle-visage.jpg";
import waltpaperPortrait from "@/assets/polaroid-waltpaper.jpg";
import jennyPortrait from "@/assets/polaroid-jenny-talia.jpg";
import conniePortrait from "@/assets/polaroid-connie-fleming.jpg";
import missGuyPortrait from "@/assets/polaroid-miss-guy.jpg";
import nellPortrait from "@/assets/polaroid-nell-campbell.jpg";
import bochPortrait from "@/assets/polaroid-richard-boch.jpg";
import luisPortrait from "@/assets/polaroid-luis-camacho.jpg";
import manPortrait from "@/assets/polaroid-man-parrish.jpg";
import treyPortrait from "@/assets/polaroid-trey-speegle.jpg";
import tishSnookyPortrait from "@/assets/polaroid-tish-and-snooky.jpg";
import seidelmanPortrait from "@/assets/polaroid-susan-seidelman.jpg";
import erniePortrait from "@/assets/polaroid-ernie-glam.jpg";
import lincolnPortrait from "@/assets/polaroid-lincoln-palsgrove-iv.jpg";
import lindaPortrait from "@/assets/polaroid-linda-simpson.jpg";
import kevinPortrait from "@/assets/polaroid-kevin-aviance.jpg";
import bebePortrait from "@/assets/polaroid-bebe-buell.jpg";
import marthaPortrait from "@/assets/polaroid-martha-wash.jpg";

export const episodePortraits: Record<string, string> = {
  s01e01: diannePortrait,
  s01e02: mustoPortrait,
  s01e03: edelsteinPortrait,
  s02e03: bartschPortrait,
  s03e01: fieldPortrait,
  s04e08: richiePortrait,
  s05e06: makosPortrait,
  s03e06: goodePortrait,
  s01e07: piperPortrait,
  s06e01: jamesPortrait,
  s06e03: valentiDynellPortrait,
  s05e04: eganPortrait,
  s04e10: magnusonPortrait,
  s02e08: signorilePortrait,
  s05e03: leporePortrait,
  s06e08: norwichPortrait,
  s02e06: schmidtPortrait,
  s01e04: gatienPortrait,
  s02e04: haskellPortrait,
  s06e07: randallPortrait,
  s01e10: ariasPortrait,
  s03e08: teePortrait,
  s04e04: zaldyPortrait,
  s02e01: visagePortrait,
  s01e06: waltpaperPortrait,
  s02e07: jennyPortrait,
  s02e05: conniePortrait,
  s03e10: missGuyPortrait,
  s05e01: nellPortrait,
  s02e11: bochPortrait,
  s01e08: luisPortrait,
  s03e04: manPortrait,
  s04e07: treyPortrait,
  s05e10: tishSnookyPortrait,
  s04e09: seidelmanPortrait,
  s01e05: erniePortrait,
  s06e06: lincolnPortrait,
  s02e09: lindaPortrait,
  s03e03: kevinPortrait,
  s04e03: bebePortrait,
  s03e02: marthaPortrait,
};

// Small WebP copies of the polaroids (scripts/polaroid-thumbs.py): 512px for the polaroid boxes, 240px for the tiny ones.
// The full 1024px JPEG stays only where the photo fills the episode page header - so lists stay light on phones.
const FULL_POLAROIDS = import.meta.glob("../assets/polaroid-*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const POLAROID_THUMBS = import.meta.glob("../assets/polaroid-thumbs/*.webp", { eager: true, import: "default" }) as Record<string, string>;

/** The guest's polaroid at a small size (falls back to the full photo if the thumbnail hasn't been made yet). */
export function polaroidThumb(id: string, size: 512 | 240): string | undefined {
  const full = episodePortraits[id];
  if (!full) return undefined;
  const key = Object.keys(FULL_POLAROIDS).find((k) => FULL_POLAROIDS[k] === full);
  const name = key?.split("/").pop()?.replace(/\.jpg$/, "");
  return (name && POLAROID_THUMBS[`../assets/polaroid-thumbs/${name}-${size}.webp`]) || full;
}




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
        <span>- {q.who ?? ep.guest}</span>
        <Timestamp episodeId={ep.id} time={q.time} />
      </figcaption>
    </figure>
  );
}

export function EpisodeBlock({ ep, showDates = false, headingLevel = 3 }: {
  ep: Episode;
  showDates?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
              <article
                className="grid overflow-hidden rounded-3xl border border-gold/25 bg-card md:grid-cols-[1fr_1.3fr]"
              >
                <div className="flex items-center justify-center border-b border-border p-6 sm:p-10 md:border-b-0 md:border-r">
                  <Polaroid ep={ep} Heading={Heading} tilt={ep.episode % 2 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"} className="w-full max-w-[400px]" />
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
                    {ep.top.map((t) => (
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
function Polaroid({ ep, Heading = "span", tilt = "", className = "" }: {
  ep: Episode;
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
          S{ep.season} · E{ep.episode}
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
        <span className="bg-pink px-1 text-pink-foreground">{ep.references}</span> references ·{" "}
        <span className="bg-highlight px-1 text-cream">{ep.mentions}</span> mentions
      </span>
    </div>
  );
}

/** Home page "Latest Afterparties": the episode's polaroid; the whole card opens the episode. */
export function EpisodeCard({ ep, index = 0 }: { ep: Episode; index?: number }) {
  return (
    <Link
      to={episodePath(ep.id)}
      className={`polaroid-link block transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink ${CARD_TILT[index % CARD_TILT.length]}`}
    >
      <Polaroid ep={ep} />
    </Link>
  );
}
