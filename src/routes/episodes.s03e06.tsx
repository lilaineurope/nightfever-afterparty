import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e06");

export const Route = createFileRoute("/episodes/s03e06")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e06").references,
  head: ({ loaderData }) => episodeHead("s03e06", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e06"
      refs={refs}
      title="Eric Goode"
      subtitle="Area co-founder · club, restaurant and hotel owner · Tiger King producer · tortoise conservationist"
      released="Released 20 Jul 2023 · 57:09 as a podcast"
      blurb="Eric Goode on the Mudd Club, the Club With No Name, Area's changing themes, the Maritime Hotel and a lifelong love of tortoises."
    />
  ),
});
