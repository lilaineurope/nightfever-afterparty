import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e10");

export const Route = createFileRoute("/episodes/s02e10")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e10").references,
  head: ({ loaderData }) => episodeHead("s02e10", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e10"
      refs={refs}
      title="Brian Belovitch"
      subtitle="Writer, actor and counsellor · Tish Gervais of the Gilded Grape, Studio 54 and the downtown 80s, author of Trans Figured"
      released="Released 10 Oct 2022 · 1:14:41 as a podcast"
      blurb="Brian Belovitch on the Gilded Grape, Fellini's pink carpet, Antonio Lopez, army-wife days in Germany and the life of Tish Gervais."
    />
  ),
});
