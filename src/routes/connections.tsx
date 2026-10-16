import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { ConnectionsGraph } from "@/components/connections-graph";
import { SiteFooter } from "@/components/site-footer";
import { BestInFashion, PopularPlaces, TopTen } from "@/components/connections-blocks";
import { episodePeople } from "@/data/episode-connections";
export const Route = createFileRoute("/connections")({
  staticData: { sitemap: true },
  component: ConnectionsPage,
  head: () => ({
    meta: [
      { title: "Connections | Night Fever fan page" },
      {
        name: "description",
        content:
          "Who turns up with who?! A web of every name in my published Night Fever episode indexes, tied together by the episodes they share.",
      },
      {
        property: "og:title",
        content: "Connections | Night Fever fan page",
      },
      {
        property: "og:description",
        content:
          "Every timestamped name from my published Night Fever episode indexes - all in one web. Dive in!",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/connections" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/connections" }],
  }),
});

function ConnectionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-8 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Everyone knows{" "}
            <span className="text-pink text-glow-pink">everyone</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every episode is a pink star, and every name dropped in it floats
            around it. Names that turn up in more than one episode sit between
            the stars and tie them together - so exciting!
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Just so you know: a shared mention isn't proof they knew each other
            or shared a night.
          </p>
        </div>
      </section>
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <ClientOnly fallback={<div className="h-[70vh] rounded-3xl border border-gold/20 bg-card" />}>
            <ConnectionsGraph />
          </ClientOnly>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            I only draw connections from timestamped references in the published episode indexes.
          </p>
        </div>
      </section>
      <GreatConnectors />
      <PopularPlaces />
      <BestInFashion />
      <SiteFooter />
    </main>
  );
}

function GreatConnectors() {
  const connectors = episodePeople
    .filter((p) => p.episodeIds.length > 1)
    .sort((a, b) => b.episodeIds.length - a.episodeIds.length || b.mentions - a.mentions);
  return (
    <TopTen
      title="Great"
      highlight="Connectors"
      blurb="The top 10 names dropped in the most episodes - the ones that tie the stars together. Tap any name and dive in!"
      items={connectors}
    />
  );
}
