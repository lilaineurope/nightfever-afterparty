import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e08.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e08")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e08", refs.length),
  component: () => (
    <EpisodePage
      id="s03e08"
      refs={refs}
      title="Larry Tee"
      subtitle="DJ · 'Supermodel' songwriter · Electroclash founder"
      released="Released 3 Aug 2023 · 1:06:53 as a podcast"
      blurb="Larry Tee on rolling up from Atlanta with RuPaul, the Celebrity Club at the Tunnel, Disco 2000, co-writing 'Supermodel' and naming Electroclash."
    />
  ),
});
