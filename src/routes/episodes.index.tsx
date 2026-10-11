import { createFileRoute } from "@tanstack/react-router";
import { episodes } from "@/data/episodes";
import { EpisodeBlock } from "@/components/episode-block";
import { LegalLinks } from "@/components/legal-links";

export const Route = createFileRoute("/episodes/")({
  head: () => ({
    meta: [
      { title: "Episodes — Night Fever fan page" },
      {
        name: "description",
        content:
          "Every tagged Night Fever episode, listed by afterparty publish date, newest first: each guest, every name, place and look mentioned, counted and timestamped.",
      },
      { property: "og:title", content: "Episodes — Night Fever fan page" },
      {
        property: "og:description",
        content:
          "Every tagged Night Fever episode, listed by afterparty publish date, newest first: each guest, every name, place and look mentioned, counted and timestamped.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EpisodesPage,
});

function EpisodesPage() {
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
      <section className="disco-grid px-6 pb-16 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink">
            Episodes
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-cream text-glow sm:text-6xl">
            Every episode, <span className="text-gold">timestamped</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Each episode becomes an index: every name, place, song, book and
            look that comes up, counted by how often it is mentioned and
            linked to the moment you can hear it.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold/80">
            Listed by afterparty publish date, newest first
          </p>
        </div>
      </section>

      {/* Episode list */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {byAfterpartyPublishDate.map((ep) => (
            <EpisodeBlock key={ep.id} ep={ep} showDates headingLevel={2} />
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="mx-auto max-w-2xl text-xs text-muted-foreground">
          <LegalLinks />
        </p>
      </footer>
    </main>
  );
}
