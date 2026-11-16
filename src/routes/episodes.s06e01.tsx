import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e01");

export const Route = createFileRoute("/episodes/s06e01")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e01").references,
  head: ({ loaderData }) => episodeHead("s06e01", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e01"
      refs={refs}
      title="James St. James"
      blurb="James St. James, the host, finally takes the guest chair: growing up, moving to New York and the club years he has been documenting ever since."
    />
  ),
});
