import { createFileRoute, Link } from "@tanstack/react-router";
import { episodePath, episodes } from "@/data/episodes";
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

function formatReleased(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

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
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {byAfterpartyPublishDate.map((ep) => (
            <div
              key={ep.id}
              className="rounded-3xl border border-gold/25 bg-card p-8 transition hover:border-gold/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Season {ep.season} &middot; Episode {ep.episode}
                </p>
                <p className="text-xs text-muted-foreground">
                  Afterparty publish date {formatReleased(ep.afterpartyPublished)} &middot; {ep.runtime}
                </p>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-cream text-glow">
                {ep.guest}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-card-foreground/85">
                {ep.blurb}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {ep.references} tagged references &middot; {ep.mentions}{" "}
                mentions in this episode
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
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
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={episodePath(ep.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-pink px-5 py-2.5 text-sm font-semibold text-pink-foreground transition hover:bg-pink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
                >
                  Afterparty connection &rarr;
                </Link>
                <a
                  href={ep.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Watch the episode
                </a>
                <a
                  href={ep.listenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-gold-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Listen to the episode
                </a>
              </div>
            </div>
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
