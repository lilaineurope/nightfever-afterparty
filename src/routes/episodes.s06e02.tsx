import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s06e02.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s06e02")({
  staticData: { sitemap: true },
  head: () => episodeHead("s06e02", refs.length),
  component: () => (
    <EpisodePage
      id="s06e02"
      refs={refs}
      title="Christina Visca"
      subtitle="Sound Factory co-founder with Junior Vasquez · Door legend · Peter Gatien protégée · Host of Birdcage"
      released="Released 26 Aug 2026 · 54:12 as a podcast"
      blurb="Christina Visca on the Limelight's Library, the Palladium door, Bassline and the Sound Factory with Junior Vasquez, Grace Jones's Halloween '89 and managing Club USA."
    />
  ),
});
