import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e05");

export const Route = createFileRoute("/episodes/s02e05")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e05").references,
  head: ({ loaderData }) => episodeHead("s02e05", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e05"
      refs={refs}
      title="Connie Fleming"
      subtitle="Boy Bar beauty · Mugler supermodel · door legend"
      released="Released 5 Sep 2022 · 1:17:43"
      blurb="Connie Fleming on the Funhouse, the Boy Bar stage, International Chrysis, Steven Meisel spotting her at the Patricia Field ball, Mugler, and New York's toughest door."
    />
  ),
});
