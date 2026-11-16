import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e01");

export const Route = createFileRoute("/episodes/s05e01")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e01").references,
  head: ({ loaderData }) => episodeHead("s05e01", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e01"
      refs={refs}
      title="Nell Campbell"
      subtitle="Rocky Horror's Columbia · the face of Nell's · tap-dancing star"
      released="Released 18 Jun 2025 · 50:13"
      blurb="Nell Campbell on Kensington Market, being cast in The Rocky Horror Show in 1973, the King's Road, and Nell's on 14th Street."
    />
  ),
});
