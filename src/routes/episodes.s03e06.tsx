import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e06.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e06")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e06", refs.length),
  component: () => (
    <EpisodePage
      id="s03e06"
      refs={refs}
      title="Eric Goode"
      subtitle="Area co-founder · club, restaurant and hotel owner · Tiger King producer · tortoise conservationist"
      released="Released 20 Jul 2023 · 57:09 as a podcast"
      blurb="From Etch A Sketch drawings at the Mudd Club and a pig carcass at the Club With No Name to Area's ever-changing themes, Boy George's breakfast-in-bed birthday, MK's Dobermans, the Maritime Hotel and a lifelong love of tortoises. Wow!"
    />
  ),
});
