import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e06");

export const Route = createFileRoute("/episodes/s04e06")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e06").references,
  head: ({ loaderData }) => episodeHead("s04e06", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e06"
      refs={refs}
      title="Lauren Ezersky"
      subtitle="Fashion journalist · host and producer of Behind the Velvet Ropes, Paper's Lunch with Lauren"
      released="Released 7 Aug 2024 · 51:10 as a podcast"
      blurb="Lauren Ezersky on Behind the Velvet Ropes, interviewing McQueen in bed, opening night at Studio 54, Le Jardin and why your coat is your car."
    />
  ),
});
