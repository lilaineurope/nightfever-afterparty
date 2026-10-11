import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SHOW_URL, WOW_URL } from "@/data/guests";
import { EntityText } from "@/components/entity-text";
import { LegalNote } from "@/components/legal-links";
import { EpisodeNetwork } from "@/components/episode-network";

export const Route = createFileRoute("/connections")({
  component: ConnectionsPage,
  head: () => ({
    meta: [
      { title: "Episode Connections — Night Fever Afterparty" },
      { name: "description", content: "All timestamped people mentioned in the published Night Fever episode indexes, connected by shared episode appearances." },
      { property: "og:title", content: "Episode Connections — Night Fever Afterparty" },
      { property: "og:description", content: "Explore people across published episode indexes with mention counts and timestamp evidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/connections" }],
  }),
});

function ConnectionsPage() {
  return <main className="min-h-screen bg-background text-foreground">
    <section className="disco-grid px-6 pb-10 pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-5xl font-bold leading-none text-cream text-glow sm:text-6xl">Everyone knows <span className="text-pink text-glow-pink">everyone</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">The names in the published episode stories, connected by their appearances in the same episode.</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">Shared mentions are not proof of a personal relationship or a shared night.</p>
      </div>
    </section>
    <EpisodeNetwork />
      <footer className="border-t border-border px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Fan page for{" "}
          <a
            href={SHOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
          >
            <em>Night Fever</em>
          </a>{" "}
          by{" "}
          <a
            href={WOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline decoration-gold/50 underline-offset-2 transition hover:text-pink"
          >
            World of Wonder
          </a>.{" "}
          <Link to="/" className="text-gold transition hover:text-pink">
            Home
          </Link>{" "}
          &middot;{" "}
          <Link
            to="/timeline"
            className="text-gold transition hover:text-pink"
          >
            Timeline
          </Link>{" "}
          &middot;{" "}
          <Link to="/about" className="text-gold transition hover:text-pink">
            About
          </Link>
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-xs text-muted-foreground/60">
          <EntityText text="Connections drawn only from timestamped person references in the published episode indexes. Not affiliated with World of Wonder or the Night Fever podcast." />
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center">
          <LegalNote />
        </p>
      </footer>
  </main>;
}
