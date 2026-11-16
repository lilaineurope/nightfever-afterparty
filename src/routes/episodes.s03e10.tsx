import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e10");

export const Route = createFileRoute("/episodes/s03e10")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e10").references,
  head: ({ loaderData }) => episodeHead("s03e10", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e10"
      refs={refs}
      title="Miss Guy"
      subtitle="Toilet Boys singer · Squeezebox DJ · Boy Bar star"
      released="Released 17 Aug 2023 · 48:33"
      blurb="Miss Guy on Debbie Harry's make-up, Boy Bar on the very first night, the House of Field balls, Squeezebox and the Toilet Boys."
    />
  ),
});
