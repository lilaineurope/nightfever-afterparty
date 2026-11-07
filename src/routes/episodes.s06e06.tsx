import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e06.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e06")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e06", refs.length),
  component: () => (
    <EpisodePage
      id="s06e06"
      refs={refs}
      title="Lincoln Palsgrove IV"
      subtitle="Doorman and party promoter · the World, Red Zone, the Roxy · Twilo"
      released="Released 23 Sep 2026 · 1:10:04 as a podcast"
      blurb="Lincoln Palsgrove IV on his first club night at 15, the doors of the World, Red Zone and the Roxy, introducing RuPaul to Michelle Visage, and how Chelsea's muscle boys took over Saturday nights."
    />
  ),
});
