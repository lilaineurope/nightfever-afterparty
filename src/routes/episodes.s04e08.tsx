import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s04e08.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s04e08")({
  staticData: { sitemap: true },
  head: () => episodeHead("s04e08", refs.length),
  component: () => (
    <EpisodePage
      id="s04e08"
      refs={refs}
      title="Richie Rich"
      subtitle="Club kid, figure skater, singer and designer · Heatherette, Richerette"
      released="Released 21 Aug 2024 · 1:03:03 on WOW and as a podcast"
      blurb="From the Ice Capades to the Style Summit, Hotel 17 and Heatherette - Miss Piggy front row, Paris in a studded bodysuit and Liza's glitter pants. Boom!"
    />
  ),
});
