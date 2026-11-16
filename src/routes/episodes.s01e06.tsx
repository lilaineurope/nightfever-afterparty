import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e06");

export const Route = createFileRoute("/episodes/s01e06")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e06").references,
  head: ({ loaderData }) => episodeHead("s01e06", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e06"
      refs={refs}
      title="Waltpaper"
      subtitle="Club kid · Artist · Author of New York Club Kids"
      released="Released 4 Oct 2021 · 54:12 as a podcast"
      blurb="Walt Cassidy on punk in Virginia, arriving in New York in 1991, the club kid houses in Gramercy Park, the Limelight stage and how the 90s turned darker."
    />
  ),
});
