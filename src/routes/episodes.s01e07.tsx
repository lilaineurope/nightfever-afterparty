import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e07.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e07")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e07", refs.length),
  component: () => (
    <EpisodePage
      id="s01e07"
      refs={refs}
      title="Rudolf Piper"
      subtitle="Club owner and promoter · Danceteria, the Tunnel, Mars · club designer in São Paulo"
      released="Released 11 Oct 2021 · 1:10:35 as a podcast"
      blurb="Rudolf Piper on a club under a Berlin bunker, Danceteria, Madonna's first shows, Keith Haring's floor and the Club Kids' basement at the Tunnel."
    />
  ),
});
