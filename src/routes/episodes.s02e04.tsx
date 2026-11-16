import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e04");

export const Route = createFileRoute("/episodes/s02e04")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e04").references,
  head: ({ loaderData }) => episodeHead("s02e04", loaderData ?? 0),
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
