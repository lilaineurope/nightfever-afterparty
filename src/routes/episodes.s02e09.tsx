import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e09");

export const Route = createFileRoute("/episodes/s02e09")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e09").references,
  head: ({ loaderData }) => episodeHead("s02e09", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e09"
      refs={refs}
      title="Linda Simpson"
      subtitle="Drag queen, zine maker and photographer · My Comrade · The Drag Explosion"
      released="Released 3 Oct 2022 · 1:06:44 as a podcast"
      blurb="Linda Simpson on the Pyramid's punk drag, the zine My Comrade, her Channel 69 nights, bombing at Wigstock, and the snapshots that became The Drag Explosion."
    />
  ),
});
