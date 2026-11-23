import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e11");

export const Route = createFileRoute("/episodes/s04e11")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e11").references,
  head: ({ loaderData }) => episodeHead("s04e11", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e11"
      refs={refs}
      title="Elyssa Maxx Goodman"
      subtitle="Drag historian and author of Glitter and Concrete · drag kings and queens from the 1800s, the Pansy Craze and Harlem's drag balls"
      released="Released 1 Jul 2024 · 1:06:10 as a podcast"
      blurb="Elyssa Maxx Goodman on Julian Eltinge, Bert Savoy, the Pansy Craze, Harlem's drag balls and the 1845 masquerade law."
    />
  ),
});
