import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e04");

export const Route = createFileRoute("/episodes/s03e04")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e04").references,
  head: ({ loaderData }) => episodeHead("s03e04", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e04"
      refs={refs}
      title="Man Parrish"
      subtitle="Electro pioneer behind Hip Hop, Be Bop (Don't Stop) · producer, DJ and party promoter"
      released="Released 6 Jul 2023 · 1:12:24 as a podcast"
      blurb="Man Parrish on the Continental Baths, his name from Andy Warhol, Klaus Nomi, a trapeze over Studio 54, Madonna and the UK tabloids, and his Sunday party at the Cock."
    />
  ),
});
