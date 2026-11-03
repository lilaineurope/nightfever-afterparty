import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e04.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e04")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e04", refs.length),
  component: () => (
    <EpisodePage
      id="s03e04"
      refs={refs}
      title="Man Parrish"
      subtitle="Electro pioneer behind Hip Hop, Be Bop (Don't Stop) · producer, DJ and party promoter"
      released="Released 6 Jul 2023 · 1:12:24 as a podcast"
      blurb="Man Parrish on the Continental Baths, his name from Andy Warhol, Klaus Nomi, a trapeze over Studio 54, Madonna and the UK tabloids, and his Sunday party at the Cock."
    />
  ),
});
