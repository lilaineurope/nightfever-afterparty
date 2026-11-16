import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e05");

export const Route = createFileRoute("/episodes/s01e05")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e05").references,
  head: ({ loaderData }) => episodeHead("s01e05", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e05"
      refs={refs}
      title="Ernie Glam"
      subtitle="Original Club Kid and writer · Clara the Carefree Chicken · co-host of Peeew!"
      released="Released 27 Sep 2021 · 57:54 as a podcast"
      blurb="Ernie Glam on the Tunnel and Disco 2000, Clara the Carefree Chicken, Berlin the week the Wall fell, and his long friendship with Michael Alig."
    />
  ),
});
