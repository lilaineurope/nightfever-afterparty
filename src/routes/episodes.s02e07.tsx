import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e07.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e07")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e07", refs.length),
  component: () => (
    <EpisodePage
      id="s02e07"
      refs={refs}
      title="Jenny Talia"
      subtitle="Club kid icon · Model and muse · Lower East Side Girls Club"
      released="Released 19 Sep 2022 · 52:35 as a podcast"
      blurb="Jenny Talia on sneaking into Mars at 15, the glass cube at The Building, Donahue, Gaultier and Meisel, and going from the club to the Lower East Side Girls Club."
    />
  ),
});
