import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s02e02.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s02e02")({
  staticData: { sitemap: true },
  head: () => episodeHead("s02e02", refs.length),
  component: () => (
    <EpisodePage
      id="s02e02"
      refs={refs}
      title="Jayne County"
      subtitle="Punk and glam rock pioneer · Warhol's Pork · Max's Kansas City · The Electric Chairs"
      released="Released 15 Aug 2022 · 1:09:43 as a podcast"
      blurb="Jayne County on wrecking in Atlanta, crash pads and Leee Black Childers' flat, Warhol's Pork, DJing at Max's, Stonewall, touring with the Police and the Bowie years."
    />
  ),
});
