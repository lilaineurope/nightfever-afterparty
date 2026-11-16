import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s04e03");

export const Route = createFileRoute("/episodes/s04e03")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s04e03").references,
  head: ({ loaderData }) => episodeHead("s04e03", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s04e03"
      refs={refs}
      title="Bebe Buell"
      subtitle="Model, Playboy Playmate, singer and rock memoirist · Max's Kansas City · Rebel Heart · Rebel Soul"
      released="Released 17 Jul 2024 · 1:13:58 as a podcast"
      blurb="Bebe Buell on why she is not a groupie, Max's back room, tea with Dalí and Capote, Bowie, Iggy and Jimmy Page, her 21st birthday at John Lennon's, and Squeezebox."
    />
  ),
});
