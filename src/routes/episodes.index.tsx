import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import tablePic from "@/assets/afterparty-table.webp";
import tablePhone from "@/assets/afterparty-table-phone.webp";
import { episodes, SEASONS } from "@/data/episodes";
import { EpisodeBlock } from "@/components/episode-block";
import { LegalLinks } from "@/components/legal-links";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/episodes/")({
  staticData: { sitemap: true },
  head: () => pageHead({ path: "/episodes", title: "Night Fever Afterparty – every episode's names, clubs & looks", description: "Every Night Fever episode I've unpacked - every name, club, song and look the guests drop, counted and timestamped. Newest Afterparty first!", image: "/og/episodes.jpg" }),
  component: EpisodesPage,
});


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
    <main
      className="page-sky min-h-screen bg-background text-foreground"
      style={{ "--sky": `url(${tablePic})`, "--sky-phone": `url(${tablePhone})` } as CSSProperties}
    >
      {/* Header (Lisa, 29 Oct 2026, "A1"): the table after the party - a Gemini picture in the photocopy halftone, fading after
          the tagline (scripts/page-headers/fade.py), with the flyer strips. */}
      <section className="page-head px-4 text-center">
        <h1 className="timeline-title">
          <span className="timeline-strip timeline-strip-ink">Every episode</span>
          <br />
          <span className="timeline-strip timeline-strip-pink">unpacked &amp; timestamped</span>
        </h1>
        <p className="timeline-tag">Every name, club, song, book and look - to the minute you hear it. Newest Afterparty first.</p>
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
                title={count === 0 ? "No Afterparty for this season yet" : undefined}
                className={`az-st az-cat ${s === null ? "az-ink" : ["az-pink", "az-yellow", "az-paper"][(s - 1) % 3]} disabled:cursor-not-allowed disabled:opacity-40`}>
                {s === null ? "Everything" : `Season ${s}`}
                <small>{count}</small>
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

      <SiteFooter />
    </main>
  );
}
