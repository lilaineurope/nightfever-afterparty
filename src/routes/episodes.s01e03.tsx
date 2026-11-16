import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s01e03");

export const Route = createFileRoute("/episodes/s01e03")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s01e03").references,
  head: ({ loaderData }) => episodeHead("s01e03", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s01e03"
      refs={refs}
      title="Lisa Edelstein"
      subtitle={"\"Lisa E.\", 80s it girl · actor, playwright and James's partner-in-crime"}
      released="Released 13 Sep 2021 · 1:08:34 on WOW and as a podcast"
      blurb="Lisa Edelstein and James on their 80s: lunchboxes, drooping picture hats, a backwards Alaïa dress, and James reading the guest list of Warhol's memorial from his diaries."
    />
  ),
});
