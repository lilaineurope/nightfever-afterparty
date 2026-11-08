import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e09.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e09")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e09", refs.length),
  component: () => (
    <EpisodePage
      id="s02e09"
      refs={refs}
      title="Linda Simpson"
      subtitle="Drag queen, zine maker and photographer · My Comrade · The Drag Explosion"
      released="Released 3 Oct 2022 · 1:06:44 as a podcast"
      blurb="Linda Simpson on the Pyramid's punk drag, the zine My Comrade, her Channel 69 nights, bombing at Wigstock, and the snapshots that became The Drag Explosion."
    />
  ),
});
