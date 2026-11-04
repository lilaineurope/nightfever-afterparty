import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e10.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e10")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e10", refs.length),
  component: () => (
    <EpisodePage
      id="s05e10"
      refs={refs}
      title="Tish & Snooky"
      subtitle="The sisters behind Manic Panic · Blondie's first backing singers · the Sic F*cks"
      released="Released 20 Aug 2025 · 52:15 as a podcast"
      blurb="Tish & Snooky on singing in the first Blondie, opening Manic Panic on St. Marks Place in 1977, the Sic F*cks and the night the Mudd Club opened."
    />
  ),
});
