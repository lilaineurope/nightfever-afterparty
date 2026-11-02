import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e04.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e04")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e04", refs.length),
  component: () => (
    <EpisodePage
      id="s01e04"
      refs={refs}
      title="Peter Gatien"
      subtitle="Club King · the Limelight, the Tunnel, Club USA & the Palladium"
      released="Released 20 Sep 2021 · 58:57 as a podcast"
      blurb="Peter Gatien on Rum Bottoms in Florida, the Limelight in an old church, Club USA, the Tunnel and the Palladium, and, as he tells it, Giuliani's campaign against him."
    />
  ),
});
