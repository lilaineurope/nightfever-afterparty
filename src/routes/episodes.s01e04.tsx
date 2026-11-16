import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e04");

export const Route = createFileRoute("/episodes/s01e04")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e04").references,
  head: ({ loaderData }) => episodeHead("s01e04", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e04"
      refs={refs}
      title="Peter Gatien"
      subtitle="Club King · the Limelight, the Tunnel, Club USA & the Palladium"
      released="Released 20 Sep 2021 · 58:57 as a podcast"
      blurb="Peter Gatien on Rum Bottoms in Florida, the Limelight in an old church, Club USA, the Tunnel and the Palladium, and, as he tells it, Giuliani's campaign against him."
    />
  ),
});
