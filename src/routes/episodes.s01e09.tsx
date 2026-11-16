import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e09");

export const Route = createFileRoute("/episodes/s01e09")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e09").references,
  head: ({ loaderData }) => episodeHead("s01e09", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e09"
      refs={refs}
      title="Moby"
      subtitle="DJ, singer and producer · from the basement at Mars to Go, Play and two memoirs"
      released="Released 25 Oct 2021 · 1:04:38 as a podcast"
      blurb="Moby on his abandoned-factory squat, his first gig at Mars, Michael Alig's L train party, the Friday record-shop scrum, Go and his two memoirs."
    />
  ),
});
