import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e05");

export const Route = createFileRoute("/episodes/s05e05")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e05").references,
  head: ({ loaderData }) => episodeHead("s05e05", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e05"
      refs={refs}
      title="Brad Gooch"
      subtitle="Poet, novelist, biographer and former model · Wilhelmina, Mapplethorpe and Warhol, and Radiant, his life of Keith Haring"
      released="Released 16 Jul 2025 · 1:20:37 as a podcast"
      blurb="Brad Gooch on modelling in the late 70s, meeting Mapplethorpe and Warhol, and his Keith Haring biography Radiant: SVA, Club 57, the subway chalk drawings, the Pop Shop and ACT UP."
    />
  ),
});
