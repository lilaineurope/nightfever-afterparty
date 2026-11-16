import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e03");

export const Route = createFileRoute("/episodes/s02e03")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e03").references,
  head: ({ loaderData }) => episodeHead("s02e03", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e03"
      refs={refs}
      title="Susanne Bartsch"
      subtitle="Empress of the Night · Love Ball founder, boutique owner and party host"
      released="Released 22 Aug 2022 · 1:01:34 on WOW and as a podcast"
      blurb="Susanne Bartsch on running away from Switzerland, the Blitz, her SoHo stores, Savage, the Copa and the Love Balls."
    />
  ),
});
