import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e08.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e08")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e08", refs.length),
  component: () => (
    <EpisodePage
      id="s02e08"
      refs={refs}
      title="Michelangelo Signorile"
      subtitle="Journalist and co-founder of OutWeek magazine · ACT UP · Queer in America"
      released="Released 26 Sep 2022 · 1:02:35 as a podcast"
      blurb="Michelangelo Signorile on PR jobs and gossip columns, the Palladium, ACT UP, OutWeek and the birth of outing."
    />
  ),
});
