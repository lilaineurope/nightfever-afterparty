import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e06");

export const Route = createFileRoute("/episodes/s06e06")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e06").references,
  head: ({ loaderData }) => episodeHead("s06e06", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e06"
      refs={refs}
      title="Lincoln Palsgrove IV"
      subtitle="Doorman and party promoter · the World, Red Zone, the Roxy · Twilo"
      released="Released 23 Sep 2026 · 1:10:04 as a podcast"
      blurb="Lincoln Palsgrove IV on his first club night at 15, the doors of the World, Red Zone and the Roxy, introducing RuPaul to Michelle Visage, and how Chelsea's muscle boys took over Saturday nights."
    />
  ),
});
