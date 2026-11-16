import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e07");

export const Route = createFileRoute("/episodes/s01e07")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e07").references,
  head: ({ loaderData }) => episodeHead("s01e07", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e07"
      refs={refs}
      title="Rudolf Piper"
      subtitle="Club owner and promoter · Danceteria, the Tunnel, Mars · club designer in São Paulo"
      released="Released 11 Oct 2021 · 1:10:35 as a podcast"
      blurb="Rudolf Piper on a club under a Berlin bunker, Danceteria, Madonna's first shows, Keith Haring's floor and the Club Kids' basement at the Tunnel."
    />
  ),
});
