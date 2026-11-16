import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e08");

export const Route = createFileRoute("/episodes/s04e08")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e08").references,
  head: ({ loaderData }) => episodeHead("s04e08", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e08"
      refs={refs}
      title="Richie Rich"
      subtitle="Club kid, figure skater, singer and designer · Heatherette, Richerette"
      released="Released 21 Aug 2024 · 1:03:03 on WOW and as a podcast"
      blurb="Richie Rich on the Ice Capades, the Style Summit, Hotel 17 and Heatherette."
    />
  ),
});
