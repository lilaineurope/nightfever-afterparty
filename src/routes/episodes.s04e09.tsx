import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e09");

export const Route = createFileRoute("/episodes/s04e09")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e09").references,
  head: ({ loaderData }) => episodeHead("s04e09", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e09"
      refs={refs}
      title="Susan Seidelman"
      subtitle="Director of Smithereens and Desperately Seeking Susan · the Sex and the City pilot"
      released="Released 28 Aug 2024 · 1:16:41 as a podcast"
      blurb="Susan Seidelman on making Smithereens, casting Madonna in Desperately Seeking Susan, Plato's Retreat and the Continental Baths, and directing the Sex and the City pilot."
    />
  ),
});
