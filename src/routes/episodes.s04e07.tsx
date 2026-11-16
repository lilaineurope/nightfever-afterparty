import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e07");

export const Route = createFileRoute("/episodes/s04e07")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e07").references,
  head: ({ loaderData }) => episodeHead("s04e07", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e07"
      refs={refs}
      title="Trey Speegle"
      subtitle="Artist and art director behind 80s Polaroids · Straight to Hell and Bad Boy party promoter · co-editor of the WOW Report"
      released="Released 14 Aug 2024 · 1:03:04 as a podcast"
      blurb="Trey Speegle on his 80s Polaroids, Straight to Hell at the Pyramid, Bad Boy nights at Danceteria, Keith Haring, Quentin Crisp and the Andy Warhol memorial poster."
    />
  ),
});
