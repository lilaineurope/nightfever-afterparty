import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e02");

export const Route = createFileRoute("/episodes/s04e02")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e02").references,
  head: ({ loaderData }) => episodeHead("s04e02", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e02"
      refs={refs}
      title="Mickey Boardman"
      subtitle="Paper's Mr. Mickey · editor, columnist and creative director of the new Playgirl"
      released="Released 10 Jul 2024 · 1:11:55 as a podcast"
      blurb="Mickey Boardman on going from Parsons drop-out to Paper's Mr. Mickey, Wigstock, Michael Musto's bad movie club, Break the Internet with Kim Kardashian and getting sober."
    />
  ),
});
