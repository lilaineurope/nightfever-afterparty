import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e09");

export const Route = createFileRoute("/episodes/s05e09")({
  staticData: { sitemap: true },
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e09").references,
  head: ({ loaderData }) => episodeHead("s05e09", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e09"
      refs={refs}
      title="Screamin' Rachael Cain"
      subtitle="The Queen of House"
      released="Released 13 Aug 2025 · 54:49 as a podcast"
      blurb="Screamin' Rachael Cain, the Queen of House, on singing 'Fantasy', Chicago's punk underground and Frankie Knuckles, how Trax got its name, the World and four TV shows at once - and her Club Kid years with Michael and Angel."
    />
  ),
});
