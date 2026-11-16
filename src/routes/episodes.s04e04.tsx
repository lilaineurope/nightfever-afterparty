import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e04");

export const Route = createFileRoute("/episodes/s04e04")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e04").references,
  head: ({ loaderData }) => episodeHead("s04e04", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e04"
      refs={refs}
      title="Zaldy"
      subtitle="Club Kid · model · RuPaul's Emmy-winning designer"
      released="Released 24 Jul 2024 · 1:04:50 as a podcast"
      blurb="Zaldy on bedsheet gowns as a boy, the Club Kids at the Tunnel, Miss Boy Bar, walking for Mugler and Gaultier, and decades of gowns for Ru."
    />
  ),
});
