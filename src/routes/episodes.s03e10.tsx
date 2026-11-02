import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e10.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e10")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e10", refs.length),
  component: () => (
    <EpisodePage
      id="s03e10"
      refs={refs}
      title="Miss Guy"
      subtitle="Toilet Boys singer · Squeezebox DJ · Boy Bar star"
      released="Released 17 Aug 2023 · 48:33"
      blurb="Miss Guy on Debbie Harry's make-up, Boy Bar on the very first night, the House of Field balls, Squeezebox and the Toilet Boys."
    />
  ),
});
