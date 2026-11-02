import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e04.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e04")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e04", refs.length),
  component: () => (
    <EpisodePage
      id="s02e04"
      refs={refs}
      title="Nikki Haskell"
      subtitle="Studio 54 regular · stockbroker · host of The Nikki Haskell Show"
      released="Released 29 Aug 2022 · 1:07:02 as a podcast"
      blurb="Nikki Haskell on The Daisy and Le Club, broker by day and dancing by night, Studio 54's opening night and The Nikki Haskell Show."
    />
  ),
});
