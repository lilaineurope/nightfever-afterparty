import { Link } from "@tanstack/react-router";
import { episodePath, type Episode } from "@/data/episodes";
import { Button } from "@/components/ui/button";
import diannePortrait from "@/assets/block-dianne-brill.jpg";
import mustoPortrait from "@/assets/block-michael-musto.jpg";
import jamesPortrait from "@/assets/block-james-st-james.jpg";

const episodePortraits: Record<string, string> = {
  s01e01: diannePortrait,
  s01e02: mustoPortrait,
  s06e01: jamesPortrait,
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
}

export function EpisodeBlock({ ep, showDates = false, headingLevel = 3 }: {
  ep: Episode;
  showDates?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const portrait = episodePortraits[ep.id];
  return (
              <article
                className="grid overflow-hidden rounded-3xl border border-gold/25 bg-card md:grid-cols-[1fr_1.3fr]"
              >
                <div className="relative min-h-[440px] overflow-hidden border-b border-border p-8 md:border-b-0 md:border-r">
                  {portrait && <img src={portrait} alt="" aria-hidden="true" width={1024} height={1024} loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-right" />}
                  <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/10" aria-hidden="true" />
                  <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Season {ep.season} &middot; Episode {ep.episode}
                  </p>
                  <Heading className="mt-3 text-4xl font-bold leading-[1] tracking-tight text-cream text-glow">
                    {ep.guest}
                  </Heading>
                  <p className="mt-5 text-sm text-cream/90">
                    {ep.runtime} &middot; {ep.references} tagged references
                    &middot; {ep.mentions} mentions in this episode
                  </p>
                  </div>
                </div>
                <div className="p-8">
                  {showDates && (
                    <div className="mb-5 text-xs leading-relaxed text-muted-foreground">
                      <p>Afterparty publish date {formatDate(ep.afterpartyPublished)}</p>
                      <p className="mt-1">WOW publishing date {formatDate(ep.released)}</p>
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
                          {t.mentions} here
                        </span>
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent"><Link
                      to={episodePath(ep.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                    >
                      Timestamp &rarr;
                    </Link></Button>
                    <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent"><a
                      href={ep.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      Watch the episode
                    </a></Button>
                    <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent"><a
                      href={ep.listenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      Listen to the episode
                    </a></Button>
                  </div>
                </div>
              </article>
  );
}
