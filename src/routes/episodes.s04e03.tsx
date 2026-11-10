import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s04e03.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s04e03")({
  staticData: { sitemap: true },
  head: () => episodeHead("s04e03", refs.length),
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
