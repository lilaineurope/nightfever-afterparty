import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e09.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e09")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e09", refs.length),
  component: () => (
    <EpisodePage
      id="s01e09"
      refs={refs}
      title="Moby"
      subtitle="DJ, singer and producer · from the basement at Mars to Go, Play and two memoirs"
      released="Released 25 Oct 2021 · 1:04:38 as a podcast"
      blurb="Moby on his abandoned-factory squat, his first gig at Mars, Michael Alig's L train party, the Friday record-shop scrum, Go and his two memoirs."
    />
  ),
});
