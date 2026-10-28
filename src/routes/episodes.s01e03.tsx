import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e03.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e03")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e03", refs.length),
  component: () => (
    <EpisodePage
      id="s01e03"
      refs={refs}
      title="Lisa Edelstein"
      subtitle={"\"Lisa E.\", 80s it girl · actor, playwright and James's partner-in-crime"}
      released="Released 13 Sep 2021 · 1:08:34 on WOW and as a podcast"
      blurb="James reads from his diaries - lunchboxes, drooping picture hats, a backwards Alaïa dress and the whole guest list of Warhol's memorial. Iconic!"
    />
  ),
});
