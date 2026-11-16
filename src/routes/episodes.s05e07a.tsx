import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e07a");

export const Route = createFileRoute("/episodes/s05e07a")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e07a").references,
  head: ({ loaderData }) => episodeHead("s05e07a", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e07a"
      refs={refs}
      title="Christopher Comp"
      subtitle="Second-wave Club Kid · Project X cover boy · planned the parties in the Limelight and Club USA offices · James's roommate at Riverbank West"
      released="Released 30 Jul 2025 · 1:05:14 as a podcast · Part A of two interviews, from 0:01:02"
      blurb="Christopher Comp on goth Pennsylvania, the club kids on Geraldo, living with James at Riverbank West, planning Limelight parties and his crucifix night at the Palladium"
    />
  ),
});