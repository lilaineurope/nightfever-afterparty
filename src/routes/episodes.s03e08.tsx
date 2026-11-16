import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e08");

export const Route = createFileRoute("/episodes/s03e08")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e08").references,
  head: ({ loaderData }) => episodeHead("s03e08", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e08"
      refs={refs}
      title="Larry Tee"
      subtitle="DJ · 'Supermodel' songwriter · Electroclash founder"
      released="Released 3 Aug 2023 · 1:06:53 as a podcast"
      blurb="Larry Tee on rolling up from Atlanta with RuPaul, the Celebrity Club at the Tunnel, Disco 2000, co-writing 'Supermodel' and naming Electroclash."
    />
  ),
});
