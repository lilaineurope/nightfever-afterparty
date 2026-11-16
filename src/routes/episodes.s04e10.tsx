import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e10");

export const Route = createFileRoute("/episodes/s04e10")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e10").references,
  head: ({ loaderData }) => episodeHead("s04e10", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e10"
      refs={refs}
      title="Ann Magnuson"
      subtitle="Actress, performance artist and singer · Club 57 · Bongwater, Pulsallama"
      released="Released 4 Sep 2024 · 1:07:52 as a podcast"
      blurb="Ann Magnuson on running Club 57 under a Polish church on St. Mark's Place, New Wave Vaudeville with Klaus Nomi, her bands Pulsallama and Bongwater, and films from The Hunger to Desperately Seeking Susan."
    />
  ),
});
