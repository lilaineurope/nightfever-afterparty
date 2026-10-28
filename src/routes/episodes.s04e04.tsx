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
      blurb="Zaldy goes from draping bedsheet gowns as a boy in Connecticut to the LA underground and the Club Kids at the Tunnel. Then Miss Boy Bar (one night only), ten years of twin looks with Mathu Andersen, the alien reveal that won the Love Ball, walking for Mugler, Gaultier and Westwood, the Levi's taxi ad, creating Ru's Supermodel look - and decades of gowns for Ru, three Emmys, Michael Jackson's tour wardrobe and his loafers in a Ziploc. Fabulous!"
    />
  ),
});
