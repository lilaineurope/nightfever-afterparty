import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e01.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e01")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e01", refs.length),
  component: () => (
    <EpisodePage
      id="s06e01"
      refs={refs}
      title="James St. James"
    />
  ),
});
