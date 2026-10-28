import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e06.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e06")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e06", refs.length),
  component: () => (
    <EpisodePage
      id="s05e06"
      refs={refs}
      title="Christopher Makos"
      subtitle="Photographer and artist · Andy Warhol's best friend and travelling companion"
      released="Released 23 Jul 2025 · 47:17 on WOW and as a podcast"
      blurb="From a Corvair ride into Hollywood to Tennessee Williams's lost typewriter, Tony Perkins on the Riviera and ten years at Andy's side - Andy in drag included. Wow!"
    />
  ),
});
