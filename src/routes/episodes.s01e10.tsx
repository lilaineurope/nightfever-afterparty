import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e10.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e10")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e10", refs.length),
  component: () => (
    <EpisodePage
      id="s01e10"
      refs={refs}
      title="Joey Arias"
      subtitle="Drag goddess · Klaus Nomi's partner · Fiorucci stylist"
      released="Released 1 Nov 2021 · 1:10:36 as a podcast"
      blurb="Joey Arias on Fiorucci, Klaus Nomi, singing with Bowie on Saturday Night Live, the Andy and Edie show with Ann Magnuson, Bar d'O and Zumanity."
    />
  ),
});
