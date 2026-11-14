import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e05.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e05")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e05", refs.length),
  component: () => (
    <EpisodePage
      id="s06e05"
      refs={refs}
      title="Nora Burns"
      subtitle="Writer, performer and comedian · Unitard and the Nellie Olesons · Host of Candy Camera · David's Friend and The Village!"
      released="Released 16 Sep 2026 · 59:01 as a podcast"
      blurb="Nora Burns on her 1980 diaries, Studio 54 by limo, David Burns, strippergrams, her cable show Candy Camera and the disco musical The Village!"
    />
  ),
});
