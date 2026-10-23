import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { NetworkSpotlight } from "@/components/network-spotlight";
import { SiteFooter } from "@/components/site-footer";
import { BestInFashion, PopularPlaces, TopTen } from "@/components/connections-blocks";
import { episodePeople } from "@/data/episode-connections";
export const Route = createFileRoute("/network")({
  staticData: { sitemap: true },
  component: NetworkPage,
  head: () => pageHead({ path: "/network", title: "Network – who turns up with who in Night Fever", description: "Who turns up with who?! The Network: put one Night Fever Afterparty in the spotlight and see which episodes drop the same names.", image: "/og/home.jpg" }),
});

function NetworkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="disco-grid px-6 pb-8 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            Everyone knows{" "}
            <span className="text-pink text-glow-pink">everyone</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Put one Afterparty in the spotlight and see which other episodes
            drop the same names - the thicker the line, the more they share.
            Tap a line to see exactly who and what ties them together!
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Just so you know: a shared mention isn't proof they knew each other
            or shared a night.
          </p>
        </div>
      </section>
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <ClientOnly fallback={<div className="h-[70vh] border-2 border-gold bg-card" />}>
            <NetworkSpotlight />
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
