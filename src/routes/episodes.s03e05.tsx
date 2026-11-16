import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s03e05");

export const Route = createFileRoute("/episodes/s03e05")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s03e05").references,
  head: ({ loaderData }) => episodeHead("s03e05", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s03e05"
      refs={refs}
      title="Cherry Vanilla"
      subtitle="Punk singer · Warhol's Pork · David Bowie's publicist at MainMan · DJ at Aux Puces"
      released="Released 13 Jul 2023 · 1:17:10 as a podcast"
      blurb="Cherry Vanilla on the Copa, Madison Avenue acid trips, DJing at Aux Puces, Warhol's Pork in London, Bowie's MainMan years and punk with Sting and Stewart Copeland."
    />
  ),
});
