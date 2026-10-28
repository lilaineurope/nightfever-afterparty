import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e01.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e01")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e01", refs.length),
  component: () => (
    <EpisodePage
      id="s01e01"
      refs={refs}
      title="Dianne Brill"
    />
  ),
});
