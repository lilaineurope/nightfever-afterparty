import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e10");

export const Route = createFileRoute("/episodes/s01e10")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e10").references,
  head: ({ loaderData }) => episodeHead("s01e10", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e10"
      refs={refs}
      title="Joey Arias"
      subtitle="Drag goddess · Klaus Nomi's partner · Fiorucci stylist"
      released="Released 1 Nov 2021 · 1:10:36 as a podcast"
      blurb="Joey Arias on Fiorucci, Klaus Nomi, singing with Bowie on Saturday Night Live, the Andy and Edie show with Ann Magnuson, Bar d'O and Zumanity."
    />
  ),
});
