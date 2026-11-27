import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e10");

export const Route = createFileRoute("/episodes/s06e10")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e10").references,
  head: ({ loaderData }) => episodeHead("s06e10", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e10"
      refs={refs}
      title="Kenneth Hash aka Lil' Kenny"
      subtitle="Second-wave Club Kid, Patricia Field buyer, Project X model and costume maker"
      released="Released 21 Oct 2026 · 44:28 as a podcast"
      blurb="Lil' Kenny on the second wave of Club Kids, Patricia Field's store, Björk and Jenny Talia, his French fries and pizza looks - and the costumes he made for Party Monster."
    />
  ),
});
