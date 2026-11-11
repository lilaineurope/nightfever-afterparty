import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e02.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e02")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e02", refs.length),
  component: () => (
    <EpisodePage
      id="s03e02"
      refs={refs}
      title="Martha Wash"
      subtitle="Singer, songwriter and dance-music voice · The Weather Girls · Black Box · Carry On"
      released="Released 22 Jun 2023 · 49:06 as a podcast"
      blurb="Martha Wash on singing for Sylvester, nearly turning down It's Raining Men, hearing her voice in Black Box's video, and the lawsuits that put singers' names on records."
    />
  ),
});
