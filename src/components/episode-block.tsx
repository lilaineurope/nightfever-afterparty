import { Link } from "@tanstack/react-router";
import { episodePath, type Episode } from "@/data/episodes";
import { Button } from "@/components/ui/button";
import { guestLine } from "@/data/guest-lines";
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
};



function formatDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
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
                      <span
                        key={t.name}
                        className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium text-gold"
                      >
                        {t.name}
                        <span className="ml-1.5 text-muted-foreground">
                          {t.mentions}x
                        </span>
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent"><Link
                      to={episodePath(ep.id)}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-pink bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                    >
                      Afterparty &rarr;
                    </Link></Button>
                    <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent"><a
                      href={ep.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-cream text-background border-2 border-cream transition hover:bg-pink hover:border-pink hover:text-pink-foreground px-5 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                    >
                      Watch on WOW
                    </a></Button>
                    <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent"><a
                      href={ep.listenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-cream text-background border-2 border-cream transition hover:bg-pink hover:border-pink hover:text-pink-foreground px-5 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                    >
                      Listen on Spotify
                    </a></Button>
                  </div>
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
  const photo = episodePortraits[ep.id];
  const line = guestLine(ep.id);
  return (
    <div className={`polaroid ${tilt} ${className}`}>
      <span className="polaroid-photo">
        {photo && <img src={photo} alt={ep.guest} width={1024} height={1024} loading="lazy" />}
      </span>
      <span className="mt-3.5 block text-xs uppercase">
        S{ep.season} · E{ep.episode}
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
