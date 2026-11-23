import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e09");

export const Route = createFileRoute("/episodes/s06e09")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e09").references,
  head: ({ loaderData }) => episodeHead("s06e09", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e09"
      refs={refs}
      title="Desi Santiago"
      subtitle="Sculptor, metalsmith, installation artist and film production designer · Desi Monster, an original Club Kid of Red Zone, The Building and Disco 2000"
      released="Released 14 Oct 2026 · 52:50 as a podcast"
      blurb="Desi Santiago on becoming Desi Monster, the club kid apartments, Leigh Bowery at his 20th birthday, the band Boob and building worlds for Zaldy."
    />
  ),
});
