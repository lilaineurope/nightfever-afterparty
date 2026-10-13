import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { ConnectionsGraph } from "@/components/connections-graph";
import { SiteFooter } from "@/components/site-footer";
import { BestInFashion, PopularPlaces } from "@/components/connections-blocks";
import { episodePeople } from "@/data/episode-connections";
import { episodeShort } from "@/data/entities";
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
  const connectors = episodePeople.filter((p) => p.episodeIds.length > 1);
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-cream sm:text-4xl">
          Great <span className="text-gold">Connectors</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          The names dropped in more than one episode - the ones that tie the
          stars together. Tap any name and dive in!
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {connectors.map((p) => (
            <li key={p.slug}>
              <Link
                to="/explore/$slug"
                params={{ slug: p.slug }}
                className="block rounded-xl border border-border bg-card p-4 transition hover:border-gold/50"
              >
                <span className="block font-semibold text-gold">{p.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {p.episodeIds.length} episodes
                  {" · "}
                  {p.mentions} {p.mentions === 1 ? "mention" : "mentions"}
                </span>
                <span className="mt-1 block text-[11px] text-muted-foreground/70">
                  {p.episodeIds.map((id) => episodeShort(id)).join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
