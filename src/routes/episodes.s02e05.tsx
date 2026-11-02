import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e05.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e05")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e05", refs.length),
  component: () => (
    <EpisodePage
      id="s02e05"
      refs={refs}
      title="Connie Fleming"
      subtitle="Boy Bar beauty · Mugler supermodel · door legend"
      released="Released 5 Sep 2022 · 1:17:43"
      blurb="Connie Fleming on the Funhouse, the Boy Bar stage, International Chrysis, Steven Meisel spotting her at the Patricia Field ball, Mugler, and New York's toughest door."
    />
  ),
});
