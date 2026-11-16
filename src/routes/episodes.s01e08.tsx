import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e08");

export const Route = createFileRoute("/episodes/s01e08")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e08").references,
  head: ({ loaderData }) => episodeHead("s01e08", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e08"
      refs={refs}
      title={'Luis "Xtravaganza" Camacho'}
      subtitle="Voguer from the House of Xtravaganza · dancer in Madonna's Vogue and Truth or Dare"
      released="Released 18 Oct 2021 · 1:00:12 as a podcast"
      blurb="Luis on voguing's first poses, the House of Xtravaganza and Mother Angie, the Sound Factory, Madonna's Vogue and Truth or Dare, and why she owes him nothing."
    />
  ),
});
