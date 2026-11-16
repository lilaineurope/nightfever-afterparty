import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s06e08");

export const Route = createFileRoute("/episodes/s06e08")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s06e08").references,
  head: ({ loaderData }) => episodeHead("s06e08", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s06e08"
      refs={refs}
      title="William Norwich"
      subtitle="Society columnist · Vogue editor · novelist"
      released="Released 7 Oct 2026 · 1:01:07 as a podcast"
      blurb="William Norwich on the Daily News society columns, Suzy, Brooke Astor, the society women who raised money for AIDS, and the newspaper strike."
    />
  ),
});
