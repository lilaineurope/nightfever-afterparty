import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e07a.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e07a")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e07a", refs.length),
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