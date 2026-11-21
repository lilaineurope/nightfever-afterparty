import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e09");

export const Route = createFileRoute("/episodes/s03e09")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e09").references,
  head: ({ loaderData }) => episodeHead("s03e09", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e09"
      refs={refs}
      title="Cat Marnell"
      subtitle="Beauty editor, columnist and author of How to Murder Your Life · a 21st-century it girl of post-9/11 New York nightlife"
      released="Released 10 Aug 2023 · 57:45 as a podcast"
      blurb="Cat Marnell on post-9/11 clubs, Condé Nast beauty closets, xoJane, How to Murder Your Life and growing up on the Edie book."
    />
  ),
});
