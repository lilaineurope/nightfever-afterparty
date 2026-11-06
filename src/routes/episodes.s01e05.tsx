import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s01e05.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s01e05")({
  staticData: { sitemap: true },
  head: () => episodeHead("s01e05", refs.length),
  component: () => (
    <EpisodePage
      id="s01e05"
      refs={refs}
      title="Ernie Glam"
      subtitle="Original Club Kid and writer · Clara the Carefree Chicken · co-host of Peeew!"
      released="Released 27 Sep 2021 · 57:54 as a podcast"
      blurb="Ernie Glam on the Tunnel and Disco 2000, Clara the Carefree Chicken, Berlin the week the Wall fell, and his long friendship with Michael Alig."
    />
  ),
});
