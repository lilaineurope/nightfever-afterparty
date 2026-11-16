import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e10");

export const Route = createFileRoute("/episodes/s05e10")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e10").references,
  head: ({ loaderData }) => episodeHead("s05e10", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e10"
      refs={refs}
      title="Tish & Snooky"
      subtitle="The sisters behind Manic Panic · Blondie's first backing singers · the Sic F*cks"
      released="Released 20 Aug 2025 · 52:15 as a podcast"
      blurb="Tish & Snooky on singing in the first Blondie, opening Manic Panic on St. Marks Place in 1977, the Sic F*cks and the night the Mudd Club opened."
    />
  ),
});
