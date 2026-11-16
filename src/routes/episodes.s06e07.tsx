import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e07");

export const Route = createFileRoute("/episodes/s06e07")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e07").references,
  head: ({ loaderData }) => episodeHead("s06e07", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e07"
      refs={refs}
      title="Sally Randall"
      subtitle="Palladium door legend · artist · 80s It girl"
      released="Released 30 Sep 2026 · 1:05:05 as a podcast"
      blurb="Sally Randall on the Palladium's opening night, the Sally look, SVA with Keith and Kenny, Pizza a Go Go, Danceteria and grinding old masters' pigments."
    />
  ),
});
