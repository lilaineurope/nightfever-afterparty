import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e01");

export const Route = createFileRoute("/episodes/s04e01")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e01").references,
  head: ({ loaderData }) => episodeHead("s04e01", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e01"
      refs={refs}
      title="Daphne Guinness"
      subtitle="Style icon, couture collector and singer · Isabella Blow, Alexander McQueen, summers with Dalí and records with Tony Visconti"
      released="Released 3 Jul 2024 · 1:04:35 as a podcast"
      blurb="Daphne Guinness on an Irish Guinness childhood, summers with Dalí in Cadaqués, Isabella Blow and McQueen, couture as philosophy and making records with Tony Visconti."
    />
  ),
});
