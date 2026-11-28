import { abs, jsonLd, pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import tablePic from "@/assets/afterparty-table.webp";
import tablePhone from "@/assets/afterparty-table-phone.webp";
import { episodes, SEASONS } from "@/data/episodes";
import { EpisodeBlock } from "@/components/episode-block";
import { episodeStats } from "@/data/episode-stats";
import "@/lib/full-links"; // the boxes' top names link to their cards (src/lib/link-index.tsx)
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/episodes/")({
  staticData: { sitemap: true },
  // Named "Night Fever AFTERPARTY", never "Night Fever podcast" (Lisa, 27 Nov 2026: "it should be called night fever
  // afterparty so it doesn't compete with night fever podcast original"). Google gets this page as our collection of
  // AFTERPARTY pages ABOUT the podcast - not as the podcast itself, which stays World of Wonder's.
  head: () => ({
    ...pageHead({ path: "/episodes", title: "Night Fever AFTERPARTY – every episode, timestamped", description: "My fan AFTERPARTY for every Night Fever episode - every name, club, song and look the guests drop, counted and timestamped. Most mentioned AFTERPARTY first!", image: "/og/episodes.jpg" }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Night Fever AFTERPARTY",
        url: abs("/episodes"),
        about: { "@type": "PodcastSeries", name: "Night Fever", url: "https://www.wowpresentsplus.com/night-fever" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: byMostMentioned.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${e.guest} - Night Fever AFTERPARTY S${e.season}E${e.episode}${e.part ?? ""}`,
            url: abs(`/episodes/${e.id}`),
          })),
        },
      }),
    ],
  }),
  component: EpisodesPage,
});


/** S06E01 James St. James, the host in the guest chair: always first on the AFTERPARTY page (Lisa, 28 Nov 2026). */
const PINNED_ON_TOP = "s06e01";

// Most mentioned first (Lisa, 28 Nov 2026): ranked by the mentions on each polaroid (every timestamped mention in
// that AFTERPARTY, episodeStats), with the host's own episode, S06E01 James St. James, always pinned on top.
const byMostMentioned = [...episodes].sort(
  (a, b) =>
    Number(b.id === PINNED_ON_TOP) - Number(a.id === PINNED_ON_TOP) ||
    episodeStats(b.id).mentions - episodeStats(a.id).mentions ||
    a.season - b.season ||
    a.episode - b.episode,
);

function EpisodesPage() {
  const [season, setSeason] = useState<number | null>(null);
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
        <p className="timeline-tag">Every name, club, song, book and look - to the minute you hear it. Most mentioned AFTERPARTY first.</p>
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
                className="season-chip rounded-full disabled:cursor-not-allowed disabled:opacity-40">
                {s === null ? <span className="uppercase">Everything</span> : `Season ${s}`}
                <span className="ml-1.5 text-xs text-pink">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {byMostMentioned.filter((ep) => season === null || ep.season === season).map((ep) => (
            <EpisodeBlock key={ep.id} ep={ep} stats={episodeStats(ep.id)} showDates headingLevel={2} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
