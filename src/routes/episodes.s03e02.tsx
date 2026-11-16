import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e02");

export const Route = createFileRoute("/episodes/s03e02")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e02").references,
  head: ({ loaderData }) => episodeHead("s03e02", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e02"
      refs={refs}
      title="Martha Wash"
      subtitle="Singer, songwriter and dance-music voice · The Weather Girls · Black Box · Carry On"
      released="Released 22 Jun 2023 · 49:06 as a podcast"
      blurb="Martha Wash on singing for Sylvester, nearly turning down It's Raining Men, hearing her voice in Black Box's video, and the lawsuits that put singers' names on records."
    />
  ),
});
