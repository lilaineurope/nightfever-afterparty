import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e05");

export const Route = createFileRoute("/episodes/s04e05")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e05").references,
  head: ({ loaderData }) => episodeHead("s04e05", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e05"
      refs={refs}
      title="Dustin Pittman"
      subtitle="Scene, fashion and rock photographer · the Factory, Max's Kansas City, Studio 54 and New York After Dark"
      released="Released 31 Jul 2024 · 49:18 as a podcast"
      blurb="Dustin Pittman on Max's back room, meeting Andy at the Factory, The Sterile Cuckoo with Liza and half a century of shooting New York after dark."
    />
  ),
});
