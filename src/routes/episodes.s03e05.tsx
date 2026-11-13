import { createFileRoute } from "@tanstack/react-router";
import { episodeHead } from "@/lib/seo";
import { EpisodePage, type Ref } from "@/components/episode-page";
import refsRaw from "../data/s03e05.json";

const refs = refsRaw as Ref[];

export const Route = createFileRoute("/episodes/s03e05")({
  staticData: { sitemap: true },
  head: () => episodeHead("s03e05", refs.length),
  component: () => (
    <EpisodePage
      id="s03e05"
      refs={refs}
      title="Cherry Vanilla"
      subtitle="Punk singer · Warhol's Pork · David Bowie's publicist at MainMan · DJ at Aux Puces"
      released="Released 13 Jul 2023 · 1:17:10 as a podcast"
      blurb="Cherry Vanilla on the Copa, Madison Avenue acid trips, DJing at Aux Puces, Warhol's Pork in London, Bowie's MainMan years and punk with Sting and Stewart Copeland."
    />
  ),
});
