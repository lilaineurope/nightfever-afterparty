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
      blurb="Michelle goes from a misfit in the New Jersey teen clubs to drama school in the Ansonia at 17 - with a fake ID her mother posted to her. Then the Palladium, the Underground and her first night of voguing, the Christopher Street piers, the House of Magnifique and the Love Ball, the name Visage, the Seduction audition, Paris Is Burning and Madonna, meeting Ru at the Copa, The RuPaul Show - and Drag Race. Hello!"
    />
  ),
});
