import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e04");

export const Route = createFileRoute("/episodes/s05e04")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e04").references,
  head: ({ loaderData }) => episodeHead("s05e04", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e04"
      refs={refs}
      title="Nick Egan"
      subtitle="Graphic designer and music-video director · The Tea Set · Bow Wow Wow, Duran Duran, INXS"
      released="Released 9 Jul 2025 · 1:02:49 as a podcast"
      blurb="Nick Egan on the Stray Cats and tattoos, art-school punk, Bow Wow Wow, Malcolm McLaren, his first MTV videos and covers for Duran Duran and INXS."
    />
  ),
});
