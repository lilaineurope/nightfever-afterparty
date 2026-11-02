import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e01.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e01")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e01", refs.length),
  component: () => (
    <EpisodePage
      id="s05e01"
      refs={refs}
      title="Nell Campbell"
      subtitle="Rocky Horror's Columbia · the face of Nell's · tap-dancing star"
      released="Released 18 Jun 2025 · 50:13"
      blurb="Nell Campbell on Kensington Market, being cast in The Rocky Horror Show in 1973, the King's Road, and Nell's on 14th Street."
    />
  ),
});
