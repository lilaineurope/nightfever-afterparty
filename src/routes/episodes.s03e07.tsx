import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e07");

export const Route = createFileRoute("/episodes/s03e07")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e07").references,
  head: ({ loaderData }) => episodeHead("s03e07", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e07"
      refs={refs}
      title="Domonique Echeverria"
      subtitle="Designer, party host, healer and public speaker · a San Francisco drag child who hosted New York in the twenty-tens, founder of Universal Mother"
      released="Released 28 Jul 2023 · 44:20 as a podcast"
      blurb="Domonique Echeverria on San Francisco's drag mothers, hosting New York in the twenty-tens, surviving and healing, and her site Universal Mother."
    />
  ),
});
