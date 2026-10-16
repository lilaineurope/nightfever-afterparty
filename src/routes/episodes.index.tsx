import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { episodes } from "@/data/episodes";
import { EpisodeBlock } from "@/components/episode-block";
import { LegalLinks } from "@/components/legal-links";
import episodesBackground from "@/assets/episodes-reference-collage-refined.jpg";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/episodes/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Afterparty | Night Fever fan page" },
      {
        name: "description",
        content:
          "Every Night Fever episode I've unpacked - every name, club, song and look the guests drop, counted and timestamped. Newest afterparty first!",
      },
      { property: "og:title", content: "Afterparty | Night Fever fan page" },
      {
        property: "og:description",
        content:
          "Every Night Fever episode I've unpacked - every name, club, song and look the guests drop, counted and timestamped. Newest afterparty first!",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EpisodesPage,
});

const SEASONS = [1, 2, 3, 4, 5, 6];

function EpisodesPage() {
  const [season, setSeason] = useState<number | null>(null);
  // Ranked by afterparty publish date: the connection published here most
  // recently comes first. This is the date the index went live on this site,
  // not the date the episode was published at WOW Presents Plus.
  const byAfterpartyPublishDate = [...episodes].sort(
    (a, b) =>
      b.afterpartyPublished.localeCompare(a.afterpartyPublished) ||
      b.season - a.season ||
      b.episode - a.episode,
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden px-6 pb-16 pt-24 sm:min-h-[560px]">
        <img src={episodesBackground} alt="Illustrated collage of nightlife people, clubs, books and music mentioned across the indexed episodes" width={1920} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink">
            Afterparty
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
            Every episode - <span className="text-gold">unpacked &amp; timestamped</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-cream/90 sm:text-lg">
            I kept hitting pause - so you don't have to! Every episode gets its
            own index: every name, club, song, book and look the guests drop,
            counted and linked to the exact minute you hear it. Pick an episode,
            grab a drink and dive in!
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold/80">
            Newest afterparty first
          </p>
        </div>
      </section>

      {/* Episode list */}
      <section className="px-6 pb-24">
        <div className="mx-auto mb-8 flex max-w-5xl flex-wrap justify-center gap-2" role="group" aria-label="Filter by season">
          {[null, ...SEASONS].map((s) => {
            const count = s === null ? episodes.length : episodes.filter((ep) => ep.season === s).length;
            const on = season === s;
            return (
              <button key={s ?? "all"} type="button" aria-pressed={on} disabled={count === 0}
                onClick={() => setSeason(s)}
                title={count === 0 ? "No afterparty for this season yet" : undefined}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  on
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border text-muted-foreground hover:border-pink hover:text-pink"
                } disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground`}>
                {s === null ? "All seasons" : `Season ${s}`}
                <span className={`ml-1.5 text-xs ${on ? "" : "text-pink"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {byAfterpartyPublishDate.filter((ep) => season === null || ep.season === season).map((ep) => (
            <EpisodeBlock key={ep.id} ep={ep} showDates headingLevel={2} />
          ))}
        </div>
      </section>

      <SiteFooter />    </main>
  );
}
