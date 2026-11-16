import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e02");

export const Route = createFileRoute("/episodes/s01e02")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e02").references,
  head: ({ loaderData }) => episodeHead("s01e02", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e02"
      refs={refs}
      title="Michael Musto"
      blurb="Michael Musto on the Village Voice, Studio 54, outlaw parties, ACT UP and the Club Kids at the Limelight."
      subtitle="Village Voice nightlife columnist · La Dolce Musto"
      released="Released 6 Sep 2021 · 1:04:35"
    />
  ),
});
