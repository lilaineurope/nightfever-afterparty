import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e02.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e02")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e02", refs.length),
  component: () => (
    <EpisodePage
      id="s01e02"
      refs={refs}
      title="Michael Musto"
      subtitle="Village Voice nightlife columnist · La Dolce Musto"
      released="Released 6 Sep 2021 · 1:04:35"
    />
  ),
});
