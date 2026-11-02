import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s04e04.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s04e04")({
  staticData: { sitemap: true },
  head: () => episodeHead("s04e04", refs.length),
  component: () => (
    <EpisodePage
      id="s04e04"
      refs={refs}
      title="Zaldy"
      subtitle="Club Kid · model · RuPaul's Emmy-winning designer"
      released="Released 24 Jul 2024 · 1:04:50 as a podcast"
      blurb="Zaldy on bedsheet gowns as a boy, the Club Kids at the Tunnel, Miss Boy Bar, walking for Mugler and Gaultier, and decades of gowns for Ru."
    />
  ),
});
