import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import { refsOf } from "@/data/episode-refs";

const refs: Ref[] = refsOf("s02e06");

export const Route = createFileRoute("/episodes/s02e06")({
  staticData: { sitemap: true },
  // The reference count for the title loads with the episode data, not with every page (page weight, 16 Nov 2026).
  loader: async () => (await import("@/data/episode-stats")).episodeStats("s02e06").references,
  head: ({ loaderData }) => episodeHead("s02e06", loaderData ?? 0),
  component: () => (
    <EpisodePage
      id="s02e06"
      refs={refs}
      title="Michael Schmidt"
      subtitle="Designer · the chain-mail man · Squeezebox host"
      released="Released 12 Sep 2022 · 1:07:09 as a podcast"
      blurb="Michael Schmidt on Area, chain mail at Erickson Beamon, dresses for Cher, Tina Turner and Debbie Harry, the Palladium and Squeezebox at Don Hill's."
    />
  ),
});
