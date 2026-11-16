import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e01");

export const Route = createFileRoute("/episodes/s01e01")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e01").references,
  head: ({ loaderData }) => episodeHead("s01e01", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e01"
      refs={refs}
      title="Dianne Brill"
      blurb="Dianne Brill, the Queen of the Night, on Warhol, Mugler, Danceteria and inventing her very own silhouette. Where it all started!"
    />
  ),
});
