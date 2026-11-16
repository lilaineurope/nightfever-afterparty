import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e02");

export const Route = createFileRoute("/episodes/s06e02")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e02").references,
  head: ({ loaderData }) => episodeHead("s06e02", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e02"
      refs={refs}
      title="Christina Visca"
      subtitle="Sound Factory co-founder with Junior Vasquez · Door legend · Peter Gatien protégée · Host of Birdcage"
      released="Released 26 Aug 2026 · 54:12 as a podcast"
      blurb="Christina Visca on the Limelight's Library, the Palladium door, Bassline and the Sound Factory with Junior Vasquez, Grace Jones's Halloween '89 and managing Club USA."
    />
  ),
});
