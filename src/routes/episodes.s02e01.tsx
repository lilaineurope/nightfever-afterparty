import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e01.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e01")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e01", refs.length),
  component: () => (
    <EpisodePage
      id="s02e01"
      refs={refs}
      title="Michelle Visage"
      subtitle="Voguer · Seduction singer · Drag Race judge"
      released="Released 8 Aug 2022 · 1:01:04 as a podcast"
      blurb="Michelle Visage on New Jersey teen clubs, the Palladium and the Underground, the House of Magnifique, Seduction, meeting Ru at the Copa and Drag Race."
    />
  ),
});
