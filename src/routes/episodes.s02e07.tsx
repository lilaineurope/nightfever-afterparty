import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e07");

export const Route = createFileRoute("/episodes/s02e07")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e07").references,
  head: ({ loaderData }) => episodeHead("s02e07", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e07"
      refs={refs}
      title="Jenny Talia"
      subtitle="Club kid icon · Model and muse · Lower East Side Girls Club"
      released="Released 19 Sep 2022 · 52:35 as a podcast"
      blurb="Jenny Talia on sneaking into Mars at 15, the glass cube at The Building, Donahue, Gaultier and Meisel, and going from the club to the Lower East Side Girls Club."
    />
  ),
});
