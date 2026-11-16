import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e06");

export const Route = createFileRoute("/episodes/s05e06")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e06").references,
  head: ({ loaderData }) => episodeHead("s05e06", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e06"
      refs={refs}
      title="Christopher Makos"
      subtitle="Photographer and artist · Andy Warhol's best friend and travelling companion"
      released="Released 23 Jul 2025 · 47:17 on WOW and as a podcast"
      blurb="Christopher Makos on Hollywood, Tennessee Williams's lost typewriter, Tony Perkins on the Riviera and ten years at Andy Warhol's side."
    />
  ),
});
