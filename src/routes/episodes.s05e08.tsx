import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e08");

export const Route = createFileRoute("/episodes/s05e08")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e08").references,
  head: ({ loaderData }) => episodeHead("s05e08", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e08"
      refs={refs}
      title="April Palmieri"
      subtitle="Club 57 and Pyramid it girl, one of the Bodacious Ta Ta's and Pulsallama · a tribute to her friend John Sex"
      released="Released 6 Aug 2025 · 47:13 as a podcast"
      blurb="April Palmieri remembers her close friend John Sex: Club 57 and the Pyramid, singing as one of his Bodacious Ta Ta's with Wendy Wild, the sky-high hair and Delilah the snake - and her own no wave band Pulsallama, which opened for the Clash."
    />
  ),
});
