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
      blurb="Superstar DJ Larry Tee rolls up from Atlanta in 1987 with Lahoma van Zandt and RuPaul - the van flipped on the way. Then Celebrity Club in the basement of the Tunnel, where the Club Kids were born, life in Nelson Sullivan's Meatpacking townhouse, the hot body contest at Disco 2000, co-writing 'Supermodel', Liza Minnelli dancing in his booth at Love Machine, naming Electroclash in Williamsburg, 'Licky' with Princess Superstar, and his label Zuzii in London and Berlin. Work!"
    />
  ),
});
