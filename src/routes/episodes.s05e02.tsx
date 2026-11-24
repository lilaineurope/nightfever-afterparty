import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s05e02");

export const Route = createFileRoute("/episodes/s05e02")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s05e02").references,
  head: ({ loaderData }) => episodeHead("s05e02", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s05e02"
      refs={refs}
      title="Jodie Harsh"
      subtitle="DJ, producer and London club host · G-A-Y at 15, Nag Nag Nag, Too 2 Much, Circus and Room Service, and author of the memoir You Had to Be There"
      released="Released 25 Jun 2025 · 57:53 as a podcast"
      blurb="Jodie Harsh on sneaking into G-A-Y at 15, Nag Nag Nag and the electroclash years, Amy Winehouse in Camden, getting sober and writing You Had to Be There."
    />
  ),
});
