import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e03");

export const Route = createFileRoute("/episodes/s06e03")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e03").references,
  head: ({ loaderData }) => episodeHead("s06e03", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e03"
      refs={refs}
      title="Chi Chi Valenti & Johnny Dynell"
      subtitle="Poet, journalist and door legend · DJ, record producer and promoter · Jackie 60, Click + Drag, Mother"
      released="Released 2 Sep 2026 · 1:02:00 as a podcast"
      blurb="Chi Chi Valenti and Johnny Dynell on meeting at the Mudd Club door, Club 57 versus Mudd Club, voguers at the Tunnel and Jackie 60."
    />
  ),
});
