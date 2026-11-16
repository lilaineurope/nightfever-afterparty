import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e08");

export const Route = createFileRoute("/episodes/s02e08")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e08").references,
  head: ({ loaderData }) => episodeHead("s02e08", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e08"
      refs={refs}
      title="Michelangelo Signorile"
      subtitle="Journalist and co-founder of OutWeek magazine · ACT UP · Queer in America"
      released="Released 26 Sep 2022 · 1:02:35 as a podcast"
      blurb="Michelangelo Signorile on PR jobs and gossip columns, the Palladium, ACT UP, OutWeek and the birth of outing."
    />
  ),
});
