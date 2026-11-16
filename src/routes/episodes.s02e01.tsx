import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e01");

export const Route = createFileRoute("/episodes/s02e01")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e01").references,
  head: ({ loaderData }) => episodeHead("s02e01", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e01"
      refs={refs}
      title="Michelle Visage"
      subtitle="Voguer · Seduction singer · Drag Race judge"
      released="Released 8 Aug 2022 · 1:01:04 as a podcast"
      blurb="Michelle Visage on New Jersey teen clubs, the Palladium and the Underground, the House of Magnifique, Seduction, meeting Ru at the Copa and Drag Race."
    />
  ),
});
