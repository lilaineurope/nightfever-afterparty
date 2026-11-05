import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s04e09.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s04e09")({
  staticData: { sitemap: true },
  head: () => episodeHead("s04e09", refs.length),
  component: () => (
    <EpisodePage
      id="s04e09"
      refs={refs}
      title="Susan Seidelman"
      subtitle="Director of Smithereens and Desperately Seeking Susan · the Sex and the City pilot"
      released="Released 28 Aug 2024 · 1:16:41 as a podcast"
      blurb="Susan Seidelman on making Smithereens, casting Madonna in Desperately Seeking Susan, Plato's Retreat and the Continental Baths, and directing the Sex and the City pilot."
    />
  ),
});
