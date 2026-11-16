import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e11");

export const Route = createFileRoute("/episodes/s02e11")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e11").references,
  head: ({ loaderData }) => episodeHead("s02e11", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e11"
      refs={refs}
      title="Richard Boch"
      subtitle="Mudd Club doorman · artist and author of The Mudd Club"
      released="Released 17 Oct 2022 · 1:05:09 as a podcast"
      blurb="Richard Boch on bartending at the Ballroom, the Mudd Club at 77 White Street, Steve Mass on the door, Anita Sarko in the DJ booth, and writing The Mudd Club."
    />
  ),
});
