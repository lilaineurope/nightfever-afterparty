import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s05e03.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s05e03")({
  staticData: { sitemap: true },
  head: () => episodeHead("s05e03", refs.length),
  component: () => (
    <EpisodePage
      id="s05e03"
      refs={refs}
      title="Amanda Lepore"
      subtitle="Trans icon, model and singer · Club Kid · David LaChapelle's muse"
      released="Released 2 Jul 2025 · 1:06:45 as a podcast"
      blurb="Amanda Lepore on the New Jersey glitter-rock crowd, Cave Canem, the cage at Disco 2000, the Club Kids on Joan Rivers and David LaChapelle."
    />
  ),
});
