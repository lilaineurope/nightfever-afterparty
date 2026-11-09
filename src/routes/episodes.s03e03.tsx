import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e03.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e03")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e03", refs.length),
  component: () => (
    <EpisodePage
      id="s03e03"
      refs={refs}
      title="Kevin Aviance"
      subtitle="Drag performer and dance-music star · House of Aviance · Cunty · Din Da Da"
      released="Released 29 Jun 2023 · 52:18 as a podcast"
      blurb="Kevin Aviance on the House of Aviance, the Sound Factory, Madonna's Secret video, surviving the 2006 attack, and hearing Cunty on Beyoncé's Renaissance."
    />
  ),
});
