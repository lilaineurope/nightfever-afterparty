import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e04.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e04")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e04", refs.length),
  component: () => (
    <EpisodePage
      id="s01e04"
      refs={refs}
      title="Peter Gatien"
      subtitle="Club King · the Limelight, the Tunnel, Club USA & the Palladium"
      released="Released 20 Sep 2021 · 58:57 as a podcast"
      blurb="James calls him the Club King. Peter tells of a jeans store and a hotel bar in Cornwall, Ontario, where a young Rush was his first booking, then Rum Bottoms in South Florida with Village People and the Trammps, sharks under a glass dance floor in Atlanta and Andy Warhol hosting his openings. Then the Limelight in an old church - Whitney Houston singing, Fred Rothbell-Mista's library, Michael Alig's Disco 2000 - Club USA's giant slide in Times Square, the Tunnel's Sunday hip-hop nights and the Palladium. And, as Peter tells it, Giuliani's campaign against him: a federal trial he says ended in an acquittal in three and a half hours, and the deportation that landed him in Toronto. Wow!"
    />
  ),
});
