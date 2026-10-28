import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e03.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e03")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e03", refs.length),
  component: () => (
    <EpisodePage
      id="s06e03"
      refs={refs}
      title="Chi Chi Valenti & Johnny Dynell"
      subtitle="Poet, journalist and door legend · DJ, record producer and promoter · Jackie 60, Click + Drag, Mother"
      released="Released 2 Sep 2026 · 1:02:00 as a podcast"
      blurb="From the Mudd Club door, where they met, and Johnny's first DJ night there without owning a single record to Club 57 pop versus Mudd Club black, voguers outside Johnny's booth at the Tunnel, Elements of Vogue, Jackie 60's no-Club-Kid policy and its Silence of the Lunch Pails, the Brown Party and Night of a Thousand Stevies. Wow!"
    />
  ),
});
