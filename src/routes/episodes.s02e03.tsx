import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e03.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e03")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e03", refs.length),
  component: () => (
    <EpisodePage
      id="s02e03"
      refs={refs}
      title="Susanne Bartsch"
      subtitle="Empress of the Night · Love Ball founder, boutique owner and party host"
      released="Released 22 Aug 2022 · 1:01:34 on WOW and as a podcast"
      blurb="From Swiss teen runaway to the Blitz, her SoHo stores, Savage, Bentley's, the Copa and the Love Balls - and a FIT show of 128 looks. Pure magic!"
    />
  ),
});
