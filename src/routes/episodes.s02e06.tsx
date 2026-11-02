import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e06.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e06")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e06", refs.length),
  component: () => (
    <EpisodePage
      id="s02e06"
      refs={refs}
      title="Michael Schmidt"
      subtitle="Designer · the chain-mail man · Squeezebox host"
      released="Released 12 Sep 2022 · 1:07:09 as a podcast"
      blurb="Michael Schmidt on Area, chain mail at Erickson Beamon, dresses for Cher, Tina Turner and Debbie Harry, the Palladium and Squeezebox at Don Hill's."
    />
  ),
});
