import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e05");

export const Route = createFileRoute("/episodes/s06e05")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e05").references,
  head: ({ loaderData }) => episodeHead("s06e05", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e05"
      refs={refs}
      title="Nora Burns"
      subtitle="Writer, performer and comedian · Unitard and the Nellie Olesons · Host of Candied Camera · David's Friend and The Village!"
      released="Released 16 Sep 2026 · 59:01 as a podcast"
      blurb="Nora Burns on her 1980 diaries, Studio 54 by limo, David Burns, strippergrams, her cable show Candied Camera and the disco musical The Village!"
    />
  ),
});
