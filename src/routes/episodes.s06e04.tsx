import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e04");

export const Route = createFileRoute("/episodes/s06e04")({
  staticData: { sitemap: true },
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e04").references,
  head: ({ loaderData }) => episodeHead("s06e04", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e04"
      refs={refs}
      title="Raja"
      subtitle="LA in the 90s, from Arena to Oz"
      released="Released 9 Sep 2026 · 1:03:52 as a podcast"
      blurb="Raja, Drag Race season 3 winner and make-up artist, on LA in the 90s: first nights at Arena, coming out by way of The Jerry Springer Show, Peanuts, MAC and Ru, Mathu Andersen and Top Model - and turning Oz into the hottest show in Orange County."
    />
  ),
});
