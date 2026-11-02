import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e07.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e07")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e07", refs.length),
  component: () => (
    <EpisodePage
      id="s06e07"
      refs={refs}
      title="Sally Randall"
      subtitle="Palladium door legend · artist · 80s It girl"
      released="Released 30 Sep 2026 · 1:05:05 as a podcast"
      blurb="Sally Randall on the Palladium's opening night, the Sally look, SVA with Keith and Kenny, Pizza a Go Go, Danceteria and grinding old masters' pigments."
    />
  ),
});
